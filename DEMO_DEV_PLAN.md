# Flow Capital Demo 开发文档

> 版本：v0.4-demo | 更新时间：2026-03-05
> 定位：**杠杆暴利制造器 / 联营赌局设计器** 的可交互 Demo
> 仓库：https://github.com/liaowc18/flow-capital

---

## 一、产品定位

### 一句话

**给「狼」（资金端操盘手）用的杠杆工具** —— 让他们能主动设计、模拟并放大非对称收益结构的联营赌局。

### 不是什么

- 不是「AI 抖音」式的被动推荐引擎
- 不是帮老板做体检的 FA 工具（那只是底层数据来源）
- 不是传统 PE/VC 的投后管理系统

### 核心用户

**狼** —— 用有限自有资金（劣后），撬动大比例外部资金（优先），通过交易结构设计独占绝大部分超额利润的操盘手。

### 解决三个痛点

1. **防止分成扯皮** → 智能合约 & T+0 自动清算（当前 Demo：前端分账模拟表展示）
2. **合法拿到真实经营数据** → 5% 探针 + AI Agent（当前 Demo：手动填表 + 辅助材料上传）
3. **标准化复制** → P=MV 模型 + Look-alike（当前 Demo：mock 数据 + 前端欧氏距离匹配）

---

## 二、技术架构

### 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端 | Vanilla JS + Tailwind CSS (CDN) | 单文件 `app.js`，~3900 行 |
| 后端 | Hono + TypeScript | Cloudflare Workers 边缘运行时，`src/index.tsx`，1075 行 |
| 构建 | Vite + @hono/vite-cloudflare-pages | 输出 `dist/` 目录 |
| 部署 | Cloudflare Pages | `wrangler pages deploy dist` |
| AI 引擎 | OpenAI 兼容 API（可选） | 降级到本地 HSR 引擎 |
| 进程管理 | PM2 | `ecosystem.config.cjs` |

### 项目目录结构

```
webapp/
├── src/
│   └── index.tsx              # 后端入口（Hono 路由 + HSR 估值引擎 + wolfView + lookAlike）
├── public/
│   └── static/
│       ├── app.js             # 前端主逻辑（所有页面渲染 + 交互）
│       └── styles.css         # 自定义 CSS 样式
├── dist/                      # 构建输出（wrangler 部署用）
│   ├── _worker.js             # 编译后的 Hono 应用
│   └── static/
│       ├── app.js
│       └── styles.css
├── ecosystem.config.cjs       # PM2 配置
├── vite.config.ts             # Vite 构建配置
├── wrangler.jsonc             # Cloudflare Workers 配置
├── tsconfig.json              # TypeScript 配置
├── package.json               # 依赖与脚本
├── DEMO_DEV_PLAN.md           # 本文档
└── README.md                  # 项目说明
```

