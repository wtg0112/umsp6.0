<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator=">" class="breadcrumb-inner">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        v-show="index === $route.matched.length - 1 && item.name"
      >
        <i
          :class="index == 2 ? 'iconfont icon-V' : ''"
          style="font-size: 15px; margin-right: 6px"
        ></i>
        <template v-if="item.path !== '/home'">
          <span>{{ $route.matched[1].meta.title }}</span>
          <span> > </span>
        </template>
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {

  },
}
</script>

<style lang="scss">
.breadcrumb-container{
  width:100%;
}
.breadcrumb {
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background-color: #fff;
  font-size: 16px;
  // box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1);
  // border-radius: 6px;
  border-bottom:1px solid #f0f0f0;
  // margin-bottom: 10px;
}
.avue-menu {
  position: absolute;
  width: 160px;
  top: 0;
  left: 0;
  min-height: 100%;
  background-color: #fff;
}
.page-container {
  padding-top: 10px;
  padding-left: 10px;
}
</style>
