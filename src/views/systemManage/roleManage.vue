<template>
  <div class="roleManage">
    <template v-if="!isGrant">
      <el-card class="box-card btn-card">
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
          :data="
            tableData.slice((currpage - 1) * pagesize, currpage * pagesize)
          "
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="name"
            label="角色名称"
            width="500"
          ></el-table-column>
          <el-table-column
            prop="time"
            label="创建时间"
            width="300"
          ></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="small"
                @click="roleEdit(scope.row)"
                >修改</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="授权" align="center">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="small"
                @click="roleEdit(scope.row)"
                >授权</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="已授权用户" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="roleEdit(scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="已赋值权限" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="roleEdit(scope.row)"
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
    </template>
    <template v-else>
      <el-card class="box-card">
        <div slot="header" class="card-header clearfix">
          <!-- <el-page-header @back="goBack" :content="role.name + ' - 权限列表'">
          </el-page-header> -->
          <span>{{role.name}} - 权限列表</span>
          <el-button-group class="buttonGroup">
            <el-button style="float: right;" type="danger" @click="isGrant = false"
              >返回</el-button
            >
            <el-button style="float: right;" type="warning"
              >重置</el-button
            >
            <el-button style="float: right;" type="primary"
              >保存</el-button
            >
          </el-button-group>
        </div>
        <el-collapse>
          <el-collapse-item name="1">
            <template slot="title">
              <el-checkbox
                class="node-header"
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
                >全选</el-checkbox
              >
            </template>
            <el-row :gutter="20" class="row20">
              <el-col :span="5">
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                  >全选</el-checkbox
                >
              </el-col>
              <el-col :span="19">
                <el-checkbox-group
                  v-model="checkedCities"
                  @change="handleCheckedCitiesChange"
                >
                  <el-checkbox
                    v-for="city in cities"
                    :label="city"
                    :key="city"
                    >{{ city }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </template>
  </div>
</template>
<script>
export default {
  name: 'roleManage',
  data() {
    return {
      isGrant: true, // 判断是否进入授权界面
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
        }
      ],
      dialogFormData: {},
      role: {
        name: '监控人员',
        time: '2021-05-07 19:33:53'
      }, // 选中角色
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: ['上海', '北京', '广州', '深圳'],
      isIndeterminate: true
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
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
    },
    // 返回
    goBack() {
      this.isGrant = false
    }
  }
}
</script>
<style lang="scss" scoped>
.roleManage /deep/ .box-card {
  border-bottom: none !important;
}
.roleManage /deep/ .el-card__header {
  position: relative;
  .role-header .el-checkbox__label {
    font-size: 16px;
  }
  .card-header {
    font-size: 20px;
    .el-tag {
      margin-left: 20px;
    }
  }
}
.roleManage /deep/ .el-checkbox {
  margin-right: 18px;
  .el-checkbox__label {
    padding-left: 5px;
  }
}
.roleManage /deep/ .el-collapse {
  border-top: 0;
  .el-collapse-item {
    .el-collapse-item__header {
      .el-checkbox__label {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .el-collapse-item__content {
      padding-left: 30px;
    }
  }
}
.btn-card .buttonGroup {
  // position: absolute;
  // top: 0;
  // left: 40px;
  margin-bottom: 10px;
  margin-left: 14px;
}
.card-header  .buttonGroup{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}
button {
  margin-right: 20px !important;
  border-radius: 4px !important;
}
.row20 {
  margin: 0;
  &:not(:last-child) {
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
}
</style>
