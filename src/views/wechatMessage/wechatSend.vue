<template>
  <div class="fastSend">
    <el-card class="mainSet" v-loading="loading">
      <el-container style="width: inherit">
        <el-main style="margin-bottom: 20px">
          <el-form
            ref="formData"
            :model="formData"
            label-suffix="："
            label-width="100px"
          >
            <el-row :gutter="20">
              <el-col :span="14">
                <el-row :gutter="20">
                  <el-col :span="16">
                    <el-form-item
                      prop="taskName"
                      label="任务名称"
                      :rules="{
                        required: true,
                        message: '请输入任务名称!',
                        trigger: 'blur'
                      }"
                    >
                      <el-input
                        size="small"
                        v-model="formData.taskName"
                        placeholder="请输入任务名称"
                        maxlength="10"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="16">
                    <el-form-item prop="qudao" label="选择渠道">
                      <el-select
                        v-model="formData.qudao"
                        filterable
                        size="small"
                      >
                        <el-option
                          v-for="item in channelList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="16">
                    <el-form-item prop="classify" label="信息分类">
                      <el-select
                        v-model="formData.classify"
                        size="small"
                        filterable
                      >
                        <el-option
                          v-for="item in infoClassify"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                 <el-row :gutter="20">
                  <el-col :span="16">
                    <el-form-item prop="auditor" label="审核人员">
                      <el-select
                        v-model="formData.auditor"
                        size="small"
                        filterable
                      >
                        <el-option
                          v-for="item in auditList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="16">
                    <el-form-item prop="sign" label="公众号">
                      <el-select
                        v-model="formData.wechatSubscript"
                        size="small"
                        filterable
                      >
                        <el-option
                          v-for="item in wechatSubscriptList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="16">
                    <el-form-item prop="search" label="微信模板">
                      <el-select
                        v-model="formData.wechatModule"
                        clearable
                        placeholder="请选择微信模板"
                        size="small"
                        filterable
                      >
                        <el-option
                          v-for="item in wechatModuleList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                 <el-row :gutter="20">
                  <el-col :span="16">
                    <el-form-item prop="search" label="发送方式">
                      <el-select
                        v-model="formData.sendWay"
                        clearable
                        placeholder="请选择发送方式"
                        size="small"
                        filterable
                      >
                        <el-option
                          v-for="item in sendWayList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                 </el-row>

                <el-row :gutter="20">
                   <el-col :span="24">
                              <div class="leftBox" style="width:100%;margin-top:20px;float:left">
                                    <el-row :gutter="20">
                                          <el-col :span="18">
                                            <el-form-item prop="module" label="选择模板">
                                              <el-select
                                                filterable
                                                size="small"
                                                v-model="formData.module"
                                                placeholder="请选择模板"
                                              >
                                                <el-option
                                                  v-for="(item,index) in sendModuleArr"
                                                  :key="index+'only'"
                                                  :label="item.name"
                                                  :value="item.value"
                                                >
                                                </el-option>
                                              </el-select>
                                            </el-form-item>
                                          </el-col>
                                    </el-row>

                                    <span style="display:block;float:left;margin:0 16px;font-size:14px;">模板内容：</span>
                                    <div style="display:inline-block;width:58%;border:1px solid #eee">
                                           <el-row :gutter="20" style="margin-top:20px">
                                                  <el-col :span="22">
                                                    <div style="border:1px solid rgba(255, 229, 143, 1);margin-left:28px;padding:8px 10px;font-size:12px;background:rgba(255, 251, 230, 1);border-radius:3px;">
                                                      <i class="el-icon-warning" style="color:#FAAD14;font-size:12px;"></i>
                                                      <span style="margin-left:5px;">微信接口限制，模板消息内容请控制在200字以内!</span>
                                                      </div>
                                                  </el-col>
                                            </el-row>
                                              <el-row :gutter="20" style="margin-top:20px">
                                                  <el-col :span="22">
                                              <el-form-item prop="firstData" label="first.Data">
                                                                    <el-input
                                                                            type="textarea"
                                                                            style="width:80%;position:relative;"
                                                                            v-model="formData.firstData"
                                                                            placeholder="请输入"
                                                                    ></el-input>
                                                                    <div style="margin-left:10px;float:right;height:40px;line-height:18px;width:15%;text-align:center;">
                                                                      <el-color-picker   v-model="color1"></el-color-picker>
                                                                      <p class="demonstration">颜色</p>
                                                                    </div>
                                                      </el-form-item>
                                                  </el-col>
                                              </el-row>

                                              <el-row :gutter="20">
                                                  <el-col :span="22">
                                                      <el-form-item prop="changeTime" label="变动时间">
                                                          <el-input
                                                                  type="textarea"
                                                                  style="width:80%;position:relative;"
                                                                  v-model="formData.changeTime"
                                                                  placeholder="请输入变动时间"
                                                          ></el-input>
                                                            <div style="margin-left:10px;float:right;height:40px;line-height:18px;width:15%;text-align:center;">
                                                            <el-color-picker   v-model="color2"></el-color-picker>
                                                            <p class="demonstration">颜色</p>
                                                          </div>
                                                      </el-form-item>
                                                  </el-col>
                                              </el-row>

                                              <el-row :gutter="20">
                                                  <el-col :span="22">
                                                      <el-form-item prop="changeMoney" label="变动金额">
                                                          <el-input
                                                                  type="textarea"
                                                                  style="width:80%;position:relative;"
                                                                  v-model.trim="formData.changeMoney"
                                                                  placeholder="请输入，空格可换行"
                                                          ></el-input>
                                                            <div style="margin-left:10px;float:right;height:40px;line-height:18px;width:15%;text-align:center;">
                                                            <el-color-picker   v-model="color3"></el-color-picker>
                                                            <p class="demonstration">颜色</p>
                                                          </div>
                                                      </el-form-item>
                                                  </el-col>
                                              </el-row>

                                              <el-row :gutter="20">
                                                  <el-col :span="22">
                                                      <el-form-item prop="typeData" label="type.DATA">
                                                          <el-input
                                                                  type="textarea"
                                                                  style="width:80%;position:relative;"
                                                                  v-model.trim="formData.typeData"
                                                                  placeholder="请输入，空格可换行"
                                                          ></el-input>
                                                            <div style="margin-left:10px;float:right;height:40px;line-height:18px;width:15%;text-align:center;">
                                                            <el-color-picker   v-model="color4"></el-color-picker>
                                                            <p class="demonstration">颜色</p>
                                                          </div>
                                                      </el-form-item>
                                                  </el-col>
                                              </el-row>

                                               <el-row :gutter="20">
                                                  <el-col :span="22">
                                                      <el-form-item prop="accountMoney" label="账户余额">
                                                          <el-input
                                                                  type="textarea"
                                                                  style="width:80%;position:relative;"
                                                                  v-model.trim="formData.accountMoney"
                                                                  placeholder="请输入，空格可换行"
                                                          ></el-input>
                                                            <div style="margin-left:10px;float:right;height:40px;line-height:18px;width:15%;text-align:center;">
                                                            <el-color-picker   v-model="color3"></el-color-picker>
                                                            <p class="demonstration">颜色</p>
                                                          </div>
                                                      </el-form-item>
                                                  </el-col>
                                              </el-row>

                                              <el-row :gutter="20">
                                                  <el-col :span="22">
                                                      <el-form-item prop="remarkData" label="remark.DATA">
                                                          <el-input
                                                                  type="textarea"
                                                                  style="width:80%;position:relative;"
                                                                  v-model.trim="formData.remarkData"
                                                                  placeholder="请输入，空格可换行"
                                                          ></el-input>
                                                            <div style="margin-left:10px;float:right;height:40px;line-height:18px;width:15%;text-align:center;">
                                                            <el-color-picker   v-model="color4"></el-color-picker>
                                                            <p class="demonstration">颜色</p>
                                                          </div>
                                                      </el-form-item>
                                                  </el-col>
                                              </el-row>
                                      </div>

                                      <el-row :gutter="20">
                                          <el-col :span="20">
                                            <el-form-item prop="outWxChain" label="插入链接">
                                              <el-radio-group v-model="formData.outWxChain" @change="changeChain(formData.outWxChain)">
                                                <el-radio :label="1">无</el-radio>
                                                <el-radio :label="2">跳转链接（支持外链）</el-radio>
                                                <el-radio :label="3">跳转小程序</el-radio>
                                              </el-radio-group>
                                            </el-form-item>
                                          </el-col>
                                      </el-row>

                                     <el-row :gutter="20">
                                        <el-col :span="16">
                                          <el-form-item prop="inputWxChain"  v-if="formData.outWxChain=='2'">
                                            <el-input  v-model="formData.inputWxChain"  placeholder="输入链接，必须以'http://'或'https://'开头"></el-input>
                                          </el-form-item>
                                        </el-col>
                                      </el-row>

                                      <el-row :gutter="20">
                                          <el-col :span="16">
                                            <el-form-item prop="inputWxAppChain"  v-if="formData.outWxChain=='3'">
                                              <el-input  v-model="formData.inputWxAppChain"  placeholder="请输入已关联的小程序appid"></el-input>
                                            </el-form-item>
                                            <el-form-item prop="inputWxAppPath"  v-if="formData.outWxChain=='3'" style="margin-top:8px;">
                                              <el-input  v-model="formData.inputWxAppPath"  placeholder="请输入小程序页面路径，例：pages/index"></el-input>
                                            </el-form-item>
                                          </el-col>
                                     </el-row>
                              </div>
                             
                  </el-col>
              </el-row>

                <el-row :gutter="20">
                  <el-col :span="16">
                      <el-form-item
                        prop="phone"
                        label="openid"
                        :rules="{
                          validator: phoneMulValidate,
                          trigger: 'blur'
                        }"
                      >
                        <el-input
                          type="textarea"
                          :rows="4"
                          placeholder="请输入手机号"
                          v-model="formData.phone"
                          size="small"
                        >
                        </el-input>
                      </el-form-item>
                      <p
                        style="color: red; text-indent: 100px; margin-top: 20px;"
                      >
                        (注意：只能发送一个号码)
                      </p>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="16">
                    <el-form-item
                      prop="content"
                      label="发送内容"
                      :rules="{
                        required: true,
                        message: '请输入发送内容!',
                        trigger: 'blur'
                      }"
                    >
                      <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入发送内容"
                        v-model="formData.content"
                        @input="contentInput"
                        size="small"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row> 
              </el-col>
              <el-col :span="9">
                    <div class="rightBox" style="width:100%;margin-top:20px;margin:0 auto">
                                      <div class="preview" style="height:600px;margin-top:-40px;">
                                          <div class="scrollBar">
                                            <div class="contentPhone">
                                              <div style="width: 100%; height: 350px">
                                                <div class="previewWx">
                                                     <p>账户资金变动提醒</p>
                                                     <p style="margin-top:20px;">{{formData.firstData?formData.firstData:'您好，您于2013/10/29 15:24有一笔现金账户充值到账：'}}</p>
                                                     <p style="margin-top:20px;"> 变动时间：<span :style="{'color':color1}">{{
                                                        formData.changeTime?formData.changeTime  : '${changeTime}'
                                                       }}</span>
                                                     </p>
                                                     <p>变动金额:<span :style="{'color':color2}">{{
                                                        formData.changeMoney?formData.changeMoney  : '${changeMoney}'
                                                       }}</span>
                                                     </p>
                                                       <p>现金账户余额：<span :style="{'color':color3}">{{
                                                        formData.accountMoney?formData.accountMoney  : '${accountMoney}'
                                                       }}</span>
                                                     </p>
                                                     <p>交易金额：<span :style="{'color':color4}">{{
                                                        formData.changeMoney?formData.changeMoney  : '${changeMoney}'
                                                       }}</span>
                                                     </p>
                                                      <p style="margin:10px 0;">{{formData.desc}}</p>
                                                      <p v-if="isActive==0" style="border-top:1px solid #eee;line-height:20px;padding-top:8px;">
                                                        <span style="float:left;">详情</span>
                                                        <span style="float:right;">></span>
                                                      </p>
                                                       <p v-else-if="isActive==1" style="border-top:1px solid #eee;line-height:20px;padding-top:8px;">
                                                        <span style="float:left;"><i class="iconfont icon-nongyeyinhang" style="color:#1b8e91"></i>农业银行</span>
                                                        <span style="float:right;"><i class="iconfont icon-xiaochengxu1" style="color:#9ea6c7"> </i>小程序></span>
                                                      </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                    </div>
                              </div>
              </el-col>
            </el-row>
          </el-form>
          <el-row :gutter="20">
            <el-footer>
              <el-button type="primary" size="small">发送</el-button>
            </el-footer>
          </el-row>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'wechatSend',
  data() {
    return {
      startTime: '00:00', // 配置的允许发送开始时间
      endTime: '23:59', // 配置的允许发送结束时间
      word: 0, // 字数
      slip: 0, // 条数
      publicShowData: null, // 选择完公共通讯录显示数组
      personalShowData: null, // 选择完个人通讯录显示数组
      mailDialog: false, // 通讯录弹框显隐
      searchDialog: false, // 精确搜索弹框显隐
      pagesize: 10,
      currpage: 1,
      color1:'#000',
      color2:'#000',
      color3:'#000',
      color4:'#000',
      color5:'#000',
      sendModuleArr:[],
      formData: {
        taskName:'',
        qudao: '0',
        classify: '0',
        auditor:'',
        wechatSubscript: '0',
        wechatModule: '0',
        sendWay:'0',
        phone:'',
        content: '',
        sendType: 1,
        module:'',

        //微信模板
        firstData:'',
        changeTime:'',
        changeMoney:'',
        typeData:'',
        accountMoney:'',
        remarkData:'',
        outWxChain:1,
        inputWxChain:'',
        inputWxAppChain:'',
        phone:'',
        content:'',
      }, // 外部表单
      searchFormData: {
        sel: '0'
      }, // 精确搜索表单
      tableData: [], // 表格数据
      auditList:[
        {
          value: '0',
          label: 'admin'
        },
         {
          value: '1',
          label: '张三'
        },
         {
          value: '2',
          label: '李四'
        }
      ],
      channelList:[
         {
          value: '0',
          label: '国都演示'
        },
         {
          value: '1',
          label: '核心系统'
        },
         {
          value: '2',
          label: '甘肃农信社'
        }
      ],
      infoClassify: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '营销消息'
        },
        {
          value: '1',
          label: '动账消息'
        },
        {
          value: '2',
          label: '报警消息'
        },
          {
          value: '3',
          label: '邮件消息'
        },
          {
          value: '4',
          label: '微信消息'
        },
          {
          value: '5',
          label: '安卓消息'
        },
         {
          value: '6',
          label: '苹果消息'
        }
      ],
      wechatModuleList:[
         {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '充值通知'
        },
        {
          value: '1',
          label: '密码修改提醒'
        },
        {
          value: '2',
          label: '账户推广下线提醒'
        },
          {
          value: '3',
          label: '账户资金变动提醒'
        },

      ],
      wechatSubscriptList:[
         {
          value: '',
          label: '全部'
         },
          {
          value: '0',
          label: '云端消息服务平台'
         },
      ],
      sendWayList:[
        {
          value: '',
          label: '全部'
         },
          {
          value: '0',
          label: '相同内容发送'
         },
          {
          value: '1',
          label: '不同内容发送'
         },
      ],
      sign: [
        {
          value: '【中国农业银行】',
          label: '【中国农业银行】'
        }
      ],
      mailList: [
        {
          value: '0',
          label: '公共通讯录'
        },
        {
          value: '1',
          label: '个人通讯录'
        },
        {
          value: '2',
          label: '精确搜索'
        }
      ],
      organizeList: [
        {
          value: '0',
          label: '公共组'
        },
        {
          value: '1',
          label: '个人组'
        }
      ],
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        disabled: 'chkDisabled'
      },
      loading: false
    }
  },
  methods: {
    // 切换页 方法
    handleCurrentChange(cpage) {
      this.currpage = cpage
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    },
    // 内容框输入
    contentInput(val) {
      if (val.length !== 0) {
        this.word = val.length + this.formData.sign.length
      } else {
        this.word = 0
      }
    },
    // 通讯录树图数据处理func
    handleTree(arr) {
      let cloneData = JSON.parse(JSON.stringify(arr)) // 对源数据深度克隆
      return cloneData.filter(father => {
        let branchArr = cloneData.filter(
          child => father.groupId == child.pgroupId
        ) //返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : '' //如果存在子级，则给父级添加一个children属性，并赋值
        return father.pgroupId == 0 //返回第一层
      })
    },
    // 选择通讯录提交按钮click
    checkTree() {
      // 0 => 公共通讯录 ， 1 => 个人通讯录
      if (this.formData.search === '0') {
        this.publicShowData = this.$refs.mailTree.getCheckedNodes()
      } else if (this.formData.search === '1') {
        this.personalShowData = this.$refs.mailTree.getCheckedNodes()
      }
      this.mailDialog = false
      // console.log(this.$refs.mailTree.getCheckedNodes())
    },
    // 删除所选通讯录
    mailClose(type, index) {
      // 0 => 公共通讯录 ， 1 => 个人通讯录
      if (type == 0) {
        this.publicShowData.splice(index, 1)
      } else if (type == 1) {
        this.personalShowData.splice(index, 1)
      }
    },
    // 验证提交
    commit() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
@import '../../assets/less/index.less';
</style>
<style lang="scss" scoped>
.p_span {
  font-size: 20px;
  font-weight: bold;
}
.fastSend /deep/ .el-dialog {
  width: 60%;
}
.phone {
  border: 1px solid #f7f7f7;
  width: 310px;
  height: 600px;
  position: relative;
  display: block;
  background: url('../../assets/img/previewPhone.png') no-repeat center;
  background-size: cover;
  .watchCotnentPhone {
    font-family: Arial;
    background-color: #e9e8ed;
    border-radius: 5px;
    max-width: 200px;
    width: auto;
    max-height: 208px;
    padding-left: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 5px;
    word-break: break-all;
    margin-top: 140px;
    margin-left: 35px;
    overflow: auto;
  }
}

.mainSet .el-card__body {
  padding: 0 !important;
}
</style>
