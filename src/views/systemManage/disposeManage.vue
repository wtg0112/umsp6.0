<template>
  <div class="disposeManage">
    <el-card class="box-card">
      <el-form ref="formData" :model="formData">
        <el-row :gutter="20">
          <el-col :span="4">
            短信发送速度：
          </el-col>
          <el-col :span="20">
            <el-row :gutter="10">
              <el-col :span="10">
                <el-row :gutter="10">
                  <el-col :span="6">最大发送速度</el-col>
                  <el-col :span="12">
                    <el-form-item prop="maxSpeed">
                      <el-input
                        v-model="formData.maxSpeed"
                        size="small"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">条/秒</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="10">
                <el-row :gutter="10">
                  <el-col :span="6">匀速发送速度</el-col>
                  <el-col :span="12">
                    <el-form-item prop="normalSpeed">
                      <el-input
                        v-model="formData.normalSpeed"
                        size="small"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">条/秒</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="10">
                <el-row :gutter="10">
                  <el-col :span="6">最小发送速度</el-col>
                  <el-col :span="12">
                    <el-form-item prop="minSpeed">
                      <el-input
                        v-model="formData.minSpeed"
                        size="small"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">条/秒</el-col>
                </el-row>
              </el-col>
            </el-row>
          <el-button type="primary" size="small">应用</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'disposeManage',
  data() {
    return {
      formData: {}
    }
  }
}
</script>
<style lang="scss" scoped>
.disposeManage /deep/ .el-row{
  line-height: 40px;
  margin: 0;
  margin-bottom: 10px;
}
</style>
