const homeMessage = [
  {
    path: '/homeMessage',
    name: '国内短信',
    component: () => import('@/views/homeMessage'),
    meta: { title: '国内短信' },
    children: [
      {
        path: 'fastSend',
        name: '快速发送',
        component: () => import('@/views/homeMessage/fastSend'),
        meta: { keepAlive: true, title: '快速发送' },
        tips:'最多1000个手机号'
      },
      {
        path: 'templateSend',
        name: '模板发送',
        component: () => import('@/views/homeMessage/templateSend'),
        meta: { keepAlive: true, title: '模板发送' }
      },
      {
        path: 'fileSend',
        name: '文件发送',
        component: () => import('@/views/homeMessage/fileSend'),
        meta: { keepAlive: true, title: '文件发送' },
        tips:'建议：任务名称不能相同'
      },
      {
        path: 'weekQuery',
        name: '近7天查询',
        component: () => import('@/views/homeMessage/weekQuery'),
        meta: { keepAlive: true, title: '近7天查询' }
      },
      {
        path: 'historyQuery',
        name: '历史查询',
        component: () => import('@/views/homeMessage/historyQuery'),
        meta: { keepAlive: true, title: '历史查询' }
      },
      {
        path: 'upSearch',
        name: '上行查询',
        component: () => import('@/views/homeMessage/upSearch'),
        meta: { keepAlive: true, title: '上行查询' }
      },
      {
        path: 'errorSearch',
        name: '异常查询',
        component: () => import('@/views/homeMessage/errorSearch'),
        meta: { keepAlive: true, title: '异常查询' }
      },
      {
        path: 'organStatistic',
        name: '按机构统计',
        component: () => import('@/views/homeMessage/organStatistic'),
        meta: { keepAlive: true, title: '按机构统计' }
      },
      {
        path: 'operatorStatistic',
        name: '按操作员统计',
        component: () => import('@/views/homeMessage/operatorStatistic'),
        meta: { keepAlive: true, title: '按操作员统计' }
      },
      {
        path: 'accessStatistic',
        name: '按通道统计',
        component: () => import('@/views/homeMessage/accessStatistic'),
        meta: { keepAlive: true, title: '按通道统计' }
      },
      {
        path: 'channelStatistic',
        name: '按渠道统计',
        component: () => import('@/views/homeMessage/channelStatistic'),
        meta: { keepAlive: true, title: '按渠道统计' }
      },
      {
        path: 'accountRun',
        name: '对账重跑',
        component: () => import('@/views/homeMessage/accountRun'),
        meta: { keepAlive: true, title: '对账重跑' }
      }
    ]
  }
]
// module.exports = homeMessage

export default homeMessage
