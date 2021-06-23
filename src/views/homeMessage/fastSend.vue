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
                        message: '请输入任务名称',
                        trigger: 'blur'
                      }"
                    >
                      <el-input
                        size="small"
                        v-model="formData.taskName"
                        placeholder="任务名称"
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
                          v-for="item in options"
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
                          v-for="item in options"
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
                    <el-form-item prop="sign" label="使用签名">
                      <el-select
                        v-model="formData.sign"
                        disabled
                        size="small"
                        filterable
                      >
                        <el-option
                          v-for="item in options"
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
                    <el-form-item prop="search" label="搜索类型">
                      <el-select
                        v-model="formData.search"
                        clearable
                        placeholder="请选择..."
                        @change="showDialog"
                        size="small"
                        filterable
                      >
                        <el-option
                          v-for="item in mailList"
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
                    <template
                      v-if="
                        (!publicShowData || publicShowData.length == 0) &&
                          (!personalShowData || personalShowData.length == 0)
                      "
                    >
                      <el-form-item
                        prop="phone"
                        label="手机号"
                        :rules="{
                          validator: phoneMulValidate,
                          trigger: 'blur'
                        }"
                      >
                        <el-input
                          type="textarea"
                          :rows="4"
                          placeholder="手机号码"
                          v-model="formData.phone"
                          size="small"
                        >
                        </el-input>
                      </el-form-item>
                      <p
                        style="color: red; text-indent: 100px; margin-top: 20px;"
                      >
                        (注意：多个手机号请换行隔开，最多1000个手机号)
                      </p>
                    </template>
                    <template v-else>
                      <el-form-item prop="phone" label="手机号">
                        <div
                          class="tag-group"
                          v-if="publicShowData && publicShowData.length != 0"
                        >
                          <span class="tag-group__title">公共：</span>
                          <el-tag
                            v-for="(item, index) in publicShowData"
                            :key="item.groupId"
                            closable
                            @close="mailClose(0, index)"
                          >
                            {{ item.name }}
                          </el-tag>
                        </div>
                        <div
                          class="tag-group"
                          v-if="
                            personalShowData && personalShowData.length != 0
                          "
                        >
                          <span class="tag-group__title">个人：</span>
                          <el-tag
                            v-for="(item, index) in personalShowData"
                            :key="item.groupId"
                            closable
                            @close="mailClose(1, index)"
                          >
                            {{ item.name }}
                          </el-tag>
                        </div>
                      </el-form-item>
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="16">
                    <p style="text-indent: 100px; margin-bottom: 20px;">
                      您的短信已经输入
                      <span class="p_span">{{ word }}</span>
                      个字,拆分后,短信条数为
                      <span class="p_span">{{ slip }}</span> 条
                    </p>
                    <el-form-item
                      prop="content"
                      label="发送内容"
                      :rules="{
                        required: true,
                        message: '请输入发送内容',
                        trigger: 'blur'
                      }"
                    >
                      <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="发送内容"
                        v-model="formData.content"
                        @input="contentInput"
                        size="small"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="16">
                    <el-form-item prop="content" label="发送时间">
                      <el-radio-group v-model="formData.sendType">
                        <el-radio :label="1">即时发送</el-radio>
                        <el-radio :label="2">定时发送</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="16" v-if="formData.sendType == '2'">
                    <el-form-item prop="selectTime">
                      <el-date-picker
                        size="small"
                        v-model.trim="formData.selectTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择发送时间"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <div style="padding-left: 50px;">
                  <el-button size="small" type="warning">预览</el-button>
                  <el-button size="small" type="primary" @click="commit"
                    >发送</el-button
                  >
                  <span style="display: inline-block; margin-left: 20px;"
                    >允许的发送时间: {{ startTime }}---{{ endTime }}</span
                  >
                </div> -->
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
                            formData.content !== ''
                              ? formData.sign + formData.content
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
                <el-button type="primary" plain size="small">发送</el-button>
                <span style="display: inline-block; margin-left: 20px;"
                  >允许的发送时间: {{ startTime }}---{{ endTime }}</span
                >
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-card>
    <el-dialog
      :title="formData.search === '0' ? '公共通讯录' : '个人通讯录'"
      :visible.sync="mailDialog"
    >
      <el-tree
        ref="mailTree"
        :data="treeList"
        :props="defaultProps"
        show-checkbox
        :check-strictly="true"
        node-key="groupId"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mailDialog = false" size="small">关 闭</el-button>
        <el-button type="primary" @click="checkTree" size="small"
          >提 交</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="精确搜索" :visible.sync="searchDialog">
      <el-card class="box-card">
        <el-form
          ref="searchFormData"
          :model="searchFormData"
          label-suffix="："
          label-width="100px"
        >
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item prop="phone" label="手机号">
                <el-input
                  v-model="searchFormData.phone"
                  placeholder="手机号"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="userName" label="用户名称">
                <el-input
                  v-model="searchFormData.userName"
                  placeholder="用户名称"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item prop="sel" label="组类别">
                <el-select v-model="searchFormData.sel" size="small" filterable>
                  <el-option
                    v-for="item in organizeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item
                prop="organize"
                :label="searchFormData.sel === '0' ? '公共组' : '个人组'"
              >
                <el-select
                  v-model="searchFormData.organize"
                  size="small"
                  filterable
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button type="primary" size="small">查询</el-button>
      </el-card>
      <el-card class="box-card">
        <el-table
          ref="filterTable"
          size="small"
          :data="
            tableData.slice((currpage - 1) * pagesize, currpage * pagesize)
          "
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="account" label="用户"></el-table-column>
          <el-table-column prop="number" label="手机号"></el-table-column>
          <el-table-column prop="classify" label="所属组"></el-table-column>
          <el-table-column prop="number" label="组类型"></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          :total="this.tableData.length"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          size="small"
        >
        </el-pagination>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="searchDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="searchDialog = false" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'fastSend',
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
      formData: {
        qudao: '',
        classify: '',
        sign: '【中国农业银行】',
        search: '',
        content: '',
        sendType: 1
      }, // 外部表单
      searchFormData: {
        sel: '0'
      }, // 精确搜索表单
      tableData: [], // 表格数据
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        }
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
      publicList: [
        {
          groupId: 'da004ceedb000005',
          pgroupId: '1000036250',
          name: '2020年4月7日14',
          addrId: '',
          job: '',
          state: 'closed',
          opt: '',
          opt2: '',
          mobile: '',
          grade: '-1',
          opt1: "<a style='cursor:pointer;color:red'> 删除 </a>",
          birthday: null,
          isLinkModel: null,
          memo: '',
          checked: 'false',
          chkDisabled: false,
          open: false,
          parent: true
        },
        {
          groupId: 'fa00444964300007',
          pgroupId: 'da004ceedb000005',
          name: 'hello',
          addrId: '',
          job: '',
          state: 'closed',
          opt: '',
          opt2: '',
          mobile: '',
          grade: '-1',
          opt1: "<a style='cursor:pointer;color:red'> 删除 </a>",
          birthday: null,
          isLinkModel: null,
          memo: '',
          checked: 'false',
          chkDisabled: false,
          open: false,
          parent: false
        },
        {
          groupId: 'da006c2a2f600016',
          pgroupId: '1000036250',
          name: '333',
          addrId: '',
          job: '',
          state: 'closed',
          opt: '',
          opt2: '',
          mobile: '',
          grade: '-1',
          opt1: "<a style='cursor:pointer;color:red'> 删除 </a>",
          birthday: null,
          isLinkModel: null,
          memo: '',
          checked: 'false',
          chkDisabled: false,
          open: false,
          parent: false
        },
        {
          groupId: '1000036250',
          pgroupId: '',
          name: '公共通讯录',
          addrId: '',
          job: '',
          state: 'closed',
          opt: '',
          opt2: '',
          mobile: '',
          grade: '-1',
          opt1: "<a style='cursor:pointer;color:red'> 删除 </a>",
          birthday: null,
          isLinkModel: null,
          memo: '',
          checked: 'false',
          chkDisabled: true,
          open: false,
          parent: true
        }
      ],
      personalList: [
        {
          groupId: '100610',
          pgroupId: '1',
          name: 'a',
          addrId: '',
          job: '',
          state: 'closed',
          opt: '',
          opt2: '',
          mobile: '',
          grade: '-1',
          opt1: "<a style='cursor:pointer;color:red'> 删除 </a>",
          birthday: null,
          isLinkModel: null,
          memo: '',
          checked: 'false',
          chkDisabled: false,
          open: false,
          parent: true
        },
        {
          groupId: 'da006c2a4ba0001d',
          pgroupId: '100610',
          name: '111',
          addrId: '',
          job: '',
          state: 'closed',
          opt: '',
          opt2: '',
          mobile: '',
          grade: '-1',
          opt1: "<a style='cursor:pointer;color:red'> 删除 </a>",
          birthday: null,
          isLinkModel: null,
          memo: '',
          checked: 'false',
          chkDisabled: false,
          open: false,
          parent: false
        },
        {
          groupId: 'da006d10bd000004',
          pgroupId: '100610',
          name: '23456',
          addrId: '',
          job: '',
          state: 'closed',
          opt: '',
          opt2: '',
          mobile: '',
          grade: '-1',
          opt1: "<a style='cursor:pointer;color:red'> 删除 </a>",
          birthday: null,
          isLinkModel: null,
          memo: '',
          checked: 'false',
          chkDisabled: false,
          open: false,
          parent: false
        },
        {
          groupId: 'da006d10be400008',
          pgroupId: '100610',
          name: 'bbbbbbbb',
          addrId: '',
          job: '',
          state: 'closed',
          opt: '',
          opt2: '',
          mobile: '',
          grade: '-1',
          opt1: "<a style='cursor:pointer;color:red'> 删除 </a>",
          birthday: null,
          isLinkModel: null,
          memo: '',
          checked: 'false',
          chkDisabled: false,
          open: false,
          parent: false
        },
        {
          groupId: 'da004fb08c200003',
          pgroupId: '1',
          name: 'b',
          addrId: '',
          job: '',
          state: 'closed',
          opt: '',
          opt2: '',
          mobile: '',
          grade: '-1',
          opt1: "<a style='cursor:pointer;color:red'> 删除 </a>",
          birthday: null,
          isLinkModel: null,
          memo: '',
          checked: 'false',
          chkDisabled: false,
          open: false,
          parent: true
        },
        {
          groupId: 'da006c2ae6100007',
          pgroupId: 'da004fb08c200003',
          name: '123',
          addrId: '',
          job: '',
          state: 'closed',
          opt: '',
          opt2: '',
          mobile: '',
          grade: '-1',
          opt1: "<a style='cursor:pointer;color:red'> 删除 </a>",
          birthday: null,
          isLinkModel: null,
          memo: '',
          checked: 'false',
          chkDisabled: false,
          open: false,
          parent: false
        },
        {
          groupId: 'da004fb1d3a0000b',
          pgroupId: '1',
          name: 'cccccc',
          addrId: '',
          job: '',
          state: 'closed',
          opt: '',
          opt2: '',
          mobile: '',
          grade: '-1',
          opt1: "<a style='cursor:pointer;color:red'> 删除 </a>",
          birthday: null,
          isLinkModel: null,
          memo: '',
          checked: 'false',
          chkDisabled: false,
          open: false,
          parent: false
        },
        {
          groupId: '1',
          pgroupId: '',
          name: '个人通讯录',
          addrId: '',
          job: '',
          state: 'closed',
          opt: '',
          opt2: '',
          mobile: '',
          grade: '-1',
          opt1: "<a style='cursor:pointer;color:red'> 删除 </a>",
          birthday: null,
          isLinkModel: null,
          memo: '',
          checked: 'false',
          chkDisabled: true,
          open: false,
          parent: true
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
    showDialog() {
      // 0, 1 => 通讯录  ，2 => 精确搜索
      if (this.formData.search === '2') {
        this.searchDialog = true
      } else if (this.formData.search === '0' || this.formData.search === '1') {
        this.treeList = []
        if (this.formData.search === '0') {
          this.treeList = this.handleTree(this.publicList)
        } else if (this.formData.search === '1') {
          this.treeList = this.handleTree(this.personalList)
        }
        this.mailDialog = true
      }
    },
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
