<template>
  <div
    :style="
      'background-color: #EFF1FA; overflow: hidden; height: ' +
      height_auto +
      'px;'
    "
  >
    <div class="content">
      <img
        :class="show ? 'on' : ''"
        src="../../../../mB/image/home/haicelogo.png"
        alt=""
        class="logo"
      />
      <div class="title wow animate__fadeInDown" data-wow-delay="0.1s">国内高中学生规划趋势分析</div>
      <div class="tip" @click="trans">
        <i :class="jisu ? 'jisu' : 'zoudu'"></i>
        <span :class="jisu ? '' : 'on'">走读</span>
        <span :class="jisu ? 'on' : ''">寄宿</span>
      </div>
      <div class="box clearfix">
        <div class="fl">
          <div class="wow animate__fadeInDown" data-wow-delay="0.3s">
            <p>各省的学生数占比</p>
            <div>
              <!-- loading 组件 -->
              <vue-element-loading
                :active="isActive"
                spinner="bar-fade-scale"
                background-color="#fff"
                color="#FF6700"
                class="loading"
              />
              <table>
                <thead>
                  <tr>
                    <th>城市</th>
                    <th>案例数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :class="chooseIndex == index ? 'on' : ''"
                    v-for="(item, index) in data.province_case_data"
                    :key="index"
                    @click="getId(item.prov_id, index)"
                  >
                    <td>{{ item.name }}</td>
                    <td>{{ item.num }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="wow animate__fadeInDown" data-wow-delay="0.5s">
            <p>热门城市的学生数占比</p>
            <div>
              <vue-element-loading
                :active="isActive2"
                spinner="bar-fade-scale"
                background-color="#fff"
                color="#FF6700"
                class="loading"
              />
              <table>
                <thead>
                  <tr>
                    <th>城市</th>
                    <th>案例数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in data.city_case_data" :key="index">
                    <td>{{ item.CityName }}</td>
                    <td>{{ item.num }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="fr wow animate__fadeInDown" data-wow-delay="0.8s">
          <div class="head">国内院校名称</div>
          <div class="con">
            <!-- loading 组件 -->
            <vue-element-loading
              :active="isActive"
              spinner="bar-fade-scale"
              background-color="#fff"
              color="#FF6700"
              class="loading"
            />
            <table>
              <thead>
                <tr>
                  <th>学校名称</th>
                  <th>案例数量</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in data_school" :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ item.num }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="map">
          <vue-element-loading
            :active="isActive2"
            spinner="bar-fade-scale"
            background-color="rgba(0,0,0,0)"
            color="#FF6700"
            class="loading"
          />
          <div id="chartmap" class="chart" ref="chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4maps from '@amcharts/amcharts4/maps'
import chinaLow from '@amcharts/amcharts4-geodata/chinaLow'
import am4langZhCn from '@amcharts/amcharts4/lang/zh_Hans'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import * as am4pluginsBullets from '@amcharts/amcharts4/plugins/bullets'
import { apply, getInfo } from '@/api/meigao.js'
import VueElementLoading from 'vue-element-loading'
import mixin from '../wow.js'
// am4core.useTheme(am4themesAnimated)
export default {
  mixins: [mixin],
  data () {
    return {
      height_auto: document.documentElement.clientHeight, // 获取页面高度
      show: false, // 控制页面进入动画加载
      jisu: true, // 寄宿 or 走读
      data: '',
      data_school: '',
      chart: null, // echarts
      data_ch: [], // 地图数据
      chooseIndex: null,
      isActive: false, // loading
      isActive2: false, // loading
      localId: null // 省份id
    }
  },
  components: {
    VueElementLoading
  },
  methods: {
    trans () {
      this.jisu = !this.jisu
      this.chooseIndex = null
      this.localId = null
      this.isActive2 = true
      this.getInit()
    },
    getInit () {
      // 获取国外省份和城市的大学数量
      const that = this
      this.isActive = true
      apply({ accommodation: that.jisu ? '寄宿制' : '走读制' }).then((res) => {
        that.data = res.data
        // 获取传入map echarts的数据
        const mapList = {}
        res.data.province_case_data.forEach((item) => {
          mapList[item.id] = item
        })
        if (that.isActive2) {
          that.mapInit(mapList)
          that.isActive2 = false
        }
        that.getSchool(that.localId)
        that.mapInit(mapList)
      })
    },
    getSchool (id) {
      // 获取相应省份下面的学校
      const that = this
      this.isActive = true
      getInfo({
        accommodation: that.jisu ? '寄宿制' : '走读制',
        stateid: id,
        type: 1
      }).then((res) => {
        that.data_school = res.data
        this.isActive = false
      })
    },
    getId (id, index) {
      // 根据id获取相应省份下面的学校
      this.isActive = true
      if (this.chooseIndex != index) {
        this.chooseIndex = index
        this.localId = id
      } else {
        this.chooseIndex = null
        this.localId = null
      }
      this.getInit()
    },
    mapInit (data) {
      const chart = am4core.create('chartmap', am4maps.MapChart)
      chinaLow.features.forEach((item, index) => {
        chinaLow.features[index].properties.name = data[item.id].name
        chinaLow.features[index].properties.value = data[item.id].num
      })
      chart.colors.list = [
        am4core.color('#A2BDFF'),
        am4core.color('#6B8DF1')
      ]
      chart.padding(60, 60, 60, 60)
      chart.geodata = chinaLow
      chart.projection = new am4maps.projections.Miller()
      chart.seriesContainer.draggable = false // 拖动
      chart.seriesContainer.resizable = false// 调整大小
      chart.maxZoomLevel = 1
      chart.language.locale = am4langZhCn
      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries())
      polygonSeries.useGeodata = true
      polygonSeries.heatRules.push({
        property: 'fill',
        target: polygonSeries.mapPolygons.template,
        min: chart.colors.getIndex(1).brighten(1),
        max: chart.colors.getIndex(1).brighten(-0.3)
      })
      // 中心区域
      polygonSeries.useGeodata = true
      polygonSeries.calculateVisualCenter = true
      // polygonSeries.data = data
      // Configure series
      var polygonTemplate = polygonSeries.mapPolygons.template
      polygonTemplate.tooltipText = '{name} 地区\n {value}'
      polygonTemplate.nonScalingStroke = true
      polygonTemplate.strokeWidth = 0.5
      polygonTemplate.fill = am4core.color('#799DEF')

      const hs = polygonTemplate.states.create('hover')

      hs.properties.fill = am4core.color('#8676ff')

      const imageSeries = chart.series.push(new am4maps.MapImageSeries())
      const imageSeriesTemplate = imageSeries.mapImages.template
      const circle = imageSeriesTemplate.createChild(am4core.Circle)
      circle.radius = 4
      circle.fill = am4core.color('#B27799')
      circle.stroke = am4core.color('#FFFFFF')
      circle.strokeWidth = 2
      circle.nonScaling = true
      circle.tooltipText = '{name}'
      const labelSeries = chart.series.push(new am4maps.MapImageSeries())
      const labelTemplate = labelSeries.mapImages.template.createChild(am4core.Label)
      labelTemplate.horizontalCenter = 'middle'
      labelTemplate.verticalCenter = 'middle'
      labelTemplate.fontSize = 10
      labelTemplate.nonScaling = true
      labelTemplate.interactionsEnabled = false
      polygonSeries.events.on('inited', function () {
        polygonSeries.mapPolygons.each(function (polygon) {
          const label = labelSeries.mapImages.create()
          const state = polygon.dataItem.dataContext.name
          const value = polygon.dataItem.dataContext.value
          label.latitude = polygon.visualLatitude
          label.longitude = polygon.visualLongitude
          label.children.getIndex(0).text = `[#ffffff]${state}:${value}`
        })
      })
    }
  },
  mounted () {
    this.show = true
    this.isActive2 = true
    this.getInit()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }
}
</script>
<style lang="scss" scoped>
@import '../module3/mixin';
.content {
  background: url('../../../../mB/image/home/bg21.png') no-repeat center;
  background-size: cover;
}
.content .box > .fl > div > div table thead th:nth-child(1) {
  width: 0.95rem;
}
.content .box > .fl > div > div table tbody td:nth-child(1) {
  width: 0.95rem;
}
</style>
