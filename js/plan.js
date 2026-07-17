/**
 * plan.js — 种子训练计划数据
 * 嵌入用户的推拉循环计划，首次启动时自动加载
 */

const SEED_PLAN = {
  id: 'plan-pull-push-v1',
  name: '休赛期康复训练计划',
  version: '1.0',
  createdAt: '2026-07-14',
  updatedAt: '2026-07-17',
  notes: '大体重橄榄球运动员康复期推拉循环。原则：关节优先、控制离心、不做力竭组。',
  athlete: {
    type: '大体重橄榄球运动员',
    phase: '休赛期 / 康复训练期'
  },
  schedule: [
    {
      date: '2026-07-17',
      dayOfWeek: '周五',
      sessionType: 'functional',
      title: '功能性训练',
      intensity: '低-中',
      hasCardio: true,
      notes: '训练营前最后一个激活日。不做大重量、不做大容量，只做低强度功能性激活+有氧刷脂。',
      warmup: [
        { id: 'wu1', name: '泡沫轴全身滚动', sets: 1, reps: 30, unit: '秒/部位', notes: '胸椎、背阔肌、股四头、髋屈肌' },
        { id: 'wu2', name: '猫牛式', sets: 1, reps: 10, unit: '次', notes: '慢速，活动胸椎' },
        { id: 'wu3', name: '死虫式', sets: 1, reps: 10, unit: '次/侧', notes: '激活核心' },
        { id: 'wu4', name: '弹力带肩关节环绕', sets: 1, reps: 10, unit: '次/方向', notes: '前后各10次' },
        { id: 'wu5', name: '弹力带侧步走', sets: 1, reps: 15, unit: '步/侧', notes: '激活臀中肌' },
        { id: 'wu6', name: '空杆/轻哑铃适应性热身', sets: 2, reps: 10, unit: '次', notes: '找发力感' }
      ],
      exercises: [
        {
          id: 'fn1', name: '弹力带侧步走', target: '3×15步/侧',
          isSuperset: false, restBetweenSets: '45s',
          sets: [
            { setNumber: 1, reps: 15, unit: '步/侧', weight: null },
            { setNumber: 2, reps: 15, unit: '步/侧', weight: null },
            { setNumber: 3, reps: 15, unit: '步/侧', weight: null }
          ],
          notes: '激活臀中肌，大体重膝盖保护的关键'
        },
        {
          id: 'fn2', name: '鸟狗式', target: '3×8/侧',
          isSuperset: false, tempo: '2-1-1', restBetweenSets: '45s',
          sets: [
            { setNumber: 1, reps: 8, unit: '次/侧', weight: null },
            { setNumber: 2, reps: 8, unit: '次/侧', weight: null },
            { setNumber: 3, reps: 8, unit: '次/侧', weight: null }
          ],
          notes: '核心稳定+脊柱中立控制'
        },
        {
          id: 'fn3', name: '死虫式进阶', target: '3×8/侧',
          isSuperset: false, tempo: '2-1-1', restBetweenSets: '45s',
          sets: [
            { setNumber: 1, reps: 8, unit: '次/侧', weight: null },
            { setNumber: 2, reps: 8, unit: '次/侧', weight: null },
            { setNumber: 3, reps: 8, unit: '次/侧', weight: null }
          ],
          notes: '核心深层激活'
        },
        {
          id: 'fn4', name: '弹力带面拉', target: '3×12',
          isSuperset: false, tempo: '2-1-2', restBetweenSets: '45s',
          sets: [
            { setNumber: 1, reps: 12, unit: '次', weight: null },
            { setNumber: 2, reps: 12, unit: '次', weight: null },
            { setNumber: 3, reps: 12, unit: '次', weight: null }
          ],
          notes: '肩袖激活，为训练营扛撞击准备'
        },
        {
          id: 'fn5', name: 'Pallof Press 静力抗旋', target: '3×15秒/侧',
          isSuperset: false, restBetweenSets: '30s',
          sets: [
            { setNumber: 1, reps: 15, unit: '秒/侧', weight: null },
            { setNumber: 2, reps: 15, unit: '秒/侧', weight: null },
            { setNumber: 3, reps: 15, unit: '秒/侧', weight: null }
          ],
          notes: '绳索或弹力带，训练营对抗需要'
        },
        {
          id: 'fn6', name: '药球旋转砸墙', target: '3×6/侧',
          isSuperset: false, restBetweenSets: '60s',
          sets: [
            { setNumber: 1, reps: 6, unit: '次/侧', weight: '4-6kg' },
            { setNumber: 2, reps: 6, unit: '次/侧', weight: '4-6kg' },
            { setNumber: 3, reps: 6, unit: '次/侧', weight: '4-6kg' }
          ],
          notes: '轻量旋转爆发唤醒'
        },
        {
          id: 'fn7', name: '壶铃摇摆', target: '3×10',
          isSuperset: false, restBetweenSets: '60s',
          sets: [
            { setNumber: 1, reps: 10, unit: '次', weight: '16-20kg' },
            { setNumber: 2, reps: 10, unit: '次', weight: '16-20kg' },
            { setNumber: 3, reps: 10, unit: '次', weight: '16-20kg' }
          ],
          notes: '后链激活+呼吸'
        }
      ],
      cardio: {
        type: '爬坡快走',
        duration: '30min',
        intensity: '坡度10-12，速度4-5km/h，心率120-135',
        notes: '功能训练之后做'
      }
    },
    {
      date: '2026-07-18',
      dayOfWeek: '周六',
      sessionType: 'rest',
      title: '训练营前准备（完全休息）',
      intensity: '—',
      hasCardio: false,
      notes: '不做任何力量，不做任何体能。只做泡沫轴+动态拉伸+碳水加餐。',
      warmup: [],
      exercises: [],
      nutrition: '全天3L水，高质量碳水。蛋白质照常1.8-2.0g/kg。'
    },
    {
      date: '2026-07-19',
      dayOfWeek: '周日',
      sessionType: 'event',
      title: '训练营',
      intensity: '按教练安排',
      hasCardio: false,
      notes: '早餐吃够：米饭/馒头+鸡蛋+香蕉',
      warmup: [],
      exercises: []
    }
  ],
  exerciseLibrary: []
};

