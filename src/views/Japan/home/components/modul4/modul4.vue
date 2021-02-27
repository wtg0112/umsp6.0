<template>
  <div class="modul2">
    <div class="modul2_bck">
      <img src="./image/modul4_bck.png" alt="" />
      <div class="modul2_bck_box wow animate__zoomIn">
        <img src="./image/map.png" alt="" />
        <div
          class="mapMark"
          :class="'mk' + key"
          v-for="(item, key) in mapMark"
          :key="key"
          :data-wow-delay="'0.' + key + 's'"
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
      </div>
    </div>
    <div class="modul2_box">
      <div class="modul2_left">
        <div class="left1 wow animate__jackInTheBox">海策日本案例库</div>
        <div
          class="left2 wow animate__bounceInLeft"
          data-wow-delay="0.2s"
          @click="goList"
        >
          查看案例
        </div>
        <div
          class="left3 wow animate__bounceInLeft"
          data-wow-delay="0.4s"
          @click="goList"
        >
          <span>ALL case</span> DETAIL >
        </div>
        <div class="left4 wow animate__bounceInLeft" data-wow-delay="0.6s">
          {{ home4.case_amount }}
        </div>
        <div class="left5 wow animate__bounceInLeft" data-wow-delay="0.7s">
          <div>
            <img src="./image/modul4_left1.png" alt="" />
            <div>
              <div>北上广地区</div>
              <div>{{ home4.case_bsg_nu }}</div>
            </div>
          </div>
          <div>
            <img src="./image/modul4_left2.png" alt="" />
            <div>
              <div>江浙沪地区</div>
              <div>{{ home4.case_jzh_nu }}</div>
            </div>
          </div>
        </div>
        <div class="left6 wow animate__bounceInLeft" data-wow-delay="0.9s">
          <img src="./image/icon_tongji.png" alt="" />
        </div>
        <div class="left7 wow animate__bounceInLeft" data-wow-delay="0.8s">
          <vue-seamless-scroll
            :data="home4.city_data"
            class="seamless-warp"
            :class-option="classOption"
          >
            <div
              class="left7_items"
              v-for="(item, key) in home4.city_data"
              :key="key"
              @click="goList('xscity',item.CityName)"
            >
              <div><span>●</span> {{ item.CityName }}</div>
              <div>{{ item.kh_nu }}名</div>
              <div>{{ item.city_case_nu }}枚</div>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>
      <div class="modul2_right">
        <img
          class="wow animate__bounceInRight"
          data-wow-delay="1s"
          src="./image/modul2_textImg.png"
          alt=""
        />
        <div class="right1 wow animate__bounceInRight" data-wow-delay="1.1s">
          日本案例占比情况
        </div>
        <div class="right2 wow animate__bounceInRight" data-wow-delay="1.2s">
          {{ home4.jp_proportion }}%
        </div>
        <div class="right3 wow animate__bounceInRight" data-wow-delay="1.3s">
          Compared to ({{home4.year.min}}-{{home4.year.max}})
        </div>
        <div class="right4 wow animate__bounceInRight" data-wow-delay="1.4s">
          <img src="./image/modul4_right_border.png" alt="" />
        </div>
        <div class="right5 wow animate__bounceInRight" data-wow-delay="1.5s">
          <div class="right5_bottom ">
            <vue-seamless-scroll
              :data="home4.area_data"
              class="seamless-warp"
              :class-option="classOption"
            >
              <div
                class="right5_bottom_items"
                v-for="(item, key) in home4.area_data"
                :key="key"
                @click="goList('szdq',item.id)"
              >
                <div>
                  <span>●</span>
                  {{ item.name }}
                </div>
                <div>{{ item.proportion }}%</div>
                <div>{{ item.area_case_nu }}</div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
        <div class="right6 wow animate__bounceInRight" data-wow-delay="1.7s">
          <div
            class="right6_item"
            v-for="(item, key) in home4.rank_data"
            :key="key"
            @click="goList('szdq',item.id)"
          >
            <el-progress
              type="circle"
              :percentage="Number(item.proportion)"
              :color="item.color"
              :stroke-width="8"
            ></el-progress>
            <div>
              <div>{{ item.name }}</div>
              <div>{{ item.area_name }}等</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHome4 } from '@/api/japan.js'
