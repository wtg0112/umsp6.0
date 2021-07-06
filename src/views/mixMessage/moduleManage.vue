<template>
  <div class="realLeft">
      <el-form
            :model="sendRuleForm"
            :rules="ruleFormRule"
            ref="sendRuleForm"
            class="Note-ruleForm"
            :inline-message="true"
            label-width="100px"
            label-suffix="："
          >
      <el-card class="mainSet" v-loading="loading" style="width:1170px;">
         <ul class="module-list">
              <el-container>
                <el-main style="margin-bottom: 20px">
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
                                  <el-form-item
                                    style="margin-bottom:0px;"
                                    prop="moduleName"
                                    label="模板名称"
                                  >
                                    <el-input
                                      size="small"
                                      v-model="sendRuleForm.moduleName"
                                      placeholder="请输入模板名称，仅做备注识别使用"
                                      type="text"
                                      maxlength="18"
                                      style="width: 100%"
                                    ></el-input>
                                  </el-form-item>
                                  </el-col>
                        </el-row>

                         <el-row :gutter="20">
                          <el-col :span="16">
                            <el-form-item prop="moduleType" label="模板类型">
                              <el-select
                                filterable
                                size="small"
                                v-model="sendRuleForm.moduleType"
                                placeholder="请选择模板类型"
                              >
                                <el-option
                                  v-for="item in moduleTypeList"
                                  :key="item.value"
                                  :label="item.name"
                                  :value="item.value"
                                >
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>

                        <el-row>
                      <el-tabs v-model="tabActiveChange" @tab-click="handleClick">
                        <el-tab-pane label="国内短信模板" name="first">  
                          <div class="leftBox" style="width:68%;margin-top:20px;float:left">
                             <el-row :gutter="20">
                               <el-col>
                                    <span style="display:block;float:left;">业务变量：</span>
                                    <div style="width:52%;height:110px;border:1px solid #eee;float:left" >
                                        <div v-for="(item,index) in labelListArr" :key="index" :class="item.active?'labelActive labelLi':' labelLi'" @click="clickIndex(item,index)">{{item.name}}</div>
                                    </div>
                               </el-col>
                              </el-row>

                              <el-row :gutter="20" style="margin-top:20px">
                                      <el-col :span="22">
                                         <span style="display:block;float:left;">模板内容：</span>
                                         <div class="activeText">
                                             <p style="line-height:28px;">您尾号为
                                                     <span>{{
                                                       labelListArr[0].active
                                                      ?'${'+labelListArr[0].name+'}' : ''
                                                    }}</span>
                                                    的京卡于
                                                      <span>{{
                                                       labelListArr[1].active
                                                      ?'${'+labelListArr[1].name+'}' : ''
                                                    }}</span>
                                                    通过手机银行
                                                     <span>{{labelListArr[2].active
                                                      ?'${'+labelListArr[2].name+'}' : ''
                                                    }}</span>
                                                      <span>{{labelListArr[3].active
                                                      ?'${'+labelListArr[3].name+'}' : ''
                                                    }}</span>元。
                                                     活期余额
                                                       <span>{{labelListArr[4].active
                                                      ?'${'+labelListArr[4].name+'}' : ''
                                                    }}</span>元。
                                                     <span>{{labelListArr[5].active
                                                      ?'${'+labelListArr[5].name+'}' : ''
                                                    }}</span>活动，活动链接:<span>{{labelListArr[6].active
                                                      ?'${'+labelListArr[6].name+'}' : ''
                                                    }}</span>

                                                    </p>

                                        </div>
                                      
                                      </el-col>
                                </el-row>
                              </div>
                                <!-- <el-row :gutter="20">
                                  <el-col :span="16">
                                    <el-form-item prop="outChain" label="插入链接">
                                      <el-radio-group v-model="sendRuleForm.outChain">
                                        <el-radio :label="1">无</el-radio>
                                        <el-radio :label="2">跳转链接（支持外链）</el-radio>
                                      </el-radio-group>
                                    </el-form-item>
                                  </el-col>
                                </el-row>

                                <el-row :gutter="20">
                                  <el-col :span="16">
                                    <el-form-item prop="inputChain"  v-if="sendRuleForm.outChain=='2'">
                                      <el-input  v-model="sendRuleForm.inputChain"  placeholder="输入链接，必须以'http://'或'https://'开头"></el-input>
                                    </el-form-item>
                                  </el-col>
                                </el-row>
                          </div> -->

                          <div class="rightBox" style="width:28%;margin-top:20px;float:right;margin-right:40px;">
                                      <div class="preview" style="height: 600px;margin-top:-40px;">
                                          <div class="scrollBar">
                                            <div class="contentPhone">
                                              <div style="width: 100%; height: 350px">
                                                <div class="previewPhone">
                                                   <span>【国都互联】您尾号为
                                                     {{
                                                       sendRuleForm.sendNoteName
                                                      ? sendRuleForm.sendNoteName  : '${name}'
                                                    }}
                                                    的京卡于
                                                     {{
                                                       sendRuleForm.sendNoteTime
                                                      ? sendRuleForm.sendNoteTime  : '${time}'
                                                    }}
                                                    通过手机银行转账支出
                                                     {{
                                                       sendRuleForm.sendNoteMoney
                                                      ? sendRuleForm.sendNoteMoney  : '${money}'
                                                    }}元。
                                                     活期余额
                                                      {{
                                                       sendRuleForm.sendActiveMoney
                                                      ? sendRuleForm.sendActiveMoney  : '${money}'
                                                    }}元。</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                    </div>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="微信模板预览" name="second">
                          <div class="leftBox" style="width:60%;margin-top:20px;float:left">
                                <el-row :gutter="20">
                                      <el-col :span="18">
                                        <el-form-item prop="infoList" label="选择模板">
                                          <el-select
                                            filterable
                                            size="small"
                                            v-model="sendRuleForm.module"
                                            placeholder="请选择模板"
                                          >
                                            <el-option
                                              v-for="item in sendModuleArr"
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
                                  <el-col>
                                        <span style="display:block;float:left;margin:0 16px;font-size:14px;">业务变量：</span>
                                        <div style="width:58%;height:110px;border:1px solid #eee;float:left" >
                                            <div v-for="(item,index) in labelWxArr" :key="index" :class="item.active?'labelActive labelLi':' labelLi'" @click="clickIndex(item,index)">{{item.name}}</div>
                                            <div v-for="(item,index) in labelWxRadio" :key="index" :class="isActive==index?'labelActive labelLi':' labelLi'" @click="clickRadioIndex(index)">{{item.name}}</div>
                                        </div>
                                  </el-col>
                                  </el-row>

                                  <span style="display:block;float:left;margin:0 16px;font-size:14px;">模板内容：</span>
                                  <div style="display:inline-block;width:58%;height:420px;border:1px solid #eee">
                                  
                                <el-row :gutter="20" style="margin-top:20px">
                                      <el-col :span="22">
                                        <div style="border:1px solid rgba(255, 229, 143, 1);margin-left:28px;padding:8px 10px;font-size:12px;background:rgba(255, 251, 230, 1);border-radius:3px;">
                                          <i class="iconfont icon-yujing" style="color:#FAAD14;font-size:12px;"></i>
                                          <span style="margin-left:10px;">微信接口限制，模板消息内容请控制在200字以内!</span>
                                          </div>
                                      </el-col>
                                </el-row>

                                <el-row :gutter="20" style="margin-top:20px">
                                      <el-col :span="22">
                                          <el-form-item prop="sendWxName" label="尾号">
                                              <el-input
                                                      type="textarea"
                                                      style="width:80%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendWxName"
                                                      placeholder="请输入尾号"
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
                                          <el-form-item prop="sendWxTime" label="交易时间">
                                              <el-input
                                                      type="textarea"
                                                      style="width:80%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendWxTime"
                                                      placeholder="请输入交易时间"
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
                                          <el-form-item prop="sendWxType" label="交易类型">
                                              <el-input
                                                      type="textarea"
                                                      style="width:80%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendWxType"
                                                      placeholder="请输入交易类型"
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
                                          <el-form-item prop="sendWxMoney" label="交易金额">
                                              <el-input
                                                      type="textarea"
                                                      style="width:80%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendWxMoney"
                                                      placeholder="请输入交易金额"
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
                                          <el-form-item prop="desc" label="备注">
                                              <el-input
                                                      type="textarea"
                                                      style="width:80%;position:relative;"
                                                      v-model.trim="sendRuleForm.desc"                                                      placeholder="请输入"
                                              ></el-input>
                                                 <div style="margin-left:10px;float:right;height:40px;line-height:18px;width:15%;text-align:center;">
                                                <el-color-picker   v-model="color5"></el-color-picker>
                                                <p class="demonstration">颜色</p>
                                               </div>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                              </div>
                               <el-row :gutter="20">
                                  <el-col :span="20">
                                    <el-form-item prop="outWxChain" label="插入链接">
                                      <el-radio-group v-model="sendRuleForm.outWxChain" @change="changeChain(sendRuleForm.outWxChain)">
                                        <el-radio :label="1">无</el-radio>
                                        <el-radio :label="2">跳转链接（支持外链）</el-radio>
                                        <el-radio :label="3">跳转小程序</el-radio>
                                      </el-radio-group>
                                    </el-form-item>
                                  </el-col>
                                </el-row>
                          </div>

                          <div class="rightBox" style="width:28%;margin-top:20px;float:right;margin-right:40px;">
                                      <div class="preview" style="height: 600px;margin-top:-40px;">
                                          <div class="scrollBar">
                                            <div class="contentPhone">
                                              <div style="width: 100%; height: 350px">
                                                <div class="previewWx">
                                                     <p>交易提醒</p>
                                                     <p style="margin-top:20px;">尊敬的客户：</p>
                                                     <p style="margin-top:20px;">您尾号 <span :style="{'color':color1}">{{
                                                        sendRuleForm.sendWxName
                                                         ? sendRuleForm.sendWxName  : '${name}'
                                                       }}</span>借记卡最新交易如下：
                                                     </p>
                                                     <p>交易时间：<span :style="{'color':color2}">{{
                                                        sendRuleForm.sendWxTime
                                                         ? sendRuleForm.sendWxTime  : '${time}'
                                                       }}</span>
                                                     </p>
                                                       <p>交易类型：<span :style="{'color':color3}">{{
                                                        sendRuleForm.sendWxType
                                                         ? sendRuleForm.sendWxType  : '${type}'
                                                       }}</span>
                                                     </p>
                                                     <p>交易金额：<span :style="{'color':color4}">{{
                                                        sendRuleForm.sendWxMoney
                                                         ? sendRuleForm.sendWxMoney  : '${money}'
                                                       }}</span>
                                                     </p>
                                                      <p style="margin:10px 0;">{{sendRuleForm.desc}}</p>
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
                        </el-tab-pane>
                        <el-tab-pane label="APP模板预览" name="third">
                             <div class="leftBox" style="width:68%;margin-top:20px;float:left">
                                 <el-row :gutter="20">
                                    <el-col :span="16">
                                      <el-form-item prop="moduleAppType" label="模板类型">
                                        <el-checkbox-group v-model="sendRuleForm.moduleAppType">
                                            <el-checkbox label="通知栏消息"></el-checkbox>
                                            <el-checkbox label="透传消息"></el-checkbox>
                                          </el-checkbox-group>
                                      </el-form-item>
                                    </el-col>
                               </el-row>
                                <el-row :gutter="20">
                              <el-col :span="16">
                                  <el-form-item
                                    style="margin-bottom:0px;"
                                    prop="moduleName"
                                    label="模板标题"
                                  >
                                    <el-input
                                      size="small"
                                      v-model="sendRuleForm.moduleName"
                                      placeholder="请输入模板标题"
                                      type="text"
                                      maxlength="18"
                                      style="width: 100%"
                                    ></el-input>
                                  </el-form-item>
                                  </el-col>
                        </el-row>

                       
                             <el-row :gutter="20">
                               <el-col>
                                    <span style="display:block;float:left;margin:0 15px;">业务变量：</span>
                                    <div style="width:52%;height:110px;border:1px solid #eee;float:left" >
                                        <div v-for="(item,index) in labelListArr" :key="index" :class="item.active?'labelActive labelLi':' labelLi'" @click="clickIndex(item,index)">{{item.name}}</div>
                                    </div>
                               </el-col>
                              </el-row>

                              <el-row :gutter="20" style="margin-top:20px">
                                      <el-col :span="22">
                                         <span style="display:block;float:left;margin:0 16px">模板内容：</span>
                                         <div class="activeText">
                                             <p style="line-height:28px;">您尾号为
                                                     <span>{{
                                                       labelListArr[0].active
                                                      ?'${'+labelListArr[0].name+'}' : ''
                                                    }}</span>
                                                    的京卡于
                                                      <span>{{
                                                       labelListArr[1].active
                                                      ?'${'+labelListArr[1].name+'}' : ''
                                                    }}</span>
                                                    通过手机银行
                                                     <span>{{labelListArr[2].active
                                                      ?'${'+labelListArr[2].name+'}' : ''
                                                    }}</span>
                                                      <span>{{labelListArr[3].active
                                                      ?'${'+labelListArr[3].name+'}' : ''
                                                    }}</span>元。
                                                     活期余额
                                                       <span>{{labelListArr[4].active
                                                      ?'${'+labelListArr[4].name+'}' : ''
                                                    }}</span>元。
                                                     <span>{{labelListArr[5].active
                                                      ?'${'+labelListArr[5].name+'}' : ''
                                                    }}</span>活动，活动链接:<span>{{labelListArr[6].active
                                                      ?'${'+labelListArr[6].name+'}' : ''
                                                    }}</span>

                                                    </p>

                                        </div>
                                      
                                      </el-col>
                                </el-row>
                              </div>
                              <div class="rightBox" style="width:28%;margin-top:20px;float:right;margin-right:40px;">
                                      <div class="preview" style="height: 600px;margin-top:-40px;">
                                          <div class="scrollBar">
                                            <div class="contentPhone">
                                              <div style="width: 100%; height: 350px">
                                                <div class="previewPhone">
                                                   <span>【国都互联】您尾号为
                                                     {{
                                                       sendRuleForm.sendNoteName
                                                      ? sendRuleForm.sendNoteName  : '${name}'
                                                    }}
                                                    的京卡于
                                                     {{
                                                       sendRuleForm.sendNoteTime
                                                      ? sendRuleForm.sendNoteTime  : '${time}'
                                                    }}
                                                    通过手机银行转账支出
                                                     {{
                                                       sendRuleForm.sendNoteMoney
                                                      ? sendRuleForm.sendNoteMoney  : '${money}'
                                                    }}元。
                                                     活期余额
                                                      {{
                                                       sendRuleForm.sendActiveMoney
                                                      ? sendRuleForm.sendActiveMoney  : '${money}'
                                                    }}元。</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                    </div>
                          </div>
                        </el-tab-pane>
                      </el-tabs>
                    </el-row>
                </el-main>
             </el-container>
          </ul>
    </el-card>
 </el-form>
        
  </div>
