<template>
  <div class="customerManage">
    <el-tabs v-model="activeName" v-if="!adding">
      <el-tab-pane label="客户列表" name="first">
        <el-card class="box-card">
          <el-form
            ref="formData"
            :model="formData"
            label-suffix="："
            label-width="100px"
          >
            <el-row :gutter="20">
              <el-col :span="7">
                <el-form-item prop="phone" label="手机号">
                  <el-input
                    v-model="formData.phone"
                    placeholder="请输入手机号"
                    size="small"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item prop="signCode" label="批次号">
                  <el-input
                    v-model="formData.signCode"
                    placeholder="请输入批次号"
                    size="small"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button
                  type="primary"
                  size="small"
                  style="margin-left:24px; margin-top: 4px;"
                  >查询</el-button
                >
                <el-button type="primary" plain size="small">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-popover
          class="popover"
          placement="right-start"
          width="150"
          trigger="click"
        >
          <el-checkbox-group v-model="checkList">
            <el-checkbox
              :label="item.label"
              v-for="(item, i) in tableList"
              :key="i"
              style="display: block;"
            ></el-checkbox>
          </el-checkbox-group>
          <span></span>
          <span class="filterClass" slot="reference">
            <i class="iconfont icon-xitong"></i>
            筛选
          </span>
        </el-popover>
        <el-table
          ref="filterTable"
          :data="
            tableData.slice((currpage - 1) * pagesize, currpage * pagesize)
          "
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <template v-for="item in tableList">
            <el-table-column
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              v-if="item.show"
            ></el-table-column>
          </template>
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
      </el-tab-pane>
      <el-tab-pane label="标签管理" name="second">
        <el-card class="box-card">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="tag2_add"
            >添加标签</el-button
          >
          <div style="float: right;">
            <el-select v-model="tag2_select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-card>
        <el-table
          ref="tagsTable"
          :data="
            tagsData.slice((currpage1 - 1) * pagesize1, currpage1 * pagesize1)
          "
        >
          <el-table-column prop="tagName" label="标签名"></el-table-column>
          <el-table-column prop="createTime" label="创建日期"></el-table-column>
          <el-table-column prop="tagType" label="标签类型">
            <template slot-scope="scope">
              <span v-if="scope.row.tagType == '0'">系统标签</span>
              <span v-else>自定义标签</span>
            </template>
          </el-table-column>
          <el-table-column prop="dataType" label="数据类型">
            <template slot-scope="scope">
              <span v-if="scope.row.dataType == '0'">文本</span>
              <span v-else-if="scope.row.dataType == '1'">时间</span>
              <span v-else-if="scope.row.dataType == '2'">数字</span>
            </template>
          </el-table-column>
          <el-table-column prop="memo" label="备注">
            <template slot-scope="scope">
              {{ scope.row.memo == '' ? '-' : scope.row.memo }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="primary" size="small">导入</el-button>
              <el-button
                type="success"
                size="small"
                @click="tag2_edit(scope.row)"
                >修改</el-button
              >
              <el-button type="info" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize1"
          :total="this.tagsData.length"
          @current-change="handleCurrentChange1"
          @size-change="handleSizeChange1"
        >
        </el-pagination>
        <el-dialog
          :title="isAdd ? '添加标签' : '编辑标签'"
          :visible.sync="showDialog"
        >
          <el-form
            ref="dialogFormData"
            :model="dialogFormData"
            label-suffix="："
            label-width="100px"
          >
            <el-form-item prop="tagName" label="标签名称">
              <el-input
                v-model="dialogFormData.tagName"
                placeholder="请输入标签名称"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item prop="dataType" label="标签类型">
              <el-radio-group v-model="dialogFormData.dataType">
                <el-radio label="0">文本</el-radio>
                <el-radio label="1">时间</el-radio>
                <el-radio label="2">数字</el-radio>
              </el-radio-group>
              <span style="display: block;">
                标签数据类型选定不可更改。
              </span>
            </el-form-item>
            <el-form-item prop="memo" label="备注">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入备注"
                v-model="dialogFormData.memo"
                size="small"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false" size="small"
              >取 消</el-button
            >
            <el-button type="primary" @click="showDialog = false" size="small"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="客户分组" name="third">
        <el-card class="box-card">
          <el-form
            ref="groupFormData"
            :model="groupFormData"
            label-suffix="："
            label-width="100px"
          >
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item prop="name" label="分组名称">
                  <el-input
                    v-model="groupFormData.name"
                    placeholder="请输入分组名称"
                    size="small"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="time" label="统计时间">
                  <el-date-picker
                    v-model="groupFormData.time"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="small"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button
                  type="primary"
                  size="small"
                  style="margin-left:24px; margin-top: 4px;"
                  >查询</el-button
                >
                <el-button type="primary" plain size="small">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-button
          style="margin: 0 0 10px 10px;"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="toReload"
          >新建分组</el-button
        >
        <el-table
          ref="groupTable"
          :data="
            groupData.slice((currpage2 - 1) * pagesize2, currpage2 * pagesize2)
          "
        >
          <el-table-column prop="name" label="新建分组"></el-table-column>
          <el-table-column prop="condition" label="分组条件"></el-table-column>
          <el-table-column prop="customerSum" label="客户数"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize2"
          :total="this.groupData.length"
          @current-change="handleCurrentChange2"
          @size-change="handleSizeChange2"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <add-group ref="addGroup" :tagsList="tagsData" @goCheck="goCheck" v-else> </add-group>
  </div>
</template>
<script>
import addGroup from './addGroup'
export default {
  name: 'customerManage',
  components: {
    addGroup
  },
  data() {
    return {
      activeName: 'first',
      // tag1
      formData: {
        phone: '',
        signCode: ''
      },
      tableList: [
        {
          prop: 'account',
          label: '用户ID',
          show: true
        },
        {
          prop: 'sex',
          label: '性别',
          show: true
        },
        {
          prop: 'channelId',
          label: '渠道ID',
          show: true
        },
        {
          prop: 'infoId',
          label: '信息分类ID',
          show: true
        },
        {
          prop: 'mail',
          label: '邮箱',
          show: true
        },
        {
          prop: 'phone',
          label: '手机号码',
          show: true
        },
        {
          prop: 'passId',
          label: '通道ID',
          show: true
        },
        {
          prop: 'passUserId',
          label: '通道用户ID',
          show: true
        }
      ],
      tableData: [
        {
          account: '1',
          sex: '男',
          channelId: 'aiusdgiauy',
          infoId: 'kashdoi',
          mail: '2836212457@163.com',
          phone: '13320045268',
          passId: 'askhdgoais',
          passUserId: 'uvynoeai7ynt9vwqe'
        }
      ],
      pagesize: 5,
      currpage: 1,
      // tag1
      // tag2
      checkList: [],
      tagsData: [
        {
          tagName: '用户ID',
          createTime: '2020-12-23 13:17:01',
          tagType: '0', // 0 => 系统标签，1 => 自定义标签
          dataType: '0', // 0 => 文本，1 => 时间，2 => 数字
          memo: ''
        },
        {
          tagName: '性别',
          createTime: '2020-12-23 13:17:01',
          tagType: '1', // 0 => 系统标签，1 => 自定义标签
          dataType: '0', // 0 => 文本，1 => 时间，2 => 数字
          memo: ''
        },
        {
          tagName: '渠道ID',
          createTime: '2020-12-23 13:17:01',
          tagType: '0', // 0 => 系统标签，1 => 自定义标签
          dataType: '2', // 0 => 文本，1 => 时间，2 => 数字
          memo: ''
        },
        {
          tagName: '信息分类ID',
          createTime: '2020-12-23 13:17:01',
          tagType: '1', // 0 => 系统标签，1 => 自定义标签
          dataType: '0', // 0 => 文本，1 => 时间，2 => 数字
          memo: ''
        },
        {
          tagName: '邮箱',
          createTime: '2020-12-23 13:17:01',
          tagType: '0', // 0 => 系统标签，1 => 自定义标签
          dataType: '1', // 0 => 文本，1 => 时间，2 => 数字
          memo: ''
        },
        {
          tagName: '手机号码',
          createTime: '2020-12-23 13:17:01',
          tagType: '0', // 0 => 系统标签，1 => 自定义标签
          dataType: '2', // 0 => 文本，1 => 时间，2 => 数字
          memo: ''
        }
      ],
      pagesize1: 5,
      currpage1: 1,
      tag2_select: '',
      options: [
        {
          label: '全部标签',
          value: ''
        },
        {
          label: '系统标签',
          value: '1'
        },
        {
          label: '自定义标签',
          value: '2'
        }
      ],
      showDialog: false,
      isAdd: false,
      dialogFormData: {
        dataType: '0'
      },
      // tag2
      // tag3
      adding: false, // 添加分组按钮
      groupFormData: {},
      groupData: [
        {
          name: '有钱人',
          condition:
            '运营商（中国联通、中国电信）注册时间（2021-06-01 00:00:00 至 2021-07-14 23:59:59）',
          customerSum: '13',
          createTime: '	2021-06-29 10:59:24',
          updateTime: '2021-06-29 14:44:43'
        }
      ],
      pagesize2: 5,
      currpage2: 1
      // tag3
    }
  },
  created() {
    this.tableList.forEach(item => {
      this.checkList.push(item.label)
    })
  },
  computed: {
    canDo() {
      return this.checkList.length > 0
    }
  },
  methods: {
    // 切换页 方法 ----- 客户列表
    handleCurrentChange(cpage) {
      this.currpage = cpage
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    },
    // 表格项选中事件
    handleSelectionChange(val) {
      console.log(val)
    },
    // 切换页 方法 ----- 标签管理
    handleCurrentChange1(cpage) {
      this.currpage1 = cpage
    },
    handleSizeChange1(psize) {
      this.pagesize1 = psize
    },
    tag2_add() {
      // 添加标签
      this.showDialog = true
      this.isAdd = true
      this.dialogFormData = {
        tagName: '',
        dataType: '0',
        memo: ''
      }
    },
    tag2_edit(data) {
      // 编辑标签
      this.showDialog = true
      this.isAdd = false
      this.dialogFormData = JSON.parse(JSON.stringify(data))
    },
    // 切换页 方法 ----- 客户分组
    handleCurrentChange2(cpage) {
      this.currpage2 = cpage
    },
    handleSizeChange2(psize) {
      this.pagesize2 = psize
    },
    toReload() {
      // 新建分组按钮
      this.adding = true
    },
    goCheck(val) {
      this.adding = val
    }
  }
}
</script>
<style lang="scss" scoped>
.customerManage /deep/ .el-tabs__nav-wrap {
  padding-left: 30px;
  box-sizing: border-box;
}
.popover {
  display: block;
  margin: 10px 0;
  padding-left: 10px;
  box-sizing: border-box;
  & /deep/ .el-popover__reference-wrapper {
    cursor: pointer;
  }
}
.alignRight {
  text-align: right;
}
</style>
