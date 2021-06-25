<template>
  <div class="menu">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <!-- default-active="1-4-1" -->
    <el-menu
      :default-openeds="openPath"
      :default-active="activeRoute ? activeRoute : currentPath"
      class="el-menu-vertical-demo"
      :collapse="iscollapse"
      :unique-opened="true"
      :collapse-transition="false"
      mode="vertical"
    >
      <el-submenu
        v-for="(item, index) in list"
        :key="index"
        :index="index + 1 + ''"
      >
        <template slot="title">
          <i :class="item.icon" style="margin-right: 10px; color: #303133;"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </template>
        <router-link
          :to="{ name: menu.name }"
          v-for="(menu, menuList) in item.children"
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
      default: () => {
        return []
      }
    },
    openPath: {
      type: Array,
      default: () => {
        return []
      }
    },
    currentPath: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iscollapse() {
      return !this.isActive
    }
  },
  data() {
    return {
      activeRoute: null
    }
  },
  methods: {},
  watch: {
    $route(to, from) {
      this.activeRoute = to.name
    }
  }
}
</script>
<style lang="scss" scoped>
.menu {
  // width: 200px;
  height: calc(100% - 50px);
  position: fixed;
  left: 0px;
  z-index: 2000;
  bottom: 0;
  // border-right: solid 1px #e6e6e6;
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
  overflow-x: hidden;
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: rgba(0, 0, 0, 0);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0);
  }
  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
  }
  & /deep/ .el-menu {
    border-right: 0;
  }
  .btn {
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: right;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    font-size: 24px;
    transition: all 0.3s;
    cursor: pointer;
    z-index: -1;
  }
  &:hover .btn {
    top: -24px;
  }
}

a {
  text-decoration: none;
}
</style>
<style lang="less">
.el-submenu__title:hover,
.el-submenu__title:focus {
  color: #fff;
  background: #62abf5 !important;
  i {
    color: #fff !important;
  }
}
.el-menu-item:focus,
.el-menu-item:hover {
  color: #fff;
  background: #62abf5 !important;
}
</style>
