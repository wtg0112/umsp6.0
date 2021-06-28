<template>
  <div class="templateSend">
    <template v-if="chooseTemplate">
      <el-card class="box-card">
        <el-form
          ref="formData"
          :model="formData"
          label-suffix="："
          label-width="100px"
        >
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item prop="templateName" label="模板名称">
                <el-input
                  v-model="formData.templateName"
                  placeholder="请输入模板名称"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="templateContent" label="模板内容">
                <el-input
                  v-model="formData.templateContent"
                  placeholder="请输入模板内容"
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
        <el-button-group class="buttonGroup">
          <el-button type="primary" @click="templateAdd" size="small"
            >新增模板</el-button
          >
          <!-- <el-button type="primary"  size="small"
          >删除</el-button -->
          <!-- > -->
        </el-button-group>
        <el-table
          ref="filterTable"
          :data="
            tableData.slice((currpage - 1) * pagesize, currpage * pagesize)
          "
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column prop="creator" label="创建者"></el-table-column>
          <el-table-column prop="sCode" label="状态" width="100">
            <template slot-scope="scope">
              {{ scope.row.sCode == '1' ? '已激活' : '未激活' }}
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="100">
            <template slot-scope="scope">
              {{
                scope.row.type == '0' ? '无参数' : `有参数(${scope.row.type})`
              }}
            </template>
          </el-table-column>
          <el-table-column prop="time" label="时间"></el-table-column>
          <el-table-column prop="operate" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="useTemplate(scope.row)">使用</el-button>
              <el-button
                type="success"
                @click="templateEdit(scope.row)"
                size="small"
                >修改</el-button
              >
              <el-button type="info" size="small">停止</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          :total="this.tableData.length"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </el-card>
    </template>
    <template v-else>
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
                          placeholder="请输入任务名称"
                          maxlength="10"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="16">
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
                    <el-col :span="16">
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
                          <el-radio :label="2">发送内容不同</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="16" class="textShowClass">
                      <el-form-item prop="sendNote" label="发送内容">
                        <el-input
                          disabled
                          :style="{
                            background:
                              sendRuleForm.fileType == '1' ? '#fff' : '#eee'
                          }"
                          type="textarea"
                          style="width:100%;height:200px;position:relative;"
                          v-model.trim="sendRuleForm.sendNote"
                          placeholder="请输入发送内容"
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
                              v-model="
                                sendRuleForm.batchSendList[index].phoneNum
                              "
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
                          >
                            <el-date-picker
                              size="small"
                              v-model="
                                sendRuleForm.batchSendList[index].endTime
                              "
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
                  <el-button type="primary" size="small" style="margin-right: 30px;">预览</el-button>
                  <el-button type="primary" plain size="small">创建</el-button>
                  <el-button type="primary" plain size="small" @click="backToTemplate">返回</el-button>
                  <span style="display: inline-block; margin-left: 20px;"
                    >允许的发送时间: {{ startTime }}---{{ endTime }}</span
                  >
                </div>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-card>
    </template>
    <el-dialog
      :title="isAdd ? '添加模板' : '编辑模板'"
      :visible.sync="showDialog"
    >
      <el-form
        ref="dialogFormData"
        :model="dialogFormData"
        label-suffix="："
        label-width="100px"
      >
        <el-form-item prop="name" label="模板名称">
          <el-input
            v-model="dialogFormData.name"
            placeholder="请输入模板名称"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="type" label="模板类型">
          <el-radio-group v-model="dialogFormData.type">
            <el-radio label="0">普通</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="content" label="模板内容">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入模板内容"
            v-model="dialogFormData.content"
            size="small"
          >
          </el-input>
          <span style="color: red;">
            *带参数的模板参数以"{txt}"代替 <br />
            "{txt}"为特殊符号，除代表参数外避免出现。如：尊敬的{txt},您好！
            <br />
            *内容字数在300以内,且在有参数的模板内容中，请勿含有'|','#'特殊符号
          </span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="showDialog = false" size="small"
          >保 存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'templateSend',
  data() {
    return {
      chooseTemplate: true, // 判断是否在选择模板界面
      startTime: '00:00', // 配置的允许发送开始时间
      endTime: '23:59', // 配置的允许发送结束时间
      formData: {},
      dialogFormData: {
        type: '0'
      },
      pagesize: 10,
      currpage: 1,
      tableData: [
        {
          name: '测试模板',
          content: '您好，这是一条测试短信，打扰之处请见谅。',
          creator: 'admin',
          sCode: '1',
          type: '0',
          time: '2021-02-05 10:31:05'
        },
        {
          name: '生日祝福',
          content:
            '您好{txt}先生，今天是{txt}月{txt}日，是您的生日，祝您生日快乐！',
          creator: 'admin',
          sCode: '1',
          type: '0',
          time: '	2019-08-01 14:43:31'
        }
      ],
      isAdd: false,
      showDialog: false,
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
        fileType: 2,
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
  methods: {
    // 切换页 方法
    handleCurrentChange(cpage) {
      this.currpage = cpage
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    },
    // 添加按钮click
    templateAdd() {
      this.isAdd = true
      this.showDialog = true
      // 表单初始化
      this.dialogFormData.name = ''
      this.dialogFormData.type = '0'
      this.dialogFormData.content = ''
    },
    // 编辑按钮click
    templateEdit(data) {
      this.isAdd = false
      this.showDialog = true
      this.dialogFormData = JSON.parse(JSON.stringify(data))
    },
    // 使用按钮click
    useTemplate(data) {
      this.sendRuleForm.sendNote = data.content
      this.chooseTemplate = false
    },
    // 返回按钮click
    backToTemplate() {
      this.chooseTemplate = true
      this.sendRuleForm = {
        taskName: '',
        selectChannel: '',
        infoList: '',
        useLabel: '【广西农信社】',
        auditor: '',
        importTxt: [{ name: '' }],
        fileType: 2,
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
      }
    },
    // 表格项选中事件
    handleSelectionChange(val) {
      console.log(val)
    },
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
<style lang="scss" scoped>
.templateSend /deep/ .el-card {
  position: relative;
}
.buttonGroup {
  // position: absolute;
  // top: 0;
  // left: 40px;
  margin-bottom: 10px;
  margin-left:14px;
  button {
    margin-right: 20px !important;
    border-radius: 4px !important;
  }
}
</style>
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
