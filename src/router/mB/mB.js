const mbRouter = [
  {
    path: '/meiben2',
    name: 'mB',
    component: () => import('@/views/mB/Index.vue'),
    meta: { title: '海策数据-美本', source: 'usabk' },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/mB/Home/Home.vue'),
        meta: { title: '海策数据-美本-首页', source: 'usabk' }
      },
      {
        path: 'major',
        name: 'Major',
        component: () => import('@/views/mB/Home/Major.vue'),
        meta: { title: '海策数据-美本-专业', source: 'usabk' }
      },
      {
        path: 'data',
        name: 'Data',
        component: () => import('@/views/mB/Home/Data.vue'),
        meta: { title: '海策数据-美本-数据', source: 'usabk' }
      },
      {
        path: 'offer',
        name: 'Offer',
        component: () => import('@/views/mB/Home/Offer.vue'),
        meta: { title: '海策数据-美本-需求', source: 'usabk' }
      },
      {
        path: 'case',
        name: 'Case-mB',
        component: () => import('@/views/mB/case/Index.vue'),
        meta: { title: '海策数据-美本-案例', source: 'usabk' }
      },
      {
        path: 'details',
        name: 'Details-mB',
        component: () => import('@/views/mB/details/Index.vue'),
        meta: { title: '海策数据-美本-详情', source: 'usabk' }
      }
    ]
  }
]
module.exports = mbRouter
