const systemManage = [
  {
    path: '/systemManage',
    name: 'systemManage',
    component: () => import('@/views/systemManage'),
    meta: {title: '系统管理' },
    icon: 'iconfont icon-xitong3',
    children: [
      {
        path: 'organManage',
        name: 'organManage',
        component: () => import('@/views/systemManage/organManage'),
        meta: { title: '机构管理' }
      },
      {
        path: 'departManage',
        name: 'departManage',
        component: () => import('@/views/systemManage/departManage'),
        meta: { title: '部门管理' }
      },
      {
        path: 'channelManage',
        name: 'channelManage',
        component: () => import('@/views/systemManage/channelManage'),
        meta: { title: '渠道管理' }
      },
      {
        path: 'classifyManage',
        name: 'classifyManage',
        component: () => import('@/views/systemManage/classifyManage'),
        meta: { title: '信息分类管理' }
      },
      {
        path: 'signManage',
        name: 'signManage',
        component: () => import('@/views/systemManage/signManage'),
        meta: { title: '签名管理' }
      },
      {
        path: 'userManage',
        name: 'userManage',
        component: () => import('@/views/systemManage/userManage'),
        meta: { title: '用户管理' }
      },
      {
        path: 'roleManage',
        name: 'roleManage',
        component: () => import('@/views/systemManage/roleManage'),
        meta: { title: '角色管理' }
      },
      {
        path: 'disposeManage',
        name: 'disposeManage',
        component: () => import('@/views/systemManage/disposeManage'),
        meta: { title: '配置管理' }
      },
    ]
  }
]

export default systemManage
