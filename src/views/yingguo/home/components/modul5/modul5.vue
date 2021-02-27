<template>
  <div class="modul6">
    <div class="modul6_bck">
      <img src="./image/modul6_bck.png" alt="">
      <div class="modul6_bck_box">
        <div ref="chartsdiv" class="charts_box wow wow animate__zoomIn">
        </div>
      </div>
    </div>
    <div class="modul6_box">
      <div class="modul6_left">
        <div class="left1 wow animate__jackInTheBox">国内院校申请统计</div>
        <div class="left2  wow animate__bounceInLeft" data-wow-delay='0.1s'>
          <div class="left2_top">
            <div class="t1">累计签约统计</div>
            <div class="t2">
              <span>{{home5.case_total}}</span>
              <img src="./image/icon_lvjt.png" alt="">
             {{home5.up_value}}%
            </div>
            <img src="./image/icon_tongji.png" alt="">
          </div>
          <div class="left2_bottom">
            <vue-seamless-scroll :data="home5.total_detail" class="seamless-warp" :class-option="classOption">
              <div class="left2_bottom_items" v-for="(item,key) in home5.total_detail" :key="key" @click="goList('gnbyyxname',item.name)">
                <div :title="item.name">
                  <span>●</span>
                  {{item.name}}
                </div>
                <div>{{item.subject}}</div>
                <div>{{item.sum}}</div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
        <div class="left3 wow animate__bounceInLeft" data-wow-delay='0.3s'>
          <div v-for="(item,key) in home5.rank_school" :key="key">
            <div class="left3_t1">{{item.name}}</div>
            <div class="left3_t2">
              <span>{{item.value}}</span>
              <img src="./image/icon_lvjt.png" alt="">
              {{item.up_value}}%
            </div>
            <div class="left3_t3">Compared to ({{home5.year.min}}-{{home5.year.max}})</div>
          </div>
        </div>
      </div>
      <div class="modul6_right">
        <img class="right1 wow animate__bounceInRight" data-wow-delay='0.4s' src="./image/textImg.png" alt="">
        <div class="right2 wow animate__bounceInRight" @click="goList" data-wow-delay='0.5s'>更多案例</div>
        <div class="right3 wow animate__bounceInRight" data-wow-delay='0.6s'>国内案例占比情况</div>
        <div class="right4 wow animate__bounceInRight" data-wow-delay='0.7s'>
          <span>{{home5.proportion.value}}%</span>
          <img src="./image/icon_lvjt.png" alt="">
          {{home5.proportion.up_value}}%
        </div>
        <div class="right5 wow animate__bounceInRight" data-wow-delay='0.8s'>Compared to ({{home5.year.min}}-{{home5.year.max}})</div>
        <div class="right6 wow animate__bounceInRight" data-wow-delay='0.9s'>
          <img src="./image/icon_tongji.png" alt="">
        </div>
        <div class="right7 wow animate__bounceInRight"  data-wow-delay='1s' >
            <vue-seamless-scroll :data="home5.college" class="seamless-warp" :class-option="classOption">
              <div class="right7_items" v-for="(item,key) in home5.college" :key="key" @click="goList('gnbyyxname',item.name)">
                <div :title="item.name"><span>●</span> {{item.name}}</div>
                <div>{{item.clients}}名</div>
                <div>{{item.sum}}枚</div>
              </div>
            </vue-seamless-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHome5 } from '@/api/yingguo.js'
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
      home5: {
        case_total: 23.059,
        chart_school: [],
        college: [],
        proportion: { value: '88.02', up_value: 25.46 },
        rank_school: {
          rank20: { value: 12362, up_value: 53.61 },
          rank40: { value: 17936, up_value: 77.78 }
        },
        total_detail: [],
        up_value: 22.45,
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
      const color = ['#F87390', '#8675FF', '#67C8FF', '#FEBA69']
      const colorLen = color.length

      this.home5.chart_school.forEach((item, index) => {
        const colorIndex = index % colorLen
        item.color = color[colorIndex]
      })
      chart.data = this.home5.chart_school
      // chart.colors.list = [
      //   am4core.color('#8675FF'),
      //   am4core.color('#FF708B')
      // ]
      series.minRadius = 50
      series.maxRadius = 100
      series.dataFields.value = 'sum'
      series.dataFields.name = 'name'
      series.dataFields.children = 'children'
      series.dataFields.color = 'color'

      series.nodes.template.tooltipText = '{name}:{sum}人'
      // series.nodes.template.fillOpacity = 1
      // series.maxLevels = 2
      series.nodes.template.label.text = '[bold #383874 font-size: 13px]{name}\n[bold #383874 font-size: 13px]{sum}人[/]'
      series.nodes.template.label.valign = 'bottom'
      // series.nodes.template.label.paddingTop = 40
      series.fontSize = 13

      series.colors.wrap = true
      series.links.template.strokeWidth = 1

      // 线的长度
      series.links.template.distance = 5
      // 离中心的距离
      series.centerStrength = 2

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
      // var icon = series.nodes.template.createChild(am4core.Sprite)
      // icon.propertyFields.path = 'logo'
      // icon.horizontalCenter = 'middle'
      // icon.verticalCenter = 'middle'
      series.nodes.template.circle.disabled = true
      series.nodes.template.outerCircle.disabled = true
      // chart.zoomable = true
      // icon.width = '100%'
      // icon.height = '100%'
    },
    getData () {
      getHome5().then(res => {
        console.log('home5', JSON.parse(JSON.stringify(res.data)))
        this.home5 = res.data
        this.charts()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../mixin";
.modul6{
  width: 100%;
  height: 10.20rem;
  position: relative;
  background: #F5F6FB;
  >.modul6_bck{
    width: 13.17rem;
    height: 100%;
    position: absolute;
    right: 2.72rem;
    >img{
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .modul6_bck_box{
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
.modul6_box{
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0.5rem 0.7rem;
  box-sizing: border-box;
}
.modul6_left{
  width: 2.91rem;
  position: absolute;
  .left1{
    font-size: 0.26rem;
    font-weight: 550;
    color: #383874;
  }
  .left2{
    @include Box;
    width: 100%;
    height: 5rem;
    margin-top: 0.2rem;
    display: flex;
    flex-direction: column;
    .left2_top{
      display: flex;
      flex-direction: column;
      // align-items: center;
      margin-bottom: 0.25rem;
      >img{
        width: 100%;
        margin-top: 0.1rem;
      }
      >.t1{
        font-size: 0.16rem;
        font-weight: 400;
        color: #4D4E85;
      }
      >.t2{
        margin-top: 0.1rem;
        @include lv1;
        >span{
          font-size: 0.36rem;
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
          width: 60%;
        }
        >div:nth-of-type(2){
          width: 20%;
        }
        >div:nth-of-type(3){
          width: 15%;
          text-align: right;
        }
      }
    }
  }
  .left3{
    margin-top: 0.2rem;
    width: 2.97rem;
    height: 3.55rem;
    background: #FFFFFF;
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
          color: #383874;
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
        color:#8787AD;
      }
    }
    >div{
      border-bottom: 1px solid#ECEFF8;
    }
  }
}
.modul6_right{
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
