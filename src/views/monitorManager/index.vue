<template>
  <keep-alive :include="cachedViews">
     <router-view ></router-view>
</keep-alive>
</template>

<script>
export default {
  name: 'monitorManager',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  }
}
</script>
