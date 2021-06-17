<template>
  <div class="templateSend">
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
                placeholder="模板名称"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="templateContent" label="模板内容">
              <el-input
                v-model="formData.templateContent"
                placeholder="模板内容"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              style="margin-left: 30px;"
              size="small"
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
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="creator" label="创建者"></el-table-column>
        <el-table-column prop="sCode" label="状态" width="100">
          <template slot-scope="scope">
            {{ scope.row.sCode == '1' ? '已激活' : '未激活' }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100">
          <template slot-scope="scope">
            {{ scope.row.type == '0' ? '无参数' : `有参数(${scope.row.type})` }}
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="operate" label="操作" width="240">
          <template slot-scope="scope">
            <el-button type="primary" round size="small">使用</el-button>
            <el-button
              type="success"
              round
              @click="templateEdit(scope.row)"
              size="small"
              >修改</el-button
            >
            <el-button type="info" round size="small">停止</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button-group class="buttonGroup">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="templateAdd"
          size="small"
          >新增</el-button
        >
        <el-button type="primary" icon="el-icon-delete" size="small"
          >删除</el-button
        >
      </el-button-group>
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
    <el-dialog
      :title="isAdd ? '添加模板' : '编辑模板'"
      :visible.sync="showDialog"
    >
      <el-form
        ref="dialogFormData"
        :model="dialogFormData"
        label-suffix="："
        label-width="100px"
      >
        <el-form-item prop="name" label="模板名称">
          <el-input
            v-model="dialogFormData.name"
            placeholder="模板名称"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="type" label="模板类型">
          <el-radio-group v-model="dialogFormData.type">
            <el-radio label="0">普通</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="content" label="模板内容">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="模板内容"
            v-model="dialogFormData.content"
            size="small"
          >
          </el-input>
          <span style="color: red;">
            *带参数的模板参数以"{txt}"代替 <br>
            "{txt}"为特殊符号，除代表参数外避免出现。如：尊敬的{txt},您好！ <br>
            *内容字数在300以内,且在有参数的模板内容中，请勿含有'|','#'特殊符号
          </span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="showDialog = false" size="small"
          >保 存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
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
          name: '测试模板',
          content: '您好，这是一条测试短信，打扰之处请见谅。',
          creator: 'admin',
          sCode: '1',
          type: '0',
          time: '2021-02-05 10:31:05'
        },
        {
          name: '生日祝福',
          content: '您好{txt}先生，今天是{txt}月{txt}日，是您的生日，祝您生日快乐！',
          creator: 'admin',
          sCode: '1',
          type: '0',
          time: '	2019-08-01 14:43:31'
        }
      ],
      isAdd: false,
      showDialog: false
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
    // 添加按钮click
    templateAdd() {
      this.isAdd = true
      this.showDialog = true
      // 表单初始化
      this.dialogFormData.name = ''
      this.dialogFormData.type = '0'
      this.dialogFormData.content = ''
    },
    // 编辑按钮click
    templateEdit(data) {
      this.isAdd = false
      this.showDialog = true
      this.dialogFormData = JSON.parse(JSON.stringify(data))
    },
    // 表格项选中事件
    handleSelectionChange(val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.templateSend /deep/ .el-card {
  position: relative;
}
.buttonGroup {
  position: absolute;
  bottom: 15px;
  left: 40px;
  button {
    margin-right: 20px !important;
    border-radius: 4px !important;
  }
}
</style>
