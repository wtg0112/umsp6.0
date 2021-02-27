<template>
  <div class="case">
    <!-- <div class="promote">
      <div class="promote_item" v-for="(item, key) in promote.top" :key="key">
        <div class="promote_item_img"><img :src="item.img" alt=""/></div>
        <div class="promote_item_box">
          <p>{{ item.name }}</p>
          <div>
            <span>{{ item.value }}</span>
            <div class="jindu">
              <div class="ts" ><span v-show="item.up_value!=0">+{{ item.up_value }}</span></div>
              <div class="tiao">
                <div :style="'width:' + item.proportion + '%'"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="filtrate">
      <!-- <div class="filtrate_left">
        <div class="t1">海策美国研究生案例库</div>
        <div class="t3">
          {{ promote.main.case_total }}
        </div>
        <div class="t4">Current activity</div>
        <div class="t5">
          <div
            v-for="(item, key) in promote.main.data"
            :key="key"
            :style="'width:' + item.value + '%'"
          ></div>
        </div>
        <div class="t6">
          <div class="t6_item" v-for="(item, key) in  promote.main.data" :key="key">
            <div><span>●</span>{{ item.name }}</div>
            <div>{{ item.sum }}</div>
            <div>{{ item.value }}%</div>
          </div>
        </div>
      </div> -->
      <div class="filtrate_right">
        <div class="filtrate_xuanxiang">
          <div class="xuanxiang">
            <span>案例类型</span>
            <el-radio-group v-model="listData.allx">
              <el-radio-button
                v-for="(item, key) in alOption.allx"
                :key="key"
                :label="item.value"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div class="xuanxiang">
            <span>留学案例</span>
            <el-radio-group v-model="listData.lxal">
              <el-radio-button
                v-for="(item, key) in alOption.lxal"
                :key="key"
                :label="item.value"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div class="xuanxiang">
            <span>考试科目</span>
            <el-radio-group v-model="listData.kskm">
              <el-radio-button
                v-for="(item, key) in alOption.kskm"
                :key="key"
                :label="item.value"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div class="xuanxiang">
            <span>现有学历</span>
            <el-radio-group v-model="listData.xyxl">
              <el-radio-button
                v-for="(item, key) in alOption.xyxl"
                :key="key"
                :label="item.value"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div class="xuanxiang">
            <span>申请学位</span>
            <el-radio-group v-model="listData.sqxw">
              <el-radio-button
                v-for="(item, key) in alOption.sqxw"
                :key="key"
                :label="item.value"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
        </div>
        <div class="filtrate_exact">
          <div class="Morebox">
            <span>精确筛选</span>
            <div class="Morebox_con">
              <div class="Morebox_con_select">
                <!-- 选择辅导周期 -->
                <div class="dialog_select_item">
                  <el-select
                    v-model="listData.fdzq"
                    placeholder="辅导周期"
                    :popper-append-to-body="false"
                  >
                    <el-option
                      v-for="item in alOption.fdzq"
                      :key="item.value"
                      :label="'辅导周期 ' + item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <!-- 选择辅导课时 -->
                <div class="dialog_select_item">
                  <el-select
                    v-model="listData.fdks"
                    placeholder="辅导课时"
                    :popper-append-to-body="false"
                  >
                    <el-option
                      v-for="item in alOption.fdks"
                      :key="item.value"
                      :label="'辅导课时 ' + item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <!-- 选择gpa -->
                <div class="dialog_select_item">
                  <el-select
                    v-model="listData.gpa"
                    placeholder="GPA"
                    :popper-append-to-body="false"
                  >
                    <el-option
                      v-for="item in alOption.gpa"
                      :key="item.value"
                      :label="'GPA ' + item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div class="dialog_select_item">
                  <el-select v-model="listData.xycj" placeholder="选择现有成绩" :popper-append-to-body="false">
                    <el-option
                      v-for="item in alOption.xycjList"
                      :key="item.value"
                      :label="'现有成绩 ' + item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>

                <div class="dialog_select_item">
                  <el-select v-model="listData.zzcj" placeholder="选择最终成绩" :popper-append-to-body="false">
                    <el-option
                      v-for="item in alOption.zzcjList"
                      :key="item.value"
                      :label="'最终成绩 ' + item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div class="dialog_select_item">
                  <el-select v-model="listData.tscj" placeholder="选择提升成绩" :popper-append-to-body="false">
                    <el-option
                      v-for="item in alOption.tscjList"
                      :key="item.value"
                      :label="'提升成绩 ' + item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div class="dialog_select_item">
                  <el-select v-model="listData.tingli" placeholder="选择听力分数" :popper-append-to-body="false">
                    <el-option
                      v-for="item in alOption.tingliList"
                      :key="item.value"
                      :label="'听力分数 ' + item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>

                <div class="dialog_select_item">
                  <el-select v-model="listData.kouyu" placeholder="选择口语分数" :popper-append-to-body="false">
                    <el-option
                      v-for="item in alOption.kouyuList"
                      :key="item.value"
                      :label="'口语分数 ' + item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div class="dialog_select_item">
                  <el-select v-model="listData.yuedu" placeholder="选择阅读分数" :popper-append-to-body="false">
                    <el-option
                      v-for="item in alOption.yueduList"
                      :key="item.value"
                      :label="'阅读分数 ' + item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div class="dialog_select_item">
                  <el-select v-model="listData.xiezuo" placeholder="选择写作分数" :popper-append-to-body="false">
                    <el-option
                      v-for="item in alOption.xiezuoList"
                      :key="item.value"
                      :label="'写作分数 ' + item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <!-- 在读学校名称 -->
                <div class="dialog_select_item" :popper-append-to-body="false">
                  <el-input
                    v-model="listData.zdxxName"
                    placeholder="在读学校名称"
                  ></el-input>
                </div>
              </div>
              <div class="queren">
                <button @click="find">确认</button>
                <button @click="reset">重置</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="center_left">
        <div>Active Data</div>
        <el-select
          v-model="limit"
          placeholder="显示页数"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in alOption.limitList"
            :key="item.value"
            :label="'Sort：' + item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="tablesBox">
      <Table
        :loading="loading"
        :tableData="tableData"
        :xuewei="xuewei"
        @tableSort="tableSort"
      ></Table>
      <div class="paging">
        <span>共{{ total }}条记录</span>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="offset + 1"
          :page-size="limit"
          :total="total"
          @current-change="tablePage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import CaseMixin from './CaseMixin'
