<template>
  <div class="home">
    <modul1></modul1>
    <modul2></modul2>
    <modul3></modul3>
    <modul4></modul4>
    <modul5></modul5>
  </div>
</template>

<script>
import modul1 from './components/modul1/modul1.vue'
import modul2 from './components/modul2/modul2.vue'
import modul3 from './components/modul3/modul3.vue'
import modul4 from './components/modul4/modul4.vue'
import modul5 from './components/modul5/modul5.vue'
export default {
  components: { modul1, modul2, modul3, modul4, modul5 },
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>

<style scopde lang="scss">
.home{
  background: #F5F6FB;
  overflow: hidden;
}
</style>
