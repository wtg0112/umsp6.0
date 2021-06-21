<template>
    <div>
      <el-card class="box-card"  style="margin-top:20px">
        <el-table
          ref="filterTable"
          :data="
          tableData.slice((currpage - 1) * pagesize, currpage * pagesize)
          "
        >
          <el-table-column prop="runTime" label="重跑时间"  align='center'></el-table-column>
          <el-table-column prop="runStatus" label="重跑状态" align='center'></el-table-column>
          <el-table-column prop="doTime" label="执行时间" align='center'></el-table-column>
          <el-table-column prop="desc" label="备注" align='center'></el-table-column>
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
       <el-row>
           <el-col :span="2">
               <el-button type="primary" @click="addRunList">新增</el-button>
           </el-col>
       </el-row>
         <el-dialog
            title="新增重跑"
            :visible.sync="addRunDialog"
             width="32%"
            >
             <el-row>
                 <div style="margin:20px auto;line-height:32px;">
                     <el-row>
                        <el-col :span="7" style="text-align:right;"><span>重跑时间段：</span></el-col>
                        <el-col :span="12"><el-date-picker
                                    size="small"
                                    v-model="runTimeRange"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:20px">
                         <el-col :span="7" style="text-align:right;"><span>备注：</span></el-col>
                         <el-col :span="12"><el-input
                            v-model="desc"
                            placeholder="请输入备注内容"
                            size="small"
                         ></el-input>
                         </el-col>
                    </el-row>
                 </div>
             </el-row>
           
            <span slot="footer" class="dialog-footer" style="text-align:center">
                 <el-button type="primary" @click="addRunDialog = false" size="small">保存</el-button>
                <el-button @click="addRunDialog = false" size="small">关闭</el-button>
            </span>
    </el-dialog>
    </div>
</template>
<script>
import { getNowTime } from '@/utils/validate'

export default {
  data() {
    return {
      addRunDialog:false,
      runTimeRange:'',
      desc:'',
      pagesize: 10,
      currpage: 1,
      tableData: [
        {
          runTime: '2021-06-01 - 2021-06-10',
          runStatus: '待重跑',
          doTime: '2021-06-10 14：09：08',
          createTime: '2021-06-18',
          desc:'第一条数据'
        },
        {
          runTime: '2021-06-01 - 2021-06-10',
          runStatus: '重跑完成',
          doTime: '2021-06-10 14：09：08',
          createTime: '2021-06-18',
          desc:'第二条数据'
        },
        {
          runTime: '2021-06-01 - 2021-06-10',
          runStatus: '待重跑',
          doTime: '2021-06-10 14：09：08',
          createTime: '2021-06-18',
          desc:'第三条数据'
        },
        {
          runTime: '2021-06-01 - 2021-06-10',
          runStatus: '重跑完成',
          doTime: '2021-06-10 14：09：08',
          createTime: '2021-06-18',
          desc:'第四条数据'
        },
        {
          runTime: '2021-06-01 - 2021-06-10',
          runStatus: '待重跑',
          doTime: '2021-06-10 14：09：08',
          createTime: '2021-06-18',
          desc:'第五条数据'
        },
        {
          runTime: '2021-06-01 - 2021-06-10',
          runStatus: '重跑完成',
          doTime: '2021-06-10 14：09：08',
          createTime: '2021-06-18',
          desc:'第六条数据'
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
    addRunList(){
        this.addRunDialog=true

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

}
.el-dialog__footer{
  text-align: center;
}
</style>
