<template>
  <div>
    <topHead :name="'平台超级管理员'" />
    <leftMenu :list="list"  :openPath="openPath"  :currentPath="currentPath" :isActive="isActive" v-if="list[0].menuList"/>
    <div class="container" :class="{hasTagsView:needTagsView}" :style="isActive ? '' : 'padding-left: 64px;'">
      <el-row style="margin: 10px 0;" :gutter="20">
        <el-col :span="24">
          <!-- 左侧菜单栏折叠 -->
           <collapse id="hamburger-container"  class="hamburger-container" @toggleClick="toggleSideBar" />
          <!-- 面包屑 -->
          <div class="breadcrumb">
            <breadMenu />
          </div>
          <!-- 标签导航 -->
            <tags-view v-if="needTagsView" />
          <!-- 标题 -->
          <!-- <div
            class="breadcrumb"
            v-if="$route.name != '首页'"
            style="margin-bottom: 0px; box-shadow: none; border-radius: 0px; border-bottom: 2px solid #eee;"
          >
            <topTitle />
          </div> -->
            <router-view/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import leftMenu from '@/components/leftMenu'
import tagsView from '@/components/tagsView'
import breadMenu from '@/components/breadcrumb'
import topHead from '@/components/topHead'
import homeMessage from '@/router/homeMessage'
import collapse from '@/components/collapse'
import topTitle from '../components/topTitle.vue'
import { mapState,mapGetters } from 'vuex'
export default {
  components: {
    tagsView,
    leftMenu,
    topHead,
    breadMenu,
    topTitle,
    collapse
  },
    computed: {
   
  },
    computed: {
    ...mapState({needTagsView: state => state.settings.tagsView}),
    ...mapGetters([
      'sidebar'
    ])
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
      currentPath:this.$route.name,
      isActive: true, // 是否折叠
    }
  },
  watch:{
    '$route':'getPath'
  },
  methods:{
       toggleSideBar() {
         this.isActive=!this.isActive
     },
      getPath(){
        if(this.$route.name=='首页'){
          this.openPath=[]
          this.currentPath=null
        }
      },
 },
  created() {},

}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  height: 100%;
  position: relative;
  padding: 50px 0 0 200px;
  transition: all .6s;
}
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
</style>
