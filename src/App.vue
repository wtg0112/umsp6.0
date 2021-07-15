<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  position: relative;
  font-size: 14px;
  // font-family: tahoma, arial, 'Hiragino Sans GB', '\5b8b\4f53', sans-serif;
  h3,
  p {
    margin: 0;
  }
}
#app {
  width: 100%;
  height: 100%;
  position: relative;
}
.el-row {
  margin: 10px 0;
}
.el-button--small,
.el-button--small.is-round {
  padding: 11px 15px !important;
}
.el-input--small .el-input__inner {
  height: 36px !important;
  line-height: 36px !important;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100% !important;
}
.el-table {
  width: 100%;
}

.el-pagination {
  margin-top: 20px;
  text-align: right;
  padding-right: 50px !important;
}
.table-container {
  margin-top: 20px;
}
.breadcrumb {
  font-size: 16px;
  box-sizing: border-box;
}
.h2 {
  text-indent: 20px;
  span {
    font-size: 14px;
    font-weight: normal;
  }
}
.el-card {
  margin-bottom: 10px;
}
.el-select {
  width: 100%;
}
.el-tag {
  margin-right: 10px;
}
.el-table th {
  background: #f0f0f0 !important;
}

// 公共样式
.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{
  box-shadow: none !important;
  border-bottom:1px solid #f0f0f0 !important;
}
.el-form-item{
  margin-bottom:8px !important;
  .el-card.is-always-shadow,
  .el-card.is-hover-shadow:focus,
  .el-card.is-hover-shadow:hover {
    box-shadow: none !important;
    border-bottom: 1px solid #f0f0f0 !important;
  }
}
.el-card {
  border: none !important;
  border-radius: 0px !important;
}
.el-dialog__title{
  font-weight: bold;
}
.el-card__header span{
  font-weight: bold;
}
</style>
