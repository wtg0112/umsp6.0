import { details, boutique } from '@/api/meiben.js'
const mixin = {
  data () {
    return {
      loding: true,
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
  created () {

  },
  methods: {
    getDetails (urlId) {
      const that = this
      details({ id: urlId }).then(res => {
        that.loding = false
        that.flag = true
        console.log(res.data)
        that.userData = res.data
        that.boutique = Boolean(that.userData.info.isBoutique)
        Object.keys(res.data.score).forEach((item, index) => {
          if (index < 4) {
            res.data.score[item].name = item
            that.score.push(res.data.score[item])
          }
        })
        // 取随机数函数，n:随机数的范围，m:随机数的个数
        // function randomFiveDiffNum (n, m) {
        //   var num = []
        //   for (var i = 0; i < m; i++) {
        //     num[i] = Math.floor(Math.random() * n) + 1
        //     for (var j = 0; j < i; j++) {
        //       if (num[i] == num[j]) {
        //         i--
        //       }
        //     }
        //   }
        //   return num
        // }
        // const arr = randomFiveDiffNum(6, res.data.other_applications.length)
        // console.log(arr)
        res.data.other_applications.forEach((item, index) => {
          const i = index + 1
          item.className = 'img' + i
          // 随机赋值类名
        })
        that.schoolData = res.data.other_applications
      })
    },
    isBoutique () {
      const that = this
      this.boutique = !this.boutique
      if (!this.boutique) {
        this.num = 0
      } else {
        this.num = 1
      }
      boutique({ id: that.$route.query.id, boutique: that.num }).then(res => {
        console.log(res)
      }).catch(err => {
        alert(err)
      })
    },
    goDetails (item, index) {
      if (index == 0) {
        return 0
      } else {
        const details = this.$router.resolve({ path: '/meiben/details', query: { id: item.id } })
        window.open(details.href, '_blank')
      }
    }
  }
}
export default mixin
