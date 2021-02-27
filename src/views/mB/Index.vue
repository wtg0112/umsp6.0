<template>
  <div>
    <leftNav :list="list"></leftNav>
    <div id="contain" :class="[noleft]">
      <router-view />
    </div>
  </div>
</template>
<script>
import leftNav from '@/components/leftNav/leftNav.vue'
export default {
  components: {
    leftNav
  },
  data () {
    return {
      noleft: false,
      list: [
        {
          title: ' 美国本科案例 连续八年大满贯 ',
          url: '/meiben',
          pic: require('../../views/mB/image/home/i1.png'),
          pic_on: require('../../views/mB/image/home/i11.png')
        },
        {
          title: ' 美国本科 专业及院校录取数据 ',
          url: '/meiben/major',
          pic: require('../../views/mB/image/home/i2.png'),
          pic_on: require('../../views/mB/image/home/i22.png')
        },
        {
          title: '学生背景数据统计',
          url: '/meiben/data',
          pic: require('../../views/mB/image/home/i3.png'),
          pic_on: require('../../views/mB/image/home/i33.png')
        },
        {
          title: ' 美国本科 申请需求分析 ',
          url: '/meiben/offer',
          pic: require('../../views/mB/image/home/i4.png'),
          pic_on: require('../../views/mB/image/home/i44.png')
        },
        {
          title: '列表',
          url: '/meiben/case',
          pic: require('../../views/mB/image/home/i5.png'),
          pic_on: require('../../views/mB/image/home/i55.png')
        }
      ]
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {

  },
  computed: {

  }
}
</script>
<style scoped lang="scss">
#contain{
  margin-left: 1rem;
  width: calc(100% - 1rem);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  z-index: 998;
  /deep/ .content{
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 0.2rem 0.5rem 0.3rem;
    box-sizing: border-box;
    & > .box{
      width: 100%;
      position: relative;
      margin: 0 auto;
      z-index: 2;
    }
    & > .title{
      color: #343471;
      font-size: 0.4rem;
      font-weight: bold;
      line-height: 0.54rem;
      position: relative;
      z-index: 2;
    }
    .fl{
      float: left;
      position: relative;
    }
    .fr{
      float: right;
      position: relative;
    }
    .clearfix{
      &::before,
      &::after{
        display: table;
        content: " ";
      }
      &::after{
        clear: both;
      }
    }
  }
}
</style>
