import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  OPENAI_API_KEY: string
  OPENAI_BASE_URL: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files from public/static directory
app.use('/static/*', serveStatic({ root: './public' }))

// ==================== 估值分析 API ====================
app.post('/api/valuation', async (c) => {
  try {
    const body = await c.req.json()
    const { name, industry, revenue, cost, dailyFlow, dailyCost, netProfit, refundRate, growthRate, turnoverDays, debtRatio, employeeCount, operatingYears } = body

    // 计算基础指标
    const annualRevenue = revenue || (dailyFlow ? dailyFlow * 365 : 0)
    const annualCost = cost || (dailyCost ? dailyCost * 365 : 0)
    const calcNetProfit = netProfit || (annualRevenue - annualCost)
    const profitMargin = annualRevenue > 0 ? calcNetProfit / annualRevenue : 0
    const dailyCashFlow = dailyFlow || (annualRevenue / 365)

    // 尝试调用 LLM
    const apiKey = c.env?.OPENAI_API_KEY || ''
    const baseUrl = c.env?.OPENAI_BASE_URL || 'https://www.genspark.ai/api/llm_proxy/v1'

    let result = null

    if (apiKey) {
      try {
        result = await callLLM(apiKey, baseUrl, { name, industry, annualRevenue, annualCost, calcNetProfit, profitMargin, dailyCashFlow, dailyCost, refundRate, growthRate, turnoverDays, debtRatio, employeeCount, operatingYears })
      } catch (e: any) {
        console.error('LLM fallback to local:', e.message)
      }
    }

    // 如果 LLM 失败，使用本地智能引擎
    if (!result) {
      result = localValuationEngine({ name, industry, annualRevenue, annualCost, calcNetProfit, profitMargin, dailyCashFlow, dailyCost: dailyCost || (annualCost / 365), refundRate, growthRate, turnoverDays, debtRatio, employeeCount, operatingYears })
    }

    return c.json({ success: true, result })
  } catch (err: any) {
    console.error('Valuation API error:', err)
    return c.json({ error: '系统错误：' + (err.message || '未知错误') }, 500)
  }
})

