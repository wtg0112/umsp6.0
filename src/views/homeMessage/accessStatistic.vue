<template>
  <div>
    <el-card class="box-card" style="margin-bottom:0">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-suffix="："
        label-width="100px"
      >
        <div style="border-bottom:2px solid rgb(238,238,238);padding-bottom:10px;">
          <el-row :gutter="20">
          <el-col :span="5">
           <el-form-item prop="searchTimeRange" label="查询维度">
                  <el-select v-model="ruleForm.searchTimeRange">
                    <el-option
                      v-for="item in dateTime"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      size="small"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-form-item prop="statisticTime" label="统计时间" v-if="ruleForm.searchTimeRange=='1'">
                   <el-date-picker
                            v-model="ruleForm.timeValue"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                  </el-date-picker>
              </el-form-item>
           <el-form-item prop="statisticTime" label="统计时间" v-else-if="ruleForm.searchTimeRange=='2'">
              <el-date-picker
                    v-model="ruleForm.timeValue"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份">
                    </el-date-picker>
            </el-form-item>
          </el-col>
           <el-col :span="6">
            <el-form-item prop="access" label="通道">
               <el-select v-model="ruleForm.access">
                    <el-option
                      v-for="item in accessList"
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
                   <el-input type="text"  v-model.trim="ruleForm.price" placeholder="请输入单价"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:20px">
          <el-col :span="3" style="margin-left:20px;">
              <el-button type="primary" size="small">查询</el-button>
              <el-button  type="primary" plain size="small">导出</el-button>
          </el-col>
          </el-row>
        </div>
      </el-form>
    </el-card>
    <div>
      <el-card class="box-card">
       
         <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="数据表" name="first">
                 <el-table
                    ref="filterTable"
                    :data="
                    tableData.slice((currpage - 1) * pagesize, currpage * pagesize)
                    "
                    >
                    <el-table-column prop="date" label="日期"  align='center'></el-table-column>
                    <el-table-column prop="channel" label="通道" align='center'></el-table-column>
                    <el-table-column prop="submitNoteNum" label="提交短信条数" align='center'></el-table-column>
                    <el-table-column prop="NoteSuccess" label="短信发送成功条数" align='center'></el-table-column>
                    <el-table-column prop="NoteUnknow" label="短信发送未知条数" align='center'></el-table-column>
                     <el-table-column prop="NoteFail" label="短信发送失败条数" align='center'></el-table-column>
                    <el-table-column prop="totalPrice" label="总价(万元)" align='center'></el-table-column>
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
                  <div class="echarts" >
                      <div  ref="totalData" :style="{width:'100%',height:'400px'}"></div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="成功率数据图" name="third"> 
                <div class="echarts">
                   <div  ref="successData" :style="{width:'100%',height:'400px'}"></div>
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
  data() {
    return {
     activeName: 'first',
      ruleForm: {
        searchTimeRange: 1,
        timeValue: '',
        dateValue: '',
        access:'',
        price:''

      },
        totalData:{
          xAxisData: ['2021-06-08','2021-06-09','2021-06-10','2021-06-11'],
          barData: [1200, 800, 3000, 10000, 150000, 16000, 18000, 2000000],
          title:'发总量数据图',
          company:'短信条数'
      },
        successData:{
          xAxisData:['2021-06-08','2021-06-09','2021-06-10','2021-06-11'],
          barData:['0.1','0.5','0.6','0.3','0.2','0.8','0.9'],
          title:'成功率数据图',
          company:'百分比'
      },
      dateTime:[
          {
              value:1,
              label:'日'
          },
           {
              value:2,
              label:'月'
          }
      ],
      
      accessList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '实时通道'
        },
        {
          value: '2',
          label: '营销通道'
        },
        {
          value: '3',
          label: '邮件通道'
        },
         {
          value: '4',
          label: '微信通道'
        },
         {
          value: '5',
          label: '推送通道'
        },
         {
          value: '6',
          label: '实时备用通道'
        }
      ],
      pagesize: 10,
      currpage: 1,
      tableData: [
        {
          date: '2021-09-09',
          channel: '实时通道',
          submitNoteNum:58,
          NoteSuccess: 16,
          NoteUnknow:30,
          NoteFail:12,
          totalPrice:'15000'
        },
        {
          date: '2021-09-09',
          channel: '实时通道',
          submitNoteNum:58,
          NoteSuccess: 16,
          NoteUnknow:30,
          NoteFail:12,
          totalPrice:'15000'
        },
        {
          date: '2021-09-09',
          channel: '实时通道',
          submitNoteNum:58,
          NoteSuccess: 16,
          NoteUnknow:30,
          NoteFail:12,
          totalPrice:'15000'
        },
        {
          date: '2021-09-09',
          channel: '实时通道',
          submitNoteNum:58,
          NoteSuccess: 16,
          NoteUnknow:30,
          NoteFail:12,
          totalPrice:'15000'
        },
       {
          date: '2021-09-09',
          channel: '实时通道',
          submitNoteNum:58,
          NoteSuccess: 16,
          NoteUnknow:30,
          NoteFail:12,
          totalPrice:'15000'
        },
         {
          date: '2021-09-09',
          channel: '实时通道',
          submitNoteNum:58,
          NoteSuccess: 16,
          NoteUnknow:30,
          NoteFail:12,
          totalPrice:'15000'
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
    },
    handleClick(tab, event) {
        if(tab.index=='1'){
            this.$nextTick(() => {
                this.example.column(this.echarts.init(this.$refs.totalData),this.totalData.xAxisData,this.totalData.barData,this.totalData.title,this.totalData.company);
            })
        }else if(tab.index=='2'){
              this.$nextTick(() => {
                  this.example.singleLine(this.echarts.init(this.$refs.successData),this.successData.xAxisData,this.successData.barData,this.successData.title,this.successData.company); 
              })
        }
    }
  },
  created() {
    this.ruleForm.startTime = getNowTime(0) + ' 00:00:00'
    this.ruleForm.endTime = getNowTime(0) + ' 23:59:59'
  },
  mounted(){
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
