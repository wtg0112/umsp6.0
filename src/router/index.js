import Vue from 'vue'
import VueRouter from 'vue-router'
import homeMessage from './homeMessage' // 国内短信
import wechatMessage from './wechatMessage' // 微信消息
import appPush from './appPush' // APP推送
import monitorManager from './monitorManager' // 监控管理
import mailMessage from './mailMessage' // 邮件消息
import fiveGenerationMessage from './fiveGenerationMessage' // 5G消息

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '首页',
        component: () => import('@/views/home.vue'),
        meta: { title: '首页' }
      },
      ...homeMessage,
      ...wechatMessage,
      ...appPush,
      ...monitorManager,
      ...mailMessage,
      ...fiveGenerationMessage
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // console.log(to)
  next()
})
export default router
