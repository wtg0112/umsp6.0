<template>
  <div class="details" style="background-color: #FAFAFB;" v-show="flag" >
    <Header></Header>
    <div>
      <div class="content top">
        <div class="box clearfix">
          <div class="fl">
            <img src="./image/i1.png" alt="" />
            <p>申请院校</p>
            <span>{{userData.info.AppliSchool|empty}}</span>
          </div>
          <div class="fl">
            <img src="./image/i2.png" alt="" />
            <p>申请专业</p>
            <span>{{userData.info.AppliMajor|empty}}</span>
          </div>
          <div class="fl">
            <img src="./image/i3.png" alt="" />
            <p>申请项目</p>
            <span>{{userData.info.major_branch_name | empty}}</span>
          </div>
          <div class="fl">
            <img src="./image/i4.png" alt="" />
            <p>本科专业</p>
            <span>{{userData.school.regular_college_course_major | empty}}</span>
          </div>
          <div class="fl">
            <img src="./image/i5.png" alt="" />
            <p>本科院校</p>
            <span>{{userData.school.regular_college_course | empty}}</span>
          </div>
        </div>
      </div>
      <div class="content user">
        <div class="box clearfix">
          <div class="fl">
            <div class="head">
              <img :src="userData.info.touxiang" alt="" class="user">
              <p>{{userData.info.khname | empty}}</p>
              <span v-if="userData.info.ApplyDegree=='博士'">{{userData.info.sqgj|empty}}·{{userData.info.ApplyDegree| empty}}·{{userData.info.AppliSchool| empty}}</span>
              <span v-else>{{userData.info.AppliSchool| empty}}</span>
              <div class="clearfix">
                <div class="fl">
                  <p>所在城市</p>
                  <span>{{userData.info.ProvName|empty}} · {{userData.info.CityName|empty}}</span>
                </div>
                <div class="fl">
                  <p>申请时间</p>
                  <span>{{userData.info.new_ApplyYear==''||userData.info.new_ApplyYear==null?'—':userData.info.new_ApplyYear+'年'}} · {{userData.info.new_ApplySeason|empty}}</span>
                </div>
                <div class="fl">
                  <p>奖学金</p>
                  <span>{{userData.info.scholarship|empty}}</span>
                </div>
                <div class="fl">
                  <p>国外本科院校</p>
                  <span>{{userData.school.gwbk_university|empty}}</span>
                </div>
                <!-- 博士 -->
                <div class="fl" v-if="userData.info.ApplyDegree=='博士'">
                  <p>研究生院校</p>
                  <span>{{userData.school.graduate_student|empty}}</span>
                </div>
                <!-- 硕士 -->
                <div class="fl" v-else>
                  <p>申请学位</p>
                  <span>{{userData.info.sqgj|empty}}·{{userData.info.ApplyDegree|empty}}</span>
                </div>
                 <!-- 博士 -->
                <div class="fl" v-if="userData.info.ApplyDegree=='博士'">
                  <p>研究生就读专业</p>
                  <span>{{userData.school.graduate_student_major|empty}}</span>
                </div>
                <!-- 硕士 -->
                <div class="fl" v-else>
                  <p>学位类型</p>
                  <span>{{userData.info.degree_type|empty}}</span>
                </div>
              </div>
              <img v-if="userData.info.IsLuqu=='录取'" src="./image/gold.png" alt="" class="anli">
              <img v-else src="./image/sliver.png" alt="" class="anli">
            </div>
            <div class="con">
              <div v-for="(item, index) in gradeData" :key="index">
                <p>{{item.score}}</p>
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
          <div class="fr clearfix">
            <div class="fl">
              <div class="head">
                <img :src="userData.info.schoolbadge_img" alt="">
                <p>{{userData.info.AppliSchoolE}}</p>
                <span>{{userData.info.AppliSchool}}</span>
              </div>
              <!-- 院校排名 -->
              <div class="con">
                <template v-if="userData.info.phb != ''">
                  <p>
                    NO.{{userData.info.phb}}
                    <!-- <em>%</em> -->
                  </p>
                </template>
                <template v-else>
                  <p>
                    - -
                  </p>
                </template>
                <span>Compared to({{userData.info.ranking_type}})</span>
                <!-- <span>{{userData.info.ranking_type}}</span> -->
                <!-- <img src="./image/shu.png" alt=""> -->
              </div>
              <!-- 专业排名 -->
              <div class="con">
                <template v-if="userData.info.major_phb != ''">
                  <p>
                    NO.{{userData.info.major_phb}}
                    <!-- <em>%</em> -->
                  </p>
                </template>
                <template v-else>
                  <p>
                    - -
                  </p>
                </template>
                <span>Compared to({{userData.info.major_phb_name}})</span>
                <!-- <span>{{userData.info.ranking_type}}</span> -->
                <!-- <img src="./image/shu.png" alt=""> -->
              </div>
              <img class="con_img" src="./image/xian.png" alt="">
              <div class="info">
                <p>其他录取</p>
                <div v-for="(item, index) in userData.other_applications" :key="index" @click="goDetails(item.id)">
                  <span>{{item.name}}</span>
                  <!-- <em>{{item.js_name == '' || !item.js_name ? '-' : item.js_name}}</em> -->
                </div>
              </div>
            </div>
            <div class="fr">
              <div class="chart" ref="chart"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="content msg">
        <div class="box clearfix">
          <div class="fl">
            <div class="head">
              <span>学生背景分类</span>
              <span>项目名称</span>
            </div>
            <div class="con">
              <template v-if="userData.students_background.length > 0">
                <div v-for="(item, index) in userData.students_background" :key="index">
                  <span>
                    <em>{{item.pk_sys_custom_entity_type_1}}</em>
                  </span>
                  <span>
                    <span :title="item.name">{{item.name}}</span>
                  </span>
                </div>
              </template>
              <template v-else>
                <div class="bg"></div>
                <p><span>暂无信息</span></p>
              </template>
            </div>
          </div>
          <div class="fr">
            <div class="head">
              <span>申请文件名</span>
            </div>
            <div class="con">
              <template v-if="userData.accessory.length > 0">
                <div v-for="(item, index) in userData.accessory" :key="index">
                  <span>
                    <img src="./image/file.png" alt="">
                  </span>
                  <span>
                    <span :class="{huise:item.not_show==1}">{{ item.name }}</span>
                  </span>
                   <a v-if="item.not_show==0" :href="item.pathDir"  target="_blank">查看</a>
                  <a v-else class="huise"  href="javascript:void(0)"  @click="tios()">查看</a>
                </div>
              </template>
              <template v-else>
                <div class="bg"></div>
                <p><span>暂无信息</span></p>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="content file">
        <div class="box clearfix">
          <div class="fl clearfix">
            <p>语言考试</p>
            <div class="fl">
              <div class="chart" ref="chart2"></div>
            </div>
            <div class="fr">
              <div>
                <div v-for="(item, index) in gradeData" :key="index" @click="acti(index)" :class="active(index)">
                  <h3>{{item.name}}考试成绩</h3>
                  <p>
                    <b>{{item.score}}</b>
                    分
                    <em>{{(item.score / item.total * 100).toFixed(2)}}% </em>
                  </p>
                  <span>Compared to ({{item.name}}考试)</span>
                </div>
              </div>
            </div>
          </div>
          <div class="fr">
            <p>考培信息</p>
            <div class="bg"></div>
            <div class="con">
              <p><span>暂无数据</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header1.vue'
import mixin from './mixin'
export default {
  mixins: [mixin],
  components: { Header },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  },
  computed: {

  },
  mounted () {
    // this.chart2()
    const id = this.$route.query.userid
    this.getDetails(id)
  },
  beforeDestroy () {

  }
}
</script>

<style scoped lang="scss">
@import './mixin'
</style>
