// Flow Capital - 主应用逻辑
// 现代金融风格交互界面

// ==================== 全局状态 ====================
let currentCard = 1;
const totalCards = 7;
let isFavorite = false;

// ==================== 项目数据 ====================
const projectsData = [
  {
    id: 1,
    title: '智慧医疗 AI 诊断系统',
    industry: '医疗健康',
    stage: 'A轮',
    location: '深圳',
    amount: '2,000万',
    valuation: '8,000万',
    minInvest: '100万',
    interested: 23,
    match: 92,
    icon: '🏥',
    team: '前腾讯医疗负责人领衔',
    highlight: '已获三甲医院合作',
    reason: '您关注医疗健康赛道 + A轮项目 + 深圳地区',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    videoPoster: 'https://placehold.co/400x220/0F2557/FFFFFF?text=🏥+智慧医疗AI+路演视频',
    details: [
      '已与 3 家三甲医院达成合作，累计服务 10 万+患者',
      'AI 诊断准确率达 95%，已获得医疗器械二类认证',
      '核心团队来自腾讯、阿里健康，拥有 10+ 年医疗 AI 经验'
    ]
  },
  {
    id: 2,
    title: 'Z世代潮流食品品牌',
    industry: '新消费',
    stage: 'Pre-A',
    location: '上海',
    amount: '800万',
    valuation: '3,200万',
    minInvest: '50万',
    interested: 15,
    match: 78,
    icon: '🍕',
    team: '连续创业者，前网红品牌操盘手',
    highlight: '月销已突破500万',
    reason: '您近期浏览了新消费赛道项目',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    videoPoster: 'https://placehold.co/400x220/1E40AF/FFFFFF?text=🍕+潮流食品品牌+路演视频',
    details: [
      'Z世代消费者占比85%，复购率超60%',
      '线上线下全渠道布局，已入驻30+购物中心',
      '获得知名消费基金青睐，估值增长迅速'
    ]
  },
  {
    id: 3,
    title: '智能客服 SaaS 平台',
    industry: '企业服务',
    stage: 'A轮',
    location: '北京',
    amount: '3,000万',
    valuation: '1.2亿',
    minInvest: '200万',
    interested: 31,
    match: 85,
    icon: '💬',
    team: '前字节跳动技术总监',
    highlight: '已签约50+企业客户',
    reason: '您偏好 SaaS 模式 + 技术驱动型项目',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    videoPoster: 'https://placehold.co/400x220/059669/FFFFFF?text=💬+智能客服SaaS+路演视频',
    details: [
      '服务Fortune 500企业，客户留存率95%',
      'AI智能对话系统，支持20+行业场景',
      'ARR 突破5000万，年增长率200%'
    ]
  },
  {
    id: 4,
    title: '固态电池技术研发',
    industry: '新能源',
    stage: 'A轮',
    location: '杭州',
    amount: '5,000万',
    valuation: '2亿',
    minInvest: '300万',
    interested: 18,
    match: 88,
    icon: '🔋',
    team: '中科院材料所博士团队',
    highlight: '已获发明专利12项',
    reason: '您关注新能源赛道 + 硬科技项目',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    videoPoster: 'https://placehold.co/400x220/D97706/FFFFFF?text=🔋+固态电池+路演视频',
    details: [
      '固态电池能量密度提升40%，安全性提升80%',
      '已与宁德时代、比亚迪建立战略合作',
      '获得国家重点研发计划支持'
    ]
  },
  {
    id: 5,
    title: 'AI 编程教育平台',
    industry: '教育科技',
    stage: '天使轮',
    location: '成都',
    amount: '500万',
    valuation: '2,000万',
    minInvest: '30万',
    interested: 12,
    match: 72,
    icon: '👨‍💻',
    team: '前猿辅导产品负责人',
    highlight: '付费用户3万+，月增长20%',
    reason: '您偏好早期项目 + 教育科技领域',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    videoPoster: 'https://placehold.co/400x220/7C3AED/FFFFFF?text=👨‍💻+AI编程教育+路演视频',
    details: [
      'AI个性化学习路径，用户学习效率提升3倍',
      '覆盖K12到职业教育全年龄段',
      '获得腾讯、字节跳动校友基金投资意向'
    ]
  },
  {
    id: 6,
    title: '基因检测与精准医疗',
    industry: '医疗健康',
    stage: 'B轮',
    location: '广州',
    amount: '1.2亿',
    valuation: '6亿',
    minInvest: '500万',
    interested: 45,
    match: 95,
    icon: '🧬',
    team: '哈佛医学院归国团队',
    highlight: '年营收8000万，已盈利',
    reason: '您重点关注医疗健康 + 成熟期项目',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    videoPoster: 'https://placehold.co/400x220/DC2626/FFFFFF?text=🧬+基因检测+路演视频',
    details: [
      '基因检测技术达到国际领先水平',
      '合作医疗机构超过200家，覆盖全国30个省市',
      '已服务用户超50万，客户满意度98%'
    ]
  },
  {
    id: 7,
    title: '工业视觉检测机器人',
    industry: '人工智能',
    stage: 'A轮',
    location: '北京',
    amount: '4,000万',
    valuation: '1.5亿',
    minInvest: '250万',
    interested: 27,
    match: 68,
    icon: '🤖',
    team: '清华自动化系教授创业',
    highlight: '已服务宁德时代、比亚迪',
    reason: '您关注智能制造 + 硬科技领域',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    videoPoster: 'https://placehold.co/400x220/0F2557/FFFFFF?text=🤖+工业视觉机器人+路演视频',
    details: [
      '视觉检测精度达到99.9%，远超人工检测',
      '已部署超过100条生产线，节省人工成本60%',
      '获得红杉资本、IDG资本青睐'
    ]
  }
];

// ==================== 初始化应用 ====================
document.addEventListener('DOMContentLoaded', function() {
  renderApp();
  // 造局工作台初始计算
  setTimeout(function() { updateDealLab(); }, 100);
});

// ==================== 页面渲染 ====================
function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderHomePage()}
    ${renderDetailPage()}
    ${renderDealLabPage()}
    ${renderRadarPage()}
    ${renderProfilePage()}
    ${renderMyProjectsPage()}
    ${renderPublishPage()}
    ${renderValuationPage()}
    ${renderToast()}
    ${renderFilterPanel()}
  `;
  
  // 初始化事件监听
  initializeEventListeners();
}

function renderHomePage() {
  return `
    <!-- 首页（发现项目） -->
    <div id="page-home" class="page active h-screen">
      
      <!-- 顶部栏 -->
      <header class="glass-effect px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-gradient-finance rounded-xl flex items-center justify-center shadow-finance">
            <span class="text-white font-bold text-sm">FC</span>
          </div>
          <span class="font-semibold text-gray-800">Flow Capital</span>
        </div>
        
        <!-- 筛选和通知 -->
        <div class="flex items-center gap-2">
          <button class="p-2 text-gray-500 hover:text-primary relative tap-effect" onclick="showPage('deal-lab')" title="造局工作台">
            <i class="fas fa-dice text-lg"></i>
          </button>
          <button id="filter-btn" class="p-2 text-gray-500 hover:text-primary relative tap-effect" onclick="openFilter()">
            <i class="fas fa-filter text-lg"></i>
            <span id="filter-badge" class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white text-xs rounded-full items-center justify-center hidden badge-pulse">0</span>
          </button>
          <button class="p-2 text-gray-500 hover:text-primary relative tap-effect" onclick="showPage('radar')">
            <i class="fas fa-bell text-lg"></i>
            <span class="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full badge-pulse"></span>
          </button>
        </div>
      </header>
      
      <!-- AI 推荐标题 -->
      <div class="px-4 py-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div class="flex items-center gap-2">
          <span class="text-2xl">✨</span>
          <span class="text-base font-semibold gradient-text">AI 为您推荐</span>
          <span class="text-xs text-gray-400">基于您的偏好智能匹配</span>
        </div>
      </div>
      
      <!-- 项目卡片列表 -->
      <div id="card-container" class="flex-1 overflow-hidden relative">
        ${renderProjectCards()}
        
        <!-- 无更多项目 -->
        <div id="no-more-cards" class="absolute inset-0 p-4 flex items-center justify-center" style="display: none;">
          <div class="text-center">
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">今日推荐已看完</h3>
            <p class="text-gray-500 mb-4">明天会有新的精选项目</p>
            <button class="px-6 py-3 bg-gradient-finance text-white rounded-full shadow-finance tap-effect" onclick="resetCards()">重新浏览</button>
          </div>
        </div>
      </div>
      
      ${renderBottomNav('home')}
    </div>
  `;
}

function renderProjectCards() {
  return projectsData.map((project, index) => `
    <div id="card-${project.id}" class="card-slide absolute inset-0 p-4 flex flex-col" style="display: ${index === 0 ? 'flex' : 'none'};">
      <div class="bg-white rounded-2xl shadow-finance border border-gray-100 flex-1 flex flex-col overflow-hidden card-hover" onclick="showDetail(${project.id})">
        
        <!-- 匹配度进度条 + 标签 -->
        <div class="p-4 pb-2">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-bold ${project.match >= 85 ? 'text-success' : 'text-primary'}">
              ${project.match}% 匹配
            </span>
            <div class="flex gap-1.5">
              <span class="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg font-medium">${project.industry}</span>
              <span class="px-2.5 py-1 bg-purple-50 text-purple-600 text-xs rounded-lg font-medium">${project.stage}</span>
              <span class="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">${project.location}</span>
            </div>
          </div>
          <div class="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden match-progress">
            <div class="h-full bg-gradient-to-r ${project.match >= 85 ? 'from-success to-emerald-400' : 'from-primary to-secondary'} rounded-full transition-all" style="width: ${project.match}%"></div>
          </div>
        </div>
        
        <!-- 项目信息 -->
        <div class="px-4 py-3 flex-1">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-14 h-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
              ${project.icon}
            </div>
            <h3 class="text-xl font-bold text-gray-800 flex-1">${project.title}</h3>
          </div>
          
          <div class="space-y-2 text-sm text-gray-600">
            <div class="flex items-center gap-2">
              <i class="fas fa-coins text-accent"></i>
              <span>融资目标：<strong class="text-gray-800 font-semibold">${project.amount}</strong></span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-users text-primary"></i>
              <span>团队：${project.team}</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-star text-warning"></i>
              <span>亮点：${project.highlight}</span>
            </div>
          </div>
        </div>

        <!-- 视频介绍区域 -->
        <div class="mx-4 mb-3" onclick="event.stopPropagation()">
          <div class="flex items-center gap-2 mb-2">
            <i class="fas fa-play-circle text-primary text-sm"></i>
            <span class="text-xs font-semibold text-gray-600 uppercase tracking-wide">路演视频</span>
            <span class="text-xs text-gray-400">· 创始人亲述</span>
          </div>
          <div class="relative rounded-xl overflow-hidden bg-gray-900 shadow-finance" style="aspect-ratio: 16/9;">
            <video
              id="video-${project.id}"
              class="w-full h-full object-cover"
              src="${project.videoUrl}"
              poster="${project.videoPoster}"
              preload="none"
              playsinline
              webkit-playsinline
            ></video>
            <!-- 播放遮罩层 -->
            <div id="video-overlay-${project.id}" class="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/20" onclick="toggleVideo(${project.id})">
              <div id="play-btn-${project.id}" class="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white">
                <i class="fas fa-play text-primary text-xl pl-1"></i>
              </div>
              <span class="mt-2 text-white text-xs font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">点击播放路演视频</span>
            </div>
            <!-- 视频时长标签 -->
            <div class="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md backdrop-blur-sm font-medium">
              <i class="fas fa-clock mr-1 text-xs"></i>3:20
            </div>
          </div>
        </div>
        
        <!-- 推荐理由 -->
        <div class="mx-4 mb-4 p-3 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/20">
          <div class="flex items-start gap-2">
            <i class="fas fa-lightbulb text-accent text-lg"></i>
            <p class="text-sm text-gray-700">
              <span class="font-semibold text-primary">为您推荐：</span>
              ${project.reason}
            </p>
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="p-4 pt-0 flex gap-3">
          <button class="flex-1 py-3 border-2 border-gray-200 rounded-xl text-gray-600 font-medium tap-effect hover:border-gray-300" onclick="event.stopPropagation(); skipCard(${project.id})">
            跳过
          </button>
          <button class="flex-1 py-3 bg-gradient-finance text-white rounded-xl font-medium tap-effect flex items-center justify-center gap-2 shadow-finance" onclick="event.stopPropagation(); showInterest(${project.id})">
            感兴趣 <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderDetailPage() {
  const firstProject = projectsData[0];
  return `
    <!-- 项目详情页 -->
    <div id="page-detail" class="page h-screen">
      
      <!-- 顶部栏 -->
      <header class="glass-effect px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <button class="p-2 -ml-2 tap-effect" onclick="showPage('home')">
          <i class="fas fa-arrow-left text-gray-600 text-xl"></i>
        </button>
        <span class="font-semibold text-gray-800">项目详情</span>
        <button class="p-2 -mr-2 tap-effect" onclick="toggleFavorite()">
          <i id="favorite-icon" class="far fa-heart text-gray-400 text-xl"></i>
        </button>
      </header>
      
      <!-- 详情内容 -->
      <div class="flex-1 overflow-auto no-scrollbar pb-24">
        <div id="detail-content">
          <!-- 动态内容区域 -->
          ${renderProjectDetail(firstProject)}
        </div>
      </div>
      
      <!-- 底部操作栏 -->
      <div class="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3 nav-shadow">
        <button class="flex-1 py-3 border-2 border-gray-200 rounded-xl text-gray-600 font-medium tap-effect" onclick="showPage('home')">
          返回
        </button>
        <button class="flex-1 py-3 bg-gradient-finance text-white rounded-xl font-medium tap-effect shadow-finance" onclick="showInterestFromDetail()">
          我感兴趣
        </button>
      </div>
    </div>
  `;
}

function renderProjectDetail(project) {
  return `
    <!-- 匹配度头部 -->
    <div class="bg-gradient-finance p-6 text-white">
      <div class="flex items-center gap-4 mb-4">
        <div class="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl backdrop-blur-sm">
          ${project.icon}
        </div>
        <div class="flex-1">
          <h1 class="text-xl font-bold mb-1">${project.title}</h1>
          <p class="text-white/80 text-sm">${project.location} · ${project.industry} · ${project.stage}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-4 py-2 bg-white/20 rounded-full text-sm font-bold backdrop-blur-sm">${project.match}% 匹配度</span>
        <span class="text-white/80 text-sm">为您精选推荐</span>
      </div>
    </div>
    
    <!-- 融资信息 -->
    <div class="p-4 bg-white border-b border-gray-100">
      <h2 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <i class="fas fa-chart-line text-primary"></i>
        融资信息
      </h2>
      <div class="grid grid-cols-2 gap-3">
        <div class="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl neumorphic-inset">
          <p class="text-gray-500 text-xs mb-1">融资目标</p>
          <p class="text-xl font-bold text-gray-800">${project.amount}</p>
        </div>
        <div class="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl neumorphic-inset">
          <p class="text-gray-500 text-xs mb-1">投前估值</p>
          <p class="text-xl font-bold text-gray-800">${project.valuation}</p>
        </div>
        <div class="p-4 bg-gradient-to-br from-success/5 to-success/10 rounded-xl neumorphic-inset">
          <p class="text-gray-500 text-xs mb-1">最低投资</p>
          <p class="text-xl font-bold text-success">${project.minInvest}</p>
        </div>
        <div class="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl neumorphic-inset">
          <p class="text-gray-500 text-xs mb-1">已有意向</p>
          <p class="text-xl font-bold text-gray-800">${project.interested}人</p>
        </div>
      </div>
    </div>
    
    <!-- 项目亮点 -->
    <div class="p-4 bg-white border-b border-gray-100">
      <h2 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <i class="fas fa-trophy text-warning"></i>
        项目亮点
      </h2>
      <div class="space-y-3">
        ${project.details.map(detail => `
          <div class="flex items-start gap-3 p-3 bg-gradient-to-r from-success/5 to-transparent rounded-xl">
            <div class="w-6 h-6 bg-success/20 text-success rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
              <i class="fas fa-check"></i>
            </div>
            <p class="text-gray-700 flex-1 text-sm leading-relaxed">${detail}</p>
          </div>
        `).join('')}
      </div>
    </div>
    
    <!-- 风险提示 -->
    <div class="p-4 bg-gradient-to-r from-warning/5 to-error/5 border-b border-warning/20">
      <div class="flex items-start gap-3">
        <i class="fas fa-exclamation-triangle text-warning text-lg"></i>
        <div>
          <h3 class="font-semibold text-gray-800 mb-1">风险提示</h3>
          <p class="text-sm text-gray-600 leading-relaxed">股权投资具有高风险，投资前请仔细阅读项目详情和风险披露。建议投资金额不超过个人可投资资产的10%。</p>
        </div>
      </div>
    </div>
  `;
}

// ==================== 🎰 造局工作台（独立Tab） ====================

// 造局默认参数
const dealLabDefaults = {
  industry: '餐饮',
  dailyFlow: 8500,
  profitMargin: 22,
  wolfCapital: 20,
  seniorCapital: 80,
  seniorReturn: 12,
  wolfShare: 92,
  dailyRetain: 15,
  circuitBreaker: 40
};

// 行业基准数据
const industryBenchmarks = {
  '餐饮':     { dailyFlow: 8500, pm: 22, pe: '5-12',  turnover: 3,  desc: '现金流好，利润率中等' },
  '零售':     { dailyFlow: 12000, pm: 15, pe: '6-15', turnover: 15, desc: '流水大，利润率偏薄' },
  '教育':     { dailyFlow: 5000, pm: 35, pe: '8-18',  turnover: 5,  desc: '利润率高，季节性强' },
  '医疗健康': { dailyFlow: 6000, pm: 28, pe: '12-25', turnover: 10, desc: '毛利高，合规成本大' },
  '美容美发': { dailyFlow: 7000, pm: 40, pe: '4-10',  turnover: 2,  desc: '利润率最高，周转快' },
  '物流':     { dailyFlow: 15000, pm: 8,  pe: '6-13', turnover: 7,  desc: '重资产，利润率低' },
  '制造业':   { dailyFlow: 20000, pm: 12, pe: '5-12', turnover: 30, desc: '规模大，周转慢' },
  '科技/SaaS':{ dailyFlow: 3000, pm: 45, pe: '15-40', turnover: 20, desc: '高毛利，前期烧钱' },
  '新消费':   { dailyFlow: 9000, pm: 18, pe: '8-22',  turnover: 8,  desc: '增长快，竞争激烈' },
  '新能源':   { dailyFlow: 25000, pm: 10, pe: '10-30', turnover: 25, desc: '重投入，长周期回报' },
  '服务业':   { dailyFlow: 6000, pm: 25, pe: '5-12',  turnover: 5,  desc: '轻资产，人效为王' }
};

