<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator=">" class="breadcrumb-inner">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        v-show="index === $route.matched.length - 1 && item.name"
      >
        <span style="font-size:18px;font-weight:700;color:#555">{{ item.name }}</span>
        <!-- <span v-if="item.tips" style="font-size:14px;color:#555">({{item.tips}})</span> -->
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
    console.log(this.$route)
  },
}
</script>

<style lang="scss" scoped>
.breadcrumb-container{
  width:100%;
}
.breadcrumb {
  width:100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background-color: #fff;
  font-size: 16px;
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  margin-bottom: 10px;
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
