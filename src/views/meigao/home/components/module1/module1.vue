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
      <div class="bg">
        <p class="wow animate__fadeInDown" data-wow-delay="0.1s">全亚州<br />签约学生数量</p>
        <h3 class="wow animate__fadeInDown" data-wow-delay="0.4s">
          5,000
          <span>韩、日、泰、越境外人数300+</span>
        </h3>
        <div class="img">
          <div class="icon">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div class="circle">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div class="square">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div class="lineCircle">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div class="lineSquare">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <!-- <div class="yellowSpread">
            <i></i>
          </div> -->
          <div class="whiteSpread">
            <i></i>
            <i></i>
          </div>
          <div class="tip">
            <span>服务中心</span>
            <span>寄宿案例</span>
            <span>走读案例</span>
          </div>
          <div class="time">
            {{ time }}
          </div>
        </div>
      </div>
      <div :class="show ? 'on' : ''" class="title">
        做精英家庭的梦想合伙人
        <p>美国高中案例展示</p>
      </div>
      <div class="box clearfix">
        <div class="fl">
          <div v-for="(item, index) in data" :key="index" class="wow animate__fadeInDown" :data-wow-delay="'0.' + (index*2)+'s'">
            <p>{{ item.p }}</p>
            <div class="chart" :id="'chart' + (index + 1)"></div>
          </div>
        </div>
        <div class="fr wow animate__fadeInDown" data-wow-delay="0.8s">
          <div class="head">top50寄宿学校</div>
          <div class="con">
            <table>
              <thead>
                <tr>
                  <th>学校名称</th>
                  <th>录取率</th>
                  <th>小留录取数量</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in table_data" :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ item.proportion }}</td>
                  <td>{{ item.num }}</td>
                </tr>
              </tbody>
            </table>
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
import { gzindex } from '@/api/meigao.js'
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
          p: '每年出国读高中的人数趋势',
          data: [
            {
              country: 'USA',
              visits: 3025
            },
            {
              country: 'China',
              visits: 1882
            },
            {
              country: 'Japan',
              visits: 1809
            },
            {
              country: 'Germany',
              visits: 1322
            },
            {
              country: 'UK',
              visits: 1122
            },
            {
              country: 'France',
              visits: 1114
            },
            {
              country: 'India',
              visits: 984
            },
            {
              country: 'Spain',
              visits: 711
            },
            {
              country: 'Netherlands',
              visits: 665
            }
          ]
        },
        {
          p: '选美国及其他国家的趋势',
          data: [
            {
              category: 'Place #1',
              first: 40,
              second: 55
            },
            {
              category: 'Place #2',
              first: 30,
              second: 78
            },
            {
              category: 'Place #3',
              first: 27,
              second: 40
            },
            {
              category: 'Place #4',
              first: 50,
              second: 33
            }
          ]
        },
        {
          p: '选走读与寄宿的趋势',
          data: [
            {
              year: '2014',
              income: 23.5,
              expenses: 21.1
            },
            {
              year: '2015',
              income: 2.2,
              expenses: 30.5
            }
          ]
        }
      ],
      table_data: [],
      time: ''
    }
  },
  mounted () {
    this.show = true
    this.getNowTime()
    this.getList()
  },
  methods: {
    getList () {
      gzindex().then(res => {
        const { goabroad, country, home, school } = res.data
        this.table_data = school
        this.data[0].data = goabroad
        this.data[1].data = country
        this.data[2].data = home
        this.divChart1()
        this.divChart2()
        this.divChart3()
      })
    },
    divChart1 () {
      // Create chart instance
      const chart = am4core.create('chart1', am4charts.XYChart)
      am4core.options.autoSetClassName = true

      // Add data
      chart.data = this.data[0].data

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
          chart.data[i].pareto = (sum / total) * 100
        }
      }

      // Create axes
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'name'
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.minGridDistance = 60
      categoryAxis.tooltip.disabled = true

      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.minGridDistance = 15
      categoryAxis.renderer.grid.template.location = 0.5
      categoryAxis.renderer.labels.template.fontSize = 12
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.minWidth = 50
      valueAxis.min = 0
      valueAxis.cursorTooltipEnabled = false

      // Create series
      const series = chart.series.push(new am4charts.ColumnSeries())
      series.sequencedInterpolation = true
      series.dataFields.valueY = 'num'
      series.dataFields.categoryX = 'name'
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
      paretoSeries.dataFields.valueY = 'proportion'
      paretoSeries.dataFields.categoryX = 'name'
      paretoSeries.yAxis = paretoValueAxis
      paretoSeries.tooltipText = "pareto: {valueY.formatNumber('#.0')}%[/]"
      paretoSeries.bullets.push(new am4charts.CircleBullet())
      paretoSeries.strokeWidth = 2
      paretoSeries.stroke = new am4core.InterfaceColorSet().getFor(
        'alternativeBackground'
      )
      paretoSeries.strokeOpacity = 0.5

      // Cursor
      chart.cursor = new am4charts.XYCursor()
      chart.cursor.behavior = 'panX'
    },
    divChart2 () {
      const chart = am4core.create('chart2', am4charts.XYChart)
      am4core.options.autoSetClassName = true
      chart.legend = new am4charts.Legend()
      chart.legend.position = 'top'
      chart.legend.contentAlign = 'right'
      chart.legend.useDefaultMarker = true
      const marker = chart.legend.markers.template
      marker.width = 10
      marker.height = 10

      chart.colors.list = [
        am4core.color('#87E2B2'),
        am4core.color('#E4E6E9')
      ]

      const xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      xAxis.dataFields.category = 'name'
      xAxis.renderer.grid.template.disabled = true
      xAxis.renderer.cellStartLocation = 0.05
      xAxis.renderer.cellEndLocation = 1

      xAxis.renderer.grid.template.location = 0
      xAxis.renderer.minGridDistance = 20
      xAxis.renderer.grid.template.location = 0.5
      xAxis.renderer.labels.template.fontSize = 12
      const yAxis = chart.yAxes.push(new am4charts.ValueAxis())
      yAxis.renderer.grid.template.disabled = true

      function createSeries (value, name) {
        const series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'name'
        series.name = name
        series.columns.template.width = am4core.percent(80)
        series.events.on('hidden', arrangeColumns)
        series.events.on('shown', arrangeColumns)

        const bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = -7
        bullet.label.text = '[#000]{valueY}%'
        bullet.label.fontSize = 10
        bullet.label.fill = am4core.color('#ffffff')

        return series
      }

      chart.data = this.data[1].data

      createSeries('plan', '计划中')
      createSeries('study', '留学中')

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
    divChart3 () {
      const chart = am4core.create('chart3', am4charts.XYChart)
      chart.data = this.data[2].data
      chart.colors.list = [
        am4core.color('#88A3F1'),
        am4core.color('#79FF66')
      ]
      console.log('chart.data: ', chart.data)
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.ticks.template.disabled = true
      categoryAxis.renderer.line.opacity = 0
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.renderer.minGridDistance = 40
      categoryAxis.dataFields.category = 'name'
      categoryAxis.startLocation = 0.4
      categoryAxis.endLocation = 0.6

      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.minGridDistance = 15
      categoryAxis.renderer.grid.template.location = 0.5
      categoryAxis.renderer.labels.template.fontSize = 12
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.tooltip.disabled = true
      valueAxis.renderer.line.opacity = 0
      valueAxis.renderer.ticks.template.disabled = true
      valueAxis.min = 0

      const lineSeries1 = chart.series.push(new am4charts.LineSeries())
      lineSeries1.dataFields.categoryX = 'name'
      lineSeries1.dataFields.valueY = 'dayreading'
      lineSeries1.tooltipText = '走读: {valueY.value}'
      lineSeries1.fillOpacity = 0.5
      lineSeries1.strokeWidth = 1
      // lineSeries1.stroke = am4core.color('#3265F1')
      // lineSeries1.fill = am4core.color('#3265F1')
      lineSeries1.tensionX = 0.8
      lineSeries1.tensionY = 0.3
      lineSeries1.name = '走读'

      const bullet1 = lineSeries1.bullets.push(new am4charts.CircleBullet())
      bullet1.circle.radius = 4
      bullet1.circle.fill = am4core.color('#fff')
      bullet1.circle.strokeWidth = 2

      const lineSeries2 = chart.series.push(new am4charts.LineSeries())
      lineSeries2.dataFields.categoryX = 'name'
      lineSeries2.dataFields.valueY = 'boarding'
      lineSeries2.tooltipText = '寄宿: {valueY.value}'
      lineSeries2.strokeWidth = 1
      // lineSeries2.stroke = am4core.color('#79FF66')
      lineSeries2.tensionX = 0.8
      lineSeries2.tensionY = 0.3
      lineSeries2.name = '寄宿'

      const bullet2 = lineSeries2.bullets.push(new am4charts.CircleBullet())
      bullet2.circle.radius = 4
      bullet2.circle.fill = am4core.color('#fff')
      bullet2.circle.strokeWidth = 2

      chart.cursor = new am4charts.XYCursor()
      chart.cursor.behavior = 'panX'
      chart.cursor.lineX.opacity = 0
      chart.cursor.lineY.opacity = 0

      chart.legend = new am4charts.Legend()
      chart.legend.position = 'right'
      chart.legend.valign = 'top'
      chart.legend.useDefaultMarker = true
      const marker = chart.legend.markers.template
      marker.width = 20
      marker.height = 4
    },
    getNowTime () {
      const yy = new Date().getFullYear()
      const mm = new Date().getMonth() + 1
      const dd = new Date().getDate()
      const hh = new Date().getHours()
      const mf =
        new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes()
      this.time = yy + '年' + mm + '月' + dd + '日  ' + hh + ':' + mf
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  background: url('./image/bg00.png') no-repeat center;
  background-size: cover;
  .logo {
    opacity: 0;
    &.on {
      animation: on_translateY 0.8s 1;
      animation-fill-mode: forwards;
    }
  }
  .title {
    margin-bottom: 0.4rem !important;
    opacity: 0;
    &.on {
      animation: on_translateY 0.8s 0.4s 1;
      animation-fill-mode: forwards;
    }
  }
  .box > .fl {
    width: 4.56rem;
    & > div {
      margin-bottom: 0.2rem;
      p {
        color: #213037;
        font-size: 0.18rem;
        margin-bottom: 0.1rem;
      }
      div {
        width: 4.56rem;
        height: 2rem;
        background: #ffffff;
        padding: 0.05rem 0.2rem;
        box-sizing: border-box;
        position: relative;
        .chart {
          width: 100%;
          height: 100%;
          position: relative;
        }
        &::after{
            content: '';
            width: 1rem;
            height: 0.3rem;
            background: white;
            position: absolute;
            bottom: 0;
            left: 0;
          }
      }
    }
  }
  .box > .fr {
    width: 3.96rem;
    height: 6.39rem;
    background-color: #fff;
    .head {
      position: relative;
      padding-left: 0.54rem;
      box-sizing: border-box;
      width: 100%;
      height: 0.63rem;
      line-height: 0.63rem;
      color: #ffffff;
      font-size: 0.18rem;
      background: #8676ff;
      box-shadow: 0px 0px 0.04rem 0px rgba(72, 146, 255, 0.03);
      &::before {
        content: '';
        position: absolute;
        width: 0.18rem;
        height: 0.17rem;
        top: 50%;
        transform: translateY(-50%);
        left: 0.2rem;
        background: url('./image/icon.png') no-repeat center;
        background-size: cover;
      }
    }
    .con {
      width: 100%;
      height: calc(100% - 0.63rem);
      padding: 0.25rem 0.2rem;
      box-sizing: border-box;
      position: relative;
      &:after {
        content: '';
        width: 100%;
        height: 3.92rem;
        position: absolute;
        bottom: 0;
        left: 0;
        background: url('./image/bg10.png') no-repeat center;
        background-size: cover;
      }
      table {
        border-collapse: collapse;
        position: relative;
        z-index: 2;
        width: 100%;
        thead {
          height: 0.4rem;
          margin-bottom: 0.3rem;
          background: #f3f6fd;
          border-radius: 0.04rem;
          th {
            color: #29373e;
            padding: 0.13rem 0;
            font-size: 0.14rem;
            display: inline-block;
            &:nth-child(1) {
              width: 1.5rem;
            }
            &:nth-child(2) {
              width: 0.8rem;
            }
            &:nth-child(3) {
              width: 1.2rem;
            }
          }
        }
        tbody {
          display: block;
          height: 4.5rem;
          overflow-y: scroll;
          /*css主要部分的样式*/
          /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
          &::-webkit-scrollbar {
            width: 0.05rem; /*对垂直流动条有效*/
            height: 10px; /*对水平流动条有效*/
          }
          /*定义滚动条的轨道颜色、内阴影及圆角*/
          &::-webkit-scrollbar-track {
            background-color: #e8e8e8;
            border-radius: 0.03rem;
          }
          /*定义滑块颜色、内阴影及圆角*/
          &::-webkit-scrollbar-thumb {
            border-radius: 0.07rem;
            background-color: #8676ff;
          }
          tr {
            &:nth-child(1) {
              td {
                padding-top: 0.4rem;
              }
            }
          }
          td {
            color: #213037;
            font-size: 0.18rem;
            font-weight: bold;
            padding: 0.17rem 0.1rem;
            text-align: center;
            &:nth-child(1) {
              color: #606a70;
              font-size: 0.14rem;
              overflow: hidden;
              width: 1.5rem;
              display: inline-block;
              white-space: nowrap;
              text-align: left;
              text-overflow: ellipsis;
              box-sizing: border-box;
            }
            &:nth-child(1) {
              width: 1.5rem;
            }
            &:nth-child(2) {
              width: 0.8rem;
            }
            &:nth-child(3) {
              width: 1.2rem;
            }
          }
        }
      }
    }
  }
  .bg {
    width: 7.82rem;
    height: 7.87rem;
    position: absolute;
    left: 51.7%;
    transform: translateX(-50%);
    top: 1.6rem;
    background: url('./image/global.png') no-repeat center;
    background-size: cover;
    p {
      position: absolute;
      top: -0.4rem;
      left: 1.4rem;
      color: #343471;
      font-size: 0.23rem;
    }
    h3 {
      top: -0.94rem;
      position: absolute;
      color: #343471;
      font-size: 0.8rem;
      font-weight: bold;
      right: 2.4rem;
      span {
        color: #545d62;
        display: block;
        font-size: 0.16rem;
      }
    }
    .img {
      width: 8.49rem;
      height: 4.86rem;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      top: 42%;
      background: url('./image/map.png') no-repeat center;
      background-size: cover;
      div {
        position: absolute;
        width: 100%;
        right: 0;
        bottom: 0;
        height: 100%;
      }
      .icon {
        z-index: 10;
        i {
          position: absolute;
          width: 0.21rem;
          height: 0.25rem;
          background: url('./image/icon1.png') no-repeat center;
          background-size: cover;
          // animation: trans 2s ease-in infinite alternate-reverse;
          // &::after{
          //   content: '';
          //   width: 0.1rem;
          //   height: 0.1rem;
          //   background: red;
          //   position: absolute;
          // }
          @keyframes wave {
            50%,
            75% {
              transform: scale(2.5);
            }
            80%,
            100% {
              opacity: 0;
            }
          }
          &::after {
            position: absolute;
            content: '';
            width: 0.15rem;
            height: 0.15rem;
            background-color: #F7F8BA;
            border-radius: 50%;
            transform-origin: center;
            animation: wave 2s ease-out infinite;
            bottom: -0.04rem;
            left: 0.03rem;
            z-index: -1;
          }
          &:nth-child(1) {
            left: 3.24rem;
            top: 0.3rem;
          }
          &:nth-child(2) {
            left: 7.24rem;
            top: 2.3rem;
          }
          &:nth-child(3) {
            left: 1.24rem;
            top: 1.3rem;
          }
          &:nth-child(4) {
            left: 4.24rem;
            top: 3.7rem;
          }
          &:nth-child(5) {
            left: 3.54rem;
            top: 1.7rem;
          }
        }
      }
      .circle {
        z-index: 5;
        i {
          width: 0.08rem;
          height: 0.08rem;
          background: #c1d1fc;
          border-radius: 50%;
          position: absolute;
          // animation: trans 3s ease-in infinite alternate-reverse;
          &:nth-child(1) {
            left: 6.6rem;
            top: 3rem;
          }
          &:nth-child(2) {
            left: 6.2rem;
            top: 3.3rem;
          }
          &:nth-child(3) {
            left: 5.7rem;
            top: 3.1rem;
          }
          &:nth-child(4) {
            left: 4.6rem;
            top: 3.7rem;
          }
          &:nth-child(5) {
            left: 2.6rem;
            top: 0.7rem;
          }
          &:nth-child(6) {
            left: 3rem;
            top: 1.2rem;
          }
          &:nth-child(7) {
            left: 4.2rem;
            top: 4rem;
          }
          &:nth-child(8) {
            left: 4.5rem;
            top: 2.6rem;
          }
          &:nth-child(9) {
            left: 5rem;
            top: 3rem;
          }
        }
      }
      .square {
        z-index: 5;
        i {
          width: 0.11rem;
          height: 0.11rem;
          background: url('./image/icon2.png') no-repeat center;
          background-size: cover;
          position: absolute;
          animation: trans 2s ease-in infinite alternate-reverse;
          &:nth-child(1) {
            left: 1rem;
            top: 1rem;
          }
          &:nth-child(2) {
            left: 3rem;
            top: 1.2rem;
          }
          &:nth-child(3) {
            left: 4rem;
            top: 3.4rem;
          }
          &:nth-child(4) {
            left: 5rem;
            top: 2.7rem;
          }
          &:nth-child(5) {
            left: 6.7rem;
            top: 3rem;
          }
          &:nth-child(6) {
            left: 6.2rem;
            top: 3.7rem;
          }
          &:nth-child(7) {
            left: 6.6rem;
            top: 3.6rem;
          }
          &:nth-child(8) {
            left: 2rem;
            top: 2rem;
          }
          &:nth-child(9) {
            left: 3.4rem;
            top: 2.8rem;
          }
          &:nth-child(10) {
            left: 5rem;
            top: 2rem;
          }
        }
      }
      .lineCircle {
        z-index: 6;
        i {
          position: absolute;
          width: 0.1rem;
          height: 0.1rem;
          background: radial-gradient(
            circle,
            #c0d1fb 0%,
            rgba(193, 209, 252, 0) 100%
          );
          // animation: trans 1.5s ease-in infinite alternate-reverse;
          border-radius: 50%;
          &::after {
            content: '';
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 0.08rem;
            width: 0.04rem;
            height: 1.28rem;
            background: linear-gradient(
              180deg,
              #c1d1fc 0%,
              rgba(204, 217, 253, 0) 100%
            );
            border-radius: 0.02rem;
          }
          &:nth-child(1) {
            left: 2rem;
            top: 1.6rem;
          }
          &:nth-child(2) {
            left: 4rem;
            top: 1rem;
          }
          &:nth-child(3) {
            left: 6rem;
            top: 3rem;
          }
        }
      }
      .lineSquare {
        z-index: 6;
        i {
          position: absolute;
          width: 0.11rem;
          height: 0.11rem;
          background: url('./image/icon2.png') no-repeat center;
          background-size: cover;
          animation: trans 2s ease-in infinite alternate-reverse;
          &:after {
            content: '';
            position: absolute;
            width: 0.04rem;
            height: 1.28rem;
            background: linear-gradient(
              180deg,
              #fdd132 0%,
              rgba(253, 209, 50, 0) 100%
            );
            border-radius: 0.02rem;
            left: 50%;
            transform: translateX(-50%);
            top: 9px;
          }
          &:nth-child(1) {
            left: 5.2rem;
            top: 2rem;
          }
          &:nth-child(2) {
            left: 7.5rem;
            top: 1rem;
          }
          &:nth-child(3) {
            left: 7.2rem;
            top: 2.6rem;
          }
          &:nth-child(4) {
            left: 4.2rem;
            top: 3.6rem;
          }
          &:nth-child(5) {
            left: 2.8rem;
            top: 0.8rem;
          }
        }
      }
      .yellowSpread {
        z-index: -1;
        i {
          position: absolute;
          width: 1.47rem;
          height: 1.47rem;
          border: 0.02rem solid;
          border-color: rgba(253, 209, 50, 0.6);
          box-sizing: border-box;

        }
      }
      .tip {
        padding: 0.25rem 0.2rem;
        box-sizing: border-box;
        width: 1.2rem;
        height: 1.38rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: #fff;
        justify-content: space-between;
        position: absolute;
        bottom: -1rem;
        right: 0.8rem;
        span {
          position: relative;
          padding-left: 0.25rem;
          display: block;
          box-sizing: border-box;
          width: 100%;
          box-sizing: border-box;
          color: #999999;
          font-size: 0.13rem;
          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0.21rem;
            height: 0.25rem;
            background: url('./image/icon1.png') no-repeat center;
            background-size: cover;
          }
          &:nth-child(2)::before {
            width: 0.09rem;
            height: 0.09rem;
            background: #c1d1fc;
            border-radius: 50%;
            left: 0.07rem;
          }
          &:nth-child(3)::before {
            width: 0.11rem;
            height: 0.11rem;
            background: url('./image/icon2.png') no-repeat center;
            left: 0.07rem;
            background-size: cover;
          }
        }
      }
      .time {
        width: 2.57rem;
        height: 0.33rem;
        line-height: 0.33rem;
        background: #ffffff;
        border-radius: 0.17rem;
        text-align: center;
        color: #343471;
        font-size: 0.14rem;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -0.66rem;
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
