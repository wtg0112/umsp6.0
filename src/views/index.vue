<template>
  <div>
    <topHead :name="'平台超级管理员'" />
    <leftMenu :list="list"  :openPath="openPath"  :currentPath="currentPath" v-if="list[0].menuList" />
    <div class="container">
      <el-row style="margin: 10px 0;" :gutter="20">
        <el-col :span="24">
          <!-- 面包屑 -->
          <div class="breadcrumb">
            <breadMenu />
          </div>
          <!-- 标题 -->
          <div
            class="breadcrumb"
            v-if="$route.name != '首页'"
            style="margin-bottom: 0px; box-shadow: none; border-radius: 0px; border-bottom: 2px solid #eee;"
          >
            <topTitle />
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
          menuList: [...homeMessage[0].children]
        }
      ],
      openPath:[],
      currentPath:this.$route.name
    }
  },
  watch:{
    '$route':'getPath'
  },
  methods:{
      getPath(){
        if(this.$route.name=='首页'){
          this.openPath=[]
          this.currentPath=null
        }
      }
 },
  created() {}
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
