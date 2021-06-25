const wechatMessage = [
  {
    path: '/wechatMessage',
    name: 'wechatMessage',
    component: () => import('@/views/wechatMessage'),
    meta: {title: '微信消息' },
    icon: 'iconfont icon-weixin',
    children: [
      {
        path: 'templateManage',
        name: 'templateManage',
        component: () => import('@/views/wechatMessage/templateManage'),
        meta: { title: '模板管理' }
      },
      {
        path: 'wechatSend',
        name: 'wechatSend',
        component: () => import('@/views/wechatMessage/wechatSend'),
        meta: { title: '微信发送' }
      },
      {
        path: 'logQuery',
        name: 'logQuery',
        component: () => import('@/views/wechatMessage/logQuery'),
        meta: { title: '日志查询' }
      },
      {
        path: 'wechatStatistic',
        name: 'wechatStatistic',
        component: () => import('@/views/wechatMessage/wechatStatistic'),
        meta: { title: '微信统计' }
      },
    ]
  }
]

export default wechatMessage
