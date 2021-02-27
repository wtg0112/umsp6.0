import Vue from 'vue'
import VueRouter from 'vue-router'
import cookies from '@/utils/cookie'

import jpRouter from './jp/jp' // 日本库路由
import mbRouter from './mB/mB' // 美本路由
import mbRouter3 from './meiben/meiben' // 美本路由
import myRouter from './meiyan/meiyan' // 美研路由
import mgRouter from './meigao/meigao' // 美高路由
import ygRouter from './yingguo/yingguo' // 英国路由
import kpRouter from './kaopei/kaopei' // 考培库路由
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: { title: '海策数据-登录' }
  },
  ...jpRouter, // 日本库路由
  ...mbRouter, // 美本
  ...myRouter, // 美研
  ...mgRouter, // 美高
  ...ygRouter, // 英国
  ...mbRouter3, // 美本新版
  ...kpRouter // 美本新版
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.query.share) {
    cookies.set('share', to.query.share)
  }
  if (to.meta.source) {
    cookies.set('source', to.meta.source)
  }
  next()
})
export default router