function renderDealLabPage() {
  return `
    <div id="page-deal-lab" class="page h-screen bg-gray-50">
      <!-- 顶部栏 -->
      <header class="glass-effect px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <div class="flex items-center gap-2">
          <span class="text-xl">🎰</span>
          <span class="font-semibold text-gray-800">造局工作台</span>
        </div>
        <div class="flex items-center gap-2">
          <button class="px-3 py-1.5 text-xs font-medium text-primary bg-primary/5 border border-primary/20 rounded-full tap-effect" onclick="showPage('valuation')">
            <i class="fas fa-stethoscope mr-1"></i>用真实数据校准
          </button>
        </div>
      </header>

      <div class="flex-1 overflow-auto no-scrollbar pb-24">

        <!-- 引导提示 -->
        <div class="px-4 py-3 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50">
          <div class="flex items-center gap-2">
            <span class="text-lg">⚡</span>
            <span class="text-sm font-semibold text-amber-800">零门槛开始</span>
            <span class="text-xs text-amber-600">拖动滑块，秒算收益 — 不需要填表</span>
          </div>
        </div>

        <!-- 行业快选 -->
        <div class="px-4 pt-4 pb-2">
          <div class="flex items-center gap-2 mb-3">
            <i class="fas fa-industry text-primary text-sm"></i>
            <span class="text-xs font-semibold text-gray-700">选一个行业（自动填入基准数据）</span>
          </div>
          <div class="flex flex-wrap gap-2" id="dl-industry-tags">
            ${Object.keys(industryBenchmarks).map((ind, i) => `
              <button class="dl-ind-tag px-3 py-1.5 rounded-full text-xs font-medium border-2 tap-effect transition-all ${i === 0 ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 text-gray-500 hover:border-primary/50'}" onclick="selectDealLabIndustry('${ind}', this)">
                ${ind}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 基准数据条 -->
        <div class="mx-4 mt-2 p-3 rounded-xl bg-white border border-gray-100 shadow-sm" id="dl-benchmark-bar">
          <div class="grid grid-cols-4 gap-2 text-center">
            <div>
              <p class="text-xs text-gray-400">日均流水</p>
              <p class="text-sm font-bold text-gray-800" id="dl-bench-flow">${(dealLabDefaults.dailyFlow / 1000).toFixed(1)}K</p>
            </div>
            <div>
              <p class="text-xs text-gray-400">利润率</p>
              <p class="text-sm font-bold text-gray-800" id="dl-bench-pm">${dealLabDefaults.profitMargin}%</p>
            </div>
            <div>
              <p class="text-xs text-gray-400">PE 参考</p>
              <p class="text-sm font-bold text-gray-800" id="dl-bench-pe">5-12</p>
            </div>
            <div>
              <p class="text-xs text-gray-400">周转天数</p>
              <p class="text-sm font-bold text-gray-800" id="dl-bench-turn">3天</p>
            </div>
          </div>
          <p class="text-xs text-gray-400 mt-2 text-center" id="dl-bench-desc">现金流好，利润率中等</p>
        </div>

        <!-- 流水/利润率微调 -->
        <div class="mx-4 mt-3 bg-white rounded-2xl shadow-finance border border-gray-100 p-4">
          <div class="flex items-center gap-2 mb-3">
            <i class="fas fa-chart-bar text-primary text-sm"></i>
            <span class="text-xs font-semibold text-gray-700">项目基本面（可微调）</span>
          </div>
          ${renderDlSlider('dl-daily-flow', '预估日均流水', dealLabDefaults.dailyFlow, 1000, 50000, '元', 500)}
          ${renderDlSlider('dl-pm', '预估利润率', dealLabDefaults.profitMargin, 1, 60, '%', 1)}
        </div>

        <!-- 赌局设计器 -->
        <div class="mx-4 mt-3 bg-white rounded-2xl shadow-finance border border-gray-100 overflow-hidden">
          <div class="p-4 bg-gradient-to-r from-amber-500 to-orange-500 border-b">
            <div class="flex items-center gap-2"><span class="text-lg">🎰</span><span class="text-white font-bold text-sm">设计你的赌局</span></div>
            <p class="text-amber-100 text-xs mt-1">6 根杠杆，拖出你的交易结构</p>
          </div>
          <div class="p-4 space-y-4" id="dl-sliders-body">
            ${renderDlSlider('dl-wolf', '我出多少（劣后）', dealLabDefaults.wolfCapital, 5, 200, '万', 5)}
            ${renderDlSlider('dl-senior', '拉多少优先资金', dealLabDefaults.seniorCapital, 0, 500, '万', 10)}
            ${renderDlSlider('dl-senior-ret', '优先方保底年化', dealLabDefaults.seniorReturn, 6, 24, '%', 1)}
            ${renderDlSlider('dl-wolf-share', '超额利润我分', dealLabDefaults.wolfShare, 50, 98, '%', 1)}
            ${renderDlSlider('dl-retain', '日流水截留', dealLabDefaults.dailyRetain, 5, 40, '%', 1)}
            ${renderDlSlider('dl-circuit', '月营收跌多少熔断', dealLabDefaults.circuitBreaker, 20, 60, '%', 5)}
          </div>
        </div>

        <!-- 实时计算结果 -->
        <div class="mx-4 mt-3" id="dl-calc-result">
        </div>

        <!-- T+0 分账模拟表 -->
        <div id="dl-settlement-table" class="mx-4 mt-3 hidden"></div>

        <!-- 操作栏 -->
        <div class="mx-4 mt-3 mb-6 flex gap-2">
          <button class="flex-1 py-3 rounded-xl font-semibold text-sm tap-effect flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-gold" onclick="exportDealLabPlan()">
            <i class="fas fa-scroll text-xs"></i> 导出方案
          </button>
          <button class="flex-1 py-3 rounded-xl font-semibold text-sm tap-effect flex items-center justify-center gap-2 bg-white border border-primary/30 text-primary shadow-sm" onclick="showPage('valuation')">
            <i class="fas fa-stethoscope text-xs"></i> 用真数据校准 →
          </button>
        </div>

      </div>

      ${renderBottomNav('deal-lab')}
    </div>
  `;
}

function renderDlSlider(id, label, defaultVal, min, max, unit, step) {
  return '<div class="mb-1">' +
    '<div class="flex justify-between items-center mb-1.5">' +
      '<span class="text-xs font-semibold text-gray-600">' + label + '</span>' +
      '<span class="text-xs font-bold text-primary" id="' + id + '-val">' + defaultVal + unit + '</span>' +
    '</div>' +
    '<input type="range" id="' + id + '" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" ' +
      'min="' + min + '" max="' + max + '" value="' + defaultVal + '" step="' + step + '" ' +
      'oninput="document.getElementById(\'' + id + '-val\').textContent=this.value+\'' + unit + '\'; updateDealLab()">' +
  '</div>';
}

function selectDealLabIndustry(industry, el) {
  // 更新标签高亮
  document.querySelectorAll('.dl-ind-tag').forEach(t => {
    t.classList.remove('border-primary', 'bg-primary/10', 'text-primary');
    t.classList.add('border-gray-200', 'text-gray-500');
  });
  if (el) {
    el.classList.add('border-primary', 'bg-primary/10', 'text-primary');
    el.classList.remove('border-gray-200', 'text-gray-500');
  }

  var bench = industryBenchmarks[industry] || industryBenchmarks['餐饮'];
  // 更新基准数据显示
  var flowEl = document.getElementById('dl-bench-flow');
  var pmEl = document.getElementById('dl-bench-pm');
  var peEl = document.getElementById('dl-bench-pe');
  var turnEl = document.getElementById('dl-bench-turn');
  var descEl = document.getElementById('dl-bench-desc');
  if (flowEl) flowEl.textContent = (bench.dailyFlow / 1000).toFixed(1) + 'K';
  if (pmEl) pmEl.textContent = bench.pm + '%';
  if (peEl) peEl.textContent = bench.pe;
  if (turnEl) turnEl.textContent = bench.turnover + '天';
  if (descEl) descEl.textContent = bench.desc;

  // 更新滑块值
  var flowSlider = document.getElementById('dl-daily-flow');
  var pmSlider = document.getElementById('dl-pm');
  if (flowSlider) {
    flowSlider.value = bench.dailyFlow;
    document.getElementById('dl-daily-flow-val').textContent = bench.dailyFlow + '元';
  }
  if (pmSlider) {
    pmSlider.value = bench.pm;
    document.getElementById('dl-pm-val').textContent = bench.pm + '%';
  }

  // 根据利润率调整推荐参数
  var wolfSlider = document.getElementById('dl-wolf');
  var seniorSlider = document.getElementById('dl-senior');
  var retainSlider = document.getElementById('dl-retain');
  var shareSlider = document.getElementById('dl-wolf-share');

  var sugRetain = bench.pm > 20 ? 15 : bench.pm > 10 ? 20 : 25;
  var sugShare = bench.pm > 20 ? 92 : bench.pm > 15 ? 88 : bench.pm > 8 ? 82 : 70;

  if (retainSlider) {
    retainSlider.value = sugRetain;
    document.getElementById('dl-retain-val').textContent = sugRetain + '%';
  }
  if (shareSlider) {
    shareSlider.value = sugShare;
    document.getElementById('dl-wolf-share-val').textContent = sugShare + '%';
  }

  updateDealLab();
}

function updateDealLab() {
  var el = document.getElementById('dl-calc-result');
  if (el) el.innerHTML = calcDealLab();
  // 同时更新分账表
  updateDlSettlement();
}

function calcDealLab() {
  var wolf = parseFloat((document.getElementById('dl-wolf') || {}).value) || 20;
  var senior = parseFloat((document.getElementById('dl-senior') || {}).value) || 80;
  var seniorRet = parseFloat((document.getElementById('dl-senior-ret') || {}).value) || 12;
  var wolfShare = parseFloat((document.getElementById('dl-wolf-share') || {}).value) || 92;
  var retain = parseFloat((document.getElementById('dl-retain') || {}).value) || 15;
  var circuit = parseFloat((document.getElementById('dl-circuit') || {}).value) || 40;
  var baseDaily = parseFloat((document.getElementById('dl-daily-flow') || {}).value) || 8500;
  var pm = parseFloat((document.getElementById('dl-pm') || {}).value) || 22;

  var total = wolf + senior;
  var leverage = wolf > 0 ? (total / wolf).toFixed(1) : '∞';
  var safety = total > 0 ? Math.round(senior / total * 100) : 0;

  var scenarios = [
    { label: '保守', factor: 0.7, color: 'text-gray-600', bg: 'bg-gray-50' },
    { label: '中性', factor: 1.0, color: 'text-primary', bg: 'bg-primary/5' },
    { label: '乐观', factor: 1.3, color: 'text-success', bg: 'bg-emerald-50' }
  ];

  var scenarioCards = scenarios.map(function(s) {
    var adjDaily = baseDaily * s.factor;
    var monthRetain = adjDaily * (retain / 100) * 30;
    var seniorTotal = senior * 10000 * (1 + seniorRet / 100);
    var monthsToPay = monthRetain > 0 ? Math.ceil(seniorTotal / monthRetain) : 99;
    var paybackDays = Math.min(monthsToPay * 30, 999);
    var remainMonths = Math.max(0, 12 - monthsToPay);
    var monthlyProfit = adjDaily * (pm / 100) * 30 / 10000;
    var wolfProfit = monthlyProfit * remainMonths * (wolfShare / 100);
    var irr = wolf > 0 ? Math.round(wolfProfit / wolf * 100) : 0;

    return '<div class="rounded-xl p-3 text-center ' + s.bg + ' border border-gray-100">' +
      '<p class="text-xs text-gray-400 mb-1 font-medium">' + s.label + '</p>' +
      '<p class="text-lg font-black ' + s.color + '">' + irr + '%</p>' +
      '<p class="text-xs text-gray-500">IRR</p>' +
      '<p class="text-xs font-bold text-gray-700 mt-1">' + paybackDays + '天</p>' +
      '<p class="text-xs text-gray-400">回本</p>' +
    '</div>';
  }).join('');

  // 极端风险
  var extremeDaily = baseDaily * 0.5;
  var extremeRetain = extremeDaily * (retain / 100) * 30;
  var extremeSenior = senior * 10000 * (1 + seniorRet / 100);
  var extremeMonths = extremeRetain > 0 ? Math.ceil(extremeSenior / extremeRetain) : 99;

  // 狼视角判断
  var dailyFlowK = (baseDaily / 1000).toFixed(1);
  var verdictText = '';
  var verdictBg = '';
  if (pm <= 0) {
    verdictText = '别碰——项目在亏钱（利润率' + pm + '%），做杠杆等于加速死亡';
    verdictBg = 'from-red-50 to-orange-50 border-red-200';
  } else if (pm < 8) {
    verdictText = '鸡肋盘——利润率' + pm + '%太薄，杠杆空间极小';
    verdictBg = 'from-amber-50 to-yellow-50 border-amber-200';
  } else if (pm < 15) {
    verdictText = '能做但别贪——利润率' + pm + '%，控制好截留比例别断项目的血';
    verdictBg = 'from-blue-50 to-indigo-50 border-blue-200';
  } else if (pm < 25) {
    verdictText = '好盘口——利润率' + pm + '%日流水' + dailyFlowK + 'K，用1:' + Math.round(senior/Math.max(1,wolf)) + '杠杆值得做';
    verdictBg = 'from-emerald-50 to-green-50 border-emerald-200';
  } else {
    verdictText = '肥肉——利润率' + pm + '%日流水' + dailyFlowK + 'K，这种盘口不多见，赶紧锁';
    verdictBg = 'from-emerald-50 to-green-50 border-emerald-200';
  }

  return '<div class="bg-white rounded-2xl shadow-finance border border-gray-100 overflow-hidden">' +
    // 狼视角判断
    '<div class="p-4 bg-gradient-to-r from-gray-900 to-gray-800">' +
      '<div class="flex items-center gap-2"><span class="text-lg">🐺</span><span class="text-white font-bold text-sm">狼视角判断</span></div>' +
    '</div>' +
    '<div class="p-4 space-y-3">' +
      '<div class="p-3 rounded-xl bg-gradient-to-r ' + verdictBg + ' border">' +
        '<p class="text-gray-800 text-xs leading-relaxed font-medium">' + escapeHtml(verdictText) + '</p>' +
      '</div>' +
      // 核心指标
      '<div class="grid grid-cols-3 gap-2">' +
        '<div class="text-center p-2.5 rounded-xl bg-gray-900 text-white">' +
          '<p class="text-xs text-gray-400 mb-0.5">总盘口</p>' +
          '<p class="text-sm font-bold">' + total + '万</p>' +
        '</div>' +
        '<div class="text-center p-2.5 rounded-xl bg-gray-900 text-white">' +
          '<p class="text-xs text-gray-400 mb-0.5">杠杆</p>' +
          '<p class="text-sm font-bold">' + leverage + 'x</p>' +
        '</div>' +
        '<div class="text-center p-2.5 rounded-xl bg-gray-900 text-white">' +
          '<p class="text-xs text-gray-400 mb-0.5">安全垫</p>' +
          '<p class="text-sm font-bold">' + safety + '%</p>' +
        '</div>' +
      '</div>' +
      // 三档场景
      '<div class="grid grid-cols-3 gap-2">' + scenarioCards + '</div>' +
      // 风险提示
      '<div class="p-2.5 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2">' +
        '<i class="fas fa-exclamation-triangle text-error text-xs mt-0.5 flex-shrink-0"></i>' +
        '<p class="text-xs text-gray-600">极端风险：若月流水跌50%，回本延至 <strong class="text-error">' + (extremeMonths * 30) + '天</strong>' +
        (extremeMonths > 12 ? ' <span class="text-error font-bold">（超过1年，存在本金损失风险）</span>' : '') + '</p>' +
      '</div>' +
      // 分账规则
      '<div class="p-2.5 rounded-xl bg-gray-50 border border-gray-100">' +
        '<p class="text-xs text-gray-500 leading-relaxed">' +
          '<strong>分账规则：</strong>阶段一（还本期）日流水×' + retain + '%截留 → 优先还本付息；' +
          '阶段二（分利期）超额利润 <strong class="text-primary">' + wolfShare + '%</strong> 归操盘方，' + (100 - wolfShare) + '% 归优先方。' +
          '熔断线：月营收连续2月下降超' + circuit + '%触发回购。' +
        '</p>' +
      '</div>' +
      // 展开分账表按钮
      '<button class="w-full py-2.5 rounded-xl text-xs font-semibold text-primary bg-primary/5 border border-primary/20 tap-effect flex items-center justify-center gap-1.5" onclick="toggleDlSettlement()">' +
        '<i class="fas fa-table"></i> 查看逐月分账模拟表' +
      '</button>' +
    '</div>' +
  '</div>';
}

function toggleDlSettlement() {
  var el = document.getElementById('dl-settlement-table');
  if (!el) return;
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
    updateDlSettlement();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    el.classList.add('hidden');
  }
}

function updateDlSettlement() {
  var el = document.getElementById('dl-settlement-table');
  if (!el || el.classList.contains('hidden')) return;

  var wolf = parseFloat((document.getElementById('dl-wolf') || {}).value) || 20;
  var senior = parseFloat((document.getElementById('dl-senior') || {}).value) || 80;
  var seniorRet = parseFloat((document.getElementById('dl-senior-ret') || {}).value) || 12;
  var wolfShare = parseFloat((document.getElementById('dl-wolf-share') || {}).value) || 92;
  var retain = parseFloat((document.getElementById('dl-retain') || {}).value) || 15;
  var baseDaily = parseFloat((document.getElementById('dl-daily-flow') || {}).value) || 8500;
  var pm = parseFloat((document.getElementById('dl-pm') || {}).value) || 22;

  var seniorRemain = senior * 10000 * (1 + seniorRet / 100);
  var wolfTotal = 0;
  var paybackMonth = 0;
  var rows = '';

  for (var m = 1; m <= 12; m++) {
    var jitter = 0.95 + Math.sin(m * 1.7) * 0.05;
    var dailyFlow = Math.round(baseDaily * jitter);
    var monthRetain = Math.round(dailyFlow * (retain / 100) * 30);
    var monthProfit = Math.round(dailyFlow * (pm / 100) * 30);
    var excess = 0, wolfGet = 0;
    var highlight = '';

    if (seniorRemain > 0) {
      var toPay = Math.min(monthRetain, seniorRemain);
      seniorRemain -= toPay;
      if (seniorRemain <= 0 && paybackMonth === 0) {
        paybackMonth = m;
        highlight = ' class="bg-emerald-50 font-semibold"';
      }
    } else {
      excess = Math.max(0, monthProfit);
      wolfGet = Math.round(excess * wolfShare / 100);
      wolfTotal += wolfGet;
    }

    rows += '<tr' + highlight + '>' +
      '<td class="px-2 py-1.5 text-center">' + m + '</td>' +
      '<td class="px-2 py-1.5 text-right">' + (dailyFlow / 1000).toFixed(1) + 'K</td>' +
      '<td class="px-2 py-1.5 text-right">' + (monthRetain / 10000).toFixed(2) + '万</td>' +
      '<td class="px-2 py-1.5 text-right">' + (seniorRemain > 0 ? (seniorRemain / 10000).toFixed(1) + '万' : '<span class="text-success">已清</span>') + '</td>' +
      '<td class="px-2 py-1.5 text-right">' + (excess > 0 ? (excess / 10000).toFixed(2) + '万' : '—') + '</td>' +
      '<td class="px-2 py-1.5 text-right font-bold ' + (wolfGet > 0 ? 'text-success' : '') + '">' + (wolfGet > 0 ? (wolfGet / 10000).toFixed(2) + '万' : '—') + '</td>' +
    '</tr>';
  }

  var wolfIRR = wolf > 0 ? Math.round(wolfTotal / 10000 / wolf * 100) : 0;

  el.innerHTML = '<div class="bg-white rounded-2xl shadow-finance border border-gray-100 overflow-hidden">' +
    '<div class="p-4 bg-gradient-to-r from-gray-800 to-gray-700">' +
      '<div class="flex items-center gap-2"><span class="text-lg">💸</span><span class="text-white font-bold text-sm">T+0 分账模拟（逐月）</span></div>' +
    '</div>' +
    '<div class="overflow-x-auto">' +
      '<table class="w-full text-xs">' +
        '<thead><tr class="bg-gray-50 text-gray-500">' +
          '<th class="px-2 py-2 text-center font-semibold">月</th>' +
          '<th class="px-2 py-2 text-right font-semibold">日均流水</th>' +
          '<th class="px-2 py-2 text-right font-semibold">月截留</th>' +
          '<th class="px-2 py-2 text-right font-semibold">优先剩余</th>' +
          '<th class="px-2 py-2 text-right font-semibold">超额利润</th>' +
          '<th class="px-2 py-2 text-right font-semibold">🐺 狼分得</th>' +
        '</tr></thead>' +
        '<tbody class="divide-y divide-gray-50">' + rows + '</tbody>' +
      '</table>' +
    '</div>' +
    '<div class="p-4 bg-gray-50 border-t border-gray-100">' +
      '<div class="grid grid-cols-3 gap-3 text-center">' +
        '<div><p class="text-xs text-gray-400">狼投入</p><p class="text-sm font-bold text-gray-800">' + wolf + '万</p></div>' +
        '<div><p class="text-xs text-gray-400">12月净赚</p><p class="text-sm font-bold text-success">' + (wolfTotal / 10000).toFixed(1) + '万</p></div>' +
        '<div><p class="text-xs text-gray-400">年化IRR</p><p class="text-sm font-bold ' + (wolfIRR > 30 ? 'text-success' : 'text-gray-800') + '">' + wolfIRR + '%</p></div>' +
      '</div>' +
      (paybackMonth > 0 ? '<p class="text-xs text-gray-500 text-center mt-2"><i class="fas fa-check-circle text-success mr-1"></i>第 ' + paybackMonth + ' 个月优先方本息回收完毕，之后超额利润 ' + wolfShare + '% 归狼</p>' :
        '<p class="text-xs text-error text-center mt-2"><i class="fas fa-exclamation-circle mr-1"></i>12个月内优先方本息未回收完毕，需延长周期或调整参数</p>') +
    '</div>' +
  '</div>';
}

function exportDealLabPlan() {
  var wolf = parseFloat((document.getElementById('dl-wolf') || {}).value) || 20;
  var senior = parseFloat((document.getElementById('dl-senior') || {}).value) || 80;
  var seniorRet = parseFloat((document.getElementById('dl-senior-ret') || {}).value) || 12;
  var wolfSharePct = parseFloat((document.getElementById('dl-wolf-share') || {}).value) || 92;
  var retainPct = parseFloat((document.getElementById('dl-retain') || {}).value) || 15;
  var circuitPct = parseFloat((document.getElementById('dl-circuit') || {}).value) || 40;
  var baseDaily = parseFloat((document.getElementById('dl-daily-flow') || {}).value) || 8500;
  var pm = parseFloat((document.getElementById('dl-pm') || {}).value) || 22;
  var total = wolf + senior;
  var leverage = wolf > 0 ? (total / wolf).toFixed(1) : '∞';
  var safety = total > 0 ? Math.round(senior / total * 100) : 0;

  // 获取当前选中行业
  var selectedInd = '未指定';
  document.querySelectorAll('.dl-ind-tag').forEach(function(t) {
    if (t.classList.contains('border-primary')) selectedInd = t.textContent.trim();
  });

  var text = '═══════════════════════════════════════\n';
  text += '  Flow Capital 联营方案书（造局工作台）\n';
  text += '═══════════════════════════════════════\n\n';
  text += '行业：' + selectedInd + ' | 日均流水：' + (baseDaily/1000).toFixed(1) + 'K | 利润率：' + pm + '%\n';
  text += '生成时间：' + new Date().toLocaleDateString('zh-CN') + '\n\n';

  text += '─── 交易结构设计 ───\n';
  text += '总盘口：' + total + '万\n';
  text += '├── 劣后资金（操盘方）：' + wolf + '万（' + Math.round(wolf / total * 100) + '%）\n';
  text += '└── 优先资金（资方）：' + senior + '万（' + Math.round(senior / total * 100) + '%）\n';
  text += '杠杆倍数：' + leverage + 'x\n\n';

  text += '优先方条件：\n';
  text += '├── 保底年化：' + seniorRet + '%\n';
  text += '└── 日流水截留还款：' + retainPct + '%\n\n';

  text += '超额利润分配：\n';
  text += '├── 操盘方（劣后）：' + wolfSharePct + '%\n';
  text += '└── 资方（优先）：' + (100 - wolfSharePct) + '%\n\n';

  text += '─── 风控条件 ───\n';
  text += '熔断线：月营收连续2个月下降超过' + circuitPct + '%触发回购\n';
  text += '安全垫：' + safety + '%\n\n';

  text += '─── 分账规则 ───\n';
  text += '阶段一（还本期）：日流水 × ' + retainPct + '% 截留 → 优先还本付息\n';
  text += '阶段二（分利期）：超额利润 ' + wolfSharePct + '% 归操盘方，' + (100 - wolfSharePct) + '% 归优先方\n';
  text += '结算方式：T+0 自动清算\n\n';

  text += '═══════════════════════════════════════\n';
  text += '  由 Flow Capital 造局工作台生成\n';
  text += '═══════════════════════════════════════\n';

  var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '联营方案_' + selectedInd + '_' + new Date().toISOString().slice(0,10) + '.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('✅ 联营方案已导出');
}

function renderProfilePage() {
  return `
    <!-- 我的页面（整合消息、项目管理） -->
    <div id="page-profile" class="page h-screen">
      <header class="bg-gradient-finance p-6 text-white">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm">
            <i class="fas fa-user"></i>
          </div>
          <div>
            <h1 class="text-xl font-bold">李女士</h1>
            <p class="text-white/80 text-sm">已认证会员 · VIP</p>
          </div>
        </div>
        <div class="flex gap-3">
          <div class="text-center flex-1 bg-white/10 rounded-xl py-3 backdrop-blur-sm">
            <p class="text-2xl font-bold">12</p>
            <p class="text-white/80 text-xs mt-1">已投项目</p>
          </div>
          <div class="text-center flex-1 bg-white/10 rounded-xl py-3 backdrop-blur-sm">
            <p class="text-2xl font-bold">2</p>
            <p class="text-white/80 text-xs mt-1">发布项目</p>
          </div>
          <div class="text-center flex-1 bg-white/10 rounded-xl py-3 backdrop-blur-sm">
            <p class="text-2xl font-bold">8</p>
            <p class="text-white/80 text-xs mt-1">收藏</p>
          </div>
        </div>
      </header>
      
      <div class="flex-1 overflow-auto no-scrollbar pb-24">
        <!-- 快捷功能区 -->
        <div class="p-4 grid grid-cols-4 gap-4 bg-white border-b border-gray-100">
          <button class="flex flex-col items-center gap-2 tap-effect" onclick="showPage('my-projects')">
            <div class="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center shadow-sm">
              <i class="fas fa-folder-open text-primary text-xl"></i>
            </div>
            <span class="text-xs text-gray-600 font-medium">我的项目</span>
          </button>
          <button class="flex flex-col items-center gap-2 tap-effect" onclick="showToast('📊 投资记录开发中')">
            <div class="w-14 h-14 bg-gradient-to-br from-success/10 to-success/20 rounded-2xl flex items-center justify-center shadow-sm">
              <i class="fas fa-chart-pie text-success text-xl"></i>
            </div>
            <span class="text-xs text-gray-600 font-medium">投资记录</span>
          </button>
          <button class="flex flex-col items-center gap-2 tap-effect" onclick="showToast('❤️ 收藏夹开发中')">
            <div class="w-14 h-14 bg-gradient-to-br from-error/10 to-error/20 rounded-2xl flex items-center justify-center shadow-sm">
              <i class="fas fa-heart text-error text-xl"></i>
            </div>
            <span class="text-xs text-gray-600 font-medium">我的收藏</span>
          </button>
          <button class="flex flex-col items-center gap-2 tap-effect" onclick="showPage('valuation')">
            <div class="w-14 h-14 bg-gradient-to-br from-warning/10 to-warning/20 rounded-2xl flex items-center justify-center shadow-sm">
              <i class="fas fa-calculator text-warning text-xl"></i>
            </div>
            <span class="text-xs text-gray-600 font-medium">估值体检</span>
          </button>
        </div>

        <!-- 消息中心 -->
        <div class="p-4 bg-white border-b border-gray-100">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gray-800 text-sm flex items-center gap-2">
              <i class="fas fa-bell text-primary"></i>消息通知
            </h3>
            <span class="px-2 py-0.5 bg-error/10 text-error text-xs rounded-full font-bold">3 条新消息</span>
          </div>
          <div class="space-y-2">
            <div class="p-3 bg-gray-50 rounded-xl flex items-center gap-3 tap-effect">
              <div class="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i class="fas fa-bullhorn text-primary text-sm"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold text-gray-800 truncate">系统通知 · 刚刚</p>
                <p class="text-xs text-gray-500 truncate">您关注的项目"智慧医疗AI"有新动态</p>
              </div>
              <span class="w-2 h-2 bg-error rounded-full flex-shrink-0"></span>
            </div>
            <div class="p-3 bg-gray-50 rounded-xl flex items-center gap-3 tap-effect">
              <div class="w-10 h-10 bg-gradient-to-br from-success/10 to-success/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <i class="fas fa-comment-dots text-success text-sm"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold text-gray-800 truncate">智慧医疗 AI · 创始人 · 2小时前</p>
                <p class="text-xs text-gray-500 truncate">感谢您的关注，期待进一步交流</p>
              </div>
            </div>
            <div class="p-3 bg-gray-50 rounded-xl flex items-center gap-3 tap-effect">
              <div class="w-10 h-10 bg-gradient-to-br from-accent/10 to-warning/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i class="fas fa-star text-accent text-sm"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold text-gray-800 truncate">新项目推荐 · 昨天</p>
                <p class="text-xs text-gray-500 truncate">3个新项目符合您的投资偏好</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 space-y-3">
          <p class="text-xs text-gray-400 font-medium mb-2">设置与帮助</p>
          ${renderSettingItem('gear', '偏好设置', '⚙️ 偏好设置开发中')}
          ${renderSettingItem('bell', '通知设置', '🔔 通知设置开发中')}
          ${renderSettingItem('shield-alt', '账户安全', '🔒 账户安全开发中')}
          ${renderSettingItem('question-circle', '帮助中心', '❓ 帮助中心开发中')}
        </div>
      </div>
      
      ${renderBottomNav('profile')}
    </div>
  `;
}

function renderSettingItem(icon, title, toastMsg) {
  return `
    <div class="p-4 bg-white rounded-xl border border-gray-100 flex items-center justify-between tap-effect card-hover" onclick="showToast('${toastMsg}')">
      <div class="flex items-center gap-3">
        <i class="fas fa-${icon} text-primary text-lg"></i>
        <span class="text-gray-800 font-medium">${title}</span>
      </div>
      <i class="fas fa-chevron-right text-gray-400"></i>
    </div>
  `;
}

// ==================== 📡 雷达页面（独立Tab） ====================

// 雷达页 Mock 数据：Look-alike 项目
const radarMockProjects = [
  { name: '连锁美容院（华南）', industry: '美容美发', similarity: 91, dailyFlowK: 7.2, pm: 38, monthlyRev: 21.6, icon: '💇', desc: '日流水稳定，客单价高，复购率好', leverage: '1:4', irr: 128 },
  { name: '社区健身工作室', industry: '服务业', similarity: 85, dailyFlowK: 5.5, pm: 32, monthlyRev: 16.5, icon: '🏋️', desc: '会员制现金流好，季节性波动小', leverage: '1:3', irr: 89 },
  { name: '奶茶连锁（三线城市）', industry: '餐饮', similarity: 82, dailyFlowK: 8.8, pm: 25, monthlyRev: 26.4, icon: '🧋', desc: '流水大、利润率中等，扩张空间大', leverage: '1:3', irr: 72 },
  { name: '宠物医院连锁', industry: '医疗健康', similarity: 79, dailyFlowK: 6.0, pm: 35, monthlyRev: 18.0, icon: '🐕', desc: '高客单价，刚需赛道，竞争少', leverage: '1:4', irr: 115 },
  { name: '母婴连锁店', industry: '零售', similarity: 76, dailyFlowK: 12.0, pm: 18, monthlyRev: 36.0, icon: '👶', desc: '流水大但利润薄，需精细运营', leverage: '1:2', irr: 45 },
  { name: '编程培训机构', industry: '教育', similarity: 73, dailyFlowK: 4.5, pm: 42, monthlyRev: 13.5, icon: '💻', desc: '利润率极高，但季节性明显', leverage: '1:4', irr: 135 },
];

function renderRadarPage() {
  return `
    <div id="page-radar" class="page h-screen bg-gray-50">
      <!-- 顶部栏 -->
      <header class="glass-effect px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <div class="flex items-center gap-2">
          <span class="text-xl">📡</span>
          <span class="font-semibold text-gray-800">雷达</span>
        </div>
        <div class="flex items-center gap-2">
          <button class="px-3 py-1.5 text-xs font-medium text-primary bg-primary/5 border border-primary/20 rounded-full tap-effect" onclick="showPage('valuation')">
            <i class="fas fa-stethoscope mr-1"></i>深度体检
          </button>
        </div>
      </header>

      <div class="flex-1 overflow-auto no-scrollbar pb-24">

        <!-- 引导提示 -->
        <div class="px-4 py-3 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50">
          <div class="flex items-center gap-2">
            <span class="text-lg">🔭</span>
            <span class="text-sm font-semibold text-purple-800">发现好盘口</span>
            <span class="text-xs text-purple-600">类似项目 + 行业参考 + 快速体检</span>
          </div>
        </div>

        <!-- 快速体检入口 -->
        <div class="mx-4 mt-4 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/10 border border-primary/20 tap-effect" onclick="showPage('valuation')">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <i class="fas fa-stethoscope text-primary text-xl"></i>
            </div>
            <div class="flex-1">
              <p class="text-sm font-bold text-gray-800">有项目？30秒评估值不值得做</p>
              <p class="text-xs text-gray-500 mt-0.5">输入几个核心数据 → 秒出六维体检 + 交易建议</p>
            </div>
            <i class="fas fa-chevron-right text-primary"></i>
          </div>
        </div>

        <!-- Look-alike 项目列表 -->
        <div class="px-4 mt-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gray-800 text-sm flex items-center gap-2">
              <span class="text-lg">🔭</span>
              值得关注的盘口
            </h3>
            <span class="text-xs text-gray-400">基于 P=MV 物理模型匹配</span>
          </div>

          <div class="space-y-3">
            ${radarMockProjects.map(function(p) {
              var simColor = p.similarity >= 85 ? 'text-success bg-emerald-50 border-emerald-200' : p.similarity >= 70 ? 'text-primary bg-blue-50 border-blue-200' : 'text-gray-600 bg-gray-50 border-gray-200';
              var irrColor = p.irr > 80 ? 'text-success' : p.irr > 40 ? 'text-primary' : 'text-gray-700';
              return `
                <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div class="p-4">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-2">
                        <span class="text-xl">${p.icon}</span>
                        <div>
                          <p class="text-sm font-bold text-gray-800">${p.name}</p>
                          <p class="text-xs text-gray-400">${p.industry}</p>
                        </div>
                      </div>
                      <span class="px-2 py-0.5 rounded-full text-xs font-bold border ${simColor}">${p.similarity}% 相似</span>
                    </div>
                    <p class="text-xs text-gray-500 mb-3">${p.desc}</p>
                    <div class="grid grid-cols-4 gap-1.5 text-center">
                      <div class="p-2 rounded-lg bg-gray-50">
                        <p class="text-xs text-gray-400">日流水</p>
                        <p class="text-xs font-bold text-gray-700">${p.dailyFlowK}K</p>
                      </div>
                      <div class="p-2 rounded-lg bg-gray-50">
                        <p class="text-xs text-gray-400">利润率</p>
                        <p class="text-xs font-bold text-gray-700">${p.pm}%</p>
                      </div>
                      <div class="p-2 rounded-lg bg-gray-50">
                        <p class="text-xs text-gray-400">推荐杠杆</p>
                        <p class="text-xs font-bold text-gray-700">${p.leverage}</p>
                      </div>
                      <div class="p-2 rounded-lg bg-gray-50">
                        <p class="text-xs text-gray-400">预估IRR</p>
                        <p class="text-xs font-bold ${irrColor}">${p.irr}%</p>
                      </div>
                    </div>
                  </div>
                  <div class="px-4 pb-3 flex gap-2">
                    <button class="flex-1 py-2 rounded-lg text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 tap-effect" onclick="applyRadarTemplate('${escapeHtml(p.name)}', ${p.dailyFlowK * 1000}, ${p.pm})">
                      <i class="fas fa-copy mr-1"></i>套用到造局
                    </button>
                    <button class="flex-1 py-2 rounded-lg text-xs font-semibold text-primary bg-primary/5 border border-primary/20 tap-effect" onclick="showToast('📊 ${escapeHtml(p.name)} 详情开发中')">
                      <i class="fas fa-search-plus mr-1"></i>查看详情
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- 行业参考数据 -->
        <div class="px-4 mt-4 mb-6">
          <div class="flex items-center gap-2 mb-3">
            <i class="fas fa-chart-bar text-primary text-sm"></i>
            <h3 class="font-bold text-gray-800 text-sm">行业参考基准</h3>
            <span class="text-xs text-gray-400">建立好盘口的直觉</span>
          </div>
          <div class="bg-white rounded-2xl shadow-finance border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-xs">
                <thead>
                  <tr class="bg-gray-50 text-gray-500">
                    <th class="px-3 py-2.5 text-left font-semibold">行业</th>
                    <th class="px-3 py-2.5 text-right font-semibold">日流水</th>
                    <th class="px-3 py-2.5 text-right font-semibold">利润率</th>
                    <th class="px-3 py-2.5 text-right font-semibold">PE</th>
                    <th class="px-3 py-2.5 text-right font-semibold">周转</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  ${Object.entries(industryBenchmarks).map(function([ind, b]) {
                    var pmColor = b.pm >= 25 ? 'text-success font-bold' : b.pm >= 15 ? 'text-primary' : 'text-gray-700';
                    return `<tr class="hover:bg-gray-50 cursor-pointer tap-effect" onclick="showPage('deal-lab'); setTimeout(function(){ selectDealLabIndustry('${ind}', document.querySelector('.dl-ind-tag[onclick*=\\'${ind}\\']')); }, 100);">
                      <td class="px-3 py-2.5 font-medium text-gray-800">${ind}</td>
                      <td class="px-3 py-2.5 text-right text-gray-700">${(b.dailyFlow / 1000).toFixed(1)}K</td>
                      <td class="px-3 py-2.5 text-right ${pmColor}">${b.pm}%</td>
                      <td class="px-3 py-2.5 text-right text-gray-700">${b.pe}</td>
                      <td class="px-3 py-2.5 text-right text-gray-500">${b.turnover}天</td>
                    </tr>`;
                  }).join('')}
                </tbody>
              </table>
            </div>
            <div class="px-4 py-2 bg-gray-50 border-t border-gray-100">
              <p class="text-xs text-gray-400 text-center"><i class="fas fa-info-circle mr-1"></i>点击行业行 → 直接跳转造局工作台，自动填入该行业基准数据</p>
            </div>
          </div>
        </div>

      </div>

      ${renderBottomNav('radar')}
    </div>
  `;
}

function applyRadarTemplate(name, dailyFlow, pm) {
  // 切换到造局页面
  showPage('deal-lab');
  setTimeout(function() {
    // 设置流水和利润率
    var flowSlider = document.getElementById('dl-daily-flow');
    var pmSlider = document.getElementById('dl-pm');
    if (flowSlider) {
      flowSlider.value = dailyFlow;
      document.getElementById('dl-daily-flow-val').textContent = dailyFlow + '元';
    }
    if (pmSlider) {
      pmSlider.value = pm;
      document.getElementById('dl-pm-val').textContent = pm + '%';
    }
    updateDealLab();
    showToast('✅ 已套用「' + name + '」的参数到造局工作台');
  }, 150);
}

// ==================== 📂 我的项目页面（独立全屏页） ====================

const myProjectsMock = [
  {
    id: 'mp1', title: '智能家居控制系统', industry: '物联网', stage: 'Pre-A', city: '深圳',
    amount: 600, interestedCount: 18, progress: 72, status: 'active', icon: '🏠',
    desc: '基于 Matter 协议的全屋智能中枢，已接入 200+ 品牌设备',
    highlights: ['DAU 3.2 万', '设备接入 200+', '复购率 65%'],
    updated: '2026-03-04'
  },
  {
    id: 'mp2', title: '社区团购 SaaS 平台', industry: '电商', stage: '天使轮', city: '杭州',
    amount: 300, interestedCount: 9, progress: 45, status: 'active', icon: '🛒',
    desc: '为社区团长提供一站式开团、履约、结算 SaaS 工具',
    highlights: ['GMV 月均 800 万', '团长 1.2 万', '履约率 98%'],
    updated: '2026-03-02'
  },
  {
    id: 'mp3', title: '健康管理 App', industry: '医疗健康', stage: 'A轮', city: '北京',
    amount: 1500, interestedCount: 26, progress: 100, status: 'completed', icon: '💊',
    desc: '慢病管理+AI随访，与 30+ 社区医院合作',
    highlights: ['注册用户 50 万', '月活 12 万', '续费率 78%'],
    updated: '2026-02-20'
  },
  {
    id: 'mp4', title: '新能源充电桩运营', industry: '新能源', stage: '种子轮', city: '成都',
    amount: 200, interestedCount: 0, progress: 0, status: 'draft', icon: '⚡',
    desc: '社区+商业停车场充电桩投放与运营',
    highlights: ['已签约 15 个场地', '预估日均 300 次充电'],
    updated: '2026-03-05'
  }
];

function renderMyProjectsPage() {
  const active = myProjectsMock.filter(p => p.status === 'active');
  const completed = myProjectsMock.filter(p => p.status === 'completed');
  const draft = myProjectsMock.filter(p => p.status === 'draft');

  function statusLabel(s) {
    if (s === 'active') return '<span class="px-2 py-0.5 text-xs font-bold rounded-full bg-primary/10 text-primary">进行中</span>';
    if (s === 'completed') return '<span class="px-2 py-0.5 text-xs font-bold rounded-full bg-success/10 text-success">已完成</span>';
    return '<span class="px-2 py-0.5 text-xs font-bold rounded-full bg-gray-200 text-gray-500">草稿</span>';
  }

  function progressColor(s) {
    if (s === 'completed') return 'from-success to-emerald-400';
    if (s === 'active') return 'from-primary to-secondary';
    return 'from-gray-300 to-gray-400';
  }

  function renderCard(p) {
    return `
      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover tap-effect mb-4 shadow-sm">
        <!-- 顶部状态栏 -->
        <div class="px-4 pt-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-2xl">${p.icon}</span>
            <div>
              <h4 class="font-bold text-gray-800 text-sm">${p.title}</h4>
              <p class="text-xs text-gray-400 mt-0.5">${p.industry} · ${p.stage} · ${p.city}</p>
            </div>
          </div>
          ${statusLabel(p.status)}
        </div>
        <!-- 描述 -->
        <p class="px-4 mt-2 text-xs text-gray-500 leading-relaxed">${p.desc}</p>
        <!-- 亮点标签 -->
        <div class="px-4 mt-2 flex flex-wrap gap-1.5">
          ${p.highlights.map(h => `<span class="px-2 py-0.5 text-xs bg-primary/5 text-primary/80 rounded-full border border-primary/10">${h}</span>`).join('')}
        </div>
        <!-- 融资进度 -->
        <div class="px-4 mt-3">
          <div class="flex items-center justify-between text-xs mb-1.5">
            <span class="text-gray-500">融资目标 <strong class="text-gray-800">${p.amount}万</strong></span>
            <span class="font-bold ${p.status === 'completed' ? 'text-success' : 'text-primary'}">${p.progress}%</span>
          </div>
          <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r ${progressColor(p.status)} rounded-full transition-all duration-500" style="width:${p.progress}%"></div>
          </div>
        </div>
        <!-- 底部信息 -->
        <div class="px-4 py-3 mt-2 border-t border-gray-50 flex items-center justify-between">
          <div class="flex items-center gap-3 text-xs text-gray-400">
            <span><i class="fas fa-user-friends mr-1"></i>${p.interestedCount} 位投资人关注</span>
            <span><i class="fas fa-clock mr-1"></i>${p.updated}</span>
          </div>
          ${p.status === 'draft'
            ? '<button class="text-xs font-semibold text-primary tap-effect" onclick="showPage(\'publish\')"><i class="fas fa-edit mr-1"></i>继续编辑</button>'
            : p.status === 'active'
              ? '<button class="text-xs font-semibold text-primary tap-effect" onclick="showToast(\'📊 项目数据面板开发中\')"><i class="fas fa-chart-line mr-1"></i>查看数据</button>'
              : '<button class="text-xs font-semibold text-success tap-effect" onclick="showToast(\'📋 投后报告开发中\')"><i class="fas fa-file-alt mr-1"></i>投后报告</button>'
          }
        </div>
      </div>
    `;
  }

  return `
    <div id="page-my-projects" class="page h-screen flex flex-col">
      <!-- 头部 -->
      <header class="glass-effect px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <button class="p-2 -ml-2 tap-effect" onclick="showPage('profile')">
          <i class="fas fa-arrow-left text-gray-600"></i>
        </button>
        <span class="font-bold text-gray-800">我的项目</span>
        <button class="text-xs font-semibold text-white bg-gradient-finance px-3 py-1.5 rounded-full shadow-finance tap-effect" onclick="showPage('publish')">
          <i class="fas fa-plus mr-1"></i>发布新项目
        </button>
      </header>

      <div class="flex-1 overflow-auto no-scrollbar bg-gray-50 pb-6">
        <!-- 统计面板 -->
        <div class="p-4 bg-white border-b border-gray-100">
          <div class="grid grid-cols-3 gap-3">
            <div class="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-center">
              <p class="text-2xl font-bold text-primary">${active.length}</p>
              <p class="text-xs text-gray-500 mt-1">进行中</p>
            </div>
            <div class="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl text-center">
              <p class="text-2xl font-bold text-success">${completed.length}</p>
              <p class="text-xs text-gray-500 mt-1">已完成</p>
            </div>
            <div class="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl text-center">
              <p class="text-2xl font-bold text-gray-400">${draft.length}</p>
              <p class="text-xs text-gray-500 mt-1">草稿</p>
            </div>
          </div>
        </div>

        <!-- 筛选 Tab -->
        <div class="px-4 pt-4 pb-2 flex items-center gap-2">
          <button class="mp-tab px-3 py-1.5 text-xs font-bold rounded-full bg-primary text-white" onclick="filterMyProjects('all', this)">全部 (${myProjectsMock.length})</button>
          <button class="mp-tab px-3 py-1.5 text-xs font-bold rounded-full bg-gray-100 text-gray-500" onclick="filterMyProjects('active', this)">进行中 (${active.length})</button>
          <button class="mp-tab px-3 py-1.5 text-xs font-bold rounded-full bg-gray-100 text-gray-500" onclick="filterMyProjects('completed', this)">已完成 (${completed.length})</button>
          <button class="mp-tab px-3 py-1.5 text-xs font-bold rounded-full bg-gray-100 text-gray-500" onclick="filterMyProjects('draft', this)">草稿 (${draft.length})</button>
        </div>

        <!-- 项目列表 -->
        <div id="my-projects-list" class="px-4 pt-2">
          ${myProjectsMock.map(p => renderCard(p)).join('')}
        </div>

        <!-- 空状态提示 -->
        <div id="mp-empty" class="hidden px-4 py-16 text-center">
          <div class="text-5xl mb-4">📂</div>
          <p class="text-gray-400 text-sm">该分类下暂无项目</p>
        </div>
      </div>
    </div>
  `;
}

// 我的项目页 — Tab 筛选
function filterMyProjects(status, btn) {
  // 切换 Tab 样式
  document.querySelectorAll('.mp-tab').forEach(t => {
    t.className = 'mp-tab px-3 py-1.5 text-xs font-bold rounded-full bg-gray-100 text-gray-500';
  });
  btn.className = 'mp-tab px-3 py-1.5 text-xs font-bold rounded-full bg-primary text-white';

  const list = document.getElementById('my-projects-list');
  const cards = list.querySelectorAll(':scope > div');
  let visibleCount = 0;

  myProjectsMock.forEach((p, i) => {
    const show = (status === 'all' || p.status === status);
    cards[i].style.display = show ? '' : 'none';
    if (show) visibleCount++;
  });

  document.getElementById('mp-empty').classList.toggle('hidden', visibleCount > 0);
}

function renderPublishPage() {
  return `
    <!-- 发布项目页 -->
    <div id="page-publish" class="page h-screen">
      <header class="glass-effect px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <button class="p-2 -ml-2 tap-effect" onclick="showPage('home')">
          <i class="fas fa-times text-gray-600 text-xl"></i>
        </button>
        <span class="font-bold text-gray-800">发布融资项目</span>
        <button class="text-primary font-semibold text-sm tap-effect" onclick="showToast('📝 草稿已保存')">保存</button>
      </header>
      
      <div class="flex-1 overflow-auto no-scrollbar p-4">
        <!-- 步骤指示器 -->
        <div class="flex items-center justify-center gap-2 mb-6">
          <div class="w-10 h-10 bg-gradient-finance text-white rounded-full flex items-center justify-center text-sm font-bold shadow-finance">1</div>
          <div class="w-16 h-1 bg-gray-200 rounded"></div>
          <div class="w-10 h-10 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-sm font-bold">2</div>
          <div class="w-16 h-1 bg-gray-200 rounded"></div>
          <div class="w-10 h-10 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-sm font-bold">3</div>
        </div>
        <p class="text-center text-sm text-gray-500 mb-6 font-medium">第 1 步：基本信息</p>
        
        <!-- 表单 -->
        <div class="space-y-4">
          ${renderFormInput('项目名称', 'text', '请输入项目名称', true)}
          ${renderFormSelect('所属行业', ['人工智能', '医疗健康', '新能源', '新消费', '企业服务', '金融科技', '教育科技', '物联网', '其他'], true)}
          ${renderFormButtons('融资轮次', ['种子轮', '天使轮', 'Pre-A', 'A轮', 'B轮及以上'])}
          ${renderFormInput('融资目标（万元）', 'number', '请输入融资金额', true)}
          ${renderFormTextarea('项目简介', '请简要描述您的项目（50-200字）', true)}
          ${renderFormInput('所在城市', 'text', '例如：北京、上海、深圳')}
        </div>
      </div>
      
      <!-- 底部按钮 -->
      <div class="p-4 bg-white border-t border-gray-100 nav-shadow">
        <button class="w-full py-4 bg-gradient-finance text-white rounded-xl font-bold tap-effect shadow-finance" onclick="showToast('✅ 已保存，进入下一步'); showPage('profile')">
          下一步：团队信息 <i class="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  `;
}

function renderFormInput(label, type, placeholder, required = false) {
  return `
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2">
        ${label} ${required ? '<span class="text-error">*</span>' : ''}
      </label>
      <input type="${type}" placeholder="${placeholder}" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors">
    </div>
  `;
}

function renderFormSelect(label, options, required = false) {
  return `
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2">
        ${label} ${required ? '<span class="text-error">*</span>' : ''}
      </label>
      <select class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary bg-white transition-colors">
        <option value="">请选择${label}</option>
        ${options.map(opt => `<option>${opt}</option>`).join('')}
      </select>
    </div>
  `;
}

function renderFormButtons(label, options) {
  return `
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2">
        ${label} <span class="text-error">*</span>
      </label>
      <div class="flex flex-wrap gap-2">
        ${options.map((opt, i) => `
          <button class="px-4 py-2 border-2 ${i === 2 ? 'border-primary text-primary' : 'border-gray-200 text-gray-600'} rounded-full text-sm tap-effect hover:border-primary hover:text-primary transition-colors font-medium">
            ${opt}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function renderFormTextarea(label, placeholder, required = false) {
  return `
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2">
        ${label} ${required ? '<span class="text-error">*</span>' : ''}
      </label>
      <textarea placeholder="${placeholder}" rows="4" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary resize-none transition-colors"></textarea>
    </div>
  `;
}

function renderBottomNav(activePage) {
  const navItems = [
    { id: 'home', icon: 'home', label: '发现' },
    { id: 'deal-lab', icon: 'dice', label: '造局', emoji: '🎰' },
    { id: 'publish', icon: 'plus', label: '发布', isCenter: true },
    { id: 'radar', icon: 'satellite-dish', label: '雷达', emoji: '📡' },
    { id: 'profile', icon: 'user', label: '我的' }
  ];

  return `
    <nav class="bg-white border-t border-gray-100 px-2 py-2 flex justify-around items-end sticky bottom-0 nav-shadow">
      ${navItems.map(item => {
        if (item.isCenter) {
          return `
            <button class="flex flex-col items-center -mt-4 tap-effect" onclick="showPage('${item.id}')">
              <div class="w-16 h-16 bg-gradient-finance rounded-full flex items-center justify-center shadow-finance">
                <i class="fas fa-${item.icon} text-white text-2xl"></i>
              </div>
              <span class="text-xs mt-1 text-gray-500 font-medium">${item.label}</span>
            </button>
          `;
        }
        const isActive = item.id === activePage;
        return `
          <button class="flex flex-col items-center py-1 px-3 ${isActive ? 'text-primary' : 'text-gray-400'} tap-effect relative" onclick="showPage('${item.id}')">
            <i class="fas fa-${item.icon} text-xl"></i>
            <span class="text-xs mt-1 font-medium">${item.label}</span>
            ${item.hasBadge ? '<span class="absolute top-1 right-2 w-2.5 h-2.5 bg-error rounded-full badge-pulse"></span>' : ''}
          </button>
        `;
      }).join('')}
    </nav>
  `;
}

function renderToast() {
  return `
    <div id="toast" class="fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 bg-gray-800 text-white rounded-full text-sm shadow-lg hidden z-50 toast backdrop-blur-sm">
      <span id="toast-text"></span>
    </div>
  `;
}

function renderFilterPanel() {
  return `
    <!-- 筛选遮罩层 -->
    <div id="filter-overlay" class="fixed inset-0 bg-black/50 z-40 hidden" onclick="closeFilter()"></div>

    <!-- 筛选面板（底部抽屉） -->
    <div id="filter-panel" class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 transform translate-y-full transition-transform duration-300 max-w-[428px] mx-auto flex flex-col" style="max-height: 92vh;">

      <!-- 拖拽指示条 -->
      <div class="flex justify-center pt-3 pb-1 flex-shrink-0">
        <div class="w-10 h-1 bg-gray-200 rounded-full"></div>
      </div>

      <!-- 面板头部 -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <button class="text-sm font-medium text-gray-500 tap-effect px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors" onclick="confirmResetFilter()">重置</button>
        <div class="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F2557" stroke-width="2"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/><circle cx="5" cy="5" r="1.5" fill="#0F2557"/><circle cx="5" cy="12" r="1.5" fill="#0F2557"/><circle cx="5" cy="19" r="1.5" fill="#0F2557"/></svg>
          <span class="font-bold text-gray-800 text-base">筛选项目</span>
        </div>
        <button class="text-sm font-semibold text-primary tap-effect px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors" onclick="closeFilter()">完成</button>
      </div>

      <!-- 可滚动内容区 -->
      <div class="flex-1 overflow-y-auto no-scrollbar">

        <!-- ① AI 搜索框区域 -->
        <div class="px-4 pt-4 pb-3 border-b border-gray-100">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs text-gray-500 font-medium">用一句话描述你想找的项目</span>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-blue-50 text-primary tracking-wide">AI</span>
          </div>
          <div class="flex gap-2 items-stretch bg-white border-2 border-gray-200 rounded-xl p-1.5 transition-all focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]">
            <input
              type="text"
              id="filter-ai-input"
              placeholder="例如：医疗健康、A 轮、北京"
              class="flex-1 min-w-0 px-3 py-2 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              autocomplete="off"
            />
            <div class="flex gap-1">
              <button type="button" class="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors tap-effect" title="语音输入" onclick="showToast('🎤 语音输入开发中')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>
              </button>
              <button type="button" id="filter-ai-send" class="flex items-center gap-1.5 px-3 py-2 bg-gradient-finance text-white text-sm font-medium rounded-lg shadow-sm tap-effect transition-all" onclick="filterAiParse()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                <span class="hidden sm:inline">解析</span>
              </button>
            </div>
          </div>
          <!-- 示例问句 -->
          <div class="flex flex-wrap gap-2 mt-2.5">
            <span class="text-xs text-gray-400 self-center">示例：</span>
            <button class="filter-example-chip px-3 py-1 rounded-full text-xs text-gray-500 bg-white border border-gray-200 tap-effect hover:border-primary hover:text-primary transition-colors" data-query="医疗健康 A 轮 北京">医疗健康 A 轮 北京</button>
            <button class="filter-example-chip px-3 py-1 rounded-full text-xs text-gray-500 bg-white border border-gray-200 tap-effect hover:border-primary hover:text-primary transition-colors" data-query="新能源 5000万以上 深圳">新能源 5000万以上 深圳</button>
            <button class="filter-example-chip px-3 py-1 rounded-full text-xs text-gray-500 bg-white border border-gray-200 tap-effect hover:border-primary hover:text-primary transition-colors" data-query="企业服务 Pre-A 上海">企业服务 Pre-A 上海</button>
          </div>
        </div>

        <!-- ② AI 解析出的条件 Chips -->
        <div id="filter-parsed-section" class="px-4 py-3 border-b border-gray-100 min-h-[52px]">
          <div id="filter-parsed-chips" class="flex flex-wrap gap-2"></div>
          <p id="filter-parsed-empty" class="text-xs text-gray-400 py-1">输入描述或点击示例，AI 将解析为条件标签；也可手动选择下方选项。</p>
          <p id="filter-parsed-zero" class="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 hidden">未识别到条件，换个说法试试？或手动展开选择。</p>
        </div>

        <!-- ③ 展开/收起全部筛选 -->
        <div class="px-4 py-2 border-b border-gray-100">
          <button id="filter-expand-btn" class="flex items-center gap-2 text-sm font-medium text-primary py-2 tap-effect rounded-lg hover:bg-blue-50 px-2 transition-colors w-full" onclick="toggleFilterExpand()">
            <svg id="filter-expand-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform duration-200"><path d="M6 9l6 6 6-6"/></svg>
            展开全部筛选条件
          </button>
        </div>

        <!-- ④ 全部筛选条件（可折叠） -->
        <div id="filter-all-panel" class="hidden px-4 py-4 space-y-5">

          <!-- 行业领域 -->
          <div>
            <div class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/><path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/></svg>
              行业领域
            </div>
            <div class="flex flex-wrap gap-2" id="filter-industry-tags"></div>
          </div>

          <!-- 融资阶段 -->
          <div>
            <div class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 16v-5M12 16v-3M17 16V8"/></svg>
              融资阶段
            </div>
            <div class="flex flex-wrap gap-2" id="filter-stage-tags"></div>
          </div>

          <!-- 融资金额 -->
          <div>
            <div class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              融资金额
            </div>
            <div class="flex flex-wrap gap-2" id="filter-amount-tags"></div>
          </div>

          <!-- 项目地区 -->
          <div>
            <div class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              项目地区
            </div>
            <div class="flex flex-wrap gap-2" id="filter-location-tags"></div>
          </div>

          <!-- 最低匹配度 -->
          <div>
            <div class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              最低匹配度
            </div>
            <div class="px-1">
              <div class="flex justify-between text-xs text-gray-400 mb-2">
                <span>不限</span>
                <span id="filter-match-value" class="text-primary font-bold">60%</span>
              </div>
              <input type="range" id="filter-match" min="0" max="100" value="60"
                class="w-full h-2 rounded-full appearance-none cursor-pointer"
                style="background: linear-gradient(to right, #1E40AF 60%, #E5E7EB 60%)"
                oninput="onFilterMatchInput(this)">
            </div>
          </div>

          <!-- 排序方式 -->
          <div>
            <div class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M3 6h18M7 12h10M11 18h2"/></svg>
              排序方式
            </div>
            <div class="flex flex-wrap gap-2" id="filter-sort-tags">
              ${renderSortButton('match', '匹配度优先', true)}
              ${renderSortButton('latest', '最新发布')}
              ${renderSortButton('hot', '热度最高')}
              ${renderSortButton('amount-asc', '金额从低到高')}
              ${renderSortButton('amount-desc', '金额从高到低')}
            </div>
          </div>

        </div>
      </div>

      <!-- 底部固定操作栏 -->
      <div class="flex-shrink-0 px-4 py-3 bg-white border-t border-gray-100 flex items-center gap-3">
        <button class="flex-1 py-3.5 bg-gradient-finance text-white rounded-xl font-bold tap-effect flex items-center justify-center gap-2 shadow-finance transition-all" onclick="applyFilter()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          应用筛选
        </button>
        <span id="filter-count" class="text-xs text-gray-400 whitespace-nowrap font-medium">未选条件</span>
      </div>

    </div>

    <!-- 重置确认弹窗 -->
    <div id="filter-reset-confirm" class="fixed inset-0 bg-black/40 z-[60] hidden items-center justify-center p-4" onclick="if(event.target===this) closeResetConfirm()">
      <div class="bg-white rounded-2xl p-6 w-full max-w-[280px] shadow-xl">
        <p class="text-sm text-gray-700 mb-5">确定清空所有筛选条件？</p>
        <div class="flex gap-3 justify-end">
          <button class="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg tap-effect hover:bg-gray-50" onclick="closeResetConfirm()">取消</button>
          <button class="px-4 py-2 text-sm text-white bg-gray-800 rounded-lg tap-effect hover:bg-gray-900" onclick="resetFilter()">清空</button>
        </div>
      </div>
    </div>
  `;
}

function renderSortButton(value, label, active = false) {
  return `
    <button class="filter-tag ${active ? 'active border-primary bg-primary/10 text-primary' : 'border-gray-200'} px-4 py-2 border-2 rounded-full text-sm tap-effect font-medium" data-value="${value}" onclick="selectSortTag(this)">
      ${label}
    </button>
  `;
}

// ==================== 页面交互函数 ====================
function initializeEventListeners() {
  // 这里可以添加额外的事件监听器
}

// ==================== 视频播放控制 ====================
function toggleVideo(projectId) {
  const video = document.getElementById('video-' + projectId);
  const overlay = document.getElementById('video-overlay-' + projectId);
  const playBtn = document.getElementById('play-btn-' + projectId);

  if (!video) return;

  if (video.paused) {
    // 暂停所有其他视频
    document.querySelectorAll('video').forEach(v => {
      if (v !== video && !v.paused) {
        v.pause();
        const id = v.id.replace('video-', '');
        const otherOverlay = document.getElementById('video-overlay-' + id);
        const otherBtn = document.getElementById('play-btn-' + id);
        if (otherOverlay) otherOverlay.style.background = 'rgba(0,0,0,0.2)';
        if (otherBtn) otherBtn.innerHTML = '<i class="fas fa-play text-primary text-xl pl-1"></i>';
      }
    });

    video.play();
    // 隐藏遮罩，显示暂停按钮（半透明）
    overlay.style.background = 'rgba(0,0,0,0)';
    playBtn.innerHTML = '<i class="fas fa-pause text-primary text-xl"></i>';
    playBtn.style.opacity = '0';

    // 鼠标悬停时显示暂停按钮
    overlay.addEventListener('mouseenter', showPauseHint);
    overlay.addEventListener('mouseleave', hidePauseHint);

    // 视频结束时恢复封面
    video.onended = function() {
      overlay.style.background = 'rgba(0,0,0,0.2)';
      playBtn.innerHTML = '<i class="fas fa-play text-primary text-xl pl-1"></i>';
      playBtn.style.opacity = '1';
      overlay.removeEventListener('mouseenter', showPauseHint);
      overlay.removeEventListener('mouseleave', hidePauseHint);
    };
  } else {
    video.pause();
    overlay.style.background = 'rgba(0,0,0,0.2)';
    playBtn.innerHTML = '<i class="fas fa-play text-primary text-xl pl-1"></i>';
    playBtn.style.opacity = '1';
    overlay.removeEventListener('mouseenter', showPauseHint);
    overlay.removeEventListener('mouseleave', hidePauseHint);
  }

  function showPauseHint() {
    playBtn.style.opacity = '0.85';
  }
  function hidePauseHint() {
    const v = document.getElementById('video-' + projectId);
    if (v && !v.paused) playBtn.style.opacity = '0';
  }
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
}

function showDetail(cardId) {
  const project = projectsData.find(p => p.id === cardId);
  if (project) {
    document.getElementById('detail-content').innerHTML = renderProjectDetail(project);
  }
  showPage('detail');
}

function skipCard(cardId) {
  const card = document.getElementById('card-' + cardId);
  card.classList.add('slide-out');
  
  setTimeout(() => {
    card.style.display = 'none';
    card.classList.remove('slide-out');
    showNextCard();
  }, 500);
}

function showInterest(cardId) {
  showToast('✓ 投资意向已发送');
  
  setTimeout(() => {
    skipCard(cardId);
  }, 600);
}

function showInterestFromDetail() {
  showToast('✓ 投资意向已发送');
  setTimeout(() => {
    showPage('home');
  }, 1000);
}

function showNextCard() {
  currentCard++;
  if (currentCard <= totalCards) {
    const nextCard = document.getElementById('card-' + currentCard);
    if (nextCard) {
      nextCard.style.display = 'flex';
    }
  } else {
    document.getElementById('no-more-cards').style.display = 'flex';
  }
}

function resetCards() {
  currentCard = 1;
  document.getElementById('no-more-cards').style.display = 'none';
  for (let i = 1; i <= totalCards; i++) {
    const card = document.getElementById('card-' + i);
    if (card) {
      card.style.display = i === 1 ? 'flex' : 'none';
    }
  }
}

function toggleFavorite() {
  isFavorite = !isFavorite;
  const icon = document.getElementById('favorite-icon');
  if (isFavorite) {
    icon.classList.remove('far');
    icon.classList.add('fas', 'text-error');
    icon.classList.remove('text-gray-400');
    showToast('❤️ 已添加到收藏');
  } else {
    icon.classList.remove('fas', 'text-error');
    icon.classList.add('far', 'text-gray-400');
    showToast('已取消收藏');
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  toastText.textContent = message;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2000);
}

// ==================== 筛选功能 ====================

// 筛选选项数据
const FILTER_OPTIONS = {
  industry: ['医疗健康', '人工智能', '新能源', '新消费', '企业服务', '金融科技', '教育科技', '物联网', '硬科技'],
  stage:    ['种子轮', '天使轮', 'Pre-A', 'A轮', 'B轮', 'C轮及以上'],
  amount:   ['500万以下', '500-2000万', '2000-5000万', '5000万-1亿', '1亿以上'],
  location: ['北京', '上海', '深圳', '广州', '杭州', '成都', '其他城市']
};

// 筛选全局状态
let filterState = {
  chips: [],          // AI 解析/手动选出的 {type, label} 列表
  industry: [],
  stage: [],
  amount: [],
  location: [],
  matchPercent: 60,
  sort: 'match',
  lastParseZero: false,
  justParsed: false
};

// ---------- 开关面板 ----------
function openFilter() {
  document.getElementById('filter-overlay').classList.remove('hidden');
  const panel = document.getElementById('filter-panel');
  panel.style.transform = 'translateY(0)';
  document.body.style.overflow = 'hidden';
  // 渲染标签组
  renderAllFilterTags();
  renderFilterChips();
  updateFilterCount();
}

function closeFilter() {
  const panel = document.getElementById('filter-panel');
  panel.style.transform = 'translateY(100%)';
  setTimeout(() => {
    document.getElementById('filter-overlay').classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

// ---------- 展开/收起全部筛选 ----------
function toggleFilterExpand() {
  const allPanel = document.getElementById('filter-all-panel');
  const icon = document.getElementById('filter-expand-icon');
  const btn  = document.getElementById('filter-expand-btn');
  const isOpen = !allPanel.classList.contains('hidden');
  if (isOpen) {
    allPanel.classList.add('hidden');
    allPanel.classList.remove('visible');
    icon.classList.remove('rotated');
    btn.querySelector('span') && (btn.querySelectorAll('span')[0] || btn).textContent;
    // 更新文字
    btn.innerHTML = `
      <svg id="filter-expand-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform duration-200"><path d="M6 9l6 6 6-6"/></svg>
      展开全部筛选条件
    `;
  } else {
    allPanel.classList.remove('hidden');
    allPanel.classList.add('visible');
    btn.innerHTML = `
      <svg id="filter-expand-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform duration-200 rotated" style="transform:rotate(180deg)"><path d="M6 9l6 6 6-6"/></svg>
      收起筛选条件
    `;
  }
}

// ---------- 渲染各组 Tag ----------
function renderAllFilterTags() {
  renderTagGroup('filter-industry-tags', 'industry');
  renderTagGroup('filter-stage-tags',    'stage');
  renderTagGroup('filter-amount-tags',   'amount');
  renderTagGroup('filter-location-tags', 'location');
  // 绑定示例问句点击
  document.querySelectorAll('.filter-example-chip').forEach(btn => {
    btn.onclick = () => {
      const input = document.getElementById('filter-ai-input');
      if (input) input.value = btn.dataset.query || '';
      filterAiParse();
    };
  });
  // 绑定 AI input 回车
  const aiInput = document.getElementById('filter-ai-input');
  if (aiInput && !aiInput.dataset.bound) {
    aiInput.dataset.bound = '1';
    aiInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); filterAiParse(); } });
  }
  // 渲染滑块
  const slider = document.getElementById('filter-match');
  if (slider) {
    slider.value = filterState.matchPercent;
    updateSliderBg(slider);
  }
  const matchVal = document.getElementById('filter-match-value');
  if (matchVal) matchVal.textContent = filterState.matchPercent === 0 ? '不限' : filterState.matchPercent + '%';
}

function renderTagGroup(containerId, stateKey) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  FILTER_OPTIONS[stateKey].forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-new-tag' + (filterState[stateKey].includes(opt) ? ' selected' : '');
    btn.textContent = opt;
    btn.onclick = () => {
      const idx = filterState[stateKey].indexOf(opt);
      if (idx === -1) filterState[stateKey].push(opt);
      else filterState[stateKey].splice(idx, 1);
      syncChipsFromManual();
      renderTagGroup(containerId, stateKey);
      renderFilterChips();
      updateFilterCount();
    };
    container.appendChild(btn);
  });
}