import mixin from '../mixin.js'
export default {
  mixins: [mixin],
  data () {
    return {
      home4: {
        case_amount: '4195',
        case_bsg_nu: '768',
        case_jzh_nu: '453',
        jp_proportion: 7.17,
        area_data: [
          { name: '华北地区', area_case_nu: '1177', proportion: 8.06 },
          { name: '华东地区', area_case_nu: '1054', proportion: 5.13 },
          { name: '华中地区', area_case_nu: '563', proportion: 3.42 },
          { name: '东北地区', area_case_nu: '467', proportion: 1.13 },
          { name: '西南地区', area_case_nu: '449', proportion: 0.7 },
          { name: '西北地区', area_case_nu: '320', proportion: 7.63 },
          { name: '华南地区', area_case_nu: '180', proportion: 4.29 },
          { name: '其他地区', area_case_nu: '5', proportion: 0.12 }
        ],
        year: {
          min: 2012,
          max: 2020
        },
        city_data: []
      },
      color: ['#FF991F', '#07BA2B', '#063CFF'],
      mapMark: [
        {
          name: '西北地区',
          area_case_nu: '431234',
          img: require('@/views/Japan/home/components/modul4/image/mk1.png')
        },
        {
          name: '西南地区',
          area_case_nu: '431234',
          img: require('@/views/Japan/home/components/modul4/image/mk2.png')
        },
        {
          name: '华中地区',
          area_case_nu: '431234',
          img: require('@/views/Japan/home/components/modul4/image/mk3.png')
        },
        {
          name: '华南地区',
          area_case_nu: '431234',
          img: require('@/views/Japan/home/components/modul4/image/mk4.png')
        },
        {
          name: '东北地区',
          area_case_nu: '431234',
          img: require('@/views/Japan/home/components/modul4/image/mk5.png')
        },
        {
          name: '华北地区',
          area_case_nu: '431234',
          img: require('@/views/Japan/home/components/modul4/image/mk6.png')
        },
        {
          name: '华东地区',
          area_case_nu: '431234',
          img: require('@/views/Japan/home/components/modul4/image/mk7.png')
        }
        // {
        //   name: '其他地区',
        //   area_case_nu: '431234',
        //   img: require('@/views/Japan/home/components/modul4/image/mk8.png')
        // }
      ],
      step: {
        direction: 0
      }
    }
  },
  created () {
    const that = this
    getHome4().then(res => {
      this.home4 = res.data
      res.data.area_data.forEach((item, key) => {
        const index = key + 1
        item.img = require('@/views/Japan/home/components/modul4/image/mk' +
          index +
          '.png')
      })
      this.mapMark = res.data.area_data
      res.data.rank_data.forEach((item, key) => {
        item.color = that.color[key]
      })
      console.log('home4', JSON.parse(JSON.stringify(res.data)))
    })
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="scss">
@import '../mixin';
.modul2 {
  width: 100%;
  height: 10.2rem;
  position: relative;
  overflow: hidden;
  > .modul2_bck {
    width: 11.5rem;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    > img {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .modul2_bck_box {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 3;
      padding-top: 0.25rem;
      box-sizing: border-box;
      > img {
        width: 100%;
        height: 100%;
      }
      @keyframes twinkling {
        0% {
          width: 0.1rem;
          height: 0.1rem;
          opacity: 0.2;
          transform: scale(1);
        }

        50% {
          width: 0.15rem;
          height: 0.15rem;
          opacity: 0.5;
          transform: scale(1.5);
        }

        100% {
          opacity: 0.2;
          transform: scale(1);
        }
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
            .round{
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
        top: 3.2rem;
        right: 6.8rem;
      }
      .mk1 {
        top: 5.8rem;
        right: 6rem;
      }
      .mk2 {
        top: 6rem;
        right: 3.4rem;
      }
      .mk3 {
        top: 7.5rem;
        right: 3.5rem;
      }
      .mk4 {
        top: 2rem;
        right: 0.8rem;
      }
      .mk5 {
        top: 3.17rem;
        right: 2.5rem;
      }
      .mk6 {
        top: 6rem;
        right: 1.2rem;
      }
      .mk7 {
        top: 7.85rem;
        right: 1.65rem;
      }
    }
  }
}
.modul2_box {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0.5rem 0.7rem;
  box-sizing: border-box;
}
.modul2_left {
  width: 2.91rem;
  position: absolute;
  .left1 {
    font-size: 0.24rem;
    font-weight: bold;
    color: #383874;
  }
  .left2 {
    @include Case;
    width: 0.99rem;
    height: 0.3rem;
    border-radius: 0.14rem;
    position: absolute;
    top: 0;
    left: 2rem;
    z-index: 3;
  }
  .left3 {
    @include Tongji;
    cursor: pointer;
    margin-top: 0.36rem;
  }
  .left4 {
    @include H1;
  }
  .left5 {
    font-size: 0.24rem;
    font-weight: 550;
    color: #41417a;
    margin-top: 0.26rem;
    height: 1.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
      > img {
        width: 0.67rem;
        height: 0.67rem;
        margin-right: 0.21rem;
      }
      > div {
        > div:nth-of-type(1) {
          font-size: 0.16rem;
          font-weight: 500;
          color: #57588b;
        }
        > div:nth-of-type(2) {
          font-size: 0.24rem;
          font-weight: 600;
          color: #45457d;
        }
      }
    }
  }
  .left6 {
    width: 2.3rem;
    height: 1rem;
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
  .left7 {
    margin-top: 0.25rem;
    width: 2.2rem;
    height: 4.09rem;
    // @include Box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .left7_items {
      cursor: pointer;
      @include ScrollLi(#ff718b);
      > div {
        width: 30%;
      }
      > div:nth-of-type(1) {
        text-align: left;
      }
      > div:nth-of-type(2) {
        text-align: right;
      }
      > div:nth-of-type(3) {
        text-align: right;
      }
    }
  }
}
.modul2_right {
  width: 3rem;
  right: 0.63rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  // @include Box;
  > img {
    width: 1.85rem;
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
    width: 2.2rem;
    height: 3rem;
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
    height: 3rem;
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
</style>
