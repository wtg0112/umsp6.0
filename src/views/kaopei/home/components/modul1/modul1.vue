<template>
  <div class="modul">
    <div class="left">
      <div class="t1">海策考试库</div>
      <div class="t2">截止当前考试案例数量</div>
      <div class="t3">{{home.exam_count}}</div>
      <div class="t4">成功申请美、日、英等国家</div>
      <img class="t5" src="./img/tiaoxingtu.png" alt="" />
      <div class="t6 tFlex">
        <div>姓名</div>
        <div>考试科目</div>
        <div>考试提升</div>
      </div>
      <div class="t7">
        <div class="t7_bottom ">
          <vue-seamless-scroll
            :data="home.case_list"
            class="seamless-warp"
            :class-option="classOption"
          >
            <div
              class="t7_bottom_items"
              v-for="(item, key) in home.case_list"
              :key="key"
            >
              <div>
                <span>●</span>
                {{ item.name }}
              </div>
              <div>{{ item.subject_singlebox }}</div>
              <div>{{ item.rangeScore_decimal }}</div>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right_chartBox"></div>
      <div class="right_typeData">
        <div
          class="right_typeData_item"
          v-for="(item, key) in home.education_data"
          :key="key"
        >
          <el-progress
            type="circle"
            :percentage="item.proportion"
            :color="color[key]"
          ></el-progress>
          <div class="describe">
            <p>{{ item.education_singlebox }}</p>
            <span>考试案例当前阶段</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '../mixin'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import { getHome1 } from '@/api/kaopei.js'
