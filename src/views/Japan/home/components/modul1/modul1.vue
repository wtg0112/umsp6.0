<template>
  <div class="modul1">
    <img src="./image/modul1_bck.png" alt="" class="wow" />
    <div class="modul1_box">
      <div class="title1 wow animate__bounceInLeft" data-wow-delay="0.1s">
        海策日本案例库
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
        <div>
          <el-progress
            type="circle"
            :percentage="home1.degree[0].value"
            color="#24C048"
            :stroke-width="8"
          ></el-progress>
          <div>
            <div>{{ home1.degree[0].sum }}</div>
            <div>{{ home1.degree[0].name }}</div>
          </div>
        </div>
        <div>
          <el-progress
            type="circle"
            :percentage="home1.degree[1].value"
            color="#063CFF"
            :stroke-width="8"
          ></el-progress>
          <div>
            <div>{{ home1.degree[1].sum }}</div>
            <div>{{ home1.degree[1].name }}</div>
          </div>
        </div>
      </div>
      <div class="tongji">
        <div class="left wow animate__bounceInLeft" data-wow-delay="0.5s">
          <div class="tongji_top">
            <div class="t1">案例概况</div>
            <div class="t2">
              <span>{{ home1.gaikuang.case_sum }}</span>
              <div>
                <img src="./image/icon_lvjt.png" alt="" />
                {{ home1.gaikuang.up_value }}%
              </div>
            </div>
            <div class="t3">
              Compared to ({{ home1.year.min }}-{{ home1.year.max }})
            </div>
          </div>
          <img src="./image/icon_tongji.png" alt="" />
          <!-- <div class="li_items">
              <div class="li_item" v-for="(item,key) in li_item" :key="key">
                <div><span>●</span> {{item.year}}年</div>
                <div>{{item.m}}名</div>
                <div>{{item.g}}个</div>
              </div>
            </div> -->
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
                @click="goList('sqnf',item.year)"
              >
                <div><span>●</span> {{ item.year }}年</div>
                <div>{{ item.clients }}名</div>
                <div>{{ item.sum }}个</div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
        <div class="right">
          <div
            class="xueshengtongji wow animate__bounceInLeft"
            data-wow-delay="0.6s"
          >
            <div class="tongji_top">
              <div class="t1">累计学生统计</div>
              <div class="t2">
                <span>{{ home1.student.student_sum }}</span>
                <div>
                  <img src="./image/icon_lvjt.png" alt="" />
                  {{ home1.student.up_value }}%
                </div>
              </div>
              <div class="t3">
                Compared to ({{ home1.year.min }}-{{ home1.year.max }})
              </div>
            </div>
          </div>
          <div
            class="qianyuetongji wow animate__bounceInLeft"
            data-wow-delay="0.7s"
          >
            <div class="tongji_top">
              <div class="t1">累计签约统计</div>
              <div class="t2">
                <span>{{ home1.subject_data.sum }}</span>
                <div>
                  <img src="./image/icon_lvjt.png" alt="" />
                  {{ home1.subject_data.up_value }} %
                </div>
              </div>
              <div class="t3">
                Compared to ({{ home1.year.min }}-{{ home1.year.max }})
              </div>
            </div>
            <div class="qytj_items">
              <vue-seamless-scroll
                :data="home1.subject_data.data"
                class="seamless-warp"
                :class-option="classOption"
              >
                <div
                  class="qytj_item"
                  v-for="(item, key) in home1.subject_data.data"
                  :key="key"
                >
                  <div class="qytj_item_num">
                    <span>{{ item.name }}</span
                    ><span>{{ item.sum }}</span>
                  </div>
                  <el-progress
                    :percentage="Number(item.up_value)"
                    status="exception"
                    :show-text="false"
                  ></el-progress>
                </div>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
      </div>
      <div class="gdal" @click="goList">
        更多案例
      </div>
      <div
        class="mapMark wow animate__backInDown"
        :class="'mk' + key"
        v-for="(item, key) in mapMark"
        :key="key"
        :data-wow-delay="'0.' + key + 's'"
      >
        <div>
          <img :src="item.img" alt="" />
          <div class="mapMark_font">
            <div>{{ item.title }}</div>
            <div>{{ item.num }}</div>
          </div>
        </div>
      </div>
      <div class="ip_image wow animate__bounceInRight" data-wow-delay="0.8s">
        <img src="./image/iptext.png" alt="" />
        <img src="./image/ipImage.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '../mixin.js'
