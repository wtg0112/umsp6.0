<template>
  <div class="modul5">
    <div class="m1_con1">
      <div class="m1_con1_title wow animate__fadeInDown" data-wow-delay="0.2s">American Data</div>
      <div class="m1_con1_btn wow animate__fadeInDown" data-wow-delay="0.3s">
        <!-- <button v-for="(item,key) in type" :key="key" :class="{active:act==item.value}" @click="xuewei(item)">{{item.name}}</button> -->
        <div>奖学金申请情况统计</div>
      </div>
    </div>
    <div class="m1_con2 wow animate__fadeInDown" ref="chart" data-wow-delay="0.5s">
    </div>
    <div class="m1_con3 ">
      <div class="t1 wow animate__fadeInDown" data-wow-delay="0.7s">
        <div>奖学金申请统计</div>
        <img src="./image/pros.png" alt="">
      </div>
      <div class="t2 ">
        <div class="box1 wow animate__fadeInDown" data-wow-delay="0.8s">
          <div class="title">
            <div class="title_c1">硕士奖学金案例统计</div>
            <div class="title_c2">
              <span>${{jxj.shuoshi.prize}}</span>
              <img src="./image/icon_lvjt.png" alt="">
              {{jxj.shuoshi.propotion}}%
            </div>
          </div>
          <div class="top ">
            <div class="table">
              <div>STUDENT NAME</div>
              <div>申请院校</div>
              <div>奖学金情况</div>
              <div>奖学金金额</div>
              <div>院校排名</div>
            </div>
          </div>
          <div class="bottom">
            <vue-seamless-scroll
              :data="jxj.shuoshi.data"
              class="seamless-warp"
              :class-option="classOption"
            >
              <div class="table" v-for="(item,key) in jxj.shuoshi.data" :key="key" @click="goDetails(item)">
                <div><span>●</span>{{item.name}}</div>
                <div>{{item.AppliSchool}}</div>
                <div>
                  <div class="tiao">
                    <div :style="'width:' + item.proportion + '%'"></div>
                  </div>
                </div>
                <div>${{item.prize}}</div>
                <div>{{item.rank_decimal|empty}}</div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
        <div class="box1 wow animate__fadeInDown" data-wow-delay="1s">
          <div class="title">
            <div class="title_c1">博士奖学金案例统计</div>
            <div class="title_c2">
              <span>${{jxj.boshi.prize}}</span>
              <img src="./image/icon_lvjt.png" alt="">
              {{jxj.boshi.propotion}}%
            </div>
          </div>
          <div class="top">
            <div class="table">
              <div>STUDENT NAME</div>
              <div>申请院校</div>
              <div>奖学金情况</div>
              <div>奖学金金额</div>
              <div>院校排名</div>
            </div>
          </div>
          <div class="bottom">
            <vue-seamless-scroll
              :data="jxj.boshi.data"
              class="seamless-warp"
              :class-option="classOption"
            >
              <div class="table" v-for="(item,key) in jxj.boshi.data" :key="key" @click="goDetails(item)">
                <div><span>●</span>{{item.name}}</div>
                <div>{{item.AppliSchool}}</div>
                <div>
                  <div class="tiao">
                    <div :style="'width:' + item.proportion + '%'"></div>
                  </div>
                </div>
                <div>${{item.prize}}</div>
                <div>{{item.rank_decimal|empty}}</div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
        <div class="box2 wow animate__fadeInDown" data-wow-delay="1.2s">
          <div class="box2_t1">奖学金金额统计</div>
          <div class="box2_t2">
              <span>${{sum(jxj.prize_total)}}</span>
          </div>
          <div class="box2_t3">Compared to ({{jxj.year.min}}-{{jxj.year.max}})</div>
          <img class="box2_img" src="./image/icon_tongji.png" alt="">
          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '../mixin.js'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import { getHome5 } from '@/api/meiyan.js'
