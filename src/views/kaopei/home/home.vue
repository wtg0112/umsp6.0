<template>
  <div class="kaopei">
    <modul1></modul1>
    <modul2></modul2>
    <modul3></modul3>
    <modul4></modul4>
  </div>
</template>

<script>
import modul1 from './components/modul1/modul1'
import modul2 from './components/modul2/modul2'
import modul3 from './components/modul3/modul3'
import modul4 from './components/modul4/modul4'
export default {
  components: { modul1, modul2, modul3, modul4 }
}
</script>

<style lang='scss' scoped>
  .kaopei{
    background: #F5F6FB;
  }
</style>
