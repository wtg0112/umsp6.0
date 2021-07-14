<template>
  <div class="realLeft">
      <el-form
            :model="sendRuleForm"
            :rules="sendRuleForm"
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
                                    v-for="(item,index) in infoArr"
                                    :key="index+'info1'"
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
                                  v-for="(item,index) in moduleTypeList"
                                  :key="index+'info2'"
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
                          <div v-if="sendRuleForm.moduleType=='0'">
                              <div class="leftBox" style="width:68%;margin-top:20px;float:left">
                             <el-row :gutter="20">
                               <el-col>
                                    <span style="display:block;float:left;margin-left:20px;margin-right:10px;">业务变量：</span>
                                    <div style="width:52%;height:110px;border:1px solid #eee;float:left" >
                                        <div v-for="(item,index) in labelListArr" :key="index+'info3'" :class="item.active?'labelActive labelLi':' labelLi'" @click="clickIndex(item,index)">{{item.name}}</div>
                                    </div>
                               </el-col>
                              </el-row>

                              <el-row :gutter="20" style="margin-top:20px">
                                      <el-col :span="22">
                                           <!-- <el-form-item prop="moduleType" label="模板内容">
                                                 <el-input  id="insertInput" v-model="hasModuleContent" type="textarea"></el-input>
                                           </el-form-item> -->
                                           <span style="display:block;float:left;">模板内容：</span>
                                        <div class="activeText" contenteditable="true"  id="insertInput"   ref="smsContent">
                                            <p style="line-height:28px;"  id="insertInput" contenteditable="true">您尾号为的京卡于通过手机银行元。 活期余额元。活动，活动链接:</p>
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
                          </div>
                          <div v-else>
                                <div class="leftBox" style="width:68%;margin-top:10px;float:left">
                                  <el-row :gutter="20">
                                         <el-col :span="22" class="moduleClass">
                                           <el-form-item prop="sendWxType" label="模板内容">
                                              <el-input
                                                      type="textarea"
                                                      style="width:80%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendModuleContent"
                                                      placeholder="您尾号为xxxx的京卡于xxxx通过xxxxxxx的xxxx元。活期余额xxxx元。欢迎参加xxx活动，活动链接：xxxxx"
                                              ></el-input>
                                          </el-form-item>
                                          </el-col>
                                    </el-row>
                                </div>
                                <div class="rightBox" style="width:28%;margin-top:20px;float:right;margin-right:40px;">
                                          <div class="preview" style="height: 600px;margin-top:-40px;">
                                              <div class="scrollBar">
                                                <div class="contentPhone">
                                                  <div style="width: 100%; height: 350px">
                                                    <div class="previewBox">
                                                      <span>{{sendRuleForm.sendModuleContent}}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                        </div>
                              </div>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="微信模板预览" name="second">
                            <div v-if="sendRuleForm.moduleType=='0'">
                              <div class="leftBox" style="width:60%;margin-top:20px;float:left">
                                    <el-row :gutter="20">
                                          <el-col :span="18">
                                            <el-form-item prop="module" label="选择模板">
                                              <el-select
                                                filterable
                                                size="small"
                                                v-model="sendRuleForm.module"
                                                placeholder="请选择模板"
                                              >
                                                <el-option
                                                  v-for="(item,index) in sendModuleArr"
                                                  :key="index+'info4'"
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
                                                <div v-for="(item,index) in labelWxArr" :key="index+'info5'" :class="item.active?'labelActive labelLi':' labelLi'" @click="clickIndex(item,index)">{{item.name}}</div>
                                                <div v-for="(item,index) in labelWxRadio" :key="index+'info6'" :class="isActive==index?'labelActive labelLi':' labelLi'" @click="clickRadioIndex(index)">{{item.name}}</div>
                                            </div>
                                      </el-col>
                                      </el-row>

                                      <span style="display:block;float:left;margin:0 16px;font-size:14px;">模板内容：</span>
                                      <div style="display:inline-block;width:58%;height:420px;border:1px solid #eee">
                    
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
                            </div>
                            <div v-else>
                               <div class="leftBox" style="width:60%;margin-top:20px;float:left">
                                    <el-row :gutter="20">
                                          <el-col :span="18">
                                            <el-form-item prop="module" label="选择模板">
                                              <el-select
                                                filterable
                                                size="small"
                                                v-model="sendRuleForm.module"
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
                                      <div style="display:inline-block;width:58%;height:420px;border:1px solid #eee">
                    
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
                                                          v-model.trim="sendRuleForm.desc"
                                                          placeholder="请输入"
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

                                     <el-row :gutter="20">
                                        <el-col :span="16">
                                          <el-form-item prop="inputWxChain"  v-if="sendRuleForm.outWxChain=='2'">
                                            <el-input  v-model="sendRuleForm.inputWxChain"  placeholder="输入链接，必须以'http://'或'https://'开头"></el-input>
                                          </el-form-item>
                                        </el-col>
                                      </el-row>
                                        <el-row :gutter="20">
                                        <el-col :span="16">
                                          <el-form-item prop="inputWxAppChain"  v-if="sendRuleForm.outWxChain=='3'">
                                            <el-input  v-model="sendRuleForm.inputWxAppChain"  placeholder="请输入已关联的小程序appid"></el-input>
                                          </el-form-item>
                                          <el-form-item prop="inputWxAppPath"  v-if="sendRuleForm.outWxChain=='3'" style="margin-top:8px;">
                                            <el-input  v-model="sendRuleForm.inputWxAppPath"  placeholder="请输入小程序页面路径，例：pages/index"></el-input>
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





                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="APP模板预览" name="third">
                          <div v-if="sendRuleForm.moduleType=='0'">
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
                                        <div v-for="(item,index) in labelListArr" :key="index+'-one'" :class="item.active?'labelActive labelLi':' labelLi'" @click="clickIndex(item,index)">{{item.name}}</div>
                                    </div>
                               </el-col>
                              </el-row>

                              <el-row :gutter="20" style="margin-top:20px">
                                      <el-col :span="22">
                                           <el-form-item prop="moduleType" label="模板内容">
                                                 <el-input  id="insertAppInput" v-model="hasAppContent" type="textarea"></el-input>
                                           </el-form-item>
                                      
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
                          </div>
                          <div v-else>
                              <div class="leftBox" style="width:68%;margin-top:10px;float:left">
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
                                         <el-col :span="22" class="moduleClass">
                                           <el-form-item prop="sendWxType" label="模板内容">
                                              <el-input
                                                      type="textarea"
                                                      style="width:80%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendModuleContent"
                                                      placeholder="您尾号为xxxx的京卡于xxxx通过xxxxxxx的xxxx元。活期余额xxxx元。欢迎参加xxx活动，活动链接：xxxxx"
                                              ></el-input>
                                          </el-form-item>
                                          </el-col>
                                    </el-row>
                                </div>
                                <div class="rightBox" style="width:28%;margin-top:20px;float:right;margin-right:40px;">
                                          <div class="preview" style="height: 600px;margin-top:-40px;">
                                              <div class="scrollBar">
                                                <div class="contentPhone">
                                                  <div style="width: 100%; height: 350px">
                                                    <div class="previewBox">
                                                      <span>{{sendRuleForm.sendModuleContent}}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                        </div>
                              </div>
                          </div>
                        </el-tab-pane>
                      </el-tabs>
                      <el-footer style="text-align:center;margin-top:40px;">
                        <el-button type="primary" size="small" disabled>创建</el-button>
                      </el-footer>
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
      hasAppContent:'',
      hasModuleContent:'' ,
      moduleTypeList:[
        {
          name:'有变量（不同内容）',
          value:'0'
        },
        {
          name:'无变量（相同内容）',
          value:'1'
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
          value: '0'
        },
        {
          name: '模板二',
          value: '1'
        }
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
      infoArr: [
        {
          name: '实时消息',
          value: '0'
        },
        {
          name: '营销消息',
          value: '1'
        },
        {
          name: '动账消息',
          value: '2'
        },
        {
          name: '报警消息',
          value: '3'
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
         moduleType:'0',
         selectTime:'',
         manualInput:'',
         openId:'first',
         sendStrategy:'',
        importTxt: [{ name: '' }],
        sendModule:'',
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
    }
  },

  mounted() {
    // this.NoteDeafultText()
  },
  methods: {

        insertHtmlAtCaret(html) {
          let sel, range;
          if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
              range = sel.getRangeAt(0);
              range.deleteContents();
              let el = document.createElement("div");
              el.appendChild(html)
              var frag = document.createDocumentFragment(), node, lastNode;
              while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
              }
              range.insertNode(frag);
              if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
              }
            }
          } else if (document.selection && document.selection.type != "Control") {
            // IE < 9
            document.selection.createRange().pasteHTML(html);
          }
        },
    // 国内短信和App默认输入框拼接展示文字
    NoteDeafultText(){
        let phoneLast=this.labelListArr[0].active?'${'+this.labelListArr[0].name+'}': ''
        let tradTime=this.labelListArr[1].active?'${'+this.labelListArr[1].name+'}': ''
        let tradType=this.labelListArr[2].active?'${'+this.labelListArr[2].name+'}': ''
        let tradMoney=this.labelListArr[3].active?'${'+this.labelListArr[3].name+'}': ''
        let residue=this.labelListArr[4].active?'${'+this.labelListArr[4].name+'}': ''
        let paster=this.labelListArr[5].active?'${'+this.labelListArr[5].name+'}': ''
        let chainvariable=this.labelListArr[6].active?'${'+this.labelListArr[6].name+'}': ''
        this.hasModuleContent ='您尾号为'+phoneLast+'京卡于'+tradTime+'通过手机银行'
         +tradType+tradMoney+'元。' +'活期余额'+residue+'元.'+paster+'活动，活动链接：'+chainvariable;
        this.hasAppContent='您尾号为'+phoneLast+'京卡于'+tradTime+'通过手机银行'
         +tradType+tradMoney+'元。' +'活期余额'+residue+'元.'+paster+'活动，活动链接：'+chainvariable;
    },
    //鼠标光标插入
      insertInputTxt(id, insertTxt){
          var elInput =document.getElementById(id);
          var startPos = elInput.selectionStart;
          var endPos = elInput.selectionEnd;
          if(startPos ===undefined|| endPos ===undefined)return 
          var txt = elInput.value;
          var result = txt.substring(0, startPos) + insertTxt + txt.substring(endPos)    
          elInput.value = result;    
          elInput.focus();  
          this.$nextTick(() => {
                elInput.selectionStart = startPos + insertTxt.length;    
                elInput.selectionEnd = startPos + insertTxt.length;
         })
    },
    // 鼠标光标删除
     romoveInputTxt(id, insertTxt){
          var elInput =document.getElementById(id);
          var startPos = elInput.selectionStart;
          var endPos = elInput.selectionEnd;
          if(startPos ===undefined|| endPos ===undefined)return 
          var txt = elInput.value;
          var result = txt.substring(0, startPos).replace(insertTxt,'') + txt.substring(endPos)    
          elInput.value = result;    
          elInput.focus();  
          this.$nextTick(() => {
                elInput.selectionStart = startPos + insertTxt.length;    
                elInput.selectionEnd = startPos + insertTxt.length;
         })
    },
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
         this.romoveInputTxt('insertInput','${'+item.name+'}')
         this.romoveInputTxt('insertAppInput','${'+item.name+'}')
          this.sendRuleForm.sendWxName=this.labelWxArr[0].active?'${'+this.labelWxArr[0].name+'}':''
         this.sendRuleForm.sendWxTime=this.labelWxArr[1].active?'${'+this.labelWxArr[1].name+'}':''
         this.sendRuleForm.sendWxType=this.labelWxArr[2].active?'${'+this.labelWxArr[2].name+'}':''
         this.sendRuleForm.sendWxMoney=this.labelWxArr[3].active?'${'+this.labelWxArr[3].name+'}':''

      }else{
         Vue.set(item,'active',true)
         this.sendRuleForm.sendWxName=this.labelWxArr[0].active?'${'+this.labelWxArr[0].name+'}':''
         this.sendRuleForm.sendWxTime=this.labelWxArr[1].active?'${'+this.labelWxArr[1].name+'}':''
         this.sendRuleForm.sendWxType=this.labelWxArr[2].active?'${'+this.labelWxArr[2].name+'}':''
         this.sendRuleForm.sendWxMoney=this.labelWxArr[3].active?'${'+this.labelWxArr[3].name+'}':''
         this.sendRuleForm.desc='如需更多服务请拨打银行客户服务热线'
         //鼠标光标位置插入选中的标签
        //  this.insertInputTxt('insertInput','${'+item.name+'}')
        //  this.insertInputTxt('insertAppInput','${'+item.name+'}')
        this.insertHtmlAtCaret(document.getElementById('insertInput'))
       
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
.moduleClass /deep/.el-textarea__inner{
    height:130px;
    overflow-y:auto;
 }
 

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
#insertInput{
   width:67%;
   height:160px;
 }
 #insertAppInput{
   width:67%;
   height:160px;
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
