<template>
  <div class="modul">
    <div class="left">
      <div class="t1">Subject Results</div>
      <div class="t2">辅导的各科平均成绩</div>

      <div class="t3">
        <div class="t3_items" v-for="(item,key) in home.coaching_cycle" :key="key">
          <div class="xian" :style="{width:item.proportion+'%'}">
            <el-progress  :text-inside="true" :color="color[key%4]" :format='format(item.subject_singlebox)' :stroke-width="26" :percentage="100"></el-progress>
          </div>
          <div class="describe">
            <p>{{item.average_hours}}节课程</p>
            <span>{{item.average_month}}个月</span>
          </div>
        </div>
      </div>

      <div class="t4">
        学生辅导周期选择占比
      </div>
      <div class="t5">
        <div class="t5_items" v-for="(item,key) in home.ratio_coaching_cycles" :key="key">
          <el-progress type="circle" :color="color[key]" :percentage="item.percentage"></el-progress>
          <p>{{item.title}}</p>
        </div>
      </div>
      <!-- 定位 -->
      <div class="t6">
        <div class="t6_items">
          <p class="title">辅导的各科平均成绩</p>
          <div class="t6_im" v-for="(item,key) in home.subjects_average_one" :key="key">
            <span>{{item.subject_singlebox}}</span>
            <p>{{item.stopScore}}分</p>
            <img :src="item.img" alt="">
          </div>
        </div>
        <div class="t6_items">
          <div class="t6_im" v-for="(item,key) in home.subjects_average_two" :key="key">
            <span>{{item.subject_singlebox}}</span>
            <p>{{item.stopScore}}分</p>
            <img :src="item.img" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right_chartBox" ref="chart"></div>
    </div>
  </div>
</template>

