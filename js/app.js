/**
 * app.js — 训练 PWA 主应用逻辑
 */

import DB from './db.js';
import router from './router.js';
import { SEED_PLAN, SEED_LOGS, getPushDayTemplate, getPullDayTemplate } from './plan.js';

// ==================== Util ====================

function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function dayName(day) {
  const names = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return names[day];
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function currentYearMonth() {
  const d = new Date();
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}

function showToast(msg, type = 'success') {
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.className = `toast ${type} show`;
  clearTimeout(el._hideTimer);
  el._hideTimer = setTimeout(() => el.classList.remove('show'), 2500);
}

function showPage(name) {
  $$('.page').forEach(p => p.classList.remove('active'));
  const page = $(`#page-${name}`);
  if (page) page.classList.add('active');
  // 更新导航栏
  $$('.nav-item').forEach(n => n.classList.remove('active'));
  const nav = $(`.nav-item[data-page="${name}"]`);
  if (nav) nav.classList.add('active');
}

function showLoading(show) {
  const el = $('#loading-overlay');
  if (el) el.style.display = show ? 'flex' : 'none';
}

// ==================== 状态 ====================

let currentPlan = null;
let allLogs = [];
let currentTrainingLog = null;
let currentTrainingDayId = null;
let timerInterval = null;
let trainingStartTime = null;
// 组间休息倒计时状态
let restTimerRemaining = 0;
let restTimerTotal = 0;
let restTimerInterval = null;
let restTimerActive = false;
let restDefaultSeconds = 60;

// 格式化容量显示：12345 → "12,345kg"
function fmtVolume(v) {
  if (!v) return '-';
  return v.toLocaleString('zh-CN') + 'kg';
}

// ==================== 初始化 ====================

async function initApp() {
  showLoading(true);
  try {
    // 加载计划
    currentPlan = await DB.getLatestPlan();
    if (!currentPlan) {
      // 首次使用，加载种子计划
      currentPlan = SEED_PLAN;
      await DB.savePlan(SEED_PLAN);
    }
    // 加载历史日志
    allLogs = await DB.getLogs();
    // 首次使用：导入历史训练记录种子数据
    if (!allLogs.length) {
      for (const log of SEED_LOGS) {
        await DB.saveLog(log);
      }
      allLogs = await DB.getLogs();
    }
  } catch (e) {
    console.error('Init error:', e);
  }
  showLoading(false);
}

// ==================== 今日概览 ====================

function renderToday() {
  const today = todayStr();
  const schedule = currentPlan?.schedule || [];

  // 查找今天的安排
  let daySchedule = schedule.find(s => s.date === today);
  if (!daySchedule) {
    // 没有今天的安排，显示"按计划休息"或"暂无计划"
    daySchedule = {
      date: today,
      dayOfWeek: dayName(new Date().getDay()),
      sessionType: 'rest',
      title: '休息日 / 无计划安排',
      intensity: '—',
      hasCardio: false,
      notes: '',
      warmup: [],
      exercises: []
    };
  }

  // 检查今天是否已记录
  const todayLog = allLogs.find(l => l.date === today);

  // 渲染头部
  const sessionNames = {
    push: '推日 💪',
    pull: '拉日 🔥',
    functional: '功能性训练 🏃',
    cardio: '有氧日 ❤️',
    rest: '休息日 🛌',
    event: '训练营 ⚡'
  };
  const intensityColors = { '低': 'badge-green', '中': 'badge-yellow', '高': 'badge-red', '低-中': 'badge-green' };

  let html = `
    <div class="today-header">
      <div class="today-date">${daySchedule.dayOfWeek} · ${formatDate(today)}</div>
      <div class="today-session-type">${sessionNames[daySchedule.sessionType] || daySchedule.title}</div>
      <div class="today-meta">
        ${daySchedule.intensity !== '—' ? `<span>强度：${daySchedule.intensity}</span>` : ''}
        ${daySchedule.hasCardio ? '<span>有氧：✅</span>' : ''}
      </div>
      ${daySchedule.notes ? `<div class="today-notes">${daySchedule.notes}</div>` : ''}
    </div>
  `;

  // 本周进度
  html += renderWeekProgress(schedule);

  // 容量速览（从已有日志算）
  html += renderVolumePreview();

  // 开始训练按钮 + 训练计划预览
  if (daySchedule.sessionType !== 'rest' && daySchedule.exercises?.length > 0) {
    if (todayLog) {
      html += `<button class="btn btn-secondary" onclick="router.navigate('/history?log=${todayLog.id}')">✅ 今天已记录 · 查看详情</button>`;
    } else {
      // 计划预览
      html += '<div class="card" style="margin-bottom:var(--space-md)"><div class="card-header">📋 今日训练计划</div>';
      html += '<div class="plan-preview">';
      daySchedule.exercises.forEach(ex => {
        html += `
          <div class="plan-exercise ${ex.isSuperset ? 'superset' : ''}">
            <div class="plan-ex-name">${ex.name} ${ex.isSuperset ? '<span class="badge badge-blue" style="font-size:10px;margin-left:4px">超级组</span>' : ''}</div>
            <div class="plan-ex-target">${ex.target}${ex.restBetweenSets ? ' · 组间休息 ' + ex.restBetweenSets : ''}</div>
          </div>
        `;
      });
      if (daySchedule.warmup?.length) {
        html += `<div class="plan-exercise" style="opacity:0.6"><div class="plan-ex-name">🔥 热身 ${daySchedule.warmup.length} 项</div></div>`;
      }
      if (daySchedule.cardio) {
        html += `<div class="plan-exercise" style="border-bottom:none"><div class="plan-ex-name">❤️ 有氧：${daySchedule.cardio.type} ${daySchedule.cardio.duration}</div></div>`;
      }
      html += '</div></div>';

      html += `<button class="btn btn-primary" onclick="startTraining('${daySchedule.date}')" style="font-size:var(--font-size-lg);padding:16px;margin-top:var(--space-sm)">🔥 开始训练</button>`;
    }
  }

  $('#today-content').innerHTML = html;
}

function renderWeekProgress(schedule) {
  const today = new Date();
  // 找到本周一
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

  let html = '<h3 class="card-header">本周进度</h3><div class="week-progress">';
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const isToday = dateStr === todayStr();
    const hasLog = allLogs.some(l => l.date === dateStr);
    const daySchedule = schedule.find(s => s.date === dateStr);
    const isRest = daySchedule?.sessionType === 'rest' || daySchedule?.sessionType === 'event' || !daySchedule;

    let dotClass = 'future';
    if (hasLog) dotClass = 'completed';
    else if (isToday) dotClass = 'today';
    else if (isRest && !isToday) dotClass = 'rest';

    const dotContent = hasLog ? '✓' : (isToday ? '今' : (isRest ? '·' : ''));

    html += `
      <div class="week-day">
        <span class="day-name">${['一','二','三','四','五','六','日'][i]}</span>
        <div class="day-dot ${dotClass}">${dotContent}</div>
      </div>
    `;
  }
  html += '</div>';
  return html;
}

