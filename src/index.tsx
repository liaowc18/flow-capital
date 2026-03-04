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
  const systemPrompt = `你是一位顶级的「数学翻译官」，专门帮小微企业老板和投资人看懂项目。你的核心能力是：把复杂的财务分析、估值模型翻译成行业黑话+大白话混搭的风格，让做生意的人一秒就懂。

## 你的人设
- 你是做过100+项目尽调的FA老炮
- 你说话像资深行业老哥：先用行业黑话点到位，再用大白话解释清楚
- 你会用比喻、场景化语言，把抽象的财务概念变成「开店的人秒懂」的表达
- 你直接、不废话、说重点

## 输出要求 — 严格按JSON格式

你必须返回一个 JSON 对象，不要返回其他任何文字、markdown、代码块标记。直接输出纯 JSON：

{
  "score": 数字(0-100),
  "grade": "S/A/B/C/D",
  "archetype": "项目基因类型名(2-4字)",
  "archetypeDesc": "一句话解释这个基因型(用行业话讲)",
  "valuation": {
    "conservative": 数字(万元),
    "neutral": 数字(万元),
    "optimistic": 数字(万元),
    "method": "用的什么估值法(一句行业话)",
    "confidence": 数字(0-100)
  },
  "dimensions": {
    "profitability": { "score": 数字(0-100), "verdict": "一句行业话点评" },
    "cashQuality": { "score": 数字(0-100), "verdict": "一句行业话点评" },
    "growthTrend": { "score": 数字(0-100), "verdict": "一句行业话点评" },
    "scaleVolume": { "score": 数字(0-100), "verdict": "一句行业话点评" },
    "operationEfficiency": { "score": 数字(0-100), "verdict": "一句行业话点评" },
    "debtRisk": { "score": 数字(0-100), "verdict": "一句行业话点评" }
  },
  "dealParams": {
    "suggestedPE": "建议PE倍数范围",
    "suggestedStake": "建议出让比例",
    "dealStructure": "一句话建议交易结构",
    "keyCondition": "一句话关键条件"
  },
  "report": {
    "oneLiner": "一句话总结这项目(像FA给LP说的那种)",
    "strengths": ["优势1(行业话)", "优势2", "优势3"],
    "risks": ["风险1(行业话)", "风险2", "风险3"],
    "actionPlan": "给老板的造局建议(2-3句，用行业话+大白话)",
    "investorPitch": "如果要拿这个项目去见投资人，一段话怎么说(3-4句)"
  }
}

## 分析框架
- score: 综合考虑盈利、现金流、增长、规模、运营、负债
- archetype: 根据行业特征 + 数据表现给出「基因分型」，如：激流型、稳盘型、烧钱型、印钞型、蛰伏型、泡沫型等
- 估值：根据行业选择合适的估值方法（PE/PS/DCF/交易对标），给出三档区间
- 维度分析：每个维度打分+一句行业话点评（要让小老板看得懂）
- 造局参数：给出PE、股比、交易结构等实操建议
- 报告：用FA的口吻，像跟LP喝茶时聊天那样说

## 语言风格示例
- ❌ "净利润率为33.3%，表现良好" 
- ✅ "利润率33%，在餐饮赛道算是闷声发财型的，一年下来光净赚就40个W"
- ❌ "建议PE倍数8-12x"
- ✅ "8到12倍PE，餐饮赛道这个利润水平，给到这个倍数不算贵——投资人算得过来账"

请务必只返回 JSON，不要加 \`\`\`json 标记。`

  const userPrompt = `请分析以下项目并给出完整估值报告：

📋 基础信息
- 项目名称：${data.name || '未命名项目'}
- 所属行业：${data.industry || '未指定'}

💰 核心数据
- 年营收：${data.annualRevenue ? Math.round(data.annualRevenue).toLocaleString() + '元' : '未提供'}
- 年成本：${data.annualCost ? Math.round(data.annualCost).toLocaleString() + '元' : '未提供'}
- 净利润：${data.calcNetProfit ? Math.round(data.calcNetProfit).toLocaleString() + '元/年' : '未提供'}
- 利润率：${(data.profitMargin * 100).toFixed(1)}%
- 日流水：${data.dailyCashFlow ? Math.round(data.dailyCashFlow).toLocaleString() + '元' : '未提供'}

📊 补充数据
- 退款率：${data.refundRate || '未提供'}
- 增长率：${data.growthRate || '未提供'}
- 周转天数：${data.turnoverDays || '未提供'}
- 负债率：${data.debtRatio || '未提供'}
- 员工人数：${data.employeeCount || '未提供'}
- 经营年限：${data.operatingYears || '未提供'}

请根据以上数据进行全面分析，记住：用小老板和FA之间聊天的风格来写。`

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

