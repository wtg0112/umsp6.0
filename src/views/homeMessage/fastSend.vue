<template>
  <div>
    <h2 class="h2">快速发送 <span>(最多1000个手机号)</span></h2>
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
                <el-form-item prop="taskName" label="任务名称" :rules="{required: true, message: '请输入任务名称', trigger: 'blur'}">
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
                <el-form-item prop="phone" label="手机号">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="手机号码"
                    v-model="formData.phone"
                  >
                  </el-input>
                </el-form-item>
                <p style="color: red; text-indent: 100px;">(注意：多个手机号请换行隔开)</p>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="16">
                <p style="text-indent: 100px; margin-bottom: 20px;">
                  您的短信已经输入 <span class="p_span">{{word}}</span> 个字,拆分后,短信条数为 <span class="p_span">{{slip}}</span> 条
                </p>
                <el-form-item prop="content" label="发送内容" :rules="{required: true, message: '请输入发送内容', trigger: 'blur'}">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="发送内容"
                    v-model="formData.content"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10">

          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      word: 0,
      slip: 0,
      formData: {
        qudao: '',
        classify: '',
        sign: ''
      },
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
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.p_span{
  font-size: 20px;
  font-weight: bold;
}
</style>
