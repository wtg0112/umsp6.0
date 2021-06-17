<template>
  <div class="fastSend">
    <el-card class="box-card">
      <el-form
        ref="formData"
        :model="formData"
        label-suffix="："
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="14">
            <el-row :gutter="20">
              <el-col :span="12">
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
                    v-model="formData.taskName"
                    placeholder="任务名称"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="qudao" label="选择渠道">
                  <el-select v-model="formData.qudao">
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
              <el-col :span="12">
                <el-form-item prop="classify" label="信息分类">
                  <el-select v-model="formData.classify">
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
              <el-col :span="12">
                <el-form-item prop="sign" label="使用签名">
                  <el-select v-model="formData.sign" disabled>
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
              <el-col :span="12">
                <el-form-item prop="search" label="搜索类型">
                  <el-select
                    v-model="formData.search"
                    clearable
                    placeholder="请选择..."
                    @change="showDialog"
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
                <el-form-item prop="phone" label="手机号">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="手机号码"
                    v-model="formData.phone"
                  >
                  </el-input>
                </el-form-item>
                <p style="color: red; text-indent: 100px;">
                  (注意：多个手机号请换行隔开)
                </p>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="16">
                <p style="text-indent: 100px; margin-bottom: 20px;">
                  您的短信已经输入
                  <span class="p_span">{{ word }}</span> 个字,拆分后,短信条数为
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
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10">
            <div class="phone">
              <div class="watchCotnentPhone">{{formData.content !== '' ? formData.sign + formData.content : '请输入内容'}}</div>
            </div>
            <!-- <el-row :gutter="20">
              <el-col :span="16">

              </el-col>
            </el-row> -->
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-dialog
      :title="formData.search === '0' ? '公共通讯录' : '个人通讯录'"
      :visible.sync="mailDialog"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mailDialog = false">取 消</el-button>
        <el-button type="primary" @click="mailDialog = false">确 定</el-button>
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
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="userName" label="用户名称">
                <el-input
                  v-model="searchFormData.userName"
                  placeholder="用户名称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item prop="sel" label="组类别">
                <el-select v-model="searchFormData.sel">
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
                <el-select v-model="searchFormData.organize">
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
      </el-card>
      <el-card class="box-card">
        <el-table
          ref="filterTable"
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
        >
        </el-pagination>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="searchDialog = false">取 消</el-button>
        <el-button type="primary" @click="searchDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      word: 0,
      slip: 0,
      mailDialog: false,
      searchDialog: false,
      pagesize: 10,
      currpage: 1,
      formData: {
        qudao: '',
        classify: '',
        sign: '【中国农业银行】',
        search: '',
        content: ''
      },
      searchFormData: {
        sel: '0'
      },
      tableData: [],
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
      sign:[
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
    }
  },
  methods: {
    showDialog() {
      // 0, 1 => 通讯录  ，2 => 精确搜索
      if (this.formData.search === '2') {
        this.searchDialog = true
      } else if (this.formData.search === '0' || this.formData.search === '1') {
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
      if(val.length !== 0) {
        this.word = val.length + this.formData.sign.length
      } else {
        this.word = 0
      }
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.p_span {
  font-size: 20px;
  font-weight: bold;
}
.fastSend /deep/ .el-dialog {
  width: 60%;
}
.phone{
    border: 1px solid #f7f7f7;
    width: 310px;
    height: 600px;
    position: relative;
    display: block;
    background: url('../../assets/img/previewPhone.png') no-repeat center;
    background-size: cover;
    .watchCotnentPhone{
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
</style>
