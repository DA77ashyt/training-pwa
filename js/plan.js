/**
 * plan.js — 种子训练计划数据
 * 嵌入用户的推拉循环计划，首次启动时自动加载
 */

const SEED_PLAN = {
  id: 'plan-pull-push-v1',
  name: '休赛期康复训练计划',
  version: '1.0',
  createdAt: '2026-07-14',
  updatedAt: '2026-07-20',
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
    },
    // ====== 第二周（7/20 - 7/26）======
    {
      date: '2026-07-20',
      dayOfWeek: '周一',
      sessionType: 'push',
      title: '推日（过渡）',
      intensity: '中等（过渡）',
      hasCardio: true,
      notes: '训练营后第一天，降10%容量做起。55kg起步，感觉好再往上走。',
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
          id: 'w2-push1', name: '杠铃平板卧推', target: '2×8热身(20/40) + 5组55kg(5/5/5/5/4)',
          tempo: '3-1-1', isSuperset: false, restBetweenSets: '90s',
          sets: [
            { setNumber: 1, reps: 8, weight: 20, isWarmup: true },
            { setNumber: 2, reps: 8, weight: 40, isWarmup: true },
            { setNumber: 3, reps: 5, weight: 55 },
            { setNumber: 4, reps: 5, weight: 55 },
            { setNumber: 5, reps: 5, weight: 55 },
            { setNumber: 6, reps: 5, weight: 55 },
            { setNumber: 7, reps: 4, weight: 55 }
          ],
          notes: '比上周降5kg，先找回发力感'
        },
        {
          id: 'w2-push2', name: '上斜史密斯卧推', target: '4×(8/8/6/6)',
          tempo: '3-1-1', isSuperset: false, restBetweenSets: '75s',
          sets: [
            { setNumber: 1, reps: 8, weight: 25 },
            { setNumber: 2, reps: 8, weight: 25 },
            { setNumber: 3, reps: 6, weight: 25 },
            { setNumber: 4, reps: 6, weight: 25 }
          ],
          notes: '25kg保持不变，注意离心控制'
        },
        {
          id: 'w2-push3a', name: '站姿轮换推举', target: '5×5',
          tempo: '2-0-1', supersetWith: 'w2-push3b', isSuperset: true, restBetweenSets: '0s',
          sets: [
            { setNumber: 1, reps: 5, weight: 30 },
            { setNumber: 2, reps: 5, weight: 30 },
            { setNumber: 3, reps: 5, weight: 30 },
            { setNumber: 4, reps: 5, weight: 30 },
            { setNumber: 5, reps: 5, weight: 30 }
          ],
          notes: '动作标准优先'
        },
        {
          id: 'w2-push3b', name: '绳索双臂下压', target: '5×6',
          tempo: '2-0-2', supersetWith: 'w2-push3a', isSuperset: true, restBetweenSets: '90s',
          sets: [
            { setNumber: 1, reps: 6, weight: 18 },
            { setNumber: 2, reps: 6, weight: 18 },
            { setNumber: 3, reps: 6, weight: 18 },
            { setNumber: 4, reps: 6, weight: 18 },
            { setNumber: 5, reps: 6, weight: 18 }
          ],
          notes: '紧接推举之后不休息'
        },
        {
          id: 'w2-push4', name: '平板支撑', target: '3×45s',
          isSuperset: false, restBetweenSets: '45s',
          sets: [
            { setNumber: 1, reps: 45, unit: '秒', weight: null },
            { setNumber: 2, reps: 45, unit: '秒', weight: null },
            { setNumber: 3, reps: 45, unit: '秒', weight: null }
          ],
          notes: '腰不下塌'
        },
        {
          id: 'w2-push5', name: '杠铃片农夫行走', target: '3×30m',
          isSuperset: false, restBetweenSets: '60s',
          sets: [
            { setNumber: 1, reps: 30, unit: 'm', weight: '15-20kg' },
            { setNumber: 2, reps: 30, unit: 'm', weight: '15-20kg' },
            { setNumber: 3, reps: 30, unit: 'm', weight: '15-20kg' }
          ],
          notes: '新增核心+握力收尾'
        }
      ],
      cardio: {
        type: '爬坡快走',
        duration: '30min',
        intensity: '坡度10-12，速度4-5km/h，心率120-135'
      }
    },
    {
      date: '2026-07-21',
      dayOfWeek: '周二',
      sessionType: 'pull',
      title: '拉日 + 体能',
      intensity: '中等',
      hasCardio: true,
      notes: '保持6180kg容量水平，尝试微量增加次数。最后一组高位下拉可试40kg。',
      warmup: [
        { id: 'wu1', name: '泡沫轴全身滚动', sets: 1, reps: 30, unit: '秒/部位' },
        { id: 'wu2', name: '猫牛式', sets: 1, reps: 10, unit: '次' },
        { id: 'wu3', name: '死虫式', sets: 1, reps: 10, unit: '次/侧' },
        { id: 'wu4', name: '弹力带肩关节环绕', sets: 1, reps: 10, unit: '次/方向' },
        { id: 'wu5', name: '弹力带侧步走', sets: 1, reps: 15, unit: '步/侧' }
      ],
      exercises: [
        {
          id: 'w2-pull1', name: '高位下拉（宽握）', target: '2×10热身 + 4组37.5kg(10/8/8/6) + 尝试40kg',
          tempo: '3-1-1', isSuperset: false, restBetweenSets: '90s',
          sets: [
            { setNumber: 1, reps: 10, weight: 15, isWarmup: true },
            { setNumber: 2, reps: 10, weight: 37.5, isWarmup: true },
            { setNumber: 3, reps: 10, weight: 37.5 },
            { setNumber: 4, reps: 8, weight: 37.5 },
            { setNumber: 5, reps: 8, weight: 37.5 },
            { setNumber: 6, reps: 6, weight: 37.5 }
          ],
          notes: '最后一组37.5×6完成轻松就试40kg×4-6'
        },
        {
          id: 'w2-pull1b', name: '窄距下拉（V把）', target: '4组32.5kg(10/8/8/6)',
          tempo: '3-1-1', isSuperset: false, restBetweenSets: '75s',
          sets: [
            { setNumber: 1, reps: 10, weight: 32.5 },
            { setNumber: 2, reps: 8, weight: 32.5 },
            { setNumber: 3, reps: 8, weight: 32.5 },
            { setNumber: 4, reps: 6, weight: 32.5 }
          ],
          notes: '窄距拉下背阔外缘'
        },
        {
          id: 'w2-pull2', name: '坐姿绳索划船', target: '1×10热身 + 4组30kg(10/8/8/6)',
          tempo: '3-1-1', isSuperset: false, restBetweenSets: '75s',
          sets: [
            { setNumber: 1, reps: 10, weight: 25, isWarmup: true },
            { setNumber: 2, reps: 10, weight: 30 },
            { setNumber: 3, reps: 8, weight: 30 },
            { setNumber: 4, reps: 8, weight: 30 },
            { setNumber: 5, reps: 6, weight: 30 }
          ],
          notes: '挺胸，肩胛夹紧'
        },
        {
          id: 'w2-pull3a', name: '绳索面拉', target: '4×12',
          tempo: '2-1-2', supersetWith: 'w2-pull3b', isSuperset: true, restBetweenSets: '0s',
          sets: [
            { setNumber: 1, reps: 12, weight: 10 },
            { setNumber: 2, reps: 12, weight: 10 },
            { setNumber: 3, reps: 12, weight: 10 },
            { setNumber: 4, reps: 12, weight: 10 }
          ],
          notes: '到眉高度，大拇指外旋'
        },
        {
          id: 'w2-pull3b', name: '俯身杠铃后束飞鸟', target: '4×12-15',
          tempo: '2-0-2', supersetWith: 'w2-pull3a', isSuperset: true, restBetweenSets: '75s',
          sets: [
            { setNumber: 1, reps: 12, weight: 10 },
            { setNumber: 2, reps: 12, weight: 10 },
            { setNumber: 3, reps: 12, weight: 10 },
            { setNumber: 4, reps: 12, weight: 10 }
          ],
          notes: '10-12kg轻杠'
        },
        {
          id: 'w2-pull4', name: '握力复合组（悬挂+反向划船）', target: '3组(悬挂25s+划船5次)',
          isSuperset: false, restBetweenSets: '60s',
          sets: [
            { setNumber: 1, reps: 1, unit: '组（悬挂25s+划船5次）' },
            { setNumber: 2, reps: 1, unit: '组' },
            { setNumber: 3, reps: 1, unit: '组' }
          ],
          notes: '取代孤立弯举'
        }
      ],
      cardio: {
        type: '固定单车',
        duration: '30min',
        intensity: '心率120-135',
        notes: '拉日力量+体能之后做'
      }
    },
    {
      date: '2026-07-22',
      dayOfWeek: '周三',
      sessionType: 'push',
      title: '推日（正常强度）',
      intensity: '中高',
      hasCardio: true,
      notes: '回到60kg水平，目标总容量23个（比上周+1）。',
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
          id: 'w2b-push1', name: '杠铃平板卧推', target: '2×8热身 + 5组60kg(5/5/5/5/3)',
          tempo: '3-1-1', isSuperset: false, restBetweenSets: '90s',
          sets: [
            { setNumber: 1, reps: 8, weight: 20, isWarmup: true },
            { setNumber: 2, reps: 8, weight: 40, isWarmup: true },
            { setNumber: 3, reps: 5, weight: 60 },
            { setNumber: 4, reps: 5, weight: 60 },
            { setNumber: 5, reps: 5, weight: 60 },
            { setNumber: 6, reps: 5, weight: 60 },
            { setNumber: 7, reps: 3, weight: 60 }
          ],
          notes: '目标23个总容量，第四组保持5次'
        },
        {
          id: 'w2b-push2', name: '上斜史密斯卧推', target: '4×(8/6/6/6)',
          tempo: '3-1-1', isSuperset: false, restBetweenSets: '75s',
          sets: [
            { setNumber: 1, reps: 8, weight: 25 },
            { setNumber: 2, reps: 6, weight: 25 },
            { setNumber: 3, reps: 6, weight: 25 },
            { setNumber: 4, reps: 6, weight: 25 }
          ],
          notes: '25kg，同上周'
        },
        {
          id: 'w2b-push3a', name: '站姿轮换推举', target: '5×5',
          tempo: '2-0-1', supersetWith: 'w2b-push3b', isSuperset: true, restBetweenSets: '0s',
          sets: [
            { setNumber: 1, reps: 5, weight: 30 },
            { setNumber: 2, reps: 5, weight: 30 },
            { setNumber: 3, reps: 5, weight: 30 },
            { setNumber: 4, reps: 5, weight: 30 },
            { setNumber: 5, reps: 5, weight: 30 }
          ],
          notes: '同上周'
        },
        {
          id: 'w2b-push3b', name: '绳索双臂下压', target: '5×6',
          tempo: '2-0-2', supersetWith: 'w2b-push3a', isSuperset: true, restBetweenSets: '90s',
          sets: [
            { setNumber: 1, reps: 6, weight: 18 },
            { setNumber: 2, reps: 6, weight: 18 },
            { setNumber: 3, reps: 6, weight: 18 },
            { setNumber: 4, reps: 6, weight: 18 },
            { setNumber: 5, reps: 6, weight: 18 }
          ],
          notes: '同上周'
        },
        {
          id: 'w2b-push4', name: '杠铃片农夫行走', target: '3×30m',
          isSuperset: false, restBetweenSets: '60s',
          sets: [
            { setNumber: 1, reps: 30, unit: 'm', weight: '20kg' },
            { setNumber: 2, reps: 30, unit: 'm', weight: '20kg' },
            { setNumber: 3, reps: 30, unit: 'm', weight: '20kg' }
          ],
          notes: '比周一加重'
        }
      ],
      cardio: {
        type: '固定单车',
        duration: '30min',
        intensity: '心率120-135'
      }
    },
    {
      date: '2026-07-23',
      dayOfWeek: '周四',
      sessionType: 'pull',
      title: '拉日 + 体能',
      intensity: '中等',
      hasCardio: true,
      notes: '与周二拉日相同模板，保持容量。',
      warmup: [
        { id: 'wu1', name: '泡沫轴全身滚动', sets: 1, reps: 30, unit: '秒/部位' },
        { id: 'wu2', name: '猫牛式', sets: 1, reps: 10, unit: '次' },
        { id: 'wu3', name: '死虫式', sets: 1, reps: 10, unit: '次/侧' },
        { id: 'wu4', name: '弹力带肩关节环绕', sets: 1, reps: 10, unit: '次/方向' },
        { id: 'wu5', name: '弹力带侧步走', sets: 1, reps: 15, unit: '步/侧' }
      ],
      exercises: [
        {
          id: 'w2c-pull1', name: '高位下拉（宽握）', target: '2×10热身 + 4组37.5kg(10/8/8/6)',
          tempo: '3-1-1', isSuperset: false, restBetweenSets: '90s',
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
          id: 'w2c-pull1b', name: '窄距下拉（V把）', target: '4组32.5kg(10/8/8/6)',
          tempo: '3-1-1', isSuperset: false, restBetweenSets: '75s',
          sets: [
            { setNumber: 1, reps: 10, weight: 32.5 },
            { setNumber: 2, reps: 8, weight: 32.5 },
            { setNumber: 3, reps: 8, weight: 32.5 },
            { setNumber: 4, reps: 6, weight: 32.5 }
          ],
          notes: '窄距拉下背阔外缘'
        },
        {
          id: 'w2c-pull2', name: '坐姿绳索划船', target: '1×10热身 + 4组30kg(10/8/8/6)',
          tempo: '3-1-1', isSuperset: false, restBetweenSets: '75s',
          sets: [
            { setNumber: 1, reps: 10, weight: 25, isWarmup: true },
            { setNumber: 2, reps: 10, weight: 30 },
            { setNumber: 3, reps: 8, weight: 30 },
            { setNumber: 4, reps: 8, weight: 30 },
            { setNumber: 5, reps: 6, weight: 30 }
          ],
          notes: '挺胸，肩胛夹紧'
        },
        {
          id: 'w2c-pull3a', name: '绳索面拉', target: '4×12',
          tempo: '2-1-2', supersetWith: 'w2c-pull3b', isSuperset: true, restBetweenSets: '0s',
          sets: [
            { setNumber: 1, reps: 12, weight: 10 },
            { setNumber: 2, reps: 12, weight: 10 },
            { setNumber: 3, reps: 12, weight: 10 },
            { setNumber: 4, reps: 12, weight: 10 }
          ],
          notes: '到眉高度，大拇指外旋'
        },
        {
          id: 'w2c-pull3b', name: '俯身杠铃后束飞鸟', target: '4×12-15',
          tempo: '2-0-2', supersetWith: 'w2c-pull3a', isSuperset: true, restBetweenSets: '75s',
          sets: [
            { setNumber: 1, reps: 12, weight: 10 },
            { setNumber: 2, reps: 12, weight: 10 },
            { setNumber: 3, reps: 12, weight: 10 },
            { setNumber: 4, reps: 12, weight: 10 }
          ],
          notes: '10-12kg轻杠'
        },
        {
          id: 'w2c-pull4', name: '握力复合组（悬挂+反向划船）', target: '3组(悬挂25s+划船5次)',
          isSuperset: false, restBetweenSets: '60s',
          sets: [
            { setNumber: 1, reps: 1, unit: '组（悬挂25s+划船5次）' },
            { setNumber: 2, reps: 1, unit: '组' },
            { setNumber: 3, reps: 1, unit: '组' }
          ],
          notes: '取代孤立弯举'
        }
      ],
      cardio: {
        type: '爬坡快走',
        duration: '30min',
        intensity: '坡度10-12，速度4-5km/h，心率120-135',
        notes: '拉日力量+体能之后做'
      }
    },
    {
      date: '2026-07-24',
      dayOfWeek: '周五',
      sessionType: 'functional',
      title: '轻量功能性训练',
      intensity: '低',
      hasCardio: true,
      notes: '周五是一周最后一天训练，周六全休蓄力周日训练营。不做大容量有氧，只做轻量激活。',
      warmup: [],
      exercises: [
        {
          id: 'w2-fn1', name: '弹力带侧步走', target: '3×15步/侧',
          isSuperset: false, restBetweenSets: '45s',
          sets: [
            { setNumber: 1, reps: 15, unit: '步/侧', weight: null },
            { setNumber: 2, reps: 15, unit: '步/侧', weight: null },
            { setNumber: 3, reps: 15, unit: '步/侧', weight: null }
          ],
          notes: '臀中肌激活'
        },
        {
          id: 'w2-fn2', name: '鸟狗式', target: '3×8/侧',
          isSuperset: false, tempo: '2-1-1', restBetweenSets: '45s',
          sets: [
            { setNumber: 1, reps: 8, unit: '次/侧', weight: null },
            { setNumber: 2, reps: 8, unit: '次/侧', weight: null },
            { setNumber: 3, reps: 8, unit: '次/侧', weight: null }
          ],
          notes: '核心稳定'
        },
        {
          id: 'w2-fn3', name: '死虫进阶', target: '3×8/侧',
          isSuperset: false, restBetweenSets: '45s',
          sets: [
            { setNumber: 1, reps: 8, unit: '次/侧', weight: null },
            { setNumber: 2, reps: 8, unit: '次/侧', weight: null },
            { setNumber: 3, reps: 8, unit: '次/侧', weight: null }
          ],
          notes: '深层核心'
        },
        {
          id: 'w2-fn4', name: '弹力带面拉', target: '3×12',
          isSuperset: false, tempo: '2-1-2', restBetweenSets: '45s',
          sets: [
            { setNumber: 1, reps: 12, unit: '次', weight: null },
            { setNumber: 2, reps: 12, unit: '次', weight: null },
            { setNumber: 3, reps: 12, unit: '次', weight: null }
          ],
          notes: '肩袖激活'
        },
        {
          id: 'w2-fn5', name: '壶铃摇摆', target: '3×10',
          isSuperset: false, restBetweenSets: '60s',
          sets: [
            { setNumber: 1, reps: 10, unit: '次', weight: '16-20kg' },
            { setNumber: 2, reps: 10, unit: '次', weight: '16-20kg' },
            { setNumber: 3, reps: 10, unit: '次', weight: '16-20kg' }
          ],
          notes: '后链+呼吸'
        },
        {
          id: 'w2-fn6', name: 'Pallof Press 静力抗旋', target: '3×15s/侧',
          isSuperset: false, restBetweenSets: '30s',
          sets: [
            { setNumber: 1, reps: 15, unit: '秒/侧', weight: null },
            { setNumber: 2, reps: 15, unit: '秒/侧', weight: null },
            { setNumber: 3, reps: 15, unit: '秒/侧', weight: null }
          ],
          notes: '核心抗旋'
        }
      ],
      cardio: {
        type: '爬坡快走',
        duration: '25min',
        intensity: '坡度10-12',
        notes: '减量，训练营前不消耗过多体力'
      }
    },
    {
      date: '2026-07-25',
      dayOfWeek: '周六',
      sessionType: 'rest',
      title: '训练营准备（全休）',
      intensity: '—',
      hasCardio: false,
      notes: '力量不做、体能不做、有氧不做——只做恢复和储备。泡沫轴全身放松+动态拉伸+碳水加餐。',
      warmup: [],
      exercises: [],
      nutrition: '全天3L水，高质量碳水。蛋白质照常1.8-2.0g/kg。训练营当天早餐：米饭/馒头+鸡蛋+香蕉。'
    },
    {
      date: '2026-07-26',
      dayOfWeek: '周日',
      sessionType: 'event',
      title: '🏈 训练营',
      intensity: '按教练安排',
      hasCardio: false,
      notes: '全力输出。前面一整个星期的推拉循环+体能+恢复都是为这一天准备的。',
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

/**
 * SEED_LOGS — 历史训练记录种子数据
 * 基于用户实际训练数据（7/15 推日 + 7/16 拉日）
 */
const SEED_LOGS = [
  // ====== 7/15 推日（周三）======
  {
    id: 'hist-2026-07-15',
    date: '2026-07-15',
    sessionType: 'push',
    planDayId: '2026-07-15',
    startTime: '16:00',
    endTime: '17:00',
    duration: 60,
    totalVolume: 3470,
    calories: null,
    rpe: 7,
    feeling: '困倦',
    bodyStatus: {
      sleepQuality: 2,
      sleepHours: 7,
      jointPain: [],
      painLevel: 1,
      notes: '状态偏困倦，强度中等偏上，注意恢复'
    },
    cardio: null,
    sets: [
      // 杠铃平板卧推 60kg 5组金字塔 5/5/5/4/3
      { exerciseId: 'push1', exerciseName: '杠铃平板卧推', groupId: 'push1', setNumber: 1, weight: 20, reps: 8, isCompleted: true, isWarmup: true },
      { exerciseId: 'push1', exerciseName: '杠铃平板卧推', groupId: 'push1', setNumber: 2, weight: 40, reps: 8, isCompleted: true, isWarmup: true },
      { exerciseId: 'push1', exerciseName: '杠铃平板卧推', groupId: 'push1', setNumber: 3, weight: 60, reps: 5, isCompleted: true },
      { exerciseId: 'push1', exerciseName: '杠铃平板卧推', groupId: 'push1', setNumber: 4, weight: 60, reps: 5, isCompleted: true },
      { exerciseId: 'push1', exerciseName: '杠铃平板卧推', groupId: 'push1', setNumber: 5, weight: 60, reps: 5, isCompleted: true },
      { exerciseId: 'push1', exerciseName: '杠铃平板卧推', groupId: 'push1', setNumber: 6, weight: 60, reps: 4, isCompleted: true },
      { exerciseId: 'push1', exerciseName: '杠铃平板卧推', groupId: 'push1', setNumber: 7, weight: 60, reps: 3, isCompleted: true },
      // 上斜史密斯卧推 25kg 4组 8/6/6/6
      { exerciseId: 'push2', exerciseName: '上斜史密斯卧推', groupId: 'push2', setNumber: 1, weight: 25, reps: 8, isCompleted: true },
      { exerciseId: 'push2', exerciseName: '上斜史密斯卧推', groupId: 'push2', setNumber: 2, weight: 25, reps: 6, isCompleted: true },
      { exerciseId: 'push2', exerciseName: '上斜史密斯卧推', groupId: 'push2', setNumber: 3, weight: 25, reps: 6, isCompleted: true },
      { exerciseId: 'push2', exerciseName: '上斜史密斯卧推', groupId: 'push2', setNumber: 4, weight: 25, reps: 6, isCompleted: true },
      // 站姿轮换推举 30kg 5×5（超级组）
      { exerciseId: 'push3a', exerciseName: '站姿轮换推举', groupId: 'push3a', setNumber: 1, weight: 30, reps: 5, isCompleted: true },
      { exerciseId: 'push3a', exerciseName: '站姿轮换推举', groupId: 'push3a', setNumber: 2, weight: 30, reps: 5, isCompleted: true },
      { exerciseId: 'push3a', exerciseName: '站姿轮换推举', groupId: 'push3a', setNumber: 3, weight: 30, reps: 5, isCompleted: true },
      { exerciseId: 'push3a', exerciseName: '站姿轮换推举', groupId: 'push3a', setNumber: 4, weight: 30, reps: 5, isCompleted: true },
      { exerciseId: 'push3a', exerciseName: '站姿轮换推举', groupId: 'push3a', setNumber: 5, weight: 30, reps: 5, isCompleted: true },
      // 绳索双臂下压 18kg 5×6（超级组）
      { exerciseId: 'push3b', exerciseName: '绳索双臂下压', groupId: 'push3b', setNumber: 1, weight: 18, reps: 6, isCompleted: true },
      { exerciseId: 'push3b', exerciseName: '绳索双臂下压', groupId: 'push3b', setNumber: 2, weight: 18, reps: 6, isCompleted: true },
      { exerciseId: 'push3b', exerciseName: '绳索双臂下压', groupId: 'push3b', setNumber: 3, weight: 18, reps: 6, isCompleted: true },
      { exerciseId: 'push3b', exerciseName: '绳索双臂下压', groupId: 'push3b', setNumber: 4, weight: 18, reps: 6, isCompleted: true },
      { exerciseId: 'push3b', exerciseName: '绳索双臂下压', groupId: 'push3b', setNumber: 5, weight: 18, reps: 6, isCompleted: true }
    ]
  },
  // ====== 7/16 拉日（周四）======
  {
    id: 'hist-2026-07-16',
    date: '2026-07-16',
    sessionType: 'pull',
    planDayId: '2026-07-16',
    startTime: '15:00',
    endTime: '15:53',
    duration: 53,
    totalVolume: 6180,
    calories: 271,
    rpe: 6,
    feeling: '正常',
    bodyStatus: {
      sleepQuality: 3,
      sleepHours: 8,
      jointPain: [],
      painLevel: 1,
      notes: '训练目标：背阔肌、中下背部、斜方肌、肩后束、小臂肌群'
    },
    cardio: {
      type: '固定单车',
      duration: 30,
      heartRate: 130
    },
    sets: [
      // 宽距下拉 37.5kg，15kg热身
      { exerciseId: 'pull1', exerciseName: '宽距下拉', groupId: 'pull1', setNumber: 1, weight: 15, reps: 12, isCompleted: true, isWarmup: true },
      { exerciseId: 'pull1', exerciseName: '宽距下拉', groupId: 'pull1', setNumber: 2, weight: 37.5, reps: 10, isCompleted: true },
      { exerciseId: 'pull1', exerciseName: '宽距下拉', groupId: 'pull1', setNumber: 3, weight: 37.5, reps: 8, isCompleted: true },
      { exerciseId: 'pull1', exerciseName: '宽距下拉', groupId: 'pull1', setNumber: 4, weight: 37.5, reps: 8, isCompleted: true },
      { exerciseId: 'pull1', exerciseName: '宽距下拉', groupId: 'pull1', setNumber: 5, weight: 37.5, reps: 6, isCompleted: true },
      // 窄距下拉 32.5kg 4组
      { exerciseId: 'pull1b', exerciseName: '窄距下拉', groupId: 'pull1b', setNumber: 1, weight: 32.5, reps: 10, isCompleted: true },
      { exerciseId: 'pull1b', exerciseName: '窄距下拉', groupId: 'pull1b', setNumber: 2, weight: 32.5, reps: 8, isCompleted: true },
      { exerciseId: 'pull1b', exerciseName: '窄距下拉', groupId: 'pull1b', setNumber: 3, weight: 32.5, reps: 8, isCompleted: true },
      { exerciseId: 'pull1b', exerciseName: '窄距下拉', groupId: 'pull1b', setNumber: 4, weight: 32.5, reps: 6, isCompleted: true },
      // 坐姿划船 30kg，25kg热身
      { exerciseId: 'pull2', exerciseName: '坐姿划船', groupId: 'pull2', setNumber: 1, weight: 25, reps: 8, isCompleted: true, isWarmup: true },
      { exerciseId: 'pull2', exerciseName: '坐姿划船', groupId: 'pull2', setNumber: 2, weight: 30, reps: 10, isCompleted: true },
      { exerciseId: 'pull2', exerciseName: '坐姿划船', groupId: 'pull2', setNumber: 3, weight: 30, reps: 8, isCompleted: true },
      { exerciseId: 'pull2', exerciseName: '坐姿划船', groupId: 'pull2', setNumber: 4, weight: 30, reps: 8, isCompleted: true },
      { exerciseId: 'pull2', exerciseName: '坐姿划船', groupId: 'pull2', setNumber: 5, weight: 30, reps: 6, isCompleted: true },
      // 潘德雷划船 50kg（本次最大负重）
      { exerciseId: 'pull4', exerciseName: '潘德雷划船', groupId: 'pull4', setNumber: 1, weight: 50, reps: 8, isCompleted: true },
      { exerciseId: 'pull4', exerciseName: '潘德雷划船', groupId: 'pull4', setNumber: 2, weight: 50, reps: 8, isCompleted: true },
      { exerciseId: 'pull4', exerciseName: '潘德雷划船', groupId: 'pull4', setNumber: 3, weight: 50, reps: 6, isCompleted: true },
      { exerciseId: 'pull4', exerciseName: '潘德雷划船', groupId: 'pull4', setNumber: 4, weight: 50, reps: 4, isCompleted: true },
      // 单腿杠铃片旋转 5kg×10（超级组）
      { exerciseId: 'pull5a', exerciseName: '单腿杠铃片旋转', groupId: 'pull5a', setNumber: 1, weight: 5, reps: 10, isCompleted: true },
      { exerciseId: 'pull5a', exerciseName: '单腿杠铃片旋转', groupId: 'pull5a', setNumber: 2, weight: 5, reps: 10, isCompleted: true },
      { exerciseId: 'pull5a', exerciseName: '单腿杠铃片旋转', groupId: 'pull5a', setNumber: 3, weight: 5, reps: 10, isCompleted: true },
      { exerciseId: 'pull5a', exerciseName: '单腿杠铃片旋转', groupId: 'pull5a', setNumber: 4, weight: 5, reps: 10, isCompleted: true },
      { exerciseId: 'pull5a', exerciseName: '单腿杠铃片旋转', groupId: 'pull5a', setNumber: 5, weight: 5, reps: 10, isCompleted: true },
      // 地雷杆甩 35kg×6（超级组）
      { exerciseId: 'pull5b', exerciseName: '地雷杆甩', groupId: 'pull5b', setNumber: 1, weight: 35, reps: 6, isCompleted: true },
      { exerciseId: 'pull5b', exerciseName: '地雷杆甩', groupId: 'pull5b', setNumber: 2, weight: 35, reps: 6, isCompleted: true },
      { exerciseId: 'pull5b', exerciseName: '地雷杆甩', groupId: 'pull5b', setNumber: 3, weight: 35, reps: 6, isCompleted: true },
      { exerciseId: 'pull5b', exerciseName: '地雷杆甩', groupId: 'pull5b', setNumber: 4, weight: 35, reps: 6, isCompleted: true },
      { exerciseId: 'pull5b', exerciseName: '地雷杆甩', groupId: 'pull5b', setNumber: 5, weight: 35, reps: 6, isCompleted: true }
    ]
  }
];

export { SEED_PLAN, SEED_LOGS, getPushDayTemplate, getPullDayTemplate };