function renderVolumePreview() {
  const recentLogs = allLogs.slice(0, 5);
  if (!recentLogs.length) return '<div class="card"><div class="card-header">本周容量</div><div class="empty-state" style="padding:20px"><div class="text" style="font-size:14px">暂无训练记录</div></div></div>';

  const totalVolume = recentLogs.reduce((sum, l) => sum + (l.totalVolume || 0), 0);
  const totalDuration = recentLogs.reduce((sum, l) => sum + (l.duration || 0), 0);
  const avgRpe = recentLogs.length ? Math.round(recentLogs.reduce((sum, l) => sum + (l.rpe || 0), 0) / recentLogs.length) : 0;

  return `
    <div class="card">
      <div class="card-header">近况速览</div>
      <div class="volume-preview">
        <div class="volume-item">
          <div class="label">总容量</div>
          <div class="value">${fmtVolume(totalVolume)}</div>
        </div>
        <div class="volume-item">
          <div class="label">总时长</div>
          <div class="value">${totalDuration}<span style="font-size:12px;color:var(--color-text-muted)">min</span></div>
        </div>
        <div class="volume-item">
          <div class="label">平均RPE</div>
          <div class="value">${avgRpe}</div>
        </div>
      </div>
      <div style="font-size:12px;color:var(--color-text-muted);text-align:center">
        共 ${recentLogs.length} 次训练 · 最近 ${recentLogs[0]?.date ? formatDate(recentLogs[0].date) : ''}
      </div>
    </div>
  `;
}

// ==================== 训练模式 ====================

function startTraining(date) {
  router.navigate(`/train?date=${date}`);
}
window.startTraining = startTraining;

