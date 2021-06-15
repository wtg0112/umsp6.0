const homeMessage = [
  {
    path: '/homeMessage/fastSend',
    name: 'fastSend',
    component: () => import('@/views/homeMessage/fastSend'),
    meta: { title: '快速发送' }
  },
  {
    path: '/homeMessage/weekQuery',
    name: 'weekQuery',
    component: () => import('@/views/homeMessage/weekQuery'),
    meta: { title: '近7天查询' }
  }
]
module.exports = homeMessage
