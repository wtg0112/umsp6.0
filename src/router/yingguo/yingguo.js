const YgRouter = [
  {
    path: '/yingguo',
    name: 'yingguo',
    redirect: '/yingguo/home',
    component: () => import('@/views/yingguo/index.vue'),
    children: [
      {
        path: 'home',
        name: 'YingguoHome',
        component: () => import('@/views/yingguo/home/home.vue'),
        meta: { title: '海策数据-英国首页', source: 'uk' }
      },
      {
        path: 'case',
        name: 'YingguoCase',
        component: () => import('@/views/yingguo/case/case.vue'),
        meta: { title: '海策数据-英国案例库', source: 'uk' }
      },
      {
        path: '/yingguo/details',
        name: 'Details',
        component: () => import('@/views/yingguo/details/details.vue'),
        meta: { title: '海策数据-英国案例详情页', source: 'uk' }
      }
    ]
  }

]
module.exports = YgRouter
