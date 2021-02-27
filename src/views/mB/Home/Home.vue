<template>
  <div :style="'background-color: #EFF1FA; overflow: hidden; height: ' + height_auto + 'px;'">
    <!-- <img src="../image/home/niu.gif" class="niu" :class="niu ? 'on' : ''" alt=""> -->
    <div class="content case">
      <img :class="show ? 'on' : ''" src="../image/home/haicelogo.png" alt="" class="logo">
      <div :class="show ? 'on' : ''" class="bg1">
        <img src="../image/home/bg01.png" alt="" class="bg bg2">
        <img src="../image/home/bg001.png" alt="" class="bg bg3">
        <img src="../image/home/bg0001.png" alt="" class="bg bg4">
        <figure>
            <div class="c"></div>
            <div class="c2"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
            <div class="c3"></div>
            <div class="c4"></div>
            <div class="c5"></div>
            <div class="c6"></div>
        </figure>
      </div>
      <div :class="show ? 'on' : ''" class="title">美国本科案例 <br> 连续八年大满贯</div>
      <div class="box">
        <div :class="show ? 'on' : ''" class="num">
          <p>
            截止当前案例数量
            <em>{{nowTime}}</em>
          </p>
          <span>
            2355
            <em>枚</em>
          </span>
          <div class="clearfix">
            <div class="fl">
              <table>
                <thead>
                  <tr>
                    <th>姓名</th>
                    <th>申请院校</th>
                    <th>申请专业</th>
                  </tr>
                </thead>
                <tbody ref="chatContent" @mouseenter="stopMove()" @mouseleave="startMove()">
                  <tr v-for="(item, index) in table_list" :key="index">
                    <td>{{item.name}}</td>
                    <td>{{item.school}}</td>
                    <td>{{item.major}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="fr">
              <el-progress type="circle" :percentage="options1.percentage" :color="options1.color" :stroke-width="options1.strokeWidth" :width="options1.width"></el-progress>
              <div>
                <p>目标学生数 200</p>
                <span>
                  申请学生数
                  <b>178</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div :class="show ? 'on' : ''" class="clearfix">
          <div class="fl one">
            <p>学校类型占比</p>
            <div class="clearfix">
              <div class="chart" ref="chart1"></div>
              <div class="fl">
                <div>
                  <em>
                    <img src="../image/home/bg02.png" alt="">
                  </em>
                  美高占比
                  <span>65%</span>
                </div>
                <div>
                  <em>
                    <img src="../image/home/bg03.png" alt="">
                  </em>
                  普高占比
                  <span>10%</span>
                </div>
                <div>
                  <em>
                    <img src="../image/home/bg04.png" alt="">
                  </em>
                  国际学校占比
                  <span>25%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="fl two clearfix">
            <p>本科TOP院校录取率 / 录取数</p>
            <div class="fl">
              <div class="clearfix">
                <div class="fl">
                  <el-progress type="circle" :percentage="options2.percentage" :color="options2.color" :stroke-width="options2.strokeWidth" :width="options2.width"></el-progress>
                  <span>录取率</span>
                </div>
                <div class="fl">
                  <el-progress type="circle" :percentage="options3.percentage" :color="options3.color" :stroke-width="options3.strokeWidth" :width="options3.width"></el-progress>
                  <span>录取率</span>
                </div>
              </div>
              <div class="clearfix">
                <div class="fl">
                  <div class="offer">
                    offer
                  </div>
                  <p>TOP30</p>
                  <span>
                    <em>585</em>
                    枚
                  </span>
                </div>
                <div class="fl">
                  <div class="offer">
                    offer
                  </div>
                  <p>TOP50</p>
                  <span>
                    <em>1410</em>
                    枚
                  </span>
                </div>
              </div>
            </div>
            <div class="fr">
              <div class="chart" ref="chart2"></div>
            </div>
          </div>
          <div class="fl three">
            <p>本科转学</p>
            <div class="clearfix">
              <div class="fl">
                <el-progress type="circle" :percentage="options4.percentage" :color="options4.color" :stroke-width="options4.strokeWidth" :width="options4.width"></el-progress>
                <span>录取率</span>
                <h3>
                  762
                  <em>枚</em>
                </h3>
                <p>offer数量</p>
              </div>
              <div class="fr">
                <p>TOP院校转学数据</p>
                <div>
                  <img src="../image/home/top.png" alt="">
                  TOP30
                  <em>50%</em>
                </div>
                <div>
                  <img src="../image/home/top.png" alt="">
                  TOP50
                  <em>40%</em>
                </div>
                <div>
                  <img src="../image/home/top.png" alt="">
                  TOP100
                  <em>10%</em>
                </div>
              </div>
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
import echarts from 'echarts'
import { caseChart } from '@/api/meiben.js'
am4core.useTheme(am4themesAnimated)
export default {
  data () {
    return {
      table_list: [
        {
          name: 'Q同学',
          school: '波士顿大学',
          major: '数学'
        },
        {
          name: 'S同学',
          school: '密歇根州大学',
          major: '精算科学'
        },
        {
          name: 'W同学',
          school: '旧金山艺术大学',
          major: '经济学'
        },
        {
          name: 'Y同学',
          school: '纽约州立大学',
          major: '生物医学科学'
        },
        {
          name: 'Q同学',
          school: '波士顿大学',
          major: '数学'
        },
        {
          name: 'S同学',
          school: '密歇根州大学',
          major: '精算科学'
        },
        {
          name: 'G同学',
          school: '旧金山艺术大学',
          major: '经济学'
        },
        {
          name: 'H同学',
          school: '纽约州立大学',
          major: '生物医学科学'
        },
        {
          name: 'L同学',
          school: '波士顿大学',
          major: '数学'
        },
        {
          name: 'S同学',
          school: '密歇根州大学',
          major: '精算科学'
        },
        {
          name: 'W同学',
          school: '旧金山艺术大学',
          major: '经济学'
        },
        {
          name: 'L同学',
          school: '纽约州立大学',
          major: '生物医学科学'
        }
      ], // 表格数据
      options1: {
        color: '#59E37E', // 颜色
        strokeWidth: 20, // 环宽
        width: 180, // 圆宽
        percentage: 88 // 进度
      }, // 进度条属性
      options2: {
        color: '#59E37E',
        strokeWidth: 5,
        width: 118,
        percentage: 75
      },
      options3: {
        color: '#59E37E',
        strokeWidth: 5,
        width: 118,
        percentage: 95
      },
      options4: {
        color: '#59E37E',
        strokeWidth: 5,
        width: 118,
        percentage: 80
      },
      height_auto: document.documentElement.clientHeight, // 获取页面高度
      niu: false,
      show: false, // 控制页面进入动画加载
      nowTime: '' // 获取现在时间信息
    }
  },
  created () {
    // 占位接口 全局统一判断登录使用
    caseChart().then(res => {
      console.log(res)
    })
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
    this.chart1() // 雷达图
    this.chart2() // 折线柱状图

    this.growPercent1(that.options1.percentage, 1500) // 进度条加载
    this.growPercent2(that.options2.percentage, 2000)
    this.growPercent3(that.options3.percentage, 2000)
    this.growPercent4(that.options4.percentage, 2000)

    this.setInterVal('add')

    // 获取时间节点
    const year = new Date().getFullYear() // 年
    const month = (new Date().getMonth() + 1) > 9 ? new Date().getMonth() + 1 : '0' + new Date().getMonth() + 1 // 注意！月份是从0月开始获取的，所以要+1;
    const day = new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate() // 日
    const hour = new Date().getHours() > 9 ? new Date().getHours() : '0' + new Date().getHours()
    const minute = new Date().getMinutes() > 9 ? new Date().getMinutes() : '0' + new Date().getMinutes()
    const second = new Date().getSeconds() > 9 ? new Date().getSeconds() : '0' + new Date().getSeconds()
    this.nowTime = `${year}-${month}-${day}  ${hour}:${minute}:${second}`
    console.log(year, month, day, hour, minute, second)
  },
  methods: {
    resize () {
      this.height_auto = document.documentElement.clientHeight
    },
    growPercent1 (cent, time) {
      const that = this
      that.options1.percentage = 0 // 进度条置零
      let add = 0
      const old = cent // 存放进度
      setTimeout(() => { // 设置延时器控制动画进行
        const setInter = setInterval(() => {
          if (add == old) { // 达到目标点后清除定时器
            clearInterval(setInter)
          } else {
            add += 2
            that.options1.percentage = add // 累加并赋值，实现过渡效果
          }
        }, 30)
      }, time)
    }, // 进度条加载过渡实现
    growPercent2 (cent, time) {
      const that = this
      that.options2.percentage = 0
      let add = 0
      const old = cent
      setTimeout(() => {
        const setInter = setInterval(() => {
          if (add == old) {
            clearInterval(setInter)
          } else {
            add += 5
            that.options2.percentage = add
          }
        }, 30)
      }, time)
    },
    growPercent3 (cent, time) {
      const that = this
      that.options3.percentage = 0
      let add = 0
      const old = cent
      setTimeout(() => {
        const setInter = setInterval(() => {
          if (add == old) {
            clearInterval(setInter)
          } else {
            add += 5
            that.options3.percentage = add
          }
        }, 30)
      }, time)
    },
    growPercent4 (cent, time) {
      const that = this
      that.options4.percentage = 0
      let add = 0
      const old = cent
      setTimeout(() => {
        const setInter = setInterval(() => {
          if (add == old) {
            clearInterval(setInter)
          } else {
            add += 5
            that.options4.percentage = add
          }
        }, 30)
      }, time)
    },
    chart1 () {
      const myChart = echarts.init(this.$refs.chart1)
      const option = {
        tooltip: {
          position: function (point, params, dom, rect, size) {
            return [0, point[1]]
          }
        },
        // 图表的位置
        grid: {
          position: 'center'
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              fontSize: 0
            }
          },
          indicator: [
            { name: '美高', max: 50 },
            { name: '普高', max: 50 },
            { name: '国际学校', max: 50 }
          ]
        },
        series: [
          {
            name: '申请占比',
            type: 'radar',
            // areaStyle: {normal: {}},
            areaStyle: {
              normal: {
                width: 1,
                opacity: 0.2
              }
            },
            data: [
              {
                value: [40, 20, 40],
                name: '申请占比',
                // 设置区域边框和区域的颜色
                itemStyle: {
                  normal: {
                    color: 'rgba(247, 140, 104, 1)',
                    lineStyle: {
                      color: 'rgba(247, 140, 104, 1)'
                    }
                  }
                }
              }
            ],
            label: {
              fontSize: 0
            }
          }
        ]
      }
      myChart.setOption(option)
    }, // echarts
    chart2 () {
      // Create chart instance
      const chart = am4core.create(this.$refs.chart2, am4charts.XYChart)
      am4core.options.autoSetClassName = true

      // Add data
      chart.data = [
        {
          country: '2012',
          visits: 1005
        },
        {
          country: '2013',
          visits: 1256
        },
        {
          country: '2014',
          visits: 1431
        },
        {
          country: '2015',
          visits: 1641
        },
        {
          country: '2016',
          visits: 1753
        },
        {
          country: '2017',
          visits: 1803
        },
        {
          country: '2018',
          visits: 2105
        },
        {
          country: '2019',
          visits: 2335
        },
        {
          country: '2020',
          visits: 2456
        }
      ]

      prepareParetoData()

      function prepareParetoData () {
        let total = 0

        for (let i = 0; i < chart.data.length; i++) {
          const value = chart.data[i].visits
          total += value
        }
        let sum = 0
        for (let i = 0; i < chart.data.length; i++) {
          const value = chart.data[i].visits
          sum += value
          chart.data[i].pareto = sum / total * 100
        }
      }

      // Create axes
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'country'
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.minGridDistance = 60
      categoryAxis.tooltip.disabled = true

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.minWidth = 50
      valueAxis.min = 0
      valueAxis.cursorTooltipEnabled = false

      // Create series
      const series = chart.series.push(new am4charts.ColumnSeries())
      series.sequencedInterpolation = true
      series.dataFields.valueY = 'visits'
      series.dataFields.categoryX = 'country'
      series.tooltipText = '[{categoryX}: bold]{valueY}[/]'
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

      const paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      paretoValueAxis.renderer.opposite = true
      paretoValueAxis.min = 0
      paretoValueAxis.max = 100
      paretoValueAxis.strictMinMax = true
      paretoValueAxis.renderer.grid.template.disabled = true
      paretoValueAxis.numberFormatter = new am4core.NumberFormatter()
      paretoValueAxis.numberFormatter.numberFormat = "#'%'"
      paretoValueAxis.cursorTooltipEnabled = false

      const paretoSeries = chart.series.push(new am4charts.LineSeries())
      paretoSeries.dataFields.valueY = 'pareto'
      paretoSeries.dataFields.categoryX = 'country'
      paretoSeries.yAxis = paretoValueAxis
      paretoSeries.tooltipText = "pareto: {valueY.formatNumber('#.0')}%[/]"
      paretoSeries.bullets.push(new am4charts.CircleBullet())
      paretoSeries.strokeWidth = 2
      paretoSeries.stroke = new am4core.InterfaceColorSet().getFor('alternativeBackground')
      paretoSeries.strokeOpacity = 0.5

      // Cursor
      chart.cursor = new am4charts.XYCursor()
      chart.cursor.behavior = 'panX'
    }, // amcharts
    startMove () {
      this.setInterVal('add')
    },
    stopMove () {
      clearInterval(this.inter)
    },
    setInterVal (data) { // 表格轮询滚动
      const that = this
      if (data == 'add') {
        that.inter = setInterval(() => {
          that.$refs.chatContent.scrollTop = that.$refs.chatContent.scrollTop + 1
          if (that.$refs.chatContent.scrollTop >= that.$refs.chatContent.scrollHeight - that.$refs.chatContent.offsetHeight) { // 判断是否到达底部
            clearInterval(that.inter)
            that.setInterVal('remove') // 清除定时器并换成向上滚动的定时器
          }
        }, 30)
      } else if (data == 'remove') {
        that.inter = setInterval(() => {
          that.$refs.chatContent.scrollTop = that.$refs.chatContent.scrollTop - 1
          if (that.$refs.chatContent.scrollTop == 0) { // 判断是否到达顶部
            clearInterval(that.inter)
            that.setInterVal('add') // 清除定时器并换成向下滚动的定时器
          }
        }, 30)
      }
    }
  },
  computed: {

  },
  watch: {
    $route: function (to) {
      clearInterval(this.inter)
      this.$refs.chatContent.scrollTop = 0
    }
  },
  beforeDestroy () {
    clearInterval(this.inter)
  }
}
</script>
<style scoped lang="scss">
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
.chart{
  font-size: 0.12rem;
}
.case{
  background: url('../image/home/bg00.png') no-repeat center;
  background-size: cover;
  padding-bottom: .5rem;
  .logo{
    width: 0.96rem;
    // width: 96px;
    display: block;
    margin-bottom: 0.3rem;
    opacity: 0;
    &.on{
      animation: on_translateY .8s 1;
      animation-fill-mode: forwards;
    }
  }
  .title{
    opacity: 0;
    &.on{
      animation: on_translateY .8s .4s 1;
      animation-fill-mode: forwards;
    }
  }
  .bg1{
    position: absolute;
    width: 8.03rem;
    height: 8.03rem;
    // height: 9.49rem;
    left: 50%;
    transform: translateX(-50%);
    top: 0.3rem;
    opacity: 0;
    &.on{
      animation: on_scale .8s 1.6s 1;
      animation-fill-mode: forwards;
    }
    .bg{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .bg2{
      width: 100%;
    }
    .bg3{
      width: 90%;
    }
    .bg4{
      width: 80%;
    }
    .c{width:80%;height:80%;border:0.03rem solid rgba(116, 218, 214, 1);border-radius:50%;position:absolute;top:50%;left:50%;transform:translate3d(-50%,-50%,-0.5rem);}
    .c:after{content:"";position:absolute;left:-0.06rem;top:-0.05rem;width:100%;height:100%;border-radius:50%;border:0.06rem solid rgba(116, 218, 214, 1);border-top-color:transparent;border-bottom-color:transparent;animation:R 10s infinite linear;}

    .c2{width:100%;height:100%;border:1px solid rgba(116, 218, 214, 1);border-radius:50%;position:absolute;top:0;left:0;padding:1px;animation:L 80s infinite linear;box-sizing:border-box;}

    .c3{width:33%;height:33%;border:1px solid rgba(116, 218, 214, 1);border-radius:50%;transform:translate3d(-50%,-50%,0.05rem);position:absolute;top:50%;left:50%;}
    .c3:after{content:"";position:absolute;left:-0.05rem;top:-0.05rem;width:100%;height:100%;border-radius:50%;border:0.05rem solid rgba(116, 218, 214, 1);border-top-color:transparent;border-bottom-color:transparent;animation:L 5s infinite linear;}

    .c4{width:30%;height:30%;transform:translate3d(-50%,-50%,0px);position:absolute;left:50%;top:50%;}
    .c4:after{content:"";width:100%;height:100%;position:absolute;left:-0.03rem;top:-0.03rem;border-radius:50%;border:0.03rem solid rgba(116, 218, 214, 1);border-left-color:transparent;animation:R 5s infinite linear;}

    .c5{width:31%;height:31%;transform:translate3d(-50%,-50%,0.65rem);position:absolute;left:50%;top:50%;border-radius:50%;}
    .c5:after{content:"";width:100%;height:100%;position:absolute;left:-1px;top:-1px;border:1px solid rgba(116, 218, 214, 1);border-right-color:transparent;border-bottom-color:transparent;border-radius:50%;animation:L 5s infinite linear;}

    .c6{width:25%;height:25%;transform:translate3d(-50%,-50%,0.61rem);position:absolute;left:50%;top:50%;border-radius:50%;}
    .c6:after{content:"";width:100%;height:100%;position:absolute;left:-1px;top:-1px;border:1px solid rgba(116, 218, 214, 1);border-right-color:transparent;border-top-color:transparent;border-radius:50%;animation:R 10s infinite linear;}

    i{height: 0.26rem;width:1px;background:rgba(116, 218, 214, 1);position:absolute;left:50%;margin-left:-0.1rem;transform-origin:949% 1540%;}

    i:nth-child(1){transform:rotate(-5deg); }
    i:nth-child(2){transform:rotate(5deg);}
    i:nth-child(3){transform:rotate(15deg);}
    i:nth-child(4){transform:rotate(25deg);}
    i:nth-child(5){transform:rotate(35deg);}
    i:nth-child(6){transform:rotate(45deg);}
    i:nth-child(7){transform:rotate(55deg);}
    i:nth-child(8){transform:rotate(65deg);}
    i:nth-child(9){transform:rotate(75deg);}
    i:nth-child(10){transform:rotate(85deg);}
    i:nth-child(11){transform:rotate(95deg);}
    i:nth-child(12){transform:rotate(105deg);}
    i:nth-child(13){transform:rotate(115deg);}
    i:nth-child(14){transform:rotate(125deg);}
    i:nth-child(15){transform:rotate(135deg);}
    i:nth-child(16){transform:rotate(145deg);}
    i:nth-child(17){transform:rotate(155deg);}
    i:nth-child(18){transform:rotate(165deg);}
    i:nth-child(19){transform:rotate(175deg);}
    i:nth-child(20){transform:rotate(185deg);}
    i:nth-child(21){transform:rotate(195deg);}
    i:nth-child(22){transform:rotate(205deg);}
    i:nth-child(23){transform:rotate(215deg);}
    i:nth-child(24){transform:rotate(225deg);}
    i:nth-child(25){transform:rotate(235deg);}
    i:nth-child(26){transform:rotate(245deg);}
    i:nth-child(27){transform:rotate(255deg);}
    i:nth-child(28){transform:rotate(265deg);}
    i:nth-child(29){transform:rotate(275deg);}
    i:nth-child(30){transform:rotate(285deg);}
    i:nth-child(31){transform:rotate(295deg);}
    i:nth-child(32){transform:rotate(305deg);}
    i:nth-child(33){transform:rotate(315deg);}
    i:nth-child(34){transform:rotate(325deg);}
    i:nth-child(35){transform:rotate(335deg);}
    i:nth-child(36){transform:rotate(345deg);}
    i:nth-child(37){transform:rotate(355deg);}
    i:nth-child(38){transform:rotate(365deg);}

    figure{width:100%;height:100%;margin:0;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotateX(0deg) rotateY(0deg) scale(1.1,1.1);transition:1.4s;transform-style: preserve-3d;}
    /* figure:hover{transform:translate(-50%,-50%) rotateX(-40deg) rotateY(30deg) scale(1.1,1.1);} */

    @keyframes R{
      0%{transform:rotate(20deg);}
      100%{transform:rotate(380deg)}
    }
    @keyframes L{
      0%{transform:rotate(0deg);}
      100%{transform:rotate(-360deg)}
    }
  }
  .num{
    opacity: 0;
    &.on{
      animation: on_translateY .8s .8s 1;
      animation-fill-mode: forwards;
    }
    .fr{
      margin-right: 60px;
      text-align: center;
      /deep/ .el-progress{
        float: left;
        margin-right: 0.2rem;
        /deep/ .el-progress-circle{
          width: 1.8rem !important;
          height: 1.8rem !important;
        }
      }
      & > div{
        float: left;
        p{
          color: rgba(56, 56, 116, .52);
          font-size: 0.12rem;
          margin-bottom: 0.08rem;
          margin-top: 0.4rem;
        }
        span{
          color: #383874;
          font-size: 0.18rem;
          b{
            font-size: 0.36rem;
            display: block;
          }
        }
      }
    }
    p{
      color: #343471;
      font-size: 0.18rem;
      margin-bottom: 0.2rem;
      em{
        color: #A5A5C1;
        font-size: 0.14rem;
        display: inline-block;
        margin-left: 0.4rem;
        font-style: normal;
      }
    }
    span{
      color: #383874;
      font-size: 0.72rem;
      display: block;
      margin-bottom: 0.2rem;
      em{
        color: #383774;
        font-size: 0.18rem;
        font-style: normal;
      }
    }
    table{
      border-collapse: collapse;
      margin-left: 0.2rem;
      box-sizing: border-box;
      thead{
        display: block;
      }
      tbody{
        height: 1.5rem;
        overflow-y: scroll;
        display: block;
        /*滚动条整体样式*/
        &::-webkit-scrollbar {
          width: 0.08rem;
          height: 0px;
        }

        /*滚动条里面小方块*/
        &::-webkit-scrollbar-thumb {
          background-color: #474DE5;
        }

        /*滚动条里面轨道*/
        &::-webkit-scrollbar-track {
          border-radius: 0.1rem;
          background: #EDEDED;
        }
      }
      tbody tr{
        position: relative;
        border-bottom: 0.02rem solid #E9EBF6;
        &:last-child{
          border: 0;
        }
      }
      th{
        color: #383874;
        font-size: 0.16rem;
        padding: 0 0.15rem;
        padding-bottom: 0.1rem;
        box-sizing: border-box;
        &:nth-child(1){
          text-align: left;
          width: 0.68rem;
        }
        &:nth-child(2){
          width: 1.24rem;
        }
        &:nth-child(3){
          width: 1.1rem;
        }
      }
      td{
        color: #383874;
        font-size: 0.14rem;
        padding: 0.08rem 0.13rem;
        position: relative;
        &:nth-child(1):before{
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: -0.2rem;
          width: 0.06rem;
          height: 0.06rem;
          background: #69DEB2;
          border-radius: 50%;
        }
        &:nth-child(2){
          text-align: center;
        }
        &:nth-child(3){
          text-align: center;
        }
      }
    }
  }
  .box{
    & > .clearfix{
      opacity: 0;
      &.on{
        animation: on_translateY .8s 1.2s 1;
        animation-fill-mode: forwards;
      }
      margin-top: 0.4rem;
      width: 100%;
      position: relative;
      display: flex;
      justify-content: space-between;
      & > .fl{
        margin-right: 0.3rem;
        height: 3.18rem;
        padding: 0.1rem 0.3rem 0.3rem;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: 0px 0px 0.04rem 0px rgba(72, 146, 255, 0.03);
        border-radius: 0.2rem;
        &:last-child{
          margin-right: 0;
        }
        & > p{
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
        &:nth-child(1){
          p{
            margin-bottom: .6rem;
          }
          & > div{
            .chart{
              width: 1.31rem;
              height: 1.31rem;
              float: left;
              margin-right: .3rem;
              position: relative;
              font-size: 0.12rem;
            }
            & > .fl{
              width: calc( 100% - 1.31rem - .3rem );
              & > div{
                margin-bottom: 0.35rem;
                position: relative;
                padding-left: 0.27rem;
                box-sizing: border-box;
                color: #383874;
                font-size: 0.14rem;
                & > span{
                  color: #000000;
                  font-size: 0.14rem;
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  left: 1.2rem;
                }
                & > em{
                    width: 0.23rem;
                    height: 0.23rem;
                    background: rgba(247, 140, 104, .1);
                    border-radius: 50%;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                &:nth-child(2){
                  em{
                    background: rgba(55, 195, 252, .2);
                  }
                }
                &:nth-child(3){
                  em{
                    background: rgba(231, 235, 254, 1);
                  }
                }
              }
            }
          }
        }
        &:nth-child(2){
          p{
            margin-bottom: .2rem;
          }
          & > .fl{
            width: calc( 100% - 4.2rem );
            & .fl{
              width: 1.18rem;
              margin-left: 0.6rem;
              text-align: center;
              /deep/ .el-progress{
                display: block;
                margin-bottom: 0.1rem;
                /deep/ .el-progress-circle{
                  width: 1.18rem !important;
                  height: 1.18rem !important;
                }
              }
            }
            & .clearfix:nth-child(2){
              margin-top: 0.2rem;
              .fl{
                width: 1.25rem;
                padding-left: 0.5rem;
                box-sizing: border-box;
                margin-left: .2rem;
                margin-right: 0.2rem;
                .offer{
                  width: 0.47rem;
                  height: 0.44rem;
                  line-height: 0.44rem;
                  background: #FFFFFF;
                  box-shadow: 0px 0px 0.13rem 0px rgba(72, 146, 255, 0.14);
                  border-radius: 0.11rem;
                  position: absolute;
                  left: 0;
                  top: 50%;
                  transform: translateY(-50%);
                }
                p{
                  color: #353662;
                  font-size: 0.22rem;
                  font-weight: bold;
                  margin-bottom: 0.05rem;
                  margin-top: 0;
                }
                span{
                  color: #353662;
                  font-size: 0.12rem;
                  em{
                    color: rgba(53, 54, 98, .65);
                    font-size: 0.17rem;
                    font-style: normal;
                  }
                }
              }
            }
          }
          & > .fr{
            width: 4.2rem;
            height: 2.2rem;
            .chart{
              width: 100%;
              height: 100%;
              position: relative;
              &::before{
                content: '';
                width: 0.6rem;
                height: .2rem;
                position: absolute;
                bottom: 0;
                left: 0;
                background-color: #fff;
                z-index: 999;
              }
            }
          }
        }
        &:nth-child(3){
          .fl{
            width: 1.18rem;
            margin-right: 0.3rem;
            text-align: center;
            /deep/ .el-progress{
              display: block;
              margin-bottom: 0.1rem;
              /deep/ .el-progress-circle{
                width: 1.18rem !important;
                height: 1.18rem !important;
              }
            }
            span{
              color: #A8B4C2;
              font-size: 0.15rem;
            }
            h3{
              color: #383874;
              font-size: 0.24rem;
              font-weight: bold;
              margin-bottom: 0.05rem;
              margin-top: 0.2rem;
              em{
                color: #353662;
                font-size: 0.12rem;
              }
            }
            p{
              color: #A8B4C2;
              margin-top: 0;
              font-size: 0.14rem;
            }
          }
          .fr{
            width: calc( 100% - 1.18rem - .3rem );
            p{
              color: #383874;
              font-size: 0.14rem;
              margin-bottom: 0.3rem;
            }
            & > div{
              margin-bottom: 0.3rem;
              padding-left: 0.3rem;
              box-sizing: border-box;
              color: #FF912A;
              font-size: 0.14rem;
              font-weight: bold;
              position: relative;
              &:nth-child(2){
                color: #37C3FC;
              }
              &:nth-child(3){
                color: #785AFC;
              }
              img{
                width: 0.14rem;
                height: 0.14rem;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                box-shadow: 0px 0px 0.1rem 0px rgba(72, 146, 255, 0.17);
                border-radius: 0.06rem;
              }
              em{
                color: #4F6BF0;
                font-size: 0.18rem;
                font-weight: bold;
                position: absolute;
                font-style: normal;
                left: 1.2rem;
                top: 50%;
                transform: translateY(-50%);
              }
            }
          }
        }
      }
      .one,
      .three{
        width: 22%;
      }
      .two{
        width: 52%;
      }
    }
  }
}
@keyframes on_scale{
  from{
    opacity: 0;
    transform: translateX(-55%) scale(.8);
  }
  to{
    opacity: 1;
    transform: translateX(-55%) scale(1);
  }
}
</style>
