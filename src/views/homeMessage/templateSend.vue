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
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="templateContent" label="模板内容">
              <el-input
                v-model="formData.templateContent"
                placeholder="模板内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" plain style="margin-left: 30px;"
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
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="creator" label="创建者"></el-table-column>
        <el-table-column prop="sCode" label="状态"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" round>使用</el-button>
            <el-button type="success" round @click="templateEdit(scope.row)">修改</el-button>
            <el-button type="info" round>停止</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button-group class="buttonGroup">
        <el-button type="primary" icon="el-icon-edit">新增</el-button>
        <el-button type="primary" icon="el-icon-delete">删除</el-button>
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
    <el-dialog :title="isAdd ? '添加模板' : '编辑模板'" :visible.sync="showDialog">
      <el-form
        ref="formData"
        :model="formData"
        label-suffix="："
        label-width="100px">

      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      pagesize: 10,
      currpage: 1,
      tableData: [],
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
    templateAdd() {

    },
    templateEdit(data) {

    }
  }
}
</script>
<style lang="scss" scoped>
.templateSend /deep/ .el-card{
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
