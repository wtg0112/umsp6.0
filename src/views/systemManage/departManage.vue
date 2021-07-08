<template>
  <div class="departManage">
    <el-card class="box-card">
      <el-form
        ref="formData"
        :model="formData"
        label-suffix="："
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item prop="name" label="部门名称">
              <el-select filterable v-model="formData.name" size="small">
                <el-option
                  v-for="item in dapartList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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
        <el-button type="primary" @click="departAdd" size="small"
          >新增部门</el-button
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
        <el-table-column prop="label" label="部门名称"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="departEdit(scope.row)">修改</el-button>
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
      :title="isAdd ? '添加部门' : '修改部门'"
      :visible.sync="dialogShow"
    >
      <el-card class="box-card">
        <el-form
          ref="dialogFormData"
          :model="dialogFormData"
          label-suffix="："
          label-width="100px"
        >
          <el-form-item prop="label" label="部门名称">
            <el-input
              v-model="dialogFormData.label"
              placeholder="请输入部门名称"
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
  name: 'departManage',
  data() {
    return {
      isAdd: false,
      dialogShow: false,
      formData: {
        name: ''
      },
      dapartList: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '产品部',
          value: '1'
        },
        {
          label: '研发一部',
          value: '2'
        }
      ],
      pagesize: 5,
      currpage: 1,
      tableData: [
        {
          label: '产品部',
          value: '1'
        },
        {
          label: '研发一部',
          value: '2'
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
    // 部门添加
    departAdd() {
      this.isAdd = true
      this.dialogShow = true
      this.dialogFormData = {
        name: ''
      }
    },
    // 部门编辑
    departEdit(data) {
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
