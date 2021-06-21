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
                    <el-select v-model="ruleForm.channelName" size="small">
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
           <el-col :span="6">
            <el-form-item prop="startTime" label="开始日期">
              <el-date-picker
                v-model="ruleForm.startTime"
                type="datetime"
                placeholder="选择开始日期"
                align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
                size="small"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="endTime" label="结束日期">
              <el-date-picker
                v-model="ruleForm.endTime"
                type="datetime"
                placeholder="选择结束日期"
                align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
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
          <el-table-column prop="errorTips" label="异常说明"  align='center'></el-table-column>
          <el-table-column prop="phone" label="号码" align='center'></el-table-column>
          <el-table-column prop="content" label="内容" align='center'></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align='center'></el-table-column>
          <el-table-column prop="user" label="用户" align='center'></el-table-column>
          <el-table-column prop="channel" label="渠道" align='center'></el-table-column>
          <el-table-column prop="infoClassify" label="信息分类" align='center'></el-table-column>
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
  data() {
    return {
      ruleForm: {
        channelName: '',
        phone: '',
        startTime: '',
        endTime: ''
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
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
          user:'张三',
          channel:'渠道1',
          infoClassify:'异常信息'
        },
        {
          errorTips: '网络故障',
          phone: '18201243943',
          content: '测试内容',
          createTime: '2021-06-18',
          user:'张三',
          channel:'渠道1',
          infoClassify:'异常信息'
        },
        {
          errorTips: '网络故障',
          phone: '18201243943',
          content: '测试内容',
          createTime: '2021-06-18',
          user:'张三',
          channel:'渠道1',
          infoClassify:'异常信息'
        },
        {
          errorTips: '网络故障',
          phone: '18201243943',
          content: '测试内容',
          createTime: '2021-06-18',
          user:'张三',
          channel:'渠道1',
          infoClassify:'异常信息'
        },
        {
          errorTips: '网络故障',
          phone: '18201243943',
          content: '测试内容',
          createTime: '2021-06-18',
          user:'张三',
          channel:'渠道1',
          infoClassify:'异常信息'
        },
         {
          errorTips: '网络故障',
          phone: '18201243943',
          content: '测试内容',
          createTime: '2021-06-18',
          user:'张三',
          channel:'渠道1',
          infoClassify:'异常信息'
        },
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
    this.ruleForm.startTime = getNowTime(0) + ' 00:00:00'
    this.ruleForm.endTime = getNowTime(0) + ' 23:59:59'
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/index.less';
</style>
<style lang="less">
.el-card__body{
  padding:10px !important;

}</style>
