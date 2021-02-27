const jpRouter = [
  {
    path: '/japan',
    name: 'japan',
    redirect: '/japan/home',
    component: () => import('@/views/Japan/index.vue'),
    children: [
      {
        path: 'home',
        name: 'JapanHome',
        component: () => import('@/views/Japan/home/home.vue'),
        meta: { title: '海策数据-日本站首页', source: 'jp' }
      },
      {
        path: 'case',
        name: 'JapanCase',
        component: () => import('@/views/Japan/case/case2.vue'),
        meta: { title: '海策数据-日本站案例库', source: 'jp' }
      },
      {
        path: '/japan/details',
        name: 'Details',
        component: () => import('@/views/Japan/case/details/details.vue'),
        meta: { title: '海策数据-日本站案例库详情页', source: 'jp' }
      }
    ]
  }

]
module.exports = jpRouter
