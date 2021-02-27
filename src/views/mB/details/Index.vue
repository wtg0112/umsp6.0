<template>
  <div style="background-color: #F2F5F6;" v-if="flag">
    <!-- <img src="../image/home/niu.gif" class="niu" :class="niu ? 'on' : ''" alt=""> -->
    <div class="content top">
      <div class="box clearfix">
        <div class="fl">
          <img src="../image/details/i1.png" alt="" />
          <p>就读高中｜转学大学</p>
          <span>{{
            userData.school.senior_high_school
              ? userData.school.senior_high_school
              : '-'
          }}｜{{
              userData.school.regular_college_course ? userData.school.regular_college_course : '-'
            }}</span>
        </div>
        <div class="fl">
          <img src="../image/details/i2.png" alt="" />
          <p>申请学位｜申请专业</p>
          <span
            >{{
              userData.info.ApplyDegree ? userData.info.ApplyDegree : '-'
            }}｜{{
              userData.info.AppliMajor ? userData.info.AppliMajor : '-'
            }}</span
          >
        </div>
        <div class="fl">
          <img src="../image/details/i3.png" alt="" />
          <p>申请国家｜申请院校</p>
          <span
            >{{ userData.info.sqgj ? userData.info.sqgj : '-' }}｜{{
              userData.info.AppliSchool ? userData.info.AppliSchool : '-'
            }}</span
          >
        </div>
        <div class="fl">
          <img src="../image/details/i4.png" alt="" />
          <p>是否面试｜是否入学</p>
          <span
            >{{
              userData.info.isinterview_singlebox == ''
                ? '-'
                : userData.info.isinterview_singlebox
            }}｜{{
              userData.info.isentrance_singlebox == ''
                ? '-'
                : userData.info.isentrance_singlebox
            }}</span
          >
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
            <span
              >{{ userData.info.AppliSchool }}（{{
                userData.info.AppliSchoolE
              }}）</span
            >
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
                院校教授：{{
                  userData.info.js_name && userData.info.js_name != ''
                    ? userData.info.js_name
                    : '-'
                }}
              </span>
            </div>
            <div class="btn">
              Follow
            </div>
          </div>
          <template v-if="score && score.length != 0">
            <div class="con clearfix">
              <div
                v-for="(item, index) in score"
                :key="index"
                :class="[item.edit.length > 1? item.edit[1].value != ''? '': 'on': 'on',active(index)]"
                class="fl"
                @click="chooseIn(index, onShow(item.edit))"
              >
                <p>
                  {{ item.score ? item.score : '' }}
                </p>
                <span>{{item.name}}</span>
                <div class="hidden" v-if="onShow(item.edit)" @click.stop>
                  <em @click="exit"></em>
                  <p>{{item.name}}</p>
                  <span class="grade">
                    <b>{{ item.score }}</b>
                    分
                  </span>
                  <div class="con clearfix">
                    <div
                      class="fl"
                      v-for="(item1, index1) in item.edit"
                      :key="index1"
                    >
                      <p>{{ item1.value }}分</p>
                      <div
                        :style="
                          'height: ' +
                            (item1.value / item.score) * 1.8 +
                            'rem;'
                        "
                      ></div>
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
          <div class="fl">
            <img src="../image/details/bolang.gif" alt="" />
            <div class="con">
              <div class="head">
                <div class="img">
                  <img :src="'http://' + schoolData[act1].schoolbadge_img" alt="" />
                </div>
                <p>{{ schoolData[act1].AppliSchool }}</p>
                <span>{{ schoolData[act1].AppliSchoolE }}</span>
              </div>
              <span>
                {{ schoolData[act1].schooldescrip_textblock }}
              </span>
              <b>{{ schoolData[act1].gluqu }}</b>
              <em>官方录取率</em>
            </div>
            <p>{{ schoolData[act1].zluqu }}</p>
            <span>我们的录取率</span>
          </div>
          <div class="fr">
            <div class="fr_title">其他录取</div>
            <div class="img">
              <img src="../image/details/map.png" alt="" class="map" />
              <div
                class="img"
                :class="[act1 == index ? 'on' : '', item.className]"
                v-for="(item, index) in schoolData"
                :key="index"
                @click="goDetails(item,index)"
              >
                <div>
                  <img :src="'http://' + item.schoolbadge_img" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content bg">
      <div class="box clearfix">
        <div class="fl">
          <div class="head">
            <span>背景项目类别</span>
            <span>项目名称</span>
          </div>
          <template v-if="userData.students_background.length > 0">
            <div class="con">
              <div
                v-for="(item, index) in userData.students_background"
                :key="index"
                class="clearfix"
              >
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
        <div class="fr">
          <div class="head">
            <span>申请文件</span>
          </div>
          <template v-if="userData.accessory.length > 0">
            <div class="con">
              <div
                v-for="(item, index) in userData.accessory"
                :key="index"
                class="clearfix"
              >
                <span>
                  <div class="img">
                    <img src="../image/details/file.png" alt="" />
                  </div>
                  <span :class="{huise:item.not_show==1}">{{ item.name }}</span>
                </span>
                <a v-if="item.not_show==0" :href="item.pathDir"  target="_blank">查看</a>
                <a v-else class="huise"  href="javascript:;"  target="_blank">查看</a>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="con">
              <p><span>暂无数据</span></p>
            </div>
          </template>
        </div>
        <div class="fc fr">
          <div class="head">
            <span>考培信息</span>
          </div>
          <template v-if="userData.train_information.length > 0">
            <div class="con">
              <div class="clearfix">
                <span>
                  <div class="img">
                    <img src="../image/details/check.png" alt="" />
                  </div>
                  <span>{{ item }}</span>
                </span>
                <!-- <em>查看</em> -->
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
  data () {
    return {
      act: null,
      niu: false,
      act1: 0,
      show: false // 控制弹框显隐
    }
  },
  created () {
    this.getDetails(this.$route.query.id) // 获取接口传id
    // this.getDetails('0ecXOYipehnW') // 测试
  },
  mounted () {
    const that = this
    setTimeout(() => {
      that.niu = true
    }, 5000)
  },
  methods: {
    chooseIn (index, isOk) {
      console.log(index, isOk)
      // 弹框显示
      if (isOk) {
        this.act = index
        this.show = !this.show
      }
    },
    exit () {
      // 弹框隐藏按钮
      this.show = false
    },
    openFile (url) {
      window.open(url, '_blank')
    }
  },
  computed: {
    onShow () {
      // 显示是否可点击显示弹框
      return function (node) {
        console.log(node)
        return node.length > 1 ? (node[1].value != '' ? 1 : 0) : 0
      }
    },
    active () {
      // 绑定监听类名变化
      const that = this
      return function (index) {
        console.log(index)
        return index == that.act && that.show ? 'active' : ''
      }
    }
  }
}
</script>
<style scoped lang="scss">
@keyframes hide_opacity{
  0%{
    opacity: 1;
  }
  99%{
    opacity: 0;
  }
  100%{
    z-index: 0;
    display: none;
  }
}
.niu{
    width: 2.6rem;
    position: fixed;
    bottom: 0.1rem;
    left: .6rem;
    opacity: 0;
    animation: show_opacity .8s 1;
    animation-fill-mode: forwards;
    z-index: 1000;
    &.on{
      animation: hide_opacity 1s 1;
      animation-fill-mode: forwards;
    }
}
p {
  margin: 0;
}
@import './mixin';
</style>