// ---------- 滑块实时更新 ----------
function onFilterMatchInput(slider) {
  filterState.matchPercent = parseInt(slider.value, 10);
  const val = document.getElementById('filter-match-value');
  if (val) val.textContent = filterState.matchPercent === 0 ? '不限' : filterState.matchPercent + '%';
  updateSliderBg(slider);
  syncChipsFromManual();
  renderFilterChips();
  updateFilterCount();
}

function updateSliderBg(slider) {
  const pct = slider.value + '%';
  slider.style.background = `linear-gradient(to right, #1E40AF ${pct}, #E5E7EB ${pct})`;
}

// ---------- AI 解析 ----------
function filterAiParse() {
  const input   = document.getElementById('filter-ai-input');
  const sendBtn = document.getElementById('filter-ai-send');
  const query   = (input && input.value) ? input.value.trim() : '';
  if (!query) return;

  if (sendBtn) { sendBtn.classList.add('loading'); sendBtn.disabled = true; }
  if (input)   input.disabled = true;

  // 模拟 AI 解析延迟
  setTimeout(() => {
    const chips = mockFilterParse(query);
    filterState.chips = chips;
    filterState.lastParseZero = chips.length === 0;
    filterState.justParsed = chips.length > 0;
    applyChipsToManual();
    renderAllFilterTags();
    renderFilterChips();
    updateFilterCount();

    if (sendBtn) { sendBtn.classList.remove('loading'); sendBtn.disabled = false; }
    if (input)   input.disabled = false;

    // 未识别到则自动展开手动选项
    if (filterState.lastParseZero) {
      const allPanel = document.getElementById('filter-all-panel');
      if (allPanel && allPanel.classList.contains('hidden')) toggleFilterExpand();
    }
  }, 420);
}

