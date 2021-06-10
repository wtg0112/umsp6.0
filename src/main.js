import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

// 全局过滤器
import '@/filters/filters.js'

// 动效js文件
// import './utils/pageScrolling'
Vue.config.productionTip = false
Vue.use(ElementUI)

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
