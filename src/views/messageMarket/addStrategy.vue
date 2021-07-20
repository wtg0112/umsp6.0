<template>
  <div class="addGroup">
        <el-form
          ref="formData"
          :model="formData"
          label-suffix="："
          label-width="100px"
        >
          <el-row :gutter="20">
              <el-col :span="10">
                 <el-form-item prop="infoClassify" label="信息分类">
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
            <el-col :span="10">
              <el-form-item prop="strategyName" label="组策略名称">
                <el-input
                  v-model="formData.strategyName"
                  placeholder="请输入组策略名称"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
          
            <el-col :span="2">
              <el-button type="primary" style="margin-left: 30px;margin-top:4px;" size="small"
                >查询</el-button>
            </el-col>
          </el-row>
  
        <el-card>
          <p style="margin-left:30px;border-left:7px solid #409EFF;padding-left:6px;font-size:15px;">基本信息</p>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item prop="childStrategyName" label="子策略名称">
                <el-input
                  v-model="formData.childStrategyName"
                  placeholder="请输入子策略名称"
                  size="small"
                ></el-input>
               </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
                <el-form-item prop="sendWay" label="发送方式">
                   <el-select
                        size="small"
                        v-model="formData.sendWay"
                        placeholder="请选择发送方式"
                        @change="sendWayChange(formData.sendWay)"
                        >
                        <el-option
                            v-for="item in sendWayList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        >
                        </el-option>
                        </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12" v-if="formData.sendWay=='0'">
              <draggable v-model="shuntFilters" :options="dragOptions" >
                 <div  v-for="(filter,index) in shuntFilters" :key="filter.name+'only1'"   class="handle-move" style="margin:5px 0;overflow:hidden;float:left;">
                  <span class="dragLabel" style="padding:7px 14px;margin-bottom:10px;">{{filter.name}}<i class="el-icon-close" style="margin-left:4px;" @click="closeDrag(index)"></i></span>
                  <span class="dragLabel unmove" style="padding:0px;border:none;margin-bottom:10px" v-if="index==shuntFilters.length-1"></span>
                  <span class="dragLabel unmove" style="padding:7px 14px;margin-bottom:10px" v-else>{{relateList}}</span>
                </div>
              </draggable>
             <div>
                <el-button size="small" style="margin-left:10px;margin-top:2px;"  @click="addInfoType" v-if="infoTypeShow==false"  v-show="typeBtnShow">
                          <i class="el-icon-circle-plus"></i>
                        添加信息类型</el-button>
                        <el-select
                          style="width:150px;margin-left:10px;margin-top:3px"
                                v-show="infoTypeShow"
                                  size="small"
                                  v-model="formData.infoType"
                                  placeholder="请选择信息类型"
                                  @change="infoTypeChange(formData.infoType)"
                                  >
                                  <el-option
                                      v-for="item in infoTypeList"
                                      :key="item.name+'-info1'"
                                      :label="item.name"
                                      :value="item.name"
                                  >
                                  </el-option>
                          </el-select>
              </div>

            </el-col>

             <el-col :span="13" v-else-if="formData.sendWay=='1'">
                <draggable v-model="seriesFilters">
                            <div  v-for="(item,index) in seriesFilters" :key="item.name+'only'"   class="handle-move" style="margin:5px 0;overflow:hidden;float:left;">
                                  <span  class="dragLabel1" style="padding:0px 14px;margin-bottom:10px">{{item.name}}<i class="el-icon-close" style="margin-left:4px;" @click="closeDrag1(index)"></i></span>
                            </div>
              </draggable>
              <div>
                  <el-button size="small" style="margin-left:10px;margin-top:5px" @click="addSeriesType" v-if="seriseTypeShow==false"  v-show="seriseBtnShow">
                    <i class="el-icon-circle-plus"></i>
                  添加信息类型</el-button>
                  <el-select
                    style="width:150px;margin-left:10px;margin-top:5px;"
                          v-show="seriseTypeShow"
                            size="small"
                            v-model="formData.seriesType"
                            placeholder="请选择信息类型"
                            @change="infoTypeChange1(formData.seriesType)"
                            >
                            <el-option
                                v-for="item in infoTypeList"
                                :key="item.name+'-info2'"
                                :label="item.name"
                                :value="item.name"
                            >
                            </el-option>
                    </el-select>
              </div>
            </el-col>
          </el-row>

         <el-row :gutter="20" style="margin-top: 0;">
          <p style="margin-left:34px;border-left:7px solid #409EFF;padding-left:6px;font-size:15px;">触发条件（无触发条件代表默认执行）</p>
          <div style=" width:100%;display: flex;">
                      <div style="width:10%;border-right:2px solid #eee;position: relative;">
                        <div class="centerBlock">
                           <div class="moveRelate" v-for="(i,index) in twoRelate" :key="i"  :class="isActive==index?'activeRelate relateAnd':' relateAnd'"  @click="clickChange(index)">{{i}}</div>
                        </div>
                      </div>
                        <div style="width:88%">
                          <div class="operateSendTime"    v-for="(item, index) in formData.touchCondition" :key="index">
                                <el-row class="sendTimeList" >
                                        <el-col :span="4">
                                          <el-form-item
                                            ref="cashCouponRuleListClear"
                                            style="margin-bottom:0px;margin-left:0px;"
                                            :prop="'touchCondition.' + index + '.sendType'"
                                          > 
                                                <el-select
                                                    size="small"
                                                    v-model="formData.touchCondition[index].sendType"
                                                    placeholder="请选择类型"
                                                    @change="selectCondition(formData.touchCondition[index].sendType)"
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

                                        <el-col :span="4" style="margin-left:10px;">
                                          <el-form-item
                                            style="margin-bottom:0px;"
                                            :prop="'touchCondition.' + index + '.ifName'"
                                          >
                                            <el-select
                                                size="small"
                                                v-model="formData.touchCondition[index].ifName"
                                                placeholder="请选择条件名称"
                                                >
                                                <el-option
                                                    v-for="item in ifNameList"
                                                    :key="item.value"
                                                    :label="item.name"
                                                    :value="item.value"
                                                >
                                                </el-option>
                                            </el-select>
                                          </el-form-item>
                                        </el-col>
                                      <div v-if="formData.touchCondition[index].sendType=='0'">
                                            <div v-if="formData.touchCondition[index].ifName=='0'">
                                                      <el-col :span="4" style="margin-left:10px;">
                                                          <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="60"></el-input-number>
                                                      </el-col>
                                                      <el-col :span="4" style="margin-left:30px;">
                                                        <el-form-item
                                                          style="margin-bottom:0px;"
                                                          :prop="'touchCondition.' + index + '.clickTime'"
                                                        >
                                                          <el-select
                                                              size="small"
                                                              v-model="formData.touchCondition[index].clickTime"
                                                              placeholder="请选择"
                                                              >
                                                              <el-option
                                                                  v-for="item in clickTimeList"
                                                                  :key="item.value"
                                                                  :label="item.name"
                                                                  :value="item.value"
                                                              >
                                                              </el-option>
                                                          </el-select>
                                                        </el-form-item>
                                                      </el-col>
                                                      <el-col :span="4" style="margin-left:10px;">
                                                        <el-form-item
                                                          style="margin-bottom:0px;"
                                                          :prop="'touchCondition.' + index + '.clickStatus'"
                                                        >
                                                          <el-select
                                                              size="small"
                                                              v-model="formData.touchCondition[index].clickStatus"
                                                              placeholder="请选择判断描述"
                                                              >
                                                              <el-option
                                                                  v-for="item in clickStatusList"
                                                                  :key="item.value"
                                                                  :label="item.name"
                                                                  :value="item.value"
                                                              >
                                                              </el-option>
                                                          </el-select>
                                                        </el-form-item>
                                                      </el-col>
                                            </div>
                                            <div v-if="formData.touchCondition[index].ifName=='1'">
                                                      <el-col :span="4" style="margin-left:10px;">
                                                          <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="60"></el-input-number>
                                                      </el-col>
                                                      <el-col :span="4" style="margin-left:30px;">
                                                        <el-form-item
                                                          style="margin-bottom:0px;"
                                                          :prop="'touchCondition.' + index + '.reportTime'"
                                                        >
                                                          <el-select
                                                              size="small"
                                                              v-model="formData.touchCondition[index].reportTime"
                                                              placeholder="请选择"
                                                              >
                                                              <el-option
                                                                  v-for="item in reportTimeList"
                                                                  :key="item.value"
                                                                  :label="item.name"
                                                                  :value="item.value"
                                                              >
                                                              </el-option>
                                                          </el-select>
                                                        </el-form-item>
                                                      </el-col>
                                                      <el-col :span="4" style="margin-left:10px;">
                                                        <el-form-item
                                                          style="margin-bottom:0px;"
                                                          :prop="'touchCondition.' + index + '.reportStatus'"
                                                        >
                                                          <el-select
                                                              size="small"
                                                              v-model="formData.touchCondition[index].reportStatus"
                                                              placeholder="请选择判断描述"
                                                              >
                                                              <el-option
                                                                  v-for="item in reportStatusList"
                                                                  :key="item.value"
                                                                  :label="item.name"
                                                                  :value="item.value"
                                                              >
                                                              </el-option>
                                                          </el-select>
                                                        </el-form-item>
                                                      </el-col>
                                            </div>
                                      </div>

                                      <div v-else-if="formData.touchCondition[index].sendType=='1'">
                                                      <el-col :span="4" style="margin-left:10px;">
                                                        <el-form-item
                                                          style="margin-bottom:0px;"
                                                          :prop="'touchCondition.' + index + '.labelRelate'"
                                                        >
                                                          <el-select
                                                              size="small"
                                                              v-model="formData.touchCondition[index].labelRelate"
                                                              placeholder="请选择"
                                                              >
                                                              <el-option
                                                                  v-for="item in labelRelation"
                                                                  :key="item.value"
                                                                  :label="item.name"
                                                                  :value="item.value"
                                                              >
                                                              </el-option>
                                                          </el-select>
                                                        </el-form-item>
                                                      </el-col>
                                                      <el-col :span="4" style="margin-left:10px;">
                                                        <el-form-item :prop="'touchCondition.' + index + '.labelInput'" >
                                                            <el-input
                                                              v-model="formData.touchCondition[index].labelInput"
                                                              placeholder="请输入条件描述"
                                                              size="small"
                                                            ></el-input>
                                                          </el-form-item>
                                                      </el-col>
                                      </div>

                                      <div v-if="formData.touchCondition[index].sendType=='2'">
                                              <el-col :span="4" style="margin-left:10px;">
                                                            <el-form-item
                                                              style="margin-bottom:0px;"
                                                              :prop="'touchCondition.' + index + '.rangRelate'"
                                                            >
                                                              <el-select
                                                                  size="small"
                                                                  v-model="formData.touchCondition[index].rangRelate"
                                                                  placeholder="请选择"
                                                                  >
                                                                  <el-option
                                                                      v-for="item in rangRelation"
                                                                      :key="item.value"
                                                                      :label="item.name"
                                                                      :value="item.value"
                                                                  >
                                                                  </el-option>
                                                              </el-select>
                                                            </el-form-item>
                                                          </el-col>
                                                          <el-col :span="4" style="margin-left:10px;">
                                                            <el-form-item :prop="'touchCondition.' + index + '.changeDsc'" >
                                                                <el-input
                                                                  v-model="formData.touchCondition[index].changeDsc"
                                                                  placeholder="请输入条件描述"
                                                                  size="small"
                                                                ></el-input>
                                                              </el-form-item>
                                                          </el-col>
                                      </div>
                                </el-row>

                              
                          </div>
                      </div>
            </div>
                      
                      <el-row style="text-align:center;margin-top:40px;border-top:1px solid #eee;">
                            <el-footer style="margin-top:20px;" >
                               <el-button @click="handleAddType"><i  class="el-icon-circle-plus" style="color:#409EFE;margin-right:4px;"></i>新增子策略</el-button>
                               <el-button @click="handleDeleteType(getIndex)"><i  class="el-icon-delete-solid" style="color:#FF0066;margin-right:4px;"></i>删除当前子策略</el-button> 
                            </el-footer>
                      </el-row>
          
      </el-row>
       <el-row  style="border-top:1px solid #eee">
       

        </el-row>
    </el-card>
    </el-form>

    <el-row :gutter="20">
     
        <el-footer style="margin:10px 20px;text-align:left;">
          <el-button type="primary" size="small">创建</el-button>
          <el-button type="primary" plain size="small" @click="goBack"
            >取消</el-button
          >
        </el-footer>
    </el-row>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