// ==================== LLM 调用 ====================
async function callLLM(apiKey: string, baseUrl: string, data: any) {
  const systemPrompt = `你是 HSR 估值引擎的「AI 数学分析师」。你的底层是一套基于认知物理学的估值系统，但你的核心职能是「一体千面翻译」—— 把物理级的分析结论翻译成行业老炮听得懂、用得上的话。

## 你的身份
- 你是做过100+项目尽调的FA老炮，背后有一台物理级分析引擎在跑数
- 引擎帮你算完了，你负责翻译：把冷冰冰的张量和场方程变成"老板一听就拍大腿"的表达
- 你说话像资深行业老哥：先用行业黑话点到位，再用大白话解释为什么
- 你直接、不废话、说重点，但每个结论背后都有硬数据撑着

## HSR 引擎的分析维度（你翻译的底层）
引擎从六个物理维度给项目做体检，你负责把每个维度的物理诊断翻译成行业语言：
1. 盈利能力（引力质量）：利润率越高 → 引力越大 → 项目对资金的吸引力越强。你翻译成：这买卖赚不赚钱、利润厚不厚
2. 现金质量（流体动力学）：现金流转速 → 流体是否通畅 → 有无"堵点"。你翻译成：钱转不转得动、账上是真金白银还是纸面富贵
3. 增长趋势（动量与速度）：增速 = 认知动量，动量大 → 穿透行业势垒的能力强。你翻译成：这项目还在往上冲还是已经到顶了
4. 规模体量（质量等级）：营收规模 = 质量级别，质量越大 → 在行业引力场中越有话语权。你翻译成：盘子够不够大、够不够格上牌桌
5. 运营效率（能量守恒）：投入产出比 → 能量耗散率 → 系统是否在做无用功。你翻译成：老板会不会算账、有没有在烧冤枉钱
6. 借债风险（暗质量探测）：显性数据解释不了的扩张行为 → 背后可能有隐性负债或对赌。你翻译成：账面下有没有雷、杠杆拉了多少

## 基因分型体系（引擎的分类输出，你翻译表达）
引擎根据六维综合态给项目"验DNA"，你需要选择最匹配的基因型并翻译成人话：
- 印钞型：利润高+现金流健康+增长一般 → "闷声发大财型，不用讲故事光数钱就行"
- 激流型：利润尚可+增速猛+现金流快 → "快进快出高收益高风险，得盯紧别翻车"
- 烧钱型：增速快+利润薄 → "典型的先做规模再谈盈利，得看弹药够不够烧到终局"
- 稳盘型：规模大+利润稳+增长慢 → "守江山型选手，不会大涨但也不会暴雷"
- 潜力型：利润和增速都不错 → "六边形战士，有上牌桌的硬实力"
- 蛰伏型：各项中规中矩 → "功力都有但缺个引爆点，得找到自己的势垒突破口"
- 泡沫型：营收不低利润极薄 → "虚胖——营收是充气的，一戳就瘪"
- 高杠杆型：负债率高 → "暗质量太重，表面光鲜但底下全是雷"

## 输出要求 — 严格纯 JSON

你必须返回一个 JSON 对象，不要返回其他任何文字、markdown、代码块标记。直接输出纯 JSON：

{
  "score": 数字(0-100的综合健康分),
  "grade": "S/A/B/C/D",
  "archetype": "基因型名(2-4字)",
  "archetypeDesc": "一句行业话解释这个基因型(15-25字，像老炮跟你说的)",
  "valuation": {
    "conservative": 数字(万元),
    "neutral": 数字(万元),
    "optimistic": 数字(万元),
    "method": "用什么估值法算的(行业话一句带过，如：8~15倍PE拍净利润)",
    "confidence": 数字(0-100，填的字段越少置信度越低)
  },
  "dimensions": {
    "profitability": { "score": 0-100, "verdict": "行业话翻译：这买卖赚钱程度如何(15-30字)" },
    "cashQuality": { "score": 0-100, "verdict": "行业话翻译：钱转得动吗(15-30字)" },
    "growthTrend": { "score": 0-100, "verdict": "行业话翻译：还在往上冲吗(15-30字)" },
    "scaleVolume": { "score": 0-100, "verdict": "行业话翻译：盘子大不大(15-30字)" },
    "operationEfficiency": { "score": 0-100, "verdict": "行业话翻译：钱花在刀刃上了吗(15-30字)" },
    "debtRisk": { "score": 0-100, "verdict": "行业话翻译：底下有没有雷(15-30字)" }
  },
  "dealParams": {
    "suggestedPE": "PE倍数建议(行业话解释为什么给这个倍数)",
    "suggestedStake": "出让比例建议(配一句为什么)",
    "dealStructure": "交易结构一句话建议",
    "keyCondition": "最关键的一个对赌/保护条款"
  },
  "report": {
    "oneLiner": "一句话总结(像FA在饭局上给LP说的那种，20-35字)",
    "strengths": ["核心优势1(行业话+具体数据)", "优势2", "优势3"],
    "risks": ["核心风险1(行业话+为什么危险)", "风险2", "风险3"],
    "actionPlan": "给老板的造局路线图(2-3句，先干什么再干什么，有节奏感)",
    "investorPitch": "帮老板写好见投资人的开场白(3-4句，数据+故事+要什么)"
  },
  "anomalies": [
    {"field": "异常指标名", "value": "实际值", "benchmark": "同行基准", "deviation": "偏离百分比", "severity": "HIGH/MEDIUM", "impact": "用行业话解释这个异常为什么危险(15-25字)"}
  ],
  "actionItems": [
    {"priority": "red/yellow/green", "text": "具体行动建议(行业话，15-30字)"}
  ],
  "ownerView": {
    "lines": [
      {"label": "你一年净赚", "value": "28.5万", "note": "利润率15.4%，在餐饮赛道算不错的", "sentiment": "positive/neutral/negative"},
      {"label": "增长速度", "value": "18%", "note": "你这个增速在同行里算快的", "sentiment": "positive"}
    ],
    "valSummary": "按餐饮赛道标准来看，你的项目大概值125~254万。中间价190万——这个数拿去跟投资人谈，有底气。",
    "typeSummary": "你是个「稳盘型」—— 利润稳增长稳，像一条运河，水流不急但一直在流",
    "score": 72
  },
  "pricingInputs": {
    "deathProb": 10,
    "paybackDays": 173,
    "baselineDailyRevenue": 61667,
    "priorityRatio": 50,
    "upsideMultiplier": 1.5,
    "regimeTier": "中",
    "monitorFreq": "月度",
    "circuitBreaker": "月营收连续2个月下降超过40%触发回购条款"
  },
  "riskView": {
    "requiredDocs": ["近6个月银行流水", "近12个月损益表", "负债明细", "租赁合同"],
    "mitigations": [
      {"text": "退款率KPI条款：退款率需在6个月内降至5%以下", "priority": "red"},
      {"text": "信息披露义务：按月/季提供经营数据报表", "priority": "green"}
    ]
  }
}

## 翻译风格铁律（一体千面的核心）
底层是同一套物理引擎在算，但输出的话术必须让行业老炮秒懂：
- ❌ "净利润率为33.3%，高于行业均值2个标准差" → 物理语言，用户看不懂
- ✅ "利润率33%，在餐饮赛道算闷声发财型——一年光净赚40个W，同行看了都眼红" → 行业话翻译
- ❌ "现金流周转天数7天，流体动力学指标优良" → 物理语言，用户看不懂
- ✅ "周转7天，钱进来转一圈马上又能出去赚钱——比很多拿了A轮的项目现金流都健康" → 行业话翻译
- ❌ "认知动量P=M×V偏低，趋势穿透力不足" → 物理语言，用户看不懂
- ✅ "增速一般，原来那套打法跑到天花板了，得找新的增长引擎" → 行业话翻译
- ❌ "检测到暗质量偏差ΔM>0，存在隐性负债风险" → 物理语言，用户看不懂
- ✅ "账面数据和扩张速度对不上——要么有没上报的负债，要么有对赌在推着跑，得扒一扒" → 行业话翻译

核心原则：每个物理概念都必须找到行业对应物，用做生意的人天天说的话来表达。让用户觉得"这个分析师就是我们这行的人"，而不是"这是个搞数学的"。

## 异常检测与行动建议
- anomalies: 如果某个数据明显偏离行业基准（如退款率远超同行），必须Flag出来，severity分HIGH/MEDIUM
- actionItems: 给出3-5条结构化行动建议，按优先级标色：red(立刻要做)、yellow(近期优化)、green(保持不变)
- 每条建议都要用行业话说，告诉老板"具体干什么"而不是"建议优化XX指标"

## 一体千面翻译核心 — ownerView（老板视角）
ownerView 是整个报告最重要的部分——把同一套物理引擎的数据，翻译成坐下来跟老板喝茶聊天的话：
- lines里每一条都要用"你"开头的场景化表达，如：你一年净赚28.5万、每天进账6万多、增长18%在同行里算快的
- note要像FA坐在对面跟老板说的话，不能有任何物理/数学术语
- sentiment标注这条信息对老板来说是好消息(positive)、一般(neutral)还是坏消息(negative)
- valSummary用一段大白话告诉老板项目值多少钱
- typeSummary告诉老板他是什么类型

## pricingInputs — 实操定价参数
给出交易方需要的实操参数：死亡概率、预计回本天数、基准日流水、截留比例、上浮倍数、风险等级、监控频率、熔断条件

## riskView — 风控清单
- requiredDocs: 需要补充的材料清单（验证数据真实性的证据）
- mitigations: 减缓条款建议，按red/yellow/green标优先级

请务必只返回 JSON，不要加 \`\`\`json 标记。`

  const userPrompt = `请用 HSR 引擎对以下项目做一次完整的六维体检，然后用行业话翻译给老板听：

📋 项目档案
- 名称：${data.name || '未命名项目'}
- 赛道：${data.industry || '未指定'}

💰 核心经营数据
- 年营收：${data.annualRevenue ? Math.round(data.annualRevenue).toLocaleString() + '元' : '未提供'}
- 年成本：${data.annualCost ? Math.round(data.annualCost).toLocaleString() + '元' : '未提供'}
- 净利润：${data.calcNetProfit ? Math.round(data.calcNetProfit).toLocaleString() + '元/年' : '未提供'}
- 利润率：${(data.profitMargin * 100).toFixed(1)}%
- 日流水：${data.dailyCashFlow ? Math.round(data.dailyCashFlow).toLocaleString() + '元' : '未提供'}

📊 补充体检数据（填了的越多诊断越准）
- 退款率：${data.refundRate || '未提供'}
- 增长率：${data.growthRate || '未提供'}
- 周转天数：${data.turnoverDays || '未提供'}
- 负债率：${data.debtRatio || '未提供'}
- 员工人数：${data.employeeCount || '未提供'}
- 经营年限：${data.operatingYears || '未提供'}

请按六维体检+基因分型+估值定价+造局参数+评估报告的完整流程输出，所有物理结论都翻译成行业话。`

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-5-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 3000
    })
  })

  if (!response.ok) {
    throw new Error(`LLM API ${response.status}`)
  }

  const resData = await response.json() as any
  const content = resData.choices?.[0]?.message?.content || ''
  const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()
  return JSON.parse(cleaned)
}

