<template>
  <div class="pagination-container">
    <router-link
      :to="{ name: item }"
      v-for="(item, index) in tags"
      :key="item"
    >
      <el-tag
        :closable="tags.length > 1 ? true : false"
        @close.prevent="tagClose(index)"
      >
        {{ item }}
      </el-tag>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tags: []
    }
  },
  created() {
    this.tags.push( this.$route.name )
  },
  methods: {
    tagClose(index) {
      this.tags.splice(index, 1)
    }
  },
  // 列表页面的activated
// activated() {
//  if(!this.$route.meta.isUseCache){ //isUseCache 时添加中router中的元信息，判读是否要缓存
//     this.tags = [] //清空原有数据
//     this.onload() // 重新加载
//   }
//  this.$route.meta.isUseCache = false // 通过这个控制刷新
// },
  watch: {
    $route(to, from) {
      console.log(this.$route)
      if(this.tags.indexOf(to.name) == -1) {
        this.tags.push( to.name )
        this.$route.meta.keepAlive = true
      }
    }
  }
}
</script>

<style lang="scss">
.pagination-container {
  width: 100%;
}
.pagination {
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
</style>
