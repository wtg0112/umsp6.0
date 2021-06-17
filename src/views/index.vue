<template>
  <div>
    <topHead />
    <leftMenu :list="list" v-if="list[0].menuList" />
    <div class="container">
      <el-row style="margin: 10px 0" :gutter="20">
        <el-col :span="24">
          <!-- 面包屑 -->
          <div class="breadcrumb">
            <breadMenu />
          </div>
          <!-- 标题 -->
          <div class="breadcrumb" style="margin-bottom:0px;box-shadow:none;border-radius:0px;border-bottom:2px solid #eee">
             <topTitle/>
          </div>
          <router-view />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import leftMenu from '@/components/leftMenu'
import breadMenu from '@/components/breadcrumb'
import topHead from '@/components/topHead'
import homeMessage from '@/router/homeMessage'
import topTitle from '../components/topTitle.vue'
export default {
  components: {
    leftMenu,
    topHead,
    breadMenu,
    topTitle
  },
  data() {
    return {
      list: [
        {
          tit: '国内短信',
          icon: 'iconfont icon-duanxin4',
          menuList: [...homeMessage[0].children],
        },
      ],
      titleList:{
        txtList:[...homeMessage[0].children],
        otherTip:homeMessage[0].children.tips?[...homeMessage[0].children.tips]:[]
      }
    }
  },
  created() { console.log(this.$route)},
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  height: 100%;
  position: relative;
  padding: 50px 0 0 200px;
  box-sizing: border-box;
}
</style>
