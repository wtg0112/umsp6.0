<template>
  <div class="modul5">
    <div class="modul5_bck">
      <img src="./image/modul5_bck.png" alt="">
      <div class="modul5_bck_box">
        <!-- <img src="./image/modul5_bck_img.png" alt=""> -->
        <div ref="chartsdiv" class="charts_box wow wow animate__zoomIn">
        </div>
      </div>
    </div>
    <div class="modul5_box">
      <div class="modul5_left">
        <div class="left1 wow animate__jackInTheBox">英国G5申请案例统计</div>
        <div class="left2 wow animate__bounceInLeft"  data-wow-delay='0.2s'>
          查看案例
        </div>
        <div class="left3 wow animate__bounceInLeft"  data-wow-delay='0.4s' @click="goList"><span>全部案例统计</span>DETAIL ></div>
        <div class="left4 wow animate__bounceInLeft"  data-wow-delay='0.6s'>{{home2.case_count}}</div>
        <div class="left5 wow animate__bounceInLeft"  data-wow-delay='0.7s'>Quantity of data</div>
        <div class="left6 wow animate__bounceInLeft"  data-wow-delay='0.8s' >
            <vue-seamless-scroll :data="home2.quantity_data" class="seamless-warp" :class-option="classOption">
              <div class="left6_items" v-for="(item,key) in home2.quantity_data" :key="key" @click="goDetails(item)">
                <div :title="item.AppliSchool"><span>●</span> {{item.AppliSchool}}</div>
                <div :title="item.AppliMajorName">{{item.AppliMajorName}}</div>
                <div :title="item.khname">{{item.khname}}</div>
              </div>
            </vue-seamless-scroll>
        </div>
        <div class="left7 wow animate__bounceInLeft" data-wow-delay='0.9s'>
          <img src="./image/xiaotongji.png" alt="">
          <div class="left7_text">
            <div>申请G5案例统计</div>
            <div>
              <span>{{home2.G5_case_num}}</span>
              <img src="./image/icon_lvjt.png" alt="">
              {{home2.G5_case_proportion}}%
            </div>
          </div>
        </div>
      </div>
      <div class="modul5_right">
        <img class="wow animate__bounceInRight" data-wow-delay='1s' src="./image/modul_textImg.png" alt="">
        <div class="right1 wow animate__bounceInRight" data-wow-delay='1.1s'>申请项目相关案例</div>
        <div class="right2 wow animate__bounceInRight" data-wow-delay='1.2s'>Total Detail</div>
        <div class="right3 wow animate__bounceInRight" data-wow-delay='1.3s'>
          <span>{{home2.case_major_nu}}</span>
          <img src="./image/icon_lvjt.png" alt="">
          {{home2.case_major_proportion}}%
        </div>
        <div class="right4 wow animate__bounceInRight" data-wow-delay='1.4s'>Compared to ({{home2.year.min}}-{{home2.year.max}})</div>
        <div class="right5  wow animate__bounceInRight" data-wow-delay='1.5s'>
          <div class="right5_top"  >
            <img src="./image/modul5_yuan.png" alt="">
            <div class="t1">Total Detail</div>
            <div class="t2">
              <span>{{home2.case_major_nu}}</span>
              <img src="./image/icon_lvjt.png" alt="">
              {{home2.case_major_proportion}}%
            </div>
          </div>
          <div class="right5_bottom ">
            <vue-seamless-scroll :data="home2.project_data" class="seamless-warp" :class-option="classOption">
              <div class="right5_bottom_items" v-for="(item,key) in home2.project_data" :key="key" @click="goDetails(item)">
                <div>
                  <span>●</span>
                  {{item.khname}}
                </div>
                <div>{{item.xmqczw_textarea}}</div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHome2 } from '@/api/yingguo.js'
