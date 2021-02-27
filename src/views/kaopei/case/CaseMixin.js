import { WOW } from 'wowjs'
import { getCaseList } from '@/api/kaopei.js'
const mixin = {
  data () {
    return {
      loading: false,
      tableData: [], // 表格数据
      search: '', // 搜索内容
      xuewei: 'all', // 学历
      offset: 0, // 页码
      limit: 25, // 条数
      total: 0, // 总条数
      prop: null, // 排序字段
      order: null, // 排序方式
      // 列表参数
      listData: {
        allx: '', // 案例类型
        lxal: '', // 留学案例
        kskm: '', // 考试科目
        xyxl: '', // 现有学历
        sqxw: '', // 申请学位

        fdzq: '', // 辅导周期
        fdks: '', // 辅导课时
        gpa: '', //
        xycj: '', // 现有成绩
        zzcj: '', // 最终成绩
        tscj: '', // 提升成绩
        tingli: '', // 听力分数
        kouyu: '', // 口语分数
        yuedu: '', // 阅读分数
        xiezuo: '', // 写作分数
        zdxxName: '' // 在读学校名称
      },
      // 筛选项
      alOption: {
        // 不变的值
        // 案例类型
        allx: [{ name: '不限', value: '' }, { name: '高分案例', value: '高分案例' }],
        // 留学案例
        lxal: [{ name: '不限', value: '' }, { name: '是', value: '是' }],
        // 考试科目
        kskm: [
          { name: '不限', value: '' },
          { name: 'TOEFL', value: 'TOEFL' },
          { name: 'IELTS', value: 'IELTS' },
          { name: 'GMAT', value: 'GMAT' },
          { name: 'GRE', value: 'GRE' },
          { name: 'SAT', value: 'SAT' },
          { name: 'SSAT', value: 'SSAT' },
          { name: 'N1', value: 'N1' },
          { name: 'N2', value: 'N2' }],
        // 现有学历
        xyxl: [
          { name: '不限', value: '' },
          { name: '初中', value: '初中' },
          { name: '高中', value: '高中' },
          { name: '本科', value: '本科' },
          { name: '研究生', value: '研究生' }
        ],
        // 申请学位
        sqxw: [
          { name: '不限', value: '' },
          { name: '高中', value: '高中' },
          { name: '本科', value: '本科' },
          { name: '硕士', value: '硕士' },
          { name: '博士', value: '博士' }
        ],
        // 辅导周期
        fdzq: [
          { name: '1-2个月', value: '1-2' },
          { name: '3-5个月', value: '3-5' },
          { name: '6-9个月', value: '6-9' },
          { name: '10-12个月', value: '10-12' },
          { name: '12个月以上', value: '12-999' }
        ],
        // 辅导课时
        fdks: [
          // { name: "不限", value: "" },
          { name: '0-60', value: '0-60' },
          { name: '61-120', value: '61-120' },
          { name: '121-180', value: '121-180' },
          { name: '181-240', value: '181-240' }
        ],
        // gpa
        gpa: [
          // { name: "不限", value: "" },
          { name: '2.5以下', value: '0-2.5' },
          { name: '2.5-2.99', value: '2.5-2.99' },
          { name: '3.0-3.99', value: '3.0-3.99' },
          { name: '4.0以上', value: '4.0-999' }
        ],
        // 根据成绩动态值
        xycjList: [], // 现有成绩
        cpcjList: [], // 测评成绩
        zzcjList: [], // 最终成绩
        tscjList: [], // 提升成绩
        tingliList: [], // 听力分数
        kouyuList: [], // 口语分数
        yueduList: [], // 阅读分数
        xiezuoList: [], // 写作分数
        Options1: [
          // { name: "不限", value: "" },
          { name: '0-30', value: '0-30' },
          { name: '30-40', value: '30-40' },
          { name: '40-50', value: '40-50' },
          { name: '50-60', value: '50-60' },
          { name: '60-70', value: '60-70' },
          { name: '70-80', value: '70-80' },
          { name: '80-90', value: '80-90' },
          { name: '90-100', value: '90-100' },
          { name: '100-105', value: '100-105' },
          { name: '105+', value: '105-999' }
        ],
        Options2: [
          // { name: "不限", value: "" },
          { name: '0-10', value: '0-10' },
          { name: '11-20', value: '11-20' },
          { name: '21-25', value: '21-25' },
          { name: '26-30', value: '26-30' }
        ],
        Options3: [
          // { name: "不限", value: "" },
          { name: '0-4.5', value: '0-4.5' },
          { name: '5', value: '5-5' },
          { name: '5.5', value: '5.5-5.5' },
          { name: '6', value: '6-6' },
          { name: '6.5', value: '6.5-6.5' },
          { name: '7', value: '7-7' },
          { name: '7.5', value: '7.5-7.5' },
          { name: '8', value: '8-8' },
          { name: '8+', value: '8-99' }
        ],
        Options4: [
          // { name: "不限", value: "" },
          { name: '220-550', value: '220-550' },
          { name: '560-600', value: '560-600' },
          { name: '610-650', value: '610-650' },
          { name: '660-700', value: '660-700' },
          { name: '700-750', value: '700-750' },
          { name: '760-800', value: '760-800' }
        ],
        Options5: [
          // { name: "不限", value: "" }
        ],
        Options6: [
          // { name: "不限", value: "" },
          { name: '260-290', value: '260-290' },
          { name: '291-310', value: '291-310' },
          { name: '311-320', value: '311-320' },
          { name: '321-330', value: '321-330' },
          { name: '331-340', value: '331-340' }
        ],
        Options7: [
          // { name: "不限", value: "" },
          { name: '400-800', value: '400-800' },
          { name: '801-1150', value: '801-1150' },
          { name: '1151-1250', value: '1151-1250' },
          { name: '1251-1350', value: '1251-1350' },
          { name: '1351-1450', value: '1351-1450' },
          { name: '1451-1500', value: '1451-1500' },
          { name: '1500+', value: '1500-9999' }
        ],
        Options8: [
          // { name: "不限", value: "" },
          { name: '1500-1800', value: '1500-1800' },
          { name: '1801-1950', value: '1801-1950' },
          { name: '1951-2050', value: '1951-2050' },
          { name: '2051-2200', value: '2051-2200' },
          { name: '2201-2300', value: '2201-2300' },
          { name: '2301-2400', value: '2301-2400' }
        ],
        Options9: [
          // { name: "不限", value: "" },
          { name: '0-90', value: '0-90' },
          { name: '91-100', value: '91-100' },
          { name: '101-120', value: '101-120' },
          { name: '121-140', value: '121-140' },
          { name: '141+', value: '141-999' }
        ],
        Tisheng1: [
          // { name: "不限", value: "" },
          { name: '0-10', value: '0-10' },
          { name: '11-30', value: '11-30' },
          { name: '31-50', value: '31-50' },
          { name: '51-70', value: '51-70' },
          { name: '71-100', value: '71-100' },
          { name: '100以上', value: '100-999' }
        ],
        Tisheng2: [
          // { name: "不限", value: "" },
          { name: '0-1', value: '0-1' },
          { name: '1.5-3', value: '1.5-3' },
          { name: '3.5-6', value: '3.5-6' },
          { name: '6.5-8', value: '6.5-8' },
          { name: '71-100', value: '71-100' },
          { name: '8+', value: '8-99' }
        ],
        Tisheng3: [
          // { name: "不限", value: "" },
          { name: '0-50', value: '0-50' },
          { name: '50-100', value: '50-100' },
          { name: '101-150', value: '101-150' },
          { name: '151-200', value: '151-200' },
          { name: '201-300', value: '201-300' },
          { name: '301-500', value: '301-500' },
          { name: '501-600', value: '501-600' },
          { name: '600以上', value: '600-999' }
        ],
        Tisheng4: [
          // { name: "不限", value: "" },
          { name: '0-20', value: '0-20' },
          { name: '21-50', value: '21-50' },
          { name: '51-70', value: '51-70' },
          { name: '71-100', value: '71-100' },
          { name: '100-200', value: '100-200' },
          { name: '200以上', value: '200-999' }
        ],
        Tisheng5: [
          // { name: "不限", value: "" },
          { name: '0-100', value: '0-100' },
          { name: '101-200', value: '101-200' },
          { name: '201-300', value: '201-300' },
          { name: '301-400', value: '301-400' },
          { name: '401-500', value: '401-500' },
          { name: '501-600', value: '501-600' },
          { name: '601-700', value: '601-700' },
          { name: '701-800', value: '701-800' },
          { name: '801-1000', value: '801-1000' },
          { name: '1001-1500', value: '1001-1500' },
          { name: '1500以上', value: '1500-9999' }
        ],
        Tisheng6: [
          // { name: "不限", value: "" },
          { name: '0-100', value: '0-100' },
          { name: '101-500', value: '101-500' },
          { name: '501-1000', value: '501-1000' },
          { name: '1000以上', value: '1000-9999' }
        ],
        Tisheng7: [
          // { name: "不限", value: "" },
          { name: '0-90', value: '0-90' },
          { name: '91-100', value: '91-100' },
          { name: '101-120', value: '101-120' },
          { name: '121-140', value: '121-140' },
          { name: '141+', value: '141-999' }
        ],
        limitList: [
          { name: '25条', value: 25 },
          { name: '50条', value: 50 },
          { name: '75条', value: 75 },
          { name: '100条', value: 100 }
        ]
      }
    }
  },
  created () {
    // 不限的时候 现有 测评 最终 听力 口语 阅读 写作
    this.alOption.xycjList = this.alOption.Options1
    this.alOption.cpcjList = this.alOption.Options1
    this.alOption.zzcjList = this.alOption.Options1
    this.alOption.tscjList = this.alOption.Tisheng1
    this.alOption.tingliList = this.alOption.Options2
    this.alOption.kouyuList = this.alOption.Options2
    this.alOption.yueduList = this.alOption.Options2
    this.alOption.xiezuoList = this.alOption.Options2
  },
  mounted () {
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
    // 分页器
    tablePage (val) {
      this.offset = val - 1
      this.getList()
    },
    // 获取数据
    getList () {
      const that = this
      this.loading = true
      getCaseList({
        keywords: that.$store.state.search, // 搜索框
        offset: that.offset, // 页数
        limit: that.limit, // 数量
        sortord: that.prop, // 排序字段
        sort: that.order, // 排序方式
        allx: that.listData.allx, // 案例类型
        lxal: that.listData.lxal, // 案例类型
        kskm: that.listData.kskm, // 考试科目
        xyxl: that.listData.xyxl, // 现有学历
        sqxw: that.listData.sqxw, // 申请学位
        fdzq: that.listData.fdzq, // 辅导周期
        fdks: that.listData.fdks, // 辅导课时
        gpajd: that.listData.gpa, // gpa
        xycj: that.listData.xycj, // 现有成绩
        zzcj: that.listData.zzcj, // 最终成绩
        tscj: that.listData.tscj, // 提升成绩
        tlfs: that.listData.tingli, // 听力分数
        kyfs: that.listData.kouyu, // 口语分数
        ydfs: that.listData.yuedu, // 阅读分数
        xzfs: that.listData.xiezuo, // 写作分数
        zdyy: that.listData.zdxxName // 在读院校
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
      that.listData.fdzq = '' // 辅导周期
      that.listData.fdks = '' // 辅导课时
      that.listData.gpa = '' // gpa
      that.listData.xycj = '' // 现有成绩
      that.listData.zzcj = '' // 最终成绩
      that.listData.tscj = ''// 提升成绩
      that.listData.tingli = '' // 听力分数
      that.listData.kouyu = ''// 口语分数
      that.listData.yuedu = ''// 阅读分数
      that.listData.xiezuo = ''// 写作分数
      that.listData.zdxxName = ''// 在读学校名称

      that.getList()
    },
    // 全部重置请求数据
    wholeReset () {
      const that = this
      this.offset = 0 // 重置页码
      that.listData.allx = '' // 案例类型
      that.listData.lxal = '' // 留学案例
      that.listData.kskm = '' // 考试科目
      that.listData.xyxl = '' // 现有学历
      that.listData.sqxw = '' // 申请学位
      that.listData.fdzq = '' // 辅导周期
      that.listData.fdks = '' // 辅导课时
      that.listData.gpa = '' // gpa
      that.listData.xycj = '' // 现有成绩
      that.listData.zzcj = '' // 最终成绩
      that.listData.tscj = ''// 提升成绩
      that.listData.tingli = '' // 听力分数
      that.listData.kouyu = ''// 口语分数
      that.listData.yuedu = ''// 阅读分数
      that.listData.xiezuo = ''// 写作分数
      that.listData.zdxxName = ''// 在读学校名称
      that.getList()
    },
    // 表格子组件排序触发
    tableSort (prop, order) {
      // this.curThead = e
      this.prop = prop
      this.order = order
      this.getList()
    }
  },
  watch: {
    '$store.state.search': function (v) {
      console.log(v)
      this.wholeReset()
    },
    'listData.allx': function (v, l) {
      this.reset()
    },
    'listData.lxal': function (v, l) {
      this.reset()
    },
    'listData.kskm': function (v, l) {
      if (v == '不限' || v == 'TOEFL') {
        this.alOption.xycjList = this.alOption.Options1
        this.alOption.cpcjList = this.alOption.Options1
        this.alOption.zzcjList = this.alOption.Options1
        this.alOption.tscjList = this.alOption.Tisheng1
        this.alOption.tingliList = this.alOption.Options2
        this.alOption.kouyuList = this.alOption.Options2
        this.alOption.yueduList = this.alOption.Options2
        this.alOption.xiezuoList = this.alOption.Options2
      } else if (v == 'IELTS') {
        this.alOption.xycjList = this.alOption.Options3
        this.alOption.cpcjList = this.alOption.Options3
        this.alOption.zzcjList = this.alOption.Options3
        this.alOption.tscjList = this.alOption.Tisheng2
        this.alOption.tingliList = this.alOption.Options3
        this.alOption.kouyuList = this.alOption.Options3
        this.alOption.yueduList = this.alOption.Options3
        this.alOption.xiezuoList = this.alOption.Options3
      } else if (v == 'GMAT') {
        this.alOption.xycjList = this.alOption.Options4
        this.alOption.cpcjList = this.alOption.Options4
        this.alOption.zzcjList = this.alOption.Options4
        this.alOption.tscjList = this.alOption.Tisheng3
        this.alOption.tingliList = this.alOption.Options5
        this.alOption.kouyuList = this.alOption.Options5
        this.alOption.yueduList = this.alOption.Options5
        this.alOption.xiezuoList = this.alOption.Options5
      } else if (v == 'GRE') {
        this.alOption.xycjList = this.alOption.Options6
        this.alOption.cpcjList = this.alOption.Options6
        this.alOption.zzcjList = this.alOption.Options6
        this.alOption.tscjList = this.alOption.Tisheng4
        this.alOption.tingliList = this.alOption.Options5
        this.alOption.kouyuList = this.alOption.Options5
        this.alOption.yueduList = this.alOption.Options5
        this.alOption.xiezuoList = this.alOption.Options5
      } else if (v == 'SAT') {
        this.alOption.xycjList = this.alOption.Options7
        this.alOption.cpcjList = this.alOption.Options7
        this.alOption.zzcjList = this.alOption.Options7
        this.alOption.tscjList = this.alOption.Tisheng5
        this.alOption.tingliList = this.alOption.Options5
        this.alOption.kouyuList = this.alOption.Options5
        this.alOption.yueduList = this.alOption.Options5
        this.alOption.xiezuoList = this.alOption.Options5
      } else if (v == 'SSAT') {
        this.alOption.xycjList = this.alOption.Options8
        this.alOption.cpcjList = this.alOption.Options8
        this.alOption.zzcjList = this.alOption.Options8
        this.alOption.tscjList = this.alOption.Tisheng6
        this.alOption.tingliList = this.alOption.Options5
        this.alOption.kouyuList = this.alOption.Options5
        this.alOption.yueduList = this.alOption.Options5
        this.alOption.xiezuoList = this.alOption.Options5
      } else if (v == 'N1' || v == 'N2') {
        this.alOption.xycjList = this.alOption.Options9
        this.alOption.cpcjList = this.alOption.Options9
        this.alOption.zzcjList = this.alOption.Options9
        this.alOption.tscjList = this.alOption.Tisheng7
        this.alOption.tingliList = this.alOption.Options5
        this.alOption.kouyuList = this.alOption.Options5
        this.alOption.yueduList = this.alOption.Options5
        this.alOption.xiezuoList = this.alOption.Options5
      }
      this.reset()
    },
    'listData.xyxl': function (v, l) {
      this.reset()
    },
    'listData.sqxw': function (v, l) {
      this.reset()
    },
    limit: function (v, l) {
      this.getList()
    }
  }
}
export default mixin
