const Myrouter = [
  {
    path: '/meiben',
    name: 'meiben',
    redirect: '/meiben/home',
    component: () => import('@/views/meiben/index.vue'),
    children: [
      {
        path: 'home',
        name: 'meibenHome',
        component: () => import('@/views/meiben/home/home.vue'),
        meta: { title: '海策数据-美本首页', source: 'usabk' }
      },
      {
        path: 'case',
        name: 'meibenCase',
        component: () => import('@/views/meiben/case/case.vue'),
        meta: { title: '海策数据-美本案例库', source: 'usabk' }
      },
      {
        path: '/meiben/details',
        name: 'Details',
        component: () => import('@/views/meiben/details/details.vue'),
        meta: { title: '海策数据-美本案例详情页', source: 'usabk' }
      }
    ]
  }

]
module.exports = Myrouter
