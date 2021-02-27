<template>
  <div class="modul">
    <div class="modul_bck">
      <img src="./image/modul_bck.png" alt="">
      <div class="modul_bck_box">
        <!-- <img src="./image/pr1.png" alt=""> -->
        <div ref="chartsdiv" class="charts_box wow wow animate__zoomIn" data-wow-delay='0.2s'>
        </div>
      </div>
    </div>
    <div class="modul_box">
      <div class="modul_left">
        <div class="left1 wow animate__jackInTheBox">英国软件背景案例分析</div>
        <div class="left2 wow animate__bounceInLeft"  data-wow-delay='0.2s'>
          <!-- <button v-for="(item,key) in type" :key="key" :class="{active:act==item.value}" @click="xuewei(item)">{{item.name}}</button> -->
          <div @click="goList()">查看案例</div>
        </div>
        <div class="left3 wow animate__bounceInLeft"  data-wow-delay='0.4s' @click="goList"><span>全部案例统计</span> DETAIL ></div>
        <div class="left4 wow animate__bounceInLeft"  data-wow-delay='0.6s'>{{home7.case_count}}</div>
        <div class="left5 wow animate__bounceInLeft"  data-wow-delay='0.7s'>Quantity of data</div>
        <div class="left6 wow animate__bounceInLeft"  data-wow-delay='0.8s'>
            <vue-seamless-scroll :data="home7.quantity" class="seamless-warp" :class-option="classOption">
              <div class="left6_items" v-for="(item,key) in home7.quantity" :key="key">
                <div :title="item.name" ><span>●</span> {{item.name}}</div>
                <div>{{item.client_nu}}名</div>
                <div :title="item.case_nu">{{item.case_nu}}枚</div>
              </div>
            </vue-seamless-scroll>
        </div>
        <div class="left7 wow animate__bounceInLeft" data-wow-delay='0.9s'>
          <img src="./image/xiaotongji.png" alt="">
          <div class="left7_text">
            <div>三项以上占比统计</div>
            <div>
              <span>{{home7.trinomial_nu}}</span>
              <img src="./image/icon_lvjt.png" alt="">
              {{home7.trinomial_proportion}}%
            </div>
          </div>
        </div>
      </div>
      <div class="modul_right">
        <img class="wow animate__bounceInRight" data-wow-delay='1s' src="./image/textImg.png" alt="">
        <div class="right1 wow animate__bounceInRight" data-wow-delay='1.1s'>背景资料案例数量</div>
        <div class="right2 wow animate__bounceInRight" data-wow-delay='1.2s'>Total Detail</div>
        <div class="right3 wow animate__bounceInRight" data-wow-delay='1.3s'>
          <span>{{home7.boutique_nu}}</span>
          <img src="./image/icon_lvjt.png" alt="">
          {{home7.boutique_proportion}}%
        </div>
        <div class="right4 wow animate__bounceInRight" data-wow-delay='1.4s'>Compared to ({{home7.year.min}}-{{home7.year.max}})</div>
        <div class="right5  wow animate__bounceInRight" data-wow-delay='1.5s'>
          <div class="right5_top"  >
            <img src="./image/modul_yuan.png" alt="">
            <div class="t1">Total Detail</div>
            <div class="t2">
              <span>{{home7.boutique_nu}}</span>
              <img src="./image/icon_lvjt.png" alt="">
              {{home7.boutique_proportion}}%
            </div>
          </div>
          <div class="right5_bottom">
            <vue-seamless-scroll :data="home7.quantity_list" class="seamless-warp" :class-option="classOption">
              <div class="right5_bottom_items" v-for="(item,key) in home7.quantity_list" :key="key" @click="goDetails(item)">
                <div :title="item.name">
                  <span>●</span>
                  {{item.name}}
                </div>
                <div>{{item.bg_nu}}项</div>
                <div :title="item.new_AppliSchool">{{item.new_AppliSchool}}</div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHome7 } from '@/api/yingguo.js'
