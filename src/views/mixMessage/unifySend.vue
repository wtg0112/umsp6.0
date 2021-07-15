<template>
  <div class="realLeft">
    <!-- 客户ID弹框 -->
        <el-dialog  title="选择客户ID" :visible.sync="customerIdShow">
                           <el-card class="box-card">
                               <!-- @selection-change="handleSelectionChange" -->
                                  <el-table
                                          ref="multipleTable"
                                          @selection-change="handleSelectionChange"
                                          :data="cusotmerIdList.slice((currpage - 1) * pagesize, currpage * pagesize)"
                                        >
                                          <el-table-column type="selection" width="55"></el-table-column>
                                          <el-table-column prop="cusId" label="客户ID"></el-table-column>
                                          <el-table-column prop="customer" label="姓名"></el-table-column>
                                    </el-table>
                                    <el-pagination
                                      background
                                      layout="prev, pager, next, sizes, total"
                                      :page-sizes="[5, 10, 15, 20]"
                                      :page-size="pagesize"
                                      :total="cusotmerIdList.length"
                                      @current-change="handleCurrentChange"
                                      @size-change="handleSizeChange"
                                    >
                                    </el-pagination>

                                    <el-footer style="margin-top:20px;text-align:right;">
                                      <el-button type="primary" plain  size="small"  @click="toggleSelection()">取消</el-button>
                                      <el-button type="primary" size="small" @click="confirm">确定</el-button>
                                  </el-footer>
                           </el-card>
          </el-dialog>
          <!-- 标签弹框 -->
            <el-dialog  title="选择标签" :visible.sync="labelShow">
                           <el-card class="box-card">
                             <el-row>
                                  <el-col
                                    :span="7"
                                    style="text-align:left;color:#666666;margin-left:10%;"
                                    >标签名称</el-col
                                  >
                                  <el-col :span="7" style="text-align:left;color:#666666"
                                    >客户描述</el-col
                                  >
                                  <el-col :span="7" style="text-align:left;color:#666666"
                                    >操作</el-col
                                  >
                             </el-row>
                             <el-row
                            :gutter="20"
                            style="background-color: #FBF9FB; padding-top:10px;"
                          >
                            <el-col
                              :span="23"
                              v-for="(item, index) in labelLists"
                              :key="index"
                              class="sendTimeList"
                            >
                              <div class="operateSendTime">
                                <el-col :span="8">
                                     <el-select
                                      filterable
                                      size="small"
                                      v-model="labelLists[index].labelName"
                                      placeholder="请选择标签名称"
                                    >
                                      <el-option
                                        v-for="item in labelNameArr"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.name"
                                      >
                                      </el-option>
                                    </el-select>
                                </el-col>

                                <el-col :span="8">
                                   <el-select
                                     filterable
                                      size="small"
                                      v-model="labelLists[index].customerDec"
                                      placeholder="请选择客户描述"
                                    >
                                      <el-option
                                        v-for="item in decListArr"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.name"
                                      >
                                      </el-option>
                                    </el-select>
                                </el-col>

                                 <el-col :span="1">
                                    <i
                                      class="el-icon-circle-plus"
                                      @click="addDec(index)"
                                      ></i
                                    >
                              </el-col>
                              <el-col :span="1" class="delBtn">
                                  <i
                                    class="el-icon-error"
                                    @click="delDec(index)"
                                  ></i>
                                </el-col>

                               
                              </div>
                              
                            </el-col>
                            <!-- </el-form> -->
                          </el-row>
                          <el-footer style="margin-top:20px;text-align:right;">
                            <el-button type="primary" plain  size="small"  @click="cancelDec()">取消</el-button>
                            <el-button type="primary" size="small"  @click="confirmLabel">确定</el-button>
                          </el-footer>
                    </el-card>
          </el-dialog>
         <!-- 用户分组弹框 -->
       <el-dialog  title="选择客户分组" :visible.sync="groupShow">
                        <el-card class="box-card">
                              <el-table
                                      ref="singleTable"
                                      :data="cusotmerGroupList.slice((currentpage - 1) * pagesizeOne, currentpage * pagesizeOne)"
                                      highlight-current-row
                                      @current-change="handleGroupChange"
                                     >
                                      <el-table-column type="index" width="50"></el-table-column>
                                      <el-table-column prop="cusGroup" label="客户分组"></el-table-column>
                                      <el-table-column prop="groupName" label="分组名称"></el-table-column>
                                </el-table>
                                <el-pagination
                                  background
                                  layout="prev, pager, next, sizes, total"
                                  :page-sizes="[5, 10, 15, 20]"
                                  :page-size="pagesizeOne"
                                  :total="cusotmerGroupList.length"
                                  @current-change="groupCurrentChange"
                                  @size-change="groupSizeChange"
                                >
                                </el-pagination>

                                <el-footer style="margin-top:20px;text-align:right;">
                                  <el-button type="primary" plain  size="small"  @click="cancelGroup()">取消</el-button>
                                  <el-button type="primary" size="small" @click="confirmGroup">确定</el-button>
                              </el-footer>
                        </el-card>
          </el-dialog> 
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
                <el-step ></el-step>
                <el-step></el-step>
                <el-step></el-step>
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
                        </el-row>

                        <el-row :gutter="20">
                          <el-col :span="16">
                            <el-form-item prop="sendUser" label="发送客户">
                              <el-radio-group v-model="sendRuleForm.sendUser"  @change="changeSendUser(sendRuleForm.sendUser)">
                                <el-radio :label="1">客户ID</el-radio>
                                <el-radio :label="2">标签</el-radio>
                                <el-radio :label="3">客户分组</el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        
                        <el-row :gutter="20">
                           <el-col :span="16"  v-if="sendRuleForm.sendUser == '1'">
                              <div class="labelList" style="height:100px;scroll-y:scroll;border:1px solid #eee;margin-left:100px;">
                                <div v-for="(item,index) in multipleList" :key="index" class="labelLi" >{{item.customer}}</div>
                              </div>
                          </el-col>
                        </el-row>

                        <el-row :gutter="20">
                          <el-col :span="16"  v-if="sendRuleForm.sendUser == '2'">
                              <div class="labelList" style="height:100px;scroll-y:scroll;border:1px solid #eee;margin-left:100px;">
                                <div v-for="(item,index) in labelArr" :key="index" class="labelLi" >{{item.labelName}}</div>

                              </div>
                          </el-col>
                        </el-row>

                        <el-row :gutter="20">
                          <el-col :span="16"  v-if="sendRuleForm.sendUser == '3'">
                              <div class="labelList" style="height:100px;scroll-y:scroll;border:1px solid #eee;margin-left:100px;">
                                <div class="labelLi" >{{groupArr.groupName}}</div>
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

                          <!-- <el-row :gutter="20">
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
                         -->
                        <el-footer style="margin-top:40px;">
                            <el-button @click="rightmove"  type="primary" plain size="small" >下一步</el-button>
                        </el-footer>
                  </el-main>
              </el-container>

              <el-container style="width:1170px;float:left;">
                  <el-main style="margin-bottom: 20px">
                      <el-row :gutter="20">
                                <el-col :span="16">
                                  <el-form-item prop="sendModule" label="发送模板" style="margin-left:-17px">
                                    <el-select
                                      filterable
                                      size="small"
                                      v-model="sendRuleForm.moduleType"
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
                        <el-tabs v-model="tabActiveChange" @tab-click="handleClick">
                        <el-tab-pane label="国内短信模板" name="first">
                          <div v-if="sendRuleForm.moduleType==0">
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
                                         <div class="activeText" contenteditable="true"  id="insertInput"   ref="smsContent" @mousedown="insertInput"  v-html="contentNote"  @input="contentNote=$event.target.innerHTML"></div>
                                      </el-col>
                                </el-row>
                              </div>

                              <div class="rightBox" style="width:28%;margin-top:20px;float:right;margin-right:40px;">
                                          <div class="preview" style="height: 600px;margin-top:-40px;">
                                              <div class="scrollBar">
                                                <div class="contentPhone">
                                                  <div style="width: 100%; height: 350px">
                                                    <div class="previewPhone">
                                                      <span v-html="contentNote"></span>
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
                            <div v-if="sendRuleForm.moduleType==0">
                              <div class="leftBox" style="width:60%;margin-top:20px;float:left">
                                    <el-row :gutter="20">
                                          <el-col :span="18">
                                            <el-form-item prop="moduleType" label="选择模板">
                                              <el-select
                                                filterable
                                                size="small"
                                                v-model="sendRuleForm.moduleType"
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
                                            <el-form-item prop="moduleType" label="选择模板">
                                              <el-select
                                                filterable
                                                size="small"
                                                v-model="sendRuleForm.moduleType"
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
                          <div v-if="sendRuleForm.moduleType==0">
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
                                           <span style="display:block;float:left;margin-left:20px;margin-right:9px;">模板内容：</span>
                                           <div class="activeText" contenteditable="true"  id="insertAppInput"   ref="smsContent" @mousedown="insertInput"  v-html="hasAppContent"  @input="hasAppContent=$event.target.innerHTML"></div>
                                      
                                      </el-col>
                                </el-row>
                              </div>
                              <div class="rightBox" style="width:28%;margin-top:20px;float:right;margin-right:40px;">
                                      <div class="preview" style="height: 600px;margin-top:-40px;">
                                          <div class="scrollBar">
                                            <div class="contentPhone">
                                              <div style="width: 100%; height: 350px">
                                                <div class="previewPhone">
                                                   <span v-html="hasAppContent"></span>
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
import Vue from 'vue'
export default {
  name: 'unifuSend',
  data() {
    return {
      contentNote:'您尾号为的京卡于通过手机银行元。活期余额元。活动，活动链接:',
      hasAppContent:'您尾号为的京卡于通过手机银行元。活期余额元。活动，活动链接:',
      isActive:0,
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
      multipleList:[],
      currentRow: null,
      pagesizeOne:5,
      currentpage:1,
      labelNameArr:[
        {
          name:'客户持卡类型',
          value:'1'
        },
         {
          name:'营销活动参与度',
          value:'2'
        }
      ],
      decListArr:[
          {
          name:'金卡',
          value:'1'
        },
         {
          name:'白金卡',
          value:'2'
        },
         {
          name:'VIP',
          value:'3'
        },
      ],
      labelShow:false,
      groupShow:false,
      labelLists:[
        {
          labelName:'客户持卡类型',
          customerDec:'金卡',
        }
      ],
      multipleSelection: [],
      pagesize: 5,
      currpage: 1,
      cusotmerGroupList:[
         {
           cusGroup:'1321',
           groupName:'王小虎'
         },
          {
           cusGroup:'1321',
           groupName:'张三'
         },
          {
            cusGroup:'1321',
            groupName:'李四'
          },
           {
            cusGroup:'1321',
            groupName:'王彪'
          },
      ],
      cusotmerIdList:[
          {
          cusId:'1321',
           customer:'王小虎'
         },
          {
          cusId:'1321',
          customer:'张三'
        },
          {
          cusId:'1321',
          customer:'李四'
        },
          {
          cusId:'1321',
          customer:'王彪'
        },
          {
          cusId:'1321',
          customer:'刘鑫'
        }
      ],
      customerIdShow:false,
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
          name: '模板一（有变量）',
          value: 0
        },
        {
          name: '模板二（无变量）',
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
      labelArr:[],
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
 
     groupArr:'',
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
         sendStrategy:0,
        importTxt: [{ name: '' }],
        sendModule:'',
        sendUser:1,
        // 第二页
        moduleType:0,
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
       moduleAppType:[],

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
     insertInput() {
      setTimeout(() => {
        let sel = window.getSelection()
        this.range = sel.getRangeAt(0)
      }, 100)
    },
    insertHtmlAtCaret(item) {
      let el = document.createElement("span")
      el.className="appendSpanClass"
      el.innerText = '${' + item.name + '}'
      var frag = document.createDocumentFragment()
      frag.appendChild(el)
      this.range.insertNode(frag)
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
         if (!this.range) return
     if(item.active){
         Vue.set(item,'active',false)
         //删除可编辑div的标签
        let content = this.$refs.smsContent
        let el = document.createElement("span")
        el.className="appendSpanClass"
        el.innerText = '${' + item.name + '}'
        content.innerHTML = content.innerHTML.replace(el.outerHTML, '')
      }else{
         Vue.set(item,'active',true)
         this.insertHtmlAtCaret(item)

         this.sendRuleForm.sendWxName=this.labelWxArr[0].active?'${'+this.labelWxArr[0].name+'}':''
         this.sendRuleForm.sendWxTime=this.labelWxArr[1].active?'${'+this.labelWxArr[1].name+'}':''
         this.sendRuleForm.sendWxType=this.labelWxArr[2].active?'${'+this.labelWxArr[2].name+'}':''
         this.sendRuleForm.sendWxMoney=this.labelWxArr[3].active?'${'+this.labelWxArr[3].name+'}':''
         this.sendRuleForm.desc='如需更多服务请拨打银行客户服务热线'

     }

    },
    
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    confirmLabel(){
      this.labelArr=this.labelLists
      this.labelShow=false
    },
    confirmGroup(){
      console.log("13213131310000",this.currentRow)
         this.groupArr=this.currentRow
         this.groupShow=false
    },
    confirm(){
      this.multipleList= this.multipleSelection
      this.customerIdShow=false
    },
   handleGroupChange(val){
     this.currentRow=val
    },
    cancelGroup(row){
     this.$refs.singleTable.setCurrentRow(row);

    },
      cancelDec(){
        this.labelNameArr=[]
        this.decListArr=[]
        this.labelShow=false
      },
      addDec(){
        this.labelLists.push({
           labelName:'',
           customerDsc:'',
        })
      },
      delDec(index){
         if (this.labelLists.length > 1) {
          this.labelLists.splice(index, 1)
      }
      },
       toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
    groupCurrentChange(val) {
      this.currentpage = val
     },
     groupSizeChange(val) {
      this.pagesizeOne = val
     },
    handleCurrentChange(val) {
      this.currpage = val
    },
    handleSizeChange(val) {
      this.pagesize = val
    },
    changeSendUser(val){
      if(val=='1'){
        this.customerIdShow=true
      }else if(val=='2'){
        this.labelShow=true
      }else{
        this.groupShow=true
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
