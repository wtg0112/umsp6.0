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
      }
    ]
  }
]

export default reportManage
