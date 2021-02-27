<template>
  <div style="background-color: #F2F5F6;" v-if="flag">
    <!-- <img src="../image/home/niu.gif" class="niu" :class="niu ? 'on' : ''" alt=""> -->
    <div class="content top">
      <div class="box clearfix">
        <div class="fl">
          <img src="../image/details/i1.png" alt="" />
          <p>毕业院校</p>
          <span>{{
              userData.info.GraduateSchool ? userData.info.GraduateSchool : '-'
            }}</span>
        </div>
        <div class="fl">
          <img src="../image/details/i2.png" alt="" />
          <p>申请学位｜海外背景</p>
          <span>{{
              userData.info.ApplyDegree ? userData.info.ApplyDegree : '-'
            }}｜{{
              userData.info.IsHaiwai ? userData.info.IsHaiwai : '-'
            }}</span>
        </div>
        <div class="fl">
          <img src="../image/details/i3.png" alt="" />
          <p>申请国家｜申请院校</p>
          <span>{{ userData.info.sqgj ? userData.info.sqgj : '-' }}｜{{
              userData.info.AppliSchool ? userData.info.AppliSchool : '-'
            }}</span>
        </div>
        <div class="fl">
          <img src="../image/details/i4.png" alt="" />
          <p>是否面试｜是否入学</p>
          <span>{{
              userData.info.isinterview_singlebox == ''
                ? '-'
                : userData.info.isinterview_singlebox
            }}｜{{
              userData.info.isentrance_singlebox == ''
                ? '-'
                : userData.info.isentrance_singlebox
            }}</span>
        </div>
      </div>
    </div>
    <div class="content user">
      <div class="box clearfix">
        <div class="fl">
          <div class="head">
            <div class="img" :class="boutique ? '' : 'on'">
              <div>
                <img :src="userData.info.touxiang" alt="" />
              </div>
              <i @click="isBoutique"></i>
            </div>
            <p>{{ userData.info.khname }}</p>
            <span>{{ userData.info.AppliSchool }}（{{
                userData.info.AppliSchoolE
              }}）</span>
            <div class="info">
              <span>
                客户性别：{{
                  userData.info.sex_singlebox
                    ? userData.info.sex_singlebox
                    : '-'
                }}
              </span>
              <span>
                所在省份：{{
                  userData.info.ProvName ? userData.info.ProvName : '-'
                }}
              </span>
              <span>
                所在市区：{{
                  userData.info.CityName ? userData.info.CityName : '-'
                }}
              </span>
              <span>
                申请时间：{{
                  userData.info.time_of_application
                    ? userData.info.time_of_application
                    : '-'
                }}
              </span>
              <span>
                是否录取：{{
                  userData.info.IsLuqu && userData.info.IsLuqu != ''
                    ? userData.info.IsLuqu
                    : '-'
                }}
              </span>
            </div>
            <div class="btn">
              Follow
            </div>
          </div>
          <template v-if="score">
            <div class="con clearfix">
              <div v-for="(item, index) in score" :key="index" :class="[
                  item.edit
                    ? item.edit[1].value != ''
                      ? ''
                      : 'on'
                    : 'on',
                  active(index)
                ]" class="fl" @click="chooseIn(index, onShow(item.edit))">
                <p>
                  {{ item.score ? item.score : '' }}
                </p>
                <span>{{item.name}}</span>
                <div class="hidden" v-if="onShow(item.edit?item.edit:'')" @click.stop>
                  <em @click="exit"></em>
                  <p>{{item.name}}</p>
                  <span class="grade">
                    <b>{{ item.score }}</b>
                    分
                  </span>
                  <div class="con clearfix">
                    <div class="fl" v-for="(item1, index1) in item.edit" :key="index1">
                      <p>{{ item1.value }}分</p>
                      <div :style="
                          'height: ' +
                            (item1.value / item.score) * 1.8 +
                            'rem;'
                        "></div>
                      <span>{{ item1.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="con clearfix">
              -
            </div>
          </template>
        </div>
        <div class="fr clearfix">
          <div class="fr">
            <div class="fr_title"><em></em>申请信息</div>
            <div class="fr_b">
              <div class="left"></div>
              <div class="right">申请文件名</div>
            </div>
            <div class="bigbox">
              <div class="bigbox_school">
                <template v-if="userData.all_applications">
                  <div class="bigbox_school_con">
                    <div v-for="(item, index) in userData.all_applications" :key="index" class="items">
                        <!-- <img src="../image/details/file.png" alt="" /> -->
                        <span>●</span>{{ item.AppliSchool }}
                        <!-- <div class="luqu" >录</div> -->
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="con">
                    <p><span>暂无数据</span></p>
                  </div>
                </template>
              </div>
              <div class="bigbox_file">
                <template v-if="userData.accessory">
                  <div class="bigbox_file_con">
                    <div v-for="(item, index) in userData.accessory" :key="index" class="items">
                      <span>
                        <div class="img">
                          <img src="../image/details/file.png" alt="" />
                        </div>
                        <span :class="{huise:item.not_show==1}">{{ item.name }}</span>
                      </span>
                      <a v-if="item.not_show==0" :href="item.pathDir"  target="_blank">查看</a>
                      <a v-else class="huise"  href="javascript:void(0)"  @click="tios()">查看</a>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="con">
                    <p><span>暂无数据</span></p>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content bg">
      <div class="box clearfix">
        <div class="boxfl fl sqxm">
          <div class="head">
            <span>项目数量</span>
            <span>背景项目类别</span>
            <span>项目名称</span>
          </div>
          <template v-if="userData.students_background">
            <div class="con">
              <div v-for="(item, index) in userData.students_background" :key="index" class="clearfix">
                 <span>
                  项目{{index+1}}
                </span>
                <span>
                  <em>{{ item.pk_sys_custom_entity_type_1 }}</em>
                </span>
                <span>
                  <span>
                    {{ item.name }}
                  </span>
                </span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="con">
              <p><span>暂无数据</span></p>
            </div>
          </template>
        </div>
        <!-- <div class="boxfl fr">
          <div class="head">
            <span>申请文件</span>
          </div>
          <template v-if="userData.accessory">
            <div class="con">
              <div v-for="(item, index) in userData.accessory" :key="index" class="clearfix">
                <span>
                  <div class="img">
                    <img src="../image/details/file.png" alt="" />
                  </div>
                  <span>{{ item.name }}</span>
                </span>
                <a :href="item.pathDir" target="_blank">查看</a>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="con">
              <p><span>暂无数据</span></p>
            </div>
          </template>
        </div> -->
        <div class="box_fr fl" style="height:3.84rem">
          <div class="flexsb">
            <div class="flex_fl">
              <div class="tofel_title">TOEFL</div>
              <div class="score">
                <div class="eight"><strong>{{tofels.score}}</strong><span>分</span></div>
              </div>
              <img src="../image/details/gupiao.png" class="tofel_btm" alt="">
            </div>
            <div class="flex_fr">
              <div class="lengjing">
                <template v-for="(item,index) in tofels.edit">
                  <div class="pillars" :key="index" :title="item.name+item.value">
                    <div class="caseing"></div>
                    <div class="bgcs" :style="{height:item.value+'px'}"></div>
                    <div class="title">{{item.name}}</div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="boxfl fc fr">
          <!-- <div class="head">
            <span>考培信息</span>
          </div> -->
          <template  v-for="(item,index) in userData.train_information">
            <div class="con" :key="index" v-if="userData.train_information.length > 0" >
              <div class="clearfix">
                <span>
                  <div class="img">
                    <img src="../image/details/check.png" alt="" />
                  </div>
                  <span>{{item}}</span>
                </span>
              </div>
            </div>
          </template>
          <template>
            <div class="con">
              <p><span>暂无数据</span></p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from './details'
export default {
  mixins: [mixin],
  data() {
    return {
      act: null,
      niu: false,
      act1: 0,
      school: [
        {}
      ],
      show: false // 控制弹框显隐
    }
  },
  created() {
    // this.getDetails(this.$route.query.id) // 获取接口传id
    const id = this.$route.query.id
    this.getDetails(id) // 测试
  },
  mounted() {
    const that = this
    setTimeout(() => {
      that.niu = true
    }, 5000)
  },
  methods: {
    chooseIn(index, isOk) {
      console.log(index, isOk)
      // 弹框显示
      if (isOk) {
        this.act = index
        this.show = !this.show
      }
    },
    exit() {
      // 弹框隐藏按钮
      this.show = false
    },
    openFile(url) {
      window.open(url, '_blank')
    }
  },
  computed: {
    onShow() {
      // 显示是否可点击显示弹框
      return function (node) {
        return node.length > 1 ? (node[1].value != '' ? 1 : 0) : 0
      }
    },
    active() {
      // 绑定监听类名变化
      const that = this
      return function (index) {
        return index == that.act && that.show ? 'active' : ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.user .box > .fr .fr{
  width: 100%!important;
}
.pillars{
  position: relative;
  .bgcs{
    position: absolute;
    bottom: .3rem;
    left: .72rem;
    width: .31rem;
    // height: 20px;
    background: #464DE4;
  }
}
.flexsb {
      display: flex;
    .flex_fr {
      .lengjing{
        display: flex;
        margin-top: 1rem;
        .caseing {
          width: .31rem;
          height: 1.81rem;
          background: #eef2f5;
          margin-left: .72rem;
        }
        .title{
          margin:.1rem 0 0 .72rem;
        }
      }

    }
}
.box_fr {
  position: relative;
  .score {
    .eight {
      margin: 1rem 0 0 1.5rem;
      strong {
        font-size: .48rem;
        font-weight: bold;
        color: #383874;
      }
      span {
        font-size: .14rem;
        font-weight: 400;
        color: #383874;
      }
    }
  }
  .tofel_title {
    font-size: .24rem;
    font-weight: bold;
    color: #383874;
    margin: .62rem 0 0 .4rem;
  }
  .tofel_btm {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 3.58rem;
    height: 1.38rem;
  }
}
@keyframes hide_opacity {
  0% {
    opacity: 1;
  }
  99% {
    opacity: 0;
  }
  100% {
    z-index: 0;
    display: none;
  }
}
.niu {
  width: 2.6rem;
  position: fixed;
  bottom: 0.1rem;
  left: 0.6rem;
  opacity: 0;
  animation: show_opacity 0.8s 1;
  animation-fill-mode: forwards;
  z-index: 1000;
  &.on {
    animation: hide_opacity 1s 1;
    animation-fill-mode: forwards;
  }
}
p {
  margin: 0;
}
@import './mixin';
</style>
