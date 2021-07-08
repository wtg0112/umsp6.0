<template>
  <div class="channelManage">
    <el-card class="box-card">
      <el-form
        ref="formData"
        :model="formData"
        label-suffix="："
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item prop="name" label="渠道名称">
              <el-input
                v-model="formData.name"
                placeholder="请输入渠道名称"
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
        <el-button type="primary" @click="channelAdd" size="small"
          >新增渠道</el-button
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
        <el-table-column prop="code" label="渠道代码"></el-table-column>
        <el-table-column prop="name" label="渠道名称"></el-table-column>
        <el-table-column prop="template" label="消息模板"></el-table-column>
        <el-table-column label="信息分类">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="channelCheck(scope.row.classify)"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="channelEdit(scope.row)"
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
      :title="isAdd ? '添加渠道' : '修改渠道'"
      :visible.sync="dialogShow"
    >
      <el-card class="box-card">
        <el-form
          ref="dialogFormData"
          :model="dialogFormData"
          label-suffix="："
          label-width="100px"
        >
          <el-form-item prop="code" label="渠道代码">
            <el-input
              :disabled="!isAdd"
              v-model="dialogFormData.code"
              placeholder="请输入渠道代码"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item prop="name" label="渠道名称">
            <el-input
              v-model="dialogFormData.name"
              placeholder="请输入渠道名称"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item prop="template" label="消息模板">
            <el-select v-model="dialogFormData.template" size="small" filterable>
              <el-option
                v-for="item in templateList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="classify" label="信息分类" v-if="isAdd">
            <el-select v-model="dialogFormData.classify" size="small" filterable>
              <el-option
                v-for="item in classifyList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogShow = false" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :title="'渠道' + channel + '的信息分类'"
      :visible.sync="channelShow"
    >
      <el-row :gutter="20">
        <el-col :span="8" style="text-align: right;">
          信息分类：
        </el-col>
        <el-col :span="16">
          <el-checkbox-group v-model="checkList">
            <el-row :gutter="20" style="margin: 0;">
              <el-col :span="12" v-for="item in classifyList" :key="item.value" style="margin-bottom: 10px;">
                <el-checkbox :label="item.label"></el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'channelManage',
  data() {
    return {
      isAdd: false,
      dialogShow: false,
      channelShow: false,
      formData: {
        name: ''
      },
      pagesize: 5,
      currpage: 1,
      tableData: [
        {
          name: '甘肃农信社',
          code: 'gsnxs',
          template: '',
          classify: ['0', '1', '2', '6', '7']
        },
        {
          name: '核心系统',
          code: 'hbyh',
          template: '',
          classify: ['3', '4', '5', '6', '7']
        },
        {
          name: '国都演示',
          code: 'gdpoc',
          template: '',
          classify: ['0', '1', '2', '3', '4', '5', '6', '7']
        }
      ],
      dialogFormData: {
        template: ''
      },
      templateList: [
        {
          value: '',
          label: '无'
        },
        {
          value: '1',
          label: '生日祝福'
        },
        {
          value: '2',
          label: '模板测试'
        },
        {
          value: '3',
          label: '国都软著'
        }
      ],
      classifyList: [
        {
          value: '0',
          label: '实时消息'
        },
        {
          value: '1',
          label: '营销消息'
        },
        {
          value: '2',
          label: '动账消息'
        },
        {
          value: '3',
          label: '报警消息'
        },
        {
          value: '4',
          label: '邮件消息'
        },
        {
          value: '5',
          label: '微信消息'
        },
        {
          value: '6',
          label: '安卓消息'
        },
        {
          value: '7',
          label: '苹果消息'
        }
      ],
      checkList: [],
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
    // 渠道添加
    channelAdd() {
      this.isAdd = true
      this.dialogShow = true
      this.dialogFormData = {
        template: ''
      }
    },
    // 渠道编辑
    channelEdit(data) {
      this.isAdd = false
      this.dialogShow = true
      this.dialogFormData = JSON.parse(JSON.stringify(data))
    },
    // 查看信息分类
    channelCheck(data) {
      let arr = []
      let backData = this.classifyList.filter(item => data.some(val => item.value === val) )
      backData.forEach(item => {
        arr.push(item.label)
      })
      this.checkList = arr
      this.channelShow = true
    }
  }
}
</script>
<style lang="scss" scoped>
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
