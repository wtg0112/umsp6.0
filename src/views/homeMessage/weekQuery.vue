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
          <el-col :span="6">
            <el-form-item prop="phone" label="手机号">
              <el-input
                v-model="formData.phone"
                placeholder="请输入手机号"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="qudao" label="渠道名称">
              <el-select v-model="formData.qudao" size="small" filterable>
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
            <el-form-item prop="user" label="用户">
              <el-select v-model="formData.user" size="small" filterable>
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
                  v-for="item in options"
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
                size="small"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" size="small" style="margin-left:24px;">查询</el-button>
        <el-button type="primary" plain size="small">导出表格</el-button>
        <span> (开始时间和结束时间在最近7天，请加入手机号精准查询)</span>
      </el-form>
    </el-card>
    <div class="table-container">
      <el-card class="box-card">
        <!-- <el-popover placement="bottom" width="300" trigger="click">
          <el-col :span="12"><el-checkbox v-model="checked" @change="showHide()">备选项</el-checkbox></el-col>
        </el-popover> -->
        <el-table
          ref="filterTable"
          :data="
            tableData.slice((currpage - 1) * pagesize, currpage * pagesize)
          "
        >
          <el-table-column prop="account" label="用户"></el-table-column>
          <el-table-column prop="channel" label="渠道名称"></el-table-column>
          <el-table-column prop="classify" label="信息分类"></el-table-column>
          <el-table-column prop="number" label="号码"></el-table-column>
          <el-table-column
            prop="startTime"
            label="短信发送时间"
            sortable
            column-key="date"
          >
          </el-table-column>
          <el-table-column
            prop="sCodeTime"
            label="状态报告时间"
            sortable
            column-key="date"
          >
          </el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
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
  name:'weekQuery',
  data() {
    return {
      formData: {
        qudao: '',
        user: '',
        sCode: '',
        eCode: '',
        time: []
      },
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
          id: '001',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          account: 'wtg',
          channel: '电信',
          classify: '短信',
          number: '13320045267',
          content: '本消息为测试消息'
        },
        {
          id: '001',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-17',
          account: 'wtg',
          channel: '电信',
          classify: '短信',
          number: '13320045267',
          content: '本消息为测试消息'
        },
        {
          id: '001',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          account: 'wtg',
          channel: '电信',
          classify: '短信',
          number: '13320045267',
          content: '本消息为测试消息'
        },
        {
          id: '001',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-18',
          account: 'wtg',
          channel: '电信',
          classify: '短信',
          number: '13320045267',
          content: '本消息为测试消息'
        },
        {
          id: '001',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          account: 'wtg',
          channel: '电信',
          classify: '短信',
          number: '13320045267',
          content: '本消息为测试消息'
        },
        {
          id: '001',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          account: 'wtg',
          channel: '电信',
          classify: '短信',
          number: '13320045267',
          content: '本消息为测试消息'
        },
        {
          id: '001',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          account: 'wtg',
          channel: '电信',
          classify: '短信',
          number: '13320045267',
          content: '本消息为测试消息'
        },
        {
          id: '001',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          account: 'wtg',
          channel: '电信',
          classify: '短信',
          number: '13320045267',
          content: '本消息为测试消息'
        },
        {
          id: '001',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          account: 'wtg',
          channel: '电信',
          classify: '短信',
          number: '13320045267',
          content: '本消息为测试消息'
        },
        {
          id: '001',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          account: 'wtg',
          channel: '电信',
          classify: '短信',
          number: '13320045267',
          content: '本消息为测试消息'
        },
        {
          id: '001',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          account: 'wtg',
          channel: '电信',
          classify: '短信',
          number: '13320045267',
          content: '本消息为测试消息'
        },
        {
          id: '001',
          sCodeTime: '2016-05-02',
          startTime: '2021-06-16',
          account: 'wtg',
          channel: '电信',
          classify: '短信',
          number: '13320045267',
          content: '本消息为测试消息'
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
    }
  },
  created() {
    this.formData.time[0] = getNowTime(0)
    this.formData.time[1] = getNowTime(0)
  }
}
</script>
<style lang="less" scoped></style>
