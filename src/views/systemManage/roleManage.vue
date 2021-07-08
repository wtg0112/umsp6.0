<template>
  <div class="roleManage">
    <el-card class="box-card">
      <el-button-group class="buttonGroup">
        <el-button type="primary" @click="roleAdd" size="small"
          >新增角色</el-button
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
        <el-table-column prop="name" label="角色名称" width="500"></el-table-column>
        <el-table-column prop="time" label="创建时间" width="300"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="roleEdit(scope.row)"
              >修改</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="授权" align="center">
          <template slot-scope="scope">
            <el-button type="warning" size="small" @click="roleEdit(scope.row)"
              >授权</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="已授权用户" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="roleEdit(scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="已赋值权限" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="roleEdit(scope.row)"
              >查看</el-button
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
      :title="isAdd ? '添加角色' : '修改角色'"
      :visible.sync="dialogShow"
    >
      <el-card class="box-card">
        <el-form
          ref="dialogFormData"
          :model="dialogFormData"
          label-suffix="："
          label-width="100px"
        >
          <el-form-item prop="name" label="角色名称">
            <el-input
              v-model="dialogFormData.name"
              placeholder="请输入角色名称"
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
  name: 'roleManage',
  data() {
    return {
      isAdd: false,
      dialogShow: false,
      pagesize: 5,
      currpage: 1,
      tableData: [
        {
          name: '监控人员',
          time: '2021-05-07 19:33:53'
        },
        {
          name: '运维人员',
          time: '2018-11-13 09:06:03'
        },
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
    // 角色添加
    roleAdd() {
      this.isAdd = true
      this.dialogShow = true
      this.dialogFormData = {
        name: ''
      }
    },
    // 角色编辑
    roleEdit(data) {
      this.isAdd = false
      this.dialogShow = true
      this.dialogFormData = JSON.parse(JSON.stringify(data))
    }
  }
}
</script>
<style lang="scss" scoped>
.roleManage /deep/ .box-card {
  border-bottom: none !important;
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
