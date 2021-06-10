import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    meta: { title: '' }
  },
  {
    path: '/b2',
    name: 'b2',
    component: () => import('@/views/b2.vue'),
    meta: { title: 'b2' }
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
