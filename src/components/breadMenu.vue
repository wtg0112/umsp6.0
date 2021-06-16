<template>
 <div class="breadcrumb-container">
    <el-breadcrumb separator=">" class="breadcrumb-inner">
      <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index">
          <div v-if="index !== 0 && item.name" :to="{ path: item.path }">
            <i :class="index==1?'el-icon-message':''" style="font-size: 10px;margin-right:6px"></i>{{$route.matched[0].name }}
            <span>></span>
            <span>{{ item.name }}</span>
        </div>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
    .breadcrumb {
      height: 50px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      background-color: #fff;
      font-size: 16px;
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
      padding-top:10px;
      padding-left:10px;
    }
</style>
