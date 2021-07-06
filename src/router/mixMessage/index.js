const mixMessage = [
    {
      path: '/mixMessage',
      name: 'mixMessage',
      component: () => import('@/views/mixMessage'),
      meta: {title: '融合消息' },
      icon: 'iconfont icon-jiankong1',
      children: [
        {
          path: 'moduleManage',
          name: 'moduleManage',
          component: () => import('@/views/mixMessage/moduleManage'),
          meta: { title: '模板管理' }
        },
        {
            path: 'unifySend',
            name: 'unifySend',
            component: () => import('@/views/mixMessage/unifySend'),
            meta: { title: '统一发送' }
        }
      ]
    }
  ]
  
  export default mixMessage
  