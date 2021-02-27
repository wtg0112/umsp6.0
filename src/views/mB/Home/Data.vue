<template>
  <div :style="'background-color: #EFF1FA; overflow: hidden; height: ' + height_auto + 'px;'">
    <div class="content">
      <div :class="show ? 'on' : ''" class="bg">
        <div>
          <img src="../image/home/l1.png" alt="">
          <p>西北地区</p>
          <span><b>0.54</b>%</span>
        </div>
        <div>
          <img src="../image/home/l2.png" alt="">
          <p>西南地区</p>
          <span><b>21.50</b>%</span>
        </div>
        <div>
          <img src="../image/home/l3.png" alt="">
          <p>华中地区</p>
          <span><b>3.61</b>%</span>
        </div>
        <div>
          <img src="../image/home/l4.png" alt="">
          <p>华南地区</p>
          <span><b>21.80</b>%</span>
        </div>
        <div>
          <img src="../image/home/l5.png" alt="">
          <p>华东地区</p>
          <span><b>24.72</b>%</span>
        </div>
        <div>
          <img src="../image/home/l6.png" alt="">
          <p>华北地区</p>
          <span><b>27.82</b>%</span>
        </div>
      </div>
      <img :class="show ? 'on' : ''" src="../image/home/haicelogo.png" alt="" class="logo">
      <div :class="show ? 'on' : ''" class="title"> 学生背景数据统计</div>
      <div class="box clearfix">
        <div class="fl">
          <div :class="show ? 'on' : ''" class="statistics clearfix">
            <div class="fl" v-for="(item, index) in statistics_data" :key="index">
              <el-progress type="circle" :percentage="item.cent" :color="options1.color" :stroke-width="options1.strokeWidth" :width="options1.width"></el-progress>
              <p>{{item.area}}</p><br>
              <span>{{item.local}}</span>
            </div>
          </div>
          <div :class="show ? 'on' : ''" class="info clearfix">
            <div class="fl">
              <p>中国重点城市录取数量</p>
              <table>
                <thead>
                  <tr>
                    <th>城市</th>
                    <th>TOP30占比</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in info" :key="index">
                    <td>{{item.city}}</td>
                    <td>{{item.cent}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="fl">
              <p>重点院校录取数据</p>
              <div>
                <span v-for="(item, index) in info2" :key="index">
                  {{item.school}}
                  <em>{{item.num}}</em>
                </span>
              </div>
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
      height_auto: document.documentElement.clientHeight, // 获取页面高度
      niu: false,
      options1: {
        color: '#59E37E', // 颜色
        strokeWidth: 5, // 环宽
        width: 100 // 圆宽
      },
      statistics_data: [
        {
          cent: 27.82,
          area: '华北地区',
          url: require('../image/home/l1.png'),
          local: '（北京、河北等）'
        },
        {
          cent: 3.61,
          area: '华中地区',
          url: require('../image/home/l2.png'),
          local: '（湖北、湖南等）'
        },
        {
          cent: 21.80,
          area: '华南地区',
          url: require('../image/home/l3.png'),
          local: '（广州、深圳等）'
        },
        {
          cent: 21.50,
          area: '西南地区',
          url: require('../image/home/l4.png'),
          local: '（成都、重庆等）'
        },
        {
          cent: 24.72,
          area: '华东地区',
          url: require('../image/home/l5.png'),
          local: '（上海、杭州等）'
        },
        {
          cent: 0.54,
          area: '西北地区',
          url: require('../image/home/l6.png'),
          local: '（西安、兰州等）'
        }
      ],
      info: [
        {
          city: '北京',
          cent: '31.46%'
        },
        {
          city: '上海',
          cent: '22.07%'
        },
        {
          city: '南京',
          cent: '8.45%'
        },
        {
          city: '苏州',
          cent: '7.04%'
        },
        {
          city: '深圳',
          cent: '6.57%'
        }
      ],
      info2: [
        {
          school: '中国顺义国际学校',
          num: '22'
        },
        {
          school: '上海包玉刚实验中学',
          num: '13'
        },
        {
          school: '南京外国语学校国际班',
          num: '16'
        },
        {
          school: '广东美国人国际学校',
          num: '4'
        },
        {
          school: '北京市鼎石学校',
          num: '17'
        }
      ],
      show: false // 控制页面进入动画加载
    }
  },
  computed: {

  },
  mounted () {
    const that = this
    setTimeout(() => {
      that.niu = true
    }, 5000)
    setTimeout(() => {
      that.show = true
    }, 0) // 控制页面进入动画加载
    window.addEventListener('resize', that.resize, false) // 监听页面大小变化
    this.statistics_data.forEach((item, index) => {
      this.growPercent(item.cent, 2500, index) // 循环执行进度条加载
    })
  },
  methods: {
    resize () {
      this.height_auto = document.documentElement.clientHeight // 重新定义页面高度，保持一屏
    },
    growPercent (cent, time, index) {
      const that = this
      that.statistics_data[index].cent = 0 // 置零进度条
      const old = cent // 存放目标数
      setTimeout(() => {
        that.statistics_data[index].cent = old // 赋值
      }, time) // 延时多少执行
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
  background: url('../image/home/bg21.png') no-repeat center;
  background-size: cover;
  .bg{
    width: 12.92rem;
    height: 12.6rem;
    position: absolute;
    right: -2.26rem;
    top: -2.42rem;
    background: url('../image/home/bg20.png') no-repeat center;
    background-size: cover;
    opacity: 0;
    & > div{
      width: 2.09rem;
      opacity: 0;
      height: 0.73rem;
      background: #FFFFFF;
      box-shadow: 0px 0px 0.32rem 0px rgba(72, 146, 255, 0.36);
      border-radius: 0.2rem;
      padding-left: 0.84rem;
      padding-top: 0.12rem;
      box-sizing: border-box;
      position: absolute;
      top: 4.36rem;
      left: 2.27rem;
      line-height: 1;
      &:after{
        content: '';
        position: absolute;
        left: 60%;
        width: 0.57rem;
        height: 1.02rem;
        margin-left: -.29rem;
        bottom: -.9rem;
        background: url('../image/home/area.png') no-repeat center;
        background-size: cover;
      }
      img{
        width: 0.48rem;
        height: 0.48rem;
        position: absolute;
        left: 0.23rem;
        top: 0.12rem;
      }
      p{
        color: #666666;
        font-size: 0.19rem;
        margin-bottom: 0.06rem;
        margin-top: 0;
      }
      span{
        color: #353662;
        font-size: 0.16rem;
        b{
          color: #515157;
          font-size: 0.24rem;
        }
      }
      &:nth-child(2){
        top: 7.73rem;
        left: 4.85rem;
      }
      &:nth-child(3){
        top: 6.64rem;
        left: 6.05rem;
      }
      &:nth-child(4){
        top: 5rem;
        left: 6.82rem;
      }
      &:nth-child(5){
        top: 6.83rem;
        left: 7.85rem;
        &:after{
          left: 40%;
        }
      }
      &:nth-child(6){
        top: 4.01rem;
        left: 8.4rem;
      }
    }
    &.on{
      animation: on_translateX .8s 1.6s 1;
      animation-fill-mode: forwards;
      & > div{
        animation: on_translateYsf .8s 2s 1;
        animation-fill-mode: forwards;
        &:nth-child(2){
          animation-delay: 2.3s;
        }
        &:nth-child(3){
          animation-delay: 2.6s;
        }
        &:nth-child(4){
          animation-delay: 2.9s;
        }
        &:nth-child(5){
          animation-delay: 3.2s;
        }
        &:nth-child(6){
          animation-delay: 3.5s;
        }
      }
    }
  }
  .logo{
    width: 0.96rem;
    // width: 96px;
    display: block;
    margin-bottom: 0.3rem;
    opacity: 0;
    &.on{
      animation: on_translateX .8s 1;
      animation-fill-mode: forwards;
    }
  }
  .title{
    margin-bottom: 0.4rem;
    opacity: 0;
    &.on{
      animation: on_translateX .8s .4s 1;
      animation-fill-mode: forwards;
    }
  }
  .box{
    & > .fl{
      width: 8.4rem;
      .statistics{
        padding-right: 1rem;
        box-sizing: border-box;
        width: 100%;
        opacity: 0;
        &.on{
          animation: on_translateX .8s .8s 1;
          animation-fill-mode: forwards;
        }
        .fl{
          width: 2.24rem;
          margin-right: 0.9rem;
          margin-bottom: 0.3rem;
          /deep/ .el-progress{
            float: left;
            margin-right: 0.2rem;
            /deep/ .el-progress-circle{
              width: 1rem !important;
              height: 1rem !important;
            }
          }
          p{
            color: #464971;
            font-size: 0.2rem;
            font-weight: bold;
            float: left;
            width: calc( 100% - 1rem - 0.2rem );
            margin-bottom: 0.05rem;
          }
          span{
            color: #464971;
            width: calc( 100% - 1rem - 0.2rem );
            float: left;
            font-size: 0.13rem;
            text-indent: -.06rem;
          }
        }
      }
      .info{
        opacity: 0;
        &.on{
          animation: on_translateX .8s 1.2s 1;
          animation-fill-mode: forwards;
          thead tr{
            animation: on_translateYsf .8s 1.6s 1;
            animation-fill-mode: forwards;
          }
          tbody tr{
            animation: on_translateYsf .6s 2s 1;
            animation-fill-mode: forwards;
            &:nth-child(2){
              animation-delay: 2.3s;
            }
            &:nth-child(3){
              animation-delay: 2.6s;
            }
            &:nth-child(4){
              animation-delay: 2.9s;
            }
            &:nth-child(5){
              animation-delay: 3.2s;
            }
          }
          .fl:nth-child(2){
            span{
              animation: on_translateYsf .6s 1.6s 1;
              animation-fill-mode: forwards;
              &:nth-child(2){
                animation-delay: 2s;
              }
              &:nth-child(3){
                animation-delay: 2.4s;
              }
              &:nth-child(4){
                animation-delay: 2.8s;
              }
              &:nth-child(5){
                animation-delay: 3.2s;
              }
            }
          }
        }
        .fl{
          width: 4.02rem;
          height: 3.3rem;
          background: #FFFFFF;
          box-shadow: 0px 0px 0.04rem 0px rgba(72, 146, 255, 0.03);
          border-radius: 0.2rem;
          margin-right: 0.3rem;
          padding: .3rem;
          box-sizing: border-box;
          &:last-child{
            margin-right: 0;
          }
          p{
            margin-top: 0;
            padding-left: 0.24rem;
            box-sizing: border-box;
            position: relative;
            color: #383874;
            font-size: 0.18rem;
            font-weight: bold;
            &::before{
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 0.05rem;
              height: 0.22rem;
              background: #8676FF;
            }
          }
          table{
            border-collapse: collapse;
            width: 100%;
            margin-left: 0.1rem;
            tr{
              opacity: 0;
            }
            th{
              color: #383874;
              font-size: 0.14rem;
              padding-bottom: 0.1rem;
            }
            td{
              text-align: center;
              color: #353662;
              font-size: 0.16rem;
              padding: 0.1rem 0;
              position: relative;
              &:first-child{
                &::before{
                  content: '';
                  position: absolute;
                  left: -0.1rem;
                  top: 50%;
                  transform: translateY(-50%);
                  width: 6px;
                  height: 6px;
                  background: #6947FC;
                  border-radius: 50%;
                }
              }
            }
            tr{
              &:nth-child(2){
                td:first-child{
                  &::before{
                    background: #A185E4;
                  }
                }
              }
              &:nth-child(3){
                td:first-child{
                  &::before{
                    background: #86A3E3;
                  }
                }
              }
              &:nth-child(4){
                td:first-child{
                  &::before{
                    background: #69DEB2;
                  }
                }
              }
              &:nth-child(5){
                td:first-child{
                  &::before{
                    background: #69DEB2;
                  }
                }
              }
            }
          }
          &:nth-child(2){
            padding-left: 0.13rem;
            padding-right: 0.13rem;
            span{
              width: 100%;
              height: 0.46rem;
              line-height: 0.46rem;
              border-radius: 0.07rem;
              display: block;
              margin-bottom: 0.03rem;
              padding-left: 0.6rem;
              box-sizing: border-box;
              position: relative;
              color: #545486;
              font-size: 0.16rem;
              opacity: 0;
              &::before{
                content: '';
                position: absolute;
                left: 0.3rem;
                top: 50%;
                transform: translateY(-50%);
                width: 0.06rem;
                height: 0.06rem;
                background: #6947FC;
                border-radius: 50%;
              }
              &:nth-child(1),
              &:nth-child(2),
              &:nth-child(3){
                background: rgba(134, 163, 227, .1);
              }
              &:nth-child(2){
                &::before{
                  background: #A185E4;
                }
              }
              &:nth-child(3){
                &::before{
                  background: #86A3E3;
                }
              }
              &:nth-child(4),
              &:nth-child(5){
                &::before{
                  background: #69DEB2;
                }
              }
              em{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 3.4rem;
                color: #343471;
                font-size: 0.16rem;
                font-style: normal;
              }
            }
          }
        }
      }
    }
  }
}
</style>
