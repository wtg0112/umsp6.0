const homeMessage = [
  {
    path: '/homeMessage',
    name: 'homeMessage',
    component: () => import('@/views/homeMessage'),
    meta: {title: '国内短信' },
    icon: 'iconfont icon-duanxin4',
    children: [
      {
        path: 'fastSend',
        name: 'fastSend',
        component: () => import('@/views/homeMessage/fastSend'),
        meta: { title: '快速发送' },
        tips:'最多1000个手机号'
      },
      {
        path: 'templateSend',
        name: 'templateSend',
        component: () => import('@/views/homeMessage/templateSend'),
        meta: {title: '模板发送' }
      },
      {
        path: 'fileSend',
        name: 'fileSend',
        component: () => import('@/views/homeMessage/fileSend'),
        meta: { title: '文件发送' },
        tips:'建议：任务名称不能相同'
      },
      {
        path: 'weekQuery',
        name: 'weekQuery',
        component: () => import('@/views/homeMessage/weekQuery'),
        meta: {title: '近7天查询' }
      },
      {
        path: 'historyQuery',
        name: 'historyQuery',
        component: () => import('@/views/homeMessage/historyQuery'),
        meta: {title: '历史查询' }
      },
      {
        path: 'upSearch',
        name: 'upSearch',
        component: () => import('@/views/homeMessage/upSearch'),
        meta: {title: '上行查询' }
      },
      {
        path: 'errorSearch',
        name: 'errorSearch',
        component: () => import('@/views/homeMessage/errorSearch'),
        meta: {title: '异常查询' }
      },
      {
        path: 'organStatistic',
        name: 'organStatistic',
        component: () => import('@/views/homeMessage/organStatistic'),
        meta: {title: '按机构统计' }
      },
      {
        path: 'operatorStatistic',
        name: 'operatorStatistic',
        component: () => import('@/views/homeMessage/operatorStatistic'),
        meta: {title: '按操作员统计' }
      },
      {
        path: 'accessStatistic',
        name: 'accessStatistic',
        component: () => import('@/views/homeMessage/accessStatistic'),
        meta: {title: '按通道统计' }
      },
      {
        path: 'channelStatistic',
        name: 'channelStatistic',
        component: () => import('@/views/homeMessage/channelStatistic'),
        meta: {title: '按渠道统计' }
      },
      {
        path: 'accountRun',
        name: 'accountRun',
        component: () => import('@/views/homeMessage/accountRun'),
        meta: {title: '对账重跑' }
      }
    ]
  }
]
// module.exports = homeMessage

export default homeMessage
