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
        path: '/homeMessage/fileSend',
        name: 'fileSend',
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
        path: '/homeMessage/upSearch',
        name: 'upSearch',
        component: () => import('@/views/homeMessage/upSearch'),
        meta: { title: '上行查询' }
      },
    ]
  }
]
// module.exports = homeMessage

export default homeMessage
