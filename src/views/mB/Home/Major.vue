<template>
  <div :style="'background-color: #EFF1FA; overflow: hidden; height: ' + height_auto + 'px;'">
    <div class="content">
      <img :class="show ? 'on' : ''" src="../image/home/haicelogo.png" alt="" class="logo">
      <div :class="show ? 'on' : ''" class="title"> 美国本科 <br> 近三年录取数据</div>
      <div class="box clearfix">
        <div :class="show ? 'on' : ''" class="fl">
          <div class="num">
            <p>热门专业申请数量</p>
            <div class="chart" ref="chart"></div>
          </div>
          <div class="major">
            <p>热门专业院校录取情况</p>
            <div class="head">
              <span v-for="(item, index) in list" :key="index" @click=" act = index " :class="active(index)">{{item}}</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>学校名称</th>
                  <th>官方录取率</th>
                  <th>我们的申请数</th>
                </tr>
              </thead>
              <tbody v-for="(item, index) in list_data" :key="index" v-show="act == index">
                <tr v-for="(item1, index1) in item" :key="index1">
                  <td>{{item1.school}}</td>
                  <td>{{item1.rate}}</td>
                  <td>{{item1.num}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div :class="show ? 'on' : ''" class="fr">
          <div class="img img5">
            <img src="../image/home/bg14.png" alt="" class="bi">
            <img src="https://crm1.oss-cn-beijing.aliyuncs.com/hiDaas/schoolLogo/9228.png" alt="" class="icon">
            <p>加州大学洛杉矶分校</p>
            <span>
              <b>34</b>
              枚
            </span>
          </div>
          <div class="img img2">
            <img src="../image/home/bg15.png" alt="" class="bi">
            <img src="https://crm1.oss-cn-beijing.aliyuncs.com/hiDaas/schoolLogo/123456788.jpg" alt="" class="icon">
            <p>圣路易斯华盛顿大学</p>
            <span>
              <b>20</b>
              枚
            </span>
          </div>
          <div class="img img3">
            <img src="../image/home/bg16.png" alt="" class="bi">
            <img src="https://crm1.oss-cn-beijing.aliyuncs.com/hiDaas/schoolLogo/9165.png" alt="" class="icon">
            <p>康奈尔大学</p>
            <span>
              <b>17</b>
              枚
            </span>
          </div>
          <div class="img img4">
            <img src="../image/home/bg17.png" alt="" class="bi">
            <img src="https://crm1.oss-cn-beijing.aliyuncs.com/hiDaas/schoolLogo/10080.jpg" alt="" class="icon">
            <p>范德堡大学</p>
            <span>
              <b>11</b>
              枚
            </span>
          </div>
          <div class="img img1">
            <img src="../image/home/bg18.png" alt="" class="bi">
            <img src="https://crm1.oss-cn-beijing.aliyuncs.com/hiDaas/schoolLogo/8470.png" alt="" class="icon">
            <p>芝加哥大学</p>
            <span>
              <b>5</b>
              枚
            </span>
          </div>
          <div class="img img6">
            <img src="../image/home/bg19.png" alt="" class="bi">
            <img src="https://crm1.oss-cn-beijing.aliyuncs.com/hiDaas/schoolLogo/9154.png" alt="" class="icon">
            <p>约翰霍普金斯大学</p>
            <span>
              <b>4</b>
              枚
            </span>
          </div>
          <div class="img img7">
            <img src="../image/home/bg110.png" alt="" class="bi">
            <img src="https://crm1.oss-cn-beijing.aliyuncs.com/hiDaas/schoolLogo/9162.png" alt="" class="icon">
            <p>西北大学</p>
            <span>
              <b>3</b>
              枚
            </span>
          </div>
          <div class="img img8">
            <img src="../image/home/bg111.png" alt="" class="bi">
            <img src="https://crm1.oss-cn-beijing.aliyuncs.com/hiDaas/schoolLogo/8546.jpg" alt="" class="icon">
            <p>宾夕法尼亚大学</p>
            <span>
              <b>3</b>
              枚
            </span>
          </div>
          <div class="img img9">
            <img src="../image/home/bg111.png" alt="" class="bi">
            <img src="https://crm1.oss-cn-beijing.aliyuncs.com/hiDaas/schoolLogo/123456789.jpg" alt="" class="icon">
            <p>哥伦比亚大学</p>
            <span>
              <b>3</b>
              枚
            </span>
          </div>
          <div class="img img10">
            <img src="../image/home/bg11.png" alt="" class="bi">
          </div>
          <div class="img img11">
            <img src="../image/home/bg12.png" alt="" class="bi">
          </div>
          <div class="img img12">
            <img src="../image/home/bg13.png" alt="" class="bi">
          </div>
          <div class="img img13">
            <img src="../image/home/bg112.png" alt="" class="bi">
          </div>
          <div class="info clearfix">
            <div>
              <div class="img">
                <img src="../image/home/bg113.png" alt="">
              </div>
              <p>综合性大学录取数据</p>
              <span>
                <b>2000</b>
                枚
              </span>
            </div>
            <div>
              <div class="img">
                <img src="../image/home/bg114.png" alt="">
              </div>
              <p>文理学院录取数据</p>
              <span>
                <b>288</b>
                枚
              </span>
            </div>
            <div>
              <div class="img">
                <img src="../image/home/bg115.png" alt="">
              </div>
              <p>社区大学录取数据</p>
              <span>
                <b>36</b>
                枚
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
am4core.useTheme(am4themesAnimated)
export default {
  data () {
    return {
      height_auto: document.documentElement.clientHeight, // 屏幕高度
      show: false, // 控制页面进入动画加载
      niu: false,
      list: [
        '商学院', '机械工程', '金融', '美国综合大学', '文理学院'
      ], // 选项卡表头
      list_data: [
        [
          {
            school: '宾夕法尼亚大学-沃顿商学院',
            rate: '6.49%',
            num: '1'
          },
          {
            school: '哈佛大学-哈佛商学院',
            rate: '9.9%',
            num: '1'
          },
          {
            school: '斯坦福大学-商学院',
            rate: '5.7%',
            num: '1'
          },
          {
            school: '芝加哥大学-布斯商学院',
            rate: '21.9%',
            num: '2'
          },
          {
            school: '西北大学-凯洛格商学院',
            rate: '24.2%',
            num: '1'
          }
        ],
        [
          {
            school: '麻省理工学院',
            rate: '6.74%',
            num: '1'
          },
          {
            school: '斯坦福大学',
            rate: '5%',
            num: '1'
          },
          {
            school: '加州大学伯克利分校',
            rate: '9%',
            num: '2'
          },
          {
            school: '加州理工学院',
            rate: '6.5%',
            num: '1'
          }
        ],
        [
          {
            school: '宾夕法尼亚大学',
            rate: '6.49%',
            num: '1'
          },
          {
            school: '芝加哥大学',
            rate: '7.6%',
            num: '3'
          },
          {
            school: '纽约大学',
            rate: '7.69%',
            num: '1'
          },
          {
            school: '斯坦福大学',
            rate: '5.7%',
            num: '1'
          }
        ],
        [
          {
            school: '耶鲁大学',
            rate: '7%',
            num: '1'
          },
          {
            school: '斯坦福大学',
            rate: '5%',
            num: '1'
          },
          {
            school: '杜克大学',
            rate: '10%',
            num: '2'
          },
          {
            school: '宾夕法尼亚大学',
            rate: '9%',
            num: '1'
          }
        ],
        [
          {
            school: '威廉姆斯学院',
            rate: '10%',
            num: '15'
          },
          {
            school: '阿默斯特学院',
            rate: '19%',
            num: '13'
          },
          {
            school: '斯沃斯莫尔学院',
            rate: '25%',
            num: '13'
          },
          {
            school: '维斯理学院',
            rate: '22%',
            num: '2'
          }
        ]
      ], // 选项卡表内容
      act: 0 // 选项卡index
    }
  },
  computed: {
    active () { // 选项卡绑定类名时的计算属性
      const that = this
      return function (index) {
        return index == that.act ? 'active' : ''
      }
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
    window.addEventListener('resize', that.resize, false) // 监听页面大小变化
    this.chart() // amcharts
  },
  methods: {
    resize () { // 监听页面大小变化
      this.height_auto = document.documentElement.clientHeight
    },
    chart () {
      // Create chart instance
      const chart = am4core.create(this.$refs.chart, am4charts.XYChart)
      am4core.options.autoSetClassName = true
      chart.position = 'center'
      // Add data
      chart.data = [
        {
          country: 20,
          visits: '不定专业'
        },
        {
          country: 23,
          visits: '文理学院'
        },
        {
          country: 12,
          visits: '商科'
        },
        {
          country: 18,
          visits: '工程'
        },
        {
          country: 10,
          visits: '自然科学'
        },
        {
          country: 13,
          visits: '人文科学'
        },
        {
          country: 4,
          visits: '艺术'
        }
      ]

      // Create axes
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'visits'
      // categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.minGridDistance = 60
      categoryAxis.tooltip.disabled = true

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.minWidth = 50
      valueAxis.min = 0
      valueAxis.cursorTooltipEnabled = false

      // Create series
      const series = chart.series.push(new am4charts.ColumnSeries())
      series.sequencedInterpolation = true
      series.dataFields.valueY = 'country'
      series.dataFields.categoryX = 'visits'
      series.tooltipText = '[#fff]{categoryX} : {valueY}%[/]'
      series.columns.template.strokeWidth = 0

      series.tooltip.pointerOrientation = 'vertical'

      series.columns.template.column.cornerRadiusTopLeft = 10
      series.columns.template.column.cornerRadiusTopRight = 10
      series.columns.template.column.fillOpacity = 0.8

      // on hover, make corner radiuses bigger
      const hoverState = series.columns.template.column.states.create('hover')
      hoverState.properties.cornerRadiusTopLeft = 0
      hoverState.properties.cornerRadiusTopRight = 0
      hoverState.properties.fillOpacity = 1

      series.columns.template.adapter.add('fill', function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index)
      })

      // Cursor
      chart.cursor = new am4charts.XYCursor()
      chart.cursor.behavior = 'panX'
    } // amcharts
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
  background: url('../image/home/bg10.png') no-repeat center;
  background-size: cover;
  padding-bottom: .5rem;
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
    margin-bottom: 0.3rem;
    opacity: 0;
    &.on{
      animation: on_translateX .8s .4s 1;
      animation-fill-mode: forwards;
    }
  }
  .fl{
    width: 4.43rem;
    opacity: 0;
    &.on{
      animation: on_translateX .8s .8s 1;
      animation-fill-mode: forwards;
    }
    p{
      margin-top: 0;
    }
    .num{
      width: 100%;
      height: 3.18rem;
      position: relative;
      padding: 0.3rem;
      box-sizing: border-box;
      background: #FFFFFF;
      box-shadow: 0px 0px 0.04rem 0px rgba(72, 146, 255, 0.03);
      border-radius: 0.2rem;
      p{
        padding-left: 0.24rem;
        box-sizing: border-box;
        color: #383874;
        font-size: 0.18rem;
        font-weight: bold;
        position: relative;
        margin-bottom: 0.3rem;
        line-height: 1;
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
      .chart{
        width: 100%;
        height: calc( 100% - .48rem );
        transform: translateX(-.25rem);
      }
    }
    .major{
      width: 100%;
      height: 3.25rem;
      padding-top: 0.3rem;
      box-sizing: border-box;
      margin-top: 0.4rem;
      background: #FFFFFF;
      box-shadow: 0px 0px 0.04rem 0px rgba(72, 146, 255, 0.03);
      border-radius: 0.2rem;
      p{
        padding-left: 0.54rem;
        box-sizing: border-box;
        color: #383874;
        font-size: 0.18rem;
        font-weight: bold;
        position: relative;
        margin-bottom: 0.2rem;
        line-height: 1;
        &::before{
          content: '';
          position: absolute;
          left: .3rem;
          top: 50%;
          transform: translateY(-50%);
          width: 0.05rem;
          height: 0.22rem;
          background: #8676FF;
        }
      }
      .head{
        width: 100%;
        height: 0.38rem;
        background: rgba(249, 248, 253, .48);
        box-shadow: 0px 0px 0.04rem 0px rgba(72, 146, 255, 0.03);
        border-radius: 0.2rem;
        padding: 0 0.1rem;
        box-sizing: border-box;
        text-align: center;
        span{
          height: 100%;
          display: inline-block;
          width: auto;
          padding: 0 .15rem;
          text-align: center;
          line-height: .38rem;
          cursor: pointer;
          color: #383874;
          font-size: 0.14rem;
          border-radius: 0.19rem;
          &.active{
            background: #3247E5;
            box-shadow: 0px 0px 0.04rem 0px rgba(72, 146, 255, 0.03);
            color: #fff;
          }
        }
      }
      table{
        width: 100%;
        padding: 0 0.3rem;
        margin: 0 auto;
        // border-collapse: collapse;
        // box-sizing: border-box;
        border-spacing: 0px;
        tbody{
          tr{
            border-radius: 0px 0.21rem 0.19rem 0px;
            background-color: #fff;
            transition: all .6s;
            position: relative;
            &:hover{
              background-color: rgba(223, 221, 246, .2);
            }
            td{
              text-align: left;
              box-sizing: border-box;
              &:last-child{
                &:after{
                  content: '';
                  position: absolute;
                  right: -.3rem;
                  top: 50%;
                  transform: translateY(-50%);
                  width: 0.04rem;
                  height: 0.22rem;
                  background: #fff;
                  transition: all .6s;
                  border-radius: 0.02rem;
                }
              }
            }
            &:hover td:last-child:after{
              background: #69DEB2;
            }
          }
        }
        th{
          color: #383874;
          font-size: 0.14rem;
          font-weight: bold;
          text-align: left;
          padding: 0.15rem 0;
        }
        td{
          color: #383874;
          padding: 0.05rem 0rem;
          font-size: 0.14rem;
          text-align: center;
          position: relative;
          &:last-child{
            border-radius: 0px 0.21rem 0.19rem 0px;
          }
        }
      }
    }
  }
  .fr{
    opacity: 0;
    &.on{
      animation: on_translateX .8s 1.2s 1;
      animation-fill-mode: forwards;
    }
    width: calc( 100% - 2.84rem - 4.43rem );
    float: left !important;
    margin-left: 0.84rem;
    .info{
      margin-top: 5.2rem;
      & > div{
        width: 33.33%;
        float: left;
        text-align: center;
        .img{
          width: 0.5rem;
          height: 0.5rem;
          margin: 0 auto 0.1rem;
          background-color: #fff;
          box-shadow: 0px 0px 0.13rem 0px #E8E7FC;
          border-radius: 0.1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            width: .25rem;
          }
        }
        p{
          font-size: 0.14rem;
          color: #383874;
          margin-bottom: 0.1rem;
        }
        span{
          font-size: 0.14rem;
          color: #383874;
          b{
            font-size: 0.3rem;
          }
        }
      }
    }
    & > .img{
      width: 2.76rem;
      height: 2.76rem;
      position: absolute;
      text-align: center;
      .bi{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 50%;
        z-index: 1;
      }
      .icon{
        display: block;
        margin: 0.4rem auto 0.17rem;
        width: 1.1rem;
        position: relative;
        border-radius: 50%;
        z-index: 2;
      }
      p{
        color: #FFFFFF;
        font-size: 0.18rem;
        margin-bottom: 0.05rem;
        position: relative;
        line-height: 1;
        z-index: 2;
      }
      span{
        position: relative;
        line-height: 1;
        z-index: 2;
        b{
          color: #FFFFFF;
          font-size: 0.3rem;
        }
        color: #FFFFFF;
        font-size: 12px;
      }
    }
    .img1{
      left: 1.1rem;
      top: 0.2rem;
      animation: trans 1.7s .1s infinite alternate;
      transform: scale(.6);
    }
    .img2{
      left: 0.53rem;
      top: 1.63rem;
      transform: scale(.45);
      animation: trans1 1.87s .2s infinite alternate;
    }
    .img3{
      left: 1.88rem;
      top: 2.67rem;
      transform: scale(.71);
      animation: trans2 1.9s infinite alternate;
    }
    .img4{
      left: 4.14rem;
      top: -1.4rem;
      transform: scale(.71);
      animation: trans2 2s .1s infinite alternate;
    }
    .img5{
      left: 3.64rem;
      top: .8rem;
      animation: trans3 2.2s .15s infinite alternate;
    }
    .img6{
      left: 5rem;
      top: 2.47rem;
      transform: scale(.49);
      animation: trans4 1.75s .12s infinite alternate;
    }
    .img7{
      left: 6rem;
      top: 0.97rem;
      transform: scale(.51);
      animation: trans5 1.9s .08s infinite alternate;
    }
    .img8{
      left: 6.6rem;
      top: 2.27rem;
      transform: scale(.34);
      animation: trans6 1.8s .02s infinite alternate;
    }
    .img9{
      left: 8rem;
      top: -2.13rem;
      transform: scale(.42);
      animation: trans7 2s .09s infinite alternate;
    }
    .img10{
      left: 0.4rem;
      top: -1.43rem;
      transform: scale(.3);
      animation: trans8 2s .1s infinite alternate;
    }
    .img11{
      left: -.6rem;
      top: 0.87rem;
      transform: scale(.42);
      animation: trans9 2s .05s infinite alternate;
    }
    .img12{
      left: -.4rem;
      top: 3.07rem;
      transform: scale(.22);
      animation: trans10 2s infinite alternate;
    }
    .img13{
      left: 8rem;
      top: 3.27rem;
      transform: scale(.18);
      animation: trans11 2s .06s infinite alternate;
    }
  }
}
@keyframes trans{
  from{
    transform: scale(.6) translateY(-.07rem);
  }
  to{
    transform: scale(.62) translateY(.05rem);
  }
}
@keyframes trans1{
  from{
    transform: scale(.45) translateY(-.07rem);
  }
  to{
    transform: scale(.47) translateY(.05rem);
  }
}
@keyframes trans2{
  from{
    transform: scale(.71) translateY(-.07rem);
  }
  to{
    transform: scale(.73) translateY(.05rem);
  }
}
@keyframes trans3{
  from{
    transform: scale(1) translateY(-.07rem);
  }
  to{
    transform: scale(1.02) translateY(.05rem);
  }
}
@keyframes trans4{
  from{
    transform: scale(.49) translateY(-.07rem);
  }
  to{
    transform: scale(.51) translateY(.05rem);
  }
}
@keyframes trans5{
  from{
    transform: scale(.51) translateY(-.07rem);
  }
  to{
    transform: scale(.53) translateY(.05rem);
  }
}
@keyframes trans6{
  from{
    transform: scale(.34) translateY(-.07rem);
  }
  to{
    transform: scale(.36) translateY(.05rem);
  }
}
@keyframes trans7{
  from{
    transform: scale(.42) translateY(-.07rem);
  }
  to{
    transform: scale(.44) translateY(.05rem);
  }
}
@keyframes trans8{
  from{
    transform: scale(.3) translateY(-.07rem);
  }
  to{
    transform: scale(.32) translateY(.05rem);
  }
}
@keyframes trans9{
  from{
    transform: scale(.42) translateY(-.07rem);
  }
  to{
    transform: scale(.44) translateY(.05rem);
  }
}
@keyframes trans10{
  from{
    transform: scale(.22) translateY(-.07rem);
  }
  to{
    transform: scale(.24) translateY(.05rem);
  }
}
@keyframes trans11{
  from{
    transform: scale(.18) translateY(-.07rem);
  }
  to{
    transform: scale(.2) translateY(.05rem);
  }
}
</style>
