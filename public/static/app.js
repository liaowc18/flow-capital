// Flow Capital - 主应用逻辑
// 现代金融风格交互界面

// ==================== 全局状态 ====================
let currentCard = 1;
const totalCards = 7;
let isFavorite = false;

// 筛选状态
let filterState = {
  industry: [],
  stage: [],
  amount: [],
  location: [],
  match: 60,
  sort: 'match'
};

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
    <!-- 筛选面板 -->
    <div id="filter-overlay" class="fixed inset-0 bg-black/50 z-40 hidden" onclick="closeFilter()"></div>
    <div id="filter-panel" class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 transform translate-y-full transition-transform duration-300 max-w-[428px] mx-auto" style="max-height: 85vh;">
      
      <!-- 面板头部 -->
      <div class="flex items-center justify-between p-4 border-b border-gray-100">
        <button class="text-gray-500 text-sm font-medium tap-effect" onclick="resetFilter()">重置</button>
        <div class="flex items-center gap-2">
          <i class="fas fa-filter text-primary"></i>
          <span class="font-bold text-gray-800">筛选项目</span>
        </div>
        <button class="text-primary font-bold text-sm tap-effect" onclick="closeFilter()">完成</button>
      </div>
      
      <!-- 筛选内容 -->
      <div class="overflow-auto p-4 space-y-6 no-scrollbar" style="max-height: calc(85vh - 140px);">
        
        ${renderFilterSection('industry', '🏢 行业领域', [
          '医疗健康', '人工智能', '新能源', '新消费', '企业服务', 
          '金融科技', '教育科技', '物联网', '硬科技'
        ])}
        
        ${renderFilterSection('stage', '📊 融资阶段', [
          '种子轮', '天使轮', 'Pre-A', 'A轮', 'B轮', 'C轮及以上'
        ])}
        
        ${renderFilterSection('amount', '💰 融资金额', [
          '500万以下', '500-2000万', '2000-5000万', '5000万-1亿', '1亿以上'
        ])}
        
        ${renderFilterSection('location', '📍 项目地区', [
          '北京', '上海', '深圳', '广州', '杭州', '成都', '其他城市'
        ])}
        
        <!-- 匹配度滑块 -->
        <div>
          <h4 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>🎯</span> 最低匹配度
          </h4>
          <div class="px-2">
            <input type="range" id="filter-match" min="0" max="100" value="60" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" oninput="updateMatchLabel(this.value); this.style.setProperty('--value', this.value + '%')" style="--value: 60%">
            <div class="flex justify-between mt-2 text-sm">
              <span class="text-gray-400">不限</span>
              <span id="match-label" class="text-primary font-bold">60%</span>
              <span class="text-gray-400">100%</span>
            </div>
          </div>
        </div>
        
        <!-- 排序方式 -->
        <div>
          <h4 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>📋</span> 排序方式
          </h4>
          <div class="flex flex-wrap gap-2" id="filter-sort">
            ${renderSortButton('match', '匹配度优先', true)}
            ${renderSortButton('latest', '最新发布')}
            ${renderSortButton('hot', '热度最高')}
            ${renderSortButton('amount-asc', '金额从低到高')}
            ${renderSortButton('amount-desc', '金额从高到低')}
          </div>
        </div>
        
      </div>
      
      <!-- 底部按钮 -->
      <div class="p-4 border-t border-gray-100 bg-white">
        <button class="w-full py-4 bg-gradient-finance text-white rounded-xl font-bold tap-effect flex items-center justify-center gap-2 shadow-finance" onclick="applyFilter()">
          <i class="fas fa-check"></i>
          应用筛选 <span id="filter-count" class="px-2 py-0.5 bg-white/20 rounded-full text-xs">0 个条件</span>
        </button>
      </div>
    </div>
  `;
}

function renderFilterSection(id, title, options) {
  return `
    <div>
      <h4 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        ${title}
      </h4>
      <div class="flex flex-wrap gap-2" id="filter-${id}">
        ${options.map(opt => `
          <button class="filter-tag px-4 py-2 border-2 border-gray-200 rounded-full text-sm tap-effect font-medium" data-value="${opt}" onclick="toggleFilterTag(this)">
            ${opt}
          </button>
        `).join('')}
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
function openFilter() {
  document.getElementById('filter-overlay').classList.remove('hidden');
  document.getElementById('filter-panel').style.transform = 'translateY(0)';
  document.body.style.overflow = 'hidden';
}

