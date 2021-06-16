<template>
  <div class="realRight">
    <el-card class="mainSet" v-loading="loading">
      <el-container style="width: inherit">
        <el-main style="margin-bottom: 20px">
          <el-row :gutter="20" style="width: 100%">
            <el-col :span="14" style="padding-top: 20px">
              <div style="width: 100%" class="elec-form">
                <el-form
                  :model="sendRuleForm"
                  :rules="ruleFormRule"
                  ref="sendRuleForm"
                  label-width="140px"
                  class="tyj-ruleForm"
                  :inline-message="true"
                >
                  <el-col :span="19">
                    <el-form-item prop="taskName" label="任务名称:">
                      <el-input
                        size="small"
                        v-model="sendRuleForm.taskName"
                        placeholder="不超过10字符，用作备注标识"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </div>
            </el-col>
            <el-col
              :span="8"
              style="padding-top: 20px;"
            >
              <div class="preview" style="height: 600px">
                <div class="scrollBar">
                  <div class="contentPhone">
                    <div style="width: 100%; height: 350px">
                      <div
                        v-for="(item, index) in lookReturnData"
                        :key="index"
                        class="scrollBox"
                      >
                        <span
                          v-if="item.type == '6'"
                          style="font-size: 12px; text-align: left"
                          >{{ item.content }}</span
                        >
                        <!-- <span  v-if="item.type=='5' && firstTextIndex()===index" style="font-size:12px;margin-top:2px;word-break:break-all;text-align:left;display:block;float:left;margin-left:-6px;">{{item.content}}</span> -->
                        <!-- <span  v-if="item.type=='4' && firstTextIndex()===index && (item.content.indexOf('此信息')==-1 && item.content.indexOf('回复')==-1)" style="font-size:12px;text-align:left;margin-left:-4px;">{{newText}}{{item.content}}</span> -->
                        <span
                          v-else-if="
                            item.type == '4' &&
                            item.content.indexOf('此信息') == -1 &&
                            item.content.indexOf('回复') == -1
                          "
                          style="font-size: 12px; text-align: left"
                          >{{ item.content }}</span
                        >
                        <!-- <div   v-if="item.type=='4'&& item.content.indexOf('【')!=-1 && item.content.indexOf('此信息')==-1 && item.content.indexOf('回复')==-1"><span style="font-size:15px;">{{item.content}}</span></div>
                        <span  v-if="item.type=='4'&& item.content.indexOf('【')==-1 && item.content.indexOf('此信息')==-1 && item.content.indexOf('回复')==-1" style="font-size:12px;text-align:left;">{{item.content}}</span> -->
                        <img
                          v-if="item.type == '1'"
                          :src="beforeUrl + '/resources/' + item.url"
                          alt=""
                          style="margin: 10px 0"
                        />
                        <video
                          controls
                          v-if="item.type == '3'"
                          :src="beforeUrl + '/resources/' + item.url"
                          style="width: 208px; margin: 10px 0"
                        >
                          <!-- <source :src="previewObj.video" type="video/mp4">您的浏览器不支持 HTML5 video标签。
                                <source :src="previewObj.video" type="video/3gp">您的浏览器不支持 HTML5 video标签。 -->
                        </video>
                        <audio
                          controls
                          v-if="item.type == '2'"
                          :src="beforeUrl + '/resources/' + item.url"
                          style="width: 208px; margin: 10px 0"
                        >
                          <!-- <source  :src="previewObj.audio" type="audio/mp3" />您的浏览器不支持 HTML5 audio 标签。
                          <source  :src="previewObj.audio" type="audio/ogg" />您的浏览器不支持 HTML5 audio 标签。 -->
                        </audio>
                        <div
                          style="font-size: 12px; text-align: left"
                          v-if="
                            item.type == '4' &&
                            item.content.indexOf('【') == -1 &&
                            (item.content.indexOf('此信息') != -1 ||
                              item.content.indexOf('回复') != -1)
                          "
                        >
                          {{ item.content }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <div style="text-align: center; margin-top: 150px">
                <el-button
                  type="primary"
                  size="small"
                  >预览</el-button
                >
                <el-button size="small" >创建</el-button>
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
  data () {
    return {
      loading: false,
      selectShow: false,
      newText: '',
      promptShow: true,
      bookNum: '',
      isBookRepeat: true,
      beforeUrl: window.location.origin,
      // beforeUrl:'http://192.168.1.139:8003',
      phoneNum: 0,
      previewObj: {
        title: '',
        sign: '',
        image: '',
        video: '',
        text: '',
        audio: ''
      },
      getId: this.$route.query.id,
      lookReturnData: [],
      sendRuleForm: {
        taskName: '',
        moudleTitle: '',
        accountUser: '',
        numberImport: 1,
        importNumber: [{ name: '' }],
        inputNumber: '',
        sendTime: 1,
        selectTime: ''
      },
      mobilPhone: '',
      ruleFormRule: {
        //   {validator:limitPhone,trigger:['blur']
        taskName: [
          { required: true, message: '请编辑您的任务名称!', trigger: 'blur' }
        ],
        moudleTitle: [
          { required: true, message: '请编辑您的模板标题!', trigger: 'blur' }
        ],
        accountUser: [
          { required: true, message: '请编辑您的通道用户', tigger: 'blur' }
        ],
        numberImport: [
          { required: true, message: '请选择号码导入方式!', trigger: 'blur' }
        ],
        importNumber: [
          { required: true, message: '请选择文件!', trigger: 'change' }
        ],
        inputNumber: [
          { required: true, message: '请输入号码!', trigger: 'blur' }
        ],
        sendTime: [
          { required: true, message: '请选择发送时间!', trigger: 'blur' }
        ]
      }
    }
  },

  mounted () {},
  methods: {}
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
    margin-bottom:10px;
}