/**
 * 推日动作库（供后续排课使用）
 */
function getPushDayTemplate() {
  return {
    warmup: [
      { id: 'wu1', name: '泡沫轴全身滚动', sets: 1, reps: 30, unit: '秒/部位', notes: '胸椎、背阔肌、股四头、髋屈肌' },
      { id: 'wu2', name: '猫牛式', sets: 1, reps: 10, unit: '次' },
      { id: 'wu3', name: '死虫式', sets: 1, reps: 10, unit: '次/侧' },
      { id: 'wu4', name: '弹力带肩关节环绕', sets: 1, reps: 10, unit: '次/方向' },
      { id: 'wu5', name: '弹力带侧步走', sets: 1, reps: 15, unit: '步/侧' },
      { id: 'wu6', name: '空杆/轻哑铃适应性热身', sets: 2, reps: 10, unit: '次' }
    ],
    exercises: [
      {
        id: 'push1', name: '杠铃平板卧推',
        target: '2×8热身 + 5组(5/5/5/4/3)', tempo: '3-1-1',
        isSuperset: false, restBetweenSets: '90s',
        sets: [
          { setNumber: 1, reps: 8, weight: 20, isWarmup: true },
          { setNumber: 2, reps: 8, weight: 40, isWarmup: true },
          { setNumber: 3, reps: 5, weight: 60 },
          { setNumber: 4, reps: 5, weight: 60 },
          { setNumber: 5, reps: 5, weight: 60 },
          { setNumber: 6, reps: 4, weight: 60 },
          { setNumber: 7, reps: 3, weight: 60 }
        ],
        notes: '金字塔递减，控制离心'
      },
      {
        id: 'push2', name: '上斜史密斯卧推',
        target: '4×(8/6/6/6)', tempo: '3-1-1',
        isSuperset: false, restBetweenSets: '75s',
        sets: [
          { setNumber: 1, reps: 8, weight: 25 },
          { setNumber: 2, reps: 6, weight: 25 },
          { setNumber: 3, reps: 6, weight: 25 },
          { setNumber: 4, reps: 6, weight: 25 }
        ],
        notes: '角度25-30°，锁骨下方触杠'
      },
      {
        id: 'push3a', name: '站姿轮换推举',
        target: '5×5', tempo: '2-0-1', supersetWith: 'push3b',
        isSuperset: true, restBetweenSets: '0s',
        sets: [
          { setNumber: 1, reps: 5, weight: 30 },
          { setNumber: 2, reps: 5, weight: 30 },
          { setNumber: 3, reps: 5, weight: 30 },
          { setNumber: 4, reps: 5, weight: 30 },
          { setNumber: 5, reps: 5, weight: 30 }
        ],
        notes: '交替推，肩袖预疲劳'
      },
      {
        id: 'push3b', name: '绳索双臂下压',
        target: '5×6', tempo: '2-0-2', supersetWith: 'push3a',
        isSuperset: true, restBetweenSets: '90s',
        sets: [
          { setNumber: 1, reps: 6, weight: 18 },
          { setNumber: 2, reps: 6, weight: 18 },
          { setNumber: 3, reps: 6, weight: 18 },
          { setNumber: 4, reps: 6, weight: 18 },
          { setNumber: 5, reps: 6, weight: 18 }
        ],
        notes: '紧接推举之后不休息'
      }
    ]
  };
}

