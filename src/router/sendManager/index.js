const sendManager = [
  {
    path: '/sendManager',
    name: 'sendManager',
    component: () => import('@/views/sendManager'),
    meta: {title: '发送管理' },
    icon: 'iconfont icon-youjian1',
    children: [
      {
        path: 'unifiedSend',
        name: 'unifiedSend',
        component: () => import('@/views/sendManager/unifiedSend'),
        meta: { title: '统一发送' }
      }
    ]
  }
]

export default sendManager
