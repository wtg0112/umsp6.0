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
      },
      {
        path: 'pushSearch',
        name: 'pushSearch',
        component: () => import('@/views/appPush/pushSearch'),
        meta: { title: '推送查询' }
      },
      {
        path: 'appStatistic',
        name: 'appStatistic',
        component: () => import('@/views/appPush/appStatistic'),
        meta: { title: 'APP统计' }
      }
      
    ]
  }
]

export default appPush
