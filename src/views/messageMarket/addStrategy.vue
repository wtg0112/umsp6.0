<template>
  <div class="addGroup">
      <el-card class="box-card">
        <el-form
          ref="formData"
          :model="formData"
          label-suffix="："
          label-width="100px"
        >
          <el-row :gutter="20">
                <el-col :span="6">
                 <el-form-item prop="name" label="信息分类">
                   <el-select
                        filterable
                        size="small"
                        v-model="formData.infoClassify"
                        placeholder="请选择信息分类"
                        >
                        <el-option
                            v-for="item in auditStatusList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        >
                        </el-option>
                        </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="templateName" label="组策略名称">
                <el-input
                  v-model="formData.strategyName"
                  placeholder="请输入组策略名称"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
          
            <el-col :span="2">
              <el-button type="primary" style="margin-left: 30px;margin-top:4px;" size="small"
                >查询</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    <el-card class="box-card">
    
      <el-row :gutter="20" style="margin-top: 0;">
          <p>基本信息</p>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item prop="templateName" label="子策略名称">
                <el-input
                  v-model="formData.childStrategyName"
                  placeholder="请输入子策略名称"
                  size="small"
                ></el-input>
               </el-form-item>
            </el-col>
        </el-row>
         <el-row :gutter="20">
            <el-col :span="10">
                <el-form-item prop="name" label="发送方式">
                   <el-select
                        size="small"
                        v-model="formData.sendType"
                        placeholder="请选择发送方式"
                        >
                        <el-option
                            v-for="item in sendTypeList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        >
                        </el-option>
                        </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row>
      </el-row>

      <el-row :gutter="20" style="margin-top: 0;">
          <p>触发条件（无触发条件代表默认执行）</p>
          <el-row :gutter="20">
            <el-col :span="7">
                  <el-select
                        size="small"
                        v-model="formData.sendType"
                        placeholder="请选择类型"
                        >
                        <el-option
                            v-for="item in sendTypeList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        >
                        </el-option>
                  </el-select>
            </el-col>
            <el-col :span="7">
                  <el-select
                        size="small"
                        v-model="formData.sendType"
                        placeholder="请选择条件名称"
                        >
                        <el-option
                            v-for="item in sendTypeList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        >
                        </el-option>
                  </el-select>
            </el-col>
        </el-row>
         <el-row :gutter="20">
            <el-col :span="10">
                <el-form-item prop="name" label="发送方式">
                   <el-select
                        size="small"
                        v-model="formData.sendType"
                        placeholder="请选择发送方式"
                        >
                        <el-option
                            v-for="item in sendTypeList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        >
                        </el-option>
                        </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <!-- <el-form :inline="true"> --> -->
                   <draggable v-model="filters" dragable="true" :move="getdata" @update="datadragEnd">
                      <transition-group>
                            <el-col :span="8"  v-for="filter in filters" :key="filter.filterKey" style="margin-top: 5px">
                                  <span style="float:left;padding:4px 6px;margin-left:6px;background:#ecf5fe;">{{filter.name}}</span>
                               
                            </el-col>
                      </transition-group>
                    </draggable>
                   <!-- <fitlerdialog v-bind:visable="dialogObjectVisible" v-bind:avtivefilter="avtivefilter"   v-on:on-filter-data-change="onFilterDataChange" v-on:filterdialogcancle="handleDialogObjectcancle" v-on:filterdialogclose="handleDialogObjectClose"></fitlerdialog> --> -->
                     <!-- </el-form>                    -->







                <!-- <div v-for="(item,index) in msgClassify" :key="index">
                    <span style="">{{item.name}}</span>
                </div> -->
            </el-col>
          </el-row>
      </el-row>
    </el-card>
    <el-row :gutter="20">
      <el-col
        style="position:fixed;bottom:0px;background:#fff;border-top:1px solid rgb(210,210,210);"
      >
        <div style="margin:14px 20%;">
          <el-button type="primary" size="small">保存</el-button>
          <el-button type="primary" plain size="small" @click="goBack"
            >返回</el-button
          >
        </div>
      </el-col>
    </el-row>
    <el-drawer
      title="筛选详情"
      :visible.sync="drawerShow"
      direction="rtl"
      size="40%"
    >
      <span class="customer">当前条件匹配{{ customers }}位客户</span>
      <el-table :data="gridData">
        <el-table-column
          property="date"
          label="日期"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="200"
        ></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>