function closeFilter() {
  document.getElementById('filter-panel').style.transform = 'translateY(100%)';
  setTimeout(() => {
    document.getElementById('filter-overlay').classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

function toggleFilterTag(el) {
  el.classList.toggle('active');
  updateFilterCount();
}

function selectSortTag(el) {
  const parent = el.parentElement;
  parent.querySelectorAll('.filter-tag').forEach(tag => {
    tag.classList.remove('active', 'border-primary', 'bg-primary/10', 'text-primary');
    tag.classList.add('border-gray-200');
  });
  el.classList.add('active', 'border-primary', 'bg-primary/10', 'text-primary');
  el.classList.remove('border-gray-200');
  filterState.sort = el.dataset.value;
}

function updateMatchLabel(value) {
  const label = document.getElementById('match-label');
  if (value == 0) {
    label.textContent = '不限';
    label.classList.remove('text-primary');
    label.classList.add('text-gray-500');
  } else {
    label.textContent = value + '%';
    label.classList.remove('text-gray-500');
    label.classList.add('text-primary');
  }
  filterState.match = parseInt(value);
  updateFilterCount();
}

function updateFilterCount() {
  let count = 0;
  
  // 计算多选标签数量
  document.querySelectorAll('#filter-industry .filter-tag.active, #filter-stage .filter-tag.active, #filter-amount .filter-tag.active, #filter-location .filter-tag.active').forEach(() => count++);
  
  // 如果匹配度不是默认值
  if (filterState.match !== 60) count++;
  
  // 如果排序不是默认值
  if (filterState.sort !== 'match') count++;
  
  // 更新显示
  document.getElementById('filter-count').textContent = count + ' 个条件';
  
  // 更新筛选按钮上的徽章
  const badge = document.getElementById('filter-badge');
  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove('hidden');
    badge.classList.add('flex');
  } else {
    badge.classList.add('hidden');
    badge.classList.remove('flex');
  }
}

function resetFilter() {
  // 重置所有标签
  document.querySelectorAll('.filter-tag.active').forEach(tag => {
    tag.classList.remove('active', 'border-primary', 'bg-primary/10', 'text-primary');
    tag.classList.add('border-gray-200');
  });
  
  // 重新激活默认排序
  const defaultSort = document.querySelector('#filter-sort .filter-tag[data-value="match"]');
  if (defaultSort) {
    defaultSort.classList.add('active', 'border-primary', 'bg-primary/10', 'text-primary');
    defaultSort.classList.remove('border-gray-200');
  }
  
  // 重置匹配度滑块
  const slider = document.getElementById('filter-match');
  slider.value = 60;
  slider.style.setProperty('--value', '60%');
  updateMatchLabel(60);
  
  // 重置状态
  filterState = {
    industry: [],
    stage: [],
    amount: [],
    location: [],
    match: 60,
    sort: 'match'
  };
  
  updateFilterCount();
  showToast('已重置筛选条件');
}

function applyFilter() {
  // 收集选中的筛选条件
  filterState.industry = [];
  filterState.stage = [];
  filterState.amount = [];
  filterState.location = [];
  
  document.querySelectorAll('#filter-industry .filter-tag.active').forEach(tag => {
    filterState.industry.push(tag.dataset.value);
  });
  document.querySelectorAll('#filter-stage .filter-tag.active').forEach(tag => {
    filterState.stage.push(tag.dataset.value);
  });
  document.querySelectorAll('#filter-amount .filter-tag.active').forEach(tag => {
    filterState.amount.push(tag.dataset.value);
  });
  document.querySelectorAll('#filter-location .filter-tag.active').forEach(tag => {
    filterState.location.push(tag.dataset.value);
  });
  
  // 构建筛选描述
  let description = [];
  if (filterState.industry.length) description.push(filterState.industry.join('、'));
  if (filterState.stage.length) description.push(filterState.stage.join('、'));
  if (filterState.amount.length) description.push(filterState.amount.join('、'));
  if (filterState.location.length) description.push(filterState.location.join('、'));
  if (filterState.match > 0) description.push('≥' + filterState.match + '%匹配');
  
  closeFilter();
  
  // 显示筛选结果
  if (description.length > 0) {
    showToast('✓ 已筛选: ' + description.slice(0, 2).join(' + ') + (description.length > 2 ? '...' : ''));
  } else {
    showToast('✓ 显示所有项目');
  }
  
  // 重置卡片并应用筛选
  resetCards();
}

console.log('Flow Capital 应用已加载');