// 模拟解析逻辑（实际对接 AI API）
function mockFilterParse(query) {
  const chips = [];
  const text  = query.toLowerCase();
  FILTER_OPTIONS.industry.forEach(v => { if (text.includes(v.toLowerCase())) chips.push({ type: 'industry', label: v }); });
  FILTER_OPTIONS.stage.forEach(v   => { if (text.includes(v.toLowerCase())) chips.push({ type: 'stage', label: v }); });
  FILTER_OPTIONS.amount.forEach(v  => { if (text.includes(v.replace(/\s/g, '').toLowerCase()) || (text.includes('5000') && text.includes('万'))) chips.push({ type: 'amount', label: v }); });
  FILTER_OPTIONS.location.forEach(v => { if (text.includes(v)) chips.push({ type: 'location', label: v }); });
  const matchReg = text.match(/(\d+)\s*%/);
  if (matchReg) chips.push({ type: 'match', label: '最低匹配度 ' + matchReg[1] + '%' });
  else if (chips.length) chips.push({ type: 'match', label: '最低匹配度 60%' });
  return chips;
}

// ---------- Chips <-> 手动状态同步 ----------
function syncChipsFromManual() {
  const list = [];
  filterState.industry.forEach(v  => list.push({ type: 'industry', label: v }));
  filterState.stage.forEach(v     => list.push({ type: 'stage', label: v }));
  filterState.amount.forEach(v    => list.push({ type: 'amount', label: v }));
  filterState.location.forEach(v  => list.push({ type: 'location', label: v }));
  if (filterState.matchPercent > 0) list.push({ type: 'match', label: '最低匹配度 ' + filterState.matchPercent + '%' });
  filterState.chips = list;
}

