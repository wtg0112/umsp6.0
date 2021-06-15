import Vue from 'vue'
import VueRouter from 'vue-router'
import homeMessage from './homeMessage' // 国内发送

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    meta: { title: '首页' }
  },
  ...homeMessage
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // console.log(to)
  next()
})
export default router
