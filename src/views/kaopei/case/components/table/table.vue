<template>
  <el-table
      v-loading="loading"
      :data="tableData"
      :highlight-current-row="true"
      @row-click="goDetails"
      @sort-change="handleSortChange"
      class="table"
    >
      <el-table-column label="Student Name" min-width='110px'>
        <template slot="header">
          <div class="tabname">
            Student Name
          </div>
        </template>
        <template slot-scope="scope">
          <div class="tabname">
            <img :src="scope.row.touxiang" alt />
            <div>
              {{ scope.row.khname }}
              <span>{{ scope.row.CityName | empty }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="现有学位" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.education_singlebox | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="申请学位" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.applydegree_singlebox | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="考试科目" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.subject_singlebox | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="课时（节）" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.hour_decimal | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="周期（月）" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.cycle_decimal | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="入学成绩" align="center"
        sortable="custom"
        :sort-orders="['ascending', 'descending', null]"
        prop="Existing_decimal"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.Existing_decimal | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="最终成绩" align="center" min-width='110px'
        sortable="custom"
        :sort-orders="['ascending', 'descending', null]"
        prop="stopScore_decimal"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.stopScore_decimal | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="提升成绩"
        sortable="custom"
        :sort-orders="['ascending', 'descending', null]"
        prop="rangeScore_decimal"
        min-width='90px'
      >
        <template slot-scope="scope">
          <span
            :class="[
              scope.row.rangeScore_decimal.length == 2
                ? 'hongse'
                : scope.row.rangeScore_decimal.length == 1
                ? 'huangse'
                : 'lanse',
              'ranking'
            ]"
            >{{ scope.row.rangeScore_decimal | empty }}</span
          >
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  props: ['loading', 'tableData', 'xuewei'],
  data () {
    return {
    }
  },
  methods: {
    // 打开详情弹窗 获取详情数据
    goDetails (row, event, column) {
      const { href } = this.$router.resolve(
        '/meiyan/details?userid=' +
        row.id
      )
      window.open(href, '_blank')
    },
    // 表格排序
    handleSortChange ({ column, prop, order }) {
      console.log(column, prop, order)
      this.$emit('tableSort', prop, order)
    }
  }
}
</script>

<style scoped lang="scss">
.table{
  /deep/ td, .el-table th.is-leaf{
    border: none;
  }
  &::before{
    height: 0px;
  }
}
.tabname {
  display: flex;
  align-items: center;
  padding-left: 0.4rem;
}
.tabname > img {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 0.06rem;
  margin-right: 0.12rem;
}
.tabname > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 院校排名 */
.ranking {
  width: 0.68rem;
  height: 0.29rem;
  line-height: 0.29rem;
  border-radius: 0.06rem;
  text-align: center;
  display: inline-block;
}
.hongse {
  background: rgba(255, 242, 243, 1);
  color: #ff8892;
}
.huangse {
  background: rgba(254, 249, 239, 1);
  color: #f4c268;
}
.lanse {
  background: rgba(94, 129, 244, 0.1);
  color: #1b51e5;
}
.el-pagination {
  font-weight: 400;
}
.tabname > div {
  align-items: flex-start;
}

// table 头部背景颜色
/deep/ .el-table__header-wrapper{
  font-size: 0.15rem;
  background: #EEF1FA;
  .el-table__header .has-gutter .is-leaf {
    background: #EEF1FA;
    font-size: 0.15rem;
    font-weight: 500;
    color: #7B7CA4;
    border: none;
  }
  th{
        padding: 0.12rem 0;
  }
}

/deep/ .el-table__body-wrapper {
    font-size: 0.15rem;
    font-weight: 500;
    color: #383874;
}
/deep/ .el-table__row {
  cursor: pointer;
}
/deep/ .el-button--primary {
  background: #5e81f4;
}
/deep/ .dialog-footer {
  display: flex;
  justify-content: space-between;
}
/deep/ .el-button,
.el-button--primary {
  width: 135px;
}
/deep/ .el-table__row > td > .cell > div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
