# Flow Capital - 杠杆暴利制造器 / 联营赌局设计器

> 给「狼」（资金端操盘手）用的杠杆工具 —— 设计、模拟、放大非对称收益结构的联营赌局
>
> **仓库**：https://github.com/liaowc18/flow-capital
> **Demo 详细开发文档**：[DEMO_DEV_PLAN.md](./DEMO_DEV_PLAN.md)

---

## 产品概览

Flow Capital 的核心是一套 **HSR 六维体检引擎** + **杠杆赌局设计器**。用户输入项目经营数据后，引擎完成六维打分 → 基因分型 → 估值区间 → 狼视角判断 → 赌局参数推荐，然后用户在赌局设计器中拖动滑块设计自己的交易结构，实时查看三档 IRR、回本路径和逐月分账。

### 核心链路

```
填写经营数据 → HSR 六维体检 → 基因分型 → 估值定价
    ↓
🐺 狼视角判断（值不值得做）
    ↓
🎰 造局设计器（6 滑块设计交易结构）→ 实时 IRR / 安全垫 / 杠杆
    ↓
💸 T+0 分账模拟（逐月分账表）→ 可视化回本路径
    ↓
🔭 Look-alike 雷达（跨行业复制）
    ↓
📜 导出联营方案书（一页纸 TXT）
```

---

## 已完成功能

### HSR 估值引擎

| 模块 | 状态 | 说明 |
|------|------|------|
| 六维体检引擎 | ✅ | 盈利能力 / 现金质量 / 增长趋势 / 规模体量 / 运营效率 / 借债风险 |
| 基因分型系统 | ✅ | 10 种基因型（印钞 / 激流 / 失血 / 溺水 / 输血 / 种子 / 泡沫 / 高杠杆 / 稳盘 / 潜力 / 蛰伏） |
| PE 估值区间 | ✅ | 11 个行业 PE 基准，三档（保守 / 中性 / 乐观） |
| 老板视角翻译 | ✅ | 场景化大白话输出（ownerView），每条用"你"开头 |
| 异常指标检测 | ✅ | 偏离行业基准自动 Flag（退款率 / 负债率 / 利润率 / 增长率） |
| 行动清单 | ✅ | 红黄绿优先级排序 |
| 风控清单 | ✅ | 补充材料 + 减缓条款 |
| 辅助材料上传 | ✅ | 拖拽上传（PDF / Excel / CSV / 图片 / Word / TXT / JSON），CSV/TXT 自动提取文本 |
| LLM 分析师接口 | 🟡 | 代码就绪，API Key 过期时自动降级到本地引擎 |

### 杠杆赌局工具

| 模块 | 状态 | 说明 |
|------|------|------|
| 🐺 狼视角面板 | ✅ | verdict / 推荐结构 / 杠杆比 / 安全垫 / IRR / 风险偏好 / 熔断 / 复制提示 |
| 🎰 赌局设计器 | ✅ | 6 个实时滑块 + 三档 IRR 场景 + 极端风险提示 |
| 💸 T+0 分账模拟 | ✅ | 逐月 12 行表格，回本月高亮，底部 IRR 汇总 |
| 🔭 Look-alike | ✅ | 10 个 mock 项目指纹库，欧氏距离匹配 Top 4，一键套用按钮 |
| 📜 方案导出 | ✅ | 联营方案书 TXT 下载（交易结构 + 收益 + 风控 + 分账规则） |
| 📄 报告导出 | ✅ | HSR 体检报告 TXT 下载（全量数据） |

### 平台功能

| 模块 | 状态 | 说明 |
|------|------|------|
| 项目推荐卡片流 | ✅ | 7 个 mock 项目，Tinder 式滑动 |
| 项目详情页 | ✅ | 融资信息 / 团队 / 亮点 / 视频 |
| AI 筛选面板 | ✅ | NLP 解析示例 |
| 消息中心 | ✅ Demo | 静态展示 |
| 个人中心 | ✅ Demo | 静态展示 |
| 项目发布 | ✅ Demo | 表单展示 |

---

## 功能入口 URI

| 路径 | 方法 | 说明 |
|------|------|------|
| `/` | GET | 主页（加载前端 SPA） |
| `/static/*` | GET | 静态资源 |
| `/api/valuation` | POST | 估值分析 API |

### `/api/valuation` 请求参数

```json
{
  "name": "项目名称",
  "industry": "餐饮|零售|教育|医疗健康|美容美发|物流|制造业|科技/SaaS|新消费|新能源|服务业",
  "revenue": 1200000,       // 年营收（元）
  "cost": 800000,           // 年成本（元）
  "dailyFlow": 3288,        // 日均流水（元，可选）
  "dailyCost": 2192,        // 日均成本（元，可选）
  "netProfit": null,        // 净利润（元，可选）
  "refundRate": 0.03,       // 退款率（小数，可选）
  "growthRate": 0.15,       // 增长率（小数，可选）
  "turnoverDays": 7,        // 周转天数（可选）
  "debtRatio": 0.2,         // 负债率（小数，可选）
  "employeeCount": 10,      // 员工数（可选）
  "operatingYears": 3,      // 经营年限（可选）
  "attachments": [           // 辅助材料（可选）
    { "name": "file.csv", "type": "text/csv", "size": 15360, "textContent": "..." }
  ]
}
```

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端 | Hono + TypeScript（Cloudflare Workers） |
| 前端 | Vanilla JS + Tailwind CSS (CDN) + Font Awesome |
| 构建 | Vite + @hono/vite-cloudflare-pages |
| 部署 | Cloudflare Pages |
| AI | OpenAI 兼容 API（可选，降级本地引擎） |
| 进程管理 | PM2 |

---

## 开发指南

### 本地开发

```bash
cd /home/user/webapp
npm install
npm run build
fuser -k 3000/tcp 2>/dev/null || true
pm2 start ecosystem.config.cjs
curl http://localhost:3000
```

### 部署

```bash
npm run build
npx wrangler pages deploy dist --project-name flow-capital
```

### Git

```bash
git add . && git commit -m "feat: 描述"
git push origin main
```

---

## 下一步升级路径

| 优先级 | 内容 | 当前 | 目标 |
|--------|------|------|------|
| P0 | LLM 深度分析 | API Key 过期 | 接入有效 Key |
| P0 | 5% 探针数据采集 | 手动填表 | 微信群 AI Agent |
| P1 | 蒙特卡洛模拟 | 确定性公式 | 概率分布 + 1000 次模拟 |
| P1 | 项目数据库 | 10 条 Mock | Cloudflare D1 |
| P2 | PDF 导出 | TXT | 带图表 PDF |
| P3 | 智能合约清算 | 模拟分账表 | 链上 T+0 |
| P3 | 银行流水 API | 手动上传 | 实时对接 |

**详细开发文档请查看 [DEMO_DEV_PLAN.md](./DEMO_DEV_PLAN.md)**

---

## 项目状态

- **版本**：v0.3-demo
- **最后更新**：2026-03-05
- **部署状态**：开发环境运行中
- **代码仓库**：https://github.com/liaowc18/flow-capital
