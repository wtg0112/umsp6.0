import { getList, getzhuanye, getxueke, getcity } from '@/api/case.js'
import { caseChart } from '@/api/meiben.js'
import CaseTbale from './components/table'
const mixin = {
  components: { CaseTbale },
  data () {
    return {
      curThead: [{ order: '', prop: 'time_of_application' }, { order: '', prop: 'rank_decimal' }],
      tableData: [], // 表格数据
      loading: false, // tabel 加载中。。
      limit: 10,
      offset: 0, // 页码
      count: 0, // 总数据数
      More: true, // 收起展开
      xueweiList: [
        { name: '高中', value: '高中' }
      ],
      lqjg: '', // 录取结果
      gzbj: '', // 高中背景
      xsbj: '', // 学生背景
      sqyxzwmc: '', // 国外申请院校名字
      suoxuezhuanye: '', // 国内毕业专业
      gnbyyxname: '', // 国内毕业院校
      hwbj: '', // 海外背景
      sqnf: '', // 年份
      sqjj: '', // 季节
      yxxk: '', // 国外学科
      yxxkList: [], // 院校学科列表
      sqzyname: '', // 申请专业名称
      sqzynameList: '', // 国外申请专业数据
      xscityList: [], // 学生城市列表
      gpajd: '', // gpa绩点
      xtf: '', // 小托福
      slep: '', // slep
      ssat: '', // ssat
      sqnj: '', // 申请年级
      gmat: '', // gmat
      act: '', // act
      toefl: '', // toefl
      amXuewei: [],
      amGzbj: [],
      amLqjg: [],
      amXsbj: [],
      amHwbj: [],
      amSqnf: [],
      amLqnj: [],
      uniqueness: '', // 分组排序
      alOption: {
        // 公共
        common: {
          // 分组排序
          uniquenessList: [
            { name: '案例分组', value: 0 },
            { name: '客户分组', value: 1 }
          ],
          // 录取结果
          lqjgList: [
            { name: '不限', value: '' },
            { name: '录取', value: '1' },
            { name: '拒绝', value: '0' }
          ],
          // 高中背景
          gzbjList: [
            { name: '不限', value: '' },
            { name: '普通高中', value: '普通高中' },
            { name: '普高国际班', value: '普高国际班' },
            { name: '国际学校', value: '国际学校' },
            { name: '海外高中', value: '海外高中' }
          ],
          // 学生背景
          xsbjList: [
            { name: '不限', value: '' },
            { name: '985', value: 985 },
            { name: '211', value: 211 },
            { name: '国外大学', value: '国外大学' },
            { name: '双非', value: '双非' }
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
            // { name: '不限', value: '' },
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
            { name: '650以下', value: '0-650' },
            { name: '650-750', value: '650-750' },
            { name: '750-850', value: '750-850' },
            { name: '850以上', value: '850-999' }
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
            { name: '1800以下', value: '0-1800' },
            { name: '1800-2000', value: '1800-2000' },
            { name: '2000-2200', value: '2000-2200' },
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
    // this.xuewei = this.xueweiList[0].name

    this.getList()
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
        uniqueness: that.uniqueness, // 分组排序
        offset: that.offset, // 页码
        type: that.xuewei, // 学历学位
        // new_type: that.gzbj, // 高中背景
        sjorder: that.curThead[0].order || '', // 入读时间排序
        yxorder: that.curThead[1].order || '', // 院校排名排序
        // phb: that.paimin, // 排行榜类型
        // keywords: that.search, // 模糊查询
        msjg: that.lqjg, // 录取结果
        // xsbj: that.xsbj, // 学生背景
        ishaiwai: that.hwbj, // 海外背景
        sqnf: that.sqnf, // 申请年份
        sqjj: that.sqjj, // 申请季节
        // gwxk: that.yxxk, // 国外学科
        sqyxzwmc: that.sqyxzwmc, // 国外申请院校
        // sqzyname: that.yxzyid, // 申请国外专业
        gnbyyxname: that.gnbyyxname, // 国内毕业院校
        gpajd: that.gpajd, // gpa绩点
        xtf: that.xtf, // 小托福
        slep: that.slep, //
        ssat: that.ssat, //
        sqnj: that.sqnj, // 申请年级
        // suoxuezhuanye: that.suoxuezhuanye, // 国内毕业专业
        // ielts: that.ielts,
        // gmat: that.gmat,
        // act: that.act,
        toefl: that.toefl // TOEFL托福

      }).then(res => {
        this.loading = false
        this.tableData = res.data.data
        this.count = Number(res.data.count)
      })
    },
    // 获取图表数据
    getCaseChart () {
      caseChart({}).then(res => {
        this.amLqnj = res.data.grade
        this.amLqjg = res.data.luqu
        this.amHwbj = res.data.haiwai
        this.amSqnf = res.data.rudu
        this.chartsFlag = true
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
      that.uniqueness = ''
      that.offset = 0 // 重置页码
      that.sqyxzwmc = '' // 国外申请院校
      that.suoxuezhuanye = '' // 国内毕业专业
      that.sqjj = '' // 申请季节
      that.gnbyyxname = '' // 国内毕业院校
      that.gpajd = '' // gpa绩点
      that.xtf = '' // 小托福
      that.slep = '' // slep
      that.ssat = ''
      that.sqnj = ''
      that.ielts = '' // ielts
      that.gmat = ''
      that.act = ''
      that.toefl = ''
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
    },
    char (arr, index) {
      // console.log(arr, index)
      var targetObj = JSON.parse(JSON.stringify(arr))
      targetObj.forEach(function (item, index) {
        item.pulled = false
      })
      if (index == -1) {
        return targetObj
      }
      targetObj[index].pulled = true
      return targetObj
    }
  },
  watch: {
    xuewei: function (v, l) {
      const that = this
      const index = this.xueweiList.findIndex(function (item, index) { return item.value == v })
      const arr = this.char(that.amXuewei, index)
      this.amXuewei = arr
      that.gzbj = '' // 高中背景
      that.xsbj = '' // 学生背景
      this.reset()
    },
    lqjg: function (v, l) {
      const that = this
      console.log(v)
      const index = this.amLqjg.findIndex(function (item, index) { return item.key == v })
      const arr = this.char(that.amLqjg, index)
      this.amLqjg = arr
      this.reset()
    },
    xsbj: function (v, l) {
      const that = this
      const index = this.amXsbj.findIndex(function (item, index) { return item.name == v })
      const arr = this.char(that.amXsbj, index)
      this.amXsbj = arr
      this.reset()
    },
    hwbj: function (v, l) {
      const that = this
      const index = this.amHwbj.findIndex(function (item, index) { return item.name == v })
      const arr = this.char(that.amHwbj, index)
      this.amHwbj = arr
      this.reset()
    },
    sqnf: function (v, l) {
      const that = this
      const index = this.amSqnf.findIndex(function (item, index) { return item.name == v + '年' })
      const arr = this.char(that.amSqnf, index)
      this.amSqnf = arr
      this.reset()
    },
    gzbj: function (v, l) {
      const that = this
      const index = this.amGzbj.findIndex(function (item, index) { return item.name == v })
      const arr = this.char(that.amGzbj, index)
      this.amGzbj = arr
      this.reset()
    }
  }
}
export default mixin
