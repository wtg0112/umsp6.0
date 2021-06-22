<template>
  <div class="topHead">
    <div class="top">
      <el-dropdown class="user" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home"
            ><i class="el-icon-s-home"></i> 主页</el-dropdown-item
          >
          <el-dropdown-item command="plus"
            ><i class="el-icon-circle-plus"></i> 充值记录</el-dropdown-item
          >
          <el-dropdown-item command="cost"
            ><i class="el-icon-remove"></i> 扣费记录</el-dropdown-item
          >
          <el-dropdown-item command="edit"
            ><i class="el-icon-edit"></i> 修改密码</el-dropdown-item
          >
          <el-dropdown-item command="exit"
            ><i class="el-icon-switch-button"></i> 退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog :title="`用户${admin}充值记录`" :visible.sync="rechargeDialog">
      <el-card class="box-card">
        <el-table
          ref="rechargeTable"
          size="small"
          :data="
            rechargeData.slice((currpage - 1) * pagesize, currpage * pagesize)
          "
        >
          <el-table-column prop="account" label="用户"></el-table-column>
          <el-table-column prop="operator" label="操作员"></el-table-column>
          <el-table-column prop="time" label="充值时间"></el-table-column>
          <el-table-column prop="sum" label="充值条数"></el-table-column>
          <el-table-column prop="memo" label="备注"></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          :total="this.rechargeData.length"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          size="small"
        >
        </el-pagination>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rechargeDialog = false" size="small"
          >取 消</el-button
        >
        <el-button type="primary" @click="rechargeDialog = false" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog :title="`用户${admin}扣费记录`" :visible.sync="costDialog">
      <el-card class="box-card">
        <el-table
          ref="costTable"
          size="small"
          :data="
            costData.slice((currpageCost - 1) * pagesizeCost, currpageCost * pagesizeCost)
          "
        >
          <el-table-column prop="account" label="任务名称"></el-table-column>
          <el-table-column prop="operator" label="短信条数"></el-table-column>
          <el-table-column prop="time" label="扣费时间"></el-table-column>
          <el-table-column prop="sum" label="余额"></el-table-column>
          <el-table-column prop="memo" label="备注"></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesizeCost"
          :total="this.costData.length"
          @current-change="handleCurrentChangeCost"
          @size-change="handleSizeChangeCost"
          size="small"
        >
        </el-pagination>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="costDialog = false" size="small"
          >取 消</el-button
        >
        <el-button type="primary" @click="costDialog = false" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['name'],
  data() {
    return {
      admin: 'admin', // 用户account
      toMenu: null,
      rechargeDialog: false, // 充值记录弹框显隐
      costDialog: false, // 扣费记录弹框显隐
      pagesize: 5,
      currpage: 1,
      pagesizeCost: 5,
      currpageCost: 1,
      rechargeData: [
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
      ],
      costData: [
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
        {
          account: 'admin',
          operator: 'wtg',
          time: '2021-06-21 11:08:26',
          sum: '10',
          memo: '无'
        },
      ]
    }
  },
  methods: {
    // 下拉菜单事件总括
    handleCommand(command) {
      if(command == 'home') { // 主页
        this.toHome(command)
      } else if(command == 'plus') { // 充值记录
        this.recharge()
      } else if(command == 'cost') { // 消费记录
        this.cost()
      } else if(command == 'edit') { // 修改密码

      } else if(command == 'exit') { // 退出

      }
    },
    // 主页
    toHome(item) {
      if(this.$route.path !== item){
         this.$router.push('/'+item)
      }
    },
    // 充值记录
    recharge() {
      this.rechargeDialog = true
    },
    // 扣费记录
    cost() {
      this.costDialog = true
    },
    // 切换页 方法 => 充值记录
    handleCurrentChange(cpage) {
      this.currpage = cpage
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    },
    // 切换页 方法 => 扣费记录
    handleCurrentChangeCost(cpage) {
      this.currpageCost = cpage
    },
    handleSizeChangeCost(psize) {
      this.pagesizeCost = psize
    }
  }
}
</script>
<style lang="scss" scoped>
.topHead {
  & /deep/ .el-dialog{
    width: 70%;
  }
  .top {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #303440;
    z-index: 999;
    text-align: right;
    .user {
      height: 30px;
      line-height: 30px;
      position: absolute;
      right: 60px;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      font-weight: bold;
      font-size: 14px;
      border: none;
      outline: none;
      cursor: pointer;
    }
  }
}
</style>
