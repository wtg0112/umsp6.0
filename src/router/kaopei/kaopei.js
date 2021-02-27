const kpRouter = [
  {
    path: '/kaopei',
    name: 'kaopei',
    redirect: '/kaopei/home',
    component: () => import('@/views/kaopei/index.vue'),
    children: [
      {
        path: 'home',
        name: 'kaopeiHome',
        component: () => import('@/views/kaopei/home/home.vue'),
        meta: { title: '海策数据-日本站首页', source: 'kaopei' }
      },
      {
        path: 'case',
        name: 'kaopeiCase',
        component: () => import('@/views/kaopei/case/case.vue'),
        meta: { title: '海策数据-日本站案例库', source: 'kaopei' }
      }
      // {
      //   path: '/kaopei/details',
      //   name: 'Details',
      //   component: () => import('@/views/kaopei/case/details/details.vue'),
      //   meta: { title: '海策数据-日本站案例库详情页', source: 'jp' }
      // }
    ]
  }
]
module.exports = kpRouter
