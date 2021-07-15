const reportManage = [
  {
    path: '/reportManage',
    name: 'reportManage',
    component: () => import('@/views/reportManage'),
    meta: {title: '通讯管理' },
    icon: 'iconfont icon-tongxun',
    children: [
      {
        path: 'sectionManage',
        name: 'sectionManage',
        component: () => import('@/views/reportManage/sectionManage'),
        meta: { title: '号段管理' }
      },
      {
        path: 'transSection',
        name: 'transSection',
        component: () => import('@/views/reportManage/transSection'),
        meta: { title: '携号转网' }
      },
      {
        path: 'chatbotManage',
        name: 'chatbotManage',
        component: () => import('@/views/reportManage/chatbotManage'),
        meta: { title: 'ChatBot管理' }
      },
      {
        path: 'applicationManage',
        name: 'applicationManage',
        component: () => import('@/views/reportManage/applicationManage'),
        meta: { title: 'APP应用管理' }
      },
      {
        path: 'wxManage',
        name: 'wxManage',
        component: () => import('@/views/reportManage/wxManage'),
        meta: { title: '微信公众号管理' }
      },
      {
        path: 'passTransManage',
        name: 'passTransManage',
        component: () => import('@/views/reportManage/passTransManage'),
        meta: { title: '通道切换管理' }
      },
      {
        path: 'upstreamOrderManage',
        name: 'upstreamOrderManage',
        component: () => import('@/views/reportManage/upstreamOrderManage'),
        meta: { title: '上行指令管理' }
      },
      {
        path: 'upstreamRouteManage',
        name: 'upstreamRouteManage',
        component: () => import('@/views/reportManage/upstreamRouteManage'),
        meta: { title: '上行路由管理' }
      },
      {
        path: 'fiveUpstreamRouteManage',
        name: 'fiveUpstreamRouteManage',
        component: () => import('@/views/reportManage/fiveUpstreamRouteManage'),
        meta: { title: '5G上行路由管理' }
      }
    ]
  }
]

export default reportManage