// ==================== 本地 HSR 估值引擎（六维体检+行业话翻译） ====================
function localValuationEngine(d: any) {
  const { name, industry, annualRevenue, annualCost, calcNetProfit, profitMargin, dailyCashFlow, dailyCost, refundRate, growthRate, turnoverDays, debtRatio, employeeCount, operatingYears } = d

  // 行业 PE 基准
  const industryPE: Record<string, { low: number; mid: number; high: number; label: string }> = {
    '餐饮': { low: 5, mid: 8, high: 12, label: '餐饮' },
    '零售': { low: 6, mid: 10, high: 15, label: '零售' },
    '教育': { low: 8, mid: 12, high: 18, label: '教育' },
    '医疗健康': { low: 12, mid: 18, high: 25, label: '医疗' },
    '美容美发': { low: 4, mid: 7, high: 10, label: '美业' },
    '物流': { low: 6, mid: 9, high: 13, label: '物流' },
    '制造业': { low: 5, mid: 8, high: 12, label: '制造' },
    '科技/SaaS': { low: 15, mid: 25, high: 40, label: 'SaaS' },
    '新消费': { low: 8, mid: 15, high: 22, label: '新消费' },
    '新能源': { low: 12, mid: 20, high: 30, label: '新能源' },
    '服务业': { low: 5, mid: 8, high: 12, label: '服务业' },
  }
  const pe = industryPE[industry] || { low: 6, mid: 10, high: 15, label: '综合' }

  // 净利润（万元）
  const npWan = calcNetProfit / 10000
  const revWan = annualRevenue / 10000
  const pm = profitMargin * 100

  // ===== 维度打分 =====
  // 盈利能力
  let profitScore = Math.min(100, Math.max(10, pm * 2.5 + 20))
  if (pm > 30) profitScore = Math.min(100, profitScore + 10)
  if (pm < 5) profitScore = Math.max(10, profitScore - 20)

  // 现金质量
  let cashScore = 70
  if (turnoverDays > 0) {
    cashScore = turnoverDays <= 7 ? 90 : turnoverDays <= 15 ? 78 : turnoverDays <= 30 ? 65 : turnoverDays <= 60 ? 50 : 35
  }
  if (refundRate > 0) {
    cashScore -= refundRate * 200 // 退款率每1%扣2分
  }
  if (dailyCashFlow > 5000) cashScore += 5
  cashScore = Math.min(100, Math.max(10, cashScore))

  // 增长趋势
  let growthScore = 50
  if (growthRate > 0) {
    growthScore = growthRate >= 0.5 ? 95 : growthRate >= 0.3 ? 85 : growthRate >= 0.15 ? 72 : growthRate >= 0.08 ? 60 : growthRate >= 0.03 ? 48 : 35
  }

  // 规模体量
  let scaleScore = Math.min(100, Math.max(15, revWan / 5 + 20))
  if (revWan > 500) scaleScore = Math.min(100, scaleScore + 15)
  if (employeeCount > 20) scaleScore = Math.min(100, scaleScore + 10)

  // 运营效率
  let opScore = 60
  if (pm > 0.2) opScore += 15
  if (turnoverDays > 0 && turnoverDays <= 14) opScore += 10
  if (employeeCount > 0 && annualRevenue > 0) {
    const perCapita = annualRevenue / employeeCount / 10000
    if (perCapita > 50) opScore += 15
    else if (perCapita > 25) opScore += 8
  }
  opScore = Math.min(100, Math.max(15, opScore))

  // 借债风险（分高=风险低=好）
  let debtScore = 75
  if (debtRatio > 0) {
    debtScore = debtRatio < 0.2 ? 92 : debtRatio < 0.4 ? 78 : debtRatio < 0.6 ? 58 : debtRatio < 0.8 ? 38 : 20
  }

  // ===== 综合评分 =====
  const weights = { profit: 0.25, cash: 0.2, growth: 0.2, scale: 0.1, op: 0.15, debt: 0.1 }
  const totalScore = Math.round(
    profitScore * weights.profit +
    cashScore * weights.cash +
    growthScore * weights.growth +
    scaleScore * weights.scale +
    opScore * weights.op +
    debtScore * weights.debt
  )

  // 评级
  const grade = totalScore >= 90 ? 'S' : totalScore >= 75 ? 'A' : totalScore >= 60 ? 'B' : totalScore >= 40 ? 'C' : 'D'

  // 基因分型 — HSR六维综合态驱动
  type ArchetypeInfo = { name: string; desc: string }
  let archetype: ArchetypeInfo
  if (pm > 0.25 && cashScore > 80 && growthScore < 60) {
    archetype = { name: '印钞型', desc: '利润厚现金流健康，闷声发大财的好买卖——不用讲故事光数钱就行' }
  } else if (growthScore > 80 && pm < 0.1) {
    archetype = { name: '烧钱型', desc: '增速猛但利润薄，典型的先做规模再谈盈利——看弹药够不够烧到终局' }
  } else if (pm > 0.15 && growthScore > 65 && cashScore > 70) {
    archetype = { name: '激流型', desc: '快进快出高收益高风险，钱转得快赚得也快——得盯紧别翻车' }
  } else if (scaleScore > 75 && pm > 0.15 && growthScore < 50) {
    archetype = { name: '稳盘型', desc: '盘子大利润稳就是增长到顶了，守江山型选手——稳但没惊喜' }
  } else if (growthScore > 70 && pm > 0.15) {
    archetype = { name: '潜力型', desc: '利润和增速都不差，六边形战士——有上牌桌跟大佬掰手腕的硬实力' }
  } else if (pm < 0.05) {
    archetype = { name: '泡沫型', desc: '营收数字不低但利润率低得离谱——虚胖，一戳就瘪' }
  } else if (debtScore < 40) {
    archetype = { name: '高杠杆型', desc: '表面光鲜底下全是借来的——杠杆拉太满，一个黑天鹅就翻车' }
  } else {
    archetype = { name: '蛰伏型', desc: '各项指标中规中矩功力都有——缺个引爆点，得找到自己的突破口' }
  }

  // ===== 估值计算 =====
  const conservativeVal = Math.round(npWan * pe.low * 10) / 10
  const neutralVal = Math.round(npWan * pe.mid * 10) / 10
  const optimisticVal = Math.round(npWan * pe.high * 10) / 10
  
  // 增长调整
  const growthMultiplier = growthRate > 0.2 ? 1.2 : growthRate > 0.1 ? 1.1 : 1
  const confidence = Math.min(85, 55 + (turnoverDays > 0 ? 8 : 0) + (growthRate > 0 ? 8 : 0) + (debtRatio > 0 ? 5 : 0) + (employeeCount > 0 ? 5 : 0) + (operatingYears > 0 ? 5 : 0))

  // ===== 行业黑话生成 =====
  const dailyFlowK = Math.round(dailyCashFlow / 1000 * 10) / 10
  const npW = Math.round(npWan)

  // 维度点评（HSR物理概念 → 行业黑话翻译）
  const profitVerdict = pm > 30 ? `利润率${pm.toFixed(0)}%，在${pe.label}赛道算闷声发财型——一年净赚${npW}万，同行看了眼红` :
    pm > 15 ? `利润率${pm.toFixed(0)}%，${pe.label}赛道中等偏上水平，赚钱模型跑通了但还有提空间` :
    pm > 5 ? `利润率${pm.toFixed(0)}%，能赚但利润偏薄——得看流水够不够大来撑估值` :
    `利润率才${pm.toFixed(1)}%，基本在生死线上——不是不赚钱，是赚的都被成本吃了`

  const cashVerdict = cashScore >= 85 ? `日流水${dailyFlowK}K，周转${turnoverDays || '—'}天，钱进来转一圈马上又出去赚钱——比很多A轮项目现金流都健康` :
    cashScore >= 65 ? `日流水${dailyFlowK}K，现金流基本面OK，但要盯紧应收别让钱堵在路上` :
    cashScore >= 45 ? `现金流一般般，钱转得不够快——建议砍账期或谈预付款，把血液循环搞起来` :
    `现金流拉胯，钱转不动的话再大的营收也是纸面富贵——账面好看不顶用`

  const growthVerdict = growthScore >= 85 ? `增速${growthRate ? (growthRate * 100).toFixed(0) + '%' : '强劲'}，在${pe.label}赛道是第一梯队——这个势头投资人最爱看` :
    growthScore >= 65 ? `增长率${growthRate ? (growthRate * 100).toFixed(0) + '%' : '可观'}，不算爆发但稳中有进——给投资人讲增长故事够用` :
    growthScore >= 45 ? `增速一般，原来那套打法跑到天花板了——得找新的增长引擎` :
    `增长乏力，势头起不来——要么找新赛道要么找新打法，不然估值会一直被压着`

  const scaleVerdict = revWan >= 300 ? `年营收${revWan.toFixed(0)}万，在${pe.label}赛道过了生存线——盘子够大，有造局的底气` :
    revWan >= 100 ? `年营收${revWan.toFixed(0)}万，规模还行但离行业头部还有段距离` :
    `年营收${revWan.toFixed(0)}万，盘子偏小——先把规模跑起来再谈估值`

  const opVerdict = opScore >= 75 ? '运营效率高，钱花在刀刃上了——老板是个会算账的' :
    opScore >= 55 ? '运营中规中矩，没大浪费但还有精益空间——可以再抠一抠' :
    '运营效率偏低，要么人效不高要么在烧冤枉钱——得重新捋成本结构'

  const debtVerdict = debtScore >= 80 ? '负债率很低，轻装上阵——谈判桌上底气十足，不用看人脸色' :
    debtScore >= 60 ? '负债水平可控，不影响正常经营和融资节奏' :
    debtScore >= 40 ? '负债偏高，要注意留够安全垫——别让现金流断裂' :
    '负债率太高，底下全是暗雷——一旦遇到黑天鹅就是连环爆'

  // 造局参数 — HSR引擎输出的交易结构建议
  const sugPE = `${pe.low}~${pe.high}倍PE，${pe.label}赛道这个利润水平给到这个倍数——投资人算得过来账，老板也不亏`
  const sugStake = totalScore >= 75 ? '10%~20%，项目质地硬可以少出让——把筹码留在手里等后面轮次涨价' :
    totalScore >= 55 ? '15%~25%，标准比例——先把钱拿到手验证模型，下一轮再抬估值' :
    '20%~35%，项目还要继续证明自己——多让一点换资源和背书更划算'
  const dealStruct = calcNetProfit > 500000 ?
    '建议「固定估值+对赌」结构，先锁一个保底估值，业绩达标再释放剩余股权' :
    '建议「现金+资源置换」结构，除了钱还要谈渠道和供应链资源'
  const keyCond = growthRate > 0.15 ?
    '关键条件：锁定未来12个月营收增长不低于' + Math.round(growthRate * 50) + '%，否则估值回调' :
    '关键条件：季度利润不低于当前水平的80%，确保基本盘稳固'

  // ===== 定价参数（截留比例/回本天数/熔断条件 — 实操级） =====
  const deathProb = debtRatio > 0.5 ? 0.15 : debtRatio > 0.3 ? 0.10 : 0.05
  const dailyNetFlow = dailyCashFlow - (dailyCost || annualCost / 365)
  const paybackDays = dailyNetFlow > 0 ? Math.round(neutralVal * 10000 / dailyNetFlow) : 999
  const priorityRatio = totalScore >= 75 ? 0.5 : totalScore >= 55 ? 0.6 : 0.7
  const upsideMultiplier = growthRate > 0.3 ? 2.0 : growthRate > 0.15 ? 1.5 : 1.2
  const regimeTier = totalScore >= 75 ? '低' : totalScore >= 55 ? '中' : '高'
  const monitorFreq = totalScore >= 75 ? '季度' : '月度'
  const circuitBreaker = growthRate > 0.15 ?
    `月营收连续2个月下降超过${Math.round(growthRate * 80)}%触发回购条款` :
    `季度利润低于当前水平60%触发回购条款`

  // 报告 — HSR翻译层输出
  const oneLiner = `${name || '项目'}是个${pe.label}赛道的${archetype.name}，年利润${npW}万，${totalScore >= 70 ? '基本面扎实值得深入尽调' : totalScore >= 50 ? '有亮点但得重点盯风控' : '风险点不少建议审慎看'}`

  const strengths = [
    pm > 0.15 ? `利润率${pm.toFixed(0)}%在${pe.label}赛道跑赢同行——盈利模型已经被市场验证过了` : `营收规模${revWan.toFixed(0)}万/年，买卖跑通了——有基本盘`,
    cashScore >= 65 ? `日流水${dailyFlowK}K且周转快，是实打实的真金白银在转——不是纸面数据` : `有稳定的营收来源，商业逻辑成立——起码活得下去`,
    growthScore >= 60 ? `增长势头还在，后续有放量空间——给投资人讲增长故事有素材` : `运营团队执行力不错，基本盘守得住——在${pe.label}赛道能站稳脚`
  ]

  const risks = [
    pm < 0.1 ? '利润率偏低，成本结构需要动手术——规模越大可能亏得越多，别把规模当护身符' :
      scaleScore < 40 ? '盘子偏小抗风险能力弱——一次意外就可能伤筋动骨' :
      '行业竞争激烈，得持续筑壁垒——没有护城河的利润都是暂时的',
    debtScore < 60 ? '负债率偏高，融资前建议先做一轮债务优化——投资人看到高负债会砍估值' :
      '缺乏明显的竞争壁垒，护城河有待加深——同行抄起来太容易',
    growthScore < 50 ? '增长见顶了，原有增长引擎跑不动了——不找到第二曲线估值会一直被压着' :
      '行业政策变化、市场周期波动等系统性风险不可忽视——黑天鹅来了谁都跑不掉'
  ]

  const actionPlan = totalScore >= 70 ?
    `基本面硬，建议先花一个月把财务数据做漂亮（利润率和现金流的故事要讲圆），然后锁定3-5个战略投资人做定向路演。${pe.label}赛道投资人最看重的就是利润率和复购——这两点拎出来讲就对了。` :
    `先别急着见投资人，花2-3个月把核心指标跑上去——利润率和运营效率优先。${pe.label}赛道现在资方谨慎，没有漂亮数据敲门会被拒。先修内功，再造势。`

  const investorPitch = `这是一个${pe.label}赛道的${archetype.name}项目，年营收${revWan.toFixed(0)}万，净利润${npW}万，利润率${pm.toFixed(0)}%。${growthRate > 0.1 ? '过去一年增速' + (growthRate * 100).toFixed(0) + '%，' : ''}现金流健康日流水${dailyFlowK}K。我们这轮想按${neutralVal.toFixed(0)}万估值出让15-20%，主要用于${revWan > 200 ? '扩大规模和加强品牌建设' : '优化供应链和拓展新渠道'}。`

  return {
    score: totalScore,
    grade,
    archetype: archetype.name,
    archetypeDesc: archetype.desc,
    valuation: {
      conservative: Math.round(conservativeVal * growthMultiplier * 10) / 10,
      neutral: Math.round(neutralVal * growthMultiplier * 10) / 10,
      optimistic: Math.round(optimisticVal * growthMultiplier * 10) / 10,
      method: `PE倍数法（${pe.low}~${pe.high}x 净利润）`,
      confidence
    },
    dimensions: {
      profitability: { score: Math.round(profitScore), verdict: profitVerdict, confidence: 0.9 },
      cashQuality: { score: Math.round(cashScore), verdict: cashVerdict, confidence: turnoverDays > 0 ? 0.8 : 0.4 },
      growthTrend: { score: Math.round(growthScore), verdict: growthVerdict, confidence: growthRate > 0 ? 0.7 : 0.3 },
      scaleVolume: { score: Math.round(scaleScore), verdict: scaleVerdict, confidence: 0.85 },
      operationEfficiency: { score: Math.round(opScore), verdict: opVerdict, confidence: employeeCount > 0 ? 0.7 : 0.35 },
      debtRisk: { score: Math.round(debtScore), verdict: debtVerdict, confidence: debtRatio > 0 ? 0.85 : 0.3 }
    },
    // 异常指标检测 — HSR引力透镜：数据偏离行业基准时自动Flag
    anomalies: buildAnomalies(d, pe),
    dealParams: {
      suggestedPE: sugPE,
      suggestedStake: sugStake,
      dealStructure: dealStruct,
      keyCondition: keyCond
    },
    // 定价参数 — 实操级交易条件
    pricingInputs: {
      deathProb: Math.round(deathProb * 100),
      paybackDays,
      baselineDailyRevenue: Math.round(dailyCashFlow),
      priorityRatio: Math.round(priorityRatio * 100),
      upsideMultiplier,
      regimeTier,
      monitorFreq,
      circuitBreaker
    },
    // 老板视角翻译 — 场景化大白话
    ownerView: buildOwnerView(d, { npWan, revWan, pm, pe, dailyFlowK, archetype, totalScore, cashScore, growthScore, conservativeVal: conservativeVal * growthMultiplier, neutralVal: neutralVal * growthMultiplier, optimisticVal: optimisticVal * growthMultiplier }),
    // 风控视角 — 补充材料清单+减缓条款
    riskView: buildRiskView(d, { pe, debtScore, cashScore }),
    report: {
      oneLiner,
      strengths,
      risks,
      actionPlan,
      investorPitch
    },
    // 结构化行动建议 — 红黄绿优先级
    actionItems: buildActionItems(d, { profitScore, cashScore, growthScore, scaleScore, opScore, debtScore, pm, pe })
  }
}

