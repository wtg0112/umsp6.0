<template>
  <div>
    <el-card class="box-card" style="margin-bottom:0">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-suffix="："
        label-width="100px"
      >
        <div style="padding-bottom:10px;">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item prop="channelName" label="渠道名称">
                <el-select
                  filterable
                  v-model="ruleForm.channelName"
                  size="small"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="phone" label="手机号">
                <el-input
                  v-model="ruleForm.phone"
                  placeholder="请输入手机号"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="time" label="查询时间">
                <el-date-picker
                  v-model="ruleForm.time"
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
          </el-row>
          <el-row :gutter="20" style="margin-top:20px">
            <el-col :span="3" style="margin-left:20px;">
              <el-button type="primary" size="small">查询</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-card>
    <div>
      <el-card class="box-card" style="margin-top:20px;">
        <el-table
          ref="filterTable"
          :data="
            tableData.slice((currpage - 1) * pagesize, currpage * pagesize)
          "
        >
          <el-table-column
            prop="errorTips"
            label="异常说明"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="号码"
          ></el-table-column>
          <el-table-column
            prop="content"
            label="内容"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
          ></el-table-column>
          <el-table-column
            prop="user"
            label="用户"
          ></el-table-column>
          <el-table-column
            prop="channel"
            label="渠道"
          ></el-table-column>
          <el-table-column
            prop="infoClassify"
            label="信息分类"
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
      </el-card>
    </div>
  </div>
</template>
<script>
import { getNowTime } from '@/utils/validate'

export default {
  name: 'errorSearch',
  data() {
    return {
      ruleForm: {
        channelName: '',
        phone: '',
        time: []
      },
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '国都演示'
        },
        {
          value: '1',
          label: '核心系统'
        },
        {
          value: '2',
          label: '甘肃农信社'
        }
      ],
      pagesize: 10,
      currpage: 1,
      tableData: [
        {
          errorTips: '网络故障',
          phone: '18201243943',
          content: '测试内容',
          createTime: '2021-06-18',
          user: '张三',
          channel: '渠道1',
          infoClassify: '异常信息'
        },
        {
          errorTips: '网络故障',
          phone: '18201243943',
          content: '测试内容',
          createTime: '2021-06-18',
          user: '张三',
          channel: '渠道1',
          infoClassify: '异常信息'
        },
        {
          errorTips: '网络故障',
          phone: '18201243943',
          content: '测试内容',
          createTime: '2021-06-18',
          user: '张三',
          channel: '渠道1',
          infoClassify: '异常信息'
        },
        {
          errorTips: '网络故障',
          phone: '18201243943',
          content: '测试内容',
          createTime: '2021-06-18',
          user: '张三',
          channel: '渠道1',
          infoClassify: '异常信息'
        },
        {
          errorTips: '网络故障',
          phone: '18201243943',
          content: '测试内容',
          createTime: '2021-06-18',
          user: '张三',
          channel: '渠道1',
          infoClassify: '异常信息'
        },
        {
          errorTips: '网络故障',
          phone: '18201243943',
          content: '测试内容',
          createTime: '2021-06-18',
          user: '张三',
          channel: '渠道1',
          infoClassify: '异常信息'
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
    }
  },
  created() {
    this.ruleForm.time[0] = getNowTime(0)
    this.ruleForm.time[1] = getNowTime(0)
  }
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