<script>
import mixin from '../mixin'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import { getHome4 } from '@/api/kaopei.js'
/* Chart code */
// Themes begin
am4core.useTheme(am4themesAnimated)
export default {
  mixins: [mixin],
  data() {
    return {
      // home: {

      //   subject: [
      //     { name: '托福', id: '0fv42t9T980U', sum: '8919', value: 84.04 },
      //     { name: '文科', id: '0fv428gZ0Ybe', sum: '6526', value: 34.91 },
      //     { name: '工科', id: '0fv6ENvmP28Q', sum: '6373', value: 44.33 },
      //     { name: '理科', id: '0fv42AAEbVNT', sum: '3485', value: 34.04 },
      //     { name: '艺术', id: '0fv42U4QYDHF', sum: '503', value: 64.04 },
      //     { name: '医科', id: '0fv6ENvmPLBZ', sum: '224', value: 94.04 },
      //     { name: '其他', id: '无', sum: 168, value: 40.64 },
      //     { name: '艺术', id: '0fv42U4QYDHF', sum: '503', value: 64.04 }
      //   ],
      //   typeData: [
      //     { name: '1-5个月', zb: 50 },
      //     { name: '6-9个月', zb: 50 },
      //     { name: '12个月以上', zb: 50 },
      //     { name: '10-12个月', zb: 50 }
      //   ]
      // },
      t61: [
        { name: 'TOEFL', zb: '95' },
        { name: 'TOEFL', zb: '95' },
        { name: 'TOEFL', zb: '95' },
        { name: 'TOEFL', zb: '95' }
      ],
      t62: [
        { name: 'TOEFL', zb: '95' },
        { name: 'TOEFL', zb: '95' },
        { name: 'TOEFL', zb: '95' },
        { name: 'TOEFL', zb: '95' }
      ],
      color: ['#8874FC', '#FE8F68', '#FFC941', '#44CC80'],
      home: {
        coaching_cycle: [
          { subject_singlebox: 'N1', average_hours: '99', average_month: '7.9', proportion: 0 },
          { subject_singlebox: 'N2', average_hours: '87', average_month: '7.7', proportion: 0 },
          { subject_singlebox: 'SAT', average_hours: '73', average_month: '4.3', proportion: 0 },
          { subject_singlebox: 'IELTS', average_hours: '62', average_month: '3.9', proportion: 0 },
          { subject_singlebox: 'TOEFL', average_hours: '58', average_month: '3.9', proportion: 0 },
          { subject_singlebox: 'GMAT', average_hours: '56', average_month: '4', proportion: 0 },
          { subject_singlebox: 'GRE', average_hours: '55', average_month: '5.3', proportion: 0 },
          { subject_singlebox: 'SSAT', average_hours: '20', average_month: '2', proportion: 0 }
        ],
        ratio_coaching_cycles: [
          { title: '0-5个月', percentage: 0 },
          { title: '6-9个月', percentage: 0 },
          { title: '10-12个月', percentage: 0 },
          { title: '12个月以上', percentage: 0 }
        ],
        subject_data: [],
        subjects_average_one: [],
        subjects_average_two: []
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    format(i) {
      return () => {
        return i
      }
    },
    getData() {
      getHome4().then(res => {
        res.data.subjects_average_one.forEach((item, key) => {
          item.img = require(`./img/cj${key}.png`)
        })
        res.data.subjects_average_two.forEach((item, key) => {
          item.img = require(`./img/cj${key}.png`)
        })
        this.home = res.data
        this.Chart(res.data.subject_data)
        console.log('4', JSON.parse(JSON.stringify(res.data)))
      })
    },
    Chart(data) {
      // Create chart instance
      const chart = am4core.create(
        this.$refs.chart,
        am4charts.RadarChart
      )
      chart.colors.list = [am4core.color('#BAB0F3')]
      /* Add data */
      chart.data = data

      /* Create axes */
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'subject_singlebox'
      categoryAxis.renderer.grid.template.strokeOpacity = 1
      categoryAxis.renderer.grid.template.stroke = am4core.color('#EBEBF7')
      categoryAxis.renderer.grid.template.strokeWidth = 2

      // 外圈样式
      // categoryAxis.renderer.line.strokeOpacity = 1
      // categoryAxis.renderer.line.strokeWidth = 1
      // categoryAxis.renderer.line.stroke = am4core.color('#EF7FB5')
      // categoryAxis.renderer.grid.template.disabled = true

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())

      valueAxis.renderer.grid.template.disabled = true
      // valueAxis.renderer.grid.template.strokeOpacity = 1
      valueAxis.renderer.grid.template.stroke = am4core.color('#090909')
      // valueAxis.renderer.grid.template.strokeWidth = 2
      // 内圈字体
      valueAxis.renderer.labels.template.fontSize = 12
      // valueAxis.renderer.baseGrid.disabled = true
      // valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2)
      // valueAxis.renderer.axisFills.template.fillOpacity = 0.05

      /* Create and configure series */
      const series = chart.series.push(new am4charts.RadarSeries())
      series.dataFields.valueY = 'num'
      series.dataFields.categoryX = 'subject_singlebox'
      series.name = 'subject_singlebox'
      series.strokeWidth = 3
      // series.columns.template.tooltipText = '{categoryX}: {valueY}'
      // chart.cursor = new am4charts.RadarCursor()
      // chart.cursor.xAxis = categoryAxis
      // chart.cursor.fullWidthXLine = true
      // chart.cursor.lineX.strokeOpacity = 0
      // chart.cursor.lineX.fillOpacity = 0.1
      // chart.cursor.lineX.fill = am4core.color('#000000')
      chart.cursor = new am4charts.RadarCursor()
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
  justify-content: space-between;
  overflow: hidden;
  .left {
    width: 5.6rem;
    position: relative;
    .t1 {
      margin-top: 0.4rem;
      font-size: .42rem;
      font-weight: 500;
      color: #36426B;
      line-height: .59rem;
    }
    .t2 {
      margin-top: 0.4rem;
      font-size: .16rem;
      font-weight: 500;
      color: #3C386D;
      line-height: .22rem;
    }
    .t3 {
      padding-top: 0.1rem;
      .t3_items{
        width: 5rem;
        height: 0.5rem;
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        .xian{
          height: 100%;
          width: 100%;
          transition: width 2s;
          /deep/.el-progress{
            .el-progress-bar__outer{
              height: 0.5rem !important;
            }
            .el-progress-bar__inner{
              text-align: left;
              padding-left: 0.1rem;
              .el-progress-bar__innerText{
                font-size: .16rem;
                font-weight: 500;
                color: #FFFFFF;
              }
            }
          }
        }
        .describe{
          margin-left: 0.1rem;
          word-wrap: normal;
          flex-shrink: 0;
          p{
            font-size: .14rem;
            font-weight: 400;
            color: #1A1C21;
            line-height: .2rem;
            word-wrap: normal;
          }
          span{
            font-size: .12rem;
            font-weight: 400;
            color: #999BA3;
            line-height: .17rem;
            word-wrap: normal;
          }
        }
      }
    }
    .t4{
      margin-top: 0.5rem;
      font-size: .16rem;
      font-weight: 500;
      color: #3C386D;
    }
    .t5{
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.2rem;
      .t5_items{
        width: 50%;
        height: 1.1rem;
        display: flex;
        align-items: center;
        /deep/ .el-progress-circle{
          width: 0.8rem !important;
          height: 0.8rem!important;
        }
        p{
          margin-left: 0.2rem;
          font-size: .2rem;
          font-weight: 400;
          color: #383874;
        }
      }
    }
    .t6{
      position: absolute;
      right: -3rem;
      bottom: 0.5rem;
      z-index: 2;
      .t6_items{
        width: 3.03rem;
        background: #FFFFFF;
        box-shadow: .04rem .16rem .52rem 0rem rgba(111, 143, 234, 0.3);
        border-radius: .1rem;
        margin-top: 0.2rem;
        box-sizing: border-box;
        padding: 0.2rem 0.3rem;
        // display: flex;
        // flex-direction: column;
        // justify-content: space-between;
        .title{
          font-size: .16rem;
          font-weight: 500;
          color: #4D4E85;
          padding-bottom: 0.06rem;
        }
        .t6_im{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0.08rem 0;
          span{
            width: 20%;
            font-size: .14rem;
            font-weight: 400;
            color: #413B6D;
          }
          p{
            width: 30%;
            font-size: .14rem;
            font-weight: 400;
            color: #9C97AE;
            text-align: center;
          }
          img{
            height: 0.22rem;
          }
        }
      }
    }
  }
  .right {
    width: 11.9rem;
    height: 100%;
    background: url('./img/modul_bak.png') no-repeat center center;
    background-size: 100%;
    box-sizing: border-box;
    padding: 1.7rem 0.7rem 0.4rem 1.2rem;
    position: relative;
    .right_chartBox {
      width: 8.6rem;
      height: 8.6rem;
      // background: #ffffff;
      // box-shadow: 0.04rem 0.16rem 0.52rem 0rem rgba(111, 143, 234, 0.06);
      border-radius: 0.12rem;
      padding: 0.22rem 0.4rem;
      box-sizing: border-box;
      position: absolute;
      top: 0.55rem;
      right: 1rem;
    }
  }
}
</style>
