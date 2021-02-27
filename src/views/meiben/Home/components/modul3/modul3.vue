<template>
  <div class="modul3">
    <div class="modul3_bck">
      <img src="./image/modul3_bck.png" alt="">
      <div class="modul3_bck_box ">
        <div ref="chartsdiv" class="charts_box wow animate__zoomIn" data-wow-delay='0.5s'>
        </div>
      </div>
    </div>
    <div class="modul3_box">
      <div class="modul3_left">
        <div class="left1 wow animate__jackInTheBox">硬件背景案例分析</div>
        <div class="left2  wow animate__bounceInLeft" data-wow-delay='0.1s'>
          <div class="left2_top">
            <img src="./image/yuan.png" alt="">
            <div class="t1">Total Detail</div>
            <div class="t2">
              <span>{{home3.accord_case.value}}</span>
              <img src="./image/icon_lvjt.png" alt="">
             {{home3.accord_case.up_value}}%
            </div>
          </div>
          <div class="left2_bottom ">
            <vue-seamless-scroll :data="home3.quantity" class="seamless-warp" :class-option="classOption">
              <div class="left2_bottom_items" v-for="(item,key) in home3.quantity" :key="key">
                <div>
                  <span>●</span>
                  {{item.name}}
                </div>
                <div>{{item.client}}名</div>
                <div>{{item.value}}枚</div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
        <div class="left3 wow animate__bounceInLeft" data-wow-delay='0.3s'>
          <div>
            <div class="left3_t1">累计录取学生统计</div>
            <div class="left3_t2">
              <span>{{home3.admission.value}}</span>
              <img src="./image/icon_lvjt.png" alt="">
              {{home3.admission.up_value}}%
            </div>
            <div class="left3_t3">Compared to ({{home3.year.min}}-{{home3.year.max}})</div>
          </div>
        </div>
      </div>
      <div class="modul3_right">
        <img class="right1 wow animate__bounceInRight" data-wow-delay='0.4s' src="./image/textImg.png" alt="">
        <div class="right2 wow animate__bounceInRight" data-wow-delay='0.5s'>美本录取案例数量</div>
        <div class="right3 wow animate__bounceInRight" data-wow-delay='0.6s'>Total Detail</div>
        <div class="right4 wow animate__bounceInRight" data-wow-delay='0.7s'>
          <span>{{home3.admission_case.value}}</span>
          <img src="./image/icon_lvjt.png" alt="">
          {{home3.admission_case.up_value}}%
        </div>
        <div class="right5 wow animate__bounceInRight" data-wow-delay='0.8s'>Compared to ({{home3.year.min}}-{{home3.year.max}})</div>
        <div class="right6 wow animate__bounceInRight" data-wow-delay='0.9s'>
          <img src="./image/icon_tongji.png" alt="">
        </div>
        <div class="right7 wow animate__bounceInRight"  data-wow-delay='1s' >
            <vue-seamless-scroll :data="home3.data" class="seamless-warp" :class-option="classOption">
              <div class="right7_items" v-for="(item,key) in home3.data" :key="key" @click="goDetails(item)">
                <div><span>●</span> {{item.name}}</div>
                <div>{{item.gpa_decimal}}</div>
                <div :title="item.AppliSchool">{{item.AppliSchool}}</div>
              </div>
            </vue-seamless-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHome3 } from '@/api/meiben.js'
