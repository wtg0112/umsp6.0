<template>
  <div class="userManage"  v-if="!changeShow">
        <el-card class="box-card">
          <el-form
            ref="strategyRule"
            :model="strategyRule"
            label-suffix="："
            label-width="100px"
          >
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item prop="name" label="策略名称">
                  <el-input
                    v-model="strategyRule.name"
                    placeholder="请输入策略名称"
                    size="small"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="name" label="信息分类">
                   <el-select
                        filterable
                        size="small"
                        v-model="strategyRule.infoClassify"
                        placeholder="请选择信息分类"
                        >
                        <el-option
                            v-for="item in infoClassifyList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        >
                        </el-option>
                        </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="name" label="使用状态">
                   <el-select
                        filterable
                        size="small"
                        v-model="strategyRule.useStatus"
                        placeholder="请选择信使用状态"
                        >
                        <el-option
                            v-for="item in useStatusArr"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        >
                        </el-option>
                        </el-select>
                </el-form-item>
              </el-col>
             <el-col :span="6">
                <el-form-item prop="name" label="审核状态">
                   <el-select
                        filterable
                        size="small"
                        v-model="strategyRule.auditStatus"
                        placeholder="请选择审核状态"
                        >
                        <el-option
                            v-for="item in auditStatusList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        >
                        </el-option>
                        </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-button
                  type="primary"
                  size="small"
                  style="margin-left:15px; margin-top:24px;"
                  >查询</el-button
                >
                <el-button type="primary" plain size="small">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-button
          style="margin:10px 0 10px 32px;"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="toReload"
          >新建发送策略</el-button
        >
        <el-table
          ref="groupTable"
          :data="
            groupData.slice((currpage2 - 1) * pagesize2, currpage2 * pagesize2)
          "
        >
          <el-table-column prop="name" label="策略名称"></el-table-column>
          <el-table-column prop="infoClassify" label="信息分类"></el-table-column>
          <el-table-column label="使用状态" width="300">
               <template slot-scope="scope">
                       <el-switch
                        v-model="scope.row.useStatus"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                        </el-switch>
                </template>
          </el-table-column>
          <el-table-column  label="审核状态">
                 <template slot-scope="scope">
                     <i v-if="scope.row.auditStatus==0" class="iconfont icon-yuan-copy-copy-copy-copy" style="font-size:20px;color:green"></i>
                     <i v-else-if="scope.row.auditStatus==1" class="iconfont icon-yuan-copy-copy-copy-copy" style="font-size:20px;color:red"></i>
                     <i v-else-if="scope.row.auditStatus=2" class="iconfont icon-yuan-copy-copy-copy-copy" style="font-size:20px;color:gray"></i>
                </template>
          </el-table-column>
          <el-table-column prop="createUser" label="创建用户"></el-table-column>
          <el-table-column prop="createTime" width="200" label="创建时间"></el-table-column>
          <el-table-column label="操作" width="300" >
                 <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="useTemplate(scope.row)">详情</el-button>
                        <el-button
                            type="success"
                            @click="templateEdit(scope.row)"
                            size="small"
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
          :page-size="pagesize2"
          :total="this.groupData.length"
          @current-change="handleCurrentChange2"
          @size-change="handleSizeChange2"
        >
        </el-pagination>
  </div>
 <add-strategy v-else  @closeAdd="closeAdd"></add-strategy>
</template>
<script>
import addStrategy from './addStrategy'
export default {
  name: 'sendstrategy',
  components: {
    addStrategy
  },
  data() {
    return {
      changeShow:false,
      strategyShow:false,
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
      strategyRule: {
          name:'',
          infoClassify:'',
          useStatus:'',
          auditStatus:'',
      },
      infoClassifyList:[
           {
            label: '全部',
            value: ''
            },
            {
            label: '实时',
            value: '1'
            },
            {
            label: '动账通知',
            value: '2'
            }

      ],
      useStatusArr:[
           {
            label: '全部',
            value: ''
            },
            {
            label: '启用',
            value: '1'
            },
            {
            label: '停用',
            value: '2'
            }
      ],
      auditStatusList:[
            {
            label: '全部',
            value: ''
            },
            {
            label: '审核中',
            value: '1'
            },
            {
            label: '通过',
            value: '2'
            },
            {
            label: '不通过',
            value: '3'
            }
      ],
      groupData: [
        {
          name: '策略1',
          infoClassify:'验证码',
          useStatus:true,
          auditStatus:0,
          createUser:'admin',
          createTime:'2021-07-03 13：00：26'
        },
          {
          name: '策略2',
          infoClassify:'验证码',
          useStatus:false,
          auditStatus:1,
          createUser:'admin',
          createTime:'2021-07-03 13：00：26'
        },
          {
          name: '策略3',
          infoClassify:'验证码',
          useStatus:true,
          auditStatus:2,
          createUser:'admin',
          createTime:'2021-07-03 13：00：26'
        }
      ],
      pagesize2: 5,
      currpage2: 1
      // tag3,
    }
  },
  created() {},
  methods: {
    closeAdd(val){
      this.changeShow=val

    },
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
      // 新建发送策略按钮
      this.changeShow = true
    },
  }
}
</script>
<style lang="scss" scoped>
.userManage /deep/ .el-tabs__nav-wrap {
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
