<template>
  <div class="modul2">
    <div class="modul2_bck">
      <img src="./image/modul_bck.png" alt="">
      <div class="modul2_bck_box">
        <div ref="chartsdiv" class="charts_box wow wow animate__zoomIn">
        </div>
      </div>
    </div>
    <div class="modul2_box">
      <div class="modul2_left">
        <div class="left1 wow animate__jackInTheBox">美国院校TOP 50统计</div>
        <div class="left2  wow animate__bounceInLeft" data-wow-delay='0.1s'>
          <div class="left2_top">
            <img src="./image/modul_yuan.png" alt="">
            <div class="t1">Total Detail</div>
            <div class="t2">
              <span>{{home2.case_data}}</span>
              <!-- <img src="./image/icon_lvjt.png" alt=""> -->
             <!-- {{home2.up_value}}% -->
            </div>
          </div>
          <div class="left2_bottom ">
            <vue-seamless-scroll :data="home2.case_data_detail" class="seamless-warp" :class-option="classOption">
              <div class="left2_bottom_items" v-for="(item,key) in home2.case_data_detail" :key="key" @click="goDetails(item)">
                <div>
                  <span>●</span>
                  {{item.name}}
                </div>
                <div>{{item.new_ApplyDegree}}</div>
                <div>{{item.new_AppliSchool}}</div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>

        <div class="left3 wow animate__bounceInLeft" data-wow-delay='0.3s'>
          <div>
            <div class="left3_t1">美国院校TOP30案例统计</div>
            <div class="left3_t2">
              <span>{{home2.data_arr.TOP30.num}}</span>
              <img src="./image/icon_lvjt.png" alt="">
              {{home2.data_arr.TOP30.percentage}}%
            </div>
            <div class="left3_t3">Compared to ({{home2.year.min}}-{{home2.year.max}})</div>
          </div>
          <div>
            <div class="left3_t1">美国院校TOP50案例统计</div>
            <div class="left3_t2">
              <span>{{home2.data_arr.TOP50.num}}</span>
              <img src="./image/icon_lvjt.png" alt="">
              {{home2.data_arr.TOP50.percentage}}%
            </div>
            <div class="left3_t3">Compared to ({{home2.year.min}}-{{home2.year.max}})</div>
          </div>
        </div>
      </div>
      <div class="modul2_right">
        <img class="right1 wow animate__bounceInRight" data-wow-delay='0.4s' src="./image/modul_textImg.png" alt="">
        <div class="right2 wow animate__bounceInRight" @click="goList" data-wow-delay='0.5s'>更多案例</div>
        <div class="right3 wow animate__bounceInRight" data-wow-delay='0.6s'>申请TOP50案例占比情况</div>
        <div class="right4 wow animate__bounceInRight" data-wow-delay='0.7s'>
          <span>{{home2.case_percentage}}%</span>
          <!-- <img src="./image/icon_lvjt.png" alt=""> -->
          <!-- {{home2.proportion.up_value}}% -->
        </div>
        <div class="right5 wow animate__bounceInRight" data-wow-delay='0.8s'>Compared to ({{home2.year.min}}-{{home2.year.max}})</div>
        <div class="right6 wow animate__bounceInRight" data-wow-delay='0.9s'>
          <img src="./image/icon_tongji.png" alt="">
        </div>
        <div class="right7 wow animate__bounceInRight"  data-wow-delay='1s' >
            <vue-seamless-scroll :data="home2.school_data" class="seamless-warp" :class-option="classOption">
              <div class="right7_items" v-for="(item,key) in home2.school_data" :key="key" @click="goList('sqyxzwmc',item.AppliSchool)">
                <div><span>●</span> {{item.AppliSchool}}</div>
                <div>{{item.user_num}}名</div>
                <div>{{item.num}}枚</div>
              </div>
            </vue-seamless-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHome2 } from '@/api/meiyan.js'
