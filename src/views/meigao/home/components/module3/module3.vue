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
      <div class="title wow animate__fadeInDown" data-wow-delay="0.1s">
        美国高中学生规划趋势分析
      </div>
      <div class="tip" @click="trans">
        <i :class="jisu ? 'jisu' : 'zoudu'"></i>
        <span :class="jisu ? '' : 'on'">走读</span>
        <span :class="jisu ? 'on' : ''">寄宿</span>
      </div>
      <div class="box clearfix">
        <div class="fl">
          <div class="wow animate__fadeInDown" data-wow-delay="0.3s">
            <p>州\省案例排名</p>
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
                    v-for="(item, index) in data.state"
                    :key="index"
                    @click="getId(item.id, index)"
                  >
                    <td>{{ item.name }}</td>
                    <td>{{ item.num }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="wow animate__fadeInDown" data-wow-delay="0.6s">
            <p>城市占比</p>
            <div>
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
                  <tr v-for="(item, index) in data.city" :key="index">
                    <td>{{ item.name }}</td>
                    <td>{{ item.num }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="fr wow animate__fadeInDown" data-wow-delay="0.8s">
          <div class="head">
            国外院校名称
          </div>
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
          <!-- loading 组件 -->
          <vue-element-loading
            :active="isActive2"
            spinner="bar-fade-scale"
            background-color="rgba(0,0,0,0)"
            color="#FF6700"
            class="loading"
          />
          <div class="chart" id="chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4geodataUsaLow from '@amcharts/amcharts4-geodata/usaLow'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import { anli, getInfo } from '@/api/meigao.js'
import VueElementLoading from 'vue-element-loading'
import mixin from '../wow.js'
am4core.useTheme(am4themesAnimated)
export default {
  mixins: [mixin],
  data () {
    return {
      height_auto: document.documentElement.clientHeight, // 获取页面高度
      show: false, // 控制页面进入动画加载
      jisu: true, // 寄宿 or 走读
      data: '',
      data_school: '',
      data_usa: [], // 地图数据
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
      anli({ accommodation: that.jisu ? '寄宿制' : '走读制' }).then(res => {
        that.data = res.data
        that.data_usa = []
        // 获取传入map amcharts的数据
        res.data.state.forEach(item => {
          const mapNum = {}
          mapNum.id = item.abbr
          mapNum.value = parseInt(item.num)
          that.data_usa.push(mapNum)
        })
        if (that.isActive2) {
          that.mapInit()
          that.isActive2 = false
        }
        that.getSchool(that.localId)
      })
    },
    getSchool (id) {
      // 获取相应省份下面的学校
      const that = this
      this.isActive = true
      getInfo({
        accommodation: that.jisu ? '寄宿制' : '走读制',
        stateid: id,
        type: 2
      }).then(res => {
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
    mapInit () {
      const chart = am4core.create('chart', am4maps.MapChart)
      am4core.options.autoSetClassName = true
      chart.padding(0)
      chart.seriesContainer.draggable = false // 拖动
      chart.seriesContainer.resizable = false// 调整大小
      chart.maxZoomLevel = 1
      chart.colors.list = [
        am4core.color('#A2BDFF'),
        am4core.color('#3C5EC2')
      ]
      // chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color('#aadaff')
      // chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1
      // Set map definition
      chart.geodata = am4geodataUsaLow

      // Set projection
      chart.projection = new am4maps.projections.AlbersUsa()

      // Create map polygon series
      const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries())
      // Set min/max fill color for each area
      polygonSeries.heatRules.push({
        property: 'fill',
        target: polygonSeries.mapPolygons.template,
        min: chart.colors.getIndex(1).brighten(1),
        max: chart.colors.getIndex(1).brighten(-0.3)
      })
      // Make map load polygon data (state shapes and names) <f></f>rom GeoJSON
      polygonSeries.useGeodata = true

      // Set heatmap values for each state
      polygonSeries.data = this.data_usa

      // Configure series tooltip
      const polygonTemplate = polygonSeries.mapPolygons.template
      polygonTemplate.tooltipText = '{name}: {value}'
      polygonTemplate.nonScalingStroke = true
      polygonTemplate.strokeWidth = 0.5
      polygonTemplate.fill = am4core.color('#A2BDFF')
      // Create hover state and set alternative fill color
      const hs = polygonTemplate.states.create('hover')
      hs.properties.fill = am4core.color('#8676FF')

      const imageSeries = chart.series.push(new am4maps.MapImageSeries())
      const imageSeriesTemplate = imageSeries.mapImages.template
      const circle = imageSeriesTemplate.createChild(am4core.Circle)
      circle.radius = 4
      circle.fill = am4core.color('#B27799')
      circle.stroke = am4core.color('#FFFFFF')
      circle.strokeWidth = 2
      circle.nonScaling = true
      circle.tooltipText = '{name}'
      imageSeriesTemplate.propertyFields.latitude = 'latitude'
      imageSeriesTemplate.propertyFields.longitude = 'longitude'

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
          label.children.getIndex(0).text = `[#ffffff]${state}`
        })
      })
    }
  },
  mounted () {
    this.show = true
    this.isActive2 = true
    this.getInit()
  }
}
</script>
<style lang="scss" scoped>
@import './mixin';
</style>
