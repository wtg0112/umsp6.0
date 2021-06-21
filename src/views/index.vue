<template>
  <div>
    <topHead :name="'平台超级管理员'" />
    <leftMenu :list="list"  :openPath="openPath"  :currentPath="currentPath" v-if="list[0].menuList" />
    <div class="container">
      <el-row style="margin: 10px 0;" :gutter="20">
        <el-col :span="24">
          <!-- 分页 -->
          <div class="pagination">
            <pagination />
          </div>
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
          <keep-alive>
            <!-- 需要缓存的视图组件 -->
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <!-- 不需要缓存的视图组件 -->
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import leftMenu from '@/components/leftMenu'
import pagination from '@/components/pagination'
import breadMenu from '@/components/breadcrumb'
import topHead from '@/components/topHead'
import homeMessage from '@/router/homeMessage'
import topTitle from '../components/topTitle.vue'
export default {
  components: {
    pagination,
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
<<<<<<< HEAD
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
=======
      titleList: {
        txtList: [...homeMessage[0].children],
        otherTip: homeMessage[0].children.tips
          ? [...homeMessage[0].children.tips]
          : []
      },
      active: this.$route.name
    }
  },
  created() {
    // console.log(this.$route)
  }
>>>>>>> 1ad0a6a63d4a104092d46919603b83dd80af8411
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
