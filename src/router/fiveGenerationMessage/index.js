const fiveGenerationMessage = [
  {
    path: '/fiveGenMessage',
    name: 'fiveGenerationMessage',
    component: () => import('@/views/fiveGenerationMessage'),
    meta: {title: '5G消息' },
    icon: 'iconfont icon-5G',
    children: [
      {
        path: 'diyMenu',
        name: 'diyMenu',
        component: () => import('@/views/fiveGenerationMessage/diyMenu'),
        meta: { title: '自定义菜单' }
      }
    ]
  }
]

export default fiveGenerationMessage
