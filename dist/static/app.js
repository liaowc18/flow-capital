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
});

// ==================== 页面渲染 ====================
function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderHomePage()}
    ${renderDetailPage()}
    ${renderMessagesPage()}
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
          <button class="p-2 text-gray-500 hover:text-primary relative tap-effect" onclick="showPage('valuation')" title="项目估值计算器">
            <i class="fas fa-calculator text-lg"></i>
          </button>
          <button id="filter-btn" class="p-2 text-gray-500 hover:text-primary relative tap-effect" onclick="openFilter()">
            <i class="fas fa-filter text-lg"></i>
            <span id="filter-badge" class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white text-xs rounded-full items-center justify-center hidden badge-pulse">0</span>
          </button>
          <button class="p-2 text-gray-500 hover:text-primary relative tap-effect" onclick="showPage('messages')">
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

function renderMessagesPage() {
  return `
    <!-- 消息页 -->
    <div id="page-messages" class="page h-screen">
      <header class="glass-effect px-4 py-3 border-b border-gray-100 sticky top-0 z-10">
        <h1 class="font-bold text-gray-800 text-lg">消息中心</h1>
      </header>
      
      <div class="flex-1 overflow-auto no-scrollbar">
        <div class="p-4 border-b border-gray-100 flex items-center gap-3 tap-effect card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center shadow-sm">
            <i class="fas fa-bullhorn text-primary text-xl"></i>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-semibold text-gray-800">系统通知</h4>
              <span class="text-xs text-gray-400">刚刚</span>
            </div>
            <p class="text-sm text-gray-500 truncate">您关注的项目"智慧医疗AI"有新动态</p>
          </div>
          <span class="w-2.5 h-2.5 bg-error rounded-full badge-pulse"></span>
        </div>
        
        <div class="p-4 border-b border-gray-100 flex items-center gap-3 tap-effect card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-success/10 to-success/20 rounded-2xl flex items-center justify-center shadow-sm">
            <i class="fas fa-comment-dots text-success text-xl"></i>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-semibold text-gray-800">智慧医疗 AI · 创始人</h4>
              <span class="text-xs text-gray-400">2小时前</span>
            </div>
            <p class="text-sm text-gray-500 truncate">感谢您的关注，期待与您进一步交流</p>
          </div>
        </div>

        <div class="p-4 border-b border-gray-100 flex items-center gap-3 tap-effect card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-accent/10 to-warning/10 rounded-2xl flex items-center justify-center shadow-sm">
            <i class="fas fa-star text-accent text-xl"></i>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-semibold text-gray-800">新项目推荐</h4>
              <span class="text-xs text-gray-400">昨天</span>
            </div>
            <p class="text-sm text-gray-500 truncate">3个新项目符合您的投资偏好</p>
          </div>
        </div>
      </div>
      
      ${renderBottomNav('messages')}
    </div>
  `;
}

