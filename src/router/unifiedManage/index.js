const unifiedManage = [
  {
    path: '/unifiedManage',
    name: 'unifiedManage',
    component: () => import('@/views/unifiedManage'),
    meta: {title: '统一管理' },
    icon: 'iconfont icon-tongyiguanli',
    children: [
      {
        path: 'userManage',
        name: 'userManage',
        component: () => import('@/views/unifiedManage/userManage'),
        meta: { title: '客户管理' }
      },
      {
        path: 'unifiedSend',
        name: 'unifiedSend',
        component: () => import('@/views/unifiedManage/unifiedSend'),
        meta: { title: '统一发送' }
      }
    ]
  }
]

export default unifiedManage