// ==================== 本地智能估值引擎 ====================
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

  // 基因分型
  type ArchetypeInfo = { name: string; desc: string }
  let archetype: ArchetypeInfo
  if (pm > 0.25 && cashScore > 80 && growthScore < 60) {
    archetype = { name: '印钞型', desc: '利润稳定现金流健康，属于闷声发财的好买卖' }
  } else if (growthScore > 80 && pm < 0.1) {
    archetype = { name: '烧钱型', desc: '增速快但利润薄，典型的以规模换估值打法' }
  } else if (pm > 0.15 && growthScore > 65 && cashScore > 70) {
    archetype = { name: '激流型', desc: '快进快出，高收益高风险，需超高频监控' }
  } else if (scaleScore > 75 && pm > 0.15 && growthScore < 50) {
    archetype = { name: '稳盘型', desc: '规模到位利润还行，就是没啥增长空间了' }
  } else if (growthScore > 70 && pm > 0.15) {
    archetype = { name: '潜力型', desc: '利润和增速都还不错，有上牌桌的资本' }
  } else if (pm < 0.05) {
    archetype = { name: '泡沫型', desc: '营收数据不差但利润率低得离谱，小心虚胖' }
  } else if (debtScore < 40) {
    archetype = { name: '高杠杆型', desc: '债务压力大，一旦现金流断裂就得跪' }
  } else {
    archetype = { name: '蛰伏型', desc: '各项指标中规中矩，需要找到突破点' }
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

  // 维度点评（行业黑话风格）
  const profitVerdict = pm > 30 ? `利润率${pm.toFixed(0)}%，在${pe.label}赛道算是闷声发财型的，一年净赚${npW}万` :
    pm > 15 ? `利润率${pm.toFixed(0)}%，${pe.label}赛道中等偏上水平，还有优化空间` :
    pm > 5 ? `利润率${pm.toFixed(0)}%，能赚钱但利润偏薄，得看流水够不够大` :
    `利润率才${pm.toFixed(1)}%，基本在生死线上挣扎，得重新算成本结构`

  const cashVerdict = cashScore >= 85 ? `日流水${dailyFlowK}K，周转${turnoverDays || '—'}天，现金流比很多A轮项目都健康——钱是真的在转` :
    cashScore >= 65 ? `日流水${dailyFlowK}K，周转周期还行，现金流基本面OK但要盯紧应收` :
    cashScore >= 45 ? `现金流一般般，周转偏慢，建议缩短账期或者谈预付款` :
    `现金流拉胯，钱转不动的话再大的营收也是纸面富贵`

  const growthVerdict = growthScore >= 85 ? `增速${growthRate ? (growthRate * 100).toFixed(0) + '%' : '强劲'}，这个数放在${pe.label}赛道是第一梯队的存在` :
    growthScore >= 65 ? `增长率${growthRate ? (growthRate * 100).toFixed(0) + '%' : '可观'}，不算爆发但稳得住，投资人看着舒服` :
    growthScore >= 45 ? `增速一般，没有特别明显的向上势头，需要找新增长引擎` :
    `增长乏力，原有模式可能碰到天花板了，得考虑破局`

  const scaleVerdict = revWan >= 300 ? `年营收${revWan.toFixed(0)}万，在${pe.label}赛道已经过了生存线，有造局的底气` :
    revWan >= 100 ? `年营收${revWan.toFixed(0)}万，规模还行但离天花板还有距离` :
    `年营收${revWan.toFixed(0)}万，体量偏小，得先把规模跑起来`

  const opVerdict = opScore >= 75 ? '运营效率高，成本控制得住，老板是个会算账的' :
    opScore >= 55 ? '运营中规中矩，没有特别大的浪费但还有精益空间' :
    '运营效率偏低，要么人效不高要么成本结构有问题'

  const debtVerdict = debtScore >= 80 ? '负债率很低，轻装上阵，谈判桌上底气足' :
    debtScore >= 60 ? '负债水平可控，不影响正常经营' :
    debtScore >= 40 ? '负债偏高，要注意现金流安全垫' :
    '负债率太高了，一旦遇到黑天鹅事件很危险'

  // 造局参数
  const sugPE = `${pe.low}~${pe.high}倍PE，${pe.label}赛道这个利润水平，给到这个倍数投资人算得过来账`
  const sugStake = totalScore >= 75 ? '10%~20%，项目质地好可以少出让一点' :
    totalScore >= 55 ? '15%~25%，中等水平建议给到标准比例' :
    '20%~35%，项目还需要证明自己，可能要多让一些'
  const dealStruct = calcNetProfit > 500000 ?
    '建议「固定估值+对赌」结构，先锁一个保底估值，业绩达标再释放剩余股权' :
    '建议「现金+资源置换」结构，除了钱还要谈渠道和供应链资源'
  const keyCond = growthRate > 0.15 ?
    '关键条件：锁定未来12个月营收增长不低于' + Math.round(growthRate * 50) + '%，否则估值回调' :
    '关键条件：季度利润不低于当前水平的80%，确保基本盘稳固'

  // 报告
  const oneLiner = `${name || '项目'}是个${pe.label}赛道的${archetype.name}，年利润${npW}万，${totalScore >= 70 ? '基本面扎实值得深入看看' : totalScore >= 50 ? '有亮点但需要重点关注风控' : '风险点不少建议审慎评估'}`

  const strengths = [
    pm > 0.15 ? `利润率${pm.toFixed(0)}%在${pe.label}赛道跑赢同行，盈利模型已验证` : `营收规模${revWan.toFixed(0)}万/年，业务跑通了`,
    cashScore >= 65 ? `日流水${dailyFlowK}K且周转快，现金流是实打实的` : `有稳定的营收来源，商业逻辑成立`,
    growthScore >= 60 ? `增长势头不错，后续有放大空间` : `运营团队有执行力，基本盘守得住`
  ]

  const risks = [
    pm < 0.1 ? '利润率偏低，成本结构需要优化，否则规模越大亏得越多' :
      scaleScore < 40 ? '规模偏小，抗风险能力弱，一次意外就可能伤筋动骨' :
      '行业竞争激烈，需要持续构建差异化壁垒',
    debtScore < 60 ? '负债率偏高，融资前建议先做一轮债务优化' :
      '缺乏明显的竞争壁垒，护城河有待加深',
    growthScore < 50 ? '增长放缓，原有增长引擎可能到顶了，需要找第二曲线' :
      '行业政策变化、市场周期波动等系统性风险不可忽视'
  ]

  const actionPlan = totalScore >= 70 ?
    `这个项目基本面不错，建议先做一轮财务梳理把数据做漂亮，然后找3-5个战略投资人做一轮路演。重点讲利润率和现金流的故事——${pe.label}赛道的投资人最看重这个。` :
    `先别急着融资，建议先花2-3个月优化利润率和运营效率，把核心指标做上去。${pe.label}赛道现在资方谨慎，没有漂亮数据很难拿到好估值。`

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
      profitability: { score: Math.round(profitScore), verdict: profitVerdict },
      cashQuality: { score: Math.round(cashScore), verdict: cashVerdict },
      growthTrend: { score: Math.round(growthScore), verdict: growthVerdict },
      scaleVolume: { score: Math.round(scaleScore), verdict: scaleVerdict },
      operationEfficiency: { score: Math.round(opScore), verdict: opVerdict },
      debtRisk: { score: Math.round(debtScore), verdict: debtVerdict }
    },
    dealParams: {
      suggestedPE: sugPE,
      suggestedStake: sugStake,
      dealStructure: dealStruct,
      keyCondition: keyCond
    },
    report: {
      oneLiner,
      strengths,
      risks,
      actionPlan,
      investorPitch
    }
  }
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
