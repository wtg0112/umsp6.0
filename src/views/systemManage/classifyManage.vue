<template>
  <div class="classifyManage">
    <el-card class="box-card">
      <el-form
        ref="formData"
        :model="formData"
        label-suffix="："
        label-width="130px"
      >
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item prop="name" label="信息分类名称">
              <el-input
                v-model="formData.name"
                placeholder="请输入信息分类名称"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="small" style="margin-top: 4px;"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-button-group class="buttonGroup">
        <el-button type="primary" @click="classifyAdd" size="small"
          >新增信息分类</el-button
        >
        <!-- <el-button type="primary"  size="small"
          >删除</el-button -->
        <!-- > -->
      </el-button-group>
      <el-table
        ref="tableData"
        :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="code" label="信息分类代码"></el-table-column>
        <el-table-column prop="name" label="信息分类名称"></el-table-column>
        <el-table-column prop="priority" label="优先级"></el-table-column>
        <el-table-column prop="memo" label="备注"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="classifyCheck(scope.row)"
              >详情</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="classifyEdit(scope.row)"
              >修改</el-button
            >
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
    <el-dialog
      :title="
        isCheck ? '信息分类详情' : isAdd ? '添加信息分类' : '修改信息分类'
      "
      :visible.sync="dialogShow"
    >
      <el-form
        ref="dialogFormData"
        :model="dialogFormData"
        label-suffix="："
        label-width="160px"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>分类基础信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="code" label="信息分类代码">
                <el-input
                  :disabled="isCheck || !isAdd"
                  v-model="dialogFormData.code"
                  placeholder="请输入信息分类代码"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="name" label="信息分类名称">
                <el-input
                  :disabled="isCheck"
                  v-model="dialogFormData.name"
                  placeholder="请输入信息分类名称"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="priority" label="优先级">
                <el-select
                  :disabled="isCheck"
                  v-model="dialogFormData.priority"
                  size="small"
                  filterable
                >
                  <el-option
                    v-for="item in priorityList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="memo" label="备注">
                <el-input
                  :disabled="isCheck"
                  v-model="dialogFormData.memo"
                  placeholder="请输入备注"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>消息类型配置 {{ !isCheck ? '（至少配置一项）' : '' }}</span>
          </div>
          <el-tabs v-model="activeName">
            <el-tab-pane label="短信" name="first">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="message.pass" label="短信通道">
                    <el-select
                      :disabled="isCheck"
                      v-model="dialogFormData.message.pass"
                      size="small"
                      filterable
                    >
                      <el-option
                        v-for="item in passList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="message.sign" label="短信签名">
                    <el-select
                      :disabled="isCheck"
                      v-model="dialogFormData.message.sign"
                      size="small"
                      filterable
                    >
                      <el-option
                        v-for="item in signList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="message.extendCode" label="短信扩展号">
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.message.extendCode"
                      placeholder="请输入短信扩展号"
                      size="small"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="message.suffix" label="短信后缀">
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.message.suffix"
                      placeholder="请输入短信后缀"
                      size="small"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="message.startTime" label="开始时间">
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.message.startTime"
                      placeholder="请输入开始时间"
                      size="small"
                    ></el-input>
                    <span v-if="!isCheck" style="color: red;">(时间格式-时:分 )</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="message.endTime" label="结束时间">
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.message.endTime"
                      placeholder="请输入结束时间"
                      size="small"
                    ></el-input>
                    <span v-if="!isCheck" style="color: red;">(时间格式-时:分 )</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="视频短信" name="second">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="videoMessage.pass" label="短信通道">
                    <el-select
                      :disabled="isCheck"
                      v-model="dialogFormData.videoMessage.pass"
                      size="small"
                      filterable
                    >
                      <el-option
                        v-for="item in passList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="videoMessage.sign" label="短信签名">
                    <el-select
                      :disabled="isCheck"
                      v-model="dialogFormData.videoMessage.sign"
                      size="small"
                      filterable
                    >
                      <el-option
                        v-for="item in signList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    prop="videoMessage.extendCode"
                    label="短信扩展号"
                  >
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.videoMessage.extendCode"
                      placeholder="请输入短信扩展号"
                      size="small"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="videoMessage.suffix" label="短信后缀">
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.videoMessage.suffix"
                      placeholder="请输入短信后缀"
                      size="small"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="videoMessage.startTime" label="开始时间">
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.videoMessage.startTime"
                      placeholder="请输入开始时间"
                      size="small"
                    ></el-input>
                    <span v-if="!isCheck" style="color: red;">(时间格式-时:分 )</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="videoMessage.endTime" label="结束时间">
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.videoMessage.endTime"
                      placeholder="请输入结束时间"
                      size="small"
                    ></el-input>
                    <span v-if="!isCheck" style="color: red;">(时间格式-时:分 )</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="5G消息" name="third">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item
                    prop="fiveMessage.ydNumber"
                    label="移动Chatbot号码"
                  >
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.fiveMessage.ydNumber"
                      size="small"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    prop="fiveMessage.ltNumber"
                    label="联通Chatbot号码"
                  >
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.fiveMessagelt"
                      size="small"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    prop="fiveMessage.dxNumber"
                    label="电信Chatbot号码"
                  >
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.fiveMessage.dxNumber"
                      size="small"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="fiveMessage.startTime" label="开始时间">
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.fiveMessage.startTime"
                      placeholder="请输入开始时间"
                      size="small"
                    ></el-input>
                    <span v-if="!isCheck" style="color: red;">(时间格式-时:分 )</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="fiveMessage.endTime" label="结束时间">
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.fiveMessage.endTime"
                      placeholder="请输入结束时间"
                      size="small"
                    ></el-input>
                    <span v-if="!isCheck" style="color: red;">(时间格式-时:分 )</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="微信消息" name="fourth">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="wechatMessage.account" label="微信公众号">
                    <el-select
                      :disabled="isCheck"
                      v-model="dialogFormData.wechatMessage.account"
                      size="small"
                      filterable
                    >
                      <el-option
                        v-for="item in accountList"
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
                <el-col :span="12">
                  <el-form-item prop="wechatMessage.startTime" label="开始时间">
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.wechatMessage.startTime"
                      placeholder="请输入开始时间"
                      size="small"
                    ></el-input>
                    <span v-if="!isCheck" style="color: red;">(时间格式-时:分 )</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="wechatMessage.endTime" label="结束时间">
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.wechatMessage.endTime"
                      placeholder="请输入结束时间"
                      size="small"
                    ></el-input>
                    <span v-if="!isCheck" style="color: red;">(时间格式-时:分 )</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="APP消息" name="fifth">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="appMessage.android" label="Android应用">
                    <el-select
                      :disabled="isCheck"
                      v-model="dialogFormData.appMessage.android"
                      size="small"
                      filterable
                    >
                      <el-option
                        v-for="item in androidList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="appMessage.ios" label="iOS应用">
                    <el-select
                      :disabled="isCheck"
                      v-model="dialogFormData.appMessage.ios"
                      size="small"
                      filterable
                    >
                      <el-option
                        v-for="item in iosList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="appMessage.startTime" label="开始时间">
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.appMessage.startTime"
                      placeholder="请输入开始时间"
                      size="small"
                    ></el-input>
                    <span v-if="!isCheck" style="color: red;">(时间格式-时:分 )</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="appMessage.endTime" label="结束时间">
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.appMessage.endTime"
                      placeholder="请输入结束时间"
                      size="small"
                    ></el-input>
                    <span v-if="!isCheck" style="color: red;">(时间格式-时:分 )</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="邮件消息" name="sixth">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="mailMessage.address" label="发件邮箱">
                    <el-select
                      :disabled="isCheck"
                      v-model="dialogFormData.mailMessage.address"
                      size="small"
                      filterable
                    >
                      <el-option
                        v-for="item in addressList"
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
                <el-col :span="12">
                  <el-form-item prop="mailMessage.startTime" label="开始时间">
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.mailMessage.startTime"
                      placeholder="请输入开始时间"
                      size="small"
                    ></el-input>
                    <span v-if="!isCheck" style="color: red;">(时间格式-时:分 )</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="mailMessage.endTime" label="结束时间">
                    <el-input
                      :disabled="isCheck"
                      v-model="dialogFormData.mailMessage.endTime"
                      placeholder="请输入结束时间"
                      size="small"
                    ></el-input>
                    <span v-if="!isCheck" style="color: red;">(时间格式-时:分 )</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <template v-if="!isCheck">
          <el-button @click="dialogShow = false" size="small">取 消</el-button>
          <el-button type="primary" @click="dialogShow = false" size="small"
            >保存</el-button
          >
        </template>
        <template v-else>
          <el-button @click="dialogShow = false" size="small">关闭</el-button>
        </template>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'classifyManage',
  data() {
    return {
      activeName: 'first',
      isCheck: false, // 判断详情还是调整
      isAdd: false, // 判断添加还是编辑
      dialogShow: false,
      formData: {},
      pagesize: 5,
      currpage: 1,
      tableData: [
        {
          name: '苹果消息',
          code: 'gsnxs',
          memo: '',
          priority: 1,
          message: {
            name: '短信',
            pass: '1',
            sign: '1',
            extendCode: '',
            suffix: '',
            startTime: '00:00',
            endTime: '23:59'
          },
          videoMessage: {
            name: '视频短信',
            pass: '',
            sign: '',
            extendCode: '',
            suffix: '',
            startTime: '00:00',
            endTime: '23:59'
          },
          fiveMessage: {
            name: '5G消息',
            ydNumber: '',
            ltNumber: '',
            dxNumber: '',
            startTime: '00:00',
            endTime: '23:59'
          },
          wechatMessage: {
            name: '微信消息',
            account: '',
            startTime: '00:00',
            endTime: '23:59'
          },
          appMessage: {
            name: 'APP消息',
            android: '',
            ios: '',
            startTime: '00:00',
            endTime: '23:59'
          },
          mailMessage: {
            name: '邮件消息',
            address: '',
            startTime: '00:00',
            endTime: '23:59'
          }
        },
        {
          name: '安卓消息',
          code: 'hbyh',
          memo: '',
          priority: 4,
          message: {
            name: '短信',
            pass: '',
            sign: '',
            extendCode: '123',
            suffix: '123',
            startTime: '00:00',
            endTime: '23:59'
          },
          videoMessage: {
            name: '视频短信',
            pass: '',
            sign: '',
            extendCode: '',
            suffix: '',
            startTime: '00:00',
            endTime: '23:59'
          },
          fiveMessage: {
            name: '5G消息',
            ydNumber: '',
            ltNumber: '',
            dxNumber: '',
            startTime: '00:00',
            endTime: '23:59'
          },
          wechatMessage: {
            name: '微信消息',
            account: '',
            startTime: '00:00',
            endTime: '23:59'
          },
          appMessage: {
            name: 'APP消息',
            android: '',
            ios: '',
            startTime: '00:00',
            endTime: '23:59'
          },
          mailMessage: {
            name: '邮件消息',
            address: '',
            startTime: '00:00',
            endTime: '23:59'
          }
        },
        {
          name: '微信消息',
          code: 'gdpoc',
          memo: '',
          priority: 2,
          message: {
            name: '短信',
            pass: '',
            sign: '',
            extendCode: '',
            suffix: '',
            startTime: '00:00',
            endTime: '23:59'
          },
          videoMessage: {
            name: '视频短信',
            pass: '',
            sign: '',
            extendCode: '',
            suffix: '',
            startTime: '00:00',
            endTime: '23:59'
          },
          fiveMessage: {
            name: '5G消息',
            ydNumber: '',
            ltNumber: '',
            dxNumber: '',
            startTime: '00:00',
            endTime: '23:59'
          },
          wechatMessage: {
            name: '微信消息',
            account: '',
            startTime: '00:00',
            endTime: '23:59'
          },
          appMessage: {
            name: 'APP消息',
            android: '',
            ios: '',
            startTime: '00:00',
            endTime: '23:59'
          },
          mailMessage: {
            name: '邮件消息',
            address: '',
            startTime: '00:00',
            endTime: '23:59'
          }
        }
      ],
      priorityList: [
        {
          value: 0,
          label: '0（最高）'
        },
        {
          value: 1,
          label: '1'
        },
        {
          value: 2,
          label: '2'
        },
        {
          value: 3,
          label: '3'
        },
        {
          value: 4,
          label: '4'
        },
        {
          value: 5,
          label: '5（最低）'
        }
      ],
      passList: [
        // 通道列表
        {
          value: '',
          label: '无'
        },
        {
          value: '1',
          label: '实时通道'
        },
        {
          value: '2',
          label: '营销通道'
        }
      ],
      signList: [
        // 签名列表
        {
          value: '',
          label: '无'
        },
        {
          value: '1',
          label: '【微众银行】'
        },
        {
          value: '2',
          label: '【广西农信社】'
        }
      ],
      accountList: [
        // 微信公众号列表
        {
          value: '',
          label: '无'
        },
        {
          value: '1',
          label: '云短消息服务平台'
        }
      ],
      androidList: [
        // 安卓应用列表
        {
          value: '',
          label: '无'
        },
        {
          value: '1',
          label: '国都推送安卓'
        }
      ],
      iosList: [
        // IOS应用列表
        {
          value: '',
          label: '无'
        },
        {
          value: '1',
          label: '国都推送IOS'
        }
      ],
      addressList: [
        {
          value: '',
          label: '无'
        }
      ],
      dialogFormData: {
        priority: 2,
        message: {
          name: '短信',
          pass: '',
          sign: '',
          extendCode: '',
          suffix: '',
          startTime: '00:00',
          endTime: '23:59'
        },
        videoMessage: {
          name: '视频短信',
          pass: '',
          sign: '',
          extendCode: '',
          suffix: '',
          startTime: '00:00',
          endTime: '23:59'
        },
        fiveMessage: {
          name: '5G消息',
          ydNumber: '',
          ltNumber: '',
          dxNumber: '',
          startTime: '00:00',
          endTime: '23:59'
        },
        wechatMessage: {
          name: '微信消息',
          account: '',
          startTime: '00:00',
          endTime: '23:59'
        },
        appMessage: {
          name: 'APP消息',
          android: '',
          ios: '',
          startTime: '00:00',
          endTime: '23:59'
        },
        mailMessage: {
          name: '邮件消息',
          address: '',
          startTime: '00:00',
          endTime: '23:59'
        }
      },
      channel: null // 所选渠道
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
    // 信息分类添加
    classifyAdd() {
      this.isAdd = true
      this.isCheck = false
      this.dialogShow = true
      this.dialogFormData = {
        priority: 2,
        message: {
          name: '短信',
          pass: '',
          sign: '',
          extendCode: '',
          suffix: '',
          startTime: '00:00',
          endTime: '23:59'
        },
        videoMessage: {
          name: '视频短信',
          pass: '',
          sign: '',
          extendCode: '',
          suffix: '',
          startTime: '00:00',
          endTime: '23:59'
        },
        fiveMessage: {
          name: '5G消息',
          ydNumber: '',
          ltNumber: '',
          dxNumber: '',
          startTime: '00:00',
          endTime: '23:59'
        },
        wechatMessage: {
          name: '微信消息',
          account: '',
          startTime: '00:00',
          endTime: '23:59'
        },
        appMessage: {
          name: 'APP消息',
          android: '',
          ios: '',
          startTime: '00:00',
          endTime: '23:59'
        },
        mailMessage: {
          name: '邮件消息',
          address: '',
          startTime: '00:00',
          endTime: '23:59'
        }
      }
    },
    // 信息分类编辑
    classifyEdit(data) {
      this.isAdd = false
      this.isCheck = false
      this.dialogShow = true
      this.dialogFormData = JSON.parse(JSON.stringify(data))
    },
    // 查看信息分类
    classifyCheck(data) {
      this.isCheck = true
      this.dialogShow = true
      this.dialogFormData = JSON.parse(JSON.stringify(data))
    }
  }
}
</script>
<style lang="scss" scoped>
.classifyManage /deep/ .el-row{
  margin: 0 ;
}
.classifyManage /deep/ .el-dialog {
  width: 70%;
  .el-dialog__body {
    padding-top: 0;
  }
}
.classifyManage /deep/ .el-card__header {
  border-bottom: none;
  padding-bottom: 0;
}
.el-col {
  margin: 10px 0;
}
.buttonGroup {
  // position: absolute;
  // top: 0;
  // left: 40px;
  margin-bottom: 10px;
  margin-left: 14px;
  button {
    margin-right: 20px !important;
    border-radius: 4px !important;
  }
}
</style>