/**
 * 拉日动作库
 */
function getPullDayTemplate() {
  return {
    warmup: [
      { id: 'wu1', name: '泡沫轴全身滚动', sets: 1, reps: 30, unit: '秒/部位' },
      { id: 'wu2', name: '猫牛式', sets: 1, reps: 10 },
      { id: 'wu3', name: '死虫式', sets: 1, reps: 10, unit: '次/侧' },
      { id: 'wu4', name: '弹力带肩关节环绕', sets: 1, reps: 10, unit: '次/方向' },
      { id: 'wu5', name: '弹力带侧步走', sets: 1, reps: 15, unit: '步/侧' }
    ],
    exercises: [
      {
        id: 'pull1', name: '高位下拉（宽握）',
        target: '2×10热身 + 4组(10/8/8/6)', tempo: '3-1-1',
        isSuperset: false, restBetweenSets: '90s',
        sets: [
          { setNumber: 1, reps: 10, weight: 15, isWarmup: true },
          { setNumber: 2, reps: 10, weight: 37.5, isWarmup: true },
          { setNumber: 3, reps: 10, weight: 37.5 },
          { setNumber: 4, reps: 8, weight: 37.5 },
          { setNumber: 5, reps: 8, weight: 37.5 },
          { setNumber: 6, reps: 6, weight: 37.5 }
        ],
        notes: '锁肩胛，肘沿身体两侧下压'
      },
      {
        id: 'pull2', name: '坐姿绳索划船',
        target: '4×10-12', tempo: '3-1-1',
        isSuperset: false, restBetweenSets: '75s',
        sets: [
          { setNumber: 1, reps: 12, weight: 25 },
          { setNumber: 2, reps: 10, weight: 25 },
          { setNumber: 3, reps: 10, weight: 25 },
          { setNumber: 4, reps: 10, weight: 25 }
        ],
        notes: '挺胸，肘贴身向后拉，肩胛骨夹紧'
      },
      {
        id: 'pull3a', name: '绳索面拉',
        target: '4×12', tempo: '2-1-2', supersetWith: 'pull3b',
        isSuperset: true, restBetweenSets: '0s',
        sets: [
          { setNumber: 1, reps: 12, weight: 10 },
          { setNumber: 2, reps: 12, weight: 10 },
          { setNumber: 3, reps: 12, weight: 10 },
          { setNumber: 4, reps: 12, weight: 10 }
        ],
        notes: '拉到眉高度，外旋大拇指朝后'
      },
      {
        id: 'pull3b', name: '俯身杠铃后束飞鸟',
        target: '4×12-15', tempo: '2-0-2', supersetWith: 'pull3a',
        isSuperset: true, restBetweenSets: '75s',
        sets: [
          { setNumber: 1, reps: 12, weight: 10 },
          { setNumber: 2, reps: 12, weight: 10 },
          { setNumber: 3, reps: 12, weight: 10 },
          { setNumber: 4, reps: 12, weight: 10 }
        ],
        notes: '轻杠，拇指握，夹肘'
      },
      {
        id: 'pull4', name: '二头+握力复合（静态悬挂+反向划船）',
        target: '3组',
        isSuperset: false, restBetweenSets: '60s',
        sets: [
          { setNumber: 1, reps: 1, unit: '组（悬挂30s+划船6次）' },
          { setNumber: 2, reps: 1, unit: '组' },
          { setNumber: 3, reps: 1, unit: '组' }
        ],
        notes: '悬挂在罗马杆上→立刻翻身上反向划船6次'
      }
    ]
  };
}

export { SEED_PLAN, getPushDayTemplate, getPullDayTemplate };
