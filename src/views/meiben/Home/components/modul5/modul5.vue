<template>
  <div class="modul3">
    <div class="modul3_bck">
      <img src="./image/modul_bck.png" alt="" />
      <div class="modul3_bck_box">
        <div ref="chartsdiv" class="charts_box wow wow animate__zoomIn"></div>
        <div class="school">
          <el-radio-group v-model="school" @change="schooltab()">
            <el-radio-button
              :label="item"
              v-for="(item, key) in schoolList"
              :key="key"
            ></el-radio-button>
          </el-radio-group>
        </div>
        <div class="top">
          <div
            class="top_items"
            v-for="(item, key) in home.proportion"
            :key="key"
          >
            <img :src="item.img" alt="" />
            <div class="t1">{{ item.title }}</div>
            <div class="t2">{{ item.percentage }}%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="modul3_box">
      <div class="modul3_left">
        <div class="left1 wow animate__jackInTheBox">{{ type }}申请统计</div>
        <div class="left2 wow animate__bounceInLeft" data-wow-delay="0.1s">
          <div class="left2_top">
            <div class="t1">累计签约统计</div>
            <div class="t2">
              <span>{{ home.cumulative_signing.num }}</span>
              <img src="./image/icon_lvjt.png" alt="" />
              {{ home.cumulative_signing.up_value }}%
            </div>
            <div class="t3">
              Compared to ({{ home.year.min }}-{{ home.year.max }})
            </div>
            <img src="./image/icon_tongji.png" alt="" />
          </div>
          <div class="left2_bottom" v-if="type == '新生'">
            <vue-seamless-scroll
              :data="home.cumulative_signing.data"
              class="seamless-warp"
              :class-option="classOption"
            >
              <div
                class="left2_bottom_items"
                v-for="(item, key) in home.cumulative_signing.data"
                :key="key"
              >
                <div :title="item.schoolname">
                  <span>●</span>
                  {{ item.schoolname }}
                </div>
                <div :title="item.AppliSchool">{{ item.AppliSchool }}</div>
                <div :title="item.name">{{ item.name }}</div>
              </div>
            </vue-seamless-scroll>
          </div>
          <div class="left2_bottom" v-if="type == '本转'">
            <vue-seamless-scroll
              :data="home.cumulative_signing.data"
              class="seamless-warp"
              :class-option="classOption"
            >
              <div
                class="left2_bottom_items2"
                v-for="(item, key) in home.cumulative_signing.data"
                :key="key"
              >
                <div :title="item.schoolname">
                  <span>●</span>
                  {{ item.schoolname }}
                </div>
                <div :title="item.subject">{{ item.subject }}</div>
                <div>{{ item.sum }}枚</div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
        <div class="left3 wow animate__bounceInLeft" data-wow-delay="0.3s">
          <div class="left3_top">
            <div class="left3_t1">{{ type }}案例统计</div>
            <div class="left3_t2">
              <span>{{ home.college_case_data.num }}</span>
              <img src="./image/icon_lvjt.png" alt="" />
              {{ home.college_case_data.up_value }}%
            </div>
            <div class="left3_t3">
              Compared to ({{ home.year.min }}-{{ home.year.max }})
            </div>
          </div>
          <div class="left3_bottom">
            <div
              class="left3_bottom_item"
              v-for="(item, key) in home.college_case_data.data"
              :key="key"
            >
              <p>
                <span>{{ item.name }}</span
                ><span>{{ item.sum }}</span>
              </p>
              <div class="tiao">
                <div :style="{ width: item.percentage + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modul3_right">
        <!-- <img class="right1 wow animate__bounceInRight" data-wow-delay='0.4s' src="./image/textImg.png" alt=""> -->
        <div class="right2 wow animate__bounceInRight" data-wow-delay="0.5s">
          <el-radio-group v-model="type" @change="tab()">
            <el-radio-button
              :label="item"
              v-for="(item, key) in typeList"
              :key="key"
            ></el-radio-button>
          </el-radio-group>
        </div>
        <div class="right3 wow animate__bounceInRight" data-wow-delay="0.6s">
          {{ type }}案例申请占比
        </div>
        <div class="right4 wow animate__bounceInRight" data-wow-delay="0.7s">
          <span>{{ home.college_case_data.up_value }}%</span>
          <!-- <img src="./image/icon_lvjt.png" alt=""> -->
          <!-- {{home.proportion.up_value}}% -->
        </div>
        <div class="right5 wow animate__bounceInRight" data-wow-delay="0.8s">
          Compared to ({{ home.year.min }}-{{ home.year.max }})
        </div>
        <div class="right6 wow animate__bounceInRight" data-wow-delay="0.9s">
          <img src="./image/icon_tongji.png" alt="" />
        </div>
        <div class="right7 wow animate__bounceInRight" data-wow-delay="1s">
          <vue-seamless-scroll
            :data="home.school_statistics"
            class="seamless-warp"
            :class-option="classOption"
          >
            <div
              class="right7_items"
              v-for="(item, key) in home.school_statistics"
              :key="key"
            >
              <div :title="item.schoolname">
                <span>●</span> {{ item.schoolname }}
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
import { getHome5 } from '@/api/meiben.js'
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
      home: {
        chart_school: [],
        college_case_data: {
          data: [],
          num: '6785',
          up_value: 89.75
        },
        cumulative_signing: {
          data: [],
          num: '5273',
          up_value: 77.72
        },
        proportion: [],
        school_statistics: [],
        year: { min: '2012', max: '2021' }
      },
      typeList: ['新生', '本转'],
      schoolList: ['国内高中', '海外高中'],
      type: '新生',
      school: '国内高中'
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
      series.minRadius = 45
      series.maxRadius = 45
      series.dataFields.value = 'sum'
      series.dataFields.name = 'schoolname'
      series.dataFields.children = 'children'
      series.dataFields.color = 'color'
      series.nodes.template.tooltipText = '{schoolname}:{sum}枚'
      series.nodes.template.fillOpacity = 1
      // series.maxLevels = 2
      series.nodes.template.label.text =
        '[bold #383874 font-size: 13px]{schoolname}\n[bold #383874 font-size: 13px]{sum}[/]'
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
    getData() {
      getHome5({
        type: this.type,
        academy_type: this.school
      }).then(res => {
        console.log('home5', JSON.parse(JSON.stringify(res.data)))
        res.data.proportion.forEach((item, key) => {
          item.img = require(`./image/top${key + 1}.png`)
          console.log(item)
        })
        this.home = res.data
        this.charts()
      })
    },
    tab() {
      if (this.type == '新生') {
        this.schoolList = ['国内高中', '海外高中']
      } else {
        this.schoolList = ['国内大学', '海外大学']
      }
      this.school = this.schoolList[0]
      this.getData()
    },
    schooltab() {
      this.getData()
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
        bottom: 0.2rem;
        display: flex;
        box-sizing: border-box;
        padding: 0 1.4rem;
        .top_items {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          // background: red;
          > img {
            width: 0.46rem;
            height: 0.46rem;
          }
          .t1 {
            font-size: 0.14rem;
            font-weight: 500;
            color: #383874;
            margin-top: 0.1rem;
          }
          .t2 {
            font-size: 0.4rem;
            font-weight: 500;
            color: #383874;
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
