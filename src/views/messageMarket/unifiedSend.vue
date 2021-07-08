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
          <div style="width:90%;margin:30px auto 0 auto;">
              <el-steps :active="stepActive" finish-status="success">
                <el-step title="步骤 1"></el-step>
                <el-step title="步骤 2"></el-step>
                <el-step title="步骤 3"></el-step>
            </el-steps>
          </div>

         <ul class="module-list" :style="{'width':'3510px','margin-left': moveIndex *1170 + 'px'}">
              <el-container style="width:1170px;float:left;">
                <el-main style="margin-bottom: 20px">
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
                          <el-col :span="16" v-else-if="sendRuleForm.sendTime == '3'" style="margin-left:100px">
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

                        <el-row :gutter="20"
                          v-if="sendRuleForm.sendTime == '3'"
                          style="background-color: #FBF9FB; padding-top:10px;width:58%;margin-left:100px;"
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

                        <el-row :gutter="20">
                          <el-col :span="16">
                            <el-form-item prop="sendUser" label="发送用户">
                              <el-radio-group v-model="sendRuleForm.sendUser">
                                <el-radio :label="1">用户ID</el-radio>
                                <el-radio :label="2">标签</el-radio>
                                <el-radio :label="3">客户分组</el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </el-col>
                        </el-row>

                        <el-row :gutter="20">
                          <el-col :span="16"  class="form-item" v-if="sendRuleForm.sendUser == '1'">
                            <el-tabs v-model="sendRuleForm.openId" type="card" @tab-click="handleClick"  class="tabsChange">
                                  <el-tab-pane label="手动输入" name="first">
                                    <el-form-item prop="importTxt" label="">
                                      <el-input
                                            type="textarea"
                                            style="width:100%;position:relative;"
                                            v-model.trim="sendRuleForm.manualInput"
                                            placeholder="请输入发送内容"
                                        ></el-input>
                                    </el-form-item>
                                  </el-tab-pane>
                                  <el-tab-pane label="批量导入" name="second">
                                      <el-form-item prop="importTxt" label="">
                                          <input
                                          readonly
                                          @blur="changeFile($event)"
                                          ref="phoneFile"
                                          style="width: 70%;float:left;margin-top:5px;border-top-left-radius:5px;;border-bottom-left-radius:5px;"
                                          v-model="sendRuleForm.importTxt[0].name"
                                          id="applyLicense"
                                          type="text"
                                          placeholder="上传带用户openid文件"
                                          autocomplete="off"
                                        />
                                        <input
                                          id="fileInput"
                                          type="file"
                                          name="file"
                                          accept=".xls,.xlsx,.txt"
                                          @change="fileChange($event)"
                                        />
                                          <label for="fileInput" class="file-btn">上传文件</label>
                                        <el-button size="small" type="primary" plain style="margin-left:30px;margin-top:-10px;">下载模板</el-button>
                                      <p
                                        style="color:red;font-size:12px;width:80%%;line-height:20px;"
                                      >注意：最大支持上传50M文件包
                                      </p>
                            </el-form-item>
                                  </el-tab-pane>
                          </el-tabs>
                          </el-col>


                          <el-col :span="16"  v-if="sendRuleForm.sendUser == '2'">
                              <div class="labelList" style="height:100px;scroll-y:scroll;border:1px solid #eee;margin-left:100px;">
                                <div v-for="(item,index) in labelListArr" :key="index" class="labelLi" >{{item.name}}</div>

                              </div>
                          </el-col>
                        </el-row>

                        <el-row :gutter="20">
                          <el-col :span="16">
                            <el-form-item prop="sendStrategy" label="发送策略">
                              <el-select
                                filterable
                                size="small"
                                v-model="sendRuleForm.sendStrategy"
                                placeholder="请选择发送策略"
                              >
                                <el-option
                                  v-for="item in strategyList"
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
                          <el-col :span="16" v-if="sendRuleForm.sendStrategy=='0'">
                            <div style="background:#f0f0f0;padding:4px 10px;margin-left:100px">
                              <p>策略名称：{{strategyName}}</p>
                              <p>发送方式：{{sendType}}</p>
                              <p>发送渠道：{{sendChannel}}</p>
                              <p>逻辑条件：{{logicIf}}</p>
                            </div>
                          </el-col>
                        </el-row>

                        <el-row :gutter="20">
                          <el-col :span="16" v-if="sendRuleForm.sendStrategy=='1'">
                            <div style="background:#f0f0f0;padding:4px 10px;margin-left:100px">
                              <p>策略名称：{{strategyName}}</p>
                              <p>发送方式：{{sendType}}</p>
                              <p>发送渠道：{{sendChannel}}</p>
                              <p>逻辑条件：{{logicIf}}</p>
                            </div>
                          </el-col>
                        </el-row>

                        <el-row :gutter="20">
                          <el-col :span="16">
                            <el-form-item prop="sendModule" label="发送模板">
                              <el-select
                                filterable
                                size="small"
                                v-model="sendRuleForm.sendModule"
                                placeholder="请选择发送模板"
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
                        <el-footer style="margin-top:40px;">
                            <el-button @click="rightmove"  type="primary" plain size="small" >下一步</el-button>
                        </el-footer>
                  </el-main>
              </el-container>

              <el-container style="width:1170px;float:left;">
                  <el-main style="margin-bottom: 20px">
                      <el-tabs v-model="tabActiveChange" @tab-click="handleClick">
                        <el-tab-pane label="短信模板预览" name="first">
                          <div class="leftBox" style="width:60%;margin-top:20px;float:left">
                              <span style="display:block;float:left;">业务变量：</span>
                              <div style="display:inline-block;width:50%;height:360px;border:2px solid #eee">
                                <el-row :gutter="20" style="margin-top:20px">

                                      <el-col :span="22">
                                          <el-form-item prop="sendNoteName" label="尾号">
                                              <el-input
                                                      type="textarea"
                                                      style="width:100%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendNoteName"
                                                      placeholder="请输入尾号"
                                              ></el-input>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                                  <el-row :gutter="20">
                                      <el-col :span="22">
                                          <el-form-item prop="sendNoteTime" label="交易时间">
                                              <el-input
                                                      type="textarea"
                                                      style="width:100%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendNoteTime"
                                                      placeholder="请输入交易时间"
                                              ></el-input>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                                  <el-row :gutter="20">
                                      <el-col :span="22">
                                          <el-form-item prop="sendNoteType" label="交易类型">
                                              <el-input
                                                      type="textarea"
                                                      style="width:100%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendNoteType"
                                                      placeholder="请输入交易类型"
                                              ></el-input>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                                  <el-row :gutter="20">
                                      <el-col :span="22">
                                          <el-form-item prop="sendNoteMoney" label="交易金额">
                                              <el-input
                                                      type="textarea"
                                                      style="width:100%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendNoteMoney"
                                                      placeholder="请输入交易金额"
                                              ></el-input>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                                  <el-row :gutter="20">
                                      <el-col :span="22">
                                          <el-form-item prop="sendActiveMoney" label="账户余额">
                                              <el-input
                                                      type="textarea"
                                                      style="width:100%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendActiveMoney"
                                                      placeholder="请输入账户余额"
                                              ></el-input>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                              </div>
                                <el-row :gutter="20">
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
                        <el-tab-pane label="微信模板预览" name="second">
                          <div class="leftBox" style="width:60%;margin-top:20px;float:left">
                              <span style="display:block;float:left;">业务变量：</span>
                              <div style="display:inline-block;width:60%;height:420px;border:2px solid #eee">
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
                                          <el-form-item prop="activeData" label="{DATA}">
                                              <el-input
                                                      type="textarea"
                                                      style="width:80%;position:relative;"
                                                      v-model.trim="sendRuleForm.activeData"
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
                                      <el-radio-group v-model="sendRuleForm.outWxChain">
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
                                                      <p style="margin:10px 0;">点击"查看详情"立即查阅您的账户的财务记录。</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                    </div>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="APP模板预览" name="third">
                            <div class="leftBox" style="width:60%;margin-top:20px;float:left">
                              <span style="display:block;float:left;">业务变量：</span>
                              <div style="display:inline-block;width:50%;height:360px;border:2px solid #eee">
                                <el-row :gutter="20" style="margin-top:20px">

                                      <el-col :span="22">
                                          <el-form-item prop="sendAppName" label="尾号">
                                              <el-input
                                                      type="textarea"
                                                      style="width:100%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendAppName"
                                                      placeholder="请输入尾号"
                                              ></el-input>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                                  <el-row :gutter="20">
                                      <el-col :span="22">
                                          <el-form-item prop="sendAppTime" label="交易时间">
                                              <el-input
                                                      type="textarea"
                                                      style="width:100%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendAppTime"
                                                      placeholder="请输入交易时间"
                                              ></el-input>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                                  <el-row :gutter="20">
                                      <el-col :span="22">
                                          <el-form-item prop="sendAppType" label="交易类型">
                                              <el-input
                                                      type="textarea"
                                                      style="width:100%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendAppType"
                                                      placeholder="请输入交易类型"
                                              ></el-input>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                                  <el-row :gutter="20">
                                      <el-col :span="22">
                                          <el-form-item prop="sendAppMoney" label="交易金额">
                                              <el-input
                                                      type="textarea"
                                                      style="width:100%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendAppMoney"
                                                      placeholder="请输入交易金额"
                                              ></el-input>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                                  <el-row :gutter="20">
                                      <el-col :span="22">
                                          <el-form-item prop="sendAppAccount" label="账户余额">
                                              <el-input
                                                      type="textarea"
                                                      style="width:100%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendAppAccount"
                                                      placeholder="请输入账户余额"
                                              ></el-input>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                              </div>
                          </div>

                          <div class="rightBox" style="width:28%;margin-top:20px;float:right;margin-right:40px;">
                                      <div class="preview" style="height: 600px;margin-top:-40px;">
                                          <div class="scrollBar">
                                            <div class="contentPhone">
                                              <div style="width: 100%; height: 350px">
                                                  <div class="previewPhone">
                                                   <span>【国都互联】您尾号为
                                                     {{
                                                       sendRuleForm.sendAppName
                                                      ? sendRuleForm.sendAppName  : '${name}'
                                                    }}
                                                    的京卡于
                                                     {{
                                                       sendRuleForm.sendAppTime
                                                      ? sendRuleForm.sendAppTime  : '${time}'
                                                    }}
                                                    通过手机银行转账支出
                                                     {{
                                                       sendRuleForm.sendAppMoney
                                                      ? sendRuleForm.sendAppMoney  : '${money}'
                                                    }}元。
                                                     活期余额
                                                      {{
                                                       sendRuleForm.sendAppAccount
                                                      ? sendRuleForm.sendAppAccount  : '${money}'
                                                    }}元。</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                    </div>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="邮件模板预览" name="fourth">
                          <div class="leftBox" style="width:60%;margin-top:20px;float:left">
                              <span style="display:block;float:left;">业务变量：</span>
                              <div style="display:inline-block;width:50%;height:360px;border:2px solid #eee">
                                <el-row :gutter="20" style="margin-top:20px">
                                      <el-col :span="22">
                                          <el-form-item prop="sendMailName" label="尾号">
                                              <el-input
                                                      type="textarea"
                                                      style="width:100%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendMailName"
                                                      placeholder="请输入尾号"
                                              ></el-input>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                                  <el-row :gutter="20">
                                      <el-col :span="22">
                                          <el-form-item prop="sendMailTime" label="交易时间">
                                              <el-input
                                                      type="textarea"
                                                      style="width:100%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendMailTime"
                                                      placeholder="请输入交易时间"
                                              ></el-input>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                                  <el-row :gutter="20">
                                      <el-col :span="22">
                                          <el-form-item prop="sendMailType" label="交易类型">
                                              <el-input
                                                      type="textarea"
                                                      style="width:100%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendMailType"
                                                      placeholder="请输入交易类型"
                                              ></el-input>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                                  <el-row :gutter="20">
                                      <el-col :span="22">
                                          <el-form-item prop="sendMailMoney" label="交易金额">
                                              <el-input
                                                      type="textarea"
                                                      style="width:100%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendMailMoney"
                                                      placeholder="请输入交易金额"
                                              ></el-input>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                                  <el-row :gutter="20">
                                      <el-col :span="22">
                                          <el-form-item prop="sendMailAccount" label="账户余额">
                                              <el-input
                                                      type="textarea"
                                                      style="width:100%;position:relative;"
                                                      v-model.trim="sendRuleForm.sendMailAccount"
                                                      placeholder="请输入账户余额"
                                              ></el-input>
                                          </el-form-item>
                                      </el-col>
                                </el-row>
                              </div>
                          </div>

                          <div class="rightBox" style="width:28%;margin-top:20px;float:right;margin-right:40px;">
                                      <div class="preview" style="height:600px;margin-top:-40px;">
                                          <div class="scrollBar">
                                            <div class="contentPhone">
                                              <div style="width: 100%; height: 350px">
                                                  <div class="previewPhone">
                                                   <span>【国都互联】您尾号为
                                                     {{
                                                       sendRuleForm.sendMailName
                                                      ? sendRuleForm.sendMailName  : '${name}'
                                                    }}
                                                    的京卡于
                                                     {{
                                                       sendRuleForm.sendMailTime
                                                      ? sendRuleForm.sendMailTime  : '${time}'
                                                    }}
                                                    通过手机银行转账支出
                                                     {{
                                                       sendRuleForm.sendMailMoney
                                                      ? sendRuleForm.sendMailMoney  : '${money}'
                                                    }}元。
                                                     活期余额
                                                      {{
                                                       sendRuleForm.sendMailAccount
                                                      ? sendRuleForm.sendMailAccount  : '${money}'
                                                    }}元。</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                    </div>
                          </div>
                        </el-tab-pane>
                      </el-tabs>
                      <div style="float:left;margin-top:20px;">
                        <el-button @click="leftmove"  type="primary" plain size="small">上一步</el-button>
                        <el-button @click="rightmove"  type="primary" plain size="small">下一步</el-button>
                      </div>
                    </el-main>
                </el-container>

                <el-container style="width:1170px;float:left;">
                  <el-main style="margin-bottom: 20px">
                     <el-row :gutter="20">
                      <el-col :span="23" class="form-item">
                        <el-form-item prop="importTxt" label="选择文件">
                          <input
                            readonly
                            @blur="changeFile($event)"
                            ref="phoneFile"
                            style="width: 46%;margin-top:5px;float:left;border-top-left-radius:5px;;border-bottom-left-radius:5px;"
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
                          <label for="fileInput" class="file-btn">上传文件</label>
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
                            *只能发送编码为GBK和带boom头的utf-8的文件,文件最大50mb,上传含中文的内容时,请先下载上传模板,测试上传内容是否乱码,不同内容的短信，内容中禁止含有'|','#',分隔符
                          </p>

                          <img
                            style="width:60%;margin-top:10px;"
                            v-show="promptShow"
                            src="../../assets/img/prompt4.png"
                            alt=""
                          />
                        <p style="font-size:12px;color:#F56C6C;margin-top:-14px" v-show="selectShow">请选择文件！</p>
                        </el-form-item>
                      </el-col>
                   </el-row>
                   <el-row style="margin-top:30px;">
                     <el-button @click="leftmove"  type="primary" plain size="small">上一步</el-button>
                     <el-button type="primary">确认发送</el-button>
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
export default {
  name: 'send',
  data() {
    return {
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
      labelListArr:[
        {
          name: '标签一',
          value: 0
        },
        {
          name: '标签二',
          value: 1
        },
        {
          name: '标签三',
          value: 2
        },
         {
          name: '标签四',
          value: 3
        },
        {
          name: '标签五',
          value: 4
        },
        {
          name: '标签六',
          value: 5
        },
         {
          name: '标签七',
          value: 6
        },
        {
          name: '标签八',
          value: 7
        },
        {
          name: '标签九',
          value: 8
        },
         {
          name: '标签十',
          value: 9
        },
        {
          name: '标签十一',
          value: 10
        },
        {
          name: '标签十二',
          value: 11
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
        //第一页
         selectChannel: '',
         infoList: '',
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

.labelLi{
  float: left;
  margin-left:10px;
  margin-top:10px;
  padding:0px 6px;
  background:#189ae0;
  color:#fff;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  font-size: 12px;
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
