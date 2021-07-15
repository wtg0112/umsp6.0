<template>
  <div class="upstreamRouteManage">
    <el-card class="box-card">
      <el-form
        ref="formData"
        :model="formData"
        label-suffix="："
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item prop="templateName" label="路由名称">
              <el-input
                v-model="formData.templateName"
                placeholder="请输入路由名称"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              style="margin-left: 30px;margin-top:4px;"
              size="small"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-button-group class="buttonGroup">
        <el-button type="primary" @click="templateAdd" size="small"
          >新增</el-button
        >
        <!-- <el-button type="primary"  size="small"
          >删除</el-button -->
        <!-- > -->
      </el-button-group>
      <el-table
        ref="filterTable"
        :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="路由名称"></el-table-column>
        <el-table-column prop="name" label="ip地址"></el-table-column>
        <el-table-column prop="name" label="端口"></el-table-column>
        <el-table-column prop="name" label="渠道"></el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              @click="templateEdit(scope.row)"
              size="small"
              >修改</el-button
            >
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
    <el-dialog
      :title="isAdd ? '新增路由' : '编辑路由'"
      :visible.sync="showDialog"
    >
      <el-form
        ref="dialogFormData"
        :model="dialogFormData"
        label-suffix="："
        label-width="160px"
      >
        <el-form-item prop="name" label="路由名称">
          <el-input
            v-model="dialogFormData.name"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name" label="ip地址">
          <el-input
            v-model="dialogFormData.name"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name" label="端口">
          <el-input
            v-model="dialogFormData.name"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="type" label="所属渠道">
          <el-select
            size="small"
            v-model="dialogFormData.content"
            placeholder="请选择所属渠道"
          >
            <el-option
              v-for="item in labelArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
  name: 'upstreamRouteManage',
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
          name: '15279474789',
          content: '0',
          creator: 'admin',
          sCode: '1',
          type: '1',
          time: '2021-02-05 10:31:05'
        },
        {
          name: '18320045268',
          content: '1',
          creator: 'admin',
          sCode: '1',
          type: '2',
          time: '	2019-08-01 14:43:31'
        },
        {
          name: '13469602659',
          content: '2',
          creator: 'admin',
          sCode: '1',
          type: '0',
          time: '	2020-12-21 15:11:12'
        }
      ],
      isAdd: false,
      showDialog: false,
      labelArr: [
        {
          label: 'Android应用',
          value: '0'
        },
        {
          label: 'iOS应用',
          value: '1'
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
    // 使用按钮click
    useTemplate(data) {
      this.sendRuleForm.sendNote = data.content
      this.chooseTemplate = false
    },
    // 表格项选中事件
    handleSelectionChange(val) {
      console.log(val)
    },
    selectChange() {}
  }
}
</script>
<style lang="scss" scoped>
.templateSend /deep/ .el-card {
  position: relative;
}
.buttonGroup {
  // position: absolute;
  // top: 0;
  // left: 40px;
  margin-bottom: 10px;
  margin-left: 14px;
  button {
    margin-right: 20px !important;
    border-radius: 4px !important;
  }
}
</style>