import mixin from '../mixin.js'
import * as am4core from '@amcharts/amcharts4/core'
// import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import * as am4pluginsForceDirected from '@amcharts/amcharts4/plugins/forceDirected'
/* Chart code */
// Themes begin
am4core.useTheme(am4themesAnimated)
export default {
  mixins: [mixin],
  data () {
    return {
      home2: {
        case_data: 12362,
        case_data_detail: [],
        case_percentage: 47.19,
        data_arr: {
          TOP10: { num: 2520, percentage: 9.62 },
          TOP20: { num: 4137, percentage: 15.79 },
          TOP30: { num: 7843, percentage: 29.94 },
          TOP50: { num: 12362, percentage: 47.19 }
        },
        data_school: [],
        school_data: [],
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
    charts () {
      const chart = am4core.create(this.$refs.chartsdiv, am4pluginsForceDirected.ForceDirectedTree)
      const series = chart.series.push(new am4pluginsForceDirected.ForceDirectedSeries())
      const color = ['#7D7BDF', '#DC96D2', '#8782E4']
      this.home2.data_school.forEach((item, index) => {
        const n = Number(item.type)
        item.color = color[n]
      })
      chart.data = this.home2.data_school

      console.log('chart.data', this.home2.data_school)
      series.minRadius = 45
      series.maxRadius = 45
      series.dataFields.value = 'num'
      series.dataFields.name = 'name'
      series.dataFields.children = 'children'
      series.dataFields.color = 'color'
      series.nodes.template.tooltipText = '{name}:{num}枚'
      series.nodes.template.fillOpacity = 1
      // series.maxLevels = 2
      series.nodes.template.label.text = '[bold #383874 font-size: 13px]{name}\n[bold #383874 font-size: 13px]{num}枚[/]'
      series.nodes.template.label.paddingTop = 40
      // series.nodes.template.label.verticalCenter = 'middle'
      // series.nodes.template.label.horizontalCenter = 'middle'
      series.nodes.template.label.valign = 'bottom'
      series.dataFields.color = 'color'
      series.colors.list = [
        am4core.color('#9CF2F6'),
        am4core.color('#D3A5FE'),
        am4core.color('#9DA5F6'),
        am4core.color('#A5C7FE'),
        am4core.color('#A5E1FE'),
        am4core.color('#D3A5FE')
      ]
      // series.nodes.template.label.paddingTop = 80
      series.fontSize = 13
      series.colors.wrap = true
      series.links.template.strokeWidth = 1

      // 线的长度
      series.links.template.distance = 10
      // 离中心的距离
      series.centerStrength = 1

      const hoverState = series.links.template.states.create('hover')
      hoverState.properties.strokeWidth = 3
      hoverState.properties.strokeOpacity = 1

      series.nodes.template.events.on('over', function (event) {
        event.target.dataItem.childLinks.each(function (link) {
          link.isHover = true
        })
        if (event.target.dataItem.parentLink) {
          event.target.dataItem.parentLink.isHover = true
        }
      })
      series.nodes.template.events.on('out', function (event) {
        event.target.dataItem.childLinks.each(function (link) {
          link.isHover = false
        })
        if (event.target.dataItem.parentLink) {
          event.target.dataItem.parentLink.isHover = false
        }
      })
      series.sequencedInterpolation = true
      var icon = series.nodes.template.createChild(am4core.Image)
      icon.propertyFields.href = 'logo'
      icon.horizontalCenter = 'middle'
      icon.verticalCenter = 'middle'
      // icon.paddingBottom = 20
      icon.width = 90
      icon.height = 90
      icon.dy = 0
      // var icon = series.nodes.template.createChild(am4core.Sprite)
      // icon.propertyFields.path = 'logo'
      // icon.horizontalCenter = 'middle'
      // icon.verticalCenter = 'middle'
      // series.nodes.template.circle.disabled = true
      series.nodes.template.outerCircle.disabled = true
      // chart.zoomable = true
      // icon.width = '100%'
      // icon.height = '100%'
    },
    getData () {
      getHome2().then(res => {
        console.log('home2', JSON.parse(JSON.stringify(res.data)))
        this.home2 = res.data
        this.charts()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../mixin";
.modul2{
  width: 100%;
  height: 10.20rem;
  position: relative;
  background: #F5F6FB;
  >.modul2_bck{
    width: 13.17rem;
    height: 100%;
    position: absolute;
    right: 2.72rem;
    >img{
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .modul2_bck_box{
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 3;
      padding-bottom: 1rem;
      box-sizing: border-box;
      padding-top: 1.5rem;
      >img{
          width: 3.22rem;
          height: 0.53rem;
          margin-bottom: 0.15rem;
      }
      >.charts_box{
        width: 10.6rem;
        height: 8.5rem;
        position: relative;
        // background: #3DD598;
        // opacity: 0.5;
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
.modul2_box{
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0.5rem 0.7rem;
  box-sizing: border-box;
}
.modul2_left{
  width: 2.91rem;
  position: absolute;
  .left1{
    font-size: 0.26rem;
    font-weight: 550;
    color:#383874;
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
        cursor: pointer;
        @include ScrollLi(#F3B66E);
        >div{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        >div:nth-of-type(1){
          width: 30%;
        }
        >div:nth-of-type(2){
          width: 25%;
          text-align: center;
        }
        >div:nth-of-type(3){
          width: 40%;
          text-align: center;
        }
      }
    }
  }
  .left3{
    margin-top: 0.2rem;
    width: 2.97rem;
    height: 2.55rem;
    background: #8675FF;
    box-shadow: 0.04rem 0.16rem 0.52rem 0.02rem rgba(111, 143, 234, 0.3);
    border-radius: 0.1rem;
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
        color: #FFFFFF;
      }
      >.left3_t2{
        display: flex;
        align-items: flex-end;
        font-size: 0.15rem;
        color: #3DD598;
        >span{
          font-size: 0.3rem;
          font-weight: 600;
          color: #FFFFFF;
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
        color: #C9C4FA;
      }
    }
    >div:nth-of-type(1){
      border-bottom: 1px solid #7872D8;
    }
  }
}
.modul2_right{
  width: 2.2rem;
  right: 0.63rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  // @include Box;
  >.right1{
    height: 0.35rem;
  }
  >.right2{
    margin-top: 0.2rem;
    @include Case;
    width: 1.38rem;
    height: 0.41rem;
  }
  >.right3{
    width: 100%;
    font-size: 0.16rem;
    font-weight: 400;
    color: #41417A;
    margin-top: 0.4rem;
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
    height: 5.2rem;
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
        }
        >div:nth-of-type(1){
          width: 50%;
        }
        >div:nth-of-type(2){
          width: 20%;
        }
        >div:nth-of-type(3){
          width: 20%;
          text-align: right;
        }
    }
  }
}
</style>
