<template>
  <div>
    <div class="con">
      <div class="logo">
        <img src="./image/logo.png" alt="">
      </div>
      <div class="menu">
        <span :class="active1(index)" @click="tabRoute(index)" v-for="(item, index) in list" :key="index">
          <router-link :to="item.url">
            <img :src="act == index ? item.pic_on : item.pic" alt="">
          </router-link>
        </span>
      </div>
      <div class="user">
        <!-- 分享权限判断 -->
        <div class="share" v-if="share" @click="box1Flag=true">
          <img src="./image/share.png" alt="">
        </div>
        <div class="portrait">
          <img :src="touxiang" alt="">
          <!-- <img src="./image/logo.png" alt=""> -->
        </div>
        <img src="../../views/mB/image/home/exit.png" class="exit" alt="" @click="exit">
      </div>
      <div class="up_Share" v-if="box1Flag" @click.self="reset();box1Flag=false">
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
      <div class="up_Share" v-if="box2Flag" @click.self="reset();box2Flag=false">
          <div class="up_Share_box1 box2" >
            <img src="./image/queren.png" alt="">
            <div class="title">分享页面</div>
            <div class="inp">
              <p>分享链接</p>
              <el-input v-model.number="kh_url" placeholder=""></el-input>
            </div>
            <el-button type="primary" v-clipboard:copy="kh_url"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">复制链接去分享</el-button>
            <p>您的链接已经生成,该链接有效期为{{kh_day==''?3:kh_day}}天,最多可以查看{{kh_day==''?50:kh_day}}个案例库</p>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import cookies from '@/utils/cookie.js'
import { getShareCode } from '@/api/meiben.js'
export default {
  props: ['list'],
  data () {
    return {
      act: 0,
      touxiang: null,
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
  created () {
    const that = this
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
    // console.log('share', this.share)
    // 判断路由
    try { // 使用抛出异常来停止foreach循环
      that.list.forEach((item, index) => {
        if (url3 == item.url) {
          this.act = index
          throw new Error('EndInterative')
        } else {
          this.act = 4
        }
      })
    } catch {

    }
  },
  computed: {
    active1 () {
      return function (index) {
        return this.act == index ? 'active' : ''
      }
    }
  },
  methods: {
    tabRoute (index) {
      this.act = index
    },
    exit () {
      cookies.remove('token')
      cookies.remove('isLogin')
      cookies.remove('mobile')
      cookies.remove('name')
      cookies.remove('touxiang')
      cookies.remove('id')
      this.$router.push({ path: '/login?source=' + cookies.get('source') })
    },
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
    }
  },
  mounted () {
    // if (!cookies.get('isLogin')) {
    //   this.$router.push({ path: '/login?source=usabk' })
    // }
    const that = this
    setTimeout(() => {
      that.niu = true
    }, 5000)
  }
}
</script>
<style scoped lang="scss">
.con{
  width: 1rem;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #FFFFFF;
  z-index: 999;
  box-shadow: 0px 0px 0.32rem 0px rgba(81, 120, 204, 0.14);
  .up_Share{
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.2);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    .up_Share_box1{
      width: 5.01rem;
      height: 5.2rem;
      background: #EFF1FA;
      box-shadow: .04rem .16rem .52rem .01rem rgba(111, 143, 234, 0.06);
      border-radius: .1rem;
      background: url('./image/back.png') center center no-repeat;
      background-size:100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .title{
        font-size: .24rem;
        font-weight: bold;
        color: #2C2C6B;
      }
      .inp{
        width: 80%;
        margin-top: .2rem;
        p{
          font-size: .14rem;
          font-weight: 600;
          color: #252631;
          margin-bottom: 0.1rem;
        }
      }
      .el-button{
        width: 80%;
        height: .46rem;
        margin-top: 0.4rem;
        background-color: #5E81F4;
        font-size: .14rem;
        font-weight: 400;
        color: #FFFFFF;
        &:active{
          opacity: 0.8;
        }
        // border-color: #5E81F4;
      }
    }
    .box2{
      img{
        width: 0.7rem;
        height: 0.7rem;
        margin-bottom: 0.08rem;
      }
      >p{
        font-size: .14rem;
        font-weight: 400;
        color: #98A9BC;
        margin-top: 0.7rem;
      }
    }
  }
  .logo{
    width: 0.52rem;
    height: 0.52rem;
    background: #FFFFFF;
    border: 1px solid #F3F3F3;
    border-radius: 50%;
    position: absolute;
    top: 0.27rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: .28rem;
    }
  }
  .menu{
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    align-items: center;
    padding: 0.9rem 0;
    span{
      color: #383874;
      text-align: center;
      font-size: 0.2rem;
      position: relative;
      display: block;
      margin-bottom: 0.5rem;
      cursor: pointer;
      a{
        text-decoration: none;
        color: #383874;
        img{
          width: 0.28rem;
          height: 0.28rem;
          display: block;
          margin: 0 auto;
        }
      }
      &::before{
        content: '';
        position: absolute;
        left: -0.06rem;
        top: 50%;
        transform: translateY(-50%);
        width: 0.06rem;
        height: 0.51rem;
        background: #8576FF;
        border-radius: 0px 0.04rem 0.04rem 0px;
        transition: all .6s;
      }
      &:hover{
        font-weight: bold;
      }
      &.active{
        font-weight: bold;
        &::before{
          content: '';
          left: 0;
        }
      }
    }
  }
  .user{
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    bottom: 0.5rem;
    width: 100%;
    .share{
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 0.3rem;
      >img{
        width: 0.28rem;
        height: 0.28rem;
        cursor: pointer;
      }
    }
    .portrait{
      width: 0.58rem;
      height: 0.58rem;
      background: #FFFFFF;
      box-shadow: 0px 0px 0.13rem 0px #E8E7FC;
      border-radius: 0.1rem;
      margin: 0 auto;
      position: relative;
      margin-bottom: 0.5rem;
      overflow: hidden;
      box-sizing: border-box;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        box-shadow: 0px 0px 0.13rem 0px #E8E7FC;
      }
    }
    .exit{
      width: 0.24rem;
      height: 0.24rem;
      border-radius: 50%;
      display: block;
      margin: 0 auto;
      cursor: pointer;
    }
  }
}
</style>
