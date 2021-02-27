<template>
  <div class="modul">
    <div class="left">
      <div class="t1">QS世界大学排名Top30录取榜单</div>
      <div class="t2">申请案例统计 DETAIL></div>
      <div class="t3">{{home.exam_count}}</div>
      <!-- <div class="t4">成功申请美、日、英等国家</div> -->
      <img class="t5" src="./img/tiaoxingtu.png" alt="" />
      <!-- <div class="t6 tFlex">
        <div>姓名</div>
        <div>考试科目</div>
        <div>考试提升</div>
      </div> -->
      <div class="t7">
        <div class="t7_bottom ">
          <vue-seamless-scroll
            :data="home.exam_case_data"
            class="seamless-warp"
            :class-option="classOption"
          >
            <div
              class="t7_bottom_items"
              v-for="(item, key) in home.exam_case_data"
              :key="key"
            >
              <div :title="item.new_AppliSchool">
                <span>●</span>
                {{ item.new_AppliSchool }}
              </div>
              <div>{{ item.client_num }}名</div>
              <div>{{ item.case_num }}枚</div>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right_chartBox"><div  ref="chart"></div></div>
      <div class="right_typeData">
        <div
          class="right_typeData_item"
          v-for="(item, key) in home.acceptance_rate"
          :key="key"
        >
          <div class="describe">
            <p>{{ item.title }}</p>
            <span>{{item.percentage}}%</span>
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
import { getHome3 } from '@/api/kaopei.js'
/* Chart code */
// Themes begin
am4core.useTheme(am4themesAnimated)
export default {
  mixins: [mixin],
  data() {
    return {
      color: ['#24C048', '#063CFF', '#FF8D0A', '#8675FB'],
      home: {
        acceptance_rate: [],
        exam_case_data: [],
        exam_count: 1549
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getHome3().then(res => {
        this.home = res.data
        console.log('3', JSON.parse(JSON.stringify(res.data)))
        const title = '案例总数' + res.data.exam_count
        this.Chart(title, res.data.exam_case_data)
      })
    },
    Chart(title, data) {
      // Create chart instance
      const chart = am4core.create(
        this.$refs.chart,
        am4charts.XYChart
      )
      chart.colors.list = [am4core.color('#8875F5'), am4core.color('#F87087')]
      chart.data = data
      const label = chart.createChild(am4core.Label)
      label.text = title
      label.fontSize = 20
      label.align = 'center'
      label.isMeasured = false
      label.x = 0
      label.y = -0
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'new_AppliSchool'
      categoryAxis.renderer.labels.template.maxWidth = 60
      categoryAxis.renderer.labels.template.wrap = true
      categoryAxis.renderer.labels.template.truncate = false

      categoryAxis.renderer.minGridDistance = 20
      categoryAxis.renderer.labels.template.fill = am4core.color('#C3C1CF')
      // categoryAxis.renderer.labels.template.fontSize = 12

      categoryAxis.renderer.grid.template.strokeOpacity = 0.4
      categoryAxis.renderer.grid.template.strokeWidth = 0.4
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.grid.template.disabled = true
      // valueAxis.renderer.grid.template.stroke = am4core.color('#F7F7F7')
      valueAxis.renderer.grid.template.strokeOpacity = 0.4
      valueAxis.renderer.grid.template.strokeWidth = 0.4
      valueAxis.renderer.labels.template.fill = am4core.color('#C3C1CF')
      // valueAxis.renderer.labels.template.fontSize = 12
      valueAxis.cursorTooltipEnabled = false

      const series1 = chart.series.push(new am4charts.ColumnSeries())
      series1.columns.template.tooltipText = '[#fff]{name}: {client_num}人[/]'
      series1.name = '学生'
      series1.dataFields.categoryX = 'new_AppliSchool'
      series1.dataFields.valueY = 'client_num'
      series1.dataItems.template.locations.categoryX = 0.5
      series1.stacked = true
      series1.tooltip.pointerOrientation = 'vertical'
      series1.columns.template.width = 15
      series1.sequencedInterpolation = true
      const series2 = chart.series.push(new am4charts.ColumnSeries())
      series2.columns.template.tooltipText = '[#fff]{name}: {case_num}人[/]'
      series2.name = '案例'
      series2.dataFields.categoryX = 'new_AppliSchool'
      series2.dataFields.valueY = 'case_num'
      series2.dataItems.template.locations.categoryX = 0.5
      series2.stacked = true
      series2.tooltip.pointerOrientation = 'vertical'
      chart.cursor = new am4charts.XYCursor()
      chart.cursor.behavior = 'zoomY'
      series2.columns.template.width = 15
      series2.sequencedInterpolation = true
      series2.columns.template.column.cornerRadiusTopRight = 6
      series2.columns.template.column.cornerRadiusTopLeft = 6
      // Scrollbar(chart)

      chart.legend = new am4charts.Legend()
      chart.legend.useDefaultMarker = true
      chart.legend.maxWidth = undefined
      chart.legend.position = 'top'
      chart.legend.padding(0, 0, 40, 0)
      chart.legend.contentAlign = 'right'
      const marker = chart.legend.markers.template.children.getIndex(0)
      marker.cornerRadius(12, 12, 12, 12)
      const markerTemplate = chart.legend.markers.template
      markerTemplate.width = 9
      markerTemplate.height = 9
      // valueAxis.renderer.labels.template.adapter.add("text", function(text) {
      //   return text + "%";
      // });
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
    position: relative;
    .t1 {
      width: 5rem;
      margin-top: 0.33rem;
      font-size: 0.26rem;
      font-weight: 500;
      color: #000000;
      word-wrap: normal;
      position: relative;
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
            width: 40%;
          }
          > div:nth-of-type(2) {
            width: 25%;
            text-align: center;
          }
          > div:nth-of-type(3) {
            width: 25%;
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
    padding: 1.7rem 0.7rem 0.4rem 1.2rem;
    .right_chartBox {
      width: 10.76rem;
      height: 5.4rem;
      background: #ffffff;
      box-shadow: 0.04rem 0.16rem 0.52rem 0rem rgba(111, 143, 234, 0.06);
      border-radius: 0.12rem;
      padding: 0.22rem 0.4rem;
      box-sizing: border-box;
      >div{
        width: 100%;
        height: 100%;
      }
    }
    .right_typeData {
      margin-top: 1.8rem;
      width: 13.76rem;
      display: flex;
      justify-content: flex-end;
      .right_typeData_item {
        display: flex;
        justify-content: center;
        align-items: center;
        .describe {
          margin-left: 0.7rem;
          > p {
            font-size: .16rem;
            font-weight: 400;
            color: #686897;
            margin-bottom: 0.04rem;
          }
          > span {
            font-size: .4rem;
            font-weight: 500;
            color: #383874;
            line-height: 56px;
          }
        }
      }
    }
  }
}
</style>