/* Chart code */
// Themes begin
am4core.useTheme(am4themesAnimated)
export default {
  mixins: [mixin],
  data() {
    return {
      color: ['#24C048', '#063CFF', '#FF8D0A', '#8675FB'],
      home: {
        case_list: [],
        education_data: [
          { education_singlebox: '初中', num: '41', proportion: 0 },
          { education_singlebox: '高中', num: '470', proportion: 0 },
          { education_singlebox: '本科', num: '952', proportion: 0 },
          { education_singlebox: '研究生', num: '18', proportion: 0 }
        ],
        exam_count: 1549,
        subject_data: []
      }
    }
  },
  async mounted() {
    this.getData()
  },
  methods: {
    async charts(title1, title2, data) {
      const chart = am4core.create('right_chartBox', am4charts.XYChart)
      // { year: 2010, GRE: '20', IELTS: '17', TOEFL: '9', GMAT: '8' }
      chart.data = data
      chart.numberFormatter.numberFormat = '#.'
      chart.colors.list = [am4core.color('#897AFF'), am4core.color('#FFBA69'), am4core.color('#FE7F98'), am4core.color('#24C048'), am4core.color('#063CFF')]
      // Create category axis
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'year'

      categoryAxis.title.text = title2
      categoryAxis.title.fontSize = 14

      categoryAxis.renderer.grid.template.strokeOpacity = 0.3
      categoryAxis.renderer.grid.template.strokeWidth = 0.3
      categoryAxis.renderer.labels.template.fill = am4core.color('#ADADB5')
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.minGridDistance = 40
      const label = chart.createChild(am4core.Label)
      label.text = title1
      label.fontSize = 20
      label.align = 'center'
      label.isMeasured = false
      label.x = 0
      label.y = -0

      // Create value axis
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      // valueAxis.renderer.grid.template.disabled = true
      // valueAxis.renderer.grid.template.stroke = am4core.color('#F7F7F7')
      valueAxis.renderer.grid.template.strokeOpacity = 0.3
      valueAxis.renderer.grid.template.strokeWidth = 0.3
      valueAxis.renderer.labels.template.fill = am4core.color('#ADADB5')
      // valueAxis.renderer.labels.template.fontSize = 12
      valueAxis.cursorTooltipEnabled = false
      // valueAxis.rangeChangeDuration = 5000
      // chart.padding(20, 20, 20, 20)
      // valueAxis.renderer.minLabelPosition = 0.01
      const interfaceColors = new am4core.InterfaceColorSet()
      // Create series

      function series(value) {
        const series = chart.series.push(new am4charts.LineSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'year'
        series.name = value
        series.tooltipText = '{name}:{valueY}分'
        series.legendSettings.valueText = '{valueY}'
        series.strokeWidth = 3 // 3px
        series.tensionX = 0.8
        series.showOnInit = true
        series.sequencedInterpolation = true
        series.defaultState.transitionDuration = 2000
        series.interpolationDuration = 2000
        // const circleBullet1 = series.bullets.push(new am4charts.CircleBullet())
        // circleBullet1.circle.stroke = am4core.color('#fff')
        // circleBullet1.circle.strokeWidth = 3
      }
      series('GMAT')
      series('GRE')
      series('IELTS')
      series('SAT')
      series('TOEFL')
      // Add chart cursor
      chart.cursor = new am4charts.XYCursor()
      chart.cursor.behavior = 'zoomY'

      // Add legend
      chart.legend = new am4charts.Legend()
      chart.legend.position = 'top'
      chart.legend.contentAlign = 'right'
      chart.legend.padding(0, 0, 40, 0)
      chart.legend.itemContainers.template.events.on('over', function(event) {
        const segments = event.target.dataItem.dataContext.segments
        segments.each(function(segment) {
          segment.isHover = true
        })
      })
      chart.svgContainer.measure()
    },
    async getData() {
      getHome1().then(res => {
        this.home = res.data
        console.log('1', JSON.parse(JSON.stringify(res.data)))
        const title1 = '案例总数' + res.data.exam_count
        const title2 = `考试案例年度上升趋势图${res.data.year.min}-${res.data.year.max}`
        this.charts(title1, title2, res.data.subject_data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../mixin';
.modul {
  width: 100%;
  height: 10rem;
  padding-left: 0.6rem;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  .left {
    width: 2.9rem;
    .t1 {
      margin-top: 0.33rem;
      font-size: 0.26rem;
      font-weight: 500;
      color: #000000;
    }
    .t2 {
      margin-top: 0.3rem;
      font-size: 0.18rem;
      font-weight: 400;
      color: #383874;
    }
    .t3 {
      font-size: 0.7rem;
      color: #383874;
      line-height: 0.84rem;
    }
    .t4 {
      margin-top: 0.1rem;
      font-size: 0.2rem;
      font-weight: 500;
      color: #383874;
      line-height: 0.28rem;
    }
    .t5 {
      margin-top: 0.43rem;
      width: 2.58rem;
      height: 0.94rem;
    }
    .t6 {
      margin-top: 0.2rem;
      > div {
        font-size: 0.16rem;
        font-weight: 550;
        color: #383874;
        text-align: center;
      }
    }
    .tFlex {
      width: 2.58rem;
      display: flex;
      justify-content: space-between;
      > div {
        width: 30%;
      }
    }
    .t7 {
      width: 2.58rem;
      height: 5rem;
      margin-top: 0.2rem;
      .t7_bottom {
        width: 2.58rem;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        .t7_bottom_items {
          cursor: pointer;
          @include ScrollLi(#8675ff);
          > div {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          > div:nth-of-type(1) {
            width: 30%;
          }
          > div:nth-of-type(2) {
            width: 30%;
            text-align: center;
          }
          > div:nth-of-type(3) {
            width: 30%;
            text-align: center;
          }
        }
      }
    }
  }
  .right {
    width: 15.6rem;
    height: 9.8rem;
    background: url('./img/modul_bck.png') no-repeat center center;
    background-size: 100%;
    box-sizing: border-box;
    padding: 1rem 0.7rem 0.4rem 1.2rem;
    .right_chartBox {
      width: 13.76rem;
      height: 6.63rem;
      background: #ffffff;
      box-shadow: 0.04rem 0.16rem 0.52rem 0rem rgba(111, 143, 234, 0.06);
      border-radius: 0.12rem;
      padding: 0.22rem 0.4rem;
      box-sizing: border-box;
    }
    .right_typeData {
      margin-top: 0.2rem;
      width: 13.76rem;
      height: 1.54rem;
      background: #ffffff;
      box-shadow: 0.04rem 0.16rem 0.52rem 0px rgba(111, 143, 234, 0.06);
      border-radius: 0.12rem;
      display: flex;
      justify-content: space-between;
      .right_typeData_item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        /deep/ .el-progress {
          .el-progress-circle {
            width: 0.86rem !important;
            height: 0.86rem !important;
          }
        }
        .describe {
          margin-left: 0.2rem;
          > p {
            font-size: 0.24rem;
            font-weight: 500;
            color: #383874;
            line-height: 0.33rem;
            margin-bottom: 0.04rem;
          }
          > span {
            font-size: 0.16rem;
            font-weight: 400;
            color: #41417a;
            line-height: 0.22rem;
          }
        }
      }
    }
  }
}
</style>