am4core.useTheme(am4themesAnimated)
export default {
  mixins: [mixin],
  data () {
    return {
      act: 0,
      type: [{ name: '硕士', value: '0' }, { name: '博士', value: '1' }],
      jxj: {
        boshi: [],
        chart: [],
        prize_total: '14715436',
        shuoshi: [],
        year: {
          min: '2012',
          max: '2021'
        }
      }
    }
  },
  created () {

  },
  mounted () {
    getHome5().then(res => {
      // console.log('奖学金', res.data)
      this.jxj = res.data
      this.chart()
    })
  },
  methods: {
    xuewei (item) {
      this.act = item.value
    },
    chart () {
      const chart = am4core.create(this.$refs.chart, am4charts.XYChart)
      chart.hiddenState.properties.opacity = 0 // this makes initial fade in effect
      chart.data = this.jxj.chart
      chart.padding(0, 20, 0, 20)
      // console.log(chart.data)
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.dataFields.category = 'name'
      categoryAxis.renderer.minGridDistance = 40
      categoryAxis.renderer.grid.template.strokeOpacity = 1
      categoryAxis.renderer.grid.template.stroke = am4core.color('#D9D9D9')
      categoryAxis.renderer.grid.template.strokeWidth = 0.5
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.grid.template.strokeOpacity = 1
      valueAxis.renderer.grid.template.stroke = am4core.color('#D9D9D9')
      valueAxis.renderer.grid.template.strokeWidth = 0.5

      const range = valueAxis.axisRanges.create()
      range.value = 0
      // console.log(valueAxis)
      const series = chart.series.push(new am4charts.CurvedColumnSeries())
      series.dataFields.categoryX = 'name'
      series.dataFields.valueY = 'value'
      series.tooltipText = '{name}:{valueY.value}($)'
      chart.numberFormatter.numberFormat = '#s'
      series.columns.template.strokeOpacity = 0
      series.columns.template.fillOpacity = 0.75

      const hoverState = series.columns.template.states.create('hover')
      hoverState.properties.fillOpacity = 1
      hoverState.properties.tension = 0.4

      chart.cursor = new am4charts.XYCursor()
      series.columns.template.adapter.add('fill', function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index)
      })
      const scrollbarX = new am4core.Scrollbar()
      // scrollbarX.background.fill = am4core.color('#c00')
      scrollbarX.background.fillOpacity = 0.5
      chart.scrollbarX = scrollbarX
      categoryAxis.start = 0.4
      categoryAxis.keepSelection = true
      // Y轴添加百分比
      valueAxis.renderer.labels.template.adapter.add('text', function (text) {
        return '$' + text
      })
    },
    chart2 () {
      const chart = am4core.create(this.$refs.chart, am4charts.XYChart)
      chart.hiddenState.properties.opacity = 0 // this makes initial fade in effect
      chart.data = [{
        country: 'One',
        value: 3025
      }]
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.dataFields.category = 'country'
      categoryAxis.renderer.minGridDistance = 40

      chart.yAxes.push(new am4charts.ValueAxis())

      const series = chart.series.push(new am4charts.CurvedColumnSeries())
      series.dataFields.categoryX = 'country'
      series.dataFields.valueY = 'value'
      series.tooltipText = '{valueY.value}'
      series.columns.template.strokeOpacity = 0

      series.columns.template.fillOpacity = 0.75

      const hoverState = series.columns.template.states.create('hover')
      hoverState.properties.fillOpacity = 1
      hoverState.properties.tension = 0.4

      chart.cursor = new am4charts.XYCursor()

      // Add distinctive colors for each column using adapter
      series.columns.template.adapter.add('fill', function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index)
      })

      chart.scrollbarX = new am4core.Scrollbar()
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../mixin';
$bgColor: #00b928, #febb69, #8675ff, #f07289, #67c8ff,#FC8F66;
.modul5{
  height: 10.2rem;
  background: #F5F6FB;
}
.m1_con1{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0.5rem;
  >.m1_con1_title{
    font-size: .6rem;
    font-weight: 500;
    color: #36426B;
  }
  .m1_con1_btn{
    >div{
      font-size: .26rem;
      font-weight: 550;
      color: #383874;
    }
    > button {
        padding: 0.08rem 0.6rem;
        margin-left: 0.2rem;
        cursor: pointer;
        display: inline-block;
        background: rgb(255, 255, 255);
        border: 1px solid #8675FF;
        color: #8181a5;
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
  }
}
.m1_con2{
  width: 18.4rem;
  height: 4.52rem;
  margin: 0 auto;
  // padding: 0 0.4rem;
  position: relative;
  // &::after{
  //   content: '';
  //   width: .8rem;
  //   height: .3rem;
  //   background: #F5F6FB;
  //   bottom: 0px;
  //   left: .3rem;
  //   position: absolute;
  // }
  &::after{
    content: '博士';
    top: 1rem;
    right: .5rem;
    font-size: 0.16rem;
    position: absolute;
  }
  &::before{
    content: '硕士';
    bottom: 1rem;
    right: .5rem;
    font-size: 0.16rem;
    position: absolute;
  }
}
.m1_con3{
   padding: 0.2rem 0.5rem;
   .t1{
     display: flex;
     justify-content: space-between;
     align-items: center;
     >div{
      font-size: .26rem;
      font-weight: 500;
      color: #36426B;
     }
     >img{
       height: 0.35rem;
     }
   }
   .t2{
     margin-top: 0.1rem;
     display: flex;
     justify-content: space-between;
     >.box1{
      width: 7.19rem;
      height: 2.62rem;
      background: #FFFFFF;
      box-shadow: .05rem .19rem .62rem 0px rgba(111, 143, 234, 0.3);
      border-radius: .1rem;
      padding: 0.2rem 0.3rem;
      box-sizing: border-box;
      .title{
        color: #36426B;
        display: flex;
        justify-content: space-between;
        .title_c1{
          font-size: .16rem;
        }
        .title_c2{
          @include lv1;
          font-size:.13rem;
          >span{
            font-size: .2rem;
          }
        }
      }
      .table{
        display: flex;
        justify-content: space-between;
        padding: 0.08rem 0;
        >div{
          font-size: 0.13rem;
        }
        >div:nth-of-type(1){
          width: 1.3rem;
        }
        >div:nth-of-type(2){
          width: 1.4rem;
        }
        >div:nth-of-type(3){
          width: 1.3rem;
        }
        >div:nth-of-type(4){
          width: 0.9rem;
        }
        >div:nth-of-type(5){
          width: 0.7rem;
          text-align: center;
        }
      }
      .top{
        .table{
          color: #C2C3D8;
        }
      }
      .bottom{
        width: 100%;
        height: 1.6rem;
        .table{
          cursor: pointer;
          >div{
            color: #3B3B76;
            font-size: 0.15rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            >span{
              color: #1BC040;
              margin-right: 0.06rem;
            }
          }
          >div:nth-of-type(5){
            text-align: center;
            color: #1BC040;
          }
          .tiao {
            height: 0.05rem;
            background: #dedff3;
            border-radius: 3px;
            overflow: hidden;
            > div {
              height: 100%;
              transition: width 2s;
            }
          }
        }
        @for $i from 1 through 100 {
            .table:nth-child(#{length($bgColor)}n+#{$i}) {
              $color:lighten(nth($bgColor, random(length($bgColor))), 0%);
              span{
                color:$color;
              }
              .tiao{
                >div{
                  background: $color;
                }
              }
            }
        }
      }
     }
     >.box2{
      width: 3.27rem;
      height: 2.62rem;
      background: #FFFFFF;
      box-shadow: .05rem .19rem .62rem 0px rgba(111, 143, 234, 0.3);
      border-radius: .1rem;
      font-size: 0.15rem;
      color: #3B3B76;
      padding: 0.2rem 0.3rem;
      box-sizing: border-box;
      .box2_t1{
        font-size: .16rem;
        font-weight: 400;
        color: #41417A;
      }
      .box2_t2{
        @include lv1;
        margin-top: 0.1rem;
        >span{
          font-size: .4rem;
          font-weight: 550;
          color: #383874;
        }
      }
      .box2_t3{
        font-size: .14rem;
        font-weight: 400;
        color: #8787AD;
        margin-top: 0.1rem;
      }
      .box2_img{
        width: 2.58rem;
        height: .85rem;
        margin-top: 0.2rem;
      }
     }
   }
}
</style>
