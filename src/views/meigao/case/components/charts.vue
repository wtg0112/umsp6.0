<template>
  <div class="chartdiv" ref="chartdiv"></div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
am4core.useTheme(am4themesAnimated)
export default {
  props: ['amdata', 'title'],
  data () {
    return {
      list: [],
      chart: null
    }
  },
  mounted () {
    // console.log(this.amdata)
    this.list = this.amdata
    this.charts()
  },
  methods: {
    charts () {
      const data = this.list
      const chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart)
      this.chart = chart
      console.log(this.list)
      // 添加饼图动画
      // chart.innerRadius = am4core.percent(30)
      // chart.hiddenState.properties.innerRadius = am4core.percent(0)
      // chart.hiddenState.properties.radius = am4core.percent(100)
      chart.numberFormatter.numberFormat = '#.'
      // Add data
      chart.padding(30)
      chart.data = data
      chart.radius = am4core.percent(60)
      chart.innerRadius = am4core.percent(35)
      // Add and configure Series
      const pieSeries = chart.series.push(new am4charts.PieSeries())
      pieSeries.hiddenState.properties.endAngle = -90
      if (chart.data.length > 5) {
        pieSeries.labels.template.text = '{category}'
      } else {
        pieSeries.labels.template.text = '{category}:{value.value}人'
      }
      pieSeries.slices.template.tooltipText = '{category}:{value.value}人'
      // 配置哪个切片被拉出
      pieSeries.slices.template.propertyFields.isActive = 'pulled'
      pieSeries.dataFields.value = 'value'
      pieSeries.dataFields.category = 'name'

      pieSeries.labels.template.maxWidth = 130 // 切片标签宽度
      pieSeries.labels.template.wrap = true // 切片标签换行
      pieSeries.labels.template.fontSize = 12 // 缩小标签字体
      pieSeries.labels.template.paddingTop = 0 // 减少标签填充
      pieSeries.labels.template.paddingBottom = 6 // 减少标签填充
      pieSeries.slices.template.events.on('hit', function (ev) {
        const series = ev.target.dataItem.component
        series.slices.each(function (item) {
          if (item.isActive && item != ev.target) {
            item.isActive = false
          }
        })
      })

      const label = pieSeries.createChild(am4core.Label)
      label.text = this.title
      label.horizontalCenter = 'middle'
      label.verticalCenter = 'middle'
      label.fontSize = 12
    }
  },
  watch: {
    amdata: function (v, l) {
      this.chart.data = v
    }
  }
}
</script>

<style scoped lang="scss">
.chartdiv{
  position: relative;
  &::after{
    content: '';
    width: 1rem;
    height: 0.35rem;
    position:absolute;
    left: 0px;
    bottom: 0px;
    background: white;
  }
}
</style>
