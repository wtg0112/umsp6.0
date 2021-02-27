<template>
  <div class="yingguo">
    <module1></module1>
    <module2></module2>
    <module3></module3>
    <module4></module4>
    <module5></module5>
    <module6></module6>
    <module7></module7>
  </div>
</template>

<script>
import module1 from './components/modul1/modul1'
import module2 from './components/modul2/modul2.vue'
import module3 from './components/modul3/modul3.vue'
import module4 from './components/modul4/modul4.vue'
import module5 from './components/modul5/modul5.vue'
import module6 from './components/modul6/modul6.vue'
import module7 from './components/modul7/modul7.vue'
export default {
  components: { module1, module2, module3, module4, module5, module6, module7 },
  data() {
    return {

    }
  }
}
</script>

<style scoped lang='scss'>

</style>
