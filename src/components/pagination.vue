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
  watch: {
    $route(to, from) {
      console.log(this.$route)
      if(this.tags.indexOf(to.name) == -1) {
        this.tags.push( to.name )
        this.$route.meta.keepAlive = true
      }
    }
  }
  //     $route(to, from) {
  //     // 如果要to(进入)的页面是需要keepAlive缓存的，把name push进include数组中
  //     if (to.meta.keepAlive) {
  //       !this.include.includes(to.name) && this.include.push(to.name);
  //     }
  //     // 如果 要 form(离开) 的页面是 keepAlive缓存的，
  //     // 再根据 deepth 来判断是前进还是后退
  //     // 如果是后退：
  //     if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
  //       const index = this.include.indexOf(from.name);
  //       index !== -1 && this.include.splice(index, 1);
  //     }
  //   }
  // }
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
