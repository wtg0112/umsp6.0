<template>
  <div class="modul">
    <div class="left">
      <div class="t1">TOP院校录取率.录取数</div>
      <div class="t2">ALL tutor DETAIL ></div>
      <div class="t3">{{home.exam_count}}</div>
      <div class="t4">
        <div v-for="(item, key) in t4" :key="key" class="t4_items">
          <img :src="item.img" alt="" class="t4_items_img" />
          <div>
            <p>{{ item.name }}</p>
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>
      <div class="t5">
        <div
          class="t5_item"
          v-for="(item, key) in home.acceptance_rate"
          :key="key"
        >
          <el-progress
            class="progress"
            type="circle"
            :percentage="item.percentage"
            :color="color[key]"
          ></el-progress>
          <p>{{ item.title }}</p>
        </div>
      </div>
      <!-- 定位部分 -->
      <div class="t6">
        <p>申请学位的占比</p>
        <img src="./img/quxian.png" alt="">
        <div class="t6_items" v-for="(item,key) in home.apply_degree" :key="key">
          <div class="yuan" :style="{borderColor:color[key]}"></div>
          <div class="name">{{item.applydegree_singlebox}}</div>
          <div class="xian"><el-progress :text-inside="true" :color="color[key]" :show-text="false" :stroke-width="26" :percentage="item.proportion"></el-progress></div>
          <div class="zhanbi">{{item.proportion}}%</div>
        </div>
      </div>
    </div>
    <template>
      <div class="diqu" v-for="(item,key) in home.country_case_data" :key="key">
        <img :src="item.img" alt="">
        <div>
          <p>{{item.country}}</p>
          <span>{{item.proportion}}%</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { getHome2 } from '@/api/kaopei.js'
export default {
  data() {
    return {
      color: ['#24C048', '#063CFF', '#FF8D0A', '#8675FB'],
      home: {
        acceptance_rate: [99.85, 100, 99.66],
        apply_degree: [
          { applydegree_singlebox: '高中', num: '41', proportion: 0 },
          { applydegree_singlebox: '本科', num: '476', proportion: 0 },
          { applydegree_singlebox: '硕士', num: '926', proportion: 0 },
          { applydegree_singlebox: '博士', num: '17', proportion: 0 }
        ],
        case_apply_count: '1316',
        case_enroll_count: '1314',
        country_case_data: [
          { country: '美国地区', num: '1020', proportion: 83.27 },
          { country: '英国地区', num: '111', proportion: 9.06 },
          { country: '日本地区', num: '30', proportion: 2.45 },
          { country: '加拿大地区', num: '64', proportion: 5.22 }
        ],
        exam_count: 1549
      },
      t4: [
        { img: require('./img/alsq.png'), name: '案例申请数量', value: '0' },
        { img: require('./img/allq.png'), name: '案例录取数量', value: '0' }
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getHome2().then(res => {
        console.log(res.data)
        res.data.country_case_data.forEach((item, key) => {
          item.img = require(`./img/diqu${key}.png`)
        })
        this.home = res.data
        // 案例申请数量 录取数量
        this.t4[0].value = res.data.case_apply_count
        this.t4[1].value = res.data.case_enroll_count
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.modul {
  width: 100%;
  height: 10rem;
  padding-left: 0.6rem;
  box-sizing: border-box;
  display: flex;
  background: url('./img/modul_bak.png') no-repeat center center;
  background-size: 100%;
  padding-bottom: 0.66rem;
  position: relative;
  .left {
    position: relative;
    .t1 {
      margin-top: 0.33rem;
      font-size: 0.26rem;
      font-weight: 500;
      color: #000000;
    }
    .t2 {
      font-size: 0.16rem;
      color: #393975;
      margin-top: 0.35rem;
    }
    .t3 {
      font-size: 0.78rem;
      color: #383874;
      line-height: 0.94rem;
    }
    .t4 {
      margin-top: 0.7rem;
      .t4_items {
        display: flex;
        align-items: center;
        .t4_items_img {
          width: 0.68rem;
          height: 0.68rem;
          margin-right: 0.2rem;
        }
        p {
          font-size: 0.16rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #57588b;
          line-height: 0.22rem;
        }
        span {
          font-size: 0.24rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #45457d;
          line-height: 0.33rem;
        }
      }
      .t4_items:nth-of-type(1) {
        margin-bottom: 0.2rem;
      }
    }
    .t5 {
      margin-top: 0.7rem;
      .t5_item{
        margin-bottom: 0.3rem;
        /deep/ .el-progress {
          .el-progress-circle {
            width: 0.86rem !important;
            height: 0.86rem !important;
          }
        }
        p{
          font-size: .16rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #41417A;
          line-height: .22rem;
          margin-top: 0.1rem;
        }
      }
    }
    .t6{
      width: 3.55rem;
      height: 2.72rem;
      background: #FFFFFF;
      border-radius: .1rem;
      opacity: 0.8;
      padding: 0.2rem 0.36rem;
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      left: 2.7rem;
      p{
        font-size: .16rem;
        font-weight: 500;
        color: #57588B;
        line-height: 22px;
      }
      img{
        margin-top: 0.16rem;
        height: 0.7rem;
      }
      .t6_items{
        display: flex;
        align-items: center;
        margin-top: 0.1rem;
        .yuan{
          width: .1rem;
          height: .1rem;
          border: .02rem solid #8675FF;
          border-radius: 50%;
        }
        .name{
          font-size: .14rem;
          font-weight: 400;
          color: #383875;
          margin: 0 0.1rem;
        }
        .xian{
          width: 1.4rem;
          /deep/.el-progress{
            .el-progress-bar__outer{
              height: .06rem !important;
            }
          }
        }
        .zhanbi{
          margin-left: 0.16rem;
          font-size: .14rem;
          font-weight: 400;
          color: #41417A;
          line-height: .2rem;
        }
      }
    }
  }
  .diqu{
    width: 1.8rem;
    height: 0.73rem;
    position: absolute;
    background: url('./img/diqu_bck.png') no-repeat center center;
    background-size: 100%;
    box-sizing: border-box;
    padding: 0.12rem 0.2rem;
    display: flex;
    img{
      width: 0.39rem;
      height: 0.39rem;
      flex-shrink: 0;
      margin-right: 0.1rem;
    }
    p{
      font-size: .16rem;
      font-weight: 400;
      color: #383874;
    }
    span{
      font-size: .18rem;
      font-weight: 400;
      color: #171725;
    }
  }
  // 美国
  .diqu:nth-of-type(2){
    top: 2.4rem;
    left: 6.9rem;
  }
  // 英国
  .diqu:nth-of-type(3){
    top: 7rem;
    left: 9rem;
  }
  // 日本
  .diqu:nth-of-type(4){
    top: 1.7rem;
    right: 0.4rem;
  }
  // 加拿大
  .diqu:nth-of-type(5){
    top: 1rem;
    left: 6.6rem;
  }
}
</style>
