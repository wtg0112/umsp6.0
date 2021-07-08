<template>
  <keep-alive :include="cachedViews">
     <router-view ></router-view>
</keep-alive>
</template>

<script>
export default {
  name: 'systemManage',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 8px !important;
}
</style>
