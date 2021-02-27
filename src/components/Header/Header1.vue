<template>
  <div class="page-header">
    <div>
       <!-- 头部 -->
      <div class="header_logo">
        <img src="./image/haicelogo.png" style="height:40px;margin-right: 20px;" alt @click="goAdmin()" />
      </div>
      <div class="header_user">
        <el-dropdown @command="Exit" trigger="click" placement="bottom">
          <div class="header_user_right">
            <img :src="touxiang" alt />
            <div>
              <div>{{name}}</div>
              <div></div>
            </div>
            <i class="el-icon-caret-bottom"></i>
          </div>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="研究生库">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import cookies from '@/utils/cookie'
export default {
  data () {
    return {
      name: '',
      touxiang: '',
      input2: ''
    }
  },
  created () {
    this.name = cookies.get('name')
    this.touxiang = cookies.get('touxiang')
  },
  methods: {
    Exit () {
      cookies.remove('token')
      this.$router.push({ path: '/login?source=' + cookies.get('source') })
    },
    // 去首页
    goAdmin () {
      const path = this.$route.matched[0].path
      console.log(this.$route)
      const { href } = this.$router.resolve(
        `${path}/home`
      )
      window.open(href, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  width: 100%;
  min-width: 1200px;
  height: 60px;
  background: white;
  border-bottom: 1px solid #e2e2ea;
  position: fixed;
  top: 0;
  z-index:99;
  >div{
    min-width: 1200px;
    padding: 0 0.7rem;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.header_user img {
  width: 45px;
  height: 45px;
}
.header_logo>img{
  cursor: pointer;
}
.nav{
  width: 1200px;
  display: flex;
  flex-shrink: 0;
  height: 100%;
  align-items: center;
  /deep/ .el-input{
    width: 414px;
    >input{
      background: #EEF1FA;
      border: 1px solid #EEF1FA;
    }
  }
  .nav_cnt{
    height: 100%;
    margin-left: 1.26rem;
    display: flex;
    align-items: center;
    >div{
      width: 1rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      color: #A8A8C2;
    }
    @keyframes myNavAct
    {
    from {width: 50%;opacity: 0;height: 0px;}
    to {width: 80%;opacity: 1;height: 3px;}
    }
    >.active{
      &::after{
        content: '';
        width: 80%;
        height: 3px;
        background: #5756B3;
        position: absolute;
        bottom: 0px;
        border-radius: 2px;
        animation: myNavAct 0.5s;
        // transition: all 0.3;
      }
    }
  }
}
.header_user_right{
  display: flex;
  align-items: center;
  cursor: pointer;
  >img{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 8px;
  }
  >div{
    margin-right: 10px;
    >div:nth-of-type(1){
      font-size: 14px;
      font-weight: 600;
      color: #171725;
    }
    >div:nth-of-type(2){
      font-size: 10px;
      font-weight: 400;
      color: #92929D;
    }
  }
  >i{
    font-size: 18px;
  }
}
</style>