import Table from './components/table/table'
export default {
  mixins: [CaseMixin],
  components: { Table },
  data () {
    return {
      promote: {
        main: {
          case_total: null,
          data: []
        },
        top: [
        ]
      },
      sqyxzwmc: '', // 国外申请院校名称
      sqzyname: '', // 国外申请专业
      gnbyyxname: '', // 国内毕业院校
      suoxuezhuanye: '', // 国内毕业专业
      xscity: '', // 学生城市
      szdq: '', // 所在地区
      gpajd: '', // GPA绩点
      gpabfz: '', // GPA百分制
      toefl: '', // TOEFL分数
      ielts: '',
      gre: '', // GRE分数
      gmat: '' // gmat 现在美研页面基本上都搭建完成，今天把六七屏做完整理的也过了一遍对接的接口，修改了大部分问题，
    }
  },
  created () {
    // 申请年份
    if (this.$route.query.sqnf) {
      this.sqnf = this.$route.query.sqnf
    }
    // 所在城市
    if (this.$route.query.xscity) {
      this.xscity = this.$route.query.xscity
    }
    // 所在地区
    if (this.$route.query.szdq) {
      this.szdq = this.$route.query.szdq
    }
    // 国内毕业院校
    if (this.$route.query.gnbyyxname) {
      this.gnbyyxname = this.$route.query.gnbyyxname
    }
    if (this.$route.query.sqyxzwmc) {
      this.sqyxzwmc = this.$route.query.sqyxzwmc
    }
    // 国内学科
    if (this.$route.query.yxxk) {
      this.yxxk = this.$route.query.yxxk
    }
  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">
 $bgColor: #00b928, #febb69, #8675ff, #f07289, #67c8ff,#FC8F66;
.case {
  width: 100%;
  min-height: 100vh;
  background: #f5f6fb;
  padding: 0.4rem 0.6rem;
  box-sizing: border-box;
}
.promote {
  width: 100%;
  height: 0.46rem;
  display: flex;
  flex-shrink: 0;
  margin-bottom: 0.4rem;
  justify-content: space-between;
  > .promote_item {
    width: 2.5rem;
    height: 100%;
    display: flex;
    .promote_item_img{
      width: 0.46rem;
      height: 0.46rem;
      overflow: hidden;
      margin-right: 0.15rem;
      box-shadow: 5px 19px 62px 0px rgba(111, 143, 234, 0.3);
      border-radius: .1rem;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    > .promote_item_box {
      flex: 1;
      > p {
        margin: 0;
        font-size: 14px;
        font-weight: 500;
        color: #383874;
      }
      > div {
        display: flex;
        flex-shrink: 0;
        position: relative;
        > span {
          width: 0.6rem;
          display: inline-block;
          font-size: 0.2rem;
          font-weight: 550;
          color: #383874;
        }
        > .jindu {
          width: 1.2rem;
          display: inline-block;
          position: relative;
          bottom: 0.04rem;
          .ts {
            height: 0.16rem;
            text-align: right;
            font-size: 0.14rem;
            font-weight: 500;
            color: #686896;
          }
          .tiao {
            height: 0.05rem;
            background: #dedff3;
            border-radius: 3px;
            overflow: hidden;
            > div {
              width: 50%;
              height: 100%;
              transition: width 2s;
            }
          }
        }
      }
    }
  }
  @each $c in $bgColor {
    $i: index($bgColor, $c);
    .promote_item:nth-of-type(#{$i}) {
      .tiao{
        >div{
          background: $c;
        }
      }
    }
  }
}

.filtrate {
  width: 100%;
  height: 6.04rem;
  background: #ffffff;
  box-shadow: 4px 0.16rem 0.52rem 0px rgba(111, 143, 234, 0.06);
  border-radius: 0.12rem;
  display: flex;
  .filtrate_left {
    width: 3.8rem;
    height: 100%;
    border-right: 1px solid #f1f1f5;
    box-sizing: border-box;
    padding: 0.4rem;
    .t1 {
      font-size: 0.2rem;
      font-weight: bold;
      color: #383874;
    }
    .t2 {
      font-size: 0.16rem;
      font-weight: 400;
      color: #393975;
      margin-top: 0.3rem;
      span {
        font-size: 0.18rem;
        font-weight: 600;
        color: #383874;
        margin-right: 0.34rem;
      }
    }
    .t3 {
      font-size: 0.78rem;
      font-weight: 550;
      color: #383874;
      line-height: 1.17rem;
    }
    .t4 {
      margin-top: 0.3rem;
      font-size: 0.2rem;
      font-weight: 500;
      color: #383874;
      line-height: 28px;
    }
    @keyframes identifier {
      20% {
        width: 20%;
        opacity: 0.6;
      }
      40% {
        width: 40%;
        opacity: 0.7;
      }
      60% {
        width: 60%;
        opacity: 0.8;
      }
      80% {
        width: 80%;
        opacity: 0.9;
      }
      100% {
        width: 100%;
        opacity: 1;
      }
    }
    .t5 {
      width: 100%;
      height: 0.1rem;
      display: flex;
      border-radius: 5px;
      margin-top: 0.1rem;
      background: #f3f3f3;
      overflow: hidden;
      // animation: identifier 1s linear;
      >div{
        width: 0px;
        transition: width 2s;
      }

      @each $item in $bgColor {
        $i:index($bgColor,$item);
        > div:nth-of-type(#{$i}){
          background: $item;
          border-right: 1px solid white;
        }
      }
      > div:nth-of-type(6){
        border: none;
        border-radius: 0px 5px 5px 0px;
      }
    }
    .t6 {
      width: 100%;
      margin-top: 0.5rem;
      height: 1.95rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .t6_item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.16rem;
        > div:nth-of-type(1) {
          color: #383874;
          width: 1.6rem;
          > span {
            margin-right: 6px;
          }
        }
        > div:nth-of-type(2) {
          color: #7b7ca4;
          width: 0.5rem;
        }
        > div:nth-of-type(3) {
          font-size: 0.2rem;
          font-weight: 500;
          color: #383874;
          width: 1rem;
          text-align: right;
        }
      }
      @each $item in $bgColor{
        $index:index($bgColor, $item);
        > .t6_item:nth-of-type(#{$index}){
          span {
            color: $item;
          }
        }
      }

    }
  }
  .filtrate_right {
    // width: 14.18rem;
    height: 100%;
    box-sizing: border-box;
    padding: 0.4rem;
    position: relative;
    > img {
      width: 1.78rem;
      // height: 2.14rem;
      position: absolute;
      right: 0.1rem;
      bottom: 0.3rem;
    }
  }
}
.center {
  padding: 0.4rem 0;
  display: flex;
  justify-content: space-between;
  /deep/ .el-input {
    width: 100%;
    > input {
      font-size: 0.14rem;
      height: 0.4rem;
      color: #8675ff;
      background: #ffffff;
      border-radius: 0.1rem;
      border: 1px solid white;
      padding: 0 0.15rem;
      &::-webkit-input-placeholder {
        color: #44444f;
      }
    }
  }
  /deep/ .el-select-dropdown__item.selected {
    color: #8675ff;
    font-weight: 550;
  }
  /deep/ .el-input__suffix {
    display: flex;
    align-items: center;
  }
  > div {
    display: flex;
    align-items: center;
  }
  .center_left {
    > div:nth-of-type(1) {
      font-size: 0.24rem;
      font-weight: 600;
      color: #171725;
      margin-right: 0.2rem;
    }
    > div:nth-of-type(2) {
      width: 1.4rem;
    }
  }
  .center_right {
    > div {
      width: 2.5rem;
      margin-left: 0.2rem;
    }

  }
}
.tablesBox {
  width: 100%;
  // height: 7.13rem;
  background: #ffffff;
  box-shadow: 4px 0.16rem 0.52rem 0px rgba(111, 143, 234, 0.09);
  border-radius: 0.12rem;
  overflow: hidden;
}

.xuanxiang {
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
  font-size: 0.15rem;
  > span {
    font-size: 0.15rem;
    color: #686896;
  }
  /deep/ .el-radio-group {
    .el-radio-button {
      > .el-radio-button__inner {
        color: #44444f;
        background-color: white;
        border-color: white;
        -webkit-box-shadow: nono;
        box-shadow: none;
        padding: 0rem 0.2rem;
        font-size: 0.15rem;
      }
    }
    .is-active {
      > .el-radio-button__inner {
        color: #8675ff;
        transition: all 0.5;
      }
    }
  }
}
.Morebox {
  color: #686896;
  box-sizing: border-box;
  padding-bottom: 0px;
  display: flex;
  font-size: 0.15rem;
  margin-top: 0.2rem;
  > span {
    height: 0.4rem;
    line-height: 0.4rem;
    display: inline-block;
    margin-right: 0.2rem;
  }
  > .Morebox_con {
    flex: 1;
    > .Morebox_con_select {
      display: flex;
      flex-wrap: wrap;
      > .dialog_select_item {
        width: 2.75rem;
        margin-bottom: 0.15rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 0.1rem;
        > div {
          width: 100%;
        }
        /deep/ .el-input {
          width: 100%;
          > input {
            font-size: 0.14rem;
            height: 0.4rem;
            color: #8675ff;
            &::-webkit-input-placeholder {
              color: #44444f;
            }
          }
        }
        /deep/ .el-select {
          width: 100%;
          > input {
            font-size: 0.14rem;
            height: 0.4rem;
          }
          /deep/ .el-input__suffix {
            display: flex;
            align-items: center;
          }
          /deep/.el-select-dropdown__item.selected {
            color: #8576ff;
            font-weight: 550;
          }
        }
      }
    }
    // 按钮
    .queren {
      justify-content: flex-start;
      margin-top: 0.2rem;
      > button:nth-child(1) {
        color: #ffffff;
        background: #8675ff;
      }
      > button {
        padding: 0.1rem 0.3rem;
        margin: 0 0.04rem;
        border-radius: 0.08rem;
        cursor: pointer;
        display: inline-block;
        background: rgb(255, 255, 255);
        border-radius: 0.11rem;
        border: 1px solid #8675ff;
        color: #8181a5;
        font-size: 0.15rem;
        outline: none;
        &:active {
          // box-shadow: 0 5px #666;
          color: white;
          background: #8576ff;
          opacity: 0.7;
          transform: translateY(0.5px);
        }
      }
    }
  }
}
/* 分页器 */
.paging {
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0.24rem;
  align-items: center;
  /deep/ .el-pagination {
    .el-pager {
      .active {
        background-color: #8576ff !important;
        color: #fff !important;
      }
      .number:hover {
        color: #8576ff;
      }
    }
  }
  /deep/ .el-input {
    width: 100%;
    > input {
      font-size: 0.14rem;
      height: 0.4rem;
      color: #8675ff;
      background: #ffffff;
      border-radius: 0.1rem;
      border: 1px solid white;
      padding: 0 0.15rem;
      &::-webkit-input-placeholder {
        color: #44444f;
      }
    }
  }
  /deep/ .el-select-dropdown__item.selected {
    color: #8675ff;
    font-weight: 550;
  }
  /deep/ .el-input__suffix {
    display: flex;
    align-items: center;
  }
}
.paging > span {
  font-size: 15px;
  font-weight: 400;
  color: rgba(32, 32, 32, 1);
  line-height: 20px;
}
</style>
