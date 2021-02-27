<template>
  <div class="modul3">
    <div class="modul3_bck">
      <img src="./image/modul_bck.png" alt="" />
      <div class="modul3_bck_box">
        <div ref="chartsdiv" class="charts_box wow wow animate__zoomIn"></div>
        <div class="top">
          <div
            class="top_items"
            v-for="(item, key) in home.apply_proportion"
            :key="key"
          >
            <el-progress
              type="circle"
              :percentage="item.percentage"
              :color="colors[key]"
              :stroke-width="8"
            ></el-progress>
            <div class="top_items_box">
              <div class="t1">{{ item.title }}</div>
              <div class="t2">
                  {{ item.num }}
                  <img src="./image/icon_lvjt.png" alt="">
                  <span>{{item.percentage}}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modul3_box">
      <div class="modul3_left">
        <div class="left1 wow animate__jackInTheBox">国内院校案例申请统计</div>
        <div class="left2 wow animate__bounceInLeft" data-wow-delay="0.1s">
          <div class="left2_top">
            <div class="t1">累计签约统计</div>
            <div class="t2">
              <span>{{ home.case_total }}</span>
              <img src="./image/icon_lvjt.png" alt="" />
              {{ home.up_value }}%
            </div>
            <div class="t3">
              Compared to ({{ home.year.min }}-{{ home.year.max }})
            </div>
            <img src="./image/icon_tongji.png" alt="" />
          </div>
          <div class="left2_bottom">
            <vue-seamless-scroll
              :data="home.total_detail"
              class="seamless-warp"
              :class-option="classOption"
            >
              <div
                class="left2_bottom_items"
                v-for="(item, key) in home.total_detail"
                @click="goList('gnbyyxname',item.name)"
                :key="key"
              >
                <div :title="item.name">
                  <span>●</span>
                  {{ item.name }}
                </div>
                <div :title="item.subject">{{ item.subject }}</div>
                <div :title="item.sum">{{ item.sum }}枚</div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
        <div class="left3 wow animate__bounceInLeft" data-wow-delay="0.3s">
          <div class="left3_top">
            <div class="left3_t1">国内院校案例统计</div>
            <div class="left3_t2">
              <span>{{ home.domestic_school.sum }}</span>
              <img src="./image/icon_lvjt.png" alt="" />
              {{ home.domestic_school.proportion }}%
            </div>
            <div class="left3_t3">
              Compared to ({{ home.year.min }}-{{ home.year.max }})
            </div>
          </div>
          <div class="left3_bottom">
            <div
              class="left3_bottom_item"
              v-for="(item, key) in home.domestic_school.data"
              :key="key"
            >
              <p>
                <span>{{ item.name }}</span
                >
                <span>{{ item.sum }}</span>
              </p>
              <div class="tiao">
                <div :style="{ width: item.proportion + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modul3_right">
        <img class="right1 wow animate__bounceInRight" data-wow-delay='0.4s' src="./image/textImg.png" alt="">
        <div class="right2 wow animate__bounceInRight" data-wow-delay="0.5s">
          <!-- <el-radio-group v-model="type" @change="tab()">
            <el-radio-button
              :label="item"
              v-for="(item, key) in typeList"
              :key="key"
            ></el-radio-button>
          </el-radio-group> -->
        </div>
        <div class="right3 wow animate__bounceInRight" data-wow-delay="0.6s">
          国内案例占比情况
        </div>
        <div class="right4 wow animate__bounceInRight" data-wow-delay="0.7s">
          <span>{{ home.domestic_school.proportion }}%</span>
          <!-- <img src="./image/icon_lvjt.png" alt="">
          {{home.domestic_school.proportion}}% -->
        </div>
        <div class="right5 wow animate__bounceInRight" data-wow-delay="0.8s">
          Compared to ({{ home.year.min }}-{{ home.year.max }})
        </div>
        <div class="right6 wow animate__bounceInRight" data-wow-delay="0.9s">
          <img src="./image/icon_tongji.png" alt="" />
        </div>
        <div class="right7 wow animate__bounceInRight" data-wow-delay="1s">
          <vue-seamless-scroll
            :data="home.college"
            class="seamless-warp"
            :class-option="classOption"
          >
            <div
              class="right7_items"
              v-for="(item, key) in home.college"
              :key="key"
              @click="goList('gnbyyxname',item.name)"
            >
              <div :title="item.name">
                <span>●</span> {{ item.name }}
              </div>
              <div :title="item.clients">{{ item.clients }}名</div>
              <div :title="item.sum">{{ item.sum }}枚</div>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHome5 } from '@/api/japan.js'
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
  data() {
    return {
      colors: ['#FF991F', '#07BA2B', '#063CFF'],
      home: {
        apply_proportion: [],
        case_total: 4190,
        chart_school: [],
        college: [],
        domestic_school: { name: '国内院校案例统计', sum: 4095, proportion: 97.62, data: [] },
        proportion: { value: '99.88', up_value: 37.84 },
        total_detail: [],
        up_value: 99.88,
        year: { min: '2012', max: '2021' }
      }
    }
  },
  created() {},
  mounted() {
    this.getData()
  },
  methods: {
    charts() {
      const chart = am4core.create(
        this.$refs.chartsdiv,
        am4pluginsForceDirected.ForceDirectedTree
      )
      const series = chart.series.push(
        new am4pluginsForceDirected.ForceDirectedSeries()
      )
      const color = ['#7D7BDF', '#DC96D2', '#8782E4']
      this.home.chart_school.forEach((item, index) => {
        const n = Number(item.type)
        item.color = color[n]
      })
      chart.data = this.home.chart_school
      console.log('chart.data', this.home.data_school)
      series.minRadius = 40
      series.maxRadius = 40
      series.dataFields.value = 'sum'
      series.dataFields.name = 'name'
      series.dataFields.children = 'children'
      series.dataFields.color = 'color'
      series.nodes.template.tooltipText = '{name}:{sum}枚'
      series.nodes.template.fillOpacity = 1
      // series.maxLevels = 2
      series.nodes.template.label.text =
        '[bold #383874 font-size: 13px]{name}\n[bold #383874 font-size: 13px]{sum}[/]'
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

      series.nodes.template.events.on('over', function(event) {
        event.target.dataItem.childLinks.each(function(link) {
          link.isHover = true
        })
        if (event.target.dataItem.parentLink) {
          event.target.dataItem.parentLink.isHover = true
        }
      })
      series.nodes.template.events.on('out', function(event) {
        event.target.dataItem.childLinks.each(function(link) {
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
      icon.width = 80
      icon.height = 80
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
    getData() {
      getHome5({
      }).then(res => {
        console.log('home5', JSON.parse(JSON.stringify(res.data)))
        this.home = res.data
        this.charts()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../mixin';
$bgColor: #00b928, #febb69, #8675ff, #f07289, #67c8ff, #fc8f66;
.modul3 {
  width: 100%;
  height: 10.2rem;
  position: relative;
  background: #f5f6fb;
  > .modul3_bck {
    width: 13.17rem;
    height: 100%;
    position: absolute;
    right: 2.72rem;
    > img {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .modul3_bck_box {
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

      > img {
        width: 3.22rem;
        height: 0.53rem;
        margin-bottom: 0.15rem;
      }
      > .charts_box {
        width: 10.6rem;
        height: 8.5rem;
        position: relative;
        // background: #3DD598;
        // opacity: 0.5;
        &::after {
          width: 60px;
          height: 20px;
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          background: #f4f5fb;
        }
        // background: red;
        // opacity: 0.5;
        // background: rgba(111,111,111,0.2);
      }
      .school {
        position: absolute;
        top: 0.6rem;
        background: #ffffff;
        border-radius: 0.19rem;
        /deep/ .el-radio-group {
          height: 0.32rem;
          .el-radio-button {
            width: 0.98rem;
            height: 0.32rem;
            > span {
              width: 100%;
              height: 100%;
              background: none;
              color: #050506;
              font-size: 0.14rem;
              border: none;
              box-shadow: none;
              padding: 0.1rem 0.2rem;
            }
          }
          .is-active {
            background: #8675ff;
            border-radius: 0.16rem;
            border: 1px solid #bab3fd;
            > span {
              color: #ffffff;
              border: none;
              box-shadow: none;
            }
          }
        }
      }
      .top {
        width: 100%;
        height: 1.4rem;
        position: absolute;
        bottom: 0rem;
        display: flex;
        box-sizing: border-box;
        padding: 0 1.4rem;
        .top_items {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          // background: red;
          /deep/ .el-progress-circle {
            width: 0.86rem !important;
            height: 0.86rem !important;
          }
          .top_items_box{
            margin-left:0.2rem;
            display: flex;
            flex-direction: column;
            .t1{
              font-size: 16px;
              font-weight: bold;
              color: #4D4E85;
            }
            .t2{
              height: 0.5rem;
              font-size: 36px;
              font-weight: 600;
              color: #383874;
              >img{
                margin-left: 0.00rem;
              }
              >span{
                font-size: .16rem;
                color: #3DD598;
                margin-left: 0.06rem;
              }
            }
          }
        }
      }
    }
  }
}
.modul3_box {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0.5rem 0.7rem;
  box-sizing: border-box;
}
.modul3_left {
  width: 2.91rem;
  position: absolute;
  .left1 {
    font-size: 0.26rem;
    font-weight: 550;
    color: #383874;
  }
  .left2 {
    @include Box;
    width: 100%;
    height: 5.2rem;
    margin-top: 0.2rem;
    display: flex;
    flex-direction: column;
    .left2_top {
      display: flex;
      flex-direction: column;
      margin-bottom: 0.25rem;
      > img {
        width: 100%;
        margin-bottom: 0.1rem;
      }
      > .t1 {
        font-size: 0.16rem;
        font-weight: 500;
        color: #4d4e85;
      }
      > .t2 {
        margin-top: 0.1rem;
        @include lv1;
        > span {
          font-size: 0.22rem;
        }
      }
      > .t3 {
        font-size: 0.14rem;
        font-weight: 400;
        color: #8787ad;
      }
    }
    .left2_bottom {
      flex: 1;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      .left2_bottom_items {
        cursor: pointer;
        @include ScrollLi(#f3b66e);
        > div {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.13rem;
        }
        > div:nth-of-type(1) {
          width: 35%;
        }
        > div:nth-of-type(2) {
          width: 35%;
          text-align: center;
        }
        > div:nth-of-type(3) {
          width: 20%;
          text-align: center;
        }
      }
      .left2_bottom_items2 {
        cursor: pointer;
        @include ScrollLi(#f3b66e);
        > div {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.13rem;
        }
        > div:nth-of-type(1) {
          width: 40%;
        }
        > div:nth-of-type(2) {
          width: 35%;
          text-align: center;
        }
        > div:nth-of-type(3) {
          width: 20%;
          text-align: center;
        }
      }
    }
  }
  .left3 {
    margin-top: 0.2rem;
    width: 2.97rem;
    height: 3.3rem;
    background: #ffffff;
    box-shadow: 4px 16px 52px 0px rgba(111, 143, 234, 0.3);
    border-radius: 0.1rem;
    box-sizing: border-box;
    padding: 0rem 0.3rem;
    display: flex;
    flex-direction: column;
    > .left3_top {
      padding: 0.2rem 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > .left3_t1 {
        font-size: 0.13rem;
        font-weight: 400;
        color: #4d4e85;
      }
      > .left3_t2 {
        display: flex;
        align-items: flex-end;
        font-size: 0.15rem;
        color: #3dd598;
        > span {
          font-size: 0.3rem;
          font-weight: 600;
          color: #383874;
          margin-right: 0.1rem;
        }
        > img {
          margin-right: 6px;
          margin-bottom: 0.03rem;
        }
      }
      > .left3_t3 {
        font-size: 0.14rem;
        font-weight: 400;
        color: #8787ad;
      }
    }
    > .left3_bottom {
      flex: 1;
      > .left3_bottom_item {
        margin-bottom: 0.2rem;
        > p {
          display: flex;
          justify-content: space-between;
          > span:nth-of-type(1) {
            font-size: 0.14rem;
            font-weight: 400;
            color: #57588a;
          }
          > span:nth-of-type(2) {
            font-size: 0.14rem;
            font-weight: 500;
            color: #44444f;
          }
        }
        .tiao {
          height: 0.05rem;
          background: #dedff3;
          border-radius: 3px;
          overflow: hidden;
          margin-top: 0.04rem;
          > div {
            height: 100%;
          }
        }
      }
      @for $i from 1 through 100 {
        .left3_bottom_item:nth-child(#{length($bgColor)}n + #{$i}) {
          $color: lighten(nth($bgColor, random(length($bgColor))), 0%);
          > .tiao {
            > div {
              background: $color;
            }
          }
        }
      }
    }
  }
}
.modul3_right {
  width: 2.2rem;
  right: 0.63rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  // align-items: flex-end;
  // @include Box;
  > .right1 {
    height: 0.35rem;
  }
  > .right2 {
    /deep/ .el-radio-group {
      .el-radio-button {
        width: 0.98rem;
        height: 0.4rem;
        border-radius: 0.02rem;
        border: 0.01rem solid #8675ff;
        > span {
          width: 100%;
          height: 100%;
          background: none;
          color: #8675ff;
          font-size: 0.16rem;
          border: none;
        }
      }
      .el-radio-button:nth-of-type(1) {
        margin-right: 0.1rem;
      }
      .is-active {
        background: #8675ff;
        border-radius: 2px;
        border: 1px solid #bab3fd;
        > span {
          color: #ffffff;
          border: none;
          box-shadow: none;
        }
      }
    }
  }
  > .right3 {
    width: 100%;
    font-size: 0.16rem;
    font-weight: 400;
    color: #41417a;
    margin-top: 0.4rem;
  }
  > .right4 {
    width: 100%;
    margin-top: 0.15rem;
    @include lv1;
    > span {
      font-size: 0.4rem;
    }
  }
  > .right5 {
    width: 100%;
    font-size: 0.14rem;
    font-weight: 400;
    color: #8787ad;
  }
  > .right6 {
    width: 100%;
    // height: 1rem;
    margin-top: 0.2rem;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .seamless-warp {
    height: 100%;
    overflow: hidden;
  }
  > .right7 {
    margin-top: 0.25rem;
    width: 100%;
    height: 5.8rem;
    // @include Box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .right7_items {
      cursor: pointer;
      @include ScrollLi(#ef7fb5);
      > div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      > div:nth-of-type(1) {
        width: 50%;
      }
      > div:nth-of-type(2) {
        width: 20%;
      }
      > div:nth-of-type(3) {
        width: 20%;
        text-align: right;
      }
    }
  }
}
</style>