// ==================== 老板视角翻译（一体千面核心：同一数据，场景化对话） ====================
function buildOwnerView(d: any, s: any): any {
  const lines = []
  // 核心指标 — 像坐下来跟老板聊天
  if (s.npWan > 0) {
    lines.push({ label: '你一年净赚', value: `${Math.round(s.npWan)}万`, note: `利润率${s.pm.toFixed(0)}%，在${s.pe.label}赛道${s.pm > 15 ? '算不错的' : '偏薄了'}`, sentiment: s.pm > 15 ? 'positive' : 'neutral' })
  }
  if (d.dailyCashFlow > 0) {
    lines.push({ label: '每天进账', value: `${s.dailyFlowK}K`, note: `一个月下来大概${Math.round(d.dailyCashFlow * 30 / 10000)}万流水`, sentiment: 'positive' })
  }
  if (d.growthRate > 0) {
    const g = Math.round(d.growthRate * 100)
    lines.push({ label: '增长速度', value: `${g}%`, note: g > 20 ? '你这个增速在同行里算快的，投资人会感兴趣' : g > 10 ? '稳步增长，不算爆发但方向对' : '增速一般，可能需要找新的增长点', sentiment: g > 15 ? 'positive' : g > 5 ? 'neutral' : 'negative' })
  }
  if (d.refundRate > 0) {
    const rr = Math.round(d.refundRate * 100)
    lines.push({ label: '退款率', value: `${rr}%`, note: rr > 8 ? `同行一般3~5%，你的偏高——每退一单利润就少一截` : rr > 5 ? '稍高于同行平均，可以优化一下' : '控制得不错', sentiment: rr > 8 ? 'negative' : rr > 5 ? 'neutral' : 'positive' })
  }
  if (d.debtRatio > 0) {
    const dr = Math.round(d.debtRatio * 100)
    lines.push({ label: '负债率', value: `${dr}%`, note: dr > 40 ? '偏高了，投资人看到会紧张——建议先降一降' : dr > 25 ? '可控范围，但谈融资前能降一点更好' : '很健康，轻装上阵', sentiment: dr > 40 ? 'negative' : dr > 25 ? 'neutral' : 'positive' })
  }
  if (d.turnoverDays > 0) {
    lines.push({ label: '资金周转', value: `${d.turnoverDays}天`, note: d.turnoverDays <= 7 ? '钱转得很快，一周一个循环——现金流是你最大的底牌' : d.turnoverDays <= 15 ? '两周一转，还行' : '周转偏慢，钱卡在路上了', sentiment: d.turnoverDays <= 7 ? 'positive' : d.turnoverDays <= 15 ? 'neutral' : 'negative' })
  }
  if (d.employeeCount > 0 && d.annualRevenue > 0) {
    const perCap = Math.round(d.annualRevenue / d.employeeCount / 10000)
    lines.push({ label: '人均产出', value: `${perCap}万/人/年`, note: perCap > 50 ? '人效很高，团队精干能打' : perCap > 25 ? '人效中等，还有提升空间' : '人效偏低，可能人多了或者产出没跟上', sentiment: perCap > 50 ? 'positive' : perCap > 25 ? 'neutral' : 'negative' })
  }

  // 你的项目值多少钱 — 场景化
  const valSummary = `按${s.pe.label}赛道标准来看，你的项目大概值${Math.round(s.conservativeVal)}~${Math.round(s.optimisticVal)}万。中间价${Math.round(s.neutralVal)}万——这个数拿去跟投资人谈，有底气。`

  // 你是什么类型
  const typeSummary = `你是个「${s.archetype.name}」—— ${s.archetype.desc}`

  return { lines, valSummary, typeSummary, score: s.totalScore }
}