### API 路由

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/` | 主页 HTML（加载 app.js） |
| GET | `/static/*` | 静态资源 |
| POST | `/api/valuation` | 估值分析（LLM 优先 → 本地引擎降级） |

---

## 三、功能模块总览

### 当前已实现模块

```
┌──────────────────────────────────────────────────────────────┐
│                   Flow Capital Demo v0.4                      │
├──────────────────────┬───────────────────────────────────────┤
│  底层数据引擎          │  交互功能层                            │
├──────────────────────┼───────────────────────────────────────┤
│ ✅ HSR 六维体检引擎    │  ✅ M1. 🎰 造局工作台（独立Tab）       │
│ ✅ 基因分型（10种）    │  ✅ M2. 📡 雷达页面（独立Tab）         │
│ ✅ PE 估值区间        │  ✅ M3. 💸 T+0 分账模拟器（逐月表）     │
│ ✅ 老板视角翻译       │  ✅ M4. 🐺 狼视角判断（实时计算）       │
│ ✅ 定价参数输出       │  ✅ M5. 🔭 Look-alike 项目匹配         │
│ ✅ 风控清单          │  ✅ M6. 📜 联营方案导出（一页纸TXT）    │
│ ✅ 辅助材料上传       │  ✅ M7. 📄 HSR体检报告导出（TXT）       │
│ ✅ 异常指标检测       │  ✅ M8. 项目推荐卡片流（7个mock）       │
│ ✅ 结构化行动建议     │  ✅ M9. AI筛选面板（NLP解析示例）       │
│ 🟡 LLM 分析师接口    │  ✅ M10.行业参考基准表（11行业）        │
│   （代码就绪,key过期）│                                       │
└──────────────────────┴───────────────────────────────────────┘
```

### 底部导航结构（v0.4 重构）

```
发现 | 🎰造局 | [+发布] | 📡雷达 | 我的
```

| Tab | 页面ID | 核心功能 | 进入方式 |
|-----|--------|---------|---------|
| 发现 | page-home | 项目推荐卡片流、筛选面板 | 默认首页 |
| 🎰造局 | page-deal-lab | 赌局设计器、IRR计算、分账模拟 | 底部Tab / 首页骰子图标 |
| [+发布] | page-publish | 项目发布表单 | 底部中心按钮 |
| 📡雷达 | page-radar | Look-alike列表、快速体检入口、行业基准表 | 底部Tab |
| 我的 | page-profile | 消息通知、项目管理、设置 | 底部Tab |

辅助页面（非Tab直达）：
- `page-valuation`（HSR体检）：从造局/雷达/我的跳转进入
- `page-detail`（项目详情）：从项目卡片点击进入

### 造局工作台页面结构（纵向滚动）

```
🎰 造局工作台
├── 引导提示条（零门槛开始）
├── 行业快选（11个行业Tag，一键填入基准数据）
├── 基准数据条（日均流水/利润率/PE/周转天数）
├── 项目基本面微调（日均流水+利润率滑块）
├── 赌局设计器（6根杠杆滑块）
├── 实时计算结果
│   ├── 🐺 狼视角判断（盘口好不好）
│   ├── 核心指标（总盘口/杠杆/安全垫）
│   ├── 三档场景IRR（保守/中性/乐观）
│   ├── 极端风险提示
│   └── 分账规则说明
├── T+0 分账模拟表（可展开，逐月12行）
└── [导出方案] [用真数据校准→] 操作栏
```

### 雷达页面结构

```
📡 雷达
├── 引导提示条（发现好盘口）
├── 快速体检入口（30秒评估 → 跳转HSR）
├── 🔭 值得关注的盘口（6个Look-alike卡片）
│   ├── 相似度%、日流水、利润率、推荐杠杆、预估IRR
│   └── [套用到造局] [查看详情] 按钮
└── 行业参考基准表（11行业，点击跳转造局）
```

### 估值结果页面结构（纵向滚动，从造局/雷达跳转进入）

```
估值结果页
├── 1.  综合评分卡片（分数/等级/基因型/描述）
├── 2.  👔 老板视角翻译面板（ownerView）
├── 3.  💰 估值参考区间（保守/中性/乐观）
├── 4.  📊 六维体检进度条（6维度得分+verdict）
├── 5.  ⚠️ 异常指标Flag（偏离行业基准）
├── 6.  🎯 造局参数建议（PE/出让/交易结构/关键条件）
├── 7.  📐 定价参数（风险等级/违约概率/回本天数...）
├── 8.  📋 评估报告（一句话/优势/风险/建议/投资人话术）
├── 9.  ✅ 行动清单（红黄绿优先级）
├── 10. 🛡️ 风控清单（补充材料+减缓条款）
├── 11. 🐺 狼视角面板（verdict/结构/杠杆/安全垫/IRR/熔断/复制提示）
├── 12. 🎰 赌局设计器（6滑块实时计算 → 三档IRR + 极端风险）
├── 13. 💸 T+0 分账模拟表（可展开，逐月12行）
├── 14. 🔭 Look-alike 雷达（4个跨行业相似项目）
└── 15. [重新评估] [导出报告] [导出方案] 操作栏
```

---

## 四、模块详细设计

### M1. 🎰 造局工作台（独立Tab）⭐ 核心入口

> **位置**：`renderDealLabPage()` + `calcDealLab()` + `updateDealLab()` (app.js)
> **性质**：纯前端实时计算，不依赖后端，零门槛进入
> **目的**：狼不需要填表，直接拖滑块设计交易结构，实时看到收益/风险变化

#### 行业基准数据（11个行业）

自动填入日均流水、利润率，调整推荐截留比例和分成比例：

| 行业 | 日均流水 | 利润率 | PE参考 | 周转天数 |
|------|---------|--------|--------|---------|
| 餐饮 | 8.5K | 22% | 5-12 | 3 |
| 零售 | 12K | 15% | 6-15 | 15 |
| 教育 | 5K | 35% | 8-18 | 5 |
| 医疗健康 | 6K | 28% | 12-25 | 10 |
| 美容美发 | 7K | 40% | 4-10 | 2 |
| 物流 | 15K | 8% | 6-13 | 7 |
| 制造业 | 20K | 12% | 5-12 | 30 |
| 科技/SaaS | 3K | 45% | 15-40 | 20 |
| 新消费 | 9K | 18% | 8-22 | 8 |
| 新能源 | 25K | 10% | 10-30 | 25 |
| 服务业 | 6K | 25% | 5-12 | 5 |

#### 8 个滑块参数

| 滑块ID | 标签 | 默认值 | 范围 | 步长 |
|--------|------|--------|------|------|
| `dl-daily-flow` | 预估日均流水 | 行业基准 | 1000~50000元 | 500 |
| `dl-pm` | 预估利润率 | 行业基准 | 1~60% | 1 |
| `dl-wolf` | 我出多少（劣后） | 20万 | 5~200万 | 5 |
| `dl-senior` | 拉多少优先资金 | 80万 | 0~500万 | 10 |
| `dl-senior-ret` | 优先方保底年化 | 12% | 6~24% | 1 |
| `dl-wolf-share` | 超额利润我分 | 92% | 50~98% | 1 |
| `dl-retain` | 日流水截留 | 15% | 5~40% | 1 |
| `dl-circuit` | 月营收跌多少熔断 | 40% | 20~60% | 5 |

#### 核心计算公式

```javascript
// 从六维体检拿基准数据
const baseDaily = pricingInputs.baselineDailyRevenue  // 日均流水
const pm = (revenue - cost) / revenue * 100            // 利润率%

// 三档场景（保守×0.7 / 中性×1.0 / 乐观×1.3）
for each scenario:
  adjDaily = baseDaily × factor
  monthRetain = adjDaily × (retain/100) × 30           // 月截留额
  seniorTotal = senior × 10000 × (1 + seniorRet/100)   // 优先待收（本+息）
  monthsToPay = ceil(seniorTotal / monthRetain)         // 几个月还完优先
  paybackDays = monthsToPay × 30
  remainMonths = max(0, 12 - monthsToPay)              // 剩余分利月
  monthlyProfit = adjDaily × (pm/100) × 30 / 10000     // 月利润（万）
  wolfProfit = monthlyProfit × remainMonths × (wolfShare/100)
  IRR = wolfProfit / wolfCapital × 100%

// 极端风险：流水跌50%时的回本天数
```

#### 输出区域

- 核心指标栏：总盘口 / 杠杆倍数 / 安全垫
- 三档场景卡片：保守IRR / 中性IRR / 乐观IRR + 各自回本天数
- 极端风险提示：流水跌50%时的回本延长
- 分账规则说明文字
- 「查看逐月分账模拟表」展开按钮

---

### M2. 💸 T+0 分账模拟器

> **位置**：`updateSettlementTable()` (app.js:2464)
> **性质**：前端根据 M1 参数生成逐月表格
> **触发**：点击「查看逐月分账模拟表」按钮，或拖动滑块自动更新

#### 表格结构

| 月 | 日均流水 | 月截留 | 优先剩余 | 超额利润 | 🐺 狼分得 |
|----|---------|--------|---------|---------|----------|
| 1  | 2.1K   | 0.95万  | 80.6万  | —       | —        |
| ... | ...   | ...    | ...     | ...     | ...      |
| 9  | 2.3K   | 1.04万  | 0       | 0.33万   | 0.30万   |
| 12 | 2.5K   | 1.13万  | 已清    | 0.72万   | 0.66万   |

#### 逻辑要点

- 月增长：`baseDaily × (1 + growthRate/12 × month)`
- 波动模拟：`× (0.95 + sin(month × 1.7) × 0.05)`
- 还本期：截留优先还本付息；分利期：超额按比例分
- 回本月高亮（绿色背景）
- 底部汇总：狼投入 / 12月净赚 / 年化IRR
- 回本/未回本状态提示

---

### M3. 🐺 狼视角面板

> **位置**：前端 `renderWolfViewSection(r)` (app.js:2247) + 后端 `buildWolfView()` (index.tsx:884)
> **数据来源**：后端 localValuationEngine 返回的 `wolfView` 字段

#### 数据结构

```typescript
interface WolfView {
  verdict: string           // 核心判断（值不值得做，一段话）
  bestStructure: string     // 推荐交易结构（具体数字）
  riskAppetite: string      // 风险偏好建议
  killSwitch: string        // 熔断条件
  copyHint: string          // Look-alike 复制提示
  defaults: {               // 赌局设计器默认值
    wolfCapital: number     // 建议劣后出资（万）
    seniorCapital: number   // 建议优先资金（万）
    leverageRatio: string   // 建议杠杆比（如"1:4"）
    seniorReturn: number    // 优先保底年化%
    wolfShare: number       // 超额分成%
    dailyRetainPct: number  // 截留比例%
    circuitBreakerPct: number
    estIRR: number          // 预估IRR%
    estPaybackMonths: number
    safetyMargin: number    // 安全垫%
  }
}
```

#### 前端面板布局

```
┌────────────────────────────────────────┐
│ 🐺 狼视角 — 这个盘口值不值得做          │
│    「资金端操盘手专用」                   │
├────────────────────────────────────────┤
│ 🎯 核心判断（verdict）                   │
│ ♟️ 推荐结构（bestStructure）             │
│ [杠杆比] [安全垫] [预估IRR] ← 三栏数据   │
│ 🏎️ 风险偏好（riskAppetite）             │
│ ⏸ 熔断开关（killSwitch）                │
│ 📋 复制提示（copyHint）                  │
└────────────────────────────────────────┘
```

#### 后端生成逻辑（Demo 级）

```
if pm <= 0       → "别碰——项目在亏钱"
if pm < 8        → "鸡肋盘——利润太薄"
if pm < 15       → "能做但别贪"
if pm < 25       → "好盘口"
if pm >= 25      → "肥肉——赶紧锁"

杠杆比推荐：
  pm>25 且 cashScore>70 → 1:4
  pm>15 且 cashScore>60 → 1:3
  pm>8               → 1:2
  pm>0               → 1:1
  pm<=0              → 不建议

劣后出资 = neutralVal × (pm>20 ? 8% : pm>10 ? 12% : 15%)
优先资金 = 劣后 × 杠杆倍数
截留比例 = pm>20 ? 15% : pm>10 ? 20% : 25%
超额分成 = pm>20 ? 92% : pm>15 ? 88% : pm>8 ? 82% : 70%
```

---

### M4. 🔭 Look-alike 跨行业雷达

> **位置**：前端 `renderLookAlikeSection(r)` (app.js:2559) + 后端 `buildLookAlike()` (index.tsx:987)

#### 内置项目指纹库（10 个 Mock 项目）

| 项目 | 行业 | 日流水K | 利润率% | 周转天 | 月营收万 | 员工 |
|------|------|--------|--------|--------|---------|------|
| 某连锁美容院 | 美容美发 | 18 | 28 | 5 | 42 | 12 |
| 某社区健身房 | 服务业 | 15 | 22 | 10 | 35 | 8 |
| 某连锁快餐品牌 | 餐饮 | 25 | 20 | 3 | 60 | 25 |
| 某社区生鲜超市 | 零售 | 30 | 12 | 2 | 75 | 15 |
| 某少儿编程机构 | 教育 | 12 | 35 | 15 | 28 | 10 |
| 某宠物医院 | 医疗健康 | 20 | 30 | 7 | 50 | 14 |
| 某汽车养护连锁 | 服务业 | 22 | 18 | 12 | 55 | 18 |
| 某轻食外卖品牌 | 新消费 | 16 | 15 | 1 | 40 | 6 |
| 某连锁药房 | 医疗健康 | 28 | 24 | 8 | 68 | 20 |
| 某社区烘焙店 | 新消费 | 10 | 32 | 2 | 25 | 5 |

#### 匹配算法（Demo 级简化）

```javascript
// 欧氏距离（归一化：流水÷30, 利润率÷40）
distance = sqrt((ΔdailyFlowK/30)² + (Δpm/40)²)
similarity = max(0, round((1 - distance) × 100))

// 排除同行业，按相似度降序取 Top 4
```

#### 交互

- 每个 Look-alike 卡片显示：icon、名称、行业、相似度%、日流水/利润率/月营收
- 「一键套用赌局模板」按钮 → 当前 Demo 仅 Toast 提示

---

### M5. 📜 联营方案导出

> **位置**：`exportDealPlan()` (app.js:2598)
> **输出**：TXT 文件下载

#### 导出内容结构

```
═══ Flow Capital 联营方案书（一页纸）═══

项目：xxx | 赛道：xxx | 基因：xxx
生成时间：2026-03-05

─── 项目体检摘要 ───
综合评分 / 日流水 / 一句话

─── 交易结构设计 ───
总盘口 / 劣后 vs 优先 / 杠杆倍数

优先方条件：
保底年化 / 截留还款 / 回本周期

超额利润分配：
操盘方分成 / 资方分成

─── 收益预测（中性）───
IRR / 安全垫

─── 风控条件 ───
熔断线 / 安全垫 / 监控频率

─── 分账规则 ───
还本期 → 分利期 → T+0 清算

─── 狼视角判断 ───
verdict

═══ 由 Flow Capital HSR 引擎生成 ═══
```

---

### 后端引擎：HSR 六维体检系统

> **位置**：`localValuationEngine()` (index.tsx:269~674)

#### 六维打分体系

| 维度 | 权重 | 核心指标 | 打分逻辑 |
|------|------|---------|---------|
| 盈利能力 | 25% | 利润率 pm% | pm≥30→85+, pm≥15→65+, pm≥5→40+, pm≥0→20+, pm<0→3~15 |
| 现金质量 | 20% | 周转天数/退款率/日流水 | 周转≤7→90, ≤15→78, ≤30→65; 退款率每1%扣2分 |
| 增长趋势 | 20% | 增长率 | ≥50%→95, ≥30%→85, ≥15%→72, ≥8%→60 |
| 规模体量 | 10% | 年营收(万)/员工数 | 基础分 + 营收加成 + 员工加成 |
| 运营效率 | 15% | 利润率/周转/人效 | 基础60, 亏损扣分, 利润高加分, 人效加分 |
| 借债风险 | 10% | 负债率 | <20%→92, <40%→78, <60%→58, <80%→38, else→20 |

#### 基因分型（10 种）

| 优先级 | 基因型 | 触发条件 |
|--------|--------|---------|
| 1 | 种子型 | 零营收 + 有成本 |
| 2 | 失血型 | pm < -100% |
| 3 | 溺水型 | pm < -30% |
| 4 | 输血型 | pm < 0% |
| 5 | 泡沫型 | pm < 3% 且营收>100万 |
| 6 | 高杠杆型 | debtScore < 20 |
| 7 | 印钞型 | pm>25 且 cashScore>80 且 growthScore<60 |
| 8 | 烧钱型 | growthScore>80 且 pm<10 |
| 9 | 激流型 | pm>15 且 growthScore>65 且 cashScore>70 |
| 10 | 稳盘型 | scaleScore>75 且 pm>15 且 growthScore<50 |
| 11 | 潜力型 | growthScore>70 且 pm>15 |
| default | 蛰伏型 | 以上均不满足 |

#### 行业 PE 基准库

| 行业 | PE Low | PE Mid | PE High |
|------|--------|--------|---------|
| 餐饮 | 5 | 8 | 12 |
| 零售 | 6 | 10 | 15 |
| 教育 | 8 | 12 | 18 |
| 医疗健康 | 12 | 18 | 25 |
| 美容美发 | 4 | 7 | 10 |
| 物流 | 6 | 9 | 13 |
| 制造业 | 5 | 8 | 12 |
| 科技/SaaS | 15 | 25 | 40 |
| 新消费 | 8 | 15 | 22 |
| 新能源 | 12 | 20 | 30 |
| 服务业 | 5 | 8 | 12 |

#### 完整返回数据结构

```typescript
interface ValuationResult {
  score: number              // 综合分 0~100
  grade: 'S'|'A'|'B'|'C'|'D'
  archetype: string          // 基因型名
  archetypeDesc: string      // 基因型描述
  valuation: {
    conservative: number     // 保守估值（万）
    neutral: number
    optimistic: number
    method: string           // 估值方法描述
    confidence: number       // 置信度 0~85
  }
  dimensions: {              // 六维得分
    profitability: { score, verdict, confidence }
    cashQuality: { score, verdict, confidence }
    growthTrend: { score, verdict, confidence }
    scaleVolume: { score, verdict, confidence }
    operationEfficiency: { score, verdict, confidence }
    debtRisk: { score, verdict, confidence }
  }
  anomalies: Array<{ field, value, benchmark, deviation, severity, impact }>
  dealParams: { suggestedPE, suggestedStake, dealStructure, keyCondition }
  pricingInputs: { deathProb, paybackDays, baselineDailyRevenue, priorityRatio, upsideMultiplier, regimeTier, monitorFreq, circuitBreaker }
  ownerView: { lines: Array<{label, value, note, sentiment}>, valSummary, typeSummary, score }
  riskView: { requiredDocs: string[], mitigations: Array<{text, priority}> }
  report: { oneLiner, strengths: string[], risks: string[], actionPlan, investorPitch }
  actionItems: Array<{ priority: 'red'|'yellow'|'green', text: string }>
  wolfView: WolfView         // 狼视角
  lookAlike: LookAlikeItem[] // 相似项目
  _attachments?: Array<{ name, type, size }>  // 辅助材料元信息
}
```

---

## 五、前端页面导航

### 页面列表

| 页面 | 入口 | 说明 |
|------|------|------|
| `page-home` | 底部导航「发现」 | 首页项目推荐卡片流 |
| `page-detail` | 点击项目卡片 | 项目详情页 |
| `page-my-projects` | 底部导航「我的项目」 | 用户发布的项目 |
| `page-publish` | 底部导航「+发布」 | 发布新项目表单 |
| `page-messages` | 底部导航「消息」 | 消息列表（Demo） |
| `page-profile` | 底部导航「我的」 | 个人中心（Demo） |
| `page-valuation` | 首页右上角计算器图标 | HSR 六维体检 + 赌局设计器 |

### 估值页完整交互流

```
用户点击计算器图标
  → 进入估值表单页
    → 填写企业基本信息（名称/行业/营收/成本...）
    → 可选：展开"更多字段"
    → 可选：上传辅助材料（拖拽/点击）
    → 点击"开始六维体检"
      → 显示加载动画（7 段文案轮播）
      → POST /api/valuation
        → 后端：LLM 尝试 → 本地引擎降级
      → 返回结果
        → 渲染 15 个结果面板（纵向滚动）
        → 赌局设计器滑块可拖动 → 实时刷新 IRR/分账表
        → 点击"查看逐月分账表"展开
        → 点击"导出报告" / "导出方案"下载 TXT
```

---

## 六、样式系统

### 主色调（金融风格）

```javascript
colors: {
  primary: '#0F2557',    // 深蓝主色
  secondary: '#1E40AF',  // 中蓝辅色
  accent: '#D4AF37',     // 金色点缀
  success: '#059669',    // 绿色（正面）
  warning: '#F59E0B',    // 黄色（关注）
  error: '#DC2626',      // 红色（风险）
}
```

### 关键 CSS 类

- `.bg-gradient-finance` — 蓝色渐变背景
- `.bg-gradient-gold` — 金色渐变
- `.shadow-finance` — 金融风格阴影
- `.card-hover` — 卡片悬停效果
- `.tap-effect` — 点击触感效果
- `.val-bar-animate` — 进度条动画
- `.val-score-ring` — 评分环动画

---

## 七、环境变量与密钥

### Cloudflare Workers 绑定

```typescript
type Bindings = {
  OPENAI_API_KEY: string      // OpenAI 兼容 API Key
  OPENAI_BASE_URL: string     // API 基地址（默认 genspark proxy）
}
```

### 本地开发

```bash
# .dev.vars 文件（不提交 git）
OPENAI_API_KEY=sk-xxx
OPENAI_BASE_URL=https://www.genspark.ai/api/llm_proxy/v1
```

### 生产环境

```bash
npx wrangler pages secret put OPENAI_API_KEY --project-name flow-capital
npx wrangler pages secret put OPENAI_BASE_URL --project-name flow-capital
```

---

## 八、开发/部署命令

### 本地开发

```bash
cd /home/user/webapp

# 安装依赖
npm install

# 构建
npm run build

# 启动本地服务（PM2）
fuser -k 3000/tcp 2>/dev/null || true
pm2 start ecosystem.config.cjs

# 测试
curl http://localhost:3000
curl -X POST http://localhost:3000/api/valuation \
  -H "Content-Type: application/json" \
  -d '{"name":"测试","industry":"餐饮","revenue":1200000,"cost":800000}'

# 查看日志
pm2 logs --nostream
```

### 部署到 Cloudflare Pages

```bash
npm run build
npx wrangler pages deploy dist --project-name flow-capital
```

### Git 操作

```bash
git add .
git commit -m "feat: 描述"
git push origin main
```

---

## 九、从 Demo 到生产的升级路径

### 优先级排序

| 优先级 | 升级项 | Demo 阶段 | 生产阶段 | 复杂度 |
|--------|--------|-----------|---------|--------|
| P0 | LLM 分析引擎 | API Key 过期，降级本地 | 多 Agent + CoT 推演 | 中 |
| P0 | 5% 探针数据采集 | 手动填表 | 微信群 AI Agent 自动采集真实经营数据 | 高 |
| P1 | 蒙特卡洛模拟 | 前端简单公式 | 后端概率分布 + 1000 次模拟 | 中 |
| P1 | D1 项目指纹库 | 10 条 Mock 数据 | Cloudflare D1 真实数据库 + 用户录入 | 中 |
| P2 | 余弦相似度匹配 | 欧氏距离简化版 | 六维向量 + TF-IDF + 余弦相似度 | 低 |
| P2 | PDF 方案导出 | TXT 纯文本 | 带图表的 PDF（用 html2pdf） | 中 |
| P3 | 智能合约清算 | 前端模拟分账表 | 链上 T+0 自动扣款分账 | 高 |
| P3 | 银行流水 API | 手动上传 | 实时对接银行开放 API | 高 |
| P3 | 用户体系 | 无 | 注册/登录/项目管理/历史记录 | 中 |

### 第一阶段优先做（低成本高收益）

1. **接入有效 LLM API Key** → 让 HSR 引擎从"本地公式"升级为"AI 深度分析"
2. **D1 数据库接入** → Look-alike 从 mock 变真实，用户可录入项目数据
3. **蒙特卡洛模拟** → 赌局设计器的 IRR 从确定性计算变为概率分布
4. **PDF 导出** → 联营方案书从 TXT 升级为专业 PDF

### 第二阶段（需要外部资源）

5. **5% 探针 + 微信群 AI Agent** → 自动获取真实经营数据
6. **智能合约 + T+0 链上清算** → 分账不再靠信任靠代码
7. **银行流水 API 对接** → 日流水实时更新，熔断条件自动触发

---

## 十、已知问题

| 问题 | 状态 | 说明 |
|------|------|------|
| LLM API Key 过期 | 🟡 | 当前降级到本地引擎，功能完整但缺乏深度分析能力 |
| 估值对亏损项目显示负数 | ✅ 已处理 | 亏损项目估值区间显示为"先扭亏再谈估值" |
| 极端亏损（pm<-100%）分型 | ✅ 已处理 | 新增失血型/溺水型/输血型三档 |
| Look-alike 数据太少 | 🟡 | 仅 10 条 mock，后续需接入 D1 数据库 |
| 方案导出只有 TXT | 🟡 | 后续升级 PDF |
| 移动端响应式 | ✅ | max-width 428px 移动优先设计 |
| GitHub push 认证 | 🟡 | 需要先调用 `setup_github_environment` |

---

## 十一、文件变更记录

### v0.3（当前版本）

```
src/index.tsx      1075 行  （后端：Hono + HSR引擎 + wolfView + lookAlike）
public/static/app.js  2820 行  （前端：全部页面 + 赌局设计器 + 分账表 + Look-alike）
public/static/styles.css       （自定义样式）
ecosystem.config.cjs           （PM2 配置）
vite.config.ts                 （Vite 构建配置）
wrangler.jsonc                 （Cloudflare Workers 配置）
package.json                   （依赖管理）
DEMO_DEV_PLAN.md               （本文档）
README.md                      （项目说明）
```

### 关键 commit 历史

| Hash | 说明 |
|------|------|
| `4998e1f` | feat: 估值表单新增辅助材料上传 |
| `51f2298` | fix: 深度修复本地引擎bad case + LLM源标识 |
| `b9eb20a` | fix: 修复本地估值引擎极端bad case话术 |
| `812d7a2` | feat: 一体千面翻译升级 — 老板视角面板 + 定价参数 + 风控清单 |
| `404973d` | feat: 融入HSR白皮书理论 + 一体千面翻译模型 |
| `dd28459` | style: 估值引擎UI统一为浅色金融风格 |

---

## 十二、快速二次开发指南

### 添加新的估值维度

1. 在 `localValuationEngine()` (index.tsx:293~348) 添加打分逻辑
2. 在 `weights` 对象中添加权重（确保总和=1）
3. 在 `dimList` (app.js:1966) 添加维度定义
4. 构建 & 测试

### 添加新的基因分型

1. 在 `localValuationEngine()` (index.tsx:370~408) 的 if-else 链中添加
2. 注意优先级顺序：极端负面 → 正常分型 → 默认蛰伏型
3. 对应添加 verdict 文案

### 添加新的 Look-alike 项目

1. 在 `buildLookAlike()` (index.tsx:989~1000) 的 `db` 数组中添加
2. 字段：name, industry, icon, dailyFlowK, pm, turnover, monthlyRev, employees

### 调整赌局设计器参数范围

1. 在 `renderDealDesigner()` (app.js:2327~2337) 修改 `renderSlider` 调用的 min/max/step
2. 在 `calcDealDesigner()` (app.js:2364) 修改计算逻辑
3. 默认值来自后端 `buildWolfView().defaults`

### 修改估值结果页排版

1. 在 `renderValuationResult()` (app.js:1951~2244) 中调整各面板的顺序
2. 每个面板是一个独立的 HTML 字符串拼接块
