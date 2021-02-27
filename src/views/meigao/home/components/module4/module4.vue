<template>
  <div
  :style="
      'background-color: #EFF1FA; overflow: hidden; height: ' +
        height_auto +
        'px;'
    "
  >
    <div class="content">
      <img
        :class="show ? 'on' : ''"
        src="../../../../mB/image/home/haicelogo.png"
        alt=""
        class="logo"
      />
      <div class="title wow animate__fadeInDown" data-wow-delay="0.1s">
        美国高中学生规划趋势分析
      </div>
      <div class="box clearfix">
        <div class="fl">
          <div class="con clearfix">
            <div class="fl wow animate__fadeInDown" :data-wow-delay="'0.'+(index*2)+'s'" v-for="(item, index) in data" :key="index">
              <p>{{item.p}}</p>
              <div class="chart" :id="'chart' + (index + 1)"></div>
            </div>
          </div>
          <div class="progress clearfix">
            <p class="wow animate__fadeInDown" data-wow-delay="0.8s">申请筹备时间</p>
            <div class="fl wow animate__fadeInDown" :data-wow-delay="'1.'+(index*2)+'s'" v-for="(item, index) in data_progress" :key="index">
              <el-progress type="circle" :percentage="item.proportion" :color="index % 2 == 0 ? '#5AE380' : '#00A0E9'" :stroke-width="8" :width="100"></el-progress>
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
        <div class="fr" :class="show ? 'on' : ''">
          <img src="./image/bg34.png" alt="" class="img1">
          <img src="./image/bg35.png" alt="" class="img2">
          <img src="./image/bg36.png" alt="" class="img3">
          <img src="./image/bg37.png" alt="" class="img4">
          <img src="./image/bg38.png" alt="" class="img5">
          <img src="./image/bg39.png" alt="" class="img6">
          <img src="./image/bg310.png" alt="" class="img7">
          <img src="./image/bg35.png" alt="" class="img8">
        </div>
        <div class="grade wow animate__fadeInDown" data-wow-delay="1.8s">
          <p>申请年级分布</p>
          <div class="chart" ref="chart"></div>
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
import { casetrend } from '@/api/meigao'
import mixin from '../wow.js'
am4core.useTheme(am4themesAnimated)
export default {
  mixins: [mixin],
  data () {
    return {
      height_auto: document.documentElement.clientHeight, // 获取页面高度
      show: false, // 控制页面进入动画加载
      data: [
        {
          p: 'TOEFL 成绩分布占比',
          data: [
            {
              category: 'Place #1',
              first: 40,
              second: 55,
              third: 60
            },
            {
              category: 'Place #2',
              first: 30,
              second: 78,
              third: 69
            },
            {
              category: 'Place #3',
              first: 27,
              second: 40,
              third: 45
            },
            {
              category: 'Place #4',
              first: 50,
              second: 33,
              third: 22
            }
          ]
        },
        {
          p: '留学前参与项目占比',
          data: [
            {
              category: 'Place #1',
              first: 40,
              second: 55,
              third: 60
            },
            {
              category: 'Place #2',
              first: 30,
              second: 78,
              third: 69
            },
            {
              category: 'Place #3',
              first: 27,
              second: 40,
              third: 45
            },
            {
              category: 'Place #4',
              first: 50,
              second: 33,
              third: 22
            }
          ]
        },
        {
          p: '留学后参与项目占比',
          data: [
            {
              category: 'Place #1',
              first: 40,
              second: 55,
              third: 60
            },
            {
              category: 'Place #2',
              first: 30,
              second: 78,
              third: 69
            },
            {
              category: 'Place #3',
              first: 27,
              second: 40,
              third: 45
            },
            {
              category: 'Place #4',
              first: 50,
              second: 33,
              third: 22
            }
          ]
        }
      ],
      data_progress: [
        {
          proportion: 58,
          name: '半年'
        },
        {
          proportion: 22,
          name: '半年到一年'
        },
        {
          proportion: 25,
          name: '一年到一年半'
        },
        {
          proportion: 23,
          name: '一年半到两年'
        },
        {
          proportion: 23,
          name: '两年以上'
        }
      ],
      data_grade: [
        {
          name: '六年级',
          max: 100
        },
        {
          name: '六年级',
          max: 100
        },
        {
          name: '六年级',
          max: 100
        },
        {
          name: '六年级',
          max: 100
        },
        {
          name: '六年级',
          max: 100
        },
        {
          name: '六年级',
          max: 100
        }
      ]
    }
  },
  mounted () {
    this.show = true
    this.getList()
    setTimeout(() => {
      this.data_progress.forEach((item, index) => {
        this.growPercent(item, 600 + index * 250)
      })
    }, 1000)
  },
  methods: {
    getList () {
      casetrend().then(res => {
        const { toefl, project_after: projectAfter, project_front: projectFront, preparation, appli_grade: dataGrade, year } = res.data
        console.log('dataGrade: ', dataGrade)
        this.chartDiv(toefl, 'chart1', year)
        this.chartDiv(projectAfter, 'chart2', year)
        this.chartDiv(projectFront, 'chart3', year)
        this.data_progress = preparation
        const proportionArr = dataGrade.map((item, index) => {
          this.data_grade[index].name = item.name
          return item.proportion
        })
        this.chart(dataGrade)
      })
    },
    chartDiv (data, node, year) {
      const chart = am4core.create(node, am4charts.XYChart)
      am4core.options.autoSetClassName = true

      chart.legend = new am4charts.Legend()
      chart.legend.position = 'top'
      chart.legend.contentAlign = 'right'
      chart.legend.useDefaultMarker = true
      const marker = chart.legend.markers.template
      marker.width = 10
      marker.height = 10
      chart.colors.list = [
        am4core.color('#8786E3'),
        am4core.color('#87E2B2'),
        am4core.color('#E4E6E9')
      ]
      const xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      xAxis.dataFields.category = 'name'
      xAxis.renderer.cellStartLocation = 0.1
      xAxis.renderer.cellEndLocation = 0.9
      xAxis.renderer.grid.template.location = 0
      xAxis.renderer.grid.template.stroke = am4core.color('#D9D9D9')
      xAxis.renderer.grid.template.strokeWidth = 1

      xAxis.renderer.grid.template.location = 0
      xAxis.renderer.minGridDistance = 60
      xAxis.tooltip.disabled = true
      const yAxis = chart.yAxes.push(new am4charts.ValueAxis())
      yAxis.min = 0
      yAxis.renderer.grid.template.stroke = am4core.color('#D9D9D9')
      yAxis.renderer.grid.template.strokeWidth = 1
      function createSeries (value, name) {
        const series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'name'
        series.name = name
        series.events.on('hidden', arrangeColumns)
        series.events.on('shown', arrangeColumns)
        const bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = -10
        // bullet.label.text = '[#333]{valueY}%'
        bullet.label.fontSize = 10
        bullet.label.fill = am4core.color('#ffffff')

        return series
      }

      chart.data = data

      createSeries('num1', year[0])
      createSeries('num2', year[1])
      createSeries('num3', year[2])

      function arrangeColumns () {
        const series = chart.series.getIndex(0)

        const w =
          1 -
          xAxis.renderer.cellStartLocation -
          (1 - xAxis.renderer.cellEndLocation)
        if (series.dataItems.length > 1) {
          const x0 = xAxis.getX(series.dataItems.getIndex(0), 'categoryX')
          const x1 = xAxis.getX(series.dataItems.getIndex(1), 'categoryX')
          const delta = ((x1 - x0) / chart.series.length) * w
          if (am4core.isNumber(delta)) {
            const middle = chart.series.length / 2

            let newIndex = 0
            chart.series.each(function (series) {
              if (!series.isHidden && !series.isHiding) {
                series.dummyData = newIndex
                newIndex++
              } else {
                series.dummyData = chart.series.indexOf(series)
              }
            })
            const visibleCount = newIndex
            const newMiddle = visibleCount / 2

            chart.series.each(function (series) {
              const trueIndex = chart.series.indexOf(series)
              const newIndex = series.dummyData

              const dx = (newIndex - trueIndex + middle - newMiddle) * delta

              series.animate(
                { property: 'dx', to: dx },
                series.interpolationDuration,
                series.interpolationEasing
              )
              series.bulletsContainer.animate(
                { property: 'dx', to: dx },
                series.interpolationDuration,
                series.interpolationEasing
              )
            })
          }
        }
      }
    },
    growPercent (cent, time) {
      // const that = this
      const old = cent.percentage // 存放进度
      cent.percentage = 0 // 进度条置零
      let add = 0
      setTimeout(() => { // 设置延时器控制动画进行
        const setInter = setInterval(() => {
          if (add == old) { // 达到目标点后清除定时器
            clearInterval(setInter)
          } else {
            add += 1
            cent.percentage = add // 累加并赋值，实现过渡效果
          }
        }, 30)
      }, time)
    }, // 进度条加载过渡实现
    chart (data) {
      // const myChart = echarts.init(this.$refs.chart)
      const chart = am4core.create(this.$refs.chart, am4charts.PieChart3D)
      chart.colors.list = [

      ]
      chart.padding(20)
      chart.hiddenState.properties.opacity = 0 // this creates initial fade-in
      chart.data = data
      chart.innerRadius = am4core.percent(20)
      chart.radius = am4core.percent(60)
      chart.depth = 100
      chart.legend = new am4charts.Legend()
      const series = chart.series.push(new am4charts.PieSeries())
      series.dataFields.value = 'proportion'
      series.dataFields.depthValue = 'proportion'
      series.dataFields.category = 'name'
      series.slices.template.cornerRadius = 0
      // series.colors.step = 3
      series.labels.template.maxWidth = 70
      series.labels.template.wrap = true
      series.alignLabels = false
      series.labels.template.fontSize = 11

      const marker = chart.legend.markers.template
      marker.width = 20
      marker.height = 4
      // series.labels.template.disabled = true
      // series.ticks.template.disabled = true
    } // echarts
  }
}
</script>
<style lang="scss" scoped>
.content{
  .title{
    margin-bottom: .3rem !important;
  }
  .logo {
    opacity: 0;
    &.on {
      animation: on_translateY 0.8s 1;
      animation-fill-mode: forwards;
    }
  }
  .box{
    & > .fl{
      width: 7.56rem;
      z-index: 2;
      .con{
        .fl{
          padding-top: 40px;
          position: relative;
          box-sizing: border-box;
          width: 3.68rem;
          height: 2.51rem;
          margin-right: .2rem;
          margin-bottom: .2rem;
          background-color: #fff;
          &:nth-child(1){
            width: 4.59rem;
          }
          &:last-child{
            margin-right: 0;
          }
          p{
            height: .4rem;
            line-height: .4rem;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            text-align: center;
            color: #213037;
            font-size: .14rem;
          }
          .chart{
            width: 100%;
            height: 100%;
            position: relative;
            &::after{
              content: '';
              width: 0.8rem;
              height: 0.24rem;
              background: white;
              bottom: 0px;
              left: 0px;
              position: absolute;
            }
          }
        }
      }
      .progress{
        p{
          color: #213037;
          font-size: .18rem;
          font-weight: bold;
          margin-bottom: .17rem;
        }
        .fl{
          width: 1.4rem;
          height: 1.83rem;
          background: #FFFFFF;
          margin-right: .14rem;
          padding: .26rem .2rem 0;
          box-sizing: border-box;
          &:last-child{
            margin-right: 0;
          }
          span{
            display: block;
            text-align: center;
            color: #383874;
            font-size: .14rem;
            margin-top: .2rem;
            line-height: 1;
          }
        }
      }
    }
    & > .fr{
      z-index: 1;
      opacity: 0;
      &.on{
        animation: on_translateX .8s 1.6s 1;
        animation-fill-mode: forwards;
      }
      float: left !important;
      width: calc( 100% - 1.07rem - 5.47rem - 3.3rem);
      margin-left: -0.5rem;
      height: 6.46rem;
      margin-top: .9rem;
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
    .grade{
      width: 3.68rem;
      height: 5.17rem;
      background: #FFFFFF;
      box-shadow: 0px 0px .04rem 0px rgba(72, 146, 255, 0.03);
      position: absolute;
      right: .2rem;
      bottom: .2rem;
      z-index: 3;
      padding: .2rem .3rem 0;
      box-sizing: border-box;
      p{
        color: #213037;
        font-size: .18rem;
        font-weight: bold;
        margin-bottom: .1rem;
      }
      .chart{
        width: 100%;
        height: calc(100% - .48rem);
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