// ==================== 风控视角（补充材料+减缓条款） ====================
function buildRiskView(d: any, s: any): any {
  const requiredDocs = []
  const mitigations = []

  // 通用必要材料
  requiredDocs.push('近6个月银行流水（验证日流水真实性）')
  requiredDocs.push('近12个月损益表（验证利润率）')
  if (d.refundRate > 0.05) {
    requiredDocs.push('退款明细分类（区分质量问题/客户主动/恶意退款）')
    mitigations.push({ text: `退款率KPI条款：退款率需在6个月内降至${Math.min(8, Math.round(d.refundRate * 50))}%以下`, priority: 'red' })
  }
  if (d.debtRatio > 0.3) {
    requiredDocs.push('负债明细及还款计划')
    mitigations.push({ text: '限制新增有息负债条款：融资存续期内不得新增银行贷款', priority: d.debtRatio > 0.5 ? 'red' : 'yellow' })
  }
  if (s.cashScore < 60) {
    requiredDocs.push('应收账款账龄分析')
  }
  requiredDocs.push('租赁合同/经营场所证明')
  requiredDocs.push('主要供应商/客户合同（前3大）')
  if (d.employeeCount > 5) {
    requiredDocs.push('员工花名册及社保缴纳证明')
  }

  // 减缓条款
  if (d.profitMargin < 0.1) {
    mitigations.push({ text: '利润率保护条款：连续两季度利润率低于8%触发估值调整', priority: 'yellow' })
  }
  mitigations.push({ text: '信息披露义务：按月/季提供经营数据报表', priority: 'green' })
  mitigations.push({ text: '重大事项通知：涉及核心团队变动、重大诉讼需提前通知', priority: 'green' })

  return { requiredDocs, mitigations }
}