function renderProfilePage() {
  return `
    <!-- 我的页面 -->
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
      
      <div class="flex-1 overflow-auto no-scrollbar">
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
          <button class="flex flex-col items-center gap-2 tap-effect" onclick="showToast('📈 数据中心开发中')">
            <div class="w-14 h-14 bg-gradient-to-br from-warning/10 to-warning/20 rounded-2xl flex items-center justify-center shadow-sm">
              <i class="fas fa-analytics text-warning text-xl"></i>
            </div>
            <span class="text-xs text-gray-600 font-medium">数据中心</span>
          </button>
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

function renderMyProjectsPage() {
  return `
    <!-- 我的项目页 -->
    <div id="page-my-projects" class="page h-screen">
      <header class="glass-effect px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <span class="font-bold text-gray-800">我的项目</span>
        <button class="px-4 py-2 bg-gradient-finance text-white text-sm rounded-full shadow-finance tap-effect" onclick="showPage('publish')">
          <i class="fas fa-plus mr-1"></i> 发布项目
        </button>
      </header>
      
      <div class="flex-1 overflow-auto no-scrollbar">
        <!-- 项目统计 -->
        <div class="p-4 grid grid-cols-3 gap-3">
          <div class="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-center neumorphic">
            <p class="text-2xl font-bold text-primary">2</p>
            <p class="text-xs text-gray-500 mt-1">进行中</p>
          </div>
          <div class="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl text-center neumorphic">
            <p class="text-2xl font-bold text-success">1</p>
            <p class="text-xs text-gray-500 mt-1">已完成</p>
          </div>
          <div class="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl text-center neumorphic">
            <p class="text-2xl font-bold text-gray-400">1</p>
            <p class="text-xs text-gray-500 mt-1">草稿</p>
          </div>
        </div>
        
        <!-- 项目列表 -->
        <div class="p-4 space-y-4">
          <p class="text-xs text-gray-400 font-medium">进行中的项目</p>
          
          ${renderMyProjectCard('智能家居控制系统', '物联网 · Pre-A轮', '600万', '8', 45, '进行中')}
          ${renderMyProjectCard('社区团购 SaaS 平台', '电商 · 天使轮', '300万', '3', 20, '进行中')}
          
          <p class="text-xs text-gray-400 font-medium pt-4">已完成</p>
          
          ${renderMyProjectCard('健康管理 App', '医疗健康 · 天使轮', '200万', null, 100, '已完成')}
        </div>
      </div>
      
      ${renderBottomNav('my-projects')}
    </div>
  `;
}

function renderMyProjectCard(title, desc, amount, interested, progress, status) {
  const isCompleted = status === '已完成';
  return `
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 tap-effect card-hover ${isCompleted ? 'opacity-70' : ''}" onclick="showToast('📊 项目详情开发中')">
      <div class="flex justify-between items-start mb-3">
        <div>
          <h3 class="font-bold text-gray-800">${title}</h3>
          <p class="text-xs text-gray-400 mt-1">${desc}</p>
        </div>
        <span class="px-3 py-1 ${isCompleted ? 'bg-success/10 text-success' : 'bg-blue-50 text-primary'} text-xs rounded-full font-medium">
          ${status}
        </span>
      </div>
      <div class="flex items-center justify-between text-sm mb-3">
        <span class="text-gray-500">融资目标：<strong class="text-gray-800">${amount}</strong></span>
        ${interested ? `<span class="text-gray-500">已有 <strong class="text-success">${interested}</strong> 位投资者意向</span>` : `<span class="text-gray-500">2025-08 完成</span>`}
      </div>
      ${!isCompleted ? `
        <div class="flex items-center justify-between">
          <div class="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden mr-3">
            <div class="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style="width: ${progress}%"></div>
          </div>
          <span class="text-xs text-gray-500 font-medium">${progress}%</span>
        </div>
      ` : ''}
    </div>
  `;
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
        <button class="w-full py-4 bg-gradient-finance text-white rounded-xl font-bold tap-effect shadow-finance" onclick="showToast('✅ 已保存，进入下一步'); showPage('my-projects')">
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
    { id: 'my-projects', icon: 'folder', label: '我的项目' },
    { id: 'publish', icon: 'plus', label: '发布', isCenter: true },
    { id: 'messages', icon: 'bell', label: '消息', hasBadge: true },
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
  formData: {}
};

function renderValuationPage() {
  return `
    <!-- 估值计算器页面 -->
    <div id="page-valuation" class="page h-screen" style="background: #0a0f0e;">

      <!-- 顶部栏 -->
      <header class="px-4 py-3 flex items-center justify-between border-b border-white/10 sticky top-0 z-10" style="background: rgba(10,15,14,0.95); backdrop-filter: blur(10px);">
        <button class="p-2 -ml-2 tap-effect" onclick="showPage('home')">
          <i class="fas fa-arrow-left text-gray-400 text-lg"></i>
        </button>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-md text-xs font-bold" style="background: #059669; color: white;">HSR 估值引擎</span>
          <span class="font-semibold text-white text-sm">资产健康度评估</span>
        </div>
        <div class="w-8"></div>
      </header>

      <!-- 可滚动主体 -->
      <div class="flex-1 overflow-auto no-scrollbar pb-6">

        <!-- 标题描述 -->
        <div class="px-4 pt-4 pb-3">
          <p class="text-xs text-gray-500 leading-relaxed">基于 HSR 多维物理对撞的小微企业/门店估值 · P＝M×V 基态分类 · 定价参数建议</p>
        </div>

        <!-- 表单区域 -->
        <div id="val-form-section">
          <div class="mx-4 rounded-2xl p-4" style="background: #111816; border: 1px solid rgba(255,255,255,0.08);">

            <h2 class="text-white font-bold text-base mb-1">企业数据输入</h2>
            <p class="text-xs text-emerald-400/80 mb-4">至少填写收入+成本（或日流水+日成本），更多字段 = 更准确的评估</p>

            <!-- 基础信息 -->
            <div class="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label class="block text-xs text-gray-500 mb-1.5">企业名称</label>
                <input type="text" id="val-name" placeholder="如：张三麻辣烫" class="val-input">
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1.5">行业</label>
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
              <span class="text-sm">📋</span>
              <span class="text-xs font-semibold text-white">核心数据（必填其一组）</span>
            </div>
            <div class="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label class="block text-xs text-gray-500 mb-1.5">年收入（元）</label>
                <input type="number" id="val-revenue" placeholder="如 1200000" class="val-input">
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1.5">年成本（元）</label>
                <input type="number" id="val-cost" placeholder="如 800000" class="val-input">
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1.5">日流水（元）</label>
                <input type="number" id="val-daily-flow" placeholder="如 8500" class="val-input">
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1.5">日成本（元）</label>
                <input type="number" id="val-daily-cost" placeholder="如 5000" class="val-input">
              </div>
            </div>

            <!-- 推荐补充 -->
            <div class="flex items-center gap-2 mb-3">
              <span class="text-sm">💡</span>
              <span class="text-xs font-semibold text-white">推荐补充</span>
            </div>
            <div class="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label class="block text-xs text-gray-500 mb-1.5">净利润（元/年）</label>
                <input type="number" id="val-net-profit" placeholder="可选" class="val-input">
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1.5">退款率</label>
                <input type="number" id="val-refund-rate" step="0.01" placeholder="如 0.01" class="val-input">
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1.5">增长率</label>
                <input type="number" id="val-growth-rate" step="0.01" placeholder="如 0.1" class="val-input">
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1.5">周转天数</label>
                <input type="number" id="val-turnover-days" placeholder="如 7" class="val-input">
              </div>
            </div>

            <!-- 更多字段（可展开） -->
            <details class="mb-4">
              <summary class="text-xs text-gray-500 cursor-pointer hover:text-emerald-400 transition-colors flex items-center gap-1.5 py-2">
                <span>▶</span> <span>🔧</span> 更多字段（可选）
              </summary>
              <div class="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label class="block text-xs text-gray-500 mb-1.5">负债率</label>
                  <input type="number" id="val-debt-ratio" step="0.01" placeholder="如 0.3" class="val-input">
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1.5">员工人数</label>
                  <input type="number" id="val-employee-count" placeholder="如 8" class="val-input">
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1.5">经营年限</label>
                  <input type="number" id="val-operating-years" step="0.5" placeholder="如 3" class="val-input">
                </div>
              </div>
            </details>

            <!-- 提交按钮 -->
            <button id="val-submit-btn" class="w-full py-3.5 rounded-xl font-bold text-white text-sm tap-effect transition-all flex items-center justify-center gap-2" style="background: linear-gradient(135deg, #059669 0%, #10B981 100%); box-shadow: 0 4px 15px rgba(5,150,105,0.3);" onclick="submitValuation()">
              <i class="fas fa-calculator"></i>
              <span>开始估值分析</span>
            </button>
          </div>
        </div>

        <!-- 加载态 -->
        <div id="val-loading" class="mx-4 mt-4 hidden">
          <div class="rounded-2xl p-8 text-center" style="background: #111816; border: 1px solid rgba(255,255,255,0.08);">
            <div class="val-loading-spinner mx-auto mb-4"></div>
            <p class="text-white font-semibold text-sm mb-1">AI 数学分析师正在诊断...</p>
            <p class="text-gray-500 text-xs" id="val-loading-text">正在计算盈利能力指标</p>
          </div>
        </div>

        <!-- 结果区域 -->
        <div id="val-result" class="hidden"></div>

      </div>
    </div>
  `;
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
  valuationState.formData = formData;

  // 显示加载态
  document.getElementById('val-loading').classList.remove('hidden');
  document.getElementById('val-result').classList.add('hidden');
  document.getElementById('val-result').innerHTML = '';
  const btn = document.getElementById('val-submit-btn');
  if (btn) { btn.disabled = true; btn.style.opacity = '0.5'; }

  // 加载文案轮播
  const loadingTexts = [
    '正在计算盈利能力指标...',
    '正在分析现金流质量...',
    '正在评估增长趋势...',
    '正在对标行业数据...',
    '正在生成估值区间...',
    '正在撰写分析报告...',
    'AI 分析师正在翻译行业术语...'
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

  // 根据 grade 选色
  var gradeColors = { S: '#D4AF37', A: '#059669', B: '#1E40AF', C: '#F59E0B', D: '#DC2626' };
  var gradeColor = gradeColors[r.grade] || '#059669';
  var scorePct = r.score || 0;

  // 维度数据
  var dims = r.dimensions || {};
  var dimList = [
    { key: 'profitability', label: '盈利能力', icon: '💰' },
    { key: 'cashQuality', label: '现金质量', icon: '💵' },
    { key: 'growthTrend', label: '增长趋势', icon: '📈' },
    { key: 'scaleVolume', label: '规模体量', icon: '🏢' },
    { key: 'operationEfficiency', label: '运营效率', icon: '⚙️' },
    { key: 'debtRisk', label: '借债风险', icon: '🔒' }
  ];

  // 构建维度条 HTML
  var dimBarsHtml = dimList.map(function(d) {
    var dimData = dims[d.key] || { score: 50, verdict: '' };
    var barColor = dimData.score >= 80 ? '#059669' : dimData.score >= 60 ? '#10B981' : dimData.score >= 40 ? '#F59E0B' : '#DC2626';
    return '<div>' +
      '<div class="flex items-center justify-between mb-1">' +
        '<span class="text-xs text-gray-400">' + d.icon + ' ' + d.label + '</span>' +
        '<span class="text-xs font-bold" style="color:' + barColor + ';">' + dimData.score + '</span>' +
      '</div>' +
      '<div class="w-full h-2 rounded-full" style="background:rgba(255,255,255,0.06);">' +
        '<div class="h-full rounded-full val-bar-animate" style="width:' + dimData.score + '%;background:' + barColor + ';transition:width 1s ease;"></div>' +
      '</div>' +
      '<p class="text-xs text-gray-600 mt-1 italic">' + (dimData.verdict || '') + '</p>' +
    '</div>';
  }).join('');

  // 维度标签
  var dimTagsHtml = dimList.map(function(d) {
    var s = (dims[d.key] || {}).score || 0;
    var isGood = s >= 60;
    return '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium" style="background:' + (isGood ? 'rgba(5,150,105,0.15)' : 'rgba(220,38,38,0.15)') + ';color:' + (isGood ? '#10B981' : '#F87171') + ';">' +
      (isGood ? '✅' : '⚠️') + ' ' + d.label + '</span>';
  }).join('');

  // 优势列表
  var strengthsHtml = (r.report && r.report.strengths ? r.report.strengths : []).map(function(s) {
    return '<div class="flex items-start gap-2"><span class="text-emerald-400 text-xs mt-0.5 flex-shrink-0">✓</span><p class="text-gray-300 text-xs leading-relaxed">' + escapeHtml(s) + '</p></div>';
  }).join('');

  // 风险列表
  var risksHtml = (r.report && r.report.risks ? r.report.risks : []).map(function(s) {
    return '<div class="flex items-start gap-2"><span class="text-red-400 text-xs mt-0.5 flex-shrink-0">!</span><p class="text-gray-300 text-xs leading-relaxed">' + escapeHtml(s) + '</p></div>';
  }).join('');

  resultEl.innerHTML =
    // 综合评分
    '<div class="mx-4 mt-4 rounded-2xl p-5" style="background:#111816;border:1px solid rgba(255,255,255,0.08);">' +
      '<div class="flex items-start justify-between mb-4">' +
        '<div>' +
          '<div class="flex items-baseline gap-3">' +
            '<span class="text-5xl font-black text-white">' + r.score + '</span>' +
            '<span class="px-3 py-1 rounded-lg text-xs font-bold text-white" style="background:' + gradeColor + ';">' + escapeHtml(r.archetype || '分析中') + '</span>' +
          '</div>' +
          '<p class="text-gray-400 text-xs mt-1">' + escapeHtml(r.archetypeDesc || '') + '</p>' +
          '<p class="text-gray-600 text-xs mt-0.5">' + escapeHtml(r.grade || '') + ' 级</p>' +
        '</div>' +
        '<div class="relative w-16 h-16 flex-shrink-0">' +
          '<svg class="w-16 h-16" style="transform:rotate(-90deg)" viewBox="0 0 36 36">' +
            '<circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3"/>' +
            '<circle cx="18" cy="18" r="15" fill="none" stroke="' + gradeColor + '" stroke-width="3" stroke-dasharray="' + (scorePct * 0.942) + ' 100" stroke-linecap="round" class="val-score-ring"/>' +
          '</svg>' +
          '<span class="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">' + escapeHtml(r.grade || '') + '</span>' +
        '</div>' +
      '</div>' +
    '</div>' +

    // 估值参考区间
    '<div class="mx-4 mt-3 rounded-2xl p-5" style="background:#111816;border:1px solid rgba(255,255,255,0.08);">' +
      '<div class="flex items-center gap-2 mb-3"><span class="text-sm">💰</span><span class="text-white font-bold text-sm">估值参考区间</span></div>' +
      '<div class="grid grid-cols-3 gap-2 mb-3">' +
        '<div class="rounded-xl p-3 text-center" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);"><p class="text-gray-500 text-xs mb-1">保守</p><p class="text-white font-bold text-lg">' + formatWan(r.valuation && r.valuation.conservative) + '</p></div>' +
        '<div class="rounded-xl p-3 text-center" style="background:rgba(5,150,105,0.1);border:1px solid rgba(5,150,105,0.3);"><p class="text-emerald-400 text-xs mb-1">中性</p><p class="text-white font-bold text-lg">' + formatWan(r.valuation && r.valuation.neutral) + '</p></div>' +
        '<div class="rounded-xl p-3 text-center" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);"><p class="text-gray-500 text-xs mb-1">乐观</p><p class="text-white font-bold text-lg">' + formatWan(r.valuation && r.valuation.optimistic) + '</p></div>' +
      '</div>' +
      '<p class="text-gray-600 text-xs">' + escapeHtml((r.valuation && r.valuation.method) || '') + ' · 置信度 ' + ((r.valuation && r.valuation.confidence) || 0) + '%</p>' +
    '</div>' +

    // 多维透视
    '<div class="mx-4 mt-3 rounded-2xl p-5" style="background:#111816;border:1px solid rgba(255,255,255,0.08);">' +
      '<div class="flex items-center gap-2 mb-4"><span class="text-sm">📊</span><span class="text-white font-bold text-sm">多维透视</span></div>' +
      '<div class="space-y-3 mb-4">' + dimBarsHtml + '</div>' +
      '<div class="flex flex-wrap gap-2">' + dimTagsHtml + '</div>' +
    '</div>' +

    // 造局参数
    '<div class="mx-4 mt-3 rounded-2xl p-5" style="background:#111816;border:1px solid rgba(255,255,255,0.08);">' +
      '<div class="flex items-center gap-2 mb-3"><span class="text-sm">🎯</span><span class="text-white font-bold text-sm">造局参数建议</span></div>' +
      '<div class="space-y-3">' +
        renderDealParam('PE 倍数', r.dealParams && r.dealParams.suggestedPE) +
        renderDealParam('出让比例', r.dealParams && r.dealParams.suggestedStake) +
        renderDealParam('交易结构', r.dealParams && r.dealParams.dealStructure) +
        renderDealParam('关键条件', r.dealParams && r.dealParams.keyCondition) +
      '</div>' +
    '</div>' +

    // 评估报告
    '<div class="mx-4 mt-3 rounded-2xl p-5" style="background:#111816;border:1px solid rgba(255,255,255,0.08);">' +
      '<div class="flex items-center gap-2 mb-3"><span class="text-sm">📝</span><span class="text-white font-bold text-sm">评估报告</span></div>' +
      // 一句话总结
      '<div class="p-3 rounded-xl mb-4" style="background:rgba(5,150,105,0.08);border:1px solid rgba(5,150,105,0.2);"><p class="text-emerald-400 text-sm font-medium leading-relaxed">"' + escapeHtml((r.report && r.report.oneLiner) || '') + '"</p></div>' +
      // 优势
      '<div class="mb-4"><p class="text-xs text-gray-500 font-semibold mb-2 flex items-center gap-1.5"><span class="text-emerald-400">●</span> 核心优势</p><div class="space-y-2">' + strengthsHtml + '</div></div>' +
      // 风险
      '<div class="mb-4"><p class="text-xs text-gray-500 font-semibold mb-2 flex items-center gap-1.5"><span class="text-red-400">●</span> 主要风险</p><div class="space-y-2">' + risksHtml + '</div></div>' +
      // 造局建议
      '<div class="mb-4"><p class="text-xs text-gray-500 font-semibold mb-2 flex items-center gap-1.5"><span class="text-amber-400">●</span> 造局建议</p><p class="text-gray-300 text-xs leading-relaxed">' + escapeHtml((r.report && r.report.actionPlan) || '') + '</p></div>' +
      // 投资人话术
      '<div class="p-3 rounded-xl" style="background:rgba(212,175,55,0.06);border:1px solid rgba(212,175,55,0.2);">' +
        '<p class="text-xs text-gray-500 font-semibold mb-2 flex items-center gap-1.5"><i class="fas fa-comment-dollar text-amber-400"></i> 见投资人这么说</p>' +
        '<p class="text-gray-300 text-xs leading-relaxed italic">"' + escapeHtml((r.report && r.report.investorPitch) || '') + '"</p>' +
      '</div>' +
    '</div>' +

    // 操作栏
    '<div class="mx-4 mt-3 mb-6 flex gap-3">' +
      '<button class="flex-1 py-3 rounded-xl font-semibold text-sm tap-effect flex items-center justify-center gap-2" style="background:rgba(255,255,255,0.08);color:white;border:1px solid rgba(255,255,255,0.15);" onclick="resetValuation()"><i class="fas fa-redo text-xs"></i> 重新评估</button>' +
      '<button class="flex-1 py-3 rounded-xl font-semibold text-sm tap-effect flex items-center justify-center gap-2" style="background:linear-gradient(135deg,#059669 0%,#10B981 100%);color:white;box-shadow:0 4px 15px rgba(5,150,105,0.3);" onclick="exportValuationReport()"><i class="fas fa-file-export text-xs"></i> 导出报告</button>' +
    '</div>';

  // 滚动到结果区域
  setTimeout(function() {
    var container = document.getElementById('page-valuation').querySelector('.overflow-auto');
    if (container) container.scrollTo({ top: container.scrollHeight * 0.25, behavior: 'smooth' });
  }, 200);
}

// ==================== 估值辅助函数 ====================
function formatWan(val) {
  if (!val && val !== 0) return '-';
  if (val >= 10000) return (val / 10000).toFixed(1) + ' 亿';
  return val.toFixed(1) + ' 万';
}

function renderDealParam(label, value) {
  if (!value) return '';
  return '<div class="flex items-start gap-3 p-3 rounded-xl" style="background:rgba(255,255,255,0.03);">' +
    '<span class="text-xs text-gray-500 flex-shrink-0 w-16 pt-0.5">' + escapeHtml(label) + '</span>' +
    '<p class="text-gray-300 text-xs leading-relaxed flex-1">' + escapeHtml(value) + '</p>' +
  '</div>';
}

function resetValuation() {
  valuationState.result = null;
  var resultEl = document.getElementById('val-result');
  if (resultEl) { resultEl.classList.add('hidden'); resultEl.innerHTML = ''; }
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
  text += '  HSR 资产健康度评估报告\n';
  text += '═══════════════════════════════════\n\n';
  text += '📋 项目：' + (fd.name || '未命名') + ' | 行业：' + (fd.industry || '未指定') + '\n';
  text += '📅 评估时间：' + new Date().toLocaleDateString('zh-CN') + '\n\n';
  text += '─── 综合评分 ───\n';
  text += '评分：' + r.score + '/100 (' + r.grade + '级)\n';
  text += '基因型：' + r.archetype + ' — ' + r.archetypeDesc + '\n\n';
  text += '─── 估值区间 ───\n';
  text += '保守：' + formatWan(r.valuation && r.valuation.conservative) + ' | 中性：' + formatWan(r.valuation && r.valuation.neutral) + ' | 乐观：' + formatWan(r.valuation && r.valuation.optimistic) + '\n';
  text += '方法：' + ((r.valuation && r.valuation.method) || '') + ' | 置信度：' + ((r.valuation && r.valuation.confidence) || 0) + '%\n\n';
  text += '─── 多维透视 ───\n';
  var dims = r.dimensions || {};
  var dimLabels = { profitability: '盈利能力', cashQuality: '现金质量', growthTrend: '增长趋势', scaleVolume: '规模体量', operationEfficiency: '运营效率', debtRisk: '借债风险' };
  Object.keys(dimLabels).forEach(function(k) {
    var d = dims[k] || {};
    text += '  ' + dimLabels[k] + ': ' + (d.score || '-') + '/100 — ' + (d.verdict || '') + '\n';
  });
  text += '\n─── 造局参数 ───\n';
  if (r.dealParams && r.dealParams.suggestedPE) text += '  PE倍数：' + r.dealParams.suggestedPE + '\n';
  if (r.dealParams && r.dealParams.suggestedStake) text += '  出让比例：' + r.dealParams.suggestedStake + '\n';
  if (r.dealParams && r.dealParams.dealStructure) text += '  交易结构：' + r.dealParams.dealStructure + '\n';
  if (r.dealParams && r.dealParams.keyCondition) text += '  关键条件：' + r.dealParams.keyCondition + '\n';
  text += '\n─── 评估报告 ───\n';
  text += '总结：' + ((r.report && r.report.oneLiner) || '') + '\n\n';
  text += '优势：\n';
  (r.report && r.report.strengths ? r.report.strengths : []).forEach(function(s) { text += '  ✓ ' + s + '\n'; });
  text += '\n风险：\n';
  (r.report && r.report.risks ? r.report.risks : []).forEach(function(s) { text += '  ! ' + s + '\n'; });
  text += '\n造局建议：\n  ' + ((r.report && r.report.actionPlan) || '') + '\n';
  text += '\n投资人话术：\n  "' + ((r.report && r.report.investorPitch) || '') + '"\n';
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
  showToast('✅ 报告已导出');
}

console.log('Flow Capital 应用已加载');
