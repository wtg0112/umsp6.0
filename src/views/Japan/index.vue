<template>
  <div class="index">
    <Header :router='router'></Header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
export default {
  components: { Header },
  data () {
    return {
      router: [
        { path: '/japan/home', name: '首页' },
        { path: '/japan/case', name: '列表' }
      ]
    }
  },
  created () {
  }
}
</script>

<style scopde lang="scss">
.index{
  padding-top: 60px;
}
</style>