// ==================== 异常检测（HSR 引力透镜 / 暗质量探测） ==
function buildAnomalies(d: any, pe: any): any[] {
  const anomalies: any[] = []
  // 退款率异常
  if (d.refundRate > 0.05) {
    anomalies.push({
      field: '退款率',
      value: `${(d.refundRate * 100).toFixed(1)}%`,
      benchmark: `同行一般3~5%`,
      deviation: `+${Math.round((d.refundRate / 0.04 - 1) * 100)}%`,
      severity: d.refundRate > 0.1 ? 'HIGH' : 'MEDIUM',
      impact: '退款率每高1个点，实际利润就少一截——钱赚了又退回去等于白忙活'
    })
  }
  // 负债率异常
  if (d.debtRatio > 0.35) {
    anomalies.push({
      field: '负债率',
      value: `${(d.debtRatio * 100).toFixed(1)}%`,
      benchmark: `行业安全线30%以下`,
      deviation: `+${Math.round((d.debtRatio / 0.3 - 1) * 100)}%`,
      severity: d.debtRatio > 0.6 ? 'HIGH' : 'MEDIUM',
      impact: '杠杆拉高了，遇到风吹草动容易现金流断裂'
    })
  }
  // 利润率异常低
  if (d.profitMargin < 0.05 && d.annualRevenue > 500000) {
    anomalies.push({
      field: '利润率',
      value: `${(d.profitMargin * 100).toFixed(1)}%`,
      benchmark: `${pe.label}赛道一般8~15%`,
      deviation: `偏低`,
      severity: 'HIGH',
      impact: '营收不小但利润薄如纸——增长越快可能亏越多，先查成本结构'
    })
  }
  // 增长率异常高（可能数据有水分）
  if (d.growthRate > 0.5) {
    anomalies.push({
      field: '增长率',
      value: `${(d.growthRate * 100).toFixed(0)}%`,
      benchmark: `${pe.label}赛道平均5~15%`,
      deviation: `+${Math.round((d.growthRate / 0.1 - 1) * 100)}%`,
      severity: 'MEDIUM',
      impact: '增速太猛要核实——是真需求驱动还是补贴/促销拉出来的虚火'
    })
  }
  return anomalies
}

