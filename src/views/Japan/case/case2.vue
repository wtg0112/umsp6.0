<template>
  <div class="case">
    <div class="promote">
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
    </div>
    <div class="filtrate">
      <div class="filtrate_left">
        <div class="t1">海策日本案例库</div>
        <!-- <div class="t2">
          <span>ALL case</span>
          DETAIL >
        </div> -->
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
      </div>
      <div class="filtrate_right">
        <div class="filtrate_xuanxiang">
          <div class="xuanxiang">
            <span>选择学位</span>
            <el-radio-group v-model="xuewei">
              <el-radio-button
                v-for="(item, key) in alOption.jp.xueweiList"
                :key="key"
                :label="item.value"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div class="xuanxiang">
            <span>学生背景</span>
            <el-radio-group v-model="xsbj">
              <el-radio-button
                v-for="(item, key) in alOption.common.xsbjList"
                :key="key"
                :label="item.value"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div class="xuanxiang" v-if="!share">
            <span>申请时间</span>
            <el-radio-group v-model="sqnf">
              <el-radio-button
                v-for="(item, key) in alOption.common.sqnfList"
                :key="key"
                :label="item.value"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div class="xuanxiang">
            <span>申请季节</span>
            <el-radio-group v-model="sqjj">
              <el-radio-button
                v-for="(item, key) in alOption.common.sqjjList"
                :key="key"
                :label="item.value"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div class="xuanxiang">
            <span>国外学科</span>
            <el-radio-group v-model="yxxk">
              <el-radio-button
                v-for="(item, key) in yxxkList"
                :key="key"
                :label="item.id"
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
                <!-- 请输入国外申请院校名字 -->
                <div class="dialog_select_item">
                  <el-input
                    v-model="sqyxzwmc"
                    placeholder="请输入国外申请院校名字"
                  ></el-input>
                </div>
                <!-- 国外申请专业 -->
                <div class="dialog_select_item">
                  <el-autocomplete
                    v-model="sqzyname"
                    class="inline-input"
                    :fetch-suggestions="sqzySearch"
                    popper-class="sqzyPopper"
                    placeholder="请选择申请专业"
                    @select="sqzySelect"
                  >
                    <template slot-scope="{ item }">
                      <div class="name">{{ item.name }}</div>
                    </template>
                  </el-autocomplete>
                </div>
                <!-- 请输入国内毕业院校 -->
                <div class="dialog_select_item">
                  <el-input
                    v-model="gnbyyxname"
                    placeholder="请输入国内毕业院校"
                  ></el-input>
                </div>
                <!-- 请输入国内毕业专业 -->
                <div class="dialog_select_item">
                  <el-input
                    v-model="suoxuezhuanye"
                    placeholder="请输入国内毕业专业"
                  ></el-input>
                </div>
                <!-- 学生城市搜索 -->
                <div class="dialog_select_item">
                  <el-autocomplete
                    v-model="xscity"
                    class="inline-input"
                    :fetch-suggestions="citySearch"
                    popper-class="cityPopper"
                    placeholder="学生所在城市"
                    @select="citySelect"
                  >
                    <template slot-scope="{ item }">
                      <div class="name">{{ item.name }}</div>
                    </template>
                  </el-autocomplete>
                </div>
                <!-- 选择所在地区 -->
                <div class="dialog_select_item">
                  <el-select
                    v-model="szdq"
                    placeholder="请选择学生所在地区"
                    :popper-append-to-body="false"
                  >
                    <el-option
                      v-for="item in alOption.common.szdqList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <!-- 选择GPA绩点 -->
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
                <!-- 选择GPA成绩百分制 -->
                <div class="dialog_select_item">
                  <el-select
                    v-model="gpabfz"
                    placeholder="GPA百分制"
                    :popper-append-to-body="false"
                  >
                    <el-option
                      v-for="item in alOption.common.gpabList"
                      :key="item.value"
                      :label="'GPA百分制 ' + item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <!-- 选择TOEFL成绩 -->
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
                <!-- 选择GRE分数 -->
                <div class="dialog_select_item">
                  <el-select
                    v-model="gre"
                    placeholder="GRE分数"
                    :popper-append-to-body="false"
                  >
                    <el-option
                      v-for="item in alOption.common.greList"
                      :key="item.value"
                      :label="'GRE分数 ' + item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <!-- 选择N1成绩 -->
                <div class="dialog_select_item">
                  <el-select
                    v-model="n1"
                    placeholder="N1分数"
                    :popper-append-to-body="false"
                  >
                    <el-option
                      v-for="item in alOption.common.n1List"
                      :key="item.value"
                      :label="'N1分数 ' + item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <!-- 选择N2成绩 -->
                <div class="dialog_select_item">
                  <el-select
                    v-model="n2"
                    placeholder="N2分数"
                    :popper-append-to-body="false"
                  >
                    <el-option
                      v-for="item in alOption.common.n2List"
                      :key="item.value"
                      :label="'N2分数 ' + item.name"
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
        <img src="./image/ipImage.png" class="wow animate__bounceIn" alt="" />
      </div>
    </div>
    <div class="center">
      <div class="center_left">
        <div>Active Data</div>
        <!-- 页码 -->
        <el-select
          v-model="limit"
          placeholder="显示页数"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in alOption.jp.limitList"
            :key="item.value"
            :label="'Sort：' + item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="center_right">
        <!-- 录取结果 -->
        <!-- <div></div> -->
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
        <!-- 排行榜 -->
        <el-select
          v-model="paimin"
          placeholder="排行榜"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in alOption.jp.jpPaiming"
            :key="item.id"
            :label="item.name"
            :value="item.id"
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
import CaseMixin from './Case2Mixin.js'
import Table from './components/nation/table/table'
import cookies from '@/utils/cookie'
export default {
  mixins: [CaseMixin],
  components: { Table },
  data () {
    return {
      share: false, // 客户模式
      zhanbi: [
      ],
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
      gre: '', // GRE分数
      n1: '', // n2
      n2: '' // n2
    }
  },
  created () {
    if (cookies.get('share')) {
      this.share = true
    } else {
      this.share = false
    }
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
  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">
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
  $bgColor: #00b928, #febb69, #8675ff, #f07289, #67c8ff,#FC8F66;
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
      animation: identifier 1s linear;
      > div:nth-of-type(1) {
        width: 0.64rem;
        background: #00b928;
        box-sizing: border-box;
        border-right: 1px solid white;
      }
      > div:nth-of-type(2) {
        width: 0.63rem;
        background: #f07289;
        border-right: 2px solid white;
      }
      > div:nth-of-type(3) {
        width: 0.26rem;
        background: #8675ff;
        border-right: 2px solid white;
      }
      > div:nth-of-type(4) {
        width: 0.26rem;
        background: #67c8ff;
        border-right: 2px solid white;
      }
      > div:nth-of-type(5) {
        width: 1.14rem;
        background: #feba69;
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
      > .t6_item:nth-of-type(1) {
        span {
          color: #00b928;
        }
      }
      > .t6_item:nth-of-type(2) {
        span {
          color: #8675ff;
        }
      }
      > .t6_item:nth-of-type(3) {
        span {
          color: #f07289;
        }
      }
      > .t6_item:nth-of-type(4) {
        span {
          color: #67c8ff;
        }
      }
      > .t6_item:nth-of-type(5) {
        span {
          color: #feba69;
        }
      }
    }
  }
  .filtrate_right {
    width: 14.18rem;
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
    }
    > div:nth-of-type(1) {
      margin-right: 0.2rem;
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
        width: 2.5rem;
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
}
.paging > span {
  font-size: 15px;
  font-weight: 400;
  color: rgba(32, 32, 32, 1);
  line-height: 20px;
}
</style>
