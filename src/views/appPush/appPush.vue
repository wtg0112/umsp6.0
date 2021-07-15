<template>
  <div class="realLeft">
    <el-card class="mainSet" v-loading="loading">
      <el-container style="width: inherit">
        <el-main style="margin-bottom: 20px">
          <el-form
            :model="sendRuleForm"
            :rules="ruleFormRule"
            ref="sendRuleForm"
            class="Note-ruleForm"
            :inline-message="true"
            label-width="100px"
            label-suffix="："
          >
            <el-row :gutter="20">
              <el-col :span="17">
                <el-row :gutter="20">
                  <el-col :span="21">
                    <el-form-item
                      prop="taskName"
                      label="任务名称"
                      class="taskStyle"
                    >
                      <el-input
                        size="small"
                        v-model="sendRuleForm.taskName"
                        placeholder="请输入任务名称"
                        maxlength="10"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="21">
                    <el-form-item prop="selectChannel" label="选择渠道">
                      <el-select
                        filterable
                        size="small"
                        v-model="sendRuleForm.selectChannel"
                        placeholder="请选择渠道"
                      >
                        <el-option
                          v-for="item in channelArr"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="21">
                    <el-form-item prop="infoList" label="信息分类">
                      <el-select
                        filterable
                        size="small"
                        v-model="sendRuleForm.infoList"
                        placeholder="请选择信息分类"
                      >
                        <el-option
                          v-for="item in infoArr"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                  <el-row :gutter="20">
                  <el-col :span="21">
                    <el-form-item prop="infoList" label="APP应用">
                      <el-select
                        filterable
                        size="small"
                        v-model="sendRuleForm.selectApply"
                        placeholder="请选择APP应用"
                      >
                        <el-option
                          v-for="item in infoArr"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="21">
                    <el-form-item prop="fileType" label="系统类型">
                      <el-radio-group
                        v-model="sendRuleForm.systemType"
                        @change="selectChange"
                      >
                        <el-radio :label="1">Android（安卓）</el-radio>
                        <el-radio :label="2">IOS（苹果）</el-radio>
                        <el-radio :label="3">全部</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="21">
                    <el-form-item prop="fileType" label="通知类型">
                      <el-radio-group
                        v-model="sendRuleForm.noticeType"
                        @change="selectChange"
                      >
                        <el-radio :label="1">通知方式</el-radio>
                        <el-radio :label="2">透传方式</el-radio>
                        <el-radio :label="3">全部类型</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                 <el-row :gutter="24">
                  <el-col :span="24">
                    <el-form-item prop="fileType" label="发送类型">
                      <el-radio-group
                        v-model="sendRuleForm.sendAppType"
                        @change="selectChange"
                      >
                        <el-radio :label="1">Regid（注册号）</el-radio>
                        <el-radio :label="2">Alias (别名）</el-radio>
                        <el-radio :label="3">Account （用户)</el-radio>
                        <el-radio :label="4">Topic（标签）</el-radio>
                        <el-radio :label="5">全部用户</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                 <el-col :span="21">
                        <el-form-item
                          style="margin-bottom:0px;"
                          prop="pushTitle"
                          label="推送标题"
                        >
                          <el-input
                            size="small"
                            v-model="sendRuleForm.pushTitle"
                            placeholder="请输入推送标题"
                            type="text"
                            maxlength="18"
                            style="width: 100%"
                          >（必填）</el-input>
                        </el-form-item>
                      </el-col>
                </el-row>

                <el-row :gutter="20">
                 <el-col :span="21">
                        <el-form-item
                          style="margin-bottom:0px;"
                          prop="msgAbstract"
                          label="消息摘要"
                        >
                          <el-input
                            size="small"
                            v-model="sendRuleForm.msgAbstract"
                            placeholder="请输入消息摘要"
                            type="text"
                            maxlength="18"
                            style="width: 100%"
                          >（必填）</el-input>
                        </el-form-item>
                      </el-col>
                </el-row>

                 <el-row :gutter="20">
                  <el-col :span="21" class="textShowClass">
                    <el-form-item prop="pushObj" label="推送对象">
                      <el-input
                        :style="{
                          background:
                            sendRuleForm.fileType == '1' ? '#fff' : '#eee'
                        }"
                        type="textarea"
                        style="width:100%;height:200px;position:relative;"
                        v-model.trim="sendRuleForm.pushObj"
                        placeholder="请输入推送对象"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="21" class="textShowClass">
                    <el-form-item prop="sendContent" label="发送内容">
                      <el-input
                        :style="{
                          background:
                            sendRuleForm.fileType == '1' ? '#fff' : '#eee'
                        }"
                        type="textarea"
                        style="width:100%;height:200px;position:relative;"
                        v-model.trim="sendRuleForm.sendContent"
                        placeholder="请输入发送内容"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                 <el-row :gutter="20">
                  <el-col :span="21">
                    <el-form-item prop="sendTime" label="发送时间">
                      <el-radio-group v-model="sendRuleForm.sendTime">
                        <el-radio :label="1">即时发送</el-radio>
                        <el-radio :label="2">定时发送</el-radio>
                        <el-radio :label="3">分时分量发送</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                  <el-row :gutter="20">
                    <el-col :span="21" v-if="sendRuleForm.sendTime == '2'">
                      <el-form-item prop="selectTime">
                        <el-date-picker
                          size="small"
                          v-model.trim="sendRuleForm.selectTime"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="请选择发送时间"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
              </el-col>
            </el-row>

               <el-row :gutter="20">
                <el-footer>
                  <el-button type="primary" size="small">预览</el-button>
                    <el-button type="primary" plain size="small">发送</el-button>
                </el-footer>
          </el-row>

          </el-form>
        </el-main>

       
      </el-container>
    </el-card>
  </div>
