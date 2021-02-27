<template>
  <div class="modul1">
    <img class="wow animate__fadeIn" src="./image/m1_back.png" alt="" />
    <div
      class="mapMark wow animate__fadeIn"
      :class="'mk' + key"
      v-for="(item, key) in home1.chart"
      :key="key"
      :data-wow-delay="'0.' + key * 2 + 's'"
    >
      <div class="round"></div>
      <div class="tip">
        <img :src="item.img" alt="" />
        <div class="mapMark_font">
          <div>{{ item.name }}</div>
          <div>{{ item.area_case_nu }}</div>
        </div>
      </div>
    </div>
    <div class="modul1_box">
      <div class="modul1_box_left">
        <div class="title1 wow animate__bounceInLeft" data-wow-delay="0.1s">
          美国本科案例概况统计
        </div>
        <div
          class="title2 wow animate__bounceInLeft"
          data-wow-delay="0.2s"
          @click="goList"
        >
          <span>ALL case</span> DETAIL >
        </div>
        <div class="title3 wow animate__bounceInLeft" data-wow-delay="0.3s">
          {{ home1.case_total }}
        </div>
        <div class="bili wow animate__bounceInLeft" data-wow-delay="0.4s">
          <div v-for="(item,key) in home1.degree" :key="key" @click="goList('xuewei', item.keyname)">
            <el-progress
              type="circle"
              :percentage="item.value"
              :color="color[key]"
              :stroke-width="8"
            ></el-progress>
            <div>
              <div>{{ item.name }}</div>
              <div>{{ item.sum }}</div>
            </div>
          </div>
        </div>
        <div class="tongji">
          <div class="left">
            <div
              class="qianyuetongji wow animate__bounceInLeft"
              data-wow-delay="0.7s"
            >
              <div class="tongji_top">
                <div class="t1">整体案例概况</div>
                <div class="t2">
                  <span>{{ home1.gaikuang.case_sum }}</span>
                  <div>
                    <img src="./image/icon_lvjt.png" alt="" />
                    {{ home1.gaikuang.up_value }} %
                  </div>
                </div>
                <div class="t3">
                  Compared to ({{ home1.year.min }}-{{ home1.year.max }})
                </div>
              </div>
              <img src="./image/icon_tongji.png" alt="" />
              <div class="left6">
              <vue-seamless-scroll
                :data="home1.gaikuang.data"
                class="seamless-warp"
                :class-option="classOption"
              >
                <div
                  class="left6_items"
                  v-for="(item, key) in home1.gaikuang.data"
                  :key="key"
                  @click="goList('sqnf', item.year)"
                >
                  <div><span>●</span> {{ item.year }}年</div>
                  <div>{{ item.clients }}名</div>
                  <div>{{ item.sum }}个</div>
                </div>
              </vue-seamless-scroll>
            </div>
            </div>
          </div>
          <div class="right wow animate__bounceInLeft" data-wow-delay="0.5s">
            <div class="tongji_top">
              <div class="t1">案例概况</div>
              <div class="t2">
                <span>{{ home1.gaozhong.case_sum }}</span>
                <div>
                  <img src="./image/icon_lvjt.png" alt="" />
                  {{ home1.gaozhong.up_value }}%
                </div>
              </div>
              <div class="t3">
                Compared to ({{ home1.year.min }}-{{ home1.year.max }})
              </div>
            </div>
            <div class="qytj_items">
                <vue-seamless-scroll
                  :data="home1.gaozhong.data"
                  class="seamless-warp"
                  :class-option="classOption"
                >
                  <div
                    class="qytj_item"
                    v-for="(item, key) in home1.gaozhong.data"
                    :key="key"
                  >
                    <div class="qytj_item_num">
                      <span>{{ item.name }}</span
                      ><span>{{ item.sum }}</span>
                    </div>
                    <el-progress
                      :percentage="Number(item.value)"
                      status="exception"

                      :show-text="false"
                    ></el-progress>
                  </div>
                </vue-seamless-scroll>
              </div>
          </div>
        </div>
      </div>
      <div class="modul7_right">
        <div class="right1 wow animate__bounceInRight" data-wow-delay="1.1s">
          美本申请海策案例库占比
        </div>
        <div class="right2 wow animate__bounceInRight" data-wow-delay="1.2s">
          {{ home1.kb_proportion }}%
        </div>
        <div class="right3 wow animate__bounceInRight" data-wow-delay="1.3s">
          Compared to ({{ home1.year.min }}-{{ home1.year.max }})
        </div>
        <div class="right4 wow animate__bounceInRight" data-wow-delay="1.4s">
          <img src="./image/modul7_right_border.png" alt="" />
        </div>
        <div class="right5 wow animate__bounceInRight" data-wow-delay="1.5s">
          <div class="right5_bottom ">
            <vue-seamless-scroll
              :data="home1.hot_majors"
              class="seamless-warp"
              :class-option="classOption"
            >
              <div
                class="right5_bottom_items"
                v-for="(item, key) in home1.hot_majors"
                :key="key"
              >
                <div>
                  <span>●</span>
                  {{ item.name }}
                </div>
                <div>{{ item.value }}%</div>
                <div>{{ item.sum }}</div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
        <div class="right6 wow animate__bounceInRight" data-wow-delay="1.7s">
          <div
            class="right6_item"
            v-for="(item, key) in home1.beijing"
            :key="key"
          >
            <el-progress
              type="circle"
              :percentage="Number(item.value)"
              :color="color[key]"
              :stroke-width="8"
            ></el-progress>
            <div>
              <div>{{ item.name }}</div>
              <div>{{ item.sum }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '../mixin.js'
import { home1 } from '@/api/meiyan.js'
export default {
  mixins: [mixin],
  data() {
    return {
      home1: {
        beijing: [],
        case_total: null,
        chart: [],
        degree: [],
        gaikuang: {
          case_sum: 7560,
          data: [],
          up_value: 18.5
        },
        gaozhong: {
          case_sum: 7560,
          data: [],
          up_value: 18.5
        },
        hot_majors: [],
        kb_proportion: 21.75,
        year: { min: '2012', max: '2021' }
      },
      color: ['#20A0FF', '#24C048']
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      home1().then(res => {
        res.data.chart.forEach((item, key) => {
          item.img = require(`@/views/meiyan/home/components/modul1/image/mk${key +
            1}.png`)
          // console.log(item)
        })
        this.home1 = res.data
        console.log('home1', res.data)
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../mixin';
$bgColor: #00b928, #febb69, #8675ff, #f07289, #67c8ff, #fc8f66;
.modul1 {
  height: 10.2rem;
  background: #f5f6fb;
  position: relative;
  > img {
    height: 100%;
    margin-left: 2.6rem;
    position: relative;
  }
  > .mapMark {
    width: 1.84rem;
    height: 0.73rem;
    position: absolute;
    box-sizing: border-box;
    z-index: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .tip {
      width: 100%;
      height: 100%;
      display: flex;
      position: absolute;
      background: url('./image/mapMark.png') center center;
      background-size: 100%;
      padding: 0.12rem;
      box-sizing: border-box;
      cursor: pointer;
      > img {
        width: 0.39rem;
        height: 0.39rem;
        margin-right: 0.12rem;
      }
      > .mapMark_font {
        > div:nth-of-type(1) {
          font-size: 0.16rem;
          font-weight: 400;
          color: #383874;
        }
        > div:nth-of-type(2) {
          font-size: 0.19rem;
          font-weight: 600;
          color: #171725;
        }
      }
    }
    .round {
      display: block;
      width: 0.23rem;
      height: 0.23rem;
      background: #6862fe;
      border-radius: 50%;
      box-shadow: 0px 2px 5px 0px rgba(106, 101, 254, 0.52);
      border: 0.04rem solid #ffffff;
      position: relative;
      bottom: -0.15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: -1;
      &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        background-color: #6862fe;
        border-radius: 50%;
        transform-origin: center;
        animation: wave 2s ease-out infinite;
      }
      @keyframes wave {
        50%,
        75% {
          transform: scale(2.5);
        }
        80%,
        100% {
          opacity: 0;
        }
      }
    }
    @for $i from 1 through 8 {
      &:nth-child(#{$i}) {
        .round {
          &::after {
            animation-delay: $i * 1s;
          }
        }
      }
    }
  }
  > .mapMark:hover {
    transform: scale(1.1);
  }
  .mk0 {
    top: 2.9rem;
    left: 6.4rem;
  }
  .mk1 {
    top: 4.2rem;
    left: 6.6rem;
  }
  .mk2 {
    top: 3rem;
    left: 9.6rem;
  }
  .mk3 {
    top: 4.5rem;
    left: 9.2rem;
  }
  .mk4 {
    top: 6.5rem;
    left: 9.2rem;
  }
  .mk5 {
    top: 3.8rem;
    left: 12.8rem;
  }
  .mk6 {
    top: 5.6rem;
    left: 11.6rem;
  }
  .mk7 {
    top: 7.85rem;
    right: 1.65rem;
  }
}
.modul1_box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  padding: 0.4rem 0.7rem;
  box-sizing: border-box;
  display: flex;
  .modul1_box_left {
    .title1 {
      font-size: 0.26rem;
      font-weight: bold;
      color: #383874;
    }
    .title2 {
      cursor: pointer;
      margin-top: 0.2rem;
      @include Tongji;
    }
    .title3 {
      @include H1;
    }
    .bili {
      display: flex;
      > div {
        display: flex;
        align-items: center;
        margin-right: 0.3rem;
        > div:nth-child(1) {
          margin-right: 0.25rem;
        }
        > div:nth-child(2) {
          > div:nth-child(1) {
            font-size: 0.16rem;
            font-weight: 400;
            color: #41417a;
          }
          > div:nth-child(2) {
            font-size: 0.24rem;
            font-weight: 600;
            color: #383874;
            margin-top: 0.04rem;
          }
        }
        /deep/ .el-progress-circle {
          width: 0.86rem !important;
          height: 0.86rem !important;
        }
      }
    }
    .tongji {
      margin-top: 0.2rem;
      display: flex;
      flex-shrink: 0;
      align-items: flex-end;
      .tongji_top {
        > .t1 {
          font-size: 0.16rem;
          font-weight: 400;
          color: #4d4e85;
        }
        > .t2 {
          display: flex;
          align-items: flex-end;
          margin-top: 4px;
          > span {
            font-size: 0.24rem;
            font-weight: 600;
            color: #383874;
            margin-right: 0.18rem;
          }
          > div {
            font-size: 0.16rem;
            color: #3dd598;
            display: flex;
            align-items: center;
            > img {
              margin-right: 4px;
            }
          }
        }
        > .t3 {
          font-size: 0.14rem;
          font-weight: 400;
          color: #8787ad;
          margin-top: 4px;
        }
      }
      > .left {
        width: 2.86rem;
        width: 2.9rem;
        height: 6.01rem;
        margin-right: 0.24rem;
        > div {
          @include Box;
          > .tongji_top {
            span {
              font-size: 0.36rem;
            }
          }
        }
        .xueshengtongji {
          height: 1.3rem;
        }
        .qianyuetongji {
          height: 6.02rem;
          // margin-top: 0.24rem;
          .seamless-warp {
            height: 100%;
            overflow: hidden;
          }
          > img {
            width: 100%;
            margin-top: 0.2rem;
          }
          .left6 {
            margin-top: 0.17rem;
            width: 100%;
            height: 3.2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .left6_items {
              cursor: pointer;
              @include ScrollLi(#49cc68);
            }
          }
        }
      }
      > .right {
        width: 2.9rem;
        height: 4.46rem;
        @include Box;
        > img {
          width: 100%;
          height: 1rem;
          margin-top: 0.3rem;
        }
        > .li_items {
          width: 100%;
          height: 3.2rem;
          margin-top: 0.3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .li_item {
            display: flex;
            justify-content: space-between;
            font-size: 0.16rem;
            > div:nth-of-type(1) {
              color: #57588a;
              display: flex;
              align-items: center;
              > span {
                color: #ff5a41;
                margin-right: 0.1rem;
              }
            }
            > div:nth-of-type(2) {
              color: #8d8eb2;
            }
            > div:nth-of-type(3) {
              color: #44444f;
            }
          }
        }
        .seamless-warp {
          height: 100%;
          overflow: hidden;
        }
        .qytj_items {
            margin-top: 0.2rem;
            height: 2.9rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .qytj_item {
              cursor: pointer;
              padding: 10px 0;
              .qytj_item_num {
                display: flex;
                justify-content: space-between;
                margin-bottom: 4px;
                font-size: 0.16rem;
                > span:nth-of-type(1) {
                  color: #57588a;
                }
                > span:nth-of-type(2) {
                  color: #44444f;
                }
              }
              /deep/ .el-progress-bar__outer {
                height: 0.06rem !important;
              }
            }
          }
      }
    }
  }
  .modul7_right {
    width: 3rem;
    right: 0.63rem;
    position: absolute;
    display: flex;
    flex-direction: column;
    // @include Box;
    > img {
      width: 2rem;
      height: 0.35rem;
    }
    .right1 {
      font-size: 0.16rem;
      font-weight: 400;
      color: #72739e;
      margin-top: 0.12rem;
    }
    .right2 {
      font-size: 0.48rem;
      font-weight: bold;
      color: #383874;
      margin-top: 0.15rem;
    }
    .right3 {
      font-size: 0.16rem;
      font-weight: 400;
      color: #8787ad;
    }
    .right4 {
      width: 2.17rem;
      height: 0.71rem;
      margin-top: 0.25rem;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .right5 {
      width: 2.6rem;
      height: 4rem;
      margin-top: 0.2rem;
      display: flex;
      flex-direction: column;
      .right5_bottom {
        flex: 1;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        .right5_bottom_items {
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
            width: 30%;
            text-align: right;
          }
          > div:nth-of-type(3) {
            width: 30%;
            text-align: right;
          }
        }
      }
    }
    .right6 {
      height: 2.2rem;
      margin-top: 0.2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .right6_item {
        display: flex;
        align-items: center;
        cursor: pointer;
        > div:nth-of-type(1) {
          margin-right: 0.2rem;
          /deep/ .el-progress-circle {
            width: 0.86rem !important;
            height: 0.86rem !important;
          }
        }
        > div:nth-of-type(2) {
          > div:nth-of-type(1) {
            font-size: 0.2rem;
            font-weight: 500;
            color: #383874;
          }
          > div:nth-of-type(2) {
            font-size: 0.16rem;
            font-weight: 400;
            color: #41417a;
          }
        }
      }
    }
  }
}
</style>
