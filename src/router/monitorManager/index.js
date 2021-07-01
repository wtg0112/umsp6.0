const monitorManager = [
  {
    path: '/monitorManager',
    name: 'monitorManager',
    component: () => import('@/views/monitorManager'),
    meta: {title: '监控管理' },
    icon: 'iconfont icon-jiankong1',
    children: [
      {
        path: 'operateLog',
        name: 'operateLog',
        component: () => import('@/views/monitorManager/operateLog'),
        meta: { title: '操作日志' }
      }
    ]
  }
]

export default monitorManager