import mixin from '../mixin.js'
import * as am4core from '@amcharts/amcharts4/core'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import * as am4pluginsForceDirected from '@amcharts/amcharts4/plugins/forceDirected'
am4core.useTheme(am4themesAnimated)
export default {
  mixins: [mixin],
  data () {
    return {
      act: '硕士',
      type: [{ name: '硕士', value: '硕士' }, { name: '博士', value: '博士' }],
      home2: {
        case_count: 25.009,
        case_major_nu: 24863,
        case_major_proportion: 99.42,
        G5_case_num: 744,
        G5_case_proportion: 4.76,
        major_nu: 3478,
        major_nu_my: 4242,
        major_proportion: 81.99,
        project_data: [],
        quantity_data: [],
        total_data: [],
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
    xuewei (item) {
      console.log(item)
      this.act = item.value
      this.getData()
    },
    getData () {
      const that = this
      getHome2({
        type: that.act
      }).then(res => {
        console.log('home2', JSON.parse(JSON.stringify(res.data)))
        this.home2 = res.data
        this.charts()
      })
    },
    charts () {
      const chart = am4core.create(this.$refs.chartsdiv, am4pluginsForceDirected.ForceDirectedTree)
      const series = chart.series.push(new am4pluginsForceDirected.ForceDirectedSeries())
      chart.padding(0)
      // chart.colors.list = [
      //   am4core.color('#9CF2F6'),
      //   am4core.color('#D3A5FE'),
      //   am4core.color('#9DA5F6'),
      //   am4core.color('#A5C7FE'),
      //   am4core.color('#A5E1FE'),
      //   am4core.color('#D3A5FE')
      // ]
      chart.data = this.home2.total_data
      series.minRadius = 20
      series.maxRadius = 100
      series.dataFields.value = 'value'
      series.dataFields.name = 'name'
      series.dataFields.id = 'id'
      series.dataFields.type = 'type'
      series.dataFields.children = 'children'
      series.nodes.template.tooltipText = '[bold]{name}[/]'
      series.nodes.template.fillOpacity = 1
      // series.maxLevels = 2
      series.nodes.template.label.text = '[bold]{name}[/]'
      series.fontSize = 13

      // 禁止点击展开收起
      series.nodes.template.togglable = false
      // 线的长度
      series.links.template.distance = 1
      // 离中心的距离
      series.centerStrength = 1
      series.links.template.strokeWidth = 1
      series.manyBodyStrength = -30 // 球的吸引力 吸引（正值）或推开（负值）
      series.links.template.strength = 2 // 线的吸引力
      series.links.template.strokeWidth = 2
      series.dataFields.color = 'color'
      // series.colors.list = [
      //   am4core.color('#9CF2F6'),
      //   am4core.color('#D3A5FE'),
      //   am4core.color('#9DA5F6'),
      //   am4core.color('#A5C7FE'),
      //   am4core.color('#A5E1FE'),
      //   am4core.color('#D3A5FE')
      // ]
      series.sequencedInterpolation = true
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
      // series.events.on('inited', function () {
      //   series.animate({
      //     property: 'velocityDecay',
      //     to: 0
      //   }, 3000)
      // })
      series.nodes.template.events.on('out', function (event) {
        event.target.dataItem.childLinks.each(function (link) {
          link.isHover = false
        })
        if (event.target.dataItem.parentLink) {
          event.target.dataItem.parentLink.isHover = false
        }
      })

      // 点击事件
      series.nodes.template.events.on('hit', function(ev) {
        console.log('clicked on', ev.target.dataItem.type)
        if (ev.target.dataItem.type == 3) {
          const { href } = this.$router.resolve(
            '/yingguo/details?userid=' +
             ev.target.dataItem.id
          )
          window.open(href, '_blank')
        } else if (ev.target.dataItem.type == 1) {
          getHome2({
            AppliSchool: ev.target.dataItem.name
          }).then(res => {
            this.home2 = res.data
            console.log('home2', JSON.parse(JSON.stringify(res.data)))
          })
        } else if (ev.target.dataItem.type == 0) {
          getHome2({
          }).then(res => {
            this.home2 = res.data
            console.log('home2', JSON.parse(JSON.stringify(res.data)))
          })
        }
      }, this)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../mixin";
.modul5{
  width: 100%;
  height: 10.20rem;
  position: relative;
  background: #F5F6FB;
  >.modul5_bck{
    width: 13.17rem;
    height: 100%;
    position: absolute;
    right: 2.8rem;
    >img{
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .modul5_bck_box{
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 3;
      padding-top: 0rem;
      padding-right: 0.4rem;
      box-sizing: border-box;
      >img{
          width: 3.22rem;
          height: 0.53rem;
          position: absolute;
          top: 0.47rem;
          z-index: 1;
      }
      >.charts_box{
        width: 11.6rem;
        height: 8.5rem;
        position: relative;
        &::after{
          width: 60px;
          height: 20px;
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          background:#F5F6FB;
        }
      }
    }
  }

}
.modul5_box{
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0.5rem 0.7rem;
  box-sizing: border-box;
}
.modul5_left{
  width: 2.91rem;
  position: absolute;
  .left1{
    font-size: 0.26rem;
    font-weight: bold;
    color: #383874;
  }
  .left2{
    display: flex;
    margin-top: 0.26rem;
    @include Case;
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
  }
  .left3{
    cursor: pointer;
    @include Tongji;
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
      cursor: pointer;
      @include ScrollLi(#FF5A41);
      >div:nth-of-type(1){
        width: 35%;
      }
      >div:nth-of-type(2){
        width: 30%;
        text-align: center;
      }
       >div:nth-of-type(3){
        width: 30%;
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
.modul5_right{
  width: 3rem;
  right: 0.63rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 4;
  // @include Box;
  >img{
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
      font-size: 0.16rem;
      .right5_bottom_items{
        @include ScrollLi(#4882D6);
        cursor: pointer;
        >div:nth-of-type(2){
          width: 60%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
      }
    }
  }
}
</style>
