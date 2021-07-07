const messageMarket = [
  {
    path: '/messageMarket',
    name: 'messageMarket',
    component: () => import('@/views/messageMarket'),
    meta: {title: '消息营销' },
    icon: 'iconfont icon-tongyiguanli',
    children: [
      {
        path: 'userManage',
        name: 'userManage',
        component: () => import('@/views/messageMarket/userManage'),
        meta: { title: '客户管理' }
      },
      {
        path: 'sendstrategy',
        name: 'sendstrategy',
        component: () => import('@/views/messageMarket/sendstrategy'),
        meta: { title: '发送策略' }
      },
      
    ]
  }
]

export default messageMarket