import mixin from '../mixin.js'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
// import am4themesKelly from '@amcharts/amcharts4/themes/kelly'
am4core.useTheme(am4themesAnimated)
// am4core.useTheme(am4themesKelly)
export default {
  mixins: [mixin],
  data () {
    return {
      act: '硕士',
      type: [{ name: '硕士', value: '硕士' }, { name: '博士', value: '博士' }],
      zhanbi: { up_value: 35, value: 2481 },
      home3: {
        boutique: {
          data: [],
          total: {
            case_sum: 1212,
            up_value: 110,
            year: {
              min: 2012,
              max: 2020
            }
          }
        },
        case_total: 1580,
        chart: [],
        quantity: []
      },
      home7: {
        boutique_nu: 23519,
        boutique_proportion: 94.04,
        case_count: 25.009,
        quantity: [],
        quantity_list: [],
        trinomial_nu: '19442',
        trinomial_proportion: 77.74,
        year: { min: '2012', max: '2021' }
      }
    }
  },
  created () {
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      getHome7({
        type: this.act
      }).then(res => {
        console.log('home7', JSON.parse(JSON.stringify(res.data)))
        this.home7 = res.data
        this.charts()
      })
    },
    charts () {
      const chart = am4core.create(this.$refs.chartsdiv, am4charts.RadarChart)

      chart.radius = am4core.percent(92)
      chart.innerRadius = am4core.percent(48)
      chart.startAngle = -80
      chart.endAngle = 260
      chart.colors.list = [
        am4core.color('#9CF2F6'),
        am4core.color('#D3A5FE'),
        am4core.color('#9DA5F6'),
        am4core.color('#A5C7FE'),
        am4core.color('#A5E1FE'),
        am4core.color('#D3A5FE')
      ]
      const data = this.home7.quantity
      // data.sort(function (a, b) {
      //   return b.case_nu - a.case_nu
      // })
      chart.data = data
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.gridType = 'polygons'
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.dataFields.category = 'name'
      categoryAxis.renderer.grid.template.strokeOpacity = 0
      categoryAxis.renderer.tooltipLocation = 0.5
      categoryAxis.tooltip.disabled = true
      categoryAxis.renderer.labels.template.location = 0.5
      categoryAxis.renderer.labels.template.bent = true
      categoryAxis.renderer.labels.template.radius = 20
      categoryAxis.renderer.labels.template.fontWeight = 500
      categoryAxis.renderer.labels.template.fontSize = 20

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      // valueAxis.min = 0
      // valueAxis.max = 800
      // valueAxis.strictMinMax = true
      // valueAxis.renderer.minGridDistance = 10

      // 背景线透明度
      valueAxis.renderer.grid.template.strokeOpacity = 0.00
      valueAxis.tooltip.disabled = true
      // axis break
      // axis break
      // const axisBreak = valueAxis.axisBreaks.create()
      // axisBreak.startValue = 2100
      // axisBreak.endValue = 16900
      // axisBreak.breakSize = 0.02

      // // make break expand on hover
      // const hoverState = axisBreak.states.create('hover')
      // hoverState.properties.breakSize = 1
      // hoverState.properties.opacity = 0.1
      // hoverState.transitionDuration = 1500

      // axisBreak.defaultState.transitionDuration = 1000
      // axisBreak.defaultState.transitionDuration = 1000
      const series = chart.series.push(new am4charts.RadarColumnSeries())
      series.dataFields.categoryX = 'name'
      series.dataFields.valueY = 'case_nu'
      series.columns.template.tooltipText = '{name}：{case_nu}枚({percentage}%)'
      series.columns.template.tooltipY = 0
      series.columns.template.strokeOpacity = 0
      series.columns.template.width = am4core.percent(80)
      series.columns.template.radarColumn.cornerRadius = 10
      series.columns.template.radarColumn.innerCornerRadius = 0
      series.tooltip.pointerOrientation = 'vertical'
      // series2.defaultState.transitionDuration = 3000
      // series2.interpolationDuration = 3000
      // 缓动出现
      series.sequencedInterpolation = true
      // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
      series.columns.template.adapter.add('fill', function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index)
      })
      // chart.seriesContainer.zIndex = -1
      const cursor = new am4charts.RadarCursor()
      cursor.innerRadius = am4core.percent(50)
      cursor.lineY.disabled = true
      cursor.xAxis = categoryAxis
      chart.cursor = cursor
      valueAxis.sortBySeries = series
    },
    xuewei (item) {
      console.log(item)
      this.act = item.value
      this.getData()
    }

  }
}
</script>

