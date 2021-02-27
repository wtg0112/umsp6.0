<template>
  <el-table
      v-loading="loading"
      :data="tableData"
      :highlight-current-row="true"
      @row-click="goDetails"
      @sort-change="handleSortChange"
      :header-cell-class-name="handleTheadStyle"
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
              <!-- <span>{{ scope.row.gncsname }}</span> -->
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="所在地区">
        <template slot-scope="scope">
          <div>{{ scope.row.CityName | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="录取院校">
        <template slot-scope="scope">
          <div>{{ scope.row.AppliSchool | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="院校排名"
        sortable="custom"
        :sort-orders="['ascending', 'descending', null]"
        prop="rank_decimal"
        min-width='90px'
      >
        <template slot-scope="scope">
          <span
            :class="[
              scope.row.rank_decimal < 50
                ? 'hongse'
                : scope.row.rank_decimal >= 50 && scope.row.rank_decimal <= 100
                ? 'huangse'
                : 'lanse',
              'ranking'
            ]"
            >{{ scope.row.rank_decimal | empty }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="申请专业" min-width='100px'>
        <template slot-scope="scope">
          <div>{{ scope.row.AppliMajor | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="毕业院校" min-width='120px'>
        <template slot-scope="scope">
          <div>{{ scope.row.GraduateSchool | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="出身专业" min-width='120px'>
        <template slot-scope="scope">
          <div>{{ scope.row.GraduateMajor | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="GPA">
        <template slot-scope="scope">
          <div>{{ scope.row.gpa_decimal | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="TOEFL">
        <template slot-scope="scope">
          <div>{{ scope.row.toefl_decimal | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="N1">
        <template slot-scope="scope">
          <div>{{ scope.row.nonescore | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="N2">
        <template slot-scope="scope">
          <div>{{ scope.row.ntwoscore | empty }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="入读时间"
        sortable="custom"
        :sort-orders="['descending', 'ascending', null]"
        prop="sqnfsqjj"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <span style="margin-right: 10px">{{
            scope.row.sqnfsqjj | empty
          }}</span>
        </template>
      </el-table-column> -->
    </el-table>
</template>

<script>
export default {
  props: ['loading', 'tableData', 'xuewei'],
  data () {
    return {
      curThead: [{ order: '', prop: 'sqnfsqjj' }, { order: '', prop: 'rank_decimal' }]
    }
  },
  methods: {
    // 打开详情弹窗 获取详情数据
    goDetails (row, event, column) {
      const { href } = this.$router.resolve(
        '/japan/details?userid=' +
        row.id
      )
      window.open(href, '_blank')
    },
    // 表头切换 class事件
    handleTheadStyle ({ row, column, rowIndex, columnIndex }) {
      // 找出当前节点的是否在curThead有所记录
      const index = this.curThead.findIndex(item => { return item.prop == column.property })
      if (index > -1) {
        // 在curThead找到当前节点的property值，对其order进行赋值。
        // 值得注意的是，column中property字段保存的是当前节点的prop值。
        column.order = this.curThead[index].order
      }
    },
    // 表格排序
    handleSortChange ({ column, prop, order }) {
      // 判断数组curThead中是否存在当前节点的prop
      const index = this.curThead.findIndex(item => { return item.prop == prop })
      if (index > -1) {
        // 如果存在，修改数组curThead中的order
        this.curThead[index].order = order
      } else {
        // 如果不存在，向数组curThead中添加当前节点的prop和order
        this.curThead.push({ prop: prop, order: order })
      }
      this.$emit('tableSort', this.curThead)
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