// ==================== 结构化行动建议（红黄绿优先级排序）====================
function buildActionItems(d: any, scores: any): any[] {
  const items: any[] = []
  // 红色（最优先）
  if (d.refundRate > 0.08) {
    items.push({ priority: 'red', text: `退款率${(d.refundRate * 100).toFixed(0)}%太高，先压到5%以下——这一项改好就能直接提分` })
  }
  if (scores.pm < 0.05) {
    items.push({ priority: 'red', text: '利润率在生死线上，先砍掉不赚钱的业务线或重新谈供应商价格' })
  }
  if (d.debtRatio > 0.6) {
    items.push({ priority: 'red', text: '负债率过高，先做债务优化——投资人看到高杠杆第一反应是砍估值' })
  }
  // 黄色（次优先）
  if (d.debtRatio > 0.3 && d.debtRatio <= 0.6) {
    items.push({ priority: 'yellow', text: `负债率${(d.debtRatio * 100).toFixed(0)}%偏高，逐步降到25%以下，谈判桌上底气会更足` })
  }
  if (scores.growthScore < 50 && scores.profitScore > 60) {
    items.push({ priority: 'yellow', text: '利润还行但增长见顶了——找第二增长引擎，可以看新渠道或新品类' })
  }
  if (scores.opScore < 55) {
    items.push({ priority: 'yellow', text: '运营效率有提升空间——检查人效和费用结构，每省1%成本就是纯利润' })
  }
  // 绿色（保持）
  if (scores.profitScore >= 70) {
    items.push({ priority: 'green', text: `利润率${scores.pm > 1 ? (scores.pm).toFixed(0) : (scores.pm * 100).toFixed(0)}%在赛道里跑赢同行，继续保持这个节奏` })
  }
  if (scores.cashScore >= 70) {
    items.push({ priority: 'green', text: '现金流健康，钱在转——这是项目最硬的底牌，别动' })
  }
  if (scores.growthScore >= 65) {
    items.push({ priority: 'green', text: '增长势头不错，维持住就能给投资人讲好增长故事' })
  }
  // 保证至少有3条
  if (items.length < 3) {
    items.push({ priority: 'green', text: '持续积累经营数据，数据越完整下次体检诊断越准' })
  }
  return items
}

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>Flow Capital - 智能融资对接平台</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                primary: '#0F2557',
                secondary: '#1E40AF',
                accent: '#D4AF37',
                success: '#059669',
                warning: '#F59E0B',
                error: '#DC2626',
              },
              backgroundImage: {
                'gradient-finance': 'linear-gradient(135deg, #0F2557 0%, #1E40AF 50%, #2563EB 100%)',
                'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F59E0B 100%)',
                'gradient-card': 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              },
              boxShadow: {
                'finance': '0 4px 20px rgba(15, 37, 87, 0.1), 0 8px 40px rgba(15, 37, 87, 0.08)',
                'finance-hover': '0 8px 30px rgba(15, 37, 87, 0.15), 0 12px 50px rgba(15, 37, 87, 0.12)',
                'gold': '0 4px 15px rgba(212, 175, 55, 0.3)',
              },
              fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro SC', 'SF Pro Display', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
              }
            }
          }
        }
      </script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50 font-sans antialiased">
      
      <!-- Mobile Container -->
      <div id="app" class="max-w-[428px] mx-auto bg-white min-h-screen relative shadow-2xl">
        <!-- Content will be loaded here -->
      </div>
      
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
