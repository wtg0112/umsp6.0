import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import scroll from 'vue-seamless-scroll'

import 'element-ui/lib/theme-chalk/index.css'
import 'wowjs/css/libs/animate.css'
import './assets/scss/public.scss'
import ElementUI from 'element-ui'

// 全局过滤器
import '@/filters/filters.js'

// 进度条插件
import VueProgress from 'vue-progress'
// 复制到粘贴板插件
import VueClipboard from 'vue-clipboard2'

// 动效js文件
// import './utils/pageScrolling'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(scroll)
// progress 进度条插件
Vue.use(VueProgress)
// 复制到粘贴板插件
Vue.use(VueClipboard)
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
