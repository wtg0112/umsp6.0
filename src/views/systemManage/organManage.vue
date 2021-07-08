<template>
  <div class="organManage">
    <el-row :gutter="20" style="margin: 0; border: 1px solid #f0f0f0;">
      <el-col :span="7" class="treeCon">
        <el-button-group class="btn-group">
          <el-button
            plain
            type="primary"
            icon="el-icon-user"
            @click="createNode"
            >创建</el-button
          >
          <el-button plain type="primary" icon="el-icon-edit" @click="editNode">编辑</el-button>
          <el-button plain type="primary" icon="el-icon-delete" @click="delNode">删除</el-button>
          <el-button
            plain
            type="primary"
            :icon="isOpen ? 'el-icon-plus' : 'el-icon-remove'"
            @click="treeExpanded"
            >{{ isOpen ? '展开' : '折叠' }}</el-button
          >
        </el-button-group>
        <el-card class="box-card">
          <el-tree
            ref="tree"
            :data="treeData"
            :props="defaultProps"
            :highlight-current="true"
            :expand-on-click-node="false"
            node-key="account"
            @node-click="handleNodeClick"
            @node-expand="handleNodeExpand"
            @node-collapse="handleNodeCollapse"
          ></el-tree>
        </el-card>
      </el-col>
      <el-col :span="17" style="margin-top: 10px;">
        <el-table
          ref="tableData"
          :data="
            tableData.slice((currpage - 1) * pagesize, currpage * pagesize)
          "
        >
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="name" label="用户名"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="balance" label="余额"></el-table-column>
          <el-table-column prop="time" label="创建时间"> </el-table-column>
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
      </el-col>
    </el-row>
    <el-dialog :title="isAdd ? '添加机构' : '修改机构'" :visible.sync="dialogShow">
      <el-card class="box-card">
        <el-form
          ref="dialogFormData"
          :model="dialogFormData"
          label-suffix="："
          label-width="100px"
        >
          <el-form-item prop="account" label="机构号">
            <el-input
              :disabled="!isAdd"
              v-model="dialogFormData.account"
              placeholder="请输入机构号"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item prop="name" label="机构名称">
            <el-input
              v-model="dialogFormData.name"
              placeholder="请输入机构名称"
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
  name: 'organManage',
  data() {
    return {
      dialogShow: false, // 弹框显示隐藏
      isAdd: true, // 添加\编辑
      isOpen: true, // 折叠\展开
      pagesize: 5,
      currpage: 1,
      tableData: [], // 表格数据
      treeList: [
        {
          account: '100000',
          name: '北京国都',
          pAccount: ''
        },
        {
          account: '110000',
          name: '业务部门',
          pAccount: '100000'
        },
        {
          account: '110001',
          name: '运营中心',
          pAccount: '110000'
        },
        {
          account: '120000',
          name: '技术中心',
          pAccount: '100000'
        },
        {
          account: '120002',
          name: '产品中心',
          pAccount: '120000'
        },
        {
          account: '120003',
          name: '研发中心',
          pAccount: '120000'
        },
        {
          account: '120013',
          name: '研发一部',
          pAccount: '120003'
        },
        {
          account: '10001',
          name: '兴业证券',
          pAccount: '120013'
        },
        {
          account: '120023',
          name: '研发二部',
          pAccount: '120003'
        }
      ], // 树图接口数据
      treeData: [], // 树图数据
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      clickNode: null, // 选中节点
      dialogFormData: {
        account: '',
        name: ''
      }
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
    // 树图数据处理func
    handleTree(arr) {
      let cloneData = JSON.parse(JSON.stringify(arr)) // 对源数据深度克隆
      cloneData.forEach(item => {
        item.label = item.name + '(' + item.account + ')'
      })
      return cloneData.filter(father => {
        let branchArr = cloneData.filter(
          child => father.account == child.pAccount
        ) //返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : '' //如果存在子级，则给父级添加一个children属性，并赋值
        return father.pAccount == 0 //返回第一层
      })
    },
    // 左侧树图点击
    handleNodeClick(node) {
      const $this = this
      // 存储点击节点
      this.clickNode = node
      // 判断是否能展开折叠
      if (node.children) {
        this.$nextTick(() => {
          // 判断上方展开折叠按钮显示
          if ($this.$refs.tree.store.nodesMap[node.account].expanded) {
            $this.isOpen = false
          } else {
            $this.isOpen = true
          }
        })
      }
    },
    // 节点被展开时触发的事件
    handleNodeExpand(nodeData, node, nodeVue) {
      // 判断上方展开折叠按钮显示
      if (this.clickNode && nodeData.account === this.clickNode.account) {
        if (node.expanded) {
          this.isOpen = false
        } else {
          this.isOpen = true
        }
      }
    },
    // 节点被关闭时触发的事件
    handleNodeCollapse(nodeData, node, nodeVue) {
      console.log(node)
      // 判断上方展开折叠按钮显示
      if (this.clickNode && nodeData.account === this.clickNode.account) {
        if (!node.expanded) {
          this.isOpen = false
        } else {
          this.isOpen = true
        }
      }
    },
    // 创建节点click
    createNode() {
      if (this.clickNode) {
        this.dialogShow = true
        this.isAdd = true
        this.dialogFormData = {
          account: '',
          name: ''
        }
      } else {
        this.$message({
          showClose: true,
          message: '请先选择节点~',
          type: 'warning'
        })
      }
    },
    // 编辑节点click
    editNode() {
      if (this.clickNode) {
        this.dialogShow = true
        this.isAdd = false
        this.dialogFormData = JSON.parse(JSON.stringify(this.clickNode))
      } else {
        this.$message({
          showClose: true,
          message: '请先选择节点~',
          type: 'warning'
        })
      }
    },
    // 删除节点click
    delNode() {},
    // 折叠展开按钮click
    treeExpanded() {
      const $this = this
      if (this.clickNode) {
        this.$nextTick(() => {
          console.log($this.$refs.tree.store.nodesMap[$this.clickNode.account])
          const isExpanded =
            $this.$refs.tree.store.nodesMap[$this.clickNode.account].expanded
          $this.$refs.tree.store.nodesMap[
            $this.clickNode.account
          ].expanded = !isExpanded
          $this.isOpen = !$this.isOpen
        })
      } else {
        this.$message({
          showClose: true,
          message: '请先选择节点~',
          type: 'warning'
        })
      }
    }
  },
  mounted() {
    this.treeData = this.handleTree(this.treeList)
  }
}
</script>
<style lang="scss" scoped>
.organManage /deep/ .btn-group {
  width: 100%;
  button {
    width: 25%;
    text-align: center;
    border: none;
    margin-right: 0;
    border-radius: 0;
    i {
      display: block;
      margin-bottom: 10px;
      font-size: 20px;
    }
    span {
      margin: 0;
    }
  }
}
.organManage /deep/ .el-tree {
  &.el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: #409eff;
    color: #fff;
  }
}
.treeCon {
  border-right: 1px solid #f0f0f0;
  padding: 0 !important;
  .box-card {
    border-bottom: 0px solid #f0f0f0 !important;
  }
}
</style>