</template>
<script>
// import qs from 'qs';
export default {
  name: 'appPush',
  data() {
    return {
      startTime: '00:00', // 配置的允许发送开始时间
      endTime: '23:59', // 配置的允许发送结束时间
      numTxt: 0,
      loading: false,
      selectShow: false,
      newText: '',
      promptShow: true,
      bookNum: '',
      isBookRepeat: true,
      channelArr: [
        {
          name: '国都演示',
          value: 0
        },
        {
          name: '核心系统',
          value: 1
        },
        {
          name: '甘肃农信社',
          value: 2
        }
      ],
      infoArr: [
        {
          name: '实时消息',
          value: 0
        },
        {
          name: '营销消息',
          value: 1
        },
        {
          name: '动账消息',
          value: 2
        },
        {
          name: '报警消息',
          value: 3
        }
      ],
      labelArr: [
        {
          name: '【广西农信社】',
          value: '0'
        }
      ],
      auditArr: [
        {
          name: '国都业务1',
          value: 0
        },
        {
          name: '国都业务2',
          value: 1
        }
      ],
      getId: this.$route.query.id,
      lookReturnData: [],
      sendRuleForm: {
        taskName: '',
        selectChannel: '',
        infoList: '',
        selectApply:'',
        systemType:1,
        noticeType:1,
        sendAppType:1,
        pushTitle:'',
        msgAbstract:'',
        pushObj:'',
        sendContent:'',
        sendTime:1,
        selectTime: '',
      },

      mobilPhone: '',
      ruleFormRule: {
        //   {validator:limitPhone,trigger:['blur']
        taskName: [
          { required: true, message: '请输入任务名称!', trigger: 'blur' }
        ],
        selectChannel: [
          {
            required: true,
            message: '请选择渠道!',
            trigger: ['blur', 'change']
          }
        ],
        infoList: [
          {
            required: true,
            message: '请选择信息分类!',
            trigger: ['blur', 'change']
          }
        ],
        pushTitle:[
           {
            required: true,
            message: '请输入推送标题!',
            trigger: ['blur', 'change']
          }
        ],
        msgAbstract:[
           {
            required: true,
            message: '请输入消息摘要!',
            trigger: ['blur', 'change']
          }
        ],
        useLabel: [
          {
            required: true,
            message: '请选择使用签名!',
            trigger: ['blur', 'change']
          }
        ],
        auditor: [
          {
            required: true,
            message: '请选择审核员!',
            trigger: ['blur', 'change']
          }
        ],
        importTxt: [
          {
            required: true,
            message: '请选择文件!',
            trigger: ['blur', 'change']
          }
        ],
        fileType: [
          {
            required: true,
            message: '请选择文件类型!',
            trigger: ['blur', 'change']
          }
        ],
        sendType: [
          {
            required: true,
            message: '请选择发送方式!',
            trigger: ['blur', 'change']
          }
        ],
        sendTime: [
          {
            required: true,
            message: '请选择发送时间!',
            trigger: ['blur', 'change']
          }
        ],
        sendNote: [
          { required: true, message: '请输入短信内容!', trigger: 'blur' }
        ]
      }
    }
  },

  mounted() {},
  methods: {
    selectChange() {},
    //添加分时分量
    handleAddType(index) {
      this.sendRuleForm.batchSendList.push({
        startTime: '',
        phoneNum: '',
        endTime: ''
      })
    },
    //删除分时分量
    handleDeleteType(index) {
      if (this.sendRuleForm.batchSendList.length > 1) {
        this.sendRuleForm.batchSendList.splice(index, 1)
      }
    }
  }
}
</script>
<style scoped lang="less">
@import '../../assets/less/index.less';