</template>
<script>
// import qs from 'qs';
import Vue from 'vue'
export default {
  name: 'send',
  data() {
    return {
      moduleTypeList:[
        {
          name:'有变量（不同内容）',
          value:0
        },
        {
          name:'无变量（相同内容）',
          value:1
        }
      ],
      isActive:0,
      stepActive:0,
      tabActiveChange:'first',
      startTime: '00:00', // 配置的允许发送开始时间
      endTime: '23:59', // 配置的允许发送结束时间
      loading: false,
      selectShow: false,
      promptShow: false,
      strategyName:'金卡动账通知',
      sendType:'并行（同时发送）',
      sendChannel:'短信，微信',
      logicIf:'同时满足',
      sendModuleArr:[
         {
          name: '模板一',
          value: 0
        },
        {
          name: '模板二',
          value: 1
        }
      ],
      strategyList:[
         {
          name: '根据标签精准发送策略',
          value: 0
        },
        {
          name: '普通发送策略',
          value: 1
        },
      ],
      labelWxRadio:[
         {
          name: '链接变量',
          value: 6
        },
         {
          name: '跳转微信小程序（微信专用）',
          value: 7
        }
      ],
      labelWxArr:[
          {
          name: '储蓄卡尾号',
          value: 0
        },
        {
          name: '交易时间',
          value: 1
        },
        {
          name: '交易类型',
          value: 2
        },
         {
          name: '交易金额',
          value: 3
        },
        {
          name: '账户余额',
          value: 4
        },
        {
          name: '智能贴片',
          value: 5
        },
        

      ],
      labelListArr:[
        {
          name: '储蓄卡尾号',
          value: 0
        },
        {
          name: '交易时间',
          value: 1
        },
        {
          name: '交易类型',
          value: 2
        },
         {
          name: '交易金额',
          value: 3
        },
        {
          name: '账户余额',
          value: 4
        },
        {
          name: '智能贴片',
          value: 5
        },
         {
          name: '链接变量',
          value: 6
        }
      ],
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
 

      color1:'#000',
      color2:'#000',
      color3:'#000',
      color4:'#000',
      color5:'#000',
      sendRuleForm: {
        moduleAppType:['通知栏消息','透传消息'],
         infoList: '',
         moduleName:'',
         moduleType:'',
         sendTime:1,
         selectTime:'',
         sendUser:1,
         manualInput:'',
         openId:'first',
         sendStrategy:'',
        importTxt: [{ name: '' }],
        sendModule:'',
        sendUser:1,
        // 第二页
        sendNoteName:'',
        sendNoteTime:'',
        sendNoteType:'',
        sendNoteMoney:'',
        sendActiveMoney:'',
        outChain:1,
        inputChain:'',

        sendWxName:'',
        sendWxTime:'',
        sendWxType:'',
        sendWxMoney:'',
        activeData:'',
        outWxChain:1,
        inputWxChain:'',
        inputWxAppChain:'',
        inputWxAppPath:'',
        activeData:'',

       sendAppName:'',
       sendAppTime:'',
       sendAppType:'',
       sendAppMoney:'',
       sendAppAccount:'',

       sendMailName:'',
       sendMailTime:'',
       sendMailType:'',
       sendMailMoney:'',
       sendMailAccount:'',

    


        batchSendList: [
          {
            startTime:'',
            phoneNum:'',
            endTime:''
          }
        ]
      },
      moveIndex:'0',
      mobilPhone: '',
      ruleFormRule: {
        //   {validator:limitPhone,trigger:['blur']
        sendUser:[
          { required: true, message: '请选择发送用户!', trigger: 'blur' }
        ],
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

  mounted() {},
  methods: {
    changeChain(label){
     if(label==2){
       this.isActive=0
     }else if(label=3){
       this.isActive=1
     }

    },
    //单选的两个按钮
    clickRadioIndex(index){
      this.isActive=index
      if(this.isActive==0){
        this.sendRuleForm.outWxChain=2
      }else{
         this.sendRuleForm.outWxChain=3
      }

    },
    //实现多选
     clickIndex(item,index){
     if(item.active){
         Vue.set(item,'active',false)
         console.log("21242===>",Vue)
      }else{

         Vue.set(item,'active',true)
         this.sendRuleForm.sendWxName=this.labelWxArr[0].active?'${'+this.labelWxArr[0].name+'}':''
         this.sendRuleForm.sendWxTime=this.labelWxArr[1].active?'${'+this.labelWxArr[1].name+'}':''
         this.sendRuleForm.sendWxType=this.labelWxArr[2].active?'${'+this.labelWxArr[2].name+'}':''
         this.sendRuleForm.sendWxMoney=this.labelWxArr[3].active?'${'+this.labelWxArr[3].name+'}':''
         this.sendRuleForm.desc='如需更多服务请拨打银行客户服务热线'

     }

    },
    nextStep(){
       if (this.stepActive++ > 2) this.stepActive = 0;

    },
    handleClick(tab,index){

    },
     leftmove() {
                if (this.moveIndex < 0) {
                    this.moveIndex += 1;
                }
                if (this.stepActive-- < 0) this.stepActive = 0;
      },
     rightmove() {
                if (this.moveIndex > -(3 + this.moveIndex)) {
                    this.moveIndex -= 1;
                }
               if (this.stepActive++ > 2) this.stepActive = 0;
                
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
<style scoped lang="less">
@import '../../assets/less/index.less';

.tabsChange  /deep/.el-tabs__header{
  margin-left:100px;
}
.activeText{
    float:left;
    width:52%;
    height:100px;
    border: 1px solid #eee;
    padding:18px;
    p{
      span{
        background: #1890FF;
        color:#fff;
      }
    }
}
.labelActive{
  background:#1890FF !important;
  color:#fff !important;

}
.labelLi{
  float: left;
  margin-left:10px;
  margin-top:10px;
  padding:0px 6px;
  border: 1px solid #1890FF;
  background:#ecf5ff;
  color:#1890FF;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
}
//批量导入样式
.form-item {
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
  top:4px;
  right: 30px;
  z-index: 2;
}
.fileUp{
  float: left;
  font-size:12px;

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
  top:5px;
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
