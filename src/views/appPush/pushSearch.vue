<template>
  <div>
    <el-card class="box-card">
      <el-form
        ref="formData"
        :model="formData"
        label-suffix="："
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item prop="sendType" label="发送类型">
              <el-select v-model="formData.sendType" size="small" filterable>
                <el-option
                  v-for="item in sendTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
             <el-form-item prop="ClientId" label="ClientId">
              <el-input
                v-model="formData.ClientId"
                placeholder="请输入客户ID"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="user" label="渠道名称">
              <el-select v-model="formData.user" size="small" filterable>
                <el-option
                  v-for="item in channelNameList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="5">
            <el-form-item prop="user" label="用户">
              <el-select v-model="formData.user" size="small" filterable>
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="pici" label="批次号">
              <el-input
                v-model="formData.pici"
                placeholder="请输入批次号"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item prop="sCode" label="状态报告">
              <el-select v-model="formData.sCode" size="small" filterable>
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
            <el-form-item prop="eCode" label="提交状态">
              <el-select v-model="formData.eCode" size="small" filterable>
                <el-option
                  v-for="item in submitList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="time" label="查询时间">
              <el-date-picker
                v-model="formData.time"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                size="small"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" size="small" style="margin-left:24px;">查询</el-button>
        <el-button type="primary" plain size="small">导出表格</el-button>
        <span>
          (开始日期与结束日期，在同一个月，且包含今天和前六天请到近7天查询)</span
        >
      </el-form>
    </el-card>
    <div class="table-container">
      <el-card class="box-card">
        <el-table
          ref="filterTable"
          :data="
            tableData.slice((currpage - 1) * pagesize, currpage * pagesize)
          "
        >
          <el-table-column prop="account" label="用户"></el-table-column>
          <el-table-column prop="channel" label="渠道名称"></el-table-column>
          <el-table-column prop="classify" label="信息分类"></el-table-column>
          <el-table-column prop="sendType" label="发送类型"></el-table-column>
          <el-table-column prop="systemType" label="系统类型"></el-table-column>
          <el-table-column prop="ClientId" label="ClientId"></el-table-column>
          <el-table-column prop="startTime" label="发送时间" sortable column-key="date"></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column prop="task" label="任务"></el-table-column>
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
  name:'pushSearch',
  data() {
    return {
      sendTypeList:[
         {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '注册ID'
        },
        {
          value: '1',
          label: '别名'
        },
        {
          value: '2',
          label: '用户名'
        },
         {
          value: '3',
          label: '标签'
        }
      ],
      channelNameList:[
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
      userList:[],
      formData: {
        qudao: '',
        user: '',
        sCode: '',
        eCode: '',
        time:[]
      },
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '成功'
        },
        {
          value: '1',
          label: '未知'
        },
        {
          value: '2',
          label: '失败'
        }
      ],
      submitList:[
         {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '成功'
        },
        {
          value: '1',
          label: '失败'
        }

      ],
      pagesize: 10,
      currpage: 1,
      tableData: [
        {
          id: '001',
          account:'张三',
          channel:'电信',
          classify:'微信公众号',
          sendType:'2',
          systemType:'2',
          ClientId:'18201243943',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          content: '本消息为测试消息',
          task:'任务一'
        },
        {
          id: '001',
          account:'张三',
          channel:'电信',
          classify:'微信公众号',
          sendType:'2',
          systemType:'2',
          ClientId:'18201243943',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          content: '本消息为测试消息',
          task:'任务一'
        },
        {
          id: '001',
          account:'张三',
          channel:'电信',
          classify:'微信公众号',
          sendType:'2',
          systemType:'2',
          ClientId:'18201243943',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          content: '本消息为测试消息',
          task:'任务一'
        },
        {
          id: '001',
          account:'张三',
          channel:'电信',
          classify:'微信公众号',
          sendType:'2',
          systemType:'2',
          ClientId:'18201243943',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          content: '本消息为测试消息',
          task:'任务一'
        },
        {
         id: '001',
          account:'张三',
          channel:'电信',
          classify:'微信公众号',
          sendType:'2',
          systemType:'2',
          ClientId:'18201243943',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          content: '本消息为测试消息',
          task:'任务一'
        },
        {
          id: '001',
          account:'张三',
          channel:'电信',
          classify:'微信公众号',
          sendType:'2',
          systemType:'2',
          ClientId:'18201243943',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          content: '本消息为测试消息',
          task:'任务一'
        },
        {
         id: '001',
          account:'张三',
          channel:'电信',
          classify:'微信公众号',
          sendType:'2',
          systemType:'2',
          ClientId:'18201243943',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          content: '本消息为测试消息',
          task:'任务一'
        },
        {
          id: '001',
          account:'张三',
          channel:'电信',
          classify:'微信公众号',
          sendType:'2',
          systemType:'2',
          ClientId:'18201243943',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          content: '本消息为测试消息',
          task:'任务一'
        },
        {
          id: '001',
          account:'张三',
          channel:'电信',
          classify:'微信公众号',
          sendType:'2',
          systemType:'2',
          ClientId:'18201243943',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          content: '本消息为测试消息',
          task:'任务一'
        },
        {
         id: '001',
          account:'张三',
          channel:'电信',
          classify:'微信公众号',
          sendType:'2',
          systemType:'2',
          ClientId:'18201243943',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          content: '本消息为测试消息',
          task:'任务一'
        },
        {
          id: '001',
          account:'张三',
          channel:'电信',
          classify:'微信公众号',
          sendType:'2',
          systemType:'2',
          ClientId:'18201243943',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          content: '本消息为测试消息',
          task:'任务一'
        },
        {
          id: '001',
          account:'张三',
          channel:'电信',
          classify:'微信公众号',
          sendType:'2',
          systemType:'2',
          ClientId:'18201243943',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          content: '本消息为测试消息',
          task:'任务一'
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
    this.formData.time[0] = getNowTime(0)
    this.formData.time[1] = getNowTime(0)
  }
}
</script>
<style lang="less" scoped></style>