import mixin from '../mixin.js'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
// import * as am4pluginsForceDirected from '@amcharts/amcharts4/plugins/forceDirected'
/* Chart code */
// Themes begin
am4core.useTheme(am4themesAnimated)
export default {
  mixins: [mixin],
  data () {
    return {
      home3: {
        accord_case: { value: '6886', up_value: 91.08 },
        admission: { value: 2507, up_value: 20.92 },
        admission_case: { value: 7552, up_value: 21.76 },
        data: [],
        quantity: [],
        year: { min: '2012', max: '2021' }
      },
      step: {
        direction: 0
      }
    }
  },
  created () {

  },
  mounted () {
    this.getData()
  },
  methods: {
    charts () {
      const chart = am4core.create(this.$refs.chartsdiv, am4charts.RadarChart)
      chart.colors.list = [
        am4core.color('#9CF2F6'),
        am4core.color('#D3A5FE'),
        am4core.color('#9DA5F6'),
        am4core.color('#A5C7FE'),
        am4core.color('#A5E1FE'),
        am4core.color('#D3A5FE')
      ]
      chart.data = this.home3.quantity
      // chart.data = [{
      //   category: 'Research',
      //   value: 80,
      //   full: 100
      // }]

      // Make chart not full circle
      chart.startAngle = -90
      chart.endAngle = 180
      chart.innerRadius = am4core.percent(10)

      // Set number format
      chart.numberFormatter.numberFormat = "#.#'%'"

      // Create axes
      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'name'
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.grid.template.strokeOpacity = 0
      categoryAxis.renderer.labels.template.horizontalCenter = 'right'
      categoryAxis.renderer.labels.template.fontWeight = 550
      categoryAxis.renderer.labels.template.adapter.add('fill', function (fill, target) {
        return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill
      })
      categoryAxis.renderer.minGridDistance = 20

      const valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.grid.template.strokeOpacity = 0
      valueAxis.min = 0
      valueAxis.max = 20
      valueAxis.strictMinMax = true
      valueAxis.renderer.labels.template.fontSize = 0
      // Create series
      const series1 = chart.series.push(new am4charts.RadarColumnSeries())
      series1.dataFields.valueX = 'fill'
      series1.dataFields.categoryY = 'name'
      series1.clustered = false
      series1.columns.template.fill = new am4core.InterfaceColorSet().getFor('alternativeBackground')
      series1.columns.template.fillOpacity = 0.02
      series1.columns.template.cornerRadiusTopLeft = 20
      series1.columns.template.strokeWidth = 0
      series1.columns.template.radarColumn.cornerRadius = 20
      // series1.defaultState.transitionDuration = 1500
      // series1.interpolationDuration = 1500
      // series1.sequencedInterpolation = true
      const series2 = chart.series.push(new am4charts.RadarColumnSeries())
      series2.dataFields.valueX = 'proportion'
      series2.dataFields.categoryY = 'name'
      series2.clustered = false
      series2.columns.template.strokeWidth = 0
      series2.columns.template.tooltipText = '{name}: [bold]{value}[/] / [bold]{proportion}[/]'
      series2.columns.template.radarColumn.cornerRadius = 20
      // series2.defaultState.transitionDuration = 3000
      // series2.interpolationDuration = 3000
      series2.sequencedInterpolation = true
      series2.columns.template.adapter.add('fill', function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index)
      })
      series2.columns.template.events.on('hit', function(ev) {
        console.log('clicked on ', ev.target)
      }, this)
      // Add cursor
      // chart.cursor = new am4charts.RadarCursor()
    },
    getData () {
      getHome3().then(res => {
        console.log('home3', JSON.parse(JSON.stringify(res.data)))

        this.home3 = res.data
        this.charts()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../mixin";
.modul3{
  width: 100%;
  height: 10.20rem;
  position: relative;
  background: #F5F6FB;
  >.modul3_bck{
    width: 13.17rem;
    height: 100%;
    position: absolute;
    right: 2.72rem;
    >img{
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .modul3_bck_box{
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 3;
      padding-bottom: 1.5rem;
      padding-right: 0.8rem;
      box-sizing: border-box;
      padding-top: 2.5rem;
      >img{
          width: 3.22rem;
          height: 0.53rem;
          margin-bottom: 0.15rem;
      }
      >.charts_box{
        width: 10rem;
        height: 8.5rem;
        position: relative;
        &::after{
          width: 60px;
          height: 20px;
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          background:#F4F5FB;
        }
        // background: red;
        // opacity: 0.5;
        // background: rgba(111,111,111,0.2);
      }
    }
  }

}
.modul3_box{
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0.4rem 0.7rem;
  box-sizing: border-box;
}
.modul3_left{
  width: 2.91rem;
  position: absolute;
  .left1{
    font-size: 0.26rem;
    font-weight: 550;
    color: #383874;
    margin-top: 0.3rem
  }
  .left2{
    @include Box;
    width: 100%;
    height: 6rem;
    margin-top: 0.2rem;
    display: flex;
    flex-direction: column;
    .left2_top{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0.25rem;
      >img{
        width: 1.25rem;
        height: 1.47rem;
      }
      >.t1{
        font-size: 0.17rem;
        font-weight: bold;
        color: #4D4E85;
        margin-top: 0.2rem;

      }
      >.t2{
        margin-top: 0.1rem;
        @include lv1;
        >span{
          font-size: 0.22rem;
        }
      }
    }
    .left2_bottom{
      flex: 1;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      .left2_bottom_items{
        @include ScrollLi(#F3B66E);
        >div{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: .13rem;
          cursor: pointer;
        }
        >div:nth-of-type(1){
          width: 50%;
        }
        >div:nth-of-type(2){
          width: 25%;
          text-align: right;
        }
        >div:nth-of-type(3){
          width: 25%;
          text-align: right;
        }
      }
    }
  }
  .left3{
    margin-top: 0.2rem;
    width: 2.97rem;
    height: 1.3rem;
    background: #FFFFFF;
    box-shadow: .05rem .19rem .62rem 0px rgba(111, 143, 234, 0.3);
    border-radius: .12rem;
    box-sizing: border-box;
    padding: 0rem 0.3rem;
    display: flex;
    flex-direction: column;
    >div{
      flex: 1;
      padding: 0.2rem 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      >.left3_t1{
        font-size: 0.13rem;
        font-weight: 400;
        color: #4D4E85;
      }
      >.left3_t2{
        display: flex;
        align-items: flex-end;
        font-size: 0.15rem;
        color: #3DD598;
        >span{
          font-size: 0.3rem;
          font-weight: 600;
          color:#4D4E85;
          margin-right: 0.1rem;
        }
        >img{
          margin-right: 6px;
          margin-bottom: 0.03rem;
        }
      }
      >.left3_t3{
        font-size: 0.14rem;
        font-weight: 400;
        color: #8787AD;
      }
    }
  }
}
.modul3_right{
  width: 2.2rem;
  right: 0.63rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  >.right1{
    height: 0.35rem;
  }
  >.right2{
    width: 100%;
    font-size: 0.20rem;
    font-weight: 550;
    color: #72739E;
    margin-top: 0.4rem;
    text-align: right;
  }
  >.right3{
    margin-top: 0.2rem;
    font-size: .16rem;
    font-weight: bold;
    color: #72739E;
    text-align: right;
  }
  >.right4{
    width: 100%;
    margin-top: 0.15rem;
    @include lv1;
    >span{
      font-size: 0.4rem;
    }
  }
  >.right5{
    width: 100%;
    font-size: 0.14rem;
    font-weight: 400;
    color: #8787AD;
  }
  >.right6{
      width: 100%;
      // height: 1rem;
      margin-top: 0.2rem;
    >img{
      width: 100%;
      height: 100%;
    }
  }
  .seamless-warp{
    height: 100%;
    overflow: hidden;
  }
  >.right7{
    margin-top: 0.25rem;
    width: 100%;
    height: 4.6rem;
    // @include Box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .right7_items{
      cursor: pointer;
        @include ScrollLi(#EF7FB5);
        >div{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: .14rem;
        }
        >div:nth-of-type(1){
          width: 30%;
        }
        >div:nth-of-type(2){
          width: 20%;
          text-align: center;
        }
        >div:nth-of-type(3){
          width: 45%;
          text-align: left;
        }
    }
  }
}
</style>
