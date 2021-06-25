const appPush = [
  {
    path: '/appPush',
    name: 'appPush',
    component: () => import('@/views/appPush'),
    meta: {title: 'APP推送' },
    icon: 'iconfont icon-yujing',
    children: [
      {
        path: 'appPush',
        name: 'appPush',
        component: () => import('@/views/appPush/appPush'),
        meta: { title: 'APP推送' }
      }
    ]
  }
]

export default appPush
