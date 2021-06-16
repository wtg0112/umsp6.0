<template>
  <div id="app">
    <topHead />
    <leftMenu :list="list" v-if="list[0].menuList" />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import leftMenu from '@/components/leftMenu'
import topHead from '@/components/topHead'
export default {
  components: {
    leftMenu,
    topHead
  },
  data () {
    return {
      list: [
        {
          tit: '国内短信',
          icon: 'iconfont icon-duanxin4',
          menuList: []
        }
      ]
    }
  },
  created () {
    this.$router.options.routes.shift()
    console.log(this.$router.options.routes)
    this.list[0].menuList = this.$router.options.routes
  }
}
</script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  position: relative;
  font-size: 14px;
  // font-family: tahoma, arial, 'Hiragino Sans GB', '\5b8b\4f53', sans-serif;
    h3, p{
      margin: 0;
    }
}
#app {
  width: 100%;
  height: 100%;
  position: relative;
}
.container{
  height: 100%;
  height: 100%;
  position: relative;
  padding: 50px 0 0 200px;
  box-sizing: border-box;
}
</style>