function renderTraining(params) {
  const date = params.date || todayStr();
  currentTrainingDayId = date;

  const schedule = currentPlan?.schedule || [];
  const daySchedule = schedule.find(s => s.date === date);
  if (!daySchedule || !daySchedule.exercises?.length) {
    $('#train-content').innerHTML = `<div class="empty-state"><div class="icon">📋</div><div class="text">该日没有训练安排</div></div>`;
    return;
  }

  // 检查是否已有记录
  const existingLog = allLogs.find(l => l.date === date);
  if (existingLog) {
    // 已有记录，提示
    $('#train-content').innerHTML = `
      <div class="empty-state">
        <div class="icon">✅</div>
        <div class="text">今天已完成训练记录</div>
        <div class="sub">总容量 ${existingLog.totalVolume || 0}kg · RPE ${existingLog.rpe || '-'}</div>
        <br>
        <button class="btn btn-secondary" onclick="router.navigate('/history?log=${existingLog.id}')">查看详情</button>
      </div>
    `;
    return;
  }

  // 开始新训练
  currentTrainingLog = {
    id: uid(),
    date,
    sessionType: daySchedule.sessionType,
    planDayId: daySchedule.date,
    startTime: new Date().toTimeString().slice(0, 5),
    duration: 0,
    totalVolume: 0,
    calories: null,
    rpe: 5,
    feeling: '正常',
    bodyStatus: { sleepQuality: 3, sleepHours: 7, jointPain: [], painLevel: 1, notes: '' },
    sets: [],
    cardio: null
  };

  trainingStartTime = Date.now();
  startTimer();

  let html = `
    <div class="train-header">
      <button class="train-back" onclick="router.navigate('/')">‹</button>
      <div class="train-title">${daySchedule.title}</div>
      <div class="train-header-right">
        <div class="train-timer" id="train-timer">00:00</div>
        <button class="rest-quick-btn" onclick="toggleRestConfig()" title="设置休息时间">⏱</button>
      </div>
    </div>
    <div id="rest-config-popup" class="rest-config-popup" style="display:none">
      <div class="rest-config-row">
        <span style="font-size:var(--font-size-sm)">组间休息</span>
        <button class="btn btn-sm btn-outline" onclick="adjustTrainingRest(-15)" style="width:32px;padding:2px">−</button>
        <span id="training-rest-display" style="font-family:var(--font-mono);font-weight:700;min-width:28px;text-align:center">${restDefaultSeconds}</span>
        <button class="btn btn-sm btn-outline" onclick="adjustTrainingRest(15)" style="width:32px;padding:2px">+</button>
        <span style="font-size:var(--font-size-xs);color:var(--color-text-muted)">秒</span>
      </div>
    </div>
  `;

  // 热身
  if (daySchedule.warmup?.length) {
    html += `
      <div class="train-section">
        <div class="train-section-title">热身</div>
        ${daySchedule.warmup.map((ex, i) => `
          <div class="exercise-card" data-ex-id="${ex.id}" data-section="warmup">
            <div class="exercise-header">
              <div>
                <div class="exercise-name">${ex.name}</div>
                <div class="exercise-target">${ex.sets}×${ex.reps}${ex.unit ? ' ' + ex.unit : ''} ${ex.notes ? '· ' + ex.notes : ''}</div>
              </div>
              <div class="exercise-status" id="status-warmup-${i}">⏳</div>
            </div>
            <button class="btn btn-sm btn-outline" onclick="markWarmupDone(${i})" style="margin-top:8px">✅ 完成</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 主训练
  html += `<div class="train-section"><div class="train-section-title">主训练</div>`;
  daySchedule.exercises.forEach((ex, idx) => {
    const isSuperset = ex.isSuperset;
    const ssBadge = ex.supersetWith ? `<span class="superset-badge">超级组</span>` : '';

    html += `
      <div class="exercise-card" data-ex-id="${ex.id}" data-section="main">
        <div class="exercise-header">
          <div>
            <div class="exercise-name">${ex.name} ${ssBadge}</div>
            <div class="exercise-target">目标：${ex.target} ${ex.tempo ? '· 节奏 ' + ex.tempo : ''} ${ex.restBetweenSets ? '· 休息 ' + ex.restBetweenSets : ''}</div>
            ${ex.notes ? `<div class="exercise-target" style="color:var(--color-text-muted)">${ex.notes}</div>` : ''}
          </div>
          <div class="exercise-status" id="status-ex-${idx}">0/${ex.sets.length}</div>
        </div>
        <div id="sets-ex-${idx}">
          ${ex.sets.map((set, si) => renderSetRow(idx, si, set, ex)).join('')}
        </div>
      </div>
    `;
  });
  html += `</div>`;

  // 有氧
  if (daySchedule.cardio) {
    html += `
      <div class="train-section">
        <div class="train-section-title">有氧</div>
        <div class="exercise-card" data-section="cardio">
          <div class="exercise-header">
            <div>
              <div class="exercise-name">${daySchedule.cardio.type}</div>
              <div class="exercise-target">${daySchedule.cardio.duration} · ${daySchedule.cardio.intensity}</div>
            </div>
          </div>
          <div class="feedback-grid" style="margin-top:var(--space-sm)">
            <div class="feedback-item">
              <label>实际时长(分钟)</label>
              <input type="number" id="cardio-duration" value="30" min="0">
            </div>
            <div class="feedback-item">
              <label>平均心率</label>
              <input type="number" id="cardio-hr" value="130" min="0" placeholder="bpm">
            </div>
          </div>
          ${daySchedule.cardio.notes ? `<div style="font-size:12px;color:var(--color-text-muted)">${daySchedule.cardio.notes}</div>` : ''}
        </div>
      </div>
    `;
  }

  // 训练反馈
  html += `
    <div class="train-section train-feedback">
      <div class="train-section-title">训练反馈</div>
      <div class="card">
        <div class="feedback-grid">
          <div class="feedback-item">
            <label>RPE（主观疲劳）</label>
            <div class="rpe-selector" id="rpe-selector">
              ${[1,2,3,4,5,6,7,8,9,10].map(n => `<button class="rpe-btn ${n === 5 ? 'selected' : ''}" onclick="setRPE(${n})">${n}</button>`).join('')}
            </div>
          </div>
          <div class="feedback-item">
            <label>训练感受</label>
            <div class="feeling-chips" id="feeling-chips">
              ${['精力充沛','正常','一般','困倦','疲劳','酸痛'].map(f =>
                `<button class="feeling-chip ${f === '正常' ? 'selected' : ''}" onclick="setFeeling('${f}')">${f}</button>`
              ).join('')}
            </div>
          </div>
          <div class="feedback-item">
            <label>睡眠时长(小时)</label>
            <input type="number" id="sleep-hours" value="7" min="0" max="24" step="0.5">
          </div>
          <div class="feedback-item">
            <label>睡眠质量</label>
            <select id="sleep-quality">
              <option value="1">很差</option>
              <option value="2">较差</option>
              <option value="3" selected>一般</option>
              <option value="4">较好</option>
              <option value="5">很好</option>
            </select>
          </div>
          <div class="feedback-item">
            <label>关节/身体疼痛(选填)</label>
            <input type="text" id="joint-pain" placeholder="如：左肩、右膝">
          </div>
          <div class="feedback-item">
            <label>疼痛程度(1-10)</label>
            <input type="number" id="pain-level" value="1" min="0" max="10">
          </div>
          <div class="feedback-item" style="grid-column:1/-1">
            <label>备注</label>
            <input type="text" id="train-notes" placeholder="任何想记录的内容">
          </div>
        </div>
        <button class="btn btn-success" onclick="finishTraining()">✅ 完成训练并保存</button>
      </div>
    </div>
  `;

  $('#train-content').innerHTML = html;
}

function renderSetRow(exIdx, setIdx, set, exercise) {
  const weightPlaceholder = set.weight ? `(${set.weight}kg)` : '';
  const repUnit = set.unit || '次';
  return `
    <div class="set-row" id="set-row-${exIdx}-${setIdx}">
      <span class="set-num">第${setIdx + 1}组</span>
      <div class="set-input">
        <input type="number" class="set-weight" data-ex="${exIdx}" data-set="${setIdx}" 
               placeholder="${set.isWarmup ? '自重' : (weightPlaceholder || 'kg')}" 
               value="${set.weight || ''}" ${!set.weight ? '' : ''} min="0" step="0.5">
        <label>kg</label>
        <input type="number" class="set-reps" data-ex="${exIdx}" data-set="${setIdx}" 
               placeholder="${set.reps}" value="${set.reps}" min="0">
        <label>${repUnit}</label>
      </div>
      <button class="set-done" id="check-${exIdx}-${setIdx}" onclick="toggleSet(${exIdx}, ${setIdx})">✓</button>
    </div>
  `;
}

window.markWarmupDone = function(idx) {
  const status = $(`#status-warmup-${idx}`);
  if (status) {
    status.textContent = '✅';
    status.style.color = 'var(--color-success)';
  }
};

window.setRPE = function(val) {
  currentTrainingLog.rpe = val;
  $$('#rpe-selector .rpe-btn').forEach(b => b.classList.toggle('selected', parseInt(b.textContent) === val));
};

window.setFeeling = function(val) {
  currentTrainingLog.feeling = val;
  $$('#feeling-chips .feeling-chip').forEach(b => b.classList.toggle('selected', b.textContent === val));
};

window.toggleSet = function(exIdx, setIdx) {
  const check = $(`#check-${exIdx}-${setIdx}`);
  if (!check) return;
  check.classList.toggle('checked');
  updateExerciseStatus(exIdx);

  // 如果勾选了（完成一组），启动休息倒计时
  if (check.classList.contains('checked')) {
    checkAndStartRest(exIdx);
  } else {
    // 取消勾选时停止休息（降低严格度，让用户取消时同时停掉休息）
    stopRestTimer();
  }
};

function updateExerciseStatus(exIdx) {
  const exerciseCard = document.querySelectorAll('.exercise-card[data-section="main"]')[exIdx];
  if (!exerciseCard) return;
  const checks = exerciseCard.querySelectorAll('.set-done');
  const done = [...checks].filter(c => c.classList.contains('checked')).length;
  const total = checks.length;
  const status = $(`#status-ex-${exIdx}`);
  if (status) status.textContent = `${done}/${total}`;
  if (done === total) {
    exerciseCard.classList.add('completed');
    exerciseCard.classList.remove('active');
  } else if (done > 0) {
    exerciseCard.classList.add('active');
  }
}

window.finishTraining = async function() {
  if (!currentTrainingLog) return;

  stopTimer();
  const duration = Math.round((Date.now() - trainingStartTime) / 60000);

  // 收集各组数据
  const schedule = currentPlan?.schedule || [];
  const daySchedule = schedule.find(s => s.date === currentTrainingDayId);
  const exercises = daySchedule?.exercises || [];

  currentTrainingLog.duration = duration;
  currentTrainingLog.totalVolume = 0;

  exercises.forEach((ex, exIdx) => {
    ex.sets.forEach((set, setIdx) => {
      const weightInput = $(`#set-row-${exIdx}-${setIdx} .set-weight`);
      const repsInput = $(`#set-row-${exIdx}-${setIdx} .set-reps`);
      const checked = $(`#check-${exIdx}-${setIdx}`)?.classList.contains('checked');

      const actualWeight = weightInput ? parseFloat(weightInput.value) || 0 : set.weight || 0;
      const actualReps = repsInput ? parseInt(repsInput.value) || 0 : set.reps;

      currentTrainingLog.sets.push({
        exerciseId: ex.id,
        exerciseName: ex.name,
        groupId: ex.id,
        setNumber: set.setNumber,
        weight: actualWeight,
        reps: actualReps,
        isCompleted: !!checked
      });

      if (checked && actualWeight > 0 && actualReps > 0) {
        currentTrainingLog.totalVolume += actualWeight * actualReps;
      }
    });
  });

  // 收集有氧数据
  const cardioDuration = $('#cardio-duration')?.value;
  const cardioHr = $('#cardio-hr')?.value;
  if (cardioDuration) {
    currentTrainingLog.cardio = {
      type: daySchedule?.cardio?.type || '有氧',
      duration: parseInt(cardioDuration),
      heartRate: cardioHr ? parseInt(cardioHr) : null
    };
  }

  // 收集反馈
  currentTrainingLog.bodyStatus = {
    sleepHours: parseFloat($('#sleep-hours')?.value || 7),
    sleepQuality: parseInt($('#sleep-quality')?.value || 3),
    jointPain: ($('#joint-pain')?.value || '').split(/[,，]/).filter(Boolean),
    painLevel: parseInt($('#pain-level')?.value || 1),
    notes: $('#train-notes')?.value || ''
  };

  try {
    await DB.saveLog(currentTrainingLog);
    allLogs = await DB.getLogs();
    showToast('✅ 训练记录已保存！', 'success');

    // 清除训练状态
    currentTrainingLog = null;
    trainingStartTime = null;

    // 跳回首页
    setTimeout(() => router.navigate('/'), 500);
  } catch (e) {
    showToast('❌ 保存失败：' + e.message, 'error');
  }
};

// ==================== 计时器 ====================

function startTimer() {
  stopTimer();
  timerInterval = setInterval(() => {
    if (!trainingStartTime) return;
    const elapsed = Math.floor((Date.now() - trainingStartTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');
    const el = $('#train-timer');
    if (el) el.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// ==================== 组间休息倒计时 ====================

function parseRestSeconds(str) {
  if (!str) return restDefaultSeconds;
  const s = String(str).trim().toLowerCase();
  // 格式 "90s" → 90
  if (s.endsWith('s')) return parseInt(s) || restDefaultSeconds;
  // 格式 "1:30" → 90
  if (s.includes(':')) {
    const parts = s.split(':');
    return parseInt(parts[0]) * 60 + (parseInt(parts[1]) || 0);
  }
  // 纯数字
  const n = parseInt(s);
  return n > 0 ? n : restDefaultSeconds;
}

function startRestTimer(seconds) {
  stopRestTimer();
  restTimerActive = true;
  restTimerTotal = seconds;
  restTimerRemaining = seconds;
  renderRestTimer();

  restTimerInterval = setInterval(() => {
    restTimerRemaining--;
    renderRestTimer();
    if (restTimerRemaining <= 0) {
      stopRestTimer();
      // 震动 + toast 提示
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      showToast('⏰ 休息结束！继续下一组', 'success');
    }
  }, 1000);
}

function stopRestTimer() {
  if (restTimerInterval) {
    clearInterval(restTimerInterval);
    restTimerInterval = null;
  }
  restTimerActive = false;
  restTimerRemaining = 0;
  const el = $('#rest-timer-bar');
  if (el) el.classList.remove('active');
}

function skipRestTimer() {
  stopRestTimer();
}
window.skipRestTimer = skipRestTimer;

function addRestTime(seconds) {
  if (!restTimerActive) return;
  restTimerRemaining += seconds;
  restTimerTotal += seconds;
  renderRestTimer();
}
window.addRestTime = addRestTime;

window.toggleRestConfig = function() {
  const popup = $('#rest-config-popup');
  if (!popup) return;
  const show = popup.style.display !== 'flex';
  popup.style.display = show ? 'flex' : 'none';
};

window.adjustTrainingRest = function(delta) {
  restDefaultSeconds = Math.max(15, Math.min(300, restDefaultSeconds + delta));
  const display = $('#training-rest-display');
  if (display) display.textContent = restDefaultSeconds;
};

function renderRestTimer() {
  let el = $('#rest-timer-bar');
  if (!el) return;
  if (!restTimerActive) {
    el.classList.remove('active');
    return;
  }
  el.classList.add('active');
  const mins = String(Math.floor(restTimerRemaining / 60)).padStart(2, '0');
  const secs = String(restTimerRemaining % 60).padStart(2, '0');
  const pct = restTimerTotal > 0 ? (restTimerRemaining / restTimerTotal) * 100 : 0;

  $('#rest-timer-countdown').textContent = `${mins}:${secs}`;
  $('#rest-timer-progress').style.width = `${pct}%`;
  $('#rest-timer-exercise-name').textContent = restTimerActive ? getLastCompletedExerciseName() : '';
}

function getLastCompletedExerciseName() {
  const cards = document.querySelectorAll('.exercise-card[data-section="main"]');
  // 找最近完成组的动作名
  for (let i = cards.length - 1; i >= 0; i--) {
    const nameEl = cards[i].querySelector('.exercise-name');
    if (nameEl) return nameEl.textContent.replace('超级组', '').trim();
  }
  return '';
}

/**
 * 检查当前动作还有未完成的组 → 启动休息倒计时
 */
function checkAndStartRest(exIdx) {
  const cards = document.querySelectorAll('.exercise-card[data-section="main"]');
  const card = cards[exIdx];
  if (!card) return;

  const checks = card.querySelectorAll('.set-done');
  const done = [...checks].filter(c => c.classList.contains('checked')).length;
  const total = checks.length;

  // 如果不是所有组都完成了 → 启动休息
  if (done > 0 && done < total) {
    // 从计划数据中获取该动作的 restBetweenSets
    const schedule = currentPlan?.schedule || [];
    const daySchedule = schedule.find(s => s.date === currentTrainingDayId);
    const exercises = daySchedule?.exercises || [];
    const exercise = exercises[exIdx];
    const restSec = exercise ? parseRestSeconds(exercise.restBetweenSets) : restDefaultSeconds;
    restTimerActive = true;
    startRestTimer(restSec);
  }
}

// ==================== 历史记录 ====================

function renderHistory() {
  const { year, month } = currentYearMonth();
  renderCalendar(year, month);
  renderLogList();
}

function renderCalendar(year, month) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startPad = (firstDay.getDay() + 6) % 7; // 周一为0
  const totalDays = lastDay.getDate();

  let html = `
    <div class="calendar">
      <div class="calendar-header">
        <button class="calendar-nav" onclick="changeMonth(-1)">‹</button>
        <span class="calendar-month">${year}年${String(month).padStart(2, '0')}月</span>
        <button class="calendar-nav" onclick="changeMonth(1)">›</button>
      </div>
      <div class="calendar-weekdays">
        <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>
      </div>
      <div class="calendar-days">
  `;

  // 空白填充
  for (let i = 0; i < startPad; i++) {
    html += '<div class="calendar-day other-month"></div>';
  }

  const today = todayStr();

  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const hasLog = allLogs.some(l => l.date === dateStr);
    const isToday = dateStr === today;
    let cls = 'calendar-day';
    if (hasLog) cls += ' has-log';
    if (isToday) cls += ' today';
    html += `<div class="${cls}" onclick="${hasLog ? `router.navigate('/history?date=${dateStr}')` : ''}">${d}</div>`;
  }

  html += '</div></div>';
  $('#history-calendar').innerHTML = html;
}

window.changeMonth = async function(delta) {
  // 简单的月份切换，通过重绘实现
  // 存储当前月份在数据属性中
  const cal = $('#history-calendar');
  const current = cal.dataset;
  let y = parseInt(current.year || currentYearMonth().year);
  let m = parseInt(current.month || currentYearMonth().month);
  m += delta;
  if (m < 1) { m = 12; y--; }
  if (m > 12) { m = 1; y++; }
  cal.dataset.year = y;
  cal.dataset.month = m;
  renderCalendar(y, m);
};

function renderLogList() {
  if (!allLogs.length) {
    $('#history-list').innerHTML = `
      <div class="empty-state">
        <div class="icon">📝</div>
        <div class="text">还没有训练记录</div>
        <div class="sub">开始训练后，记录会出现在这里</div>
      </div>
    `;
    return;
  }

  const html = allLogs.map(log => {
    const d = new Date(log.date + 'T00:00:00');
    const sessionNames = {
      push: '推日', pull: '拉日', functional: '功能性训练',
      cardio: '有氧', rest: '休息', event: '训练营'
    };
    return `
      <div class="log-item" onclick="showLogDetail('${log.id}')">
        <div class="log-item-date">
          <div class="day">${d.getDate()}</div>
          <div class="month">${String(d.getMonth() + 1).padStart(2, '0')}</div>
        </div>
        <div class="log-item-info">
          <div class="log-item-type">${sessionNames[log.sessionType] || '训练'} · RPE ${log.rpe || '-'}</div>
          <div class="log-item-stats">
            <span>⏱ ${log.duration || '-'}min</span>
            <span>🏋️ ${fmtVolume(log.totalVolume)}</span>
            <span>${log.feeling ? '💬 ' + log.feeling : ''}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  $('#history-list').innerHTML = html;
}

window.showLogDetail = async function(logId) {
  const log = await DB.getLog(logId);
  if (!log) return;

  const d = new Date(log.date + 'T00:00:00');
  const sessionNames = {
    push: '推日', pull: '拉日', functional: '功能性训练',
    cardio: '有氧', rest: '休息', event: '训练营'
  };

  const dayName = ['周日','周一','周二','周三','周四','周五','周六'][d.getDay()];

  let html = `
    <div class="modal-handle"></div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-md)">
      <div>
        <div style="font-weight:700;font-size:var(--font-size-lg)">${sessionNames[log.sessionType] || '训练'}</div>
        <div style="font-size:var(--font-size-sm);color:var(--color-text-secondary)">${log.date} ${dayName}</div>
      </div>
      <button class="btn btn-sm btn-outline" onclick="closeModal()">✕</button>
    </div>
    <div class="volume-preview" style="margin-bottom:var(--space-md)">
      <div class="volume-item"><div class="label">总容量</div><div class="value">${fmtVolume(log.totalVolume)}</div></div>
      <div class="volume-item"><div class="label">时长</div><div class="value">${log.duration || '-'}<span style="font-size:12px">min</span></div></div>
      <div class="volume-item"><div class="label">RPE</div><div class="value">${log.rpe || '-'}</div></div>
    </div>
  `;

  // 每组记录
  if (log.sets?.length) {
    html += `<div class="train-section-title" style="margin-bottom:var(--space-sm)">动作记录</div>`;
    const grouped = {};
    log.sets.forEach(s => {
      if (!grouped[s.exerciseName]) grouped[s.exerciseName] = [];
      grouped[s.exerciseName].push(s);
    });
    for (const [name, sets] of Object.entries(grouped)) {
      html += `<div class="exercise-card" style="margin-bottom:var(--space-sm)">
        <div class="exercise-name" style="font-size:var(--font-size-sm);margin-bottom:4px">${name}</div>
        <div style="font-size:var(--font-size-xs);color:var(--color-text-secondary)">
          ${sets.map(s => `第${s.setNumber}组：${s.weight}kg × ${s.reps}${s.isCompleted ? ' ✅' : ' ❌'}`).join(' · ')}
        </div>
      </div>`;
    }
  }

  // 身体状态
  if (log.bodyStatus) {
    html += `
      <div class="train-section-title" style="margin:var(--space-sm) 0">身体状态</div>
      <div class="card">
        <div style="font-size:var(--font-size-sm)">
          睡眠：${log.bodyStatus.sleepHours || '-'}h (${['','很差','较差','一般','较好','很好'][log.bodyStatus.sleepQuality] || '-'})<br>
          感受：${log.feeling || '-'}<br>
          ${log.bodyStatus.jointPain?.length ? '疼痛：' + log.bodyStatus.jointPain.join('、') + '<br>' : ''}
          ${log.bodyStatus.painLevel > 1 ? '疼痛程度：' + log.bodyStatus.painLevel + '/10<br>' : ''}
          ${log.bodyStatus.notes ? '备注：' + log.bodyStatus.notes : ''}
        </div>
      </div>
    `;
  }

  // 有氧
  if (log.cardio) {
    html += `
      <div class="train-section-title" style="margin:var(--space-sm) 0">有氧</div>
      <div class="card">
        <div style="font-size:var(--font-size-sm)">${log.cardio.type} · ${log.cardio.duration}min${log.cardio.heartRate ? ' · 心率' + log.cardio.heartRate + 'bpm' : ''}</div>
      </div>
    `;
  }

  $('#modal-body').innerHTML = html;
  $('#modal-overlay').classList.add('open');
};

window.closeModal = function() {
  $('#modal-overlay').classList.remove('open');
};

// ==================== 设置页 ====================

function renderSettings() {
  let html = `
    <div style="font-size:var(--font-size-xl);font-weight:800;margin-bottom:var(--space-lg)">⚙️ 设置</div>

    <div class="settings-section">
      <div class="settings-section-title">训练偏好</div>
      <div class="card">
        <div class="settings-row">
          <div>
            <div class="settings-label">⏱️ 组间休息默认时长</div>
            <div class="settings-desc">每组完成后自动倒计时（秒）</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <button class="btn btn-sm btn-outline" onclick="adjustRestDefault(-15)" style="width:36px;padding:4px">−</button>
            <span id="rest-default-display" style="font-family:var(--font-mono);min-width:32px;text-align:center;font-weight:700">${restDefaultSeconds}</span>
            <button class="btn btn-sm btn-outline" onclick="adjustRestDefault(15)" style="width:36px;padding:4px">+</button>
            <span style="font-size:var(--font-size-xs);color:var(--color-text-muted)">秒</span>
          </div>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">数据管理</div>
      <div class="card">
        <div class="settings-row">
          <div>
            <div class="settings-label">📥 导入训练计划</div>
            <div class="settings-desc">从 WorkBuddy 导出的 JSON 计划文件</div>
          </div>
          <button class="btn btn-sm btn-outline" onclick="document.getElementById('import-input').click()">选择文件</button>
        </div>
        <div class="settings-row">
          <div>
            <div class="settings-label">📤 导出训练日志</div>
            <div class="settings-desc">发给 WorkBuddy 分析的 JSON 文件</div>
          </div>
          <button class="btn btn-sm btn-outline" onclick="exportLogs()">导出</button>
        </div>
        <div class="settings-row" style="border:none">
          <div>
            <div class="settings-label">🗑️ 清除所有数据</div>
            <div class="settings-desc">删除所有训练计划和记录</div>
          </div>
          <button class="btn btn-sm btn-outline" style="color:var(--color-danger)" onclick="clearAllData()">清除</button>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">当前计划</div>
      <div class="card">
        <div class="settings-row">
          <div>
            <div class="settings-label">${currentPlan?.name || '无计划'}</div>
            <div class="settings-desc">v${currentPlan?.version || '-'} · ${currentPlan?.createdAt || '-'}</div>
          </div>
          <span class="badge badge-blue">已加载</span>
        </div>
        <div class="settings-row" style="border:none">
          <div>
            <div class="settings-label">运动员类型</div>
            <div class="settings-desc">${currentPlan?.athlete?.type || '-'}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">关于</div>
      <div class="card">
        <div class="settings-row">
          <div class="settings-label">训练 PWA</div>
          <div class="settings-value">v1.0</div>
        </div>
        <div class="settings-row" style="border:none">
          <div class="settings-label">数据存储</div>
          <div class="settings-value">仅本地 · 可导出备份</div>
        </div>
      </div>
    </div>

    <input type="file" id="import-input" class="file-input-hidden" accept=".json" onchange="importPlan(event)">
  `;

  $('#settings-content').innerHTML = html;
}

window.importPlan = async function(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    const data = JSON.parse(text);

    if (data.format !== 'workbuddy-training-plan' || !data.plan) {
      showToast('❌ 文件格式不正确', 'error');
      return;
    }

    await DB.savePlan(data.plan);
    currentPlan = data.plan;
    showToast('✅ 计划导入成功！', 'success');
    renderSettings();
  } catch (e) {
    showToast('❌ 导入失败：' + e.message, 'error');
  }
};

window.exportLogs = async function() {
  try {
    const data = await DB.exportAll();
    const exportData = {
      format: 'workbuddy-training-log',
      version: 1,
      exportedAt: new Date().toISOString(),
      logs: data.logs
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `训练日志_${todayStr()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('✅ 日志已导出！可以发给 WorkBuddy 分析', 'success');
  } catch (e) {
    showToast('❌ 导出失败：' + e.message, 'error');
  }
};

window.adjustRestDefault = function(delta) {
  restDefaultSeconds = Math.max(15, Math.min(300, restDefaultSeconds + delta));
  const display = $('#rest-default-display');
  if (display) display.textContent = restDefaultSeconds;
  showToast(`组间休息设为 ${restDefaultSeconds} 秒`, 'success');
};

window.clearAllData = async function() {
  if (!confirm('确定要清除所有数据吗？此操作不可撤销！')) return;
  if (!confirm('再次确认：所有训练记录和计划都将被删除。')) return;

  try {
    await DB.clearAll();
    currentPlan = null;
    allLogs = [];
    showToast('数据已清除', 'success');
    // 重新初始化
    await initApp();
    renderSettings();
  } catch (e) {
    showToast('❌ 清除失败：' + e.message, 'error');
  }
};

// ==================== 导航处理 ====================

router.on('/', async () => {
  showPage('today');
  renderToday();
}).on('/train', async (params) => {
  showPage('train');
  renderTraining(params);
}).on('/history', async () => {
  showPage('history');
  renderHistory();
}).on('/settings', async () => {
  showPage('settings');
  renderSettings();
});

// ==================== 启动 ====================

document.addEventListener('DOMContentLoaded', async () => {
  // 底部导航
  $$('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const page = item.dataset.page;
      router.navigate(page === 'today' ? '/' : `/${page}`);
    });
  });

  // 点击遮罩关闭弹窗
  $('#modal-overlay')?.addEventListener('click', (e) => {
    if (e.target === $('#modal-overlay')) closeModal();
  });

  await initApp();
  router.start();
});