function applyChipsToManual() {
  filterState.industry  = filterState.chips.filter(c => c.type === 'industry').map(c => c.label);
  filterState.stage     = filterState.chips.filter(c => c.type === 'stage').map(c => c.label);
  filterState.amount    = filterState.chips.filter(c => c.type === 'amount').map(c => c.label);
  filterState.location  = filterState.chips.filter(c => c.type === 'location').map(c => c.label);
  const m = filterState.chips.find(c => c.type === 'match');
  filterState.matchPercent = m ? parseInt(m.label.replace(/\D/g, ''), 10) : 0;
}

// ---------- 渲染 Chips ----------
function renderFilterChips() {
  const wrap      = document.getElementById('filter-parsed-chips');
  const emptyEl   = document.getElementById('filter-parsed-empty');
  const zeroEl    = document.getElementById('filter-parsed-zero');
  if (!wrap) return;

  wrap.innerHTML = '';

  if (filterState.chips.length === 0) {
    if (emptyEl) emptyEl.classList.remove('hidden');
    if (zeroEl)  zeroEl.classList.toggle('hidden', !filterState.lastParseZero);
    return;
  }

  if (emptyEl) emptyEl.classList.add('hidden');
  if (zeroEl)  zeroEl.classList.add('hidden');

  filterState.chips.forEach((c, i) => {
    const chip = document.createElement('span');
    chip.className = 'filter-chip' + (filterState.justParsed ? ' highlight' : '');
    chip.innerHTML = `<span>${escapeHtml(c.label)}</span><button type="button" class="chip-remove" data-index="${i}">×</button>`;
    wrap.appendChild(chip);
  });

  if (filterState.justParsed) {
    filterState.justParsed = false;
    setTimeout(() => wrap.querySelectorAll('.filter-chip.highlight').forEach(el => el.classList.remove('highlight')), 1200);
  }

  wrap.querySelectorAll('.chip-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index, 10);
      filterState.chips.splice(idx, 1);
      applyChipsToManual();
      renderAllFilterTags();
      renderFilterChips();
      updateFilterCount();
    });
  });
}

// ---------- 条件计数 ----------
function updateFilterCount() {
  const n  = filterState.chips.length;
  const el = document.getElementById('filter-count');
  if (el) el.textContent = n === 0 ? '未选条件' : '已选 ' + n + ' 个条件';

  // 更新顶部筛选按钮徽章
  const badge = document.getElementById('filter-badge');
  if (badge) {
    if (n > 0) {
      badge.textContent = n;
      badge.classList.remove('hidden');
      badge.classList.add('flex');
    } else {
      badge.classList.add('hidden');
      badge.classList.remove('flex');
    }
  }
}

// ---------- 重置 ----------
function confirmResetFilter() {
  const confirm = document.getElementById('filter-reset-confirm');
  if (confirm) confirm.classList.add('show');
}

function closeResetConfirm() {
  const confirm = document.getElementById('filter-reset-confirm');
  if (confirm) confirm.classList.remove('show');
}

function resetFilter() {
  filterState.chips = [];
  filterState.industry = [];
  filterState.stage = [];
  filterState.amount = [];
  filterState.location = [];
  filterState.matchPercent = 0;
  filterState.sort = 'match';
  filterState.lastParseZero = false;

  const input = document.getElementById('filter-ai-input');
  if (input) input.value = '';
  const slider = document.getElementById('filter-match');
  if (slider) { slider.value = 0; updateSliderBg(slider); }
  const matchVal = document.getElementById('filter-match-value');
  if (matchVal) matchVal.textContent = '不限';

  closeResetConfirm();
  renderAllFilterTags();
  renderFilterChips();
  updateFilterCount();
  showToast('已重置筛选条件');
}

// ---------- 应用筛选 ----------
function applyFilter() {
  const n = filterState.chips.length;
  closeFilter();
  showToast(n > 0 ? `✓ 已应用 ${n} 个筛选条件` : '✓ 显示所有项目');
  resetCards();
}

// ---------- 旧函数兼容（排序按钮） ----------
function toggleFilterTag(el) {
  el.classList.toggle('active');
  updateFilterCount();
}

function selectSortTag(el) {
  const parent = el.closest('#filter-sort-tags');
  if (!parent) return;
  parent.querySelectorAll('.filter-tag').forEach(tag => {
    tag.classList.remove('active', 'border-primary', 'bg-primary/10', 'text-primary');
    tag.classList.add('border-gray-200');
  });
  el.classList.add('active', 'border-primary', 'bg-primary/10', 'text-primary');
  el.classList.remove('border-gray-200');
  filterState.sort = el.dataset.value;
}

function updateMatchLabel(value) {
  // 兼容旧版调用
  const label = document.getElementById('match-label');
  if (label) label.textContent = value == 0 ? '不限' : value + '%';
}

function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

// ==================== 估值计算器 ====================
let valuationState = {
  loading: false,
  result: null,
  formData: {},
  attachments: []   // { name, size, type, dataUrl, textContent }
};

function renderValuationPage() {
  return `
    <!-- 估值计算器页面 -->
    <div id="page-valuation" class="page h-screen bg-gray-50">

      <!-- 顶部栏 — 与主站一致的 glass-effect -->
      <header class="glass-effect px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <button class="p-2 -ml-2 tap-effect" onclick="showPage('home')">
          <i class="fas fa-arrow-left text-gray-600 text-xl"></i>
        </button>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-gradient-finance text-white shadow-sm">HSR</span>
          <span class="font-semibold text-gray-800">资产健康度评估</span>
        </div>
        <div class="w-8"></div>
      </header>

      <!-- 可滚动主体 -->
      <div class="flex-1 overflow-auto no-scrollbar pb-6">

        <!-- 渐变描述条 — 与首页 AI推荐条一致 -->
        <div class="px-4 py-3 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
          <div class="flex items-center gap-2">
            <span class="text-lg">🔬</span>
            <span class="text-sm font-semibold gradient-text">HSR 估值引擎</span>
            <span class="text-xs text-gray-400">六维体检 · 基因分型 · 造局定价</span>
          </div>
        </div>

        <!-- 表单区域 -->
        <div id="val-form-section" class="p-4">
          <div class="bg-white rounded-2xl shadow-finance border border-gray-100 p-4">

            <h2 class="font-bold text-gray-800 text-base mb-1 flex items-center gap-2">
              <i class="fas fa-edit text-primary"></i>
              企业数据输入
            </h2>
            <p class="text-xs text-gray-400 mb-4">至少填一组收入+成本，字段填得越多，AI 分析师给的诊断越精准</p>

            <!-- 基础信息 -->
            <div class="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">企业名称</label>
                <input type="text" id="val-name" placeholder="如：张三麻辣烫" class="val-input">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">行业</label>
                <select id="val-industry" class="val-input">
                  <option value="">选择行业</option>
                  <option value="餐饮">餐饮</option>
                  <option value="零售">零售</option>
                  <option value="教育">教育</option>
                  <option value="医疗健康">医疗健康</option>
                  <option value="美容美发">美容美发</option>
                  <option value="物流">物流</option>
                  <option value="制造业">制造业</option>
                  <option value="科技/SaaS">科技/SaaS</option>
                  <option value="新消费">新消费</option>
                  <option value="新能源">新能源</option>
                  <option value="服务业">服务业</option>
                  <option value="其他">其他</option>
                </select>
              </div>
            </div>

            <!-- 核心数据 -->
            <div class="flex items-center gap-2 mb-3">
              <i class="fas fa-database text-primary text-sm"></i>
              <span class="text-xs font-semibold text-gray-700">核心数据（必填其一组）</span>
            </div>
            <div class="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">年收入（元）</label>
                <input type="number" id="val-revenue" placeholder="如 1200000" class="val-input">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">年成本（元）</label>
                <input type="number" id="val-cost" placeholder="如 800000" class="val-input">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">日流水（元）</label>
                <input type="number" id="val-daily-flow" placeholder="如 8500" class="val-input">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">日成本（元）</label>
                <input type="number" id="val-daily-cost" placeholder="如 5000" class="val-input">
              </div>
            </div>

            <!-- 推荐补充 -->
            <div class="flex items-center gap-2 mb-3">
              <i class="fas fa-lightbulb text-accent text-sm"></i>
              <span class="text-xs font-semibold text-gray-700">推荐补充</span>
            </div>
            <div class="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">净利润（元/年）</label>
                <input type="number" id="val-net-profit" placeholder="可选" class="val-input">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">退款率</label>
                <input type="number" id="val-refund-rate" step="0.01" placeholder="如 0.01" class="val-input">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">增长率</label>
                <input type="number" id="val-growth-rate" step="0.01" placeholder="如 0.1" class="val-input">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">周转天数</label>
                <input type="number" id="val-turnover-days" placeholder="如 7" class="val-input">
              </div>
            </div>

            <!-- 更多字段（可展开） -->
            <details class="mb-4">
              <summary class="text-xs text-gray-500 cursor-pointer hover:text-primary transition-colors flex items-center gap-1.5 py-2">
                <i class="fas fa-chevron-right text-xs val-details-arrow"></i>
                <i class="fas fa-cog text-xs"></i>
                更多字段（可选）
              </summary>
              <div class="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-100">
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1.5">负债率</label>
                  <input type="number" id="val-debt-ratio" step="0.01" placeholder="如 0.3" class="val-input">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1.5">员工人数</label>
                  <input type="number" id="val-employee-count" placeholder="如 8" class="val-input">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1.5">经营年限</label>
                  <input type="number" id="val-operating-years" step="0.5" placeholder="如 3" class="val-input">
                </div>
              </div>
            </details>

            <!-- 辅助材料上传 -->
            <div class="flex items-center gap-2 mb-3">
              <i class="fas fa-paperclip text-primary text-sm"></i>
              <span class="text-xs font-semibold text-gray-700">辅助材料（可选）</span>
              <span class="text-xs text-gray-400">上传后 AI 将结合数据深度分析</span>
            </div>
            <div id="val-upload-zone"
                 class="mb-4 border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer transition-all hover:border-primary/50 hover:bg-primary/5"
                 onclick="document.getElementById('val-file-input').click()"
                 ondragover="event.preventDefault(); this.classList.add('border-primary','bg-primary/5');"
                 ondragleave="this.classList.remove('border-primary','bg-primary/5');"
                 ondrop="handleFileDrop(event)">
              <input type="file" id="val-file-input" class="hidden" multiple
                     accept=".pdf,.csv,.xls,.xlsx,.doc,.docx,.png,.jpg,.jpeg,.txt,.json"
                     onchange="handleFileSelect(event)">
              <div class="flex flex-col items-center gap-2 py-2">
                <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <i class="fas fa-cloud-upload-alt text-gray-400 text-lg"></i>
                </div>
                <p class="text-xs text-gray-500">点击或拖拽上传财务报表、银行流水等</p>
                <p class="text-xs text-gray-400">支持 PDF / Excel / CSV / 图片 / Word，单文件≤5MB，最多5个</p>
              </div>
            </div>
            <!-- 文件列表 -->
            <div id="val-file-list" class="mb-4 space-y-2 hidden"></div>

            <!-- 提交按钮 — 与主站按钮风格一致 -->
            <button id="val-submit-btn" class="w-full py-3.5 bg-gradient-finance text-white rounded-xl font-bold text-sm tap-effect shadow-finance flex items-center justify-center gap-2" onclick="submitValuation()">
              <i class="fas fa-calculator"></i>
              <span>启动六维体检</span>
            </button>
          </div>
        </div>

        <!-- 加载态 -->
        <div id="val-loading" class="px-4 mt-2 hidden">
          <div class="bg-white rounded-2xl shadow-finance border border-gray-100 p-8 text-center">
            <div class="val-loading-spinner mx-auto mb-4"></div>
            <p class="text-gray-800 font-semibold text-sm mb-1">AI 数学分析师正在做六维体检...</p>
            <p class="text-gray-400 text-xs" id="val-loading-text">引擎启动 · 扫描盈利模型</p>
          </div>
        </div>

        <!-- 结果区域 -->
        <div id="val-result" class="hidden"></div>

      </div>
    </div>
  `;
}

// ==================== 文件上传处理 ====================
const MAX_FILE_SIZE = 5 * 1024 * 1024;  // 5MB
const MAX_FILE_COUNT = 5;
const ALLOWED_TYPES = [
  'application/pdf', 'text/csv', 'text/plain', 'application/json',
  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png', 'image/jpeg', 'image/jpg'
];

function handleFileDrop(e) {
  e.preventDefault();
  var zone = document.getElementById('val-upload-zone');
  if (zone) { zone.classList.remove('border-primary', 'bg-primary/5'); }
  var files = e.dataTransfer ? e.dataTransfer.files : [];
  processFiles(files);
}

function handleFileSelect(e) {
  var files = e.target ? e.target.files : [];
  processFiles(files);
  // 清空 input 以允许重复选同一文件
  if (e.target) e.target.value = '';
}

function processFiles(files) {
  if (!files || files.length === 0) return;

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    // 数量限制
    if (valuationState.attachments.length >= MAX_FILE_COUNT) {
      showToast('最多上传 ' + MAX_FILE_COUNT + ' 个文件');
      break;
    }
    // 大小限制
    if (file.size > MAX_FILE_SIZE) {
      showToast(file.name + ' 超过 5MB 限制');
      continue;
    }
    // 重名检查
    var exists = valuationState.attachments.some(function(a) { return a.name === file.name; });
    if (exists) {
      showToast(file.name + ' 已添加');
      continue;
    }

    readAndStoreFile(file);
  }
}

function readAndStoreFile(file) {
  var reader = new FileReader();
  var isText = /text|csv|json|plain/.test(file.type) || /\.(csv|txt|json)$/i.test(file.name);

  reader.onload = function(e) {
    var attachment = {
      name: file.name,
      size: file.size,
      type: file.type || guessFileType(file.name),
      dataUrl: null,
      textContent: null
    };

    if (isText) {
      // 文本文件：存原始文本以供 LLM 分析
      attachment.textContent = e.target.result;
      // 同时读 dataUrl 用于标识
      var reader2 = new FileReader();
      reader2.onload = function(e2) {
        attachment.dataUrl = e2.target.result;
        valuationState.attachments.push(attachment);
        renderFileList();
      };
      reader2.readAsDataURL(file);
    } else {
      // 二进制文件：存 base64 dataUrl
      attachment.dataUrl = e.target.result;
      valuationState.attachments.push(attachment);
      renderFileList();
    }
  };

  if (isText) {
    reader.readAsText(file);
  } else {
    reader.readAsDataURL(file);
  }
}

