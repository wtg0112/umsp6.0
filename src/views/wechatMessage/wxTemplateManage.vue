<template>
  <div class="templateManage">
    <el-card class="box-card">
      <el-form
        ref="formData"
        :model="formData"
        label-suffix="："
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item prop="templateName" label="模板名称">
              <el-input
                v-model="formData.templateName"
                placeholder="请输入模板名称"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" style="margin-left: 30px;" size="small"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-table
        ref="filterTable"
        :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="templateId" label="模板ID"></el-table-column>
        <el-table-column prop="name" label="模板名称" width="120"></el-table-column>
        <el-table-column  label="模板内容" width="200">
          <template slot-scope="scope">
                  <span v-html="scope.row.content"></span>
          </template>
        </el-table-column>
        <el-table-column  label="模板示例"  width="240">
          <template slot-scope="scope">
            <span v-html="scope.row.exam"></span>
          </template>
        </el-table-column>
        <el-table-column prop="belong" label="所属公众号" width="150"></el-table-column>
        <el-table-column prop="status" label="模板状态" width="100">
          <template slot-scope="scope">
            {{ scope.row.status == '1' ? '正常' : '停用' }}
          </template>
        </el-table-column>
        <el-table-column prop="time" label="创建时间" width="170"></el-table-column>
        <el-table-column prop="operate" label="操作" width="200"  fixed="right">
          <template>
            <el-button type="primary" size="small">修改</el-button>
            <el-button type="info" size="small">停用</el-button>
          </template>
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
</template>
<script>
import wordPopover from '@/components/wordPopover'
export default {
  components: {
    wordPopover
  },
  data() {
    return {
      formData: {},
      dialogFormData: {
        type: '0'
      },
      pagesize: 10,
      currpage: 1,
      tableData: [
        {
          templateId: '56soAr_IWQlpaJM72GPA6ZSmcTcUOWfsgao6EBzM15w',
          name: '密码修改提醒',
          content: `{{first.DATA}}</br></br>{{accountType.DATA}}:</br>充值金额:{{amount.DATA}}</br>充值状态:{{result.DAATA}</br>{REMARK.DATA}}}
          `,
          exam: `您好，您已成功进行话费充值。</br></br>手机号：13912345678</br>充值金额：50元</br>充值状态：充值成功</br>备注：如有疑问，请致电10086联系我们。`,
          belong: '云短消息服务平台',
          status: '1',
          time: '2021-05-17 16:52:01'
        },
        {
         templateId: '56soAr_IWQlpaJM72GPA6ZSmcTcUOWfsgao6EBzM15w',
          name: '密码修改提醒',
          content: `{{first.DATA}}</br></br>{{accountType.DATA}}:</br>充值金额:{{amount.DATA}}</br>充值状态:{{result.DAATA}</br>{REMARK.DATA}}}
          `,
          exam: `您好，您已成功进行话费充值。</br></br>手机号：13912345678</br>充值金额：50元</br>充值状态：充值成功</br>备注：如有疑问，请致电10086联系我们。`,
          belong: '云短消息服务平台',
          status: '1',
          time: '2021-05-17 16:52:01'
        }
      ],
      isAdd: false,
      showDialog: false,
      loading: false
    }
  },
  methods: {
    // 表格项选中事件
    handleSelectionChange(val) {
      console.log(val)
    },
    // 切换页 方法
    handleCurrentChange(cpage) {
      this.currpage = cpage
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    }
  }
}
</script>