//批量导入样式
.form-item {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
}

.form-item span {
  color: #ff3228;
}

.form-item input {
  height: 32px;
  line-height: 32px;
  border: 1px solid #dcdfe6;
  padding-left: 14px;
  box-sizing: border-box;
  font-size: 12px;
}
.form-item input:focus {
  border: 1px solid #dcdfe6 !important;
}
/* 这是原生的input框，给他透明隐藏，然后定位让文件上传的按钮覆盖它 */
#fileInput {
  width: 80px;
  filter: Alpha(opacity=0);
  -moz-opacity: 0;
  opacity: 0;
  position: absolute;
  right: 30px;
  z-index: 2;
}
/* 这是主要的，文件上传按钮的样式 */
.file-btn {
  float: left;
  display: block;
  width: 80px;
  height: 31.5px;
  line-height: 31.5px;
  background: #409eff;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  text-align: center;
  color: #fff;
  position: relative;
  top: 0;
  left: 0;
}
/* 单行文字截断，展示文件名的input框用的 */
#applyLicense {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#applyLicense:focus {
  border: 1px solid #dcdfe6 !important;
}

.redStar {
  color: #ff4949;
  margin-right: 2px;
}

.uploadButton {
  display: inline-block;
}
.downLoad {
  float: right;
  color: #189ae0;
}

.showLength {
  position: absolute;
  top: 0px;
  right: 16px;
}
.paramsStyle {
  margin-left: 6px;
}
.table {
  border-collapse: collapse;
  text-align: center;
}
.table td {
  width: 150px;
  border-right: 1px solid #ddd6d6;
  border-bottom: 1px solid #d8d6dd;
  border-top: 1px solid #d8d6dd;
  border-left: 1px solid #d8d6dd;
}
</style>
<style lang="less">
//批量发送时间
.sendTimeList {
  .operateSendTime {
    width: 99%;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    padding: 5px 16px;
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}

.delBtn {
  cursor: pointer;
}
//  .taskStyle .el-input__inner{
//    width:85% !important;
//  }
//  .Note-ruleForm .el-input{
//   width:70% !important;
// }
// .Note-ruleForm .el-select{
//   width:85%;
// }
.textShowClass {
  .el-textarea__inner {
    height: 200px;
  }
}

.mainSet .el-card__body {
  padding: 0 !important;
}

.realLeft .el-form-item__error--inline {
  display: block;
}
.containerPrize .el-scrollbar__wrap {
  overflow-x: hidden;
}
.realLeft .el-form-item.is-required .el-form-item__label:before {
  content: '*';
  color: #ff4949;
  margin-right: 2px;
}
.realLeft .el-form-item.is-required .el-form-item__label:after {
  content: '';
  color: #ff4949;
  margin-left: 0;
}
.quill-editor:not(.bubble) .ql-container,
.quill-editor:not(.bubble) .ql-container .ql-editor {
  height: 200px;
}
.table {
  border-collapse: collapse;
  text-align: center;
}
.table td {
  width: 80px;
  border-right: 1px solid #ddd6d6;
  border-bottom: 1px solid #d8d6dd;
  border-top: 1px solid #d8d6dd;
  border-left: 1px solid #d8d6dd;
}
</style>
