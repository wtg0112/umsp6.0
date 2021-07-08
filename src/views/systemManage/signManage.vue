<template>
  <div class="signManage">
    <el-card class="box-card">
      <el-form
        ref="formData"
        :model="formData"
        label-suffix="："
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item prop="sign" label="签名">
              <el-input
                v-model="formData.sign"
                placeholder="请输入签名"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="small" style="margin-top: 4px;"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-button-group class="buttonGroup">
        <el-button type="primary" @click="signAdd" size="small"
          >新增签名</el-button
        >
        <!-- <el-button type="primary"  size="small"
          >删除</el-button -->
        <!-- > -->
      </el-button-group>
      <el-table
        ref="tableData"
        :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="sign" label="签名"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="memo" label="备注"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="signEdit(scope.row)"
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
      :title="isAdd ? '添加签名' : '修改签名'"
      :visible.sync="dialogShow"
    >
      <el-card class="box-card">
        <el-form
          ref="dialogFormData"
          :model="dialogFormData"
          label-suffix="："
          label-width="100px"
        >
          <el-form-item prop="sign" label="签名">
            <el-input
              v-model="dialogFormData.sign"
              placeholder="请输入签名"
              size="small"
            ></el-input>
            <span>格式说明:【签名内容】</span>
          </el-form-item>
          <el-form-item prop="memo" label="备注">
            <el-input
              v-model="dialogFormData.memo"
              placeholder="请输入备注"
              size="small"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogShow = false" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'signManage',
  data() {
    return {
      isAdd: false,
      dialogShow: false,
      formData: {},
      pagesize: 5,
      currpage: 1,
      tableData: [
        {
          sign: '【广西农信社】',
          createTime: '2021-05-11 17:01:38',
          memo: '广西农信社'
        },
        {
          sign: '【微众银行】',
          createTime: '2021-05-11 10:26:28',
          memo: '微众银行'
        }
      ],
      dialogFormData: {}
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
    // 签名添加
    signAdd() {
      this.isAdd = true
      this.dialogShow = true
      this.dialogFormData = {
        name: ''
      }
    },
    // 签名编辑
    signEdit(data) {
      this.isAdd = false
      this.dialogShow = true
      this.dialogFormData = JSON.parse(JSON.stringify(data))
    }
  }
}
</script>
<style lang="scss" scoped>
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
