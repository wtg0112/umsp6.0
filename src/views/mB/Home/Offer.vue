<template>
  <div :style="'background-color: #EFF1FA; overflow: hidden; height: ' + height_auto + 'px;'">
    <!-- <img src="../image/home/niu.gif" class="niu" :class="niu ? 'on' : ''" alt=""> -->
    <div class="content">
      <img :class="show ? 'on' : ''" src="../image/home/haicelogo.png" alt="" class="logo">
      <div :class="show ? 'on' : ''" class="title">美国本科 <br> 申请需求分析</div>
      <div class="box clearfix">
        <div class="fl" :class="show ? 'on' : ''">
          <p>早申数据对比</p>
          <div class="clearfix clearfix1">
            <div class="fl" v-for="(item, index) in statistics_data" :key="index">
              <el-progress type="circle" :percentage="item.cent" :color="item.color" :stroke-width="options1.strokeWidth" :width="options1.width"></el-progress>
              <p>{{item.num}}</p><br>
              <span>{{item.name}}</span>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>院校排名</th>
                <th>ED申请录</th>
                <th>申请数量</th>
                <th>offer数量</th>
                <th>录取率</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in info" :key="index">
                <td>{{item.tit}}</td>
                <td>{{item.ed}}</td>
                <td>{{item.apply}}</td>
                <td>{{item.offer}}</td>
                <td>{{item.cent}}</td>
              </tr>
            </tbody>
          </table>
          <div class="clearfix clearfix2">
            <div class="fl" v-for="(item, index) in info2" :key="index" :style="'background-color: ' + item.color + ';'">
              <img :src="item.url" alt="">
              <p>{{item.p}}</p>
              <h3>{{item.h3}}</h3>
              <span>规划占比</span>
            </div>
          </div>
        </div>
        <div class="fr" :class="show ? 'on' : ''">
          <img src="../image/home/bg34.png" alt="" class="img1">
          <img src="../image/home/bg35.png" alt="" class="img2">
          <img src="../image/home/bg36.png" alt="" class="img3">
          <img src="../image/home/bg37.png" alt="" class="img4">
          <img src="../image/home/bg38.png" alt="" class="img5">
          <img src="../image/home/bg39.png" alt="" class="img6">
          <img src="../image/home/bg310.png" alt="" class="img7">
          <img src="../image/home/bg35.png" alt="" class="img8">
        </div>
        <div class="percent" :class="show ? 'on' : ''">
          <p>申请占比</p>
          <div>
            <div v-for="(item, index) in apply_data" :key="index">
              <span>{{item.tit}}</span>
              <div>
                <img :src="index1 < item.num ? (index == 1 ? require('../image/home/purple.png') : (index == 2) ? require('../image/home/pink.png') : (index == 3 ? require('../image/home/orange.png') : require('../image/home/green.png'))) : require('../image/home/gray.png')" alt="" v-for="(item1, index1) in 10" :key="index1">
              </div>
              <em>{{item.cent}}</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      height_auto: document.documentElement.clientHeight,
      options1: {
        color: '#59E37E',
        strokeWidth: 6,
        width: 72
      },
      statistics_data: [
        {
          cent: 58,
          num: '92,930',
          name: '常规申请',
          color: '#59E37E'
        },
        {
          cent: 42,
          num: '13230',
          name: '早申请',
          color: '#00A0E9'
        }
      ],
      info: [
        {
          tit: 'TOP30',
          ed: '30%',
          apply: '8-9',
          offer: '3-4',
          cent: '75%'
        },
        {
          tit: 'TOP50',
          ed: '20%',
          apply: '8-9',
          offer: '5-6',
          cent: '95%'
        }
      ],
      info2: [
        {
          url: require('../image/home/bg31.png'),
          p: '三年',
          h3: '58%',
          color: '#8575FF'
        },
        {
          url: require('../image/home/bg32.png'),
          p: '二年',
          h3: '5%',
          color: '#68C8FF'
        },
        {
          url: require('../image/home/bg33.png'),
          p: '一年',
          h3: '14%',
          color: '#F78C68'
        }
      ],
      apply_data: [
        {
          tit: '国际学校',
          num: 4,
          cent: '40%'
        },
        {
          tit: '海外高中',
          num: 4,
          cent: '35%'
        },
        {
          tit: '普通高中',
          num: 1,
          cent: '10%'
        },
        {
          tit: '普高国际版',
          num: 2,
          cent: '15%'
        }
      ],
      niu: false,
      show: false // 控制页面进入动画加载
    }
  },
  mounted () {
    const that = this
    setTimeout(() => {
      that.niu = true
    }, 5000)
    setTimeout(() => {
      that.show = true
    }, 0) // 控制页面进入动画加载
    window.addEventListener('resize', that.resize, false)
    this.statistics_data.forEach((item, index) => {
      this.growPercent(item.cent, 1500, index)
    })
    this.apply_data.forEach((item, index) => {
      this.growPercent1(item.num, 2400 + index * 200, index)
    })
  },
  methods: {
    resize () {
      this.height_auto = document.documentElement.clientHeight
    },
    growPercent (cent, time, index) {
      const that = this
      that.statistics_data[index].cent = 0
      let add = 0
      const old = cent
      setTimeout(() => {
        const setInter = setInterval(() => {
          if (add == old) {
            clearInterval(setInter)
          } else {
            add += 1
            that.statistics_data[index].cent = add
          }
        }, 30)
      }, time)
    },
    growPercent1 (cent, time, index) {
      const that = this
      that.apply_data[index].num = 0
      let add = 0
      const old = cent
      setTimeout(() => {
        const setInter = setInterval(() => {
          if (add == old) {
            clearInterval(setInter)
          } else {
            add += 1
            that.apply_data[index].num = add
          }
        }, 100)
      }, time)
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes hide_opacity{
  0%{
    opacity: 1;
  }
  99%{
    opacity: 0;
  }
  100%{
    z-index: 0;
    display: none;
  }
}
.niu{
    width: 2.6rem;
    position: absolute;
    bottom: 0.1rem;
    left: -.3rem;
    opacity: 0;
    animation: show_opacity .8s 1;
    animation-fill-mode: forwards;
    z-index: 1000;
    &.on{
      animation: hide_opacity 1s 1;
      animation-fill-mode: forwards;
    }
}
.content{
  background: url('../image/home/bg30.png') no-repeat center;
  background-size: cover;
  .logo{
    width: 0.96rem;
    // width: 96px;
    display: block;
    margin-bottom: 0.3rem;
    opacity: 0;
    &.on{
      animation: on_translateX .8s .4s 1;
      animation-fill-mode: forwards;
    }
  }
  .title{
    margin-bottom: 0.5rem;
    opacity: 0;
    &.on{
      animation: on_translateX .8s .8s 1;
      animation-fill-mode: forwards;
    }
  }
  .box{
    & > .fl{
      opacity: 0;
      &.on{
        animation: on_translateX .8s 1.2s 1;
        animation-fill-mode: forwards;
      }
      width: 5.47rem;
      & > p{
        color: #343471;
        font-size: 0.18rem;
        font-weight: bold;
        margin-bottom: 0.3rem;
        margin-top: 0;
      }
      .clearfix1{
        margin-bottom: 0.7rem;
        .fl{
          width: 1.6rem;
          margin-right: 0.6rem;
          /deep/ .el-progress{
            float: left;
            margin-right: 0.16rem;
            /deep/ .el-progress-circle{
              width: .72rem !important;
              height: .72rem !important;
            }
          }
          p{
            color: #383874;
            font-size: 0.2rem;
            font-weight: bold;
            float: left;
            margin-top: .15rem;
            width: calc( 100% - .72rem - 0.16rem );
            margin-bottom: 0.05rem;
          }
          span{
            color: #383874;
            width: calc( 100% - .72rem - 0.16rem );
            float: left;
            font-size: 0.14rem;
          }
        }
      }
      table{
        border-collapse: collapse;
        width: 4.1rem;
        margin-bottom: .6rem;
        th{
          color: #343471;
          font-size: 0.12rem;
          padding-bottom: 0.3rem;
          &:first-child{
            padding-right: 0.2rem;
          }
        }
        td{
          text-align: center;
          color: #64658F;
          font-size: 0.14rem;
          padding-bottom: 0.3rem;
          &:first-child{
            color: #343471;
            font-size: 0.16rem;
            font-weight: bold;
            padding-right: .2rem;
          }
        }
      }
      .clearfix2{
        .fl{
          width: 1.69rem;
          height: 2.43rem;
          margin-right: 0.2rem;
          border-radius: 0.2rem;
          line-height: 1;
          text-align: center;
          &:last-child{
            margin-right: 0;
          }
          img{
            margin: 0.35rem auto 0.25rem;
            width: 0.5rem;
            display: block;
            height: 0.5rem;
          }
          p{
            color: #FFFFFF;
            font-size: 0.2rem;
            margin-bottom: 0.2rem;
          }
          h3{
            color: #FFFFFF;
            font-size: 0.24rem;
            font-weight: bold;
            margin-bottom: 0.16rem;
          }
          span{
            color: #FFFFFF;
            font-size: 0.14rem;
          }
        }
      }
    }
    & > .fr{
      opacity: 0;
      &.on{
        animation: on_translateX .8s 1.6s 1;
        animation-fill-mode: forwards;
      }
      float: left !important;
      width: calc( 100% - 1.07rem - 5.47rem - 3.3rem);
      margin-left: 1.07rem;
      height: 6.46rem;
      img{
        position: absolute;
        animation: trans 2s ease-in infinite alternate-reverse;
      }
      .img1{
        width: 89px;
        left: 0.17rem;
        top: -1.82rem;
        animation-duration: 2.5s;
        animation-delay: .2s;
      }
      .img2{
        width: 1.28rem;
        left: 0;
        top: 0.8rem;
        animation-duration: 2.8s;
        animation-delay: .1s;
      }
      .img3{
        width: 1.28rem;
        left: 0.07rem;
        top: 5.05rem;
        animation-duration: 2.3s;
        animation-delay: .3s;
      }
      .img4{
        width: 2.5rem;
        left: 1.86rem;
        top: -0.69rem;
        animation-duration: 2.7s;
        z-index: 2;
      }
      .img5{
        width: 4.08rem;
        top: -0.73rem;
        animation-duration: 2.7s;
        left: 1.48rem;
      }
      .img6{
        width: 0.72rem;
        left: 4.83rem;
        top: -1.16rem;
        animation-duration: 2.4s;
        animation-delay: .25s;
      }
      .img7{
        width: 0.89rem;
        left: 6.2rem;
        top: 0.26rem;
        animation-duration: 2.3s;
        animation-delay: .15s;
      }
      .img8{
        width: 1.28rem;
        top: 2.6rem;
        left: 5.99rem;
        animation-duration: 2.9s;
        animation-delay: .05s;
      }
    }
    .percent{
      opacity: 0;
      &.on{
        animation: on_translateX .8s 2s 1;
        animation-fill-mode: forwards;
      }
      position: absolute;
      right: 0;
      bottom: 0;
      width: 4.04rem;
      height: 2.58rem;
      background: #FFFFFF;
      box-shadow: 0px 0px 0.04rem 0px rgba(72, 146, 255, 0.03);
      border-radius: 0.2rem;
      padding: 0.3rem;
      box-sizing: border-box;
      p{
        color: #383874;
        margin-top: 0;
        font-size: 0.18rem;
        font-weight: bold;
        position: relative;
        padding-left: 0.24rem;
        margin-bottom: 0.1rem;
        box-sizing: border-box;
        &::before{
          content: '';
          width: 0.05rem;
          height: 0.22rem;
          background: #8676FF;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      & > div{
        width: 100%;
        position: relative;
        box-sizing: border-box;
        padding-left: 0.4rem;
        & > div{
          padding-top: 0.12rem;
          padding-bottom: 0.1rem;
          border-bottom: 0.01rem solid #E9EBF6;
          box-sizing: border-box;
          position: relative;
          &:last-child{
            border: 0;
          }
          &::before{
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -0.15rem;
            width: 0.08rem;
            height: 0.08rem;
            background: #04B828;
            border-radius: 50%;
          }
          &:nth-child(2){
            &::before{
              background: #8676FF;
            }
          }
          &:nth-child(3){
            &::before{
              background: #FF708C;
            }
          }
          &:nth-child(4){
            &::before{
              background: #F78C68;
            }
          }
          span,
          em{
            color: #383874;
            font-size: 0.16rem;
          }
          & > div{
            position: absolute;
            left: 1rem;
            bottom: 0.08rem;
            img{
              width: 0.11rem;
              height: 0.21rem;
            }
          }
          em{
            position: absolute;
            left: 2.3rem;
            bottom: .12rem;
            font-style: normal;
          }
        }
      }
    }
  }
}
@keyframes trans{
  from{
    transform: translateY(-.2rem);
  }
  to{
    transform: translateY(.12rem);
  }
}
</style>
