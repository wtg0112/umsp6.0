import { WOW } from 'wowjs'
const mixin = {
  data () {

  },
  mounted () {
    var wow = new WOW({
      boxClass: 'wow', // 绑定class
      animateClass: 'animated',
      offset: 0, // 距离可视区多少执行动画
      mobile: true, // 是否在移动设备上执行动画
      live: true // 异步加载的内容是否有效
    })
    wow.init()
  },
  methods: {
    goList (name, value) {
      this.$router.push({ path: `/japan/case?${name}=${value}` })
    },
    goDetails (item) {
      // console.log(item)
      const { href } = this.$router.resolve(
        '/japan/details?userid=' +
        item.id
      )
      window.open(href, '_blank')
    },
    growPercent (cent, time) {
      const that = this
      that.options1.percentage = 0 // 进度条置零
      let add = 0
      const old = cent // 存放进度
      setTimeout(() => { // 设置延时器控制动画进行
        const setInter = setInterval(() => {
          if (add >= old) { // 达到目标点后清除定时器
            clearInterval(setInter)
          } else {
            add += 1
            that.options1.percentage = add // 累加并赋值，实现过渡效果
          }
        }, 30)
      }, time)
    } // 进度条加载过渡实现
  },
  computed: {
    classOption () {
      return {
        step: 0.3, // 数值越大速度滚动越快
        // limitMoveNum: 5, // 开始无缝滚动的数据量  //this.fourDatata.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  }
}
export default mixin
