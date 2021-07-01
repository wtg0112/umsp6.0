<template>
  <div class="addGroup">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分组条件</span>
      </div>
      <el-form
        ref="addGroupData"
        :model="addGroupData"
        label-suffix="："
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              prop="name"
              label="分组名称"
              :rules="{
                required: true,
                message: '请输入分组名称!',
                trigger: 'blur'
              }"
            >
              <el-input
                size="small"
                v-model="addGroupData.name"
                placeholder="请输入分组名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>筛选客户</span>
      </div>
      <el-row :gutter="20" style="margin-top: 0;">
        <el-col
          :span="8"
          class="scroll480"
          style="border-right: 1px solid #e6e7eb;"
        >
          <el-row :gutter="0">
            <el-col :span="2">
              <div style="width: 10px; height: 10px;"></div>
            </el-col>
            <el-col :span="22" style="">
              <el-collapse v-model="activeNames">
                <el-collapse-item title="自定义标签" name="1">
                  <el-checkbox-group
                    v-model="checkboxGroup1"
                    @change="handleChange"
                  >
                    <el-row :gutter="20">
                      <el-col
                        :span="12"
                        v-for="item in diyTags"
                        :key="item.tagName"
                      >
                        <el-checkbox-button :label="item.tagName">{{
                          item.tagName
                        }}</el-checkbox-button>
                      </el-col>
                    </el-row>
                  </el-checkbox-group>
                </el-collapse-item>
                <el-collapse-item title="系统标签" name="2">
                  <el-checkbox-group
                    v-model="checkboxGroup2"
                    @change="handleChange1"
                  >
                    <el-row :gutter="20">
                      <el-col
                        :span="12"
                        v-for="item in sysTags"
                        :key="item.tagName"
                      >
                        <el-checkbox-button :label="item.tagName">{{
                          item.tagName
                        }}</el-checkbox-button>
                      </el-col>
                    </el-row>
                  </el-checkbox-group>
                </el-collapse-item>
              </el-collapse>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="16" class="height480">
          <div
            class="empty"
            v-if="!checkboxGroup1.length && !checkboxGroup2.length"
          >
            <img src="" alt="" />
            请在左侧勾选筛选条件
          </div>
          <div class="notEmpty" v-else>
            <el-form
              ref="conditionData"
              :model="conditionData"
              label-suffix="："
              label-width="150px"
            >
              <template v-for="(item, index) in conditionList">
                <el-card class="box-card condition-card" :key="item.tagName">
                  <!-- 文本类型 -->
                  <template v-if="item.dataType == '0'">
                    <el-row>
                      <el-col :span="16">
                        <el-form-item :label="item.tagName">
                          <el-input size="small"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </template>
                  <!-- 数字类型 -->
                  <template v-if="item.dataType == '1'">
                    <el-row>
                      <el-col :span="16">
                        <el-form-item :label="item.tagName">
                          <el-row style="margin: 0;">
                            <el-col :span="8">
                              <el-select filterable size="small">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                >
                                </el-option>
                              </el-select>
                            </el-col>
                            <el-col
                              :span="16"
                              style="padding-left: 10px; box-sizing: border-box;"
                            >
                              <el-input size="small"></el-input>
                            </el-col>
                          </el-row>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </template>
                  <!-- 时间类型 -->
                  <template v-if="item.dataType == '2'">
                    <el-row>
                      <el-col :span="16">
                        <el-form-item :label="item.tagName">
                          <el-date-picker
                            type="datetime"
                            placeholder="选择日期时间"
                          >
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </template>
                  <i
                    class="iconfont icon-guanbi del"
                    @click="delCondition(index)"
                  ></i>
                </el-card>
              </template>
            </el-form>
          </div>
          <div
            class="btnGroup"
            v-if="checkboxGroup1.length || checkboxGroup2.length"
          >
            <el-button type="primary" size="small">查询</el-button>
            <el-button type="primary" plain size="small">重置</el-button>
            <span class="customer">当前条件匹配{{ customers }}位客户</span>
            <el-button type="text" size="small" icon="el-icon-tickets">详情</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20">
      <el-col
        style="position:fixed;bottom:0px;background:#fff;border-top:1px solid rgb(210,210,210);"
      >
        <div style="margin:14px 20%;">
          <el-button type="primary" size="small">保存</el-button>
          <el-button type="primary" plain size="small" @click="goBack">返回</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['tagsList'],
  data() {
    return {
      customers: 13,
      options: [
        {
          value: '1',
          label: '包含'
        },
        {
          value: '2',
          label: '开头是'
        },
        {
          value: '3',
          label: '结尾是'
        },
        {
          value: '4',
          label: '为空'
        },
        {
          value: '5',
          label: '有值'
        }
      ],
      addGroupData: {},
      conditionData: {},
      activeNames: ['1', '2'],
      diyTags: [], // 自定义标签
      sysTags: [], // 系统标签
      checkboxGroup1: [],
      checkboxGroup2: [],
      conditionList1: [], // 自定义标签筛选堆
      conditionList2: [], // 系统标签筛选堆
      conditionList: [] // 整体标签筛选堆
    }
  },
  created() {
    this.tagsList.forEach(item => {
      if (item.tagType == '0') {
        this.sysTags.push(item)
      } else {
        this.diyTags.push(item)
      }
    })
  },
  methods: {
    // 自定义标签筛选
    handleChange(val) {
      let arr = []
      // 将选中的对应项插入预备数组
      val.forEach(item => {
        let obj = this.diyTags.find(val => val.tagName == item)
        arr.push(obj)
      })
      // 先判断是添加项还是删除项
      if (arr.length > this.conditionList1.length) {
        // 将添加的项直接插入到整体中
        this.conditionList.push(arr[arr.length - 1])
      } else {
        // 获取到取消的选项
        let del = this.conditionList1.filter(
          v => !arr.some(item => item.tagName === v.tagName)
        )
        // 在整体中寻找到该项并去除掉
        let index = this.conditionList.findIndex(v =>
          del.some(item => item.tagName === v.tagName)
        )
        this.conditionList.splice(index, 1)
      }
      this.conditionList1 = arr
    },
    // 系统标签筛选
    handleChange1(val) {
      let arr = []
      // 将选中的对应项插入预备数组
      val.forEach(item => {
        let obj = this.sysTags.find(val => val.tagName == item)
        arr.push(obj)
      })
      // 先判断是添加项还是删除项
      if (arr.length > this.conditionList2.length) {
        // 将添加的项直接插入到整体中
        this.conditionList.push(arr[arr.length - 1])
      } else {
        // 获取到取消的选项
        let del = this.conditionList2.filter(
          v => !arr.some(item => item.tagName === v.tagName)
        )
        // 在整体中寻找到该项并去除掉
        let index = this.conditionList.findIndex(v =>
          del.some(item => item.tagName === v.tagName)
        )
        this.conditionList.splice(index, 1)
      }
      this.conditionList2 = arr
    },
    // 删除筛选项
    delCondition(index) {
      let obj = this.conditionList[index]
      console.log(this.checkboxGroup1)
      console.log(obj)
      // 删除左侧多选框的选中效果
      if (obj.tagType == '1') {
        // 0 => 系统标签，1 => 自定义标签
        this.checkboxGroup1 = this.checkboxGroup1.filter(
          item => item != obj.tagName
        )
        console.log(this.checkboxGroup1)
      } else {
        this.checkboxGroup2 = this.checkboxGroup2.filter(
          item => item != obj.tagName
        )
        console.log(this.checkboxGroup2)
      }
      // 删除对应索引下的筛选项
      this.conditionList.splice(index, 1)
    },
    // 返回按钮click
    goBack() {
      this.$emit('goCheck', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.addGroup {
  & /deep/ .el-card__header {
    border: none;
    padding-bottom: 0;
  }
  & /deep/ .el-collapse {
    border: none;
    & /deep/ .el-collapse-item__header {
      border: none;
    }
    & /deep/ .el-collapse-item__wrap {
      border: none;
      .el-collapse-item__content {
        padding-bottom: 0;
      }
    }
  }
  & /deep/ .el-checkbox-button {
    width: 100%;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    & .el-checkbox-button__inner {
      display: inline-block;
      width: 100%;
      margin-bottom: 10px;
    }
    &:last-child .el-checkbox-button__inner {
      border-radius: 4px;
    }
  }
}
.scroll480 {
  height: 480px;
  overflow-y: scroll;
  //滚动条样式
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background-color: rgba(240, 240, 240, 0);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    border-radius: 10px;
    background-color: rgba(240, 240, 240, 0);
  }
  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    background-color: #dcdfe6;
  }
  .empty {
    text-align: center;
  }
}
.height480 {
  height: 480px;
  padding-bottom: 50px;
  position: relative;
  box-sizing: border-box;
  .btnGroup {
    position: absolute;
    left: 0;
    bottom: 0px;
    height: 50px;
    line-height: 50px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    background-color: #fff;
    .customer{
      display: inline-block;
      margin: 0 20px;
    }
  }
  .notEmpty {
    height: 100%;
    overflow-y: scroll;
    padding: 0 10px;
    box-sizing: border-box;
    //滚动条样式
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      border-radius: 6px;
      background-color: rgba(240, 240, 240, 0);
    }
    /*定义滚动条轨道 内阴影+圆角*/
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
      border-radius: 10px;
      background-color: rgba(240, 240, 240, 0);
    }
    /*定义滑块 内阴影+圆角*/
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
      background-color: #dcdfe6;
    }
  }
}
.condition-card {
  border: 1px solid #c6cbdd !important;
  border-radius: 2px;
  margin-bottom: 12px;
  position: relative;
  width: 100%;
  & /deep/ .el-card__body {
    padding: 5px 0;
  }
  .del {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    cursor: pointer;
  }
}
</style>
