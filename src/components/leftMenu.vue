<template>
  <div class="menu">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <!-- default-active="1-4-1" -->
    <el-menu
      :default-openeds="openPath"
      :default-active="currentPath"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :unique-opened="true"
    >
      <el-submenu
        v-for="(item, index) in list"
        :key="index"
        :index="index + 1 + ''"
      >
        <template slot="title">
          <i :class="item.icon" style="margin-right: 10px;color:#303133"></i>
          <span slot="title">{{ item.tit }}</span>
        </template>
        <router-link
          :to="{ name: menu.name }"
          v-for="(menu, menuList) in item.menuList"
          :key="menuList"
        >
          <el-menu-item :index="menu.name">
            {{ menu.meta.title }}
          </el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  props: {
      list: {
        type: Array,
        default: () => { return [] }
      },
      openPath: {
        type: Array,
        default: () => { return [] }
      },
      currentPath:{
        type: String,
        default:''
      }
    },
  data() {
    return {
      isCollapse: false,
    }
  },
  created() {
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>

.menu {
  width: 200px;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 2000;
  top: 0;
  padding-top: 50px;
  box-sizing: border-box;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
    box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1);
  }
}



a {
  text-decoration: none;
}
</style>
<style lang="less">
.el-submenu__title:hover,.el-submenu__title:focus{
   color:#fff;
   background:#62abf5 !important;
   i{
     color:#fff !important;
   }
}
.el-menu-item:focus,
.el-menu-item:hover {
  color:#fff;
  background:#62abf5 !important;
}
</style>
