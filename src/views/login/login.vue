<template>
  <div class="login">
    <div class="login_background">
      <video
        id="video"
        class="login_background_video"
        src="http://1256778600.vod2.myqcloud.com/b4a3a504vodbj1256778600/b9b57e235285890806001893060/lvQdFi07rxUA.mp4"
        loop="loop"
        muted
        autoplay
      ></video>
    </div>
    <div v-show="flag" class="login_cnt">
      <div
        class="login_left_content animate__animated animate__bounceInDown animate__fast"
      >
        <img class="icon" src="./image/zhanghu.png" alt="" @click="flag=!flag">
        <img
          src="./image/haicelogo.png"
          class="logo animate__animated animate__bounceInDown animate__delay-0.5s"
          alt=""
        />
        <div class="er-code">
          <div id="login_container"></div>
        </div>
      </div>
    </div>
    <div v-show="!flag" class="login_cnt">
      <div
        class="login_left_content animate__animated animate__bounceInDown animate__fast"
      >
        <img class="icon" src="./image/erweima.png" alt="" @click="flag=!flag">
        <img
          src="./image/haicelogo.png"
          class="logo animate__animated animate__bounceInDown animate__delay-0.5s"
          alt=""
        />
        <div class="btn">
          <div>
            <div>请输入您的账号</div>
            <el-input
              v-model="user"
              placeholder="请输入账号"
              class="login_input"
              maxlength='11'
              clearable
            >
            </el-input>
          </div>
          <div>
            <div>请输入您的密码</div>
            <el-input
              type="password"
              v-model="password"
              placeholder="请输入密码"
              class="login_input"
              show-password
              maxlength='6'
              clearable
            >
            </el-input>
          </div>
        </div>
        <div class="btn_login" @click="login">
          <div>Let’s start finding data now</div>
          <div class="el-icon-arrow-right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
