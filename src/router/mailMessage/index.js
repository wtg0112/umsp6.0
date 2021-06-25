const mailMessage = [
  {
    path: '/mailMessage',
    name: 'mailMessage',
    component: () => import('@/views/mailMessage'),
    meta: {title: '邮件消息' },
    icon: 'iconfont icon-youjian',
    children: [
      {
        path: 'mailSend',
        name: 'mailSend',
        component: () => import('@/views/mailMessage/mailSend'),
        meta: { title: '邮件发送' }
      }
    ]
  }
]

export default mailMessage
