const homeMessage = [
  {
    path: '/homeMessage',
    name: '国内发送',
    component: () => import('@/views/homeMessage'),
    meta: { title: '国内发送' },
    children: [
      {
        path: 'fastSend',
        name: '快速发送',
        component: () => import('@/views/homeMessage/fastSend'),
        meta: { title: '快速发送' }
      },
      {
        path: 'fileSend',
        name: '文件发送',
        component: () => import('@/views/homeMessage/fileSend'),
        meta: { title: '文件发送' }
      },
      {
        path: 'weekQuery',
        name: '近7天查询',
        component: () => import('@/views/homeMessage/weekQuery'),
        meta: { title: '近7天查询' }
      },
      {
        path: 'upSearch',
        name: '上行查询',
        component: () => import('@/views/homeMessage/upSearch'),
        meta: { title: '上行查询' }
      },
      {
        path: 'errorSearch',
        name: '异常查询',
        component: () => import('@/views/homeMessage/errorSearch'),
        meta: { title: '异常查询' }
      },
      {
        path: 'accessStatistic',
        name: '按通道统计',
        component: () => import('@/views/homeMessage/accessStatistic'),
        meta: { title: '按通道统计' }
      },
      {
        path: 'channelStatistic',
        name: '按渠道统计',
        component: () => import('@/views/homeMessage/channelStatistic'),
        meta: { title: '按渠道统计' }
      },
      {
        path: 'accountRun',
        name: '对账重跑',
        component: () => import('@/views/homeMessage/accountRun'),
        meta: { title: '对账重跑' }
      }
    ]
  }
]
// module.exports = homeMessage

export default homeMessage
