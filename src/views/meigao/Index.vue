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
          title: ' 美国高中案例 连续八年大满贯 ',
          url: '/meigao/home',
          pic: require('../../views/mB/image/home/i1.png'),
          pic_on: require('../../views/mB/image/home/i11.png')
        },
        {
          title: ' 美国高中 专业及院校录取数据 ',
          url: '/meigao/major',
          pic: require('../../views/mB/image/home/i2.png'),
          pic_on: require('../../views/mB/image/home/i22.png')
        },
        {
          title: '学生背景数据统计',
          url: '/meigao/data',
          pic: require('../../views/mB/image/home/i3.png'),
          pic_on: require('../../views/mB/image/home/i33.png')
        },
        {
          title: ' 美国高中 申请需求分析 ',
          url: '/meigao/offer',
          pic: require('../../views/mB/image/home/i4.png'),
          pic_on: require('../../views/mB/image/home/i44.png')
        },
        {
          title: '列表',
          url: '/meigao/case',
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
<style lang="scss" scoped>
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
    .logo{
      width: 0.96rem;
      // width: 96px;
      display: block;
      margin-bottom: 0.2rem;
    }
    & > .box{
      width: 100%;
      position: relative;
      margin: 0 auto;
      z-index: 2;
      .boxfl {
        margin-bottom: 30px;
      }
    }
    & > .title{
      color: #343471;
      font-size: 0.4rem;
      font-weight: bold;
      margin-bottom: .2rem;
      line-height: 0.54rem;
      line-height: 1;
      position: relative;
      z-index: 2;
      p{
        color: #343471;
        font-weight: normal;
        font-size: .28rem;
        margin-top: .1rem;
      }
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
