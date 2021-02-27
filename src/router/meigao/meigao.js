const Mgrouter = [
  {
    path: '/meigao',
    name: 'Meigao',
    redirect: '/meigao/home',
    component: () => import('@/views/meigao/Index.vue'),
    children: [
      {
        path: 'home',
        name: 'MeigaoHome',
        component: () =>
          import('@/views/meigao/home/components/module1/module1.vue'),
        meta: { title: '海策数据-美高首页', source: 'usagz' }
      },
      {
        path: 'major',
        name: 'MeigaoMajor',
        component: () =>
          import('@/views/meigao/home/components/module2/module2.vue'),
        meta: { title: '海策数据-美高-专业', source: 'usagz' }
      },
      {
        path: 'data',
        name: 'MeigaoData',
        component: () =>
          import('@/views/meigao/home/components/module3/module3.vue'),
        meta: { title: '海策数据-美高-数据', source: 'usagz' }
      },
      {
        path: 'offer',
        name: 'MeigaoOffer',
        component: () =>
          import('@/views/meigao/home/components/module4/module4.vue'),
        meta: { title: '海策数据-美高-需求', source: 'usagz' }
      },
      {
        path: 'case',
        name: 'MeigaoCase',
        component: () => import('@/views/meigao/case/Index.vue'),
        meta: { title: '海策数据-美高-案例', source: 'usagz' }
      },
      {
        path: '/meigao/details',
        name: 'Details',
        component: () => import('@/views/meigao/details/details.vue'),
        meta: { title: '海策数据-美高案例详情页', source: 'usagz' }
      }
    ]
  }
]
module.exports = Mgrouter
