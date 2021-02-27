<template>
  <div class="mb_case">
    <!-- <img src="../image/home/niu.gif" class="niu" :class="niu ? 'on' : ''" alt=""> -->
    <div class="logo"></div>
    <div class="main_box">
      <div class="filter">
        <div class="filtrate">
          <div class="xuanxiang">
            <span>选择学位</span>
            <el-radio-group v-model="xuewei">
              <el-radio-button
                v-for="(item, key) in xueweiList"
                :key="key"
                :label="item.value"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div class="xuanxiang">
            <span>录取结果</span>
            <el-radio-group v-model="lqjg">
              <el-radio-button
                v-for="(item, key) in alOption.common.lqjgList"
                :key="key"
                :label="item.value"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div class="xuanxiang">
            <span>海外背景</span>
            <el-radio-group v-model="hwbj">
              <el-radio-button
                v-for="(item, key) in alOption.common.hwbjList"
                :key="key"
                :label="item.value"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div class="xuanxiang">
            <span>入读时间</span>
            <el-radio-group v-model="sqnf">
              <el-radio-button
                v-for="(item, key) in alOption.common.sqnfList"
                :key="key"
                :label="item.value"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
        </div>
        <div v-show="More" class="Morebox">
          <span>精确筛选：</span>
          <div class="Morebox_con">
            <div class="Morebox_con_input"></div>
            <div class="Morebox_con_select">
              <!-- 请输入国外申请院校名字 -->
              <div class="dialog_select_item">
                <el-input
                  v-model="sqyxzwmc"
                  placeholder="请输入国外申请院校名字"
                ></el-input>
              </div>
              <!-- 请输入国内毕业学校名称 -->
              <div class="dialog_select_item">
                <el-input
                  v-model="gnbyyxname"
                  placeholder="毕业学校名称"
                ></el-input>
              </div>
              <!-- 入学季节 -->
              <div class="dialog_select_item">
                <el-select
                  v-model="sqjj"
                  placeholder="入学季节"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in alOption.common.jijieList"
                    :key="item.value"
                    :label="'入学季节 ' + item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <!-- GPA绩点 -->
              <div class="dialog_select_item">
                <el-select
                  v-model="gpajd"
                  placeholder="GPA绩点"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in alOption.common.gpacList"
                    :key="item.value"
                    :label="'GPA绩点 ' + item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <!-- 小托福分数 -->
              <div class="dialog_select_item">
                <el-select
                  v-model="xtf"
                  placeholder="小托福分数"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in alOption.common.xtfList"
                    :key="item.value"
                    :label="'小托福分数 ' + item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <!-- SLEP分数 -->
              <div class="dialog_select_item">
                <el-select
                  v-model="slep"
                  placeholder="SLEP分数"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in alOption.common.slepList"
                    :key="item.value"
                    :label="'SLEP分数' + item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <!-- SSAT分数 -->
              <div class="dialog_select_item">
                <el-select
                  v-model="ssat"
                  placeholder="SSAT分数"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in alOption.common.ssatList"
                    :key="item.value"
                    :label="'SSAT分数' + item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <!-- 申请年级 -->
              <div class="dialog_select_item">
                <el-select
                  v-model="sqnj"
                  placeholder="申请年级"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in alOption.common.sqnjList"
                    :key="item.value"
                    :label="'' + item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <!-- TOEFL分数 -->
              <div class="dialog_select_item">
                <el-select
                  v-model="toefl"
                  placeholder="TOEFL分数"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in alOption.common.toeflList"
                    :key="item.value"
                    :label="'TOEFL分数 ' + item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="dialog_select_item">
                <el-select
                  v-model="uniqueness"
                  placeholder="分组选项"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in alOption.common.uniquenessList"
                    :key="item.value"
                    :label="'分组选项：' + item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="queren">
              <button @click="find">确认</button>
              <button @click="reset">重置</button>
            </div>
          </div>
        </div>
      </div>
      <div class="charts">
        <charts v-if="chartsFlag" :amdata="amLqnj" title="申请年级"></charts>
        <charts v-if="chartsFlag" :amdata="amLqjg" title="录取结果"></charts>
        <charts v-if="chartsFlag" :amdata="amHwbj" title="海外背景"></charts>
        <charts v-if="chartsFlag" :amdata="amSqnf" title="入读时间"></charts>
      </div>
    </div>
    <div class="tables">
      <CaseTbale
        :loading="loading"
        :tableData="tableData"
        :xuewei="xuewei"
        @tableSort="tableSort"
      ></CaseTbale>
      <!-- 分页器 -->
      <div class="paging">
        <span>共{{ count }}条记录</span>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="offset + 1"
          :page-size="limit"
          :total="count"
          @current-change="tablePage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from './MeibenCaseMixin'
import charts from './components/charts'
export default {
  components: { charts },
  mixins: [mixin],
  data() {
    return {
      xuewei: '高中', // 学位
      niu: false,
      chartsFlag: false
    }
  },
  created() {
    this.getCaseChart()
  },
  mounted() {
    const that = this
    setTimeout(() => {
      that.niu = true
    }, 5000)
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang="scss">
@keyframes hide_opacity {
  0% {
    opacity: 1;
  }
  99% {
    opacity: 0;
  }
  100% {
    z-index: 0;
    display: none;
  }
}
.niu {
  width: 2.6rem;
  position: fixed;
  bottom: 0.1rem;
  left: 0.6rem;
  opacity: 0;
  animation: show_opacity 0.8s 1;
  animation-fill-mode: forwards;
  z-index: 1000;
  &.on {
    animation: hide_opacity 1s 1;
    animation-fill-mode: forwards;
  }
}
.mb_case {
  min-height: 100vh;
  min-width: 1200px;
  box-sizing: border-box;
  padding: 0.3rem 0.5rem;
  background: #eff1fa;
  .logo {
    width: 0.96rem;
    height: 0.3rem;
    background: url('../image/home/haicelogo.png') no-repeat center center;
    background-size: 100%;
  }
}
.main_box {
  height: 5.4rem;
  width: 100%;
  display: flex;
  margin-top: 0.25rem;
  position: relative;
  z-index: 10;
  .filter {
    width: 9.35rem;
    height: 100%;
    background: #ffffff;
    opacity: 0.86;
    border-radius: 0.2rem;
    margin-right: 0.4rem;
    padding: 0.28rem;
    box-sizing: border-box;
  }
  .charts {
    width: 7.41rem;
    height: 100%;
    background: #ffffff;
    opacity: 0.86;
    border-radius: 20px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    > div {
      width: 50%;
      height: 50%;
      box-sizing: border-box;
    }
  }
}
.tables {
  margin-top: 0.4rem;
  background: #ffffff;
  opacity: 0.86;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  padding-bottom: 0.2rem;
}
@import './mixin';
</style>