<style scoped lang="scss">
@import "../mixin";
.modul{
  width: 100%;
  height: 10.20rem;
  position: relative;
  background: #F5F6FB;
  >.modul_bck{
    width: 12.3rem;
    height: 100%;
    position: absolute;
    right: 3.2rem;
    >img{
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .modul_bck_box{
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 3;
      padding-left: 0.03rem;
      padding-top: 0.4rem;
      box-sizing: border-box;
      >img{
          height: 0.34rem;
          margin-bottom: 0.15rem;
      }
      >.charts_box{
        width: 9.6rem;
        height: 7.5rem;
        position: relative;
        &::after{
          width: 60px;
          height: 20px;
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          background:#ECEEF9;
        }
        // background: rgba(111,111,111,0.2);
      }
    }
  }

}
.modul_box{
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0.5rem 0.7rem;
  box-sizing: border-box;
}
.modul_left{
  width: 3.3rem;
  position: absolute;
  .left1{
    font-size: 0.26rem;
    font-weight: 550;
    color: #383874;
  }
  .left2{
    display: flex;
    margin-top: 0.26rem;
    > button {
        width: 1.66rem;
        height: .48rem;
        border-radius: .26rem;
        margin-right: 0.2rem;
        cursor: pointer;
        display: inline-block;
        background: rgba(255, 255, 255,0);
        border: 1px solid #8675FF;
        color: #8675FF;
        font-size: 0.16rem;
        outline: none;
        &:active {
          color: white;
          background: #8576ff;
          opacity: 0.7;
          transform: translateY(0.5px);
        }
    }
    > .active {
        color: #ffffff;
        background: #8675ff;
    }
    @include Case;
  }
  .left3{
    @include Tongji;
    cursor: pointer;
    margin-top: 0.36rem;
  }
  .left4{
    @include H1;
  }
  .left5{
    font-size: 0.24rem;
    font-weight: 550;
    color: #41417A;
    margin-top: 0.36rem;
  }
  .seamless-warp{
    height: 100%;
    overflow: hidden;
  }
  .left6{
    margin-top: 0.17rem;
    width: 2.92rem;
    height: 4.09rem;
    @include Box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .left6_items{
        @include ScrollLi(#49CC68);
        >div{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        >div:nth-of-type(1){
          width: 40%;
          text-align: left;
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
  .left7{
    width: 2.93rem;
    height: 1.02rem;
    margin-top: 0.2rem;
    @include Box;
    display: flex;
    align-items: center;
    >img{
      height: 100%;
      margin-right: 0.15rem;
    }
    .left7_text{
      >div:nth-of-type(1){
        font-size: 0.16rem;
        font-weight: 400;
        color: #4D4E85;
      }
      >div:nth-of-type(2){
        display: flex;
        align-items: flex-end;
        font-size: 0.16rem;
        color: #3DD598;
        display: flex;
        align-items: center;
        >span{
          font-size: 0.24rem;
          font-weight: 600;
          color: #383874;
          margin-right: 6px;
        }
        >img{
          margin-right: 6px;
        }
      }
    }
  }
}
.modul_right{
  width: 3rem;
  right: 0.63rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 4;
  // @include Box;
  >img{
    width: 1.85rem;
    height: 0.35rem;
  }
  .right1{
    font-size: 0.2rem;
    font-weight: bold;
    color: #72739E;
    margin-top: 0.12rem;
  }
  .right2{
    font-size: 0.16rem;
    font-weight: bold;
    color: #72739E;
    margin-top: 0.12rem;
  }
  .right3{
    @include lv1;
    margin-top: 0.13rem;
    >span{
      font-size: 0.36rem;
      font-weight: 600;
      color: #383874;
    }
  }
  .right4{
    font-size: 0.16rem;
    font-weight: 400;
    color: #8787AD;
  }
  .right5{
    @include Box;
    width: 100%;
    height: 7rem;
    margin-top: 0.36rem;
    display: flex;
    flex-direction: column;
    .right5_top{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0.25rem;
      >img{
        width: 1.45rem;
        height: 1.67rem;
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
    .right5_bottom{
      flex: 1;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      .right5_bottom_items{
        @include ScrollLi(#FF5A41);
        cursor: pointer;
        >div:nth-of-type(1){
          width: 30%;
        }
        >div:nth-of-type(2){
          width: 15%;
          text-align: center;
        }
        >div:nth-of-type(3){
          width: 50%;
          text-align: left;
        }
        >div:nth-of-type(4){
          width: 30%;
          text-align: center;
        }
      }
    }
  }
}
</style>
