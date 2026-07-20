# 🏋️ 训练追踪 PWA

> **大体重橄榄球运动员 · 推拉循环 · 康复训练期**  
> 离线可用的训练追踪工具，配合 [WorkBuddy](https://www.codebuddy.cn) AI 教练实现计划同步与数据分析。

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-在线-blue?style=flat-square)](https://da77ashyt.github.io/training-pwa/)
[![PWA](https://img.shields.io/badge/PWA-离线可用-5a0fc8?style=flat-square)](https://da77ashyt.github.io/training-pwa/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#license)

---

## 目录

- [📖 项目简介](#-项目简介)
- [✨ 功能特性](#-功能特性)
- [📱 使用方式](#-使用方式)
- [🔄 与 AI 教练的协作流程](#-与-ai-教练的协作流程)
- [📊 数据模型概述](#-数据模型概述)
- [🛠 技术栈](#-技术栈)
- [📂 项目结构](#-项目结构)
- [🚀 本地开发](#-本地开发)
- [📋 开发路线图](#-开发路线图)
- [⚖️ License](#️-license)

---

## 📖 项目简介

这是一款专为**推拉循环训练**设计的纯前端 PWA（Progressive Web App）。核心设计理念：

- **离线优先** — 健身房无信号也能完整使用
- **零服务器** — 所有数据存储在浏览器 IndexedDB，不依赖后端
- **数据主权** — 纯 JSON 导入/导出，随时可以迁移
- **AI 增强** — 与 WorkBuddy 协作实现计划生成、趋势分析和容量管理

### 适用场景

| 场景 | 说明 |
|------|------|
| 力量训练（推/拉/腿） | 记录每组重量×次数，自动计算总容量 |
| 功能性训练 | 弹力带、药球、核心激活等动作记录 |
| 超级组训练 | 两个动作交替，休息倒计时 |
| 有氧训练 | 时长、心率记录 |
| 训练营/赛事 | 特殊日期的活动安排与记录 |
| 康复期训练 | 精细监控 RPE、关节疼痛、睡眠恢复 |

---

## ✨ 功能特性

### 📋 今日概览
- 当天训练类型（推/拉/功能性/休息/训练营）
- 强度提醒 + 当日备注（如"训练营前最后激活"）
- 本周训练完成进度条
- 本周各次训练容量对比

### 💪 训练模式
- **动作列表**：热身 → 主训练 → 有氧，从上到下依次完成
- **组数记录**：点击记录每组实际重量和次数
- **超级组支持**：蓝色标签标识，自动提示配对动作
- **训练计时器**：实时计时，记录总耗时
- **训练反馈**：训练完成后填写 RPE（1-10）、身体感受、睡眠质量、关节疼痛

### 📊 历史记录
- 日历视图 — 哪天练了什么一目了然
- 训练详情弹窗 — 每组数据、容量、RPE、备注
- 按日期排序的训练列表

### ⚙️ 设置
- **导入计划**：导入 WorkBuddy 生成的 `.json` 计划文件
- **导出日志**：导出训练记录 `.json`，发给 WorkBuddy 分析
- **数据管理**：清除所有数据

### 📱 PWA
- **添加到主屏幕**：手机 Chrome → 添加到主屏幕，像原生 App 一样使用
- **离线可用**：Service Worker 缓存所有静态资源
- **暗色主题**：`#0f0f0f` 深色背景，运动红 `#e63946` 主色

---

## 📱 使用方式

### 在线访问

| 地址 | 说明 |
|------|------|
| `https://da77ashyt.github.io/training-pwa/` | GitHub Pages（海外，需 VPN） |
| `https://training-pwa.pages.dev` | Cloudflare Pages（国内直连 ✅，自动部署） |

### 安装到桌面（推荐）

**Chrome（Android/桌面）**：
1. 打开上面的链接
2. 地址栏右侧点击 **安装图标**（或菜单 → 添加到主屏幕）
3. 像普通 App 一样使用

**Safari（iOS）**：
1. 打开上面的链接
2. 点击分享按钮 → **添加到主屏幕**
3. 图标会出现在桌面

### 每日工作流

```
① 打开 PWA → 今日页看训练内容
② 点击"开始训练" → 进入训练模式
③ 完成每组后记录重量+次数
④ 所有动作做完 → 填写 RPE/感受/睡眠
⑤ 完成训练，数据自动存入本地
```

### 与 WorkBuddy 同步

```
🎯 导入新计划
    设置页 → 导入 → 选择 plan.json

📤 导出日志给 AI 分析
    设置页 → 导出 → 得到 logs.json → 发给 WorkBuddy
```

---

## 🔄 与 AI 教练的协作流程

```
[WorkBuddy 调计划] ──→ [导出 plan.json]
                              │
                              ▼
                    [手机导入 PWA → 开始训练]
                              │
                              ▼
                    [记录每组重量/次数]
                              │
                              ▼
                    [填写 RPE/睡眠/感受]
                              │
                              ▼
                    [导出 logs.json → 发给 WorkBuddy]
                              │
                              ▼
              [WorkBuddy 分析 → 调优新计划]
                              │
                              └── 循环 ──→
```

### 典型场景

**场景 A：新周期开始**
> 你："下周计划怎么调？"
> → WorkBuddy 分析最近日志 → 生成新计划 JSON → 你导入 PWA

**场景 B：阶段总结**
> 你："帮我看看这周训练状态"
> → 导出 logs.json → WorkBuddy 分析容量/RPE/恢复趋势 → 输出调整建议

**场景 C：训练中突发状况**
> 你训练中感觉左肩不适，在 PWA 中备注
> → 导出日志 → WorkBuddy 判断疲劳积累 → 调整后续动作安排

---

## 📊 数据模型概述

### 训练计划 (`WorkoutPlan`)

```typescript
{
  id: string,
  name: string,           // "休赛期康复训练计划"
  version: string,         // "1.0"
  athlete: { type, phase },
  schedule: DaySchedule[], // 每日安排
}
```

### 每日安排 (`DaySchedule`)

| 字段 | 说明 | 示例 |
|------|------|------|
| `sessionType` | 训练类型 | `push` / `pull` / `functional` / `rest` / `event` |
| `exercises` | 动作组 | 每组含动作名、目标重量×次数、是否超级组 |
| `warmup` | 热身动作 | 泡沫轴、动态拉伸等 |
| `cardio` | 有氧安排 | 类型、时长、强度 |
| `notes` | 当日提醒 | "训练营前最后激活" |

### 训练日志 (`WorkoutLog`)

```typescript
{
  date: "2026-07-16",
  sessionType: "pull",
  duration: 53,            // 分钟
  totalVolume: 6180,       // 总容量 (kg)
  rpe: 6,                  // 主观疲劳评分 1-10
  feeling: "正常",         // 身体感受
  bodyStatus: {
    sleepQuality: 3,       // 1-5
    sleepHours: 8,
    jointPain: [],
    painLevel: 1
  },
  sets: [ /* 每组记录 */ ],
  cardio: { type, duration, heartRate }
}
```

---

## 🛠 技术栈

| 层级 | 选择 | 原因 |
|------|------|------|
| UI | **原生 HTML/CSS/JS** | 零依赖，PWA 体积小，开箱即用 |
| 样式 | **CSS Custom Properties** | 主题变量化，深色主题统一管理 |
| 存储 | **IndexedDB** | 结构化数据，支持索引查询 |
| 路由 | **Hash-based SPA Router** | 轻量，兼容多浏览器 |
| PWA | **Service Worker + Manifest** | 离线缓存 + 可安装到桌面 |
| 部署 | **GitHub Pages + Cloudflare Pages** | 免费 HTTPS，国内直连，自动 CDN |
| CI/CD | **GitHub Actions** | push 自动部署到 Cloudflare Pages |

---

## 📂 项目结构

```
training-pwa/
├── index.html          # SPA 主页面（暗色主题，底部导航）
├── manifest.json       # PWA 配置（可安装到桌面）
├── sw.js               # Service Worker（Cache First 策略）
├── css/
│   ├── variables.css   # 主题色 CSS 变量
│   └── style.css       # 全局样式（完整）
├── js/
│   ├── app.js          # 主逻辑：路由、训练记录、反馈、导入导出
│   ├── db.js           # IndexedDB 封装（CRUD 操作）
│   ├── plan.js         # 种子训练计划数据 + 历史训练记录
│   └── router.js       # SPA 哈希路由
├── icons/
│   ├── icon.svg        # SVG 图标源文件
│   ├── icon-192.png    # PWA 图标 192×192
│   ├── icon-512.png    # PWA 图标 512×512
│   └── icon-512-maskable.png  # 自适应图标
└── README.md           # 本文件
```

---

## 🚀 本地开发

### 前置条件

- 任意现代浏览器（Chrome / Safari / Edge）
- 无需安装任何工具链

### 方式一：直接打开

```bash
# 克隆仓库
git clone https://github.com/DA77ashyt/training-pwa.git

# 直接双击 index.html 即可运行
# （Service Worker 在 file:// 协议下无法注册，建议用方式二）
```

### 方式二：本地 HTTP 服务器（推荐）

```bash
# 使用 Python（如果你有 Python）
cd training-pwa
python3 -m http.server 8080

# 或使用 Node.js（如果你有 Node）
npx serve training-pwa

# 然后浏览器打开 http://localhost:8080
```

### 构建说明

本项目为纯静态文件，无需构建步骤。修改后直接刷新浏览器即可看到效果。

---

## 📋 开发路线图

| 阶段 | 内容 | 状态 |
|------|------|------|
| **Phase 1 — MVP** | 今日概览 + 训练模式（记录组数/次数/重量）+ IndexedDB + 导入/导出 JSON + PWA 配置 | ✅ **已完成** |
| **Phase 2 — 体验** | 训练反馈（RPE/身体状态/睡眠）+ 历史查看 + 日历 + 周进度 | ✅ **已完成** |
| **Phase 3 — 分析** | 容量趋势图 + RPE 趋势 + 动作库管理 | ⏳ 计划中 |
| **Phase 4 — 增强** | 小米运动健康数据融合、通知提醒 | 🔮 远期规划 |

---

## ⚖️ License

MIT License — 随意使用、修改和分享。

---

> 有任何问题或建议，欢迎通过 WorkBuddy 与作者联系。  
> 数据只存储在本地浏览器中，不上传任何服务器。
