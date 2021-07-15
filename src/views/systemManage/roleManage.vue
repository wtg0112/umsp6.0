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
          <el-table-column type="selection" width="100"></el-table-column>
          <el-table-column
            prop="name"
            label="角色名称"
            width="450"
          ></el-table-column>
          <el-table-column
            prop="time"
            label="创建时间"
            width="250"
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
                @click="roleGrant(scope.row)"
                >授权</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="已授权用户" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="checkUser(scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="已赋值权限" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="checkGrant(scope.row)"
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
      <el-dialog
        :title="'查看拥有角色' + role.name + '的用户'"
        :visible.sync="checkDialogShow"
      >
        <el-table
          ref="checkTable"
          :data="
            checkTableData.slice(
              (checkCurrpage - 1) * checkPagesize,
              checkCurrpage * checkPagesize
            )
          "
        >
          <el-table-column prop="name" label="用户名"></el-table-column>
          <el-table-column prop="organ" label="机构"></el-table-column>
          <el-table-column prop="depart" label="部门"></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="checkPagesize"
          :total="this.checkTableData.length"
          @current-change="checkCurrentChange"
          @size-change="checkSizeChange"
        >
        </el-pagination>
        <span slot="footer" class="dialog-footer">
          <el-button @click="checkDialogShow = false" size="small"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="checkDialogShow = false"
            size="small"
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
          <span>{{ role.name }} - 权限列表</span>
          <el-button-group class="buttonGroup">
            <el-button
              style="float: right;"
              type="danger"
              @click="isGrant = false"
              >返回</el-button
            >
            <el-button style="float: right;" type="warning">重置</el-button>
            <el-button style="float: right;" type="primary">保存</el-button>
          </el-button-group>
        </div>
        <el-collapse v-model="activeNames">
          <el-collapse-item
            :name="item.id"
            v-for="item in checkAllList"
            :key="item.id"
          >
            <template slot="title">
              <el-checkbox
                class="node-header"
                :indeterminate="item.isIndeterminate"
                v-model="item.checked"
                @change="firstCheck(item.id)"
                >{{ item.name }}</el-checkbox
              >
            </template>
            <el-row
              v-for="key in item.children"
              :key="key.id"
              :gutter="20"
              class="row20"
            >
              <el-col :span="5">
                <el-checkbox
                  :indeterminate="key.isIndeterminate"
                  v-model="key.checked"
                  @change="secondCheck(key.id)"
                  >{{ key.name }}</el-checkbox
                >
              </el-col>
              <el-col :span="19">
                <el-checkbox
                  v-if="key.children"
                  v-for="val in key.children"
                  :label="val.name"
                  :key="val.id"
                  v-model="val.checked"
                  @change="thirdCheck"
                  >{{ val.name }}</el-checkbox
                >
                <el-radio-group v-model="radio">
                  <el-radio :label="3">查询全部</el-radio>
                  <el-radio :label="6">按机构查询</el-radio>
                  <el-radio :label="9">按登录用户查询</el-radio>
                </el-radio-group>
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
      radio: 3,
      activeNames: [],
      isGrant: false, // 判断是否进入授权界面
      isAdd: false,
      dialogShow: false,
      checkDialogShow: false,
      pagesize: 5,
      currpage: 1,
      checkPagesize: 5,
      checkCurrpage: 1,
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
      checkTableData: [],
      dialogFormData: {},
      role: {
        name: '监控人员',
        time: '2021-05-07 19:33:53'
      }, // 选中角色
      isIndeterminate: true,
      checkList: [
        {
          name: '安全中心',
          id: '1',
          pid: '0',
          checked: true
        },
        {
          name: '任务信息列表',
          id: '11',
          pid: '1',
          checked: true
        },
        {
          name: '修改',
          id: '111',
          pid: '11',
          checked: false
        },
        {
          name: '短信补发',
          id: '112',
          pid: '11',
          checked: true
        },
        {
          name: '彩信审核',
          id: '12',
          pid: '1',
          checked: false
        },
        {
          name: '审核',
          id: '121',
          pid: '12',
          checked: false
        },
        {
          name: '查询全部',
          id: '122',
          pid: '12',
          checked: false
        },
        {
          name: '素材审核',
          id: '13',
          pid: '1',
          checked: false
        },
        {
          name: '服务器监控',
          id: '2',
          pid: '0',
          checked: true
        },
        {
          name: '服务器管理',
          id: '21',
          pid: '2',
          checked: true
        },
        {
          name: '增加',
          id: '211',
          pid: '21',
          checked: true
        },
        {
          name: '删除',
          id: '212',
          pid: '21',
          checked: true
        },
        {
          name: '修改',
          id: '213',
          pid: '21',
          checked: false
        },
        {
          name: '查询全部',
          id: '214',
          pid: '21',
          checked: true
        },
        {
          name: '服务器状态',
          id: '22',
          pid: '2',
          checked: false
        },
        {
          name: '查询全部',
          id: '221',
          pid: '22',
          checked: false
        }
      ],
      checkAllList: []
    }
  },
  created() {
    this.checkAllList = this.handleTree(this.checkList)
    // 将所有折叠项展开
    this.checkAllList.forEach(item => {
      this.activeNames.push(item.id)
    })
  },
  methods: {
    // 切换页 方法
    handleCurrentChange(cpage) {
      this.currpage = cpage
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    },
    // 切换页 方法
    checkCurrentChange(cpage) {
      this.checkCurrpage = cpage
    },
    checkSizeChange(psize) {
      this.checkPagesize = psize
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
    // 角色授权
    roleGrant() {
      this.isGrant = true
    },
    // 查看已授权用户
    checkUser() {
      this.checkDialogShow = true
    },
    // 查看已赋值授权
    checkGrant() {
      this.isGrant = true
    },
    // 返回
    goBack() {
      this.isGrant = false
    },
    // 通讯录树图数据处理func
    handleTree(arr) {
      let cloneData = JSON.parse(JSON.stringify(arr)) // 对源数据深度克隆
      return cloneData.filter(father => {
        let branchArr = cloneData.filter(child => father.id == child.pid) //返回每一项的子级数组
        let branchArrChecked = branchArr.filter(item => item.checked)
        branchArr.length > 0 ? (father.children = branchArr) : '' //如果存在子级，则给父级添加一个children属性，并赋值

        branchArrChecked.length != branchArr.length &&
        branchArr.some(item => item.checked) // 判断是否全选中并且是否全不选中
          ? (father.isIndeterminate = true)
          : (father.isIndeterminate = false) //如果存在子级存在选中，则给父级添加一个isIndeterminate属性，并赋值
        return father.pid == 0 //返回第一层
      })
    },
    // 一级选中点击
    firstCheck(id) {
      this.checkAllList.forEach(item => {
        if (id == item.id) {
          if (item.isIndeterminate) {
            item.children.forEach(key => {
              if (key.children) {
                key.children.forEach(val => {
                  val.checked = true
                })
              } else {
                key.checked = true
              }
            })
          } else {
            if (item.checked) {
              item.children.forEach(key => {
                if (key.children) {
                  key.children.forEach(val => {
                    val.checked = true
                  })
                } else {
                  key.checked = true
                }
              })
            } else {
              item.children.forEach(key => {
                if (key.children) {
                  key.children.forEach(val => {
                    val.checked = false
                  })
                } else {
                  key.checked = false
                }
              })
            }
          }
        }
      })
      this.checkAll()
    },
    // 二级选中点击
    secondCheck(id) {
      this.checkAllList.forEach(item => {
        item.children.forEach(key => {
          if (key.id == id) {
            // 有选中，但未全选
            if (key.isIndeterminate) {
              if (key.children) {
                key.children.forEach(val => {
                  val.checked = true
                })
              }
            } else {
              // 全选或全不选
              if (key.checked) {
                if (key.children) {
                  key.children.forEach(val => {
                    val.checked = true
                  })
                }
              } else {
                if (key.children) {
                  key.children.forEach(val => {
                    val.checked = false
                  })
                }
              }
            }
          }
        })
      })
      this.checkAll()
    },
    // 三级选中点击
    thirdCheck(val) {
      this.checkAll()
    },
    // 确认所有层选中状态
    checkAll() {
      this.checkAllList.forEach(item => {
        item.children.forEach(key => {
          if (key.children) {
            let kid2 = key.children.filter(val => val.checked)
            if (kid2.length == key.children.length) {
              key.isIndeterminate = false
              key.checked = true
            } else if (kid2.length < key.children.length && kid2.length > 0) {
              key.isIndeterminate = true
              key.checked = true
            } else if (kid2.length == 0) {
              key.isIndeterminate = false
              key.checked = false
            }
          }
        })
        // 最高层最晚执行
        let kid1 = item.children.filter(key => key.checked)
        if (kid1.length == item.children.length) {
          item.isIndeterminate = false
          item.checked = true
        } else if (kid1.length < item.children.length && kid1.length > 0) {
          item.isIndeterminate = true
          item.checked = true
        } else if (kid1.length == 0) {
          item.isIndeterminate = false
          item.checked = false
        }
      })
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
.card-header .buttonGroup {
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
