import { getList, getzhuanye, getxueke, getcity } from '@/api/case.js'
import CaseTbale from './table/table'
const mixin = {
  components: { CaseTbale },
  props: ['xuewei', 'search', 'paimin', 'lqjg', 'limit'],
  data () {
    return {
      curThead: [{ order: '', prop: 'sqnf' }, { order: '', prop: 'rank_decimal' }],
      tableData: [], // 表格数据
      loading: false, // tabel 加载中。。
      offset: 0, // 页码
      count: 0, // 总数据数
      More: true, // 收起展开
      xsbj: '', // 学生背景
      hwbj: '', // 海外背景
      sqnf: '', // 申请年份
      sqjj: '', // 申请jj
      yxxk: '', // 国外学科
      yxxkList: [], // 院校学科列表
      sqzyname: '', // 申请专业名称
      sqzynameList: '', // 国外申请专业数据
      xscityList: [], // 学生城市列表
      alOption: {
        // 公共
        common: {
          // 学生背景
          xsbjList: [
            { name: '不限', value: '' },
            { name: '985', value: 985 },
            { name: '211', value: 211 },
            { name: '双非', value: 'shuangfei' }
          ],
          // 海外背景
          hwbjList: [
            { name: '不限', value: '' },
            { name: '有', value: '有' },
            { name: '无', value: '无' }
          ],
          // 申请时间
          sqnfList: [
            { name: '不限', value: '' },
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
          // 申请季节
          jijieList: [
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
            { name: '4.0以上', value: '4.0-9999' }
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
        }
      }
    }
  },
  created () {
    // console.log(this.xuewei, this.search, this.paimin, this.lqjg, this.limit)
    this.getXueke() // 获取学科
    this.getCity()// 获取城市
  },
  methods: {
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
      var restaurants = this.yxzyList
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      const str = []
      results.forEach(item => {
        // console.log(item.id);
        str.push(item.id)
      })
      // console.log("返回建议列表的数据", str.join(","));
      this.yxzyid = str.join(',')
      cb(results)
    },
    createFilter (queryString) {
      return restaurant => {
        return (
          restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
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
            name: '不限'
          })
          this.yxxkList = res.data
          this.yxxk = res.data[0].id || ''
          this.getZhuanye()
        }
      })
    },
    // 获取申请专业
    getZhuanye () {
      var that = this
      getzhuanye({
        yxxk: that.yxxk
      }).then(res => {
        // console.log(res.data);
        that.yxzyList = res.data
        that.reset()// 重置参数请求数据
      })
    },
    // 申请专业选中
    sqzySelect (item) {
      this.sqzyname = item.name
      this.yxzyid = item.id
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
        limit: that.limit, // 条数
        offset: that.offset, // 页码
        type: that.xuewei, // 学历学位
        yxorder: that.curThead[1].order || '', // 排序
        phb: that.paimin, // 排行榜类型
        keywords: that.search, // 模糊查询
        xsbj: that.xsbj, // 学生背景
        ishaiwai: that.hwbj, // 海外背景
        sqnf: that.sqnf, // 申请年份
        sqjj: that.sqjj, // 申请季节
        gwxk: that.yxxk, // 国外学科
        sqyxzwmc: that.sqyxzwmc, // 国外申请院校
        sqzyname: that.yxzyid, // 申请国外专业
        gnbyyxname: that.gnbyyxname, // 国内毕业院校
        suoxuezhuanye: that.suoxuezhuanye, // 国内毕业专业
        cityname: that.xscity, // 学生地区
        gpajd: that.gpajd, // GPA绩点
        gpabfz: that.gpabfz, // GPA百分制
        toefl: that.toefl, // TOEFL托福
        gre: that.gre, // GRE分数
        n1: that.n1, //
        n2: that.n2 //
      }).then(res => {
        this.loading = false
        this.tableData = res.data.data
        this.count = Number(res.data.count)
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
      that.gnbyyxname = '' // 国内毕业院校
      that.suoxuezhuanye = '' // 国内毕业专业
      that.xscity = ''// 学生地区
      that.gpajd = ''// GPA绩点
      that.gpabfz = ''// GPA百分制
      that.toefl = ''// TOEFL托福
      that.gre = ''// GRE分数
      that.n1 = '' // N1
      that.n2 = '' // N2
      that.getList()
    },
    // 全部重置请求数据
    wholeReset () {
      const that = this
      that.xsbj = '' // 学生背景
      that.hwbj = '' // 海外背景
      that.sqnf = '' // 申请年份
      that.sqjj = '' // 申请jj
      that.yxxk = '' // 国外学科
      this.offset = 0 // 重置页码
      that.sqyxzwmc = '' // 国外申请院校
      that.sqzyname = '' // 申请国外专业名称
      that.yxzyid = '' // 申请国外专业id
      that.gnbyyxname = '' // 国内毕业院校
      that.suoxuezhuanye = '' // 国内毕业专业
      that.xscity = ''// 学生地区
      that.gpajd = ''// GPA绩点
      that.gpabfz = ''// GPA百分制
      that.toefl = ''// TOEFL托福
      that.gre = ''// GRE分数
      that.n1 = '' // N1
      that.n2 = '' // N2
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
        guojia: '0e6CKvlYBjeZ1'
      }).then(res => {
        this.xscityList = res.data
      })
    }
  },
  watch: {
    xuewei: function (v, l) {
      this.getXueke()
    },
    xsbj: function (v, l) {
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
      this.getZhuanye()
    },
    paimin: function (v, l) {
      this.wholeReset()
    },
    limit: function (v, l) {
      // console.log(v)
      this.reset()
      // this.wholeReset()
    }
  }
}
export default mixin