import { getHome } from '@/api/japan.js'
export default {
  mixins: [mixin],
  data () {
    return {
      home1: {
        academy_total: 345,
        admission_total: 686,
        case_total: 686,
        degree: [
          { name: '博士研究生', sum: 359, value: 8.57 },
          { name: '修士研究生', sum: 3245, value: 77.43 }
        ],
        gaikuang: {
          case_sum: 4117,
          up_value: 120,
          data: [
            { year: '2017', clients: '638', sum: '870' },
            { year: '2018', clients: '543', sum: '806' },
            { year: '2016', clients: '437', sum: '599' },
            { year: '2019', clients: '419', sum: '585' },
            { year: '2020', clients: '425', sum: '542' },
            { year: '2015', clients: '201', sum: '273' },
            { year: '2014', clients: '138', sum: '194' },
            { year: '2021', clients: '115', sum: '136' },
            { year: '2013', clients: '63', sum: '91' },
            { year: '2012', clients: '21', sum: '21' }
          ]
        },
        offer_total: '3256',
        professor_total: '2504',
        student_total: '3025',
        signup: {
          sign_sum: '4112',
          up_value: 110,
          data: [
            { year: '2021', sign_sum: '136', value: '3' },
            { year: '2020', sign_sum: '542', value: '13' },
            { year: '2019', sign_sum: '584', value: '14' },
            { year: '2018', sign_sum: '804', value: '19' },
            { year: '2017', sign_sum: '868', value: '21' },
            { year: '2016', sign_sum: '599', value: '14' },
            { year: '2015', sign_sum: '273', value: '7' },
            { year: '2014', sign_sum: '194', value: '5' },
            { year: '2013', sign_sum: '91', value: '2' },
            { year: '2012', sign_sum: '21', value: '1' }
          ]
        },
        student: {
          student_sum: '2991',
          up_value: 110
        },
        subject_data: {
          data: [],
          sum: 4190,
          up_value: 22.34
        },
        year: { min: '2012', max: '2021' }
      },
      mapMark: [
        {
          title: '申请数量',
          num: '',
          img: require('@/views/Japan/home/components/modul1/image/mk1.png')
        },
        {
          title: '学生数量',
          num: '',
          img: require('@/views/Japan/home/components/modul1/image/mk2.png')
        },
        {
          title: '案例数量',
          num: '',
          img: require('@/views/Japan/home/components/modul1/image/mk3.png')
        },
        {
          title: '研究科数量',
          num: '',
          img: require('@/views/Japan/home/components/modul1/image/mk4.png')
        },
        {
          title: '教授数量',
          num: '',
          img: require('@/views/Japan/home/components/modul1/image/mk5.png')
        },
        {
          title: 'Offer数量',
          num: '',
          img: require('@/views/Japan/home/components/modul1/image/mk6.png')
        },
        {
          title: '录取数量',
          num: '',
          img: require('@/views/Japan/home/components/modul1/image/mk7.png')
        }
      ],
      jd1: 0,
      jd2: 0
    }
  },
  created () {
    getHome({}).then(res => {
      this.home1 = res.data
      console.log('home1', res.data)
      // res.data.degree[1].value
      this.mapMark[0].num = res.data.case_apply_total
      this.mapMark[1].num = res.data.student_total
      this.mapMark[2].num = res.data.case_total
      this.mapMark[3].num = res.data.academy_total
      this.mapMark[4].num = res.data.professor_total
      this.mapMark[5].num = res.data.offer_total
      this.mapMark[6].num = res.data.admission_total
    })
  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">
@import '../mixin';
[v-clock]{
  display: none;
}
.modul1 {
  width: 100%;
  height: 10.2rem;
  position: relative;
  > img {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
.modul1_box {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 0.5rem 0.7rem;
  box-sizing: border-box;
  .title1 {
    font-size: 0.24rem;
    font-weight: bold;
    color: #383874;
  }
  .title2 {
    cursor: pointer;
    margin-top: 0.37rem;
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
      margin-right: 1rem;
      > div:nth-child(1) {
        margin-right: 0.25rem;
      }
      > div:nth-child(2) {
        > div:nth-child(1) {
          font-size: 0.24rem;
          font-weight: 600;
          color: #383874;
        }
        > div:nth-child(2) {
          font-size: 0.16rem;
          font-weight: 400;
          color: #41417a;
        }
      }
      /deep/ .el-progress-circle {
        width: 0.86rem !important;
        height: 0.86rem !important;
        font-size: .3rem !important;
      }
    }
  }
  .tongji {
    margin-top: 0.4rem;
    display: flex;
    flex-shrink: 0;
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
      width: 3.06rem;
      height: 6.01rem;
      margin-right: 0.24rem;
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
    > .right {
      width: 2.86rem;
      height: 6.01rem;
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
        height: 4.46rem;
        margin-top: 0.24rem;
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
  .gdal {
    width: 1.64rem;
    height: 0.49rem;
    border-radius: 0.24rem;
    border: 1px solid #5756b3;
    text-align: center;
    line-height: 0.49rem;
    color: #5756b3;
    font-size: 0.19rem;
    top: 0.45rem;
    right: 0.63rem;
    position: absolute;
    cursor: pointer;
  }
  .mapMark {
    width: 1.86rem;
    height: 0.73rem;
    background: url('./image/mapMark.png') center center;
    background-size: 100%;
    position: absolute;
    box-sizing: border-box;
    padding-top: 0.12rem;
    padding-left: 0.12rem;
    > div {
      display: flex;
      align-items: center;
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
  }
  .mk0 {
    top: 4.5rem;
    right: 9.6rem;
  }
  .mk1 {
    top: 3.11rem;
    right: 6.7rem;
  }
  .mk2 {
    top: 5.41rem;
    right: 7rem;
  }
  .mk3 {
    top: 7rem;
    right: 7.38rem;
  }
  .mk4 {
    top: 6.5rem;
    right: 4.1rem;
  }
  .mk5 {
    top: 5.17rem;
    right: 2.1rem;
  }
  .mk6 {
    top: 2.85rem;
    right: 1.65rem;
  }
  .ip_image {
    position: absolute;
    right: 0.5rem;
    bottom: 0.4rem;
    > img:nth-of-type(1) {
      width: 3.22rem;
      height: 0.53rem;
    }
    > img:nth-of-type(2) {
      width: 1.9rem;
      height: 2.92rem;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
