<template>
  <div class="channelStatistic">
    <el-card class="box-card" style="margin-bottom:0">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-suffix="："
        label-width="100px"
      >
        <div style="padding-bottom:10px;">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item prop="searchTimeRange" label="显示类型">
                <el-select
                  filterable
                  v-model="ruleForm.searchTimeRange"
                  size="small"
                >
                  <el-option
                    v-for="item in dateTime"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                prop="statisticTime"
                label="统计时间"
                v-if="ruleForm.searchTimeRange == '1'"
              >
                <el-date-picker
                  v-model="ruleForm.timeValue"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="small"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                prop="statisticTime"
                label="统计时间"
                v-else-if="ruleForm.searchTimeRange == '2'"
              >
                <el-date-picker
                  v-model="ruleForm.timeValue"
                  type="monthrange"
                  range-separator="至"
                  start-placeholder="开始月份"
                  size="small"
                  end-placeholder="结束月份"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="access" label="渠道">
                <el-select filterable v-model="ruleForm.channel" size="small">
                  <el-option
                    v-for="item in channelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    size="small"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="price" label="单价(元)">
                <el-input
                  type="text"
                  v-model.trim="ruleForm.price"
                  placeholder="请输入单价"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:20px">
            <el-col :span="3" style="margin-left:20px;">
              <el-button type="primary" size="small">查询</el-button>
              <el-button type="primary" plain size="small">导出</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-card>
    <div>
      <el-card class="box-card" style="margin-top:20px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="数据表" name="first">
            <el-table
              ref="filterTable"
              :data="
                tableData.slice((currpage - 1) * pagesize, currpage * pagesize)
              "
            >
              <el-table-column prop="time" label="时间"></el-table-column>
              <el-table-column prop="channel" label="渠道"></el-table-column>
              <el-table-column
                prop="submitNoteNum"
                label="提交短信条数"
              ></el-table-column>
              <el-table-column
                prop="NoteSuccess"
                label="短信发送成功条数"
              ></el-table-column>
              <el-table-column
                prop="NoteUnknow"
                label="短信发送未知条数"
              ></el-table-column>
              <el-table-column
                prop="NoteFail"
                label="短信发送失败条数"
              ></el-table-column>
              <el-table-column
                prop="totalPrice"
                label="总价(万元)"
              ></el-table-column>
            </el-table>
            <el-pagination
              background
              layout="prev, pager, next, sizes, total, jumper"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pagesize"
              :total="this.tableData.length"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            >
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="发总量数据图" name="second">
            <div class="echarts">
              <div
                ref="totalData"
                :style="{ width: '100%', height: '400px' }"
              ></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="成功率数据图" name="third">
            <div class="echarts">
              <div
                ref="successData"
                :style="{ width: '100%', height: '400px' }"
              ></div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getNowTime } from '@/utils/validate'

export default {
  name: 'channelStatistic',
  data() {
    return {
      activeName: 'first',
      ruleForm: {
        searchTimeRange: 1,
        timeValue: [],
        dateValue: '',
        channel: '',
        price: ''
      },
      totalData: {
        legend: '北京国都',
        xAxisData: [
          '2021-06-08',
          '2021-06-09',
          '2021-06-10',
          '2021-06-11',
          '2021-06-12',
          '2021-06-13',
          '2021-06-14',
          '2021-06-15',
          '2021-06-16',
          '2021-06-17'
        ],
        barData: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        title: '发送量对比图',
        company: '短信条数'
      },
      successData: {
        legend: '北京国都',
        xAxisData: [
          '2021-06-08',
          '2021-06-09',
          '2021-06-10',
          '2021-06-11',
          '2021-06-12',
          '2021-06-13',
          '2021-06-14',
          '2021-06-15',
          '2021-06-16',
          '2021-06-17'
        ],
        barData: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        title: '成功率',
        company: '百分比'
      },
      dateTime: [
        {
          value: 1,
          label: '日'
        },
        {
          value: 2,
          label: '月'
        }
      ],

      channelList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '国都演示'
        },
        {
          value: '2',
          label: '核心系统'
        },
        {
          value: '3',
          label: '甘肃农信社'
        }
      ],
      pagesize: 10,
      currpage: 1,
      tableData: [
        {
          time: '2021-09-09',
          channel: '实时通道',
          submitNoteNum: 58,
          NoteSuccess: 16,
          NoteUnknow: 30,
          NoteFail: 12,
          totalPrice: '15000'
        },
        {
          time: '2021-09-09',
          channel: '实时通道',
          submitNoteNum: 58,
          NoteSuccess: 16,
          NoteUnknow: 30,
          NoteFail: 12,
          totalPrice: '15000'
        },
        {
          time: '2021-09-09',
          channel: '实时通道',
          submitNoteNum: 58,
          NoteSuccess: 16,
          NoteUnknow: 30,
          NoteFail: 12,
          totalPrice: '15000'
        },
        {
          time: '2021-09-09',
          channel: '实时通道',
          submitNoteNum: 58,
          NoteSuccess: 16,
          NoteUnknow: 30,
          NoteFail: 12,
          totalPrice: '15000'
        },
        {
          time: '2021-09-09',
          channel: '实时通道',
          submitNoteNum: 58,
          NoteSuccess: 16,
          NoteUnknow: 30,
          NoteFail: 12,
          totalPrice: '15000'
        },
        {
          time: '2021-09-09',
          channel: '实时通道',
          submitNoteNum: 58,
          NoteSuccess: 16,
          NoteUnknow: 30,
          NoteFail: 12,
          totalPrice: '15000'
        }
      ]
    }
  },
  methods: {
    // 切换页 方法
    handleCurrentChange(cpage) {
      this.currpage = cpage
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    },
    // 进入某个选项
    handleEnter(index, row) {
      console.log(row.id)
    },
    handleClick(tab, event) {
      if (tab.index == '1') {
        this.$nextTick(() => {
          this.example.column(
            this.echarts.init(this.$refs.totalData),
            this.totalData.xAxisData,
            this.totalData.barData,
            this.totalData.title,
            this.totalData.legend,
            this.totalData.company,
            80,
            0,
            10
          )
        })
      } else if (tab.index == '2') {
        this.$nextTick(() => {
          this.example.singleLine(
            this.echarts.init(this.$refs.successData),
            this.successData.xAxisData,
            this.successData.barData,
            this.successData.title,
            this.successData.company,
            this.totalData.legend
          )
        })
      }
    }
  },
  created() {
    this.ruleForm.timeValue[0] = getNowTime(0)
    this.ruleForm.timeValue[1] = getNowTime(0)
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
@import '../../assets/less/index.less';
</style>
<style lang="less">
.el-card__body {
  padding: 10px !important;
}
</style>
<style lang="scss" scoped>
.channelStatistic /deep/ .el-tabs__nav-scroll {
  padding-left: 20px;
}
</style>
