import { details, boutique } from '@/api/meigao.js'
import { Message } from 'element-ui'
const mixin = {
  data() {
    return {
      loding: true,
      tofels: '',
      userData: {
        accessory: [],
        all_applications: [],
        id: '',
        info: {},
        other_applications: [],
        school: {},
        score: [],
        students_background: [],
        train_information: []
      },
      score: [],
      schoolData: null,
      num: 0,
      flag: false,
      boutique: false // 设置精品案例
    }
  },
  created() {
  },
  methods: {
    tios() {
      var doms2 = document.getElementsByClassName('el-message')[0]
      if (doms2 == undefined) {
        Message.error({
          message: '无权限，请联系顾问老师！'
        })
      }
    },
    getDetails(urlId) {
      const that = this
      details({ id: urlId }).then(res => {
        that.loding = false
        that.flag = true
        console.log(res.data)
        that.userData = res.data

        // 有无成绩
        if (res.data.score.TOEFL) {
          that.tofels = res.data.score.TOEFL
        } else {
          that.tofels = {
            color: '#FF808B',
            edit: [{}, {}, {}, {}],
            name: 'TOEFL',
            score: '0',
            total: '120'
          }
        }

        that.boutique = Boolean(that.userData.info.isBoutique)
        Object.keys(res.data.score).forEach((item, index) => {
          if (index < 4) {
            res.data.score[item].name = item
            that.score.push(res.data.score[item])
          }
        })
        res.data.other_applications.forEach((item, index) => {
          const i = index + 1
          item.className = 'img' + i
          // 随机赋值类名
        })
        that.schoolData = res.data.all_applications
      })
    },
    isBoutique() {
      const that = this
      that.boutique = !that.boutique
      if (!that.boutique) {
        that.num = 0
      } else {
        that.num = 1
      }
      boutique({ id: that.$route.query.id, boutique: that.num })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          alert(err)
        })
    },
    goDetails(item, index) {
      if (index == 0) {
        return 0
      } else {
        const details = this.$router.resolve({
          path: '/meigao/details',
          query: { id: item.id }
        })
        window.open(details.href, '_blank')
      }
    }
  }
}
export default mixin
