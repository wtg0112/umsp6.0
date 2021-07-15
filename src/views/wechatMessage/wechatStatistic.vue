<template>
  <div class="organStatistic">
    <el-card class="box-card">
      <el-form
        ref="formData"
        :model="formData"
        label-suffix="："
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item prop="type" label="显示类型">
              <el-select
                v-model="formData.type"
                size="small"
                filterable
                placeholder="请选择显示类型"
              >
                <el-option
                  v-for="item in timeType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="time" label="统计时间">
              <el-date-picker
                v-model="formData.time"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="small"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item prop="cost" label="公众号">
              <el-input
                type="textArea"
                v-model="formData.cost"
                placeholder="请输入公众号"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" size="small" style="margin-left:24px;">查询</el-button>
        <el-button type="primary" plain size="small">导出表格</el-button>
        <span> （注：报表统计的统计时间截止到昨天24点)</span>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-tabs @tab-click="tabClick">
        <el-tab-pane label="数据表">
          <el-table
            ref="filterTable"
            :data="
              tableData.slice((currpage - 1) * pagesize, currpage * pagesize)
            "
          >
            <el-table-column
              prop="time"
              label="统计时间段"
              sortable
            ></el-table-column>
            <el-table-column prop="organ" label="	机构"></el-table-column>
            <el-table-column
              prop="wechatSubscript"
              label="微信公众号"
            ></el-table-column>
            <el-table-column
              prop="number"
              label="提交短信数"
              sortable
            ></el-table-column>
            <el-table-column
              prop="success"
              label="短信发送成功数"
              sortable
              width="200"
            ></el-table-column>
            <el-table-column
              prop="unknown"
              label="短信发送未知条数"
              sortable
              width="200"
            ></el-table-column>
            <el-table-column
              prop="failed"
              label="短信发送失败条数"
              sortable
              width="200"
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
        <el-tab-pane label="发送总量数据图">
          <el-card class="box-card">
            <div
              :style="{ width: '100%', height: '400px' }"
              ref="chart1"
            ></div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="成功率数据图">
          <el-card class="box-card">
            <div
              :style="{ width: '100%', height: '400px' }"
              ref="chart2"
            ></div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { getNowTime } from '@/utils/validate'
