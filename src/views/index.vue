<template>
  <div>
    <topHead :name="'平台超级管理员'" />
    <leftMenu :list="list"  :openPath="openPath"  :currentPath="currentPath" v-if="list[0].menuList" @itemClick="cpnClick"/>
    <div class="container" :class="{hasTagsView:needTagsView}"  :style="isCollapse ? 'padding-left: 64px;' : ''">
      <el-row style="margin: 10px 0;" :gutter="20">
        <el-col :span="24">
          <!-- 分页 -->
          <!-- <div class="pagination">
            <pagination />
          </div> -->
           
          <!-- 面包屑 -->
          <div class="breadcrumb">
            <breadMenu />
          </div>
            <tags-view v-if="needTagsView" />
         
          <!-- 标题 -->
          <!-- <div
            class="breadcrumb"
            v-if="$route.name != '首页'"
            style="margin-bottom: 0px; box-shadow: none; border-radius: 0px; border-bottom: 2px solid #eee;"
          >
            <topTitle />
          </div> -->
            <app-main />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import leftMenu from '@/components/leftMenu'
import pagination from '@/components/pagination'
import tagsView from '@/components/tagsView'
import appMain from '@/components/AppMain'
import breadMenu from '@/components/breadcrumb'
import topHead from '@/components/topHead'
import homeMessage from '@/router/homeMessage'
import topTitle from '../components/topTitle.vue'
import { mapState } from 'vuex'
export default {
  components: {
    pagination,
    tagsView,
    leftMenu,
    topHead,
    breadMenu,
    topTitle,
    appMain
  },
    computed: {
   
  },
    computed: {
    ...mapState({needTagsView: state => state.settings.tagsView}),
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
      isCollapse: false, // 是否折叠
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
      },
      cpnClick(item) {
       this.isCollapse = item
      }
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
</style>
