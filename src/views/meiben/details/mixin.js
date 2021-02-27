import { details, boutique } from '@/api/meiben.js'
import { Message } from 'element-ui'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import * as am4pluginsForceDirected from '@amcharts/amcharts4/plugins/forceDirected'
am4core.useTheme(am4themesAnimated)
const mixin = {
  data () {
    return {
      flag: false,
      boutique: false, // 设置精品案例
      userData: {
        id: '',
        info: {},
        school: {},
        other_applications: [],
        all_applications: [],
        score: {},
        students_background: [],
        accessory: []
      }, // 总数据
      case_analysis: [], // 案例解析
      gradeData: null, // 成绩
      applications: null, // 申请学校信息
      act: 0
    }
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
    getDetails (urlId) {
      const that = this
      details({ id: urlId }).then(res => {
        this.flag = true
        const grade = []
        Object.keys(res.data.score).forEach((item, index) => {
          // 将成绩项拿出来放进数组，以便循环
          res.data.score[item].name = item
          grade.push(res.data.score[item])
        })
        that.userData = res.data
        that.case_analysis = res.data.case_analysis
        that.gradeData = grade
        that.boutique = Boolean(that.userData.info.isBoutique)
        that.chart(that.userData.all_applications)
        that.chart2(parseFloat(that.gradeData[0].score), parseFloat(that.gradeData[0].total))
      })
    },
    isBoutique () {
      const that = this
      var n
      if (this.boutique) {
        n = 0
      } else {
        n = 1
      }
      boutique({ id: that.$route.query.userid, boutique: n }).then(res => {
        this.boutique = !this.boutique
      }).catch(err => {
        alert(err)
      })
    },
    goDetails (id) {
      const path = this.$route.matched[0].path
      const { href } = this.$router.resolve(`${path}/details?userid=${id}`)
      window.open(href, '_blank')
    },
    acti (index) {
      if (this.act != index) {
        this.act = index
        this.chart2(parseFloat(this.gradeData[index].score), parseFloat(this.gradeData[index].total))
      }
    },
    chart (data) {
      const chart = am4core.create(this.$refs.chart, am4pluginsForceDirected.ForceDirectedTree)
      console.log('dom', this.$refs.chart, data)
      const series = chart.series.push(new am4pluginsForceDirected.ForceDirectedSeries())
      chart.padding(0)
      chart.data = data
      // chart.data = data
      series.minRadius = 10
      series.maxRadius = 80
      series.dataFields.value = 'value'
      series.dataFields.name = 'name'
      series.dataFields.children = 'child'
      series.nodes.template.tooltipText = '{name}'
      series.nodes.template.fillOpacity = 1
      // series.maxLevels = 2
      series.nodes.template.label.text = '[bold]{name}[/]'
      series.nodes.template.label.wrap = true
      series.nodes.template.label.hideOversized = true
      series.nodes.template.label.truncate = true
      series.nodes.template.outerCircle.filters.push(new am4core.DropShadowFilter())

      series.fontSize = 14
      // 离中心的距离
      // series.centerStrength = 1.1 // 中心的吸引力
      series.manyBodyStrength = -30 // 球的吸引力
      series.links.template.strength = 2 // 线的吸引力
      // 离中心的距离
      // series.centerStrength = 1.2 // 中心的吸引力  -50至50。正值拉动，负值拉远
      series.manyBodyStrength = -50 // 球的吸引力 吸引（正值）或推开（负值）
      series.links.template.strength = 3 // 线的吸引力

      series.dataFields.color = 'color'
      series.colors.list = [
        am4core.color('#A5C7FE'),
        am4core.color('#A5E1FE'),
        am4core.color('#D3A5FE'),
        am4core.color('#9CF2F6'),
        am4core.color('#D3A5FE'),
        am4core.color('#9DA5F6')

      ]
      const hoverState = series.links.template.states.create('hover')
      hoverState.properties.strokeWidth = 3
      hoverState.properties.strokeOpacity = 1

      series.nodes.template.events.on('over', function (event) {
        event.target.dataItem.childLinks.each(function (link) {
          link.isHover = true
        })
        if (event.target.dataItem.parentLink) {
          event.target.dataItem.parentLink.isHover = true
        }
      })

      series.nodes.template.events.on('out', function (event) {
        event.target.dataItem.childLinks.each(function (link) {
          link.isHover = false
        })
        if (event.target.dataItem.parentLink) {
          event.target.dataItem.parentLink.isHover = false
        }
      })
    },
    chart2 (value, max) {
      console.log('cahrts', value, max)
      const chart = am4core.create(this.$refs.chart2, am4charts.GaugeChart)
      am4core.options.autoSetClassName = true

      chart.hiddenState.properties.opacity = 0 // this makes initial fade in effect

      chart.innerRadius = -25

      const axis = chart.xAxes.push(new am4charts.ValueAxis())
      axis.min = 0
      axis.max = max
      // axis.strictMinMax = true
      // axis.renderer.radius = am4core.percent(100)
      // axis.renderer.inside = true
      axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor('background')
      axis.renderer.grid.template.strokeOpacity = 0.3

      const axis2 = chart.xAxes.push(new am4charts.ValueAxis())
      axis2.min = 0
      axis2.max = max
      axis2.strictMinMax = true
      // axis2.renderer.labels.template.disabled = true
      // axis2.renderer.ticks.template.disabled = true
      // axis2.renderer.grid.template.disabled = true

      const colorSet = new am4core.ColorSet()

      const range0 = axis.axisRanges.create()
      range0.value = 0
      range0.endValue = max
      range0.axisFill.fillOpacity = 1
      range0.axisFill.fill = colorSet.getIndex(2)
      range0.axisFill.zIndex = 1

      const range1 = axis2.axisRanges.create()
      range1.value = 0
      range1.endValue = 100
      range1.axisFill.fillOpacity = 1
      range1.axisFill.fill = colorSet.getIndex(0)
      range1.axisFill.zIndex = -1

      /**
     * Label
     */

      const label = chart.radarContainer.createChild(am4core.Label)
      label.isMeasured = false
      label.fontSize = 30
      label.x = am4core.percent(50)
      label.y = am4core.percent(100)
      label.horizontalCenter = 'middle'
      label.verticalCenter = 'bottom'
      label.text = '50%'

      const hand = chart.hands.push(new am4charts.ClockHand())
      hand.axis = axis
      hand.innerRadius = am4core.percent(20)
      hand.startWidth = 10
      hand.pin.disabled = true
      hand.value = 0

      hand.events.on('propertychanged', function (ev) {
        range0.Value = ev.target.value
        range1.endValue = ev.target.value
        label.text = value
        axis.invalidate()
      })
      label.text = value
      // label.fontSize = 20
      // using chart.setTimeout method as the timeout will be disposed together with a chart
      new am4core.Animation(hand, {
        property: 'value',
        to: value
      }, 3000, am4core.ease.cubicOut).start()
      // chart.numberFormatter.numberFormat = '00.00'
    }
  },
  created () {

  },
  mounted () {

  },
  computed: {
    active () {
      const that = this
      return function (index) {
        return index == that.act ? 'on' : ''
      }
    }
  }
}

export default mixin
