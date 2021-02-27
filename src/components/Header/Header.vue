<template>
  <div class="page-header">
    <div>
      <!-- 头部 -->
      <div class="header_logo">
        <img
          src="./image/haicelogo.png"
          style="height:40px;margin-right: 20px;"
          alt
          @click="goAdmin()"
        />
      </div>
      <div class="nav">
        <el-input
          size="medium"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          @change="search"
          v-model="val"
        >
        </el-input>
        <div class="nav_cnt">
          <router-link
            v-for="(item, key) in router"
            :key="key"
            :to="{ path: item.path }"
            tag="div"
            active-class="active"
            >{{ item.name }}</router-link
          >
        </div>
        <!-- 分享权限判断 -->
        <div
          class="share"
          v-if="share"
          @click="box1Flag = true"
          title="分享"
        >
          <img src="./image/share.png" alt="" />
        </div>
      </div>
      <div class="header_user">
        <el-dropdown @command="Exit" trigger="click" placement="bottom">
          <div class="header_user_right">
            <img :src="touxiang" alt />
            <div>
              <div>{{ name }}</div>
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
    <div
      class="up_Share"
      v-if="box1Flag"
      @click.self="
        reset()
        box1Flag = false
      "
    >
      <div class="up_Share_box1">
        <div class="title">分享页面</div>
        <div class="inp">
          <p>学生姓名</p>
          <el-input v-model="kh_name" placeholder="请输入内容"></el-input>
        </div>
        <div class="inp">
          <p>可访问时长（天）</p>
          <el-input v-model.number="kh_day" placeholder="默认为3天"></el-input>
        </div>
        <div class="inp">
          <p>可访问次数（次）</p>
          <el-input v-model.number="kh_ci" placeholder="默认为50次"></el-input>
        </div>
        <el-button type="primary" @click="getUrl()">创建链接</el-button>
      </div>
    </div>
    <div
      class="up_Share"
      v-if="box2Flag"
      @click.self="
        reset()
        box2Flag = false
      "
    >
      <div class="up_Share_box1 box2">
        <img src="./image/queren.png" alt="" />
        <div class="title">分享页面</div>
        <div class="inp">
          <p>分享链接</p>
          <el-input v-model.number="kh_url" placeholder=""></el-input>
        </div>
        <el-button
          type="primary"
          v-clipboard:copy="kh_url"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          >复制链接去分享</el-button
        >
        <p>
          您的链接已经生成,该链接有效期为{{
            kh_day == '' ? 3 : kh_day
          }}天,最多可以查看{{ kh_day == '' ? 50 : kh_day }}个案例库
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import cookies from '@/utils/cookie'
import { getShareCode } from '@/api/meiben.js'
export default {
  props: ['router'],
  data() {
    return {
      // router: [
      //   { path: '/japan/home', name: '首页' },
      //   { path: '/japan/case', name: '列表' }
      // ],
      name: '',
      val: '',
      touxiang: '',
      type: 0,
      box1Flag: false,
      box2Flag: false,
      share: true,
      kh_name: '',
      kh_day: '',
      kh_ci: '',
      kh_url: ''
    }
  },
  created() {
    // 获取当前路由后缀
    const url = window.location.href
    const url2 = url.lastIndexOf('#')
    const url3 = url.substring(url2 + 1, url.length)
    this.touxiang = cookies.get('touxiang')
    // 判断国家和是否为分享出去的
    this.type = cookies.get('source')
    if (cookies.get('share')) {
      this.share = false
    } else {
      this.share = true
    }

    this.name = cookies.get('name')
    this.touxiang = cookies.get('touxiang')
  },
  methods: {
    reset() {
      this.kh_day = ''
      this.kh_ci = ''
      this.kh_name = ''
    },
    onCopy(e) {
      var doms = document.getElementsByClassName('el-message')[0]
      if (doms == undefined) {
        this.$message.success({
          message: '复制成功！'
        })
      }
    },
    // 复制失败
    onError(e) {
      var doms = document.getElementsByClassName('el-message')[0]
      if (doms == undefined) {
        this.$message('复制失败')
      }
    },
    // 获取分享链接
    getUrl() {
      getShareCode({
        open_days: this.kh_day,
        allow_count: this.kh_ci,
        nickname: this.kh_name
      }).then(res => {
        this.box1Flag = false
        this.box2Flag = true
        this.kh_url = `${window.location.host}/#${this.$route.matched[0].path}?share=${res.data.code}`
        console.log(res.data.code)
      })
    },
    // 退出
    Exit() {
      cookies.remove('token')
      this.$router.push({ path: '/login?source=' + cookies.get('source') })
    },
    // 搜索
    search() {
      this.$store.state.search = this.val
      const path = this.$route.matched[0].path
      if (this.$route.path != `${path}/case`) {
        this.$router.push({ path: `${path}/case` })
      }
    },
    // 去首页
    goAdmin() {
      const path = this.$route.matched[0].path
      const { href } = this.$router.resolve(`${path}/home`)
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
  position: absolute;
  top: 0;
  z-index: 10;
  > div {
    width: 100%;
    padding: 0 0.6rem;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    box-sizing: border-box;
  }
  .up_Share {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999999;
    .up_Share_box1 {
      width: 5.01rem;
      height: 5.2rem;
      background: #eff1fa;
      box-shadow: 0.04rem 0.16rem 0.52rem 0.01rem rgba(111, 143, 234, 0.06);
      border-radius: 0.1rem;
      background: url('./image/back.png') center center no-repeat;
      background-size: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .title {
        font-size: 0.24rem;
        font-weight: bold;
        color: #2c2c6b;
      }
      .inp {
        width: 80%;
        margin-top: 0.2rem;
        p {
          font-size: 0.14rem;
          font-weight: 600;
          color: #252631;
          margin-bottom: 0.1rem;
        }
      }
      .el-button {
        width: 80%;
        height: 0.46rem;
        margin-top: 0.4rem;
        background-color: #5e81f4;
        font-size: 0.14rem;
        font-weight: 400;
        color: #ffffff;
        &:active {
          opacity: 0.8;
        }
        // border-color: #5E81F4;
      }
    }
    .box2 {
      img {
        width: 0.7rem;
        height: 0.7rem;
        margin-bottom: 0.08rem;
      }
      > p {
        font-size: 0.14rem;
        font-weight: 400;
        color: #98a9bc;
        margin-top: 0.7rem;
      }
    }
  }
}

.header_user img {
  width: 45px;
  height: 45px;
}
.header_logo > img {
  cursor: pointer;
}
.nav {
  width: 12rem;
  display: flex;
  flex-shrink: 0;
  height: 100%;
  align-items: center;
  /deep/ .el-input {
    width: 414px;
    > input {
      background: #eef1fa;
      border: 1px solid #eef1fa;
    }
  }
  .nav_cnt {
    height: 100%;
    margin-left: 1.26rem;
    display: flex;
    align-items: center;
    > div {
      width: 1rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      color: #a8a8c2;
    }
    @keyframes myNavAct {
      from {
        width: 50%;
        opacity: 0;
        height: 0px;
      }
      to {
        width: 80%;
        opacity: 1;
        height: 3px;
      }
    }
    > .active {
      color: #5756b3;
      &::after {
        content: '';
        width: 80%;
        height: 3px;
        background: #5756b3;
        position: absolute;
        bottom: 0px;
        border-radius: 2px;
        animation: myNavAct 0.5s;
        // transition: all 0.3;
      }
    }
  }
  .share{
    margin-left: 2rem;
    img{
      width: 0.28rem;
      height: 0.28rem;
    }
  }
}
.header_user_right {
  display: flex;
  align-items: center;
  cursor: pointer;
  > img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 8px;
  }
  > div {
    margin-right: 10px;
    > div:nth-of-type(1) {
      font-size: 14px;
      font-weight: 600;
      color: #171725;
    }
    > div:nth-of-type(2) {
      font-size: 10px;
      font-weight: 400;
      color: #92929d;
    }
  }
  > i {
    font-size: 18px;
  }
}
</style>
