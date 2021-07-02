import Vue from 'vue'
import VueRouter from 'vue-router'
import homeMessage from './homeMessage' // 国内短信
import wechatMessage from './wechatMessage' // 微信消息
import appPush from './appPush' // APP推送
import monitorManager from './monitorManager' // 监控管理
import mailMessage from './mailMessage' // 邮件消息
import fiveGenerationMessage from './fiveGenerationMessage' // 5G消息
import sendManager from './sendManager'
import unifiedManage from './unifiedManage' // 统一管理

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
        meta: { title: '首页',affix: true } //affix: true首页标签不能关闭固定展示
      },
      ...homeMessage,
      ...sendManager,
      ...wechatMessage,
      ...appPush,
      ...monitorManager,
      ...mailMessage,
      ...fiveGenerationMessage,
      ...unifiedManage
    ]
  }
]

const router = new VueRouter({
  routes
})
////路由导航冗余报错（路由重复,解决点击首页标签关闭报错）
const originalPush = VueRouter.prototype.push
	VueRouter.prototype.push = function push(location) {
	   return originalPush.call(this, location).catch(err => err)
	}
router.beforeEach((to, from, next) => {
  // console.log(to)
  next()
})
export default router