<script>
export default {
  props: ['tagsList'],
  data() {
    return {
     avtivefilter:false,
     dialogObjectVisible:false,
     filters:[
          {
            name:'短信',
            relate:''
        },
         {
            name:'微信公众号',
            relate:''
        }
     ],
     auditStatusList:[
         {
             name:'全部',
             value:''
         },
         {
             name:'实时',
             value:'1'
         },
          {
             name:'动账通知',
             value:'2'
         },

    ],
    sendTypeList:[
         {
             name:'并发（同时发送）',
             value:'0'
         },
         {
             name:'串发（从左到右一次发送）',
             value:'1'
         },


    ],
    msgClassify:[
        {
            name:'短信',
            relate:''
        },
         {
            name:'微信公众号',
            relate:''
        }

    ],
    formData: {
        infoClassify: '',
        strategyName: '',
        childStrategyName:'',
        sendType:'0',


      },
      customers: 13,
      options: [
        {
          value: '1',
          label: '包含'
        },
        {
          value: '2',
          label: '开头是'
        },
        {
          value: '3',
          label: '结尾是'
        },
        {
          value: '4',
          label: '为空'
        },
        {
          value: '5',
          label: '有值'
        }
      ],
      addGroupData: {},
      conditionData: {},
      activeNames: ['1', '2'],
      diyTags: [], // 自定义标签
      sysTags: [], // 系统标签
      checkboxGroup1: [],
      checkboxGroup2: [],
      conditionList1: [], // 自定义标签筛选堆
      conditionList2: [], // 系统标签筛选堆
      conditionList: [], // 整体标签筛选堆
      drawerShow: false,
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  created() {
  },
  methods: {
    getdata(evt) {
    console.log(evt.draggedContext.filterKey)
    //这里evt.draggedContext后续的内容根据具体的定义变量而定
      },
   datadragEnd(evt) {
    console.log('拖动前的索引 :' + evt.oldIndex)
    console.log('拖动后的索引 :' + evt.newIndex);

    let filters = this.filters;
    for(let a=0;a<filters.length;a++){
        filters[a].index = a;
    }
    // vm.report.filter = filters;
},
    // 返回按钮click
    goBack() {
      this.$emit('goCheck', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.addGroup {
  & /deep/ .el-card__header {
    border: none;
    padding-bottom: 0;
  }
  & /deep/ .el-collapse {
    border: none;
    & /deep/ .el-collapse-item__header {
      border: none;
    }
    & /deep/ .el-collapse-item__wrap {
      border: none;
      .el-collapse-item__content {
        padding-bottom: 0;
      }
    }
  }
  & /deep/ .el-checkbox-button {
    width: 100%;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    & .el-checkbox-button__inner {
      display: inline-block;
      width: 100%;
      margin-bottom: 10px;
    }
    &:last-child .el-checkbox-button__inner {
      border-radius: 4px;
    }
  }
  & /deep/ .el-drawer {
    padding: 20px;
    box-sizing: border-box;
    outline: none;
    border: none;
    .customer{
      display: block;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .el-drawer__header {
      margin-bottom: 10px;
      padding: 0;
      span {
        outline: none;
        border: none;
        font-size: 16px;
      }
      .el-drawer__close-btn{
        outline: none;
        border: none;
      }
    }
  }
}
.scroll480 {
  height: 480px;
  overflow-y: scroll;
  //滚动条样式
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background-color: rgba(240, 240, 240, 0);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    border-radius: 10px;
    background-color: rgba(240, 240, 240, 0);
  }
  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    background-color: #dcdfe6;
  }
  .empty {
    text-align: center;
  }
}
.height480 {
  height: 480px;
  padding-bottom: 50px;
  position: relative;
  box-sizing: border-box;
  .btnGroup {
    position: absolute;
    left: 0;
    bottom: 0px;
    height: 50px;
    line-height: 50px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    background-color: #fff;
    .customer {
      display: inline-block;
      margin: 0 20px;
    }
  }
  .notEmpty {
    height: 100%;
    overflow-y: scroll;
    padding: 0 10px;
    box-sizing: border-box;
    //滚动条样式
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      border-radius: 6px;
      background-color: rgba(240, 240, 240, 0);
    }
    /*定义滚动条轨道 内阴影+圆角*/
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
      border-radius: 10px;
      background-color: rgba(240, 240, 240, 0);
    }
    /*定义滑块 内阴影+圆角*/
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
      background-color: #dcdfe6;
    }
  }
}
.condition-card {
  border: 1px solid #c6cbdd !important;
  border-radius: 2px;
  margin-bottom: 12px;
  position: relative;
  width: 100%;
  & /deep/ .el-card__body {
    padding: 5px 0;
  }
  .del {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    cursor: pointer;
  }
}
</style>
