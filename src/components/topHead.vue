<template>
  <div class="top">
    <el-dropdown class="user" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home"><i class="el-icon-s-home"></i> 主页</el-dropdown-item>
        <el-dropdown-item command="plus"><i class="el-icon-circle-plus"></i> 充值记录</el-dropdown-item>
        <el-dropdown-item command="cost"><i class="el-icon-remove"></i> 消费记录</el-dropdown-item>
        <el-dropdown-item command="edit"><i class="el-icon-edit"></i> 修改密码</el-dropdown-item>
        <el-dropdown-item command="exit"><i class="el-icon-switch-button"></i> 退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  props: ['name'],
  methods: {
    // 下拉菜单事件总括
    handleCommand(command) {
      if(command == 'home') { // 主页
        this.toHome()
      } else if(command == 'plus') { // 充值记录

      } else if(command == 'cost') { // 消费记录

      } else if(command == 'edit') { // 修改密码

      } else if(command == 'exit') { // 退出

      }
    },
    // 主页
    toHome() {
      this.$router.push('/home')
    },
  }
}
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #303440;
  z-index: 9999;
  text-align: right;
  .user{
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
</style>