export default {
  props: ['tagsList'],
  components:{draggable},
  data() {
    return {
      twoRelate:['且','或'],
      dragOptions: {
        animation: 150,
        group:'title',
        handle: '.handle-move',
        dragClass:'dragClass'
      },
      typeBtnShow:true,
      infoTypeShow:false,
      seriseBtnShow:true,
      seriseTypeShow:false,
      infoTypeList:[
           {
            name:'彩信',
            value:'0'
        },
           {
            name:'邮箱',
            value:'1'
        },
        {
            name:'App推送',
            value:'2'
        },
        {
           name:'邮箱订阅',
            value:'3'
        }
      ],
      rangRelation:[
         {
           name:'=',
            value:'0'
        },
         {
            name:'≠',
            value:'1'
         },
          {
           name:'>',
            value:'2'
        },
         {
            name:'≧',
            value:'3'
         },
          {
           name:'<',
            value:'4'
        },
         {
            name:'≦',
            value:'5'
         },
         {
            name:'区间',
            value:'6'
         },

      ],
      labelRelation:[
        {
           name:'等于',
            value:'0'
        },
         {
            name:'不等于',
            value:'1'
         },
          {
           name:'包含',
            value:'2'
        },
         {
            name:'不包含',
            value:'3'
         },
          {
           name:'有值',
            value:'4'
        },
         {
            name:'为空',
            value:'5'
         },
      ],
      reportStatusList:[
          {
            name:'已完成送达',
            value:'0'
        },
         {
            name:'未完成送达',
            value:'1'
         }
      ],
      clickStatusList:[
          {
            name:'完成点击',
            value:'0'
        },
         {
            name:'未完成点击',
            value:'1'
         }

      ],
      clickTimeList:[
          {
            name:'分钟内',
            value:'0'
        },
         {
            name:'小时内',
            value:'1'
         }
      ],
      reportTimeList:[
         {
            name:'分钟',
            value:'0'
        },
         {
            name:'小时',
            value:'1'
         }
      ],
      num: 1,
      getIndex:0,
      avtivefilter:false,
      dialogObjectVisible:false,
      relateList:'',
      seriesConnect:[],
      shuntConnect:[],
      shuntFilters:[
          {
            name:'短信',
            value:0
        },
         {
            name:'微信公众号',
            value:1
        }
     ],
     seriesFilters:[ 
        {
            name:'短信',
            value:0
        },
         {
            name:'微信公众号',
            value:1
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
    sendWayList:[
         {
             name:'并发（同时发送）',
             value:'0'
         },
         {
             name:'串发（从左到右依次发送）',
             value:'1'
         },


    ],
      sendTypeList:[
         {
             name:'逻辑',
             value:'0'
         },
         {
             name:'标签',
             value:'1'
         },
         {
             name:'业务变量',
             value:'2'
         }
    ],
    ifNameList:[],
    ifNameOne:[
        {
             name:'点击',
             value:'0'
         },
         {
             name:'状态报告',
             value:'1'
         },
    ],
    ifNameTwo:[
        {
             name:'客户持卡类型',
             value:'0'
         },
         {
             name:'营销活动参与度',
             value:'1'
         },
    ],
    ifNameThree:[
        {
             name:'消费金额',
             value:'0'
         },
         {
             name:'账户余额',
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
        infoType:'',
        infoClassify: '',
        strategyName: '',
        childStrategyName:'',
        sendType:'0',
        ifName:'0',
        sendWay:'0',
        seriesType:'',
        touchCondition:[
          {
            sendType:'',
            ifName:'',
            clickTime:'',
            clickStatus:'',
            reportStatus:'',
            reportTime:'',
            labelRelate:'',
            labelInput:'',
            rangPelate:'',
            changeDsc:''

          }
        ]
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
      isActive:0,
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
    this.sendWayChange('0')
    this.selectCondition('0')
  },
  methods: {
    clickChange(index){
      this.isActive=index
    },
    addInfoType(){
     this.infoTypeShow=true;
     this.typeBtnShow=false
    },
    addSeriesType(){
      this.seriseTypeShow=true;
      this.seriseBtnShow=false
    },

    infoTypeChange(val){
      this.formData.infoType=''
      this.infoTypeShow=false;
      this.typeBtnShow=true
      let newArr=[]
      this.shuntFilters.forEach(item=>{
          newArr.push(item.name)
      })
      if(newArr.indexOf(val)==-1){
        this.shuntFilters.push({name:val,value:''})
      }else{
        this.$message.warning('已添加该信息类型！')
      }
    },
    infoTypeChange1(val){
      this.formData.seriesType=''
      this.seriseTypeShow=false;
      this.seriseBtnShow=true
      let newArr=[]
      this.seriesFilters.forEach(item=>{
          newArr.push(item.name)
      })
      if(newArr.indexOf(val)==-1){
        this.seriesFilters.push({name:val,value:''})
      }else{
        this.$message.warning('已添加该信息类型！')
      }

    },
    closeDrag(index){
       if (this.shuntFilters.length > 0) {
         this.shuntFilters.splice(index, 1)
       }
    },
    closeDrag1(index){
       if (this.seriesFilters.length > 0) {
         this.seriesFilters.splice(index, 1)
       }
    },
     handleChange(value) {
        console.log(value);
      },
    // 增加子策略
      handleAddType() {
      this.formData.touchCondition.push({
        sendType: '',
        ifName: '',
      })
    },
    //删子策略
    handleDeleteType(index) {
        this.formData.touchCondition.forEach((item,i)=>{
           index=i
        })
      if (this.formData.touchCondition.length > 1) {
         this.formData.touchCondition.splice(index, 1)
       }
    },
    selectCondition(val){
      if(val=='0'){
        this.ifNameList=this.ifNameOne
      }else if(val=='1'){
         this.ifNameList=this.ifNameTwo

      }else{
          this.ifNameList=this.ifNameThree
      }

    },
    sendWayChange(val){
      if(val=='0'){
        this.relateList='&'
      }


    },
    getdata(evt) {
    console.log(evt.draggedContext.filterKey)
    //这里evt.draggedContext后续的内容根据具体的定义变量而定
      },
   datadragEnd(evt) {
    console.log('拖动前的索引 :' + evt.oldIndex)
    console.log('拖动后的索引 :' + evt.newIndex);

    let filters = this.shuntFilters;
    for(let a=0;a<filters.length;a++){
        filters[a].index = a;
    }
    // vm.report.filter = filters;
   },
  datadragEnd1(evt) {
    console.log('拖动前的索引 :' + evt.oldIndex)
    console.log('拖动后的索引 :' + evt.newIndex);

    let filters = this.seriesFilters;
    for(let a=0;a<filters.length;a++){
        filters[a].index = a;
    }
    // vm.report.filter = filters;
   },
    // 返回按钮click
    goBack() {
      this.$emit('closeAdd', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.dragClass{
  .unmove{
    display:none;
  }
}
#dragIdRange{
  width:500px;
  height:100px;
  background: #eee;
}

.centerBlock{
   position: absolute;
   top: 50%;
   left:92%;
   transform:translateY(-50%);
}

 .relateAnd{
    cursor: pointer;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #e9f0f7;
    color: #8492a6;
    font-size: 12px;

 }
 .activeRelate{
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #44a0ff;
    color: #fff;
    font-size: 12px;

 }

.sendTimeList{
  margin-left:35px;
  & /deep/.el-form-item__content{
    margin-left:0px !important;
  }
}
.dragLabel{
  float:left;
  color:#44a0ff;
  font-size:12px;
  margin-left:6px;
  background:#ecf5ff;
  border:1px solid #44a0ff;
  border-radius:3px;
  cursor: pointer;
}
.dragLabel1{
  float:left;
  height:40px;
  line-height:40px;
  color:#44a0ff;
  font-size:12px;
  margin-left:6px;
  background:url('../../assets/img/chuan.svg') no-repeat 100%;
  border-radius:3px;
  cursor: pointer;
}
.relateClass
{
 & /deep/.el-form-item__content{
    margin-left:20px;
  }

} 
.addGroup {
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
</style>
