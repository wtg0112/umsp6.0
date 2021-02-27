const Myrouter = [
  {
    path: '/meiyan',
    name: 'meiyan',
    redirect: '/meiyan/home',
    component: () => import('@/views/meiyan/index.vue'),
    children: [
      {
        path: 'home',
        name: 'MeiyanHome',
        component: () => import('@/views/meiyan/home/home.vue'),
        meta: { title: '海策数据-美研首页', source: 'usamy' }
      },
      {
        path: 'case',
        name: 'MeiyanCase',
        component: () => import('@/views/meiyan/case/case.vue'),
        meta: { title: '海策数据-美研案例库', source: 'usamy' }
      },
      {
        path: '/meiyan/details',
        name: 'Details',
        component: () => import('@/views/meiyan/details/details.vue'),
        meta: { title: '海策数据-美研案例详情页', source: 'usamy' }
      }
    ]
  }

]
module.exports = Myrouter
