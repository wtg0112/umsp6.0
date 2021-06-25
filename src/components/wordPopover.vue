<template>
  <div>
    <el-popover
      placement="bottom-start"
      width="200"
      trigger="hover"
      :content="str"
      v-if="str.length > 50"
    >
      <span slot="reference">{{ cutStr }}</span>
    </el-popover>
    <span v-else>{{ str }}</span>
  </div>
</template>
<script>
export default {
  props: ['str'],
  data() {
    return {
      cutStr: ''
    }
  },
  created() {
    let str = this.str
    this.cutStr = str.substring(0,50) + "..."
    console.log(this.cutStr)
  }
}
</script>
