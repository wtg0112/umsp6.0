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
  data () {
    return {
      router: [
        { path: '/meiyan/home', name: '首页' },
        { path: '/meiyan/case', name: '列表' }
      ]
    }
  },
  components: { Header },
  created () {
  }
}
</script>

<style scoped lang="scss">
.index{
  padding-top: 60px;
}
</style>
