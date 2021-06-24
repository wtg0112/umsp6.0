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
              <el-form-item prop="phone" label="手机号">
                <el-input
                  v-model="ruleForm.phone"
                  placeholder="请输入手机号"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="content" label="内容">
                <el-input
                  v-model="ruleForm.content"
                  placeholder="请输入内容"
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
            <el-col :span="3" style="margin-left:32px;">
              <el-button type="primary" size="small">查询</el-button>
              <el-button type="primary" plain size="small">导出</el-button>
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
          <el-table-column prop="phone" label="号码"></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column prop="exNumber" label="扩展码"></el-table-column>
          <el-table-column
            prop="channelName"
            label="渠道名称"
          ></el-table-column>
          <el-table-column prop="routerName" label="路由名称"></el-table-column>
          <el-table-column prop="getTime" label="获取时间" column-key="date">
          </el-table-column>
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
  name: 'upSearch',
  data() {
    return {
      ruleForm: {
        phone: '',
        content: '',
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
          phone: '18201243943',
          content: '测试内容',
          exNumber: '0',
          channelName: '渠道一',
          routerName: '路由一',
          getTime: '2021-06-18'
        },
        {
          phone: '18201243943',
          content: '测试内容',
          exNumber: '0',
          channelName: '渠道一',
          routerName: '路由二',
          getTime: '2021-06-18'
        },
        {
          phone: '18201243943',
          content: '测试内容',
          exNumber: '0',
          channelName: '渠道一',
          routerName: '路由三',
          getTime: '2021-06-18'
        },
        {
          phone: '18201243943',
          content: '测试内容',
          exNumber: '0',
          channelName: '渠道一',
          routerName: '路由四',
          getTime: '2021-06-18'
        },
        {
          phone: '18201243943',
          content: '测试内容',
          exNumber: '0',
          channelName: '渠道一',
          routerName: '路由五',
          getTime: '2021-06-18'
        },
        {
          phone: '18201243943',
          content: '测试内容',
          exNumber: '0',
          channelName: '渠道一',
          routerName: '路由五',
          getTime: '2021-06-18'
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