.form-item span {
    color: #FF3228;
}

.form-item input {
    height: 32px;
    line-height: 32px;
    border: 1px solid #DCDFE6;
    padding-left: 14px;
    box-sizing: border-box;
    font-size: 12px;
}
.form-item input:focus{
    border: 1px solid #DCDFE6 !important;
}
/* 这是原生的input框，给他透明隐藏，然后定位让文件上传的按钮覆盖它 */
#fileInput {
    width: 80px;
    filter: Alpha(opacity=0);
    -moz-opacity:0;
    opacity: 0;
    position: absolute;
    right:30px;
    z-index: 2;
}
/* 这是主要的，文件上传按钮的样式 */
.file-btn {
    float: left;
    display: block;
    width:120px;
    height:31px;
    line-height: 31px;
    background:#02A7F0;
    border-top-right-radius:5px;
    border-bottom-right-radius:5px;
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
#applyLicense:focus{
    border: 1px solid #DCDFE6 !important;
}

.lengthChange {
  position: absolute;
  right: 8px;
  bottom: -5px;
}
.uploadfile {
  display: inline-block;
  margin-left: 10px;
}
.redStar{
  color: #ff4949;
  margin-right: 2px;
}
.loadingDialog {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 300px;
  height: 50px;
  line-height: 50px;
  background: rgba(0,0,0,0.6);
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  text-align: center;
}
.uploadCreate {
  width: 100%;
  background-color: rgba(250,250,252,1);
  padding: 10px;
}
.uploadCreate1 {
  width: 100%;
  background-color: rgba(250,250,252,1);
  padding: 0px 10px;
}
.createHandle {
  width: 100%;
  background-color: rgba(250,250,252,1);
  padding: 10px;
  border-top: 1px solid rgba(241,241,241,1);
}
.createHandle1 {
  width: 100%;
  background-color: rgba(250,250,252,1);
  padding: 0px 10px;
  border-top: 1px solid rgba(241,241,241,1);
}
.uploadButton {
  display: inline-block;
}
.downLoad {
  float: right;
  color: #189AE0;
}
.content {
  width: 200px;
  margin-left: 100px;
}
.content  .right{
  width: 120px;
  margin-left: 70px;
  text-align: left;
}
.sceneSelect {
  position: relative;
}
.sceneSelect .floatSen {
  position: absolute;
  top:0;

}

.showLength{
  position:absolute;
  top:0px;
  right:16px;
}
.paramsStyle{
  margin-left:6px;
}
.ruleBrief {
  flex: 1;
}
.ruleBtn {
  cursor: pointer;
  z-index: 10;
}
.prizeInfo-time {
  color: #b5b5b5;
  font-size: 8px;
}
// .footer {
//  border-top: 1px solid #ddd6d6;
//   position: fixed;
//   width: 82%;
//   text-align: center;
//   bottom: 0;
//   padding: 10px;
//   background-color: rgb(255, 255, 255);
//   z-index: 1;
// }
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
.textShowClass{
    .el-textarea__inner{
        height: 200px;
    }
}

.changeErr .el-form-item__error--inline{
    position: relative;
    top: 0px !important;
    left: 16px !important;
    margin-left:0 !important;
}
.tyj-ruleForm .el-form-item__error:before{
    display:block;
    width:12px;
    height:12px;
    position: absolute;
    top:5px;
    left:-15px;
    z-index:1;
    content: '';
    /* background-image:url(../../assets/imgs/errorMsg.png); */
    background-size:12px 12px;
}
.mainSet .el-card__body{
  padding:0 !important;
}

.realRight .el-form-item__error--inline{
  display: block;
}
.containerPrize .el-scrollbar__wrap{
  overflow-x: hidden;
}
.realRight .el-form-item.is-required .el-form-item__label:before {
  content: "*";
  color: #ff4949;
  margin-right: 2px;
}
.realRight .el-form-item.is-required .el-form-item__label:after {
  content: "";
  color: #ff4949;
  margin-left: 0;
}
.quill-editor:not(.bubble) .ql-container,
.quill-editor:not(.bubble) .ql-container .ql-editor {
  height: 200px;
}
.elec-form .el-form-item {
  margin-bottom: 5px;
}
.elec-form .el-form-item__content {
  font-size: 12px;
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
