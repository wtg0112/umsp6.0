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
            label-suffix=":"
          >
            <el-row :gutter="20">
              <el-col :span="14" style="height:560px;overflow-y:scroll">
                <el-row :gutter="20">
                  <el-col :span="16">
                    <el-form-item
                      prop="taskName"
                      label="任务名称"
                      class="taskStyle"
                    >
                      <el-input
                        size="small"
                        v-model="sendRuleForm.taskName"
                        placeholder="不超过10字符，用作备注标识"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="16">
                    <el-form-item prop="selectChannel" label="选择渠道">
                      <el-select
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
                  <el-col :span="16">
                    <el-form-item prop="infoList" label="信息分类">
                      <el-select
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
                  <el-col :span="16">
                    <el-form-item prop="useLabel" label="使用签名">
                      <el-select
                        disabled
                        size="small"
                        v-model="sendRuleForm.useLabel"
                        placeholder="请选择使用签名"
                      >
                        <el-option
                          v-for="item in labelArr"
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
                  <el-col :span="16">
                    <el-form-item
                      prop="auditor"
                      label="审核员"
                      style="width:100%;"
                    >
                      <el-select
                        size="small"
                        v-model="sendRuleForm.auditor"
                        placeholder="请选择审核员"
                      >
                        <el-option
                          v-for="item in auditArr"
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
                  <el-col :span="16" class="form-item">
                    <el-form-item prop="importTxt" label="选择文件">
                      <input
                        readonly
                        @blur="changeFile($event)"
                        ref="phoneFile"
                        style="width: 46%;float:left;border-top-left-radius:5px;;border-bottom-left-radius:5px;"
                        v-model="sendRuleForm.importTxt[0].name"
                        id="applyLicense"
                        type="text"
                        placeholder="文件支持txt、xls、xlsx格式"
                        autocomplete="off"
                      />
                      <input
                        id="fileInput"
                        type="file"
                        name="file"
                        accept=".xls,.xlsx,.txt"
                        @change="fileChange($event)"
                      />
                      <label for="fileInput" class="file-btn">选择文件</label>
                      <i
                        class="iconfont icon-wenhao"
                        style="margin-left: 10px;font-size: 18px;color:#409EFF;"
                        @click="
                          promptShow == true
                            ? (promptShow = false)
                            : (promptShow = true)
                        "
                      ></i>
                      <p
                        style="color:red;font-size:12px;width:61%;line-height:20px;"
                      >
                        *只能发送编码为GBK和带boom头的utf-8的文件,文件最大50mb,上传含中文的内容时,请先上传测试文件,测试上传内容是否乱码,不同内容的短信，内容中禁止含有'|','#',分隔符
                      </p>
                      <!-- <div  v-show="promptShow"  style="width:94.5%;height:120px;background:#EFF5FB;border:2px solid #eee;padding:10px;line-height:24px;border-radius:10px">
                                 <p><i class="iconfont icon-zhuyi" style="font-size:14px;color:#02A7F0;margin-left:3px;"></i><span style="font-size:14px;color:#000;padding-left:8px;font-weight:700">格式说明</span></p>
                                 <p style="padding-left:24px;">文件最大支持10MB</p>
                                 <p style="padding-left:24px;">文件支持txt、xls、xlsx格式</p>
                                 <p style="padding-left:24px">当文件是txt格式，输入时需手动换行，每行一个手机号</p>
                              </div> -->
                      <img
                        style="width:60%;margin-top:10px;"
                        v-show="promptShow"
                        src="../../assets/img/prompt4.png"
                        alt=""
                      />
                      <!-- <p style="font-size:12px;color:#F56C6C;margin-top:-14px" v-show="selectShow">请选择文件！</p> -->
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="16">
                    <el-form-item prop="fileType" label="文件类型">
                      <el-radio-group
                        v-model="sendRuleForm.fileType"
                        @change="selectChange"
                      >
                        <el-radio :label="1">发送内容相同</el-radio>
                        <el-radio :label="2">发送内容不同</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <p style="margin-top:10px;margin-left:100px;color:#555">
                      您的短信已经输入{{ numTxt }}个字，拆分后，短信条数为0条
                    </p>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="16" class="textShowClass">
                    <el-form-item prop="sendNote" label="发送内容:">
                      <el-input
                        :style="{
                          background:
                            sendRuleForm.fileType == '1' ? '#fff' : '#eee'
                        }"
                        type="textarea"
                        style="width:100%;height:200px;position:relative;"
                        v-model.trim="sendRuleForm.sendNote"
                        placeholder="请编辑您的短信"
                      ></el-input>
                      <!-- <span style="position:absolute;bottom:17px;right:7px;z-index:999;background:#fff;">{{phoneNum}}/200</span> -->
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="16">
                    <el-form-item prop="sendType" label="发送方式">
                      <el-radio-group
                        v-model="sendRuleForm.sendType"
                        @change="selectChange"
                      >
                        <el-radio :label="1">最大速度</el-radio>
                        <el-radio :label="2">匀速发送</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="16">
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
                  <el-col :span="16" v-if="sendRuleForm.sendTime == '2'">
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
                  <el-col v-else-if="sendRuleForm.sendTime == '3'">
                    <el-col
                      :span="7"
                      style="text-align:left;color:#666666;margin-left:10%;"
                      >发送开始</el-col
                    >
                    <el-col :span="7" style="text-align:left;color:#666666"
                      >手机号数量（条）</el-col
                    >
                    <el-col :span="7" style="text-align:left;color:#666666"
                      >发送结束</el-col
                    >
                  </el-col>
                </el-row>

                <el-row
                  :gutter="20"
                  v-if="sendRuleForm.sendTime == '3'"
                  style="background-color: #FBF9FB; padding-top:10px;"
                >
                  <!-- <el-form :model="ruleForm" ref='batchSendList'> -->
                  <el-col
                    :span="23"
                    v-for="(item, index) in sendRuleForm.batchSendList"
                    :key="index"
                    class="sendTimeList"
                  >
                    <div class="operateSendTime">
                      <el-col :span="1"
                        ><span>{{ index + 1 }}</span></el-col
                      >
                      <el-col :span="8">
                        <el-form-item
                          ref="cashCouponRuleListClear"
                          style="margin-bottom:0px;margin-left:0px;"
                          :prop="'batchSendList.' + index + '.startTime'"
                        >
                          <el-date-picker
                            size="small"
                            v-model="
                              sendRuleForm.batchSendList[index].startTime
                            "
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择发送时间"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>

                      <el-col :span="6">
                        <el-form-item
                          style="margin-bottom:0px;"
                          :prop="'batchSendList.' + index + '.phoneNum'"
                        >
                          <!-- @blur="onBlur(item.minLimit,index)" -->
                          <el-input
                            size="small"
                            v-model="sendRuleForm.batchSendList[index].phoneNum"
                            placeholder="请输入手机号数量"
                            type="text"
                            maxlength="18"
                            style="width: 100%"
                          ></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="8">
                        <el-form-item
                          ref="cashCouponRuleListClear"
                          style="margin-bottom:0px;"
                          :prop="'batchSendList.' + index + '.startTime'"
                          :rules="radioValueArr"
                        >
                          <el-date-picker
                            size="small"
                            v-model="sendRuleForm.batchSendList[index].endTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择结束时间"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="1" class="delBtn">
                        <i
                          class="el-icon-delete"
                          v-if="sendRuleForm.batchSendList.length != 0"
                          @click="handleDeleteType(index)"
                        ></i>
                        <el-button v-else
                          ><i class="el-icon-delete" @click.stop></i
                        ></el-button>
                      </el-col>
                    </div>
                    <el-col :span="2" style="margin-top:10px">
                      <el-button
                        size="small"
                        type="primary"
                        class="el-icon-plus"
                        v-if="index == sendRuleForm.batchSendList.length - 1"
                        @click="handleAddType(index)"
                        >添加</el-button
                      >
                      <div v-else style="width:68px"></div>
                    </el-col>
                  </el-col>
                  <!-- </el-form> -->
                </el-row>
              </el-col>
              <el-col
                :span="10"
                style="border-left:2px solid rgb(210,210,210);"
              >
                <div class="preview" style="height: 600px;margin-top:-40px;">
                  <div class="scrollBar">
                    <div class="contentPhone">
                      <div style="width: 100%; height: 350px">
                        <div class="previewPhone">
                          {{
                            sendRuleForm.sendNote != ''
                              ? sendRuleForm.useLabel + sendRuleForm.sendNote
                              : '请输入内容'
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form>
          <el-row :gutter="20">
            <el-col
              style="position:fixed;bottom:0px;background:#fff;border-top:1px solid rgb(210,210,210);"
            >
              <div style="margin:14px 20%;">
                <el-button type="primary" size="small">预览</el-button>
                <el-button type="primary" plain size="small">创建</el-button>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>
<script>
// import qs from 'qs';
export default {
  name: 'fileSend',
  data() {
    return {
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
        useLabel: '【广西农信社】',
        auditor: '',
        importTxt: [{ name: '' }],
        fileType: 1,
        sendType: 1,
        sendTime: 1,
        sendNote: '',
        selectTime: '',
        description: '',

        //
        batchSendList: [
          {
            couponRuleId: '',
            createTime: '',
            id: '',
            maxLimit: '',
            minLimit: '',
            ratio: '',
            rightId: '',
            updateTime: ''
          }
        ]
      },

      mobilPhone: '',
      ruleFormRule: {
        //   {validator:limitPhone,trigger:['blur']
        taskName: [
          { required: true, message: '请编辑您的任务名称!', trigger: 'blur' }
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
          { required: true, message: '请编辑您的短信内容!', trigger: 'blur' }
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
