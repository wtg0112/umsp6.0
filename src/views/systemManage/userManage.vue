<template>
  <div class="userManage">
    <el-card class="box-card">
      <el-form
        ref="formData"
        :model="formData"
        label-suffix="："
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item prop="account" label="用户">
              <el-select filterable v-model="formData.account" size="small">
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item prop="name" label="昵称">
              <el-select filterable v-model="formData.name" size="small">
                <el-option
                  v-for="item in userList"
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
          <el-col :span="7">
            <el-form-item prop="organ" label="机构">
              <el-select filterable v-model="formData.organ" size="small">
                <el-option
                  v-for="item in organList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item prop="depart" label="部门">
              <el-select filterable v-model="formData.depart" size="small">
                <el-option
                  v-for="item in departList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" size="small" style="margin-left: 40px;"
          >查询</el-button
        >
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-button-group class="buttonGroup">
        <el-button type="primary" @click="userAdd" size="small"
          >新增用户</el-button
        >
      </el-button-group>
      <el-table
        ref="tableData"
        :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      >
        <el-table-column
          prop="account"
          label="用户"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="昵称"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="channel" label="渠道"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="balance" label="短信余额"></el-table-column>
        <el-table-column prop="organ" label="机构"></el-table-column>
        <el-table-column prop="depart" label="部门"></el-table-column>
        <el-table-column prop="exam" label="审核"></el-table-column>
        <el-table-column label="渠道分配" align="center">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="channelCheck(scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="角色分配" align="center">
          <template slot-scope="scope">
            <el-button type="warning" size="small" @click="roleCheck(scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="CHATBOT" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="chatbotCheck(scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="160"
          align="center"
        ></el-table-column>
        <el-table-column label="基本操作" align="center" width="260">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="userEdit(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" size="small">停用</el-button>
            <el-button type="info" size="small">重置密码</el-button>
          </template>
        </el-table-column>
        <el-table-column label="充值操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="rechargeMsg(scope.row)"
              >充值短信</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="rechargeRecord(scope.row)"
              >充值记录</el-button
            >
            <el-button type="danger" size="small" @click="costRecord(scope.row)"
              >扣费记录</el-button
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
      :title="isAdd ? '添加用户' : '修改用户'"
      :visible.sync="dialogShow"
    >
      <el-card class="box-card">
        <el-form
          ref="dialogFormData"
          :model="dialogFormData"
          label-suffix="："
          label-width="100px"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="account" label="用户名">
                <el-input
                  v-model="dialogFormData.account"
                  placeholder="请输入用户名"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="name" label="昵称">
                <el-input
                  v-model="dialogFormData.name"
                  placeholder="请输入昵称"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="isAdd">
            <el-col :span="12">
              <el-form-item prop="costType" label="付款类型">
                <el-select
                  filterable
                  v-model="dialogFormData.costType"
                  size="small"
                >
                  <el-option
                    v-for="item in costType"
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
            <el-col :span="12" v-if="isAdd">
              <el-form-item prop="phone" label="手机号码">
                <el-input
                  v-model="dialogFormData.phone"
                  placeholder="请输入手机号码"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="exam" label="审核">
                <el-select
                  filterable
                  v-model="dialogFormData.exam"
                  size="small"
                >
                  <el-option
                    v-for="item in examList"
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
              <el-form-item prop="organ" label="机构">
                <el-select
                  filterable
                  v-model="dialogFormData.organ"
                  size="small"
                >
                  <el-option
                    v-for="item in organList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="depart" label="部门">
                <el-select
                  filterable
                  v-model="dialogFormData.depart"
                  size="small"
                >
                  <el-option
                    v-for="item in departList"
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogShow = false" size="small"
          >保 存</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :title="'用户' + user.account + '的渠道'"
      :visible.sync="channelDialogShow"
    >
      <el-row :gutter="20">
        <el-col :span="8" style="text-align: right;">
          信息分类：
        </el-col>
        <el-col :span="16">
          <el-checkbox-group v-model="channelCheckList">
            <el-row :gutter="20" style="margin: 0;">
              <el-col
                :span="12"
                v-for="item in channelList"
                :key="item.value"
                style="margin-bottom: 10px;"
              >
                <el-checkbox :label="item.label"></el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      :title="'用户' + user.account + '的角色'"
      :visible.sync="roleDialogShow"
    >
      <el-row :gutter="20">
        <el-col :span="8" style="text-align: right;">
          角色列表：
        </el-col>
        <el-col :span="16">
          <el-checkbox-group v-model="roleCheckList">
            <el-row :gutter="20" style="margin: 0;">
              <el-col
                :span="12"
                v-for="item in roleList"
                :key="item.value"
                style="margin-bottom: 10px;"
              >
                <el-checkbox :label="item.label"></el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      :title="'用户' + user.account + '绑定CHATBOT配置'"
      :visible.sync="chatbotDialogShow"
    >
      <el-form
        ref="chatbotFormData"
        :model="chatbotFormData"
        label-suffix="："
        label-width="150px"
      >
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item prop="yd" label="移动">
              <el-select filterable v-model="chatbotFormData.yd" size="small">
                <el-option
                  v-for="item in chatbotList"
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
          <el-col :span="20">
            <el-form-item prop="lt" label="联通">
              <el-select filterable v-model="chatbotFormData.lt" size="small">
                <el-option
                  v-for="item in chatbotList"
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
          <el-col :span="20">
            <el-form-item prop="dx" label="电信">
              <el-select filterable v-model="chatbotFormData.dx" size="small">
                <el-option
                  v-for="item in chatbotList"
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
    </el-dialog>
    <el-dialog
      :title="'用户' + user.account + '正在充值'"
      :visible.sync="rechargeMsgDialogShow"
    >
      <el-card class="box-card">
        <el-form
          class="rechargeMsgForm"
          ref="rechargeMsgFormData"
          :model="rechargeMsgFormData"
          label-suffix="："
          label-width="150px"
        >
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item prop="account" label="充值账号">
                <el-input
                  disabled
                  v-model="rechargeMsgFormData.account"
                  placeholder="请输入渠道名称"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item prop="balance" :label="user.account + '剩余条数'">
                <el-input
                  disabled
                  v-model="rechargeMsgFormData.balance"
                  placeholder="请输入渠道名称"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item
                prop="num"
                :label="'充值条数(我的剩余条数:' + user.balance + ')'"
              >
                <el-input
                  v-model="rechargeMsgFormData.num"
                  placeholder="请输入充值条数"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item prop="memo" label="备注">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="rechargeMsgFormData.memo"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rechargeMsgDialogShow = false" size="small"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="rechargeMsgDialogShow = false"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      width="70%"
      :title="'用户' + user.account + '的充值记录'"
      :visible.sync="rechargeRecordDialogShow"
    >
      <el-card class="box-card">
        <el-table
          ref="rechargeRecordData"
          :data="
            rechargeRecordData.slice(
              (rechargeRecordcurrpage - 1) * rechargeRecordpagesize,
              rechargeRecordcurrpage * rechargeRecordpagesize
            )
          "
        >
          <el-table-column prop="account" label="用户"></el-table-column>
          <el-table-column prop="operator" label="操作员"></el-table-column>
          <el-table-column prop="time" label="充值时间"></el-table-column>
          <el-table-column prop="num" label="充值条数"></el-table-column>
          <el-table-column prop="memo" label="备注"></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="rechargeRecordpagesize"
          :total="this.rechargeRecordData.length"
          @current-change="rechargeRecordCurrentChange"
          @size-change="rechargeRecordSizeChange"
        >
        </el-pagination>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rechargeRecordDialogShow = false" size="small"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="rechargeRecordDialogShow = false"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      width="70%"
      :title="'用户' + user.account + '的扣费记录'"
      :visible.sync="costRecordDialogShow"
    >
      <el-card class="box-card">
        <el-table
          ref="costRecordData"
          :data="
            costRecordData.slice(
              (costRecordcurrpage - 1) * costRecordpagesize,
              costRecordcurrpage * costRecordpagesize
            )
          "
        >
          <el-table-column prop="taskName" label="任务名称"></el-table-column>
          <el-table-column prop="num" label="短信条数"></el-table-column>
          <el-table-column prop="time" label="扣费时间"></el-table-column>
          <el-table-column prop="balance" label="余额"></el-table-column>
          <el-table-column prop="memo" label="备注"></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="costRecordpagesize"
          :total="this.costRecordData.length"
          @current-change="costRecordCurrentChange"
          @size-change="costRecordSizeChange"
        >
        </el-pagination>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="costRecordDialogShow = false" size="small"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="costRecordDialogShow = false"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'userManage',
  data() {
    return {
      user: {},
      isAdd: false,
      dialogShow: false, // 基础信息弹框
      channelDialogShow: false, // 查看渠道弹框
      roleDialogShow: false, // 查看角色弹框
      chatbotDialogShow: false, // 查看chatbot弹框
      rechargeMsgDialogShow: false, // 充值短信弹框
      rechargeRecordDialogShow: false, // 充值记录弹框
      costRecordDialogShow: false, // 扣费记录弹框
      formData: {
        account: '',
        name: '',
        organ: '',
        depart: ''
      },
      chatbotFormData: {
        yd: '',
        lt: '',
        dx: ''
      },
      rechargeMsgFormData: {},
      userList: [
        // 用户、昵称列表
        {
          value: '',
          label: '全部',
          name: '全部'
        },
        {
          value: 'wb',
          label: 'wb',
          name: '王彪'
        },
        {
          value: 'zly',
          label: 'zly',
          name: '郑路玉'
        }
      ],
      organList: [
        // 机构列表
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '北京国都'
        },
        {
          value: '2',
          label: '福建国都'
        }
      ],
      departList: [
        // 部门列表
        {
          label: '全部',
          value: ''
        },
        {
          label: '研发一部',
          value: '1'
        },
        {
          label: '产品部',
          value: '2'
        }
      ],
      costType: [
        {
          value: '0',
          label: '后付款'
        },
        {
          value: '1',
          label: '预付款'
        }
      ],
      examList: [
        {
          value: '1',
          label: '审核'
        },
        {
          value: '0',
          label: '不审核'
        }
      ],
      chatbotList: [
        {
          value: '',
          label: '请选择'
        },
        {
          value: '0',
          label: '河北银行（1065051122121）'
        },
        {
          value: '1',
          label: '微众银行（1065051122186）'
        }
      ],
      channelList: [
        {
          value: '0',
          label: '甘肃农信社'
        },
        {
          value: '1',
          label: '核心系统'
        },
        {
          value: '2',
          label: '国都演示'
        }
      ],
      roleList: [
        {
          value: '0',
          label: '审核员'
        },
        {
          value: '1',
          label: '操作员'
        },
        {
          value: '2',
          label: '机构管理员'
        },
        {
          value: '3',
          label: '监控人员'
        },
        {
          value: '4',
          label: '运维人员'
        }
      ],
      channelCheckList: [],
      roleCheckList: [],
      pagesize: 5,
      currpage: 1,
      rechargeRecordpagesize: 5,
      rechargeRecordcurrpage: 1,
      costRecordpagesize: 5,
      costRecordcurrpage: 1,
      tableData: [
        {
          account: 'wb',
          name: '王彪',
          role: '监控人员',
          channel: '国都演示',
          status: '正常',
          balance: '无限制',
          organ: '北京国都',
          depart: '产品部',
          exam: '审核',
          createTime: '2021-07-05 17:47:30',
          chatbot: {
            yd: '0',
            lt: '0',
            dx: '0'
          },
          rechargeList: [],
          costList: []
        },
        {
          account: 'zlu',
          name: '郑路玉',
          role: '操作员',
          channel: '国都演示',
          status: '正常',
          balance: '无限制',
          organ: '北京国都',
          depart: '研发一部',
          exam: '审核',
          createTime: '2021-05-06 14:06:41',
          chatbot: {
            yd: '1',
            lt: '1',
            dx: '1'
          },
          rechargeList: [],
          costList: []
        }
      ],
      rechargeRecordData: [],
      costRecordData: [],
      dialogFormData: {}
    }
  },
  methods: {
    // 切换页 方法 ==> 基本信息表格
    handleCurrentChange(cpage) {
      this.currpage = cpage
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    },
    // 切换页 方法 ==> 充值记录表格
    rechargeRecordCurrentChange(cpage) {
      this.rechargeRecordcurrpage = cpage
    },
    rechargeRecordSizeChange(psize) {
      this.rechargeRecordpagesize = psize
    },
    // 切换页 方法 ==> 扣费记录表格
    costRecordCurrentChange(cpage) {
      this.costRecordcurrpage = cpage
    },
    costRecordSizeChange(psize) {
      this.costRecordpagesize = psize
    },
    // 用户添加
    userAdd() {
      this.isAdd = true
      this.dialogShow = true
      this.dialogFormData = {}
    },
    // 用户编辑
    userEdit(data) {
      this.isAdd = false
      this.dialogShow = true
      this.dialogFormData = JSON.parse(JSON.stringify(data))
    },
    // 渠道查看click
    channelCheck(data) {
      this.user = JSON.parse(JSON.stringify(data))
      this.channelDialogShow = true
    },
    // 角色查看click
    roleCheck(data) {
      this.user = JSON.parse(JSON.stringify(data))
      this.roleDialogShow = true
    },
    // chatbot查看click
    chatbotCheck(data) {
      this.user = JSON.parse(JSON.stringify(data))
      this.chatbotFormData = JSON.parse(JSON.stringify(data.chatbot))
      this.chatbotDialogShow = true
    },
    // 充值短信click
    rechargeMsg(data) {
      this.user = JSON.parse(JSON.stringify(data))
      this.rechargeMsgDialogShow = true
    },
    // 充值记录click
    rechargeRecord(data) {
      this.user = JSON.parse(JSON.stringify(data))
      this.rechargeRecordDialogShow = true
    },
    // 扣费记录click
    costRecord(data) {
      this.user = JSON.parse(JSON.stringify(data))
      this.costRecordDialogShow = true
    }
  }
}
</script>
<style lang="scss" scoped>
.userManage /deep/ .rechargeMsgForm .el-form-item__label {
  line-height: 2;
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