/* eslint-disable */
import { AccountLogin,Login } from '@/api/login.js'
import axios from 'axios'
import cookies from '@/utils/cookie'
import md5 from 'js-md5'
export default {
  data () {
    return {
      // memory: false,
      user: '',
      password: '',
      flag: true
    }
  },
  created(){
    
  },
  mounted () {
    const that = this;
    this.videoPlay()
    this.getcode()
    if(this.$route.query.code){
      // 日本jp 美本usamk 美研usamy
      const source = this.$route.query.state
      AccountLogin({code:this.$route.query.code,login:1}).then(res=>{
          cookies.set('isLogin', true);
          cookies.set('token', res.data.token);
          cookies.set('name', res.data.name);
          cookies.set('mobile', res.data.mobile);
          cookies.set('id', res.data.id);
          cookies.set('touxiang', res.data.avatar);
          //顾问登录成功清楚被分享者标记
          cookies.remove('share')
          if(source=='jp'){
            that.$router.push({ path:'/japan'})
          }else if(source=='usabk'){
            that.$router.push({ path:'/meiben'})
          }else if(source=='usamy'){
            that.$router.push({ path:'/meiyan'})
          }else if(source=='usagz'){
            that.$router.push({ path:'/meigao'})
          }else if(source=='uk'){
            that.$router.push({ path:'/yingguo'})
          }else if(source=='kaopei'){
            that.$router.push({ path:'/kaopei'})
          }else{
            //没有传参默认进入日本
            that.$router.push({ path:'/japan'})
          }
        })
    }
  },
  methods: {
    getcode(){
        const that = this;
        // var url = window.location.href
        var source = this.$route.query.source
        var url = encodeURIComponent(`${window.location.origin}/#/login`)
        var appid = 'dingoautmaa9bpk9vnldvh'
        var goto = encodeURIComponent(
          `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}`,
        )
        var obj = DDLogin({
          id: 'login_container', // 这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
          goto: goto, // 请参考注释里的方式
          style: 'border:none;background-color:#FFFFFF;',
          width : "325",
          height: "291"
        })
        var handleMessage = function (event) {
          var origin = event.origin;
          if (origin == 'https://login.dingtalk.com') {
            var loginTmpCode = event.data
            if(loginTmpCode){
              // // console.log("loginTmpCode", loginTmpCode);
              let u = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoautmaa9bpk9vnldvh&response_type=code&scope=snsapi_login&state=${source}&redirect_uri=${url}&loginTmpCode=${loginTmpCode}`
              window.location.href = u;
            }
          }
        }
        if (typeof window.addEventListener != 'undefined') {
          window.addEventListener('message', handleMessage, false)
        } else if (typeof window.attachEvent != 'undefined') {
          window.attachEvent('onmessage', handleMessage)
        }
    },
    videoPlay(){
      var that = this;
      var video = document.getElementById('video');
      video.addEventListener('canplay', function (e) {

      });
      video.oncanplay = function () {
        video.play()
      };
    },
     login() {
       const that = this;
      if (this.user == "") {
        this.$message({
          message: "用户名不能为空",
          offset: 80
        });
      } else if (this.password == "") {
        this.$message("密码不能为空");
      } else {
        // const loading = this.$loading({
        //   lock: true,
        //   text: "Loading",
        //   spinner: "el-icon-loading",
        //   background: "rgba(0, 0, 0, 0.7)"
        // });
        Login({
          mobile: this.user,
          password: md5(this.password)
        }).then(res => {
          
          if (res.code == 200) {
            var source = this.$route.query.source
            cookies.set('isLogin', true);
            cookies.set('token', res.data.token);
            cookies.set('name', res.data.name);
            cookies.set('mobile', res.data.mobile);
            cookies.set('id', res.data.id);
            cookies.set('touxiang', res.data.avatar);
            //顾问登录成功清楚被分享者标记
            cookies.remove('share')
            if(source=='jp'){
              that.$router.push({ path:'/japan'})
            }else if(source=='usabk'){
              that.$router.push({ path:'/meiben'})
            }else if(source=='usamy'){
              that.$router.push({ path:'/meiyan'})
            }else if(source=='usagz'){
              that.$router.push({ path:'/meigao'})
            }else if(source=='uk'){
              that.$router.push({ path:'/yingguo'})
            }else if(source=='kaopei'){
              that.$router.push({ path:'/kaopei'})
            }else{
              //没有传参默认进入日本
              that.$router.push({ path:'/japan'})
            }
          } else {
            loading.close();
            this.$message.error({
              message: res.msg,
              center: true
            });
          }
        });
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.login_background {
  width: 100%;
  height: 100%;
  position: absolute;
  /* background: #5E81F4; */
}
.login_background_video {
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
}
.login_cnt {
  width: 1200px;
  height: 100%;
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.header {
  width: 100%;
  height: 68px;
  position: absolute;
  top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > img {
    height: 35px;
  }
  > div {
    width: 246px;
    height: 68px;
    background: rgba(255, 255, 255, 1);
    border-radius: 34px;
    border: 1px solid rgba(233, 235, 239, 1);
  }
}
.login_left_content {
  width: 535px;
  height: 550px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  padding: 0px 30px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login_left_content > .icon {
  height: 30px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.login_left_content > .logo {
  height: 62px;
  margin-top: 40px;
  margin-bottom: 40px;
}
.login_left_content > .er-code {
  width: 325px;
  height: 325px;
  text-align: center;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login_left_content > .btn {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}
.login_left_content > .btn > div {
  margin-top: 35px;
  font-size: 14px;
  color: rgba(129, 129, 165, 1);
}
.login_left_content > .btn > div > div:nth-child(1) {
  font-size: 16px;
  color: #28272e;
  margin-bottom: 14px;
}
.login_left_content > .btn > div > .login_input {
  height: 50px;
}

.btn_login {
  width: 100%;
  height: 68px;
  position: absolute;
  bottom: 0;
  left: 0px;
  border-radius: 0px 0px 5px 5px;
  background: #5e81f4;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
}
.btn_login > div {
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
}
</style>
<style>
.login .el-input__inner {
  border: none;
  padding: 0;
}
.login_left_content > .btn > div > .login_input > .el-input__inner {
  height: 100%;
  padding: 0;
  padding-left: 20px;
}
</style>