function guessFileType(name) {
  var ext = name.split('.').pop().toLowerCase();
  var map = { pdf: 'application/pdf', csv: 'text/csv', txt: 'text/plain', json: 'application/json', xls: 'application/vnd.ms-excel', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg' };
  return map[ext] || 'application/octet-stream';
}

function removeAttachment(idx) {
  valuationState.attachments.splice(idx, 1);
  renderFileList();
}

function renderFileList() {
  var list = document.getElementById('val-file-list');
  if (!list) return;

  if (valuationState.attachments.length === 0) {
    list.classList.add('hidden');
    list.innerHTML = '';
    // 恢复上传区默认态
    var zone = document.getElementById('val-upload-zone');
    if (zone) {
      zone.querySelector('.flex.flex-col').innerHTML =
        '<div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">' +
        '<i class="fas fa-cloud-upload-alt text-gray-400 text-lg"></i></div>' +
        '<p class="text-xs text-gray-500">点击或拖拽上传财务报表、银行流水等</p>' +
        '<p class="text-xs text-gray-400">支持 PDF / Excel / CSV / 图片 / Word，单文件≤5MB，最多5个</p>';
    }
    return;
  }

  list.classList.remove('hidden');
  var html = '';
  valuationState.attachments.forEach(function(a, idx) {
    var icon = getFileIcon(a.type, a.name);
    var sizeStr = a.size < 1024 ? a.size + 'B' : a.size < 1048576 ? (a.size / 1024).toFixed(1) + 'KB' : (a.size / 1048576).toFixed(1) + 'MB';
    var isImage = /^image\//.test(a.type);
    var preview = isImage && a.dataUrl
      ? '<img src="' + a.dataUrl + '" class="w-8 h-8 rounded object-cover flex-shrink-0" />'
      : '<div class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center flex-shrink-0"><i class="' + icon + ' text-sm text-gray-500"></i></div>';

    html += '<div class="flex items-center gap-2.5 bg-white rounded-xl border border-gray-100 px-3 py-2 shadow-sm">' +
      preview +
      '<div class="flex-1 min-w-0">' +
      '<p class="text-xs font-medium text-gray-700 truncate">' + escapeHtml(a.name) + '</p>' +
      '<p class="text-xs text-gray-400">' + sizeStr + '</p>' +
      '</div>' +
      '<button class="p-1.5 text-gray-300 hover:text-red-400 transition-colors tap-effect" onclick="removeAttachment(' + idx + ')" title="移除">' +
      '<i class="fas fa-times text-xs"></i></button>' +
      '</div>';
  });
  list.innerHTML = html;

  // 更新上传区文案
  var zone = document.getElementById('val-upload-zone');
  if (zone) {
    var remaining = MAX_FILE_COUNT - valuationState.attachments.length;
    zone.querySelector('.flex.flex-col').innerHTML =
      '<div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">' +
      '<i class="fas fa-plus text-primary text-sm"></i></div>' +
      '<p class="text-xs text-gray-500">已添加 ' + valuationState.attachments.length + ' 个文件' +
      (remaining > 0 ? '，还可添加 ' + remaining + ' 个' : '（已达上限）') + '</p>';
  }
}

function getFileIcon(type, name) {
  if (/pdf/i.test(type)) return 'fas fa-file-pdf text-red-400';
  if (/excel|spreadsheet|csv/i.test(type) || /\.(xls|xlsx|csv)$/i.test(name)) return 'fas fa-file-excel text-green-500';
  if (/word|document/i.test(type) || /\.(doc|docx)$/i.test(name)) return 'fas fa-file-word text-blue-500';
  if (/image/i.test(type)) return 'fas fa-file-image text-purple-400';
  if (/json/i.test(type) || /text/i.test(type)) return 'fas fa-file-alt text-gray-400';
  return 'fas fa-file text-gray-400';
}

// ==================== 估值提交 ====================
function submitValuation() {
  const name = (document.getElementById('val-name') || {}).value || '';
  const industry = (document.getElementById('val-industry') || {}).value || '';
  const revenue = parseFloat((document.getElementById('val-revenue') || {}).value) || 0;
  const cost = parseFloat((document.getElementById('val-cost') || {}).value) || 0;
  const dailyFlow = parseFloat((document.getElementById('val-daily-flow') || {}).value) || 0;
  const dailyCost = parseFloat((document.getElementById('val-daily-cost') || {}).value) || 0;
  const netProfit = parseFloat((document.getElementById('val-net-profit') || {}).value) || 0;
  const refundRate = parseFloat((document.getElementById('val-refund-rate') || {}).value) || 0;
  const growthRate = parseFloat((document.getElementById('val-growth-rate') || {}).value) || 0;
  const turnoverDays = parseFloat((document.getElementById('val-turnover-days') || {}).value) || 0;
  const debtRatio = parseFloat((document.getElementById('val-debt-ratio') || {}).value) || 0;
  const employeeCount = parseInt((document.getElementById('val-employee-count') || {}).value) || 0;
  const operatingYears = parseFloat((document.getElementById('val-operating-years') || {}).value) || 0;

  // 校验
  if (!revenue && !dailyFlow) {
    showToast('请至少填写年收入或日流水');
    return;
  }
  if (!cost && !dailyCost) {
    showToast('请至少填写年成本或日成本');
    return;
  }

  const formData = { name: name.trim(), industry, revenue, cost, dailyFlow, dailyCost, netProfit, refundRate, growthRate, turnoverDays, debtRatio, employeeCount, operatingYears };

  // 附件数据：传文件名+类型+文本内容（二进制仅传元信息，内容在 LLM 可用时通过 dataUrl 传递）
  var attachments = valuationState.attachments.map(function(a) {
    return {
      name: a.name,
      size: a.size,
      type: a.type,
      textContent: a.textContent || null,
      // 图片类文件传 base64 以便 LLM 识别
      dataUrl: /^image\//.test(a.type) ? a.dataUrl : null
    };
  });
  if (attachments.length > 0) {
    formData.attachments = attachments;
  }

  valuationState.formData = formData;

  // 显示加载态
  document.getElementById('val-loading').classList.remove('hidden');
  document.getElementById('val-result').classList.add('hidden');
  document.getElementById('val-result').innerHTML = '';
  const btn = document.getElementById('val-submit-btn');
  if (btn) { btn.disabled = true; btn.style.opacity = '0.5'; }

  // 加载文案轮播
  const loadingTexts = [
    '引擎启动 · 扫描盈利模型...',
    '六维体检 · 诊断现金流质量...',
    '行业对标 · 校准赛道基准线...',
    '基因分型 · 识别项目DNA...',
    '估值定价 · 计算三档区间...',
    '造局推演 · 输出交易参数...',
    'AI 分析师正在翻译诊断报告...'
  ];
  let textIdx = 0;
  const loadingTimer = setInterval(function() {
    textIdx = (textIdx + 1) % loadingTexts.length;
    var el = document.getElementById('val-loading-text');
    if (el) el.textContent = loadingTexts[textIdx];
  }, 2000);

  // 调用 API
  axios.post('/api/valuation', formData)
    .then(function(res) {
      clearInterval(loadingTimer);
      if (res.data.success) {
        valuationState.result = res.data.result;
        renderValuationResult(res.data.result);
      } else {
        showToast(res.data.error || '分析失败');
        document.getElementById('val-loading').classList.add('hidden');
      }
      var b = document.getElementById('val-submit-btn');
      if (b) { b.disabled = false; b.style.opacity = '1'; }
    })
    .catch(function(err) {
      clearInterval(loadingTimer);
      console.error('Valuation error:', err);
      showToast('网络错误，请重试');
      document.getElementById('val-loading').classList.add('hidden');
      var b = document.getElementById('val-submit-btn');
      if (b) { b.disabled = false; b.style.opacity = '1'; }
    });
}

// ==================== 渲染估值结果 ====================
function renderValuationResult(r) {
  document.getElementById('val-loading').classList.add('hidden');
  var resultEl = document.getElementById('val-result');
  resultEl.classList.remove('hidden');

  // 根据 grade 选色 — 统一使用金融主题色系
  var gradeColors = { S: '#D4AF37', A: '#059669', B: '#1E40AF', C: '#F59E0B', D: '#DC2626' };
  var gradeBgColors = { S: 'from-amber-50 to-yellow-50', A: 'from-emerald-50 to-green-50', B: 'from-blue-50 to-indigo-50', C: 'from-amber-50 to-orange-50', D: 'from-red-50 to-rose-50' };
  var gradeColor = gradeColors[r.grade] || '#059669';
  var gradeBg = gradeBgColors[r.grade] || 'from-emerald-50 to-green-50';
  var scorePct = r.score || 0;

  // 维度数据
  var dims = r.dimensions || {};
  var dimList = [
    { key: 'profitability', label: '盈利能力', icon: 'fa-coins', color: 'text-amber-500' },
    { key: 'cashQuality', label: '现金质量', icon: 'fa-money-bill-wave', color: 'text-emerald-500' },
    { key: 'growthTrend', label: '增长趋势', icon: 'fa-chart-line', color: 'text-blue-500' },
    { key: 'scaleVolume', label: '规模体量', icon: 'fa-building', color: 'text-purple-500' },
    { key: 'operationEfficiency', label: '运营效率', icon: 'fa-cogs', color: 'text-cyan-500' },
    { key: 'debtRisk', label: '借债风险', icon: 'fa-shield-alt', color: 'text-rose-500' }
  ];

  // 构建维度条 HTML — 白色卡片内浅色进度条
  var dimBarsHtml = dimList.map(function(d) {
    var dimData = dims[d.key] || { score: 50, verdict: '' };
    var barGradient = dimData.score >= 80 ? 'from-emerald-400 to-green-500' : dimData.score >= 60 ? 'from-blue-400 to-indigo-500' : dimData.score >= 40 ? 'from-amber-400 to-yellow-500' : 'from-red-400 to-rose-500';
    var scoreColor = dimData.score >= 80 ? 'text-success' : dimData.score >= 60 ? 'text-primary' : dimData.score >= 40 ? 'text-warning' : 'text-error';
    return '<div class="py-2">' +
      '<div class="flex items-center justify-between mb-1.5">' +
        '<span class="text-xs text-gray-600 flex items-center gap-1.5"><i class="fas ' + d.icon + ' ' + d.color + '"></i> ' + d.label + '</span>' +
        '<span class="text-xs font-bold ' + scoreColor + '">' + dimData.score + '</span>' +
      '</div>' +
      '<div class="w-full h-2 rounded-full bg-gray-100 overflow-hidden match-progress">' +
        '<div class="h-full rounded-full bg-gradient-to-r ' + barGradient + ' val-bar-animate" style="width:' + dimData.score + '%;"></div>' +
      '</div>' +
      (dimData.verdict ? '<p class="text-xs text-gray-500 mt-1">' + escapeHtml(dimData.verdict) + '</p>' : '') +
    '</div>';
  }).join('');

  // 维度标签 — 统一浅色标签样式
  var dimTagsHtml = dimList.map(function(d) {
    var s = (dims[d.key] || {}).score || 0;
    var isGood = s >= 60;
    return '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ' +
      (isGood ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200') + '">' +
      (isGood ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-triangle"></i>') + ' ' + d.label + '</span>';
  }).join('');

  // 优势列表 — 统一浅色文字
  var strengthsHtml = (r.report && r.report.strengths ? r.report.strengths : []).map(function(s) {
    return '<div class="flex items-start gap-2"><span class="text-success text-xs mt-0.5 flex-shrink-0"><i class="fas fa-check-circle"></i></span><p class="text-gray-600 text-xs leading-relaxed">' + escapeHtml(s) + '</p></div>';
  }).join('');

  // 风险列表
  var risksHtml = (r.report && r.report.risks ? r.report.risks : []).map(function(s) {
    return '<div class="flex items-start gap-2"><span class="text-error text-xs mt-0.5 flex-shrink-0"><i class="fas fa-exclamation-circle"></i></span><p class="text-gray-600 text-xs leading-relaxed">' + escapeHtml(s) + '</p></div>';
  }).join('');

  // 异常指标 Flag — HSR引力透镜检测
  var anomalies = r.anomalies || [];
  var anomaliesHtml = anomalies.length > 0 ? anomalies.map(function(a) {
    var sevColor = a.severity === 'HIGH' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200';
    var sevIcon = a.severity === 'HIGH' ? '<i class="fas fa-exclamation-circle text-error"></i>' : '<i class="fas fa-exclamation-triangle text-warning"></i>';
    var sevLabel = a.severity === 'HIGH' ? '<span class="text-xs font-bold text-error">高风险</span>' : '<span class="text-xs font-bold text-warning">关注</span>';
    return '<div class="p-3 rounded-xl border ' + sevColor + '">' +
      '<div class="flex items-center justify-between mb-1.5">' +
        '<span class="text-xs font-bold text-gray-800 flex items-center gap-1.5">' + sevIcon + ' ' + escapeHtml(a.field) + '</span>' +
        sevLabel +
      '</div>' +
      '<div class="flex items-center gap-3 text-xs mb-1.5">' +
        '<span class="text-gray-500">实际 <strong class="text-gray-800">' + escapeHtml(a.value) + '</strong></span>' +
        '<span class="text-gray-300">|</span>' +
        '<span class="text-gray-500">同行 <strong class="text-gray-800">' + escapeHtml(a.benchmark) + '</strong></span>' +
        (a.deviation ? '<span class="px-1.5 py-0.5 rounded text-xs font-medium ' + (a.severity === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600') + '">' + escapeHtml(a.deviation) + '</span>' : '') +
      '</div>' +
      '<p class="text-xs text-gray-500">' + escapeHtml(a.impact || '') + '</p>' +
    '</div>';
  }).join('') : '';

  // 结构化行动建议 — 红黄绿
  var actionItems = r.actionItems || [];
  var actionItemsHtml = actionItems.map(function(item) {
    var pColor = item.priority === 'red' ? 'border-l-4 border-l-error bg-red-50/50' :
                 item.priority === 'yellow' ? 'border-l-4 border-l-warning bg-amber-50/50' :
                 'border-l-4 border-l-success bg-emerald-50/50';
    var pIcon = item.priority === 'red' ? '<span class="w-5 h-5 rounded-full bg-error text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">!</span>' :
               item.priority === 'yellow' ? '<span class="w-5 h-5 rounded-full bg-warning text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">→</span>' :
               '<span class="w-5 h-5 rounded-full bg-success text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">✓</span>';
    return '<div class="p-3 rounded-lg ' + pColor + ' flex items-start gap-2.5">' +
      pIcon +
      '<p class="text-xs text-gray-700 leading-relaxed flex-1">' + escapeHtml(item.text) + '</p>' +
    '</div>';
  }).join('');

  // ★ 老板视角 — 一体千面翻译核心
  var ownerView = r.ownerView || {};
  var ownerLines = ownerView.lines || [];
  var ownerViewHtml = ownerLines.map(function(line) {
    var sentimentIcon = line.sentiment === 'positive' ? '<i class="fas fa-arrow-up text-success text-xs"></i>' :
                        line.sentiment === 'negative' ? '<i class="fas fa-arrow-down text-error text-xs"></i>' :
                        '<i class="fas fa-minus text-gray-400 text-xs"></i>';
    var sentimentBg = line.sentiment === 'positive' ? 'bg-emerald-50/70 border-emerald-100' :
                      line.sentiment === 'negative' ? 'bg-red-50/70 border-red-100' :
                      'bg-gray-50/70 border-gray-100';
    return '<div class="p-3 rounded-xl border ' + sentimentBg + '">' +
      '<div class="flex items-center justify-between mb-1">' +
        '<span class="text-xs text-gray-500 font-medium">' + escapeHtml(line.label) + '</span>' +
        '<div class="flex items-center gap-1.5">' + sentimentIcon + '<span class="text-sm font-bold text-gray-800">' + escapeHtml(line.value) + '</span></div>' +
      '</div>' +
      '<p class="text-xs text-gray-500 leading-relaxed">' + escapeHtml(line.note || '') + '</p>' +
    '</div>';
  }).join('');

  // ★ 定价参数
  var pricing = r.pricingInputs || {};
  var pricingHtml = '';
  if (pricing.paybackDays || pricing.priorityRatio) {
    var pricingItems = [];
    if (pricing.regimeTier) pricingItems.push({ label: '风险等级', value: pricing.regimeTier, icon: 'fa-shield-alt' });
    if (pricing.deathProb) pricingItems.push({ label: '违约概率', value: pricing.deathProb + '%', icon: 'fa-exclamation-triangle' });
    if (pricing.paybackDays) pricingItems.push({ label: '预计回本', value: pricing.paybackDays + '天', icon: 'fa-clock' });
    if (pricing.baselineDailyRevenue) pricingItems.push({ label: '基准日流水', value: Math.round(pricing.baselineDailyRevenue).toLocaleString() + '元', icon: 'fa-chart-line' });
    if (pricing.priorityRatio) pricingItems.push({ label: '截留比例', value: pricing.priorityRatio + '%', icon: 'fa-percentage' });
    if (pricing.upsideMultiplier) pricingItems.push({ label: '上浮倍数', value: pricing.upsideMultiplier + 'x', icon: 'fa-arrow-up' });
    if (pricing.monitorFreq) pricingItems.push({ label: '监控频率', value: pricing.monitorFreq, icon: 'fa-eye' });
    if (pricing.circuitBreaker) pricingItems.push({ label: '熔断条件', value: pricing.circuitBreaker, icon: 'fa-bolt' });
    pricingHtml = pricingItems.map(function(p) {
      var isWide = p.label === '熔断条件';
      return '<div class="' + (isWide ? 'col-span-2' : '') + ' p-2.5 rounded-lg bg-gray-50 border border-gray-100">' +
        '<div class="flex items-center gap-1.5 mb-0.5"><i class="fas ' + p.icon + ' text-gray-400 text-xs"></i><span class="text-xs text-gray-400">' + escapeHtml(p.label) + '</span></div>' +
        '<p class="text-xs font-semibold text-gray-700">' + escapeHtml(String(p.value)) + '</p>' +
      '</div>';
    }).join('');
  }

  // ★ 风控视角
  var riskView = r.riskView || {};
  var riskViewHtml = '';
  if ((riskView.requiredDocs && riskView.requiredDocs.length) || (riskView.mitigations && riskView.mitigations.length)) {
    if (riskView.requiredDocs && riskView.requiredDocs.length) {
      riskViewHtml += '<p class="text-xs text-gray-500 font-semibold mb-2 flex items-center gap-1.5"><i class="fas fa-folder-open text-gray-400"></i> 需要补充的材料</p>';
      riskViewHtml += '<div class="space-y-1.5 mb-4">' + riskView.requiredDocs.map(function(doc) {
        return '<div class="flex items-start gap-2 text-xs text-gray-600"><i class="fas fa-file-alt text-gray-300 mt-0.5 flex-shrink-0"></i><span>' + escapeHtml(doc) + '</span></div>';
      }).join('') + '</div>';
    }
    if (riskView.mitigations && riskView.mitigations.length) {
      riskViewHtml += '<p class="text-xs text-gray-500 font-semibold mb-2 flex items-center gap-1.5"><i class="fas fa-gavel text-gray-400"></i> 建议减缓条款</p>';
      riskViewHtml += '<div class="space-y-1.5">' + riskView.mitigations.map(function(m) {
        var mColor = m.priority === 'red' ? 'text-error' : m.priority === 'yellow' ? 'text-warning' : 'text-success';
        var mIcon = m.priority === 'red' ? 'fa-exclamation-circle' : m.priority === 'yellow' ? 'fa-exclamation-triangle' : 'fa-check-circle';
        return '<div class="flex items-start gap-2 text-xs text-gray-600"><i class="fas ' + mIcon + ' ' + mColor + ' mt-0.5 flex-shrink-0"></i><span>' + escapeHtml(m.text) + '</span></div>';
      }).join('') + '</div>';
    }
  }

  // 附件标识
  var attachBadge = '';
  if (r._attachments && r._attachments.length > 0) {
    attachBadge = '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200"><i class="fas fa-paperclip"></i> ' + r._attachments.length + ' 份材料</span>';
  }

  resultEl.innerHTML =
    // 综合评分卡片 — 白色卡片 + 渐变背景
    '<div class="mx-4 mt-4 bg-white rounded-2xl shadow-finance border border-gray-100 overflow-hidden">' +
      '<div class="bg-gradient-to-r ' + gradeBg + ' p-5">' +
        '<div class="flex items-start justify-between">' +
          '<div>' +
            '<div class="flex items-baseline gap-3">' +
              '<span class="text-5xl font-black text-gray-800">' + r.score + '</span>' +
              '<span class="px-3 py-1 rounded-lg text-xs font-bold text-white shadow-sm" style="background:' + gradeColor + ';">' + escapeHtml(r.archetype || '分析中') + '</span>' +
            '</div>' +
            '<p class="text-gray-600 text-xs mt-2">' + escapeHtml(r.archetypeDesc || '') + '</p>' +
            '<p class="text-gray-400 text-xs mt-0.5">' + escapeHtml(r.grade || '') + ' 级评定 ' + attachBadge + '</p>' +
          '</div>' +
          '<div class="relative w-16 h-16 flex-shrink-0">' +
            '<svg class="w-16 h-16" style="transform:rotate(-90deg)" viewBox="0 0 36 36">' +
              '<circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" stroke-width="3"/>' +
              '<circle cx="18" cy="18" r="15" fill="none" stroke="' + gradeColor + '" stroke-width="3" stroke-dasharray="' + (scorePct * 0.942) + ' 100" stroke-linecap="round" class="val-score-ring"/>' +
            '</svg>' +
            '<span class="absolute inset-0 flex items-center justify-center font-bold text-sm" style="color:' + gradeColor + ';">' + escapeHtml(r.grade || '') + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +

    // ★ 老板视角 — 一体千面翻译核心面板
    (ownerViewHtml ? '<div class="mx-4 mt-3 bg-white rounded-2xl shadow-finance border border-gray-100 overflow-hidden">' +
      '<div class="p-4 bg-gradient-to-r from-amber-50/80 to-yellow-50/80 border-b border-amber-100">' +
        '<div class="flex items-center gap-2"><i class="fas fa-user-tie text-accent"></i><span class="text-gray-800 font-bold text-sm">老板，你的项目体检单</span><span class="text-xs text-gray-400 ml-auto">一体千面 · 翻译版</span></div>' +
      '</div>' +
      '<div class="p-4 space-y-3">' + ownerViewHtml + '</div>' +
      (r.ownerView && r.ownerView.valSummary ? '<div class="mx-4 mb-4 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10"><p class="text-gray-800 text-xs font-medium leading-relaxed"><i class="fas fa-coins text-accent mr-1.5"></i>' + escapeHtml(r.ownerView.valSummary) + '</p></div>' : '') +
      (r.ownerView && r.ownerView.typeSummary ? '<div class="mx-4 mb-4 p-3 rounded-xl bg-gray-50 border border-gray-100"><p class="text-gray-700 text-xs leading-relaxed"><i class="fas fa-dna text-purple-400 mr-1.5"></i>' + escapeHtml(r.ownerView.typeSummary) + '</p></div>' : '') +
    '</div>' : '') +

    // 估值参考区间
    '<div class="mx-4 mt-3 bg-white rounded-2xl shadow-finance border border-gray-100 p-5">' +
      '<div class="flex items-center gap-2 mb-3"><i class="fas fa-coins text-accent"></i><span class="text-gray-800 font-bold text-sm">估值参考区间</span></div>' +
      '<div class="grid grid-cols-3 gap-2 mb-3">' +
        '<div class="rounded-xl p-3 text-center bg-gray-50 border border-gray-100"><p class="text-gray-400 text-xs mb-1">保守</p><p class="text-gray-800 font-bold text-lg">' + formatWan(r.valuation && r.valuation.conservative) + '</p></div>' +
        '<div class="rounded-xl p-3 text-center bg-gradient-to-br from-primary/5 to-secondary/10 border border-primary/20"><p class="text-primary text-xs mb-1 font-medium">中性</p><p class="text-gray-800 font-bold text-lg">' + formatWan(r.valuation && r.valuation.neutral) + '</p></div>' +
        '<div class="rounded-xl p-3 text-center bg-gray-50 border border-gray-100"><p class="text-gray-400 text-xs mb-1">乐观</p><p class="text-gray-800 font-bold text-lg">' + formatWan(r.valuation && r.valuation.optimistic) + '</p></div>' +
      '</div>' +
      '<p class="text-gray-400 text-xs">' + escapeHtml((r.valuation && r.valuation.method) || '') + ' · 置信度 ' + ((r.valuation && r.valuation.confidence) || 0) + '%</p>' +
    '</div>' +

    // 六维体检
    '<div class="mx-4 mt-3 bg-white rounded-2xl shadow-finance border border-gray-100 p-5">' +
      '<div class="flex items-center gap-2 mb-4"><i class="fas fa-chart-bar text-primary"></i><span class="text-gray-800 font-bold text-sm">六维体检</span></div>' +
      '<div class="space-y-1 mb-4">' + dimBarsHtml + '</div>' +
      '<div class="flex flex-wrap gap-2 pt-3 border-t border-gray-100">' + dimTagsHtml + '</div>' +
    '</div>' +

    // 异常指标 Flag（只在有异常时显示）
    (anomaliesHtml ? '<div class="mx-4 mt-3 bg-white rounded-2xl shadow-finance border border-gray-100 p-5">' +
      '<div class="flex items-center gap-2 mb-3"><i class="fas fa-radar text-error"></i><span class="text-gray-800 font-bold text-sm">异常指标 <span class="text-xs font-normal text-gray-400 ml-1">引擎检测到偏离行业基准的数据</span></span></div>' +
      '<div class="space-y-2">' + anomaliesHtml + '</div>' +
    '</div>' : '') +

    // 造局参数
    '<div class="mx-4 mt-3 bg-white rounded-2xl shadow-finance border border-gray-100 p-5">' +
      '<div class="flex items-center gap-2 mb-3"><i class="fas fa-bullseye text-accent"></i><span class="text-gray-800 font-bold text-sm">造局参数建议</span></div>' +
      '<div class="space-y-2">' +
        renderDealParam('PE 倍数', r.dealParams && r.dealParams.suggestedPE) +
        renderDealParam('出让比例', r.dealParams && r.dealParams.suggestedStake) +
        renderDealParam('交易结构', r.dealParams && r.dealParams.dealStructure) +
        renderDealParam('关键条件', r.dealParams && r.dealParams.keyCondition) +
      '</div>' +
    '</div>' +

    // ★ 定价参数（实操级）
    (pricingHtml ? '<div class="mx-4 mt-3 bg-white rounded-2xl shadow-finance border border-gray-100 p-5">' +
      '<div class="flex items-center gap-2 mb-3"><i class="fas fa-sliders-h text-secondary"></i><span class="text-gray-800 font-bold text-sm">定价参数</span><span class="text-xs text-gray-400 ml-1">交易实操参考</span></div>' +
      '<div class="grid grid-cols-2 gap-2">' + pricingHtml + '</div>' +
    '</div>' : '') +

    // 评估报告
    '<div class="mx-4 mt-3 bg-white rounded-2xl shadow-finance border border-gray-100 p-5">' +
      '<div class="flex items-center gap-2 mb-3"><i class="fas fa-file-alt text-primary"></i><span class="text-gray-800 font-bold text-sm">评估报告</span></div>' +
      // 一句话总结
      '<div class="p-3 rounded-xl mb-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-primary/10"><p class="text-gray-800 text-sm font-medium leading-relaxed">"' + escapeHtml((r.report && r.report.oneLiner) || '') + '"</p></div>' +
      // 优势
      '<div class="mb-4"><p class="text-xs text-gray-500 font-semibold mb-2 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-success"></span> 核心优势</p><div class="space-y-2">' + strengthsHtml + '</div></div>' +
      // 风险
      '<div class="mb-4"><p class="text-xs text-gray-500 font-semibold mb-2 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-error"></span> 主要风险</p><div class="space-y-2">' + risksHtml + '</div></div>' +
      // 造局建议
      '<div class="mb-4"><p class="text-xs text-gray-500 font-semibold mb-2 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-warning"></span> 造局建议</p><p class="text-gray-600 text-xs leading-relaxed">' + escapeHtml((r.report && r.report.actionPlan) || '') + '</p></div>' +
      // 投资人话术
      '<div class="p-3 rounded-xl bg-gradient-to-r from-accent/5 to-amber-50 border border-accent/20">' +
        '<p class="text-xs text-gray-500 font-semibold mb-2 flex items-center gap-1.5"><i class="fas fa-comment-dollar text-accent"></i> 见投资人这么说</p>' +
        '<p class="text-gray-700 text-xs leading-relaxed italic">"' + escapeHtml((r.report && r.report.investorPitch) || '') + '"</p>' +
      '</div>' +
    '</div>' +

    // ★ 结构化行动建议（红黄绿）
    (actionItemsHtml ? '<div class="mx-4 mt-3 bg-white rounded-2xl shadow-finance border border-gray-100 p-5">' +
      '<div class="flex items-center gap-2 mb-3"><i class="fas fa-tasks text-primary"></i><span class="text-gray-800 font-bold text-sm">行动清单</span><span class="text-xs text-gray-400 ml-1">按优先级排序</span></div>' +
      '<div class="space-y-2">' + actionItemsHtml + '</div>' +
    '</div>' : '') +

    // ★ 风控视角
    (riskViewHtml ? '<div class="mx-4 mt-3 bg-white rounded-2xl shadow-finance border border-gray-100 p-5">' +
      '<div class="flex items-center gap-2 mb-3"><i class="fas fa-shield-alt text-gray-500"></i><span class="text-gray-800 font-bold text-sm">风控清单</span><span class="text-xs text-gray-400 ml-1">尽调补充材料 & 减缓条款</span></div>' +
      riskViewHtml +
    '</div>' : '') +

    // ═══════════════════ 以下为狼视角 + 赌局设计器 + 分账表 + Look-alike ═══════════════════

    // 🐺 狼视角面板
    renderWolfViewSection(r) +

    // 🎰 赌局设计器
    renderDealDesigner(r) +

    // 💸 T+0 分账模拟表（占位，赌局设计器计算后填入）
    '<div id="val-settlement-table" class="mx-4 mt-3 hidden"></div>' +

    // 🔭 Look-alike 雷达
    renderLookAlikeSection(r) +

    // 操作栏 — 三个按钮
    '<div class="mx-4 mt-3 mb-6 flex gap-2">' +
      '<button class="flex-1 py-3 rounded-xl font-semibold text-sm tap-effect flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 shadow-sm card-hover" onclick="resetValuation()"><i class="fas fa-redo text-xs"></i> 重新评估</button>' +
      '<button class="flex-1 py-3 rounded-xl font-semibold text-sm tap-effect flex items-center justify-center gap-2 bg-gradient-finance text-white shadow-finance" onclick="exportValuationReport()"><i class="fas fa-file-export text-xs"></i> 导出报告</button>' +
      '<button class="flex-1 py-3 rounded-xl font-semibold text-sm tap-effect flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-gold" onclick="exportDealPlan()"><i class="fas fa-scroll text-xs"></i> 导出方案</button>' +
    '</div>';

  // 滚动到结果区域
  setTimeout(function() {
    var container = document.getElementById('page-valuation').querySelector('.overflow-auto');
    if (container) container.scrollTo({ top: container.scrollHeight * 0.25, behavior: 'smooth' });
  }, 200);
}

// ==================== 🐺 狼视角面板 ====================
function renderWolfViewSection(r) {
  var wv = r.wolfView;
  if (!wv) return '';
  var d = wv.defaults || {};

  var verdictBg = (r.dimensions && r.dimensions.profitability && r.dimensions.profitability.score > 60)
    ? 'from-emerald-50 to-green-50 border-emerald-200' : 'from-red-50 to-orange-50 border-red-200';

  return '<div class="mx-4 mt-3 bg-white rounded-2xl shadow-finance border border-gray-100 overflow-hidden">' +
    '<div class="p-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">' +
      '<div class="flex items-center gap-2"><span class="text-lg">🐺</span><span class="text-white font-bold text-sm">狼视角 — 这个盘口值不值得做</span><span class="text-xs text-gray-400 ml-auto">资金端操盘手专用</span></div>' +
    '</div>' +
    '<div class="p-4 space-y-3">' +
      // 核心判断
      '<div class="p-3 rounded-xl bg-gradient-to-r ' + verdictBg + ' border">' +
        '<p class="text-xs font-bold text-gray-700 mb-1"><i class="fas fa-crosshairs mr-1"></i>核心判断</p>' +
        '<p class="text-gray-800 text-xs leading-relaxed">' + escapeHtml(wv.verdict || '') + '</p>' +
      '</div>' +
      // 最优结构
      '<div class="p-3 rounded-xl bg-blue-50/70 border border-blue-100">' +
        '<p class="text-xs font-bold text-gray-700 mb-1"><i class="fas fa-chess mr-1"></i>推荐结构</p>' +
        '<p class="text-gray-800 text-xs leading-relaxed">' + escapeHtml(wv.bestStructure || '') + '</p>' +
      '</div>' +
      // 三栏数据
      '<div class="grid grid-cols-3 gap-2">' +
        '<div class="text-center p-2.5 rounded-xl bg-gray-50 border border-gray-100">' +
          '<p class="text-xs text-gray-400 mb-0.5">杠杆比</p>' +
          '<p class="text-sm font-bold text-gray-800">' + escapeHtml(d.leverageRatio || '-') + '</p>' +
        '</div>' +
        '<div class="text-center p-2.5 rounded-xl bg-gray-50 border border-gray-100">' +
          '<p class="text-xs text-gray-400 mb-0.5">安全垫</p>' +
          '<p class="text-sm font-bold text-gray-800">' + (d.safetyMargin || 0) + '%</p>' +
        '</div>' +
        '<div class="text-center p-2.5 rounded-xl bg-gray-50 border border-gray-100">' +
          '<p class="text-xs text-gray-400 mb-0.5">预估IRR</p>' +
          '<p class="text-sm font-bold ' + (d.estIRR > 30 ? 'text-success' : 'text-gray-800') + '">' + (d.estIRR || 0) + '%</p>' +
        '</div>' +
      '</div>' +
      // 风险偏好
      '<div class="p-3 rounded-xl bg-amber-50/70 border border-amber-100">' +
        '<p class="text-xs font-bold text-gray-700 mb-1"><i class="fas fa-tachometer-alt mr-1"></i>风险偏好</p>' +
        '<p class="text-gray-800 text-xs leading-relaxed">' + escapeHtml(wv.riskAppetite || '') + '</p>' +
      '</div>' +
      // 熔断开关
      '<div class="p-3 rounded-xl bg-red-50/70 border border-red-100">' +
        '<p class="text-xs font-bold text-gray-700 mb-1"><i class="fas fa-power-off mr-1"></i>熔断开关</p>' +
        '<p class="text-gray-800 text-xs leading-relaxed">' + escapeHtml(wv.killSwitch || '') + '</p>' +
      '</div>' +
      // 复制提示
      '<div class="p-3 rounded-xl bg-purple-50/70 border border-purple-100">' +
        '<p class="text-xs font-bold text-gray-700 mb-1"><i class="fas fa-copy mr-1"></i>复制提示</p>' +
        '<p class="text-gray-800 text-xs leading-relaxed">' + escapeHtml(wv.copyHint || '') + '</p>' +
      '</div>' +
    '</div>' +
  '</div>';
}

// ==================== 🎰 赌局设计器（动态非对称定价计算器） ====================
function renderDealDesigner(r) {
  var wv = r.wolfView || {};
  var d = wv.defaults || {};
  var baseDaily = (r.pricingInputs && r.pricingInputs.baselineDailyRevenue) || 5000;
  var pm = 0;
  if (r.dimensions && r.dimensions.profitability) {
    // 从 ownerView 或直接算
    pm = valuationState.formData ? ((valuationState.formData.revenue || 0) - (valuationState.formData.cost || 0)) / Math.max(1, valuationState.formData.revenue || 1) * 100 : 15;
  }

  return '<div class="mx-4 mt-3 bg-white rounded-2xl shadow-finance border border-gray-100 overflow-hidden">' +
    '<div class="p-4 bg-gradient-to-r from-amber-500 to-orange-500 border-b">' +
      '<div class="flex items-center gap-2"><span class="text-lg">🎰</span><span class="text-white font-bold text-sm">造局设计器 — 设计你的赌局</span></div>' +
      '<p class="text-amber-100 text-xs mt-1">拖动滑块设计交易结构，实时查看收益场景</p>' +
    '</div>' +
    '<div class="p-4 space-y-4" id="deal-designer-body">' +
      // 隐藏参数
      '<input type="hidden" id="dd-base-daily" value="' + baseDaily + '">' +
      '<input type="hidden" id="dd-base-pm" value="' + pm.toFixed(1) + '">' +
      '<input type="hidden" id="dd-growth-rate" value="' + ((valuationState.formData && valuationState.formData.growthRate) || 0) + '">' +

      // 滑块1: 劣后资金
      renderSlider('dd-wolf', '我出多少（劣后）', d.wolfCapital || 20, 5, 200, '万', 5) +
      // 滑块2: 优先资金
      renderSlider('dd-senior', '拉多少优先资金', d.seniorCapital || 80, 0, 500, '万', 10) +
      // 滑块3: 优先保底回报
      renderSlider('dd-senior-ret', '优先方保底年化', d.seniorReturn || 12, 6, 24, '%', 1) +
      // 滑块4: 超额分成
      renderSlider('dd-wolf-share', '超额利润我分', d.wolfShare || 92, 50, 98, '%', 1) +
      // 滑块5: 截留比例
      renderSlider('dd-retain', '日流水截留', d.dailyRetainPct || 15, 5, 40, '%', 1) +
      // 滑块6: 熔断线
      renderSlider('dd-circuit', '月营收跌多少熔断', d.circuitBreakerPct || 40, 20, 60, '%', 5) +

      // 实时结果区
      '<div id="dd-result" class="mt-2">' + calcDealDesigner() + '</div>' +
    '</div>' +
  '</div>';
}

function renderSlider(id, label, defaultVal, min, max, unit, step) {
  return '<div>' +
    '<div class="flex justify-between items-center mb-1.5">' +
      '<span class="text-xs font-semibold text-gray-600">' + label + '</span>' +
      '<span class="text-xs font-bold text-primary" id="' + id + '-val">' + defaultVal + unit + '</span>' +
    '</div>' +
    '<input type="range" id="' + id + '" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" ' +
      'min="' + min + '" max="' + max + '" value="' + defaultVal + '" step="' + step + '" ' +
      'oninput="document.getElementById(\'' + id + '-val\').textContent=this.value+\'' + unit + '\'; updateDealDesigner()">' +
  '</div>';
}

function updateDealDesigner() {
  var el = document.getElementById('dd-result');
  if (el) el.innerHTML = calcDealDesigner();
  // 同时更新分账表
  updateSettlementTable();
}

function calcDealDesigner() {
  var wolf = parseFloat((document.getElementById('dd-wolf') || {}).value) || 20;
  var senior = parseFloat((document.getElementById('dd-senior') || {}).value) || 80;
  var seniorRet = parseFloat((document.getElementById('dd-senior-ret') || {}).value) || 12;
  var wolfShare = parseFloat((document.getElementById('dd-wolf-share') || {}).value) || 92;
  var retain = parseFloat((document.getElementById('dd-retain') || {}).value) || 15;
  var circuit = parseFloat((document.getElementById('dd-circuit') || {}).value) || 40;
  var baseDaily = parseFloat((document.getElementById('dd-base-daily') || {}).value) || 5000;
  var pm = parseFloat((document.getElementById('dd-base-pm') || {}).value) || 15;
  var growthRate = parseFloat((document.getElementById('dd-growth-rate') || {}).value) || 0;

  var total = wolf + senior;
  var leverage = wolf > 0 ? (total / wolf).toFixed(1) : '∞';
  var safety = total > 0 ? Math.round(senior / total * 100) : 0;

  // 三档场景
  var scenarios = [
    { label: '保守', factor: 0.7, color: 'text-gray-600', bg: 'bg-gray-50' },
    { label: '中性', factor: 1.0, color: 'text-primary', bg: 'bg-primary/5' },
    { label: '乐观', factor: 1.3, color: 'text-success', bg: 'bg-emerald-50' }
  ];

  var scenarioCards = scenarios.map(function(s) {
    var adjDaily = baseDaily * s.factor;
    var monthRetain = adjDaily * (retain / 100) * 30;
    var seniorTotal = senior * 10000 * (1 + seniorRet / 100);
    var monthsToPay = monthRetain > 0 ? Math.ceil(seniorTotal / monthRetain) : 99;
    var paybackDays = Math.min(monthsToPay * 30, 999);
    var remainMonths = Math.max(0, 12 - monthsToPay);
    var monthlyProfit = adjDaily * (pm / 100) * 30 / 10000;
    var wolfProfit = monthlyProfit * remainMonths * (wolfShare / 100);
    var irr = wolf > 0 ? Math.round(wolfProfit / wolf * 100) : 0;

    return '<div class="rounded-xl p-3 text-center ' + s.bg + ' border border-gray-100">' +
      '<p class="text-xs text-gray-400 mb-1 font-medium">' + s.label + '</p>' +
      '<p class="text-lg font-black ' + s.color + '">' + irr + '%</p>' +
      '<p class="text-xs text-gray-500">IRR</p>' +
      '<p class="text-xs font-bold text-gray-700 mt-1">' + paybackDays + '天</p>' +
      '<p class="text-xs text-gray-400">回本</p>' +
    '</div>';
  }).join('');

  // 极端风险场景
  var extremeDaily = baseDaily * 0.5;
  var extremeRetain = extremeDaily * (retain / 100) * 30;
  var extremeSenior = senior * 10000 * (1 + seniorRet / 100);
  var extremeMonths = extremeRetain > 0 ? Math.ceil(extremeSenior / extremeRetain) : 99;

  return '<div class="space-y-3">' +
    // 核心指标栏
    '<div class="grid grid-cols-3 gap-2">' +
      '<div class="text-center p-2.5 rounded-xl bg-gray-900 text-white">' +
        '<p class="text-xs text-gray-400 mb-0.5">总盘口</p>' +
        '<p class="text-sm font-bold">' + total + '万</p>' +
      '</div>' +
      '<div class="text-center p-2.5 rounded-xl bg-gray-900 text-white">' +
        '<p class="text-xs text-gray-400 mb-0.5">杠杆</p>' +
        '<p class="text-sm font-bold">' + leverage + 'x</p>' +
      '</div>' +
      '<div class="text-center p-2.5 rounded-xl bg-gray-900 text-white">' +
        '<p class="text-xs text-gray-400 mb-0.5">安全垫</p>' +
        '<p class="text-sm font-bold">' + safety + '%</p>' +
      '</div>' +
    '</div>' +
    // 三档场景
    '<div class="grid grid-cols-3 gap-2">' + scenarioCards + '</div>' +
    // 风险提示
    '<div class="p-2.5 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2">' +
      '<i class="fas fa-exclamation-triangle text-error text-xs mt-0.5 flex-shrink-0"></i>' +
      '<p class="text-xs text-gray-600">极端风险：若月流水跌50%，回本延至 <strong class="text-error">' + (extremeMonths * 30) + '天</strong>' +
      (extremeMonths > 12 ? ' <span class="text-error font-bold">（超过1年，存在本金损失风险）</span>' : '') + '</p>' +
    '</div>' +
    // 分账规则说明
    '<div class="p-2.5 rounded-xl bg-gray-50 border border-gray-100">' +
      '<p class="text-xs text-gray-500 leading-relaxed">' +
        '<strong>分账规则：</strong>阶段一（还本期）日流水×' + retain + '%截留 → 优先还本付息；' +
        '阶段二（分利期）超额利润 <strong class="text-primary">' + wolfShare + '%</strong> 归操盘方，' + (100 - wolfShare) + '% 归优先方。' +
        '熔断线：月营收连续2月下降超' + circuit + '%触发回购。' +
      '</p>' +
    '</div>' +
    // 展开分账表按钮
    '<button class="w-full py-2.5 rounded-xl text-xs font-semibold text-primary bg-primary/5 border border-primary/20 tap-effect flex items-center justify-center gap-1.5" onclick="toggleSettlementTable()">' +
      '<i class="fas fa-table"></i> 查看逐月分账模拟表' +
    '</button>' +
  '</div>';
}

// ==================== 💸 T+0 分账模拟表 ====================
function toggleSettlementTable() {
  var el = document.getElementById('val-settlement-table');
  if (!el) return;
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
    updateSettlementTable();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    el.classList.add('hidden');
  }
}

function updateSettlementTable() {
  var el = document.getElementById('val-settlement-table');
  if (!el || el.classList.contains('hidden')) return;

  var wolf = parseFloat((document.getElementById('dd-wolf') || {}).value) || 20;
  var senior = parseFloat((document.getElementById('dd-senior') || {}).value) || 80;
  var seniorRet = parseFloat((document.getElementById('dd-senior-ret') || {}).value) || 12;
  var wolfShare = parseFloat((document.getElementById('dd-wolf-share') || {}).value) || 92;
  var retain = parseFloat((document.getElementById('dd-retain') || {}).value) || 15;
  var baseDaily = parseFloat((document.getElementById('dd-base-daily') || {}).value) || 5000;
  var pm = parseFloat((document.getElementById('dd-base-pm') || {}).value) || 15;
  var growthRate = parseFloat((document.getElementById('dd-growth-rate') || {}).value) || 0;

  var seniorRemain = senior * 10000 * (1 + seniorRet / 100); // 优先待回收
  var cumPaid = 0;
  var wolfTotal = 0;
  var seniorEarned = 0;
  var paybackMonth = 0;
  var rows = '';

  for (var m = 1; m <= 12; m++) {
    // 每月日均流水：基准 × (1 + 月增长) + 小幅波动
    var monthGrowth = 1 + (growthRate / 12) * m;
    var jitter = 0.95 + Math.sin(m * 1.7) * 0.05; // 模拟波动
    var dailyFlow = Math.round(baseDaily * monthGrowth * jitter);
    var monthRetain = Math.round(dailyFlow * (retain / 100) * 30);
    var monthProfit = Math.round(dailyFlow * (pm / 100) * 30);

    var toPay = 0;
    var excess = 0;
    var wolfGet = 0;
    var seniorGet = 0;
    var highlight = '';

    if (seniorRemain > 0) {
      // 还本期
      toPay = Math.min(monthRetain, seniorRemain);
      seniorRemain -= toPay;
      cumPaid += toPay;
      seniorGet = toPay;
      if (seniorRemain <= 0 && paybackMonth === 0) {
        paybackMonth = m;
        highlight = ' class="bg-emerald-50 font-semibold"';
      }
    } else {
      // 分利期
      excess = Math.max(0, monthProfit);
      wolfGet = Math.round(excess * wolfShare / 100);
      seniorGet = excess - wolfGet;
      wolfTotal += wolfGet;
      seniorEarned += seniorGet;
    }

    rows += '<tr' + highlight + '>' +
      '<td class="px-2 py-1.5 text-center">' + m + '</td>' +
      '<td class="px-2 py-1.5 text-right">' + (dailyFlow / 1000).toFixed(1) + 'K</td>' +
      '<td class="px-2 py-1.5 text-right">' + (monthRetain / 10000).toFixed(2) + '万</td>' +
      '<td class="px-2 py-1.5 text-right">' + (seniorRemain > 0 ? (seniorRemain / 10000).toFixed(1) + '万' : '<span class="text-success">已清</span>') + '</td>' +
      '<td class="px-2 py-1.5 text-right">' + (excess > 0 ? (excess / 10000).toFixed(2) + '万' : '—') + '</td>' +
      '<td class="px-2 py-1.5 text-right font-bold ' + (wolfGet > 0 ? 'text-success' : '') + '">' + (wolfGet > 0 ? (wolfGet / 10000).toFixed(2) + '万' : '—') + '</td>' +
    '</tr>';
  }

  var wolfIRR = wolf > 0 ? Math.round(wolfTotal / 10000 / wolf * 100) : 0;

  el.innerHTML = '<div class="bg-white rounded-2xl shadow-finance border border-gray-100 overflow-hidden">' +
    '<div class="p-4 bg-gradient-to-r from-gray-800 to-gray-700">' +
      '<div class="flex items-center gap-2"><span class="text-lg">💸</span><span class="text-white font-bold text-sm">T+0 分账模拟（逐月）</span></div>' +
    '</div>' +
    '<div class="overflow-x-auto">' +
      '<table class="w-full text-xs">' +
        '<thead><tr class="bg-gray-50 text-gray-500">' +
          '<th class="px-2 py-2 text-center font-semibold">月</th>' +
          '<th class="px-2 py-2 text-right font-semibold">日均流水</th>' +
          '<th class="px-2 py-2 text-right font-semibold">月截留</th>' +
          '<th class="px-2 py-2 text-right font-semibold">优先剩余</th>' +
          '<th class="px-2 py-2 text-right font-semibold">超额利润</th>' +
          '<th class="px-2 py-2 text-right font-semibold">🐺 狼分得</th>' +
        '</tr></thead>' +
        '<tbody class="divide-y divide-gray-50">' + rows + '</tbody>' +
      '</table>' +
    '</div>' +
    '<div class="p-4 bg-gray-50 border-t border-gray-100">' +
      '<div class="grid grid-cols-3 gap-3 text-center">' +
        '<div><p class="text-xs text-gray-400">狼投入</p><p class="text-sm font-bold text-gray-800">' + wolf + '万</p></div>' +
        '<div><p class="text-xs text-gray-400">12月净赚</p><p class="text-sm font-bold text-success">' + (wolfTotal / 10000).toFixed(1) + '万</p></div>' +
        '<div><p class="text-xs text-gray-400">年化IRR</p><p class="text-sm font-bold ' + (wolfIRR > 30 ? 'text-success' : 'text-gray-800') + '">' + wolfIRR + '%</p></div>' +
      '</div>' +
      (paybackMonth > 0 ? '<p class="text-xs text-gray-500 text-center mt-2"><i class="fas fa-check-circle text-success mr-1"></i>第 ' + paybackMonth + ' 个月优先方本息回收完毕，之后超额利润 ' + wolfShare + '% 归狼</p>' :
        '<p class="text-xs text-error text-center mt-2"><i class="fas fa-exclamation-circle mr-1"></i>12个月内优先方本息未回收完毕，需延长周期或调整参数</p>') +
    '</div>' +
  '</div>';
}

// ==================== 🔭 Look-alike 跨行业雷达 ====================
function renderLookAlikeSection(r) {
  var items = r.lookAlike;
  if (!items || items.length === 0) return '';

  var cardsHtml = items.map(function(p, i) {
    var simColor = p.similarity >= 85 ? 'text-success bg-emerald-50 border-emerald-200' : p.similarity >= 70 ? 'text-primary bg-blue-50 border-blue-200' : 'text-gray-600 bg-gray-50 border-gray-200';
    return '<div class="p-3 rounded-xl bg-white border border-gray-100 shadow-sm">' +
      '<div class="flex items-center justify-between mb-2">' +
        '<div class="flex items-center gap-2">' +
          '<span class="text-xl">' + (p.icon || '🏢') + '</span>' +
          '<div>' +
            '<p class="text-xs font-bold text-gray-800">' + escapeHtml(p.name) + '</p>' +
            '<p class="text-xs text-gray-400">' + escapeHtml(p.industry) + '</p>' +
          '</div>' +
        '</div>' +
        '<span class="px-2 py-0.5 rounded-full text-xs font-bold border ' + simColor + '">' + p.similarity + '%</span>' +
      '</div>' +
      '<div class="grid grid-cols-3 gap-1.5 text-center">' +
        '<div class="p-1.5 rounded bg-gray-50"><p class="text-xs text-gray-400">日流水</p><p class="text-xs font-bold text-gray-700">' + p.dailyFlowK + 'K</p></div>' +
        '<div class="p-1.5 rounded bg-gray-50"><p class="text-xs text-gray-400">利润率</p><p class="text-xs font-bold text-gray-700">' + p.pm + '%</p></div>' +
        '<div class="p-1.5 rounded bg-gray-50"><p class="text-xs text-gray-400">月营收</p><p class="text-xs font-bold text-gray-700">' + p.monthlyRev + '万</p></div>' +
      '</div>' +
      '<button class="w-full mt-2 py-2 rounded-lg text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 tap-effect" onclick="showToast(\'✅ 已套用当前赌局模板到「' + escapeHtml(p.name) + '」\')">' +
        '<i class="fas fa-copy mr-1"></i>一键套用赌局模板' +
      '</button>' +
    '</div>';
  }).join('');

  return '<div class="mx-4 mt-3 bg-white rounded-2xl shadow-finance border border-gray-100 overflow-hidden">' +
    '<div class="p-4 bg-gradient-to-r from-purple-600 to-indigo-600">' +
      '<div class="flex items-center gap-2"><span class="text-lg">🔭</span><span class="text-white font-bold text-sm">Look-alike 雷达 — 找到下一个猎物</span></div>' +
      '<p class="text-purple-200 text-xs mt-1">基于 P=MV 模型跨行业匹配物理特征相似的项目</p>' +
    '</div>' +
    '<div class="p-4 space-y-3">' + cardsHtml + '</div>' +
    '<div class="px-4 pb-4"><p class="text-xs text-gray-400 text-center"><i class="fas fa-satellite-dish mr-1"></i>覆盖 12 个行业 · 基于六维指纹自动匹配</p></div>' +
  '</div>';
}

// ==================== 📜 赌局方案导出（一页纸） ====================
function exportDealPlan() {
  if (!valuationState.result) { showToast('请先完成估值分析'); return; }
  var r = valuationState.result;
  var fd = valuationState.formData || {};
  var wv = r.wolfView || {};
  var wd = wv.defaults || {};

  // 从设计器读当前参数
  var wolf = parseFloat((document.getElementById('dd-wolf') || {}).value) || wd.wolfCapital || 20;
  var senior = parseFloat((document.getElementById('dd-senior') || {}).value) || wd.seniorCapital || 80;
  var seniorRet = parseFloat((document.getElementById('dd-senior-ret') || {}).value) || 12;
  var wolfSharePct = parseFloat((document.getElementById('dd-wolf-share') || {}).value) || wd.wolfShare || 92;
  var retainPct = parseFloat((document.getElementById('dd-retain') || {}).value) || wd.dailyRetainPct || 15;
  var circuitPct = parseFloat((document.getElementById('dd-circuit') || {}).value) || 40;
  var total = wolf + senior;
  var leverage = wolf > 0 ? (total / wolf).toFixed(1) : '∞';
  var safety = total > 0 ? Math.round(senior / total * 100) : 0;

  var text = '═══════════════════════════════════════\n';
  text += '  Flow Capital 联营方案书（一页纸）\n';
  text += '═══════════════════════════════════════\n\n';
  text += '项目：' + (fd.name || '未命名') + ' | 赛道：' + (fd.industry || '未指定') + ' | 基因：' + (r.archetype || '-') + '\n';
  text += '生成时间：' + new Date().toLocaleDateString('zh-CN') + '\n\n';

  text += '─── 项目体检摘要 ───\n';
  text += '综合评分：' + r.score + '/100（' + r.grade + '级）\n';
  text += '日流水：' + ((r.pricingInputs && r.pricingInputs.baselineDailyRevenue) ? (r.pricingInputs.baselineDailyRevenue / 1000).toFixed(1) + 'K' : '-') + '\n';
  text += '一句话：' + ((r.report && r.report.oneLiner) || '') + '\n\n';

  text += '─── 交易结构设计 ───\n';
  text += '总盘口：' + total + '万\n';
  text += '├── 劣后资金（操盘方）：' + wolf + '万（' + Math.round(wolf / total * 100) + '%）\n';
  text += '└── 优先资金（资方）：' + senior + '万（' + Math.round(senior / total * 100) + '%）\n';
  text += '杠杆倍数：' + leverage + 'x\n\n';

  text += '优先方条件：\n';
  text += '├── 保底年化：' + seniorRet + '%\n';
  text += '├── 日流水截留还款：' + retainPct + '%\n';
  text += '└── 预计回本周期：' + (wd.estPaybackMonths || '-') + '个月\n\n';

  text += '超额利润分配：\n';
  text += '├── 操盘方（劣后）：' + wolfSharePct + '%\n';
  text += '└── 资方（优先）：' + (100 - wolfSharePct) + '%\n\n';

  text += '─── 收益预测（中性场景）───\n';
  text += '操盘方预估IRR：' + (wd.estIRR || '-') + '%\n';
  text += '安全垫：' + safety + '%\n\n';

  text += '─── 风控条件 ───\n';
  text += '熔断线：月营收连续2个月下降超过' + circuitPct + '%触发回购\n';
  text += '安全垫：' + safety + '%（优先资金全部亏完，操盘方才承担损失）\n';
  text += '监控频率：' + ((r.pricingInputs && r.pricingInputs.monitorFreq) || '月度') + '\n\n';

  text += '─── 分账规则 ───\n';
  text += '阶段一（还本期）：日流水 × ' + retainPct + '% 截留 → 优先还本付息\n';
  text += '阶段二（分利期）：超额利润 ' + wolfSharePct + '% 归操盘方，' + (100 - wolfSharePct) + '% 归优先方\n';
  text += '结算方式：T+0 自动清算\n\n';

  if (wv.verdict) {
    text += '─── 狼视角判断 ───\n';
    text += wv.verdict + '\n\n';
  }

  text += '═══════════════════════════════════════\n';
  text += '  由 Flow Capital HSR 引擎生成\n';
  text += '═══════════════════════════════════════\n';

  var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '联营方案_' + (fd.name || '项目') + '_' + new Date().toISOString().slice(0,10) + '.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('✅ 联营方案已导出');
}

// ==================== 估值辅助函数 ====================
function formatWan(val) {
  if (!val && val !== 0) return '-';
  if (val >= 10000) return (val / 10000).toFixed(1) + ' 亿';
  return val.toFixed(1) + ' 万';
}

function renderDealParam(label, value) {
  if (!value) return '';
  return '<div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">' +
    '<span class="text-xs text-gray-400 flex-shrink-0 w-16 pt-0.5 font-medium">' + escapeHtml(label) + '</span>' +
    '<p class="text-gray-700 text-xs leading-relaxed flex-1">' + escapeHtml(value) + '</p>' +
  '</div>';
}

function resetValuation() {
  valuationState.result = null;
  valuationState.attachments = [];
  var resultEl = document.getElementById('val-result');
  if (resultEl) { resultEl.classList.add('hidden'); resultEl.innerHTML = ''; }
  renderFileList();
  var container = document.getElementById('page-valuation').querySelector('.overflow-auto');
  if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
}

function exportValuationReport() {
  if (!valuationState.result) {
    showToast('请先完成估值分析');
    return;
  }
  var r = valuationState.result;
  var fd = valuationState.formData;

  var text = '═══════════════════════════════════\n';
  text += '  HSR 六维体检 · 估值评估报告\n';
  text += '═══════════════════════════════════\n\n';
  text += '项目：' + (fd.name || '未命名') + ' | 赛道：' + (fd.industry || '未指定') + '\n';
  text += '评估时间：' + new Date().toLocaleDateString('zh-CN') + '\n';
  if (r._attachments && r._attachments.length > 0) {
    text += '辅助材料：' + r._attachments.map(function(a) { return a.name; }).join('、') + '\n';
  }
  text += '\n';

  // 老板视角
  if (r.ownerView && r.ownerView.lines && r.ownerView.lines.length) {
    text += '─── 老板，你的项目体检单 ───\n';
    r.ownerView.lines.forEach(function(line) {
      var arrow = line.sentiment === 'positive' ? '↑' : line.sentiment === 'negative' ? '↓' : '→';
      text += '  ' + arrow + ' ' + line.label + '：' + line.value + ' — ' + (line.note || '') + '\n';
    });
    if (r.ownerView.valSummary) text += '\n  ' + r.ownerView.valSummary + '\n';
    if (r.ownerView.typeSummary) text += '  ' + r.ownerView.typeSummary + '\n';
    text += '\n';
  }

  text += '─── 综合评分 ───\n';
  text += '评分：' + r.score + '/100 (' + r.grade + '级)\n';
  text += '项目DNA：' + r.archetype + ' — ' + r.archetypeDesc + '\n\n';
  text += '─── 估值区间 ───\n';
  text += '保守：' + formatWan(r.valuation && r.valuation.conservative) + ' | 中性：' + formatWan(r.valuation && r.valuation.neutral) + ' | 乐观：' + formatWan(r.valuation && r.valuation.optimistic) + '\n';
  text += '方法：' + ((r.valuation && r.valuation.method) || '') + ' | 置信度：' + ((r.valuation && r.valuation.confidence) || 0) + '%\n\n';
  text += '─── 六维体检 ───\n';
  var dims = r.dimensions || {};
  var dimLabels = { profitability: '盈利能力', cashQuality: '现金质量', growthTrend: '增长趋势', scaleVolume: '规模体量', operationEfficiency: '运营效率', debtRisk: '借债风险' };
  Object.keys(dimLabels).forEach(function(k) {
    var d = dims[k] || {};
    text += '  ' + dimLabels[k] + ': ' + (d.score || '-') + '/100 — ' + (d.verdict || '') + '\n';
  });

  // 异常指标
  if (r.anomalies && r.anomalies.length) {
    text += '\n─── 异常指标 ───\n';
    r.anomalies.forEach(function(a) {
      text += '  [' + a.severity + '] ' + a.field + '：实际 ' + a.value + ' vs 同行 ' + a.benchmark;
      if (a.deviation) text += ' (' + a.deviation + ')';
      text += '\n    → ' + (a.impact || '') + '\n';
    });
  }

  text += '\n─── 造局参数 ───\n';
  if (r.dealParams && r.dealParams.suggestedPE) text += '  PE倍数：' + r.dealParams.suggestedPE + '\n';
  if (r.dealParams && r.dealParams.suggestedStake) text += '  出让比例：' + r.dealParams.suggestedStake + '\n';
  if (r.dealParams && r.dealParams.dealStructure) text += '  交易结构：' + r.dealParams.dealStructure + '\n';
  if (r.dealParams && r.dealParams.keyCondition) text += '  关键条件：' + r.dealParams.keyCondition + '\n';

  // 定价参数
  if (r.pricingInputs) {
    var pi = r.pricingInputs;
    text += '\n─── 定价参数（实操级） ───\n';
    if (pi.regimeTier) text += '  风险等级：' + pi.regimeTier + '\n';
    if (pi.deathProb) text += '  违约概率：' + pi.deathProb + '%\n';
    if (pi.paybackDays) text += '  预计回本：' + pi.paybackDays + '天\n';
    if (pi.baselineDailyRevenue) text += '  基准日流水：' + Math.round(pi.baselineDailyRevenue).toLocaleString() + '元\n';
    if (pi.priorityRatio) text += '  截留比例：' + pi.priorityRatio + '%\n';
    if (pi.upsideMultiplier) text += '  上浮倍数：' + pi.upsideMultiplier + 'x\n';
    if (pi.monitorFreq) text += '  监控频率：' + pi.monitorFreq + '\n';
    if (pi.circuitBreaker) text += '  熔断条件：' + pi.circuitBreaker + '\n';
  }

  text += '\n─── 评估报告 ───\n';
  text += '总结：' + ((r.report && r.report.oneLiner) || '') + '\n\n';
  text += '优势：\n';
  (r.report && r.report.strengths ? r.report.strengths : []).forEach(function(s) { text += '  ✓ ' + s + '\n'; });
  text += '\n风险：\n';
  (r.report && r.report.risks ? r.report.risks : []).forEach(function(s) { text += '  ! ' + s + '\n'; });

  // 行动清单
  if (r.actionItems && r.actionItems.length) {
    text += '\n行动清单：\n';
    r.actionItems.forEach(function(item) {
      var prefix = item.priority === 'red' ? '🔴' : item.priority === 'yellow' ? '🟡' : '🟢';
      text += '  ' + prefix + ' ' + item.text + '\n';
    });
  }

  text += '\n造局建议：\n  ' + ((r.report && r.report.actionPlan) || '') + '\n';
  text += '\n投资人话术：\n  "' + ((r.report && r.report.investorPitch) || '') + '"\n';

  // 风控清单
  if (r.riskView) {
    text += '\n─── 风控清单 ───\n';
    if (r.riskView.requiredDocs && r.riskView.requiredDocs.length) {
      text += '需要补充的材料：\n';
      r.riskView.requiredDocs.forEach(function(doc) { text += '  □ ' + doc + '\n'; });
    }
    if (r.riskView.mitigations && r.riskView.mitigations.length) {
      text += '建议减缓条款：\n';
      r.riskView.mitigations.forEach(function(m) { text += '  · ' + m.text + '\n'; });
    }
  }

  text += '\n═══════════════════════════════════\n';
  text += '  由 Flow Capital HSR 估值引擎生成\n';
  text += '═══════════════════════════════════\n';

  var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'HSR估值报告_' + (fd.name || '项目') + '_' + new Date().toISOString().slice(0,10) + '.txt';
  a.click();
  URL.revokeObjectURL(url);
  showToast('报告已导出');
}

console.log('Flow Capital 应用已加载');