export default {
  name: 'wechatStatistic',
  data() {
    return {
      formData: {
        qudao: '',
        user: '',
        sCode: '',
        eCode: '',
        time: []
      },
      timeType: [
        {
          value: '1',
          label: '日'
        },
        {
          value: '2',
          label: '月'
        }
      ],
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        }
      ],
      pagesize: 10,
      currpage: 1,
      tableData: [
        {
          time: '2021-05-20 ~ 2021-06-18',
          organ: '国都',
          wechatSubscript: '国都统一公众号',
          number: '10',
          success: '8',
          unknown: '1',
          failed: '1',
          sum: '0.35'
        },
        {
          time: '2021-05-20 ~ 2021-06-18',
          organ: '国都',
          wechatSubscript: '国都统一公众号',
          number: '11',
          success: '8',
          unknown: '2',
          failed: '1',
          sum: '0.35'
        },
        {
          time: '2021-05-20 ~ 2021-06-18',
          organ: '国都',
          wechatSubscript: '国都统一公众号',
          number: '20',
          success: '18',
          unknown: '1',
          failed: '1',
          sum: '0.35'
        },
        {
          time: '2021-05-20 ~ 2021-06-18',
          organ: '国都',
          wechatSubscript: '国都统一公众号',
          number: '12',
          success: '8',
          unknown: '1',
          failed: '3',
          sum: '0.35'
        },
        {
          time: '2021-05-20 ~ 2021-06-18',
          organ: '国都',
          wechatSubscript: '国都统一公众号',
          number: '14',
          success: '12',
          unknown: '1',
          failed: '1',
          sum: '0.35'
        },
        {
          time: '2021-05-20 ~ 2021-06-18',
          organ: '国都',
          wechatSubscript: '国都统一公众号',
          number: '15',
          success: '8',
          unknown: '4',
          failed: '3',
          sum: '0.35'
        },
        {
          time: '2021-05-20 ~ 2021-06-18',
          organ: '国都',
          wechatSubscript: '国都统一公众号',
          number: '18',
          success: '8',
          unknown: '9',
          failed: '1',
          sum: '0.35'
        },
        {
          time: '2021-05-20 ~ 2021-06-18',
          organ: '国都',
          wechatSubscript: '国都统一公众号',
          number: '10',
          success: '8',
          unknown: '1',
          failed: '1',
          sum: '0.35'
        },
        {
          time: '2021-05-20 ~ 2021-06-18',
          organ: '国都',
          wechatSubscript: '国都统一公众号',
          number: '10',
          success: '8',
          unknown: '1',
          failed: '1',
          sum: '0.35'
        },
        {
          time: '2021-05-20 ~ 2021-06-18',
          organ: '国都',
          wechatSubscript: '国都统一公众号',
          number: '10',
          success: '8',
          unknown: '1',
          failed: '1',
          sum: '0.35'
        },
        {
          time: '2021-05-20 ~ 2021-06-18',
          organ: '国都',
          wechatSubscript: '国都统一公众号',
          number: '13',
          success: '8',
          unknown: '4',
          failed: '1',
          sum: '0.35'
        },
        {
          time: '2021-05-20 ~ 2021-06-18',
          organ: '国都',
          wechatSubscript: '国都统一公众号',
          number: '10',
          success: '8',
          unknown: '1',
          failed: '1',
          sum: '0.35'
        },
        {
          time: '2021-05-20 ~ 2021-06-18',
          organ: '国都',
          wechatSubscript: '国都统一公众号',
          number: '10',
          success: '8',
          unknown: '1',
          failed: '1',
          sum: '0.35'
        }
      ],
      dataChart1: {
        sendData: {
          legend: ['北京国都'],
          category: [
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
          series: [
            {
              name: '北京国都',
              type: 'bar',
              data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
            }
          ],
          title: '发送量对比图'
        }
      },
      dataChart2: {
        successData: {
          legend: ['北京国都'],
          category: [
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
          series: [
            {
              name: '北京国都',
              type: 'line',
              data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
            }
          ],
          title: '成功率'
        }
      },
      sendInit1: 0,
      sendInit2: 0
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
    // 数据图y轴坐标修改
    getBalance(value) {
      var balance
      if (value < 10) {
        return value * 100 + '条'
      } else if ((balance = value - 10) < 10) {
        balance = new String(balance).substring(0, 4)
        if (balance <= 1) {
          return '一百多条'
        }
        return balance + '(百)条'
      } else if ((balance = value - 20) < 10) {
        balance = new String(balance).substring(0, 4)
        if (balance <= 1) {
          return '一千多条'
        }
        return balance + '(千)条'
      } else if ((balance = value - 30) < 10) {
        balance = new String(balance).substring(0, 4)
        if (balance <= 1) {
          return '1万多条'
        }
        return balance + '(万)条'
      } else if ((balance = value - 40) < 10) {
        balance = new String(balance).substring(0, 4)
        if (balance <= 1) {
          return '十万多条'
        }
        return balance + '(十万)条'
      } else if ((balance = value - 50) < 10) {
        balance = new String(balance).substring(0, 4)
        if (balance <= 1) {
          return '一百万多条'
        }
        return balance + '(百万)条'
      } else if ((balance = value - 60) < 10) {
        balance = new String(balance).substring(0, 4)
        if (balance <= 1) {
          return '一千万多条'
        }
        return balance + '(千万)条'
      } else if ((balance = value - 70) < 10) {
        balance = new String(balance).substring(0, 4)
        if (balance <= 1) {
          return '一亿多条'
        }
        return balance + '(亿)条'
      }
    },
    // 渲染chart1
    chart1() {
      const $this = this
      var getChart1 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            var tar = params[0]
            var value = $this.getBalance(tar.value)
            return tar.name + '<br/>' + tar.seriesName + ' : ' + value
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: false },
            dataView: { show: false, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: false },
            saveAsImage: { show: false }
          }
        },
        legend: {
          data: [],
          left: 10
        },
        grid: {
          top: '12%',
          left: '1%',
          right: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '短信条数',
            max: 80,
            min: 0,
            splitNumber: 10,
            axisLabel: {
              formatter: function(value) {
                if (value == 10) {
                  return '百条以上'
                } else if (value == 20) {
                  return '千条以上'
                } else if (value == 30) {
                  return '万条以上'
                } else if (value == 40) {
                  return '十万条以上'
                } else if (value == 50) {
                  return '百万条以上'
                } else if (value == 60) {
                  return '千万条以上'
                } else if (value == 70) {
                  return '亿条以上'
                } else if (value == 80) {
                  return '十亿条以上'
                } else {
                  return ''
                }
              }
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            start: 0,
            end: 100
          },
          {
            type: 'inside',
            start: 0,
            end: 100
          },
          {
            show: true,
            filterMode: 'empty',
            width: 30,
            height: '80%',
            showDataShadow: false,
            left: '93%'
          }
        ],
        series: []
      }
      var sendPng
      var DataSend = this.dataChart1.sendData
      //初始化
      sendPng = this.$echarts.init(this.$refs.chart1)
      sendPng.resize();
      sendPng.setOption(getChart1, true)
      //设置值
      var options = sendPng.getOption()
      options.legend[0].data = DataSend.legend
      options.xAxis[0].data = DataSend.category
      options.series = DataSend.series
      sendPng.setOption(options)
    },
    // 渲染chart2
    chart2() {
      const $this = this
      var getChart2 = {
        tooltip: {
          trigger: 'item'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: false },
            dataView: { show: false, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: false },
            saveAsImage: { show: false }
          }
        },
        calculable: true,
        legend: {
          data: [],
          left: 10
        },
        grid: {
          top: '12%',
          left: '1%',
          right: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '百分比',
            axisLabel: {
              formatter: function(a) {
                a = +a
                return isFinite(a)
                  ? $this.$echarts.format.addCommas(+a) + ''
                  : ''
              }
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            start: 0,
            end: 100
          },
          {
            type: 'inside',
            start: 0,
            end: 100
          },
          {
            show: true,
            filterMode: 'empty',
            width: 30,
            height: '80%',
            showDataShadow: false,
            left: '93%'
          }
        ],
        series: []
      }
      var successPng
      var DataSend = this.dataChart2.successData
      //初始化
      successPng = this.$echarts.init(this.$refs.chart2)
      successPng.resize();
      successPng.setOption(getChart2, true)
      //设置值
      var options = successPng.getOption()
      options.legend[0].data = DataSend.legend
      options.xAxis[0].data = DataSend.category
      options.series = DataSend.series
      successPng.setOption(options)
    },
    tabClick(tab, event) {
      if (tab.index == 1) {
        this.$nextTick(() => {
          this.chart1()
        })
      } else if (tab.index == 2) {
        this.$nextTick(() => {
          this.chart2()
        })
      }
    }
  },
  created() {
    this.formData.time[0] = getNowTime(0)
    this.formData.time[1] = getNowTime(0)
  }
}
</script>
<style lang="scss" scoped>
.organStatistic /deep/ .el-tabs__nav-scroll {
  padding-left: 20px;
}
</style>
