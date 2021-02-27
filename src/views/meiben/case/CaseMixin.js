import { WOW } from 'wowjs'
import { getList, getzhuanye, getxueke, getcity, getTotal, getproject } from '@/api/case.js'
const mixin = {
  data () {
    return {
      loading: false,
      tableData: [], // 表格数据
      curThead: [{ order: '', prop: 'sqnf' }, { order: '', prop: 'rank_decimal' }], // 排序字段
      search: '', // 搜索内容
      xuewei: '新生', // 学历
      xsbj: '', // 学生背景
      gzbj: '', // 高中背景
      hwbj: '', // 海外背景
      sqnf: '', // 申请年份
      sqjj: '', // 申请季节
      yxxk: '', // 院校学科
      yxzyList: [], // 申请专业
      yxzyList2: [], // 申请专业2
      sqxmList: [], // 申请项目列表
      sqxmid: '', // 申请项目id
      sqxmname: '', // 申请项目名称
      sqzyname2Flag: false,
      yxxkList: [], //
      xscityList: [], // 学生城市列表
      xuekeArr: [],
      sqzyname2: '',
      paimin: '0o2021USErank2', // 排名方式
      paiminList: '', //
      lqjg: '', // 录取结果
      offset: 0, // 页码
      limit: 25, // 条数
      total: 0, // 总条数
      uniqueness: 0, // 分组排序
      alOption: {
        // 公共
        common: {
          // 分组排序
          uniquenessList: [
            { name: '案例分组', value: 0 },
            { name: '客户分组', value: 1 }
          ],
          // 学生背景
          xsbjList: [
            { name: '不限', value: '' },
            { name: '985', value: '985' },
            { name: '211', value: '211' },
            { name: '双非', value: '双非' },
            { name: '海外院校', value: '海外院校' }
          ],
          // 高中背景
          gzbjList: [
            { name: '不限', value: '' },
            { name: '普通高中', value: '普通高中' },
            { name: '普高国际班', value: '普高国际班' },
            { name: '国际学校', value: '国际学校' },
            { name: '海外高中', value: '海外高中' }
          ],
          // 录取结果
          lqjgList: [{
            value: '',
            label: '不限'
          }, {
            value: '1',
            label: '录取'
          }, {
            value: '0',
            label: '被拒'
          }],
          // 海外背景
          hwbjList: [
            { name: '不限', value: '' },
            { name: '有', value: '有' },
            { name: '无', value: '无' }
          ],
          // 申请时间
          sqnfList: [
            { name: '不限', value: '' },
            { name: '2021', value: '2021' },
            { name: '2020', value: '2020' },
            { name: '2019', value: '2019' },
            { name: '2018', value: '2018' },
            { name: '2017', value: '2017' },
            { name: '2016', value: '2016' },
            { name: '2015', value: '2015' },
            { name: '2014', value: '2014' },
            { name: '2013', value: '2013' },
            { name: '2012', value: '2012' },
            { name: '2011', value: '2011' },
            { name: '2010', value: '2010' }
          ],
          // 所在地区
          szdqList: [
            // { name: '不限', value: '' },
            { name: '北京', value: '北京' },
            { name: '山西', value: '山西' },
            { name: '上海', value: '上海' },
            { name: '天津', value: '天津' },
            { name: '河北', value: '河北' },
            { name: '重庆', value: '重庆' },
            { name: '江苏', value: '江苏' },
            { name: '内蒙古自治区', value: '内蒙古自治区' },
            { name: '山东', value: '山东' },
            { name: '吉林', value: '吉林' },
            { name: '辽宁', value: '辽宁' },
            { name: '江西', value: '江西' },
            { name: '安徽', value: '安徽' },
            { name: '福建', value: '福建' },
            { name: '浙江', value: '浙江' },
            { name: '湖北', value: '湖北' },
            { name: '广西壮族自治区', value: '广西壮族自治区' },
            { name: '广东', value: '广东' },
            { name: '湖南', value: '湖南' },
            { name: '河南', value: '河南' },
            { name: '四川', value: '四川' },
            { name: '海南', value: '海南' },
            { name: '云南', value: '云南' },
            { name: '陕西', value: '陕西' },
            { name: '贵州', value: '贵州' },
            { name: '西藏自治区', value: '西藏自治区' },
            { name: '宁夏回族自治区', value: '宁夏回族自治区' },
            { name: '香港', value: '香港' },
            { name: '青海', value: '青海' },
            { name: '甘肃', value: '甘肃' },
            { name: '新疆维吾尔自治区', value: '新疆维吾尔自治区' },
            { name: '台湾', value: '台湾' },
            { name: '澳门', value: '澳门' }
          ],
          // 申请季节
          sqjjList: [
            { name: '不限', value: '' },
            { name: '春季', value: '春季' },
            { name: '秋季', value: '秋季' }
          ],
          gpabList: [
            // { name: "不限", value: "" },
            { name: '70-75', value: '70-75' },
            { name: '75-80', value: '75-80' },
            { name: '80-85', value: '80-85' },
            { name: '85-90', value: '85-90' },
            { name: '90-100', value: '90-100' }
          ],
          gpacList: [
            // { name: "不限", value: "" },
            { name: '2.0以下', value: '0-2.0' },
            { name: '2.0-2.5', value: '2-2.5' },
            { name: '2.5-2.99', value: '2.5-2.99' },
            { name: '3.0-3.59', value: '3.0-3.59' },
            { name: '3.6-3.99', value: '3.6-3.99' },
            { name: '4.0以上', value: '4.0-10' }
          ],
          ieltsList: [
            // { name: "不限", value: "" },
            { name: '5以下', value: '0-5' },
            { name: '5', value: '5-5' },
            { name: '5.5', value: '5.5-5.5' },
            { name: '6', value: '6-6' },
            { name: '6.5', value: '6.5-6.5' },
            { name: '7', value: '7-7' },
            { name: '7以上', value: '7-9999' }
          ],
          gmatList: [
            // { name: "不限", value: "" },
            { name: '550以下', value: '0-550' },
            { name: '550-600', value: '550-600' },
            { name: '601-650', value: '601-650' },
            { name: '651-700', value: '651-700' },
            { name: '701-750', value: '701-750' },
            { name: '751-800', value: '751-800' }
          ],
          greList: [
            // { name: "不限", value: "" },
            { name: '300以下', value: '0-300' },
            { name: '300-310', value: '300-310' },
            { name: '311-320', value: '311-320' },
            { name: '321-330', value: '321-330' },
            { name: '331-340', value: '331-340' }
          ],
          satList: [
            // { name: "不限", value: "" },
            { name: '1000以下', value: '0-1000' },
            { name: '1000-1500', value: '1000-1500' },
            { name: '1501-2000', value: '1501-2000' },
            { name: '2001-2400', value: '2001-2400' }
          ],
          actList: [
            // { name: "不限", value: "" },
            { name: '20-26', value: '20-26' },
            { name: '26-28', value: '26-28' },
            { name: '28-30', value: '28-30' },
            { name: '30以上', value: '30-999' }
          ],
          xtfList: [
            // { name: "不限", value: "" },
            { name: '600-750', value: '600-750' },
            { name: '751-800', value: '751-800' },
            { name: '801-900', value: '801-900' }
          ],
          slepList: [
            // { name: "不限", value: "" },
            { name: '50以下', value: '0-50' },
            { name: '51-54', value: '51-54' },
            { name: '55-59', value: '55-59' },
            { name: '60-67', value: '60-67' }
          ],
          ssatList: [
            // { name: "不限", value: "" },
            { name: '1500-1700', value: '1500-1700' },
            { name: '1701-1900', value: '1701-1900' },
            { name: '1901-2200', value: '1901-2200' },
            { name: '2200以上', value: '2200-9999' }
          ],
          sqnjList: [
            // { name: "不限", value: "" },
            { name: '7年级', value: '7' },
            { name: '8年级', value: '8' },
            { name: '9年级', value: '9' },
            { name: '10年级', value: '10' },
            { name: '11年级', value: '11' },
            { name: '12年级', value: '12' }
          ],
          toeflList: [
            // { name: "不限", value: "" },
            { name: '60以下', value: '0-60' },
            { name: '61-70', value: '61-70' },
            { name: '71-80', value: '71-80' },
            { name: '81-90', value: '81-90' },
            { name: '91-100', value: '91-100' },
            { name: '101-110', value: '101-110' },
            { name: '111-120', value: '111-120' }
          ],
          n1List: [
            // { name: '不限', value: '' },
            { name: '120以下', value: '0-120' },
            { name: '120-140', value: '120-140' },
            { name: '141-160', value: '141-160' },
            { name: '161以上', value: '161-999' }
          ],
          n2List: [
            // { name: '不限', value: '' },
            { name: '120以下', value: '0-120' },
            { name: '120-140', value: '120-140' },
            { name: '141-160', value: '141-160' },
            { name: '161以上', value: '161-999' }
          ]
        },
        jp: {
          limitList: [
            { name: '25条', value: 25 },
            { name: '50条', value: 50 },
            { name: '75条', value: 75 },
            { name: '100条', value: 100 }
          ],
          // 日本学历
          xueweiList: [
            { name: '全部', value: 'all' },
            { name: '修士研究生', value: '硕士预科' },
            { name: '博士研究生', value: '博士预科' },
            { name: 'SGU硕士', value: '硕士' },
            { name: 'SGU博士', value: '博士' },
            { name: 'SGU本科', value: '学士' }
          ],
          // 日本排名
          jpPaiming: [
            { name: '《QS》世界大学排名(2021)', id: '0olSEYINMcaa' },
            { name: '《THE》世界大学排名(2021)', id: '0olSEYIMnCTA' },
            { name: '《日本》日本大学排名(2020)', id: '0olSEjanPanss' }
          ]
        },
        meiyan: {
          limitList: [
            { name: '20条', value: 20 },
            { name: '40条', value: 40 },
            { name: '60条', value: 60 },
            { name: '80条', value: 80 },
            { name: '100条', value: 100 }
          ],
          xueweiList: [
            { name: '全部', value: 'all' },
            { name: '硕士', value: '硕士' },
            { name: '博士', value: '博士' }
          ],
          jpPaiming: [
            { name: '《US News》美国大学排名(2021)', id: '0o2021USErank2' },
            { name: '《US News》美国大学排名(2020)', id: '0o2021USErank3' },
            { name: '《US News》世界大学排名(2021)', id: '0olSEYINMNS' },
            { name: '《US News》综合类大学排名(2020)', id: '0olgBR1ZC8fX' }
          ]
        },
        yingguo: {
          limitList: [
            { name: '20条', value: 20 },
            { name: '40条', value: 40 },
            { name: '60条', value: 60 },
            { name: '80条', value: 80 },
            { name: '100条', value: 100 }
          ],
          xueweiList: [
            { name: '全部', value: 'all' },
            { name: '硕士', value: '硕士' },
            { name: '博士', value: '博士' },
            { name: '本科', value: '学士' },
            { name: '本科预科', value: '本科预科' },
            { name: '硕士预科', value: '硕士预科' }
          ],
          jpPaiming: [
            { name: '《QS》世界大学排名(2021)', id: '0olSEYINMcaa' },
            { name: '《QS》世界大学排名(2020)', id: '0o2020qsrnk1' },
            { name: '《THE》世界大学排名(2021)', id: '0olSEYIMnCTA' },
            { name: '《THE》世界大学排名(2020)', id: '0o2020therank1' },
            { name: '卫报英国大学排名(2021)', id: '0oygwbrank2021' },
            { name: '卫报英国大学排名(2020)', id: '0oygwbrank2020' }
          ]
        },
        meiben: {
          limitList: [
            { name: '25条', value: 25 },
            { name: '50条', value: 50 },
            { name: '75条', value: 75 },
            { name: '100条', value: 100 }
          ],
          xueweiList: [
            // { name: '全部', value: 'all' },
            { name: '新生', value: '新生' },
            { name: '本转', value: '本转' }
          ],
          Paiming: [
            { name: '《US News》美国大学排名(2021)', id: '0o2021USErank2' },
            { name: '《US News》美国大学排名(2020)', id: '0o2021USErank3' },
            { name: '《US News》世界大学排名(2021)', id: '0olSEYINMNS' },
            { name: '《US News》综合类大学排名(2020)', id: '0olgBR1ZC8fX' }
          ]
        }
      }
    }
  },
  created () {

  },
  mounted () {
    this.gettotal()//
    this.getXueke() // 获取学科
    this.getCity()// 获取城市
    this.getList()// 获取列表
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
    gettotal () {
      getTotal().then(res => {
        res.data.top.forEach((item, index) => {
          const num = item.proportion
          item.img = require(`./image/promote${index + 1}.png`)
          item.proportion = 0
          setTimeout(() => {
            item.proportion = num
          }, 500)
        })
        res.data.main.data.forEach((item, index) => {
          const num = item.value
          item.value = 0
          setTimeout(() => {
            item.value = num
          }, 500)
        })
        this.promote = res.data
      })
    },
    // 学生城市搜索器
    citySearch (queryString, cb) {
      var restaurants = this.xscityList
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      // console.log("返回建议列表的数据", str.join(","));
      // this.yxzyid = str.join(',')
      cb(results)
    },
    // 申请专业搜索器
    sqzySearch (queryString, cb) {
      const that = this
      if (queryString != '') {
        getzhuanye({
          yxxk: that.yxxk,
          keywords: that.sqzyname,
          project: 0
        }).then(res => {
          that.yxzyList = res.data
          console.log(res.data)
          const str = []
          res.data.forEach(item => {
            str.push(item.id)
          })
          if (str.join(',') == []) {
            this.yxzyid = queryString
          } else {
            this.yxzyid = str.join(',')
          }
          var results = queryString ? this.yxzyList : []
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            cb(results)
          }, 100)
        })
      } else {
        this.yxzyid = ''
        this.yxzyList = ''
      }
    },
    // 申请项目搜索器
    sqxmSearch (queryString, cb) {
      const that = this
      if (queryString != '') {
        getproject({
          // yxxk: that.yxxk,
          keywords: that.sqxmname,
          keep_en: 0 // 1展示中文 0展示中英文 默认0
        }).then(res => {
          that.sqxmList = res.data
          console.log(res.data)
          const str = []
          res.data.forEach(item => {
            str.push(item.id)
          })
          if (str.join(',') == []) {
            this.sqxmid = queryString
          } else {
            this.sqxmid = str.join(',')
          }
          var results = queryString ? this.sqxmList : []
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            cb(results)
          }, 100)
        })
      } else {
        this.sqxmid = ''
        this.sqxmList = ''
      }
    },
    createFilter (queryString) {
      return restaurant => {
        return (
          restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) != -1
        )
      }
    },
    // 获取院校学科
    getXueke () {
      var that = this
      getxueke({
        type: that.xuewei
      }).then(res => {
        if (res.code == 200) {
          res.data.unshift({
            id: '',
            xkid: '',
            name: '不限'
          })
          this.yxxkList = res.data
          // this.getZhuanye()
        }
      })
    },
    // 获取申请专业
    getZhuanye () {
      var that = this
      getzhuanye({
        // keep_en     是否展示英文 1不展示  0或不传值 展示
        yxxk: that.yxxk,
        keep_en: 1
      }).then(res => {
        that.yxzyList2 = res.data
        this.sqzyname2Flag = true
      })
    },
    // 申请专业选中
    sqzySelect (item) {
      this.sqzyname = item.name
      this.yxzyid = item.id
    },
    // 申请专业选中
    sqxmSelect (item) {
      this.sqxmname = item.name
      this.sqxmid = item.id
    },
    // 学生地区选中
    citySelect (item) {
      this.xscity = item.name
    },
    // 分页器
    tablePage (val) {
      this.offset = val - 1
      this.getList()
    },
    // 获取数据
    getList () {
      const that = this
      this.loading = true
      getList({
        uniqueness: that.uniqueness, // 分组排序
        limit: that.limit, // 条数
        offset: that.offset, // 页码
        type: that.xuewei, // 学历学位
        yxorder: that.curThead[1].order || '', // 排序
        msjg: that.lqjg, // 录取结果
        phb: that.paimin, // 排行榜类型
        keywords: that.$store.state.search, // 模糊查询
        xsbj: that.xsbj, // 学生背景
        new_type: that.gzbj, // 学生背景
        ishaiwai: that.hwbj, // 海外背景
        sqnf: that.sqnf, // 申请年份
        sqjj: that.sqjj, // 申请季节
        gwxk: that.yxxk, // 国外学科
        sqyxzwmc: that.sqyxzwmc, // 国外申请院校
        gwzyname: that.yxzyid, // 国外专业名称
        projectname: that.sqxmid, // 申请项目
        gwzy: that.sqzyname2, // 国外专业上面的
        gnbkxy: that.gnbkxy, // 国内毕业院校
        gwbkby: that.gwbkby, // 国内毕业院校
        suoxuezhuanye: that.suoxuezhuanye, // 国内毕业专业
        cityname: that.xscity, // 学生城市
        provincename: that.szdq, // 学生省份
        gpajd: that.gpajd, // GPA绩点
        gpabfz: that.gpabfz, // GPA绩点
        toefl: that.toefl, // TOEFL托福
        ielts: that.ielts, // ielts
        gre: that.gre, // GRE分数
        gmat: that.gmat, // gmat
        act: that.act,
        sat: that.sat
      }).then(res => {
        this.loading = false
        this.tableData = res.data.data
        this.total = Number(res.data.count)
      })
    },
    // 确认搜索
    find () {
      this.offset = 0
      this.getList()
    },
    // 重置请求数据
    reset () {
      const that = this
      that.offset = 0 // 重置页码
      that.sqyxzwmc = '' // 国外申请院校
      that.sqzyname = '' // 申请国外专业名称
      that.yxzyid = '' // 申请国外专业id
      that.gnbkxy = '' // 国内毕业院校
      that.gnbkxy = '' // 国内毕业院校
      that.gwbkby = '' // 国外毕业专业
      that.xscity = ''// 学生城市
      that.szdq = '' // 所在地区
      that.gpajd = ''// GPA绩点
      that.gpabfz = ''// GPA百分制
      that.toefl = ''// TOEFL托福
      that.ielts = ''// ielts
      that.gre = ''// GRE分数
      that.gmat = ''// gmat
      that.act = ''
      that.sat = ''
      that.getList()
    },
    // 全部重置请求数据
    wholeReset () {
      const that = this
      that.hwbj = '' // 海外背景
      that.xsbj = ''// 学生背景
      that.sqnf = '' // 申请年份
      that.sqjj = '' // 申请jj
      that.yxxk = '' // 国外学科
      this.offset = 0 // 重置页码
      that.sqyxzwmc = '' // 国外申请院校
      that.sqzyname = '' // 申请国外专业名称
      that.yxzyid = '' // 申请国外专业id
      that.gnbkxy = '' // 国内毕业院校
      that.gwbkby = '' // 国外毕业专业
      that.suoxuezhuanye = '' // 国内毕业专业
      that.xscity = ''// 学生城市
      that.szdq = '' // 所在地区
      that.gpajd = ''// GPA绩点
      that.gpabfz = ''// GPA百分制
      that.toefl = ''// TOEFL托福
      that.ielts = ''// ielts
      that.gre = ''// GRE分数
      that.gmat = ''// gmat
      that.getList()
    },
    // 表格子组件排序触发
    tableSort (e) {
      this.curThead = e
      console.log(e)
      this.getList()
    },
    getCity () {
      getcity({
        // 中国城市
        guojia: '0e6CKvlYBjeZ1'
      }).then(res => {
        this.xscityList = res.data
      })
    }
  },
  watch: {
    xuewei: function (v, l) {
      this.xsbj = ''
      this.gzbj = ''
      this.getXueke()
      this.reset()
    },
    '$store.state.search': function (v) {
      this.wholeReset()
    },
    xsbj: function (v, l) {
      this.reset()
    },
    gzbj: function (v, l) {
      this.reset()
    },
    hwbj: function (v, l) {
      this.reset()
    },
    sqnf: function (v, l) {
      this.reset()
    },
    sqjj: function (v, l) {
      this.reset()
    },
    yxxk: function (v, l) {
      // 学科更改 重新获取专业 请求列表
      this.sqzyname2 = ''
      this.reset()// 重置参数请求数据
      if (v != '') {
        this.getZhuanye()
        console.log(this.yxzyList2)
      } else {
        this.sqzyname2Flag = false
      }
    },
    sqzyname: function (v, l) {
      if (v == '') {
        this.yxzyid = ''
        console.log(v, this.yxzyid)
      }
    },
    sqzyname2: function (v, l) {
      this.offset = 0 // 重置页码
      this.getList()
    },
    paimin: function (v, l) {
      this.offset = 0 // 重置页码
      this.getList()
    },
    lqjg: function (v, l) {
      this.offset = 0 // 重置页码
      this.getList()
    },
    limit: function (v, l) {
      this.reset()
    },
    uniqueness: function (v, l) {
      // console.log(v)
      this.reset()
      // this.wholeReset()
    }
  }
}
export default mixin
