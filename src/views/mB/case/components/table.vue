<template>
  <el-table
      v-loading="loading"
      :data="tableData"
      @row-click="clickRow"
      :highlight-current-row="true"
      @sort-change="handleSortChange"
      :header-cell-class-name="handleTheadStyle"
      class="table"
    >
      <el-table-column>
        <template slot="header">
          <div class="tabname">
            姓名
          </div>
        </template>
        <template slot-scope="scope" >
          <div class="tabname" :class="{isJp:scope.row.isBoutique==1}">
            <img :src="scope.row.touxiang" alt />
            <div>
              {{ scope.row.khname }}
              <span>{{ scope.row.CityName | empty }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="申请院校" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.AppliSchool | empty }}</div>
        </template>
      </el-table-column>

      <el-table-column label="申请专业" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.AppliMajor | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="毕业院校" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.GraduateSchool | empty }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="入读时间"
        sortable="custom"
        :sort-orders="['descending', 'ascending', null]"
        prop="time_of_application"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <span style="margin-right: 10px">{{
            scope.row.time_of_application | empty
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="院校排名"
        sortable="custom"
        :sort-orders="['ascending', 'descending', null]"
        prop="rank_decimal"
        align="center"
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

    </el-table>
</template>

<script>
export default {
  props: ['loading', 'tableData', 'xuewei'],
  data () {
    return {
      curThead: [{ order: '', prop: 'time_of_application' }, { order: '', prop: 'rank_decimal' }]
    }
  },
  methods: {
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
    },
    // 点击跳转
    clickRow (row, column, event) {
      // this.$router.push('/meiben/details')
      const details = this.$router.resolve({ path: '/meiben/details', query: { id: row.id } })
      // console.log(row)
      // console.log(column)
      // console.log(event)
      window.open(details.href, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.table{
  font-size: 0.14rem;
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
  padding-left: 0.8rem;
}
.isJp{
  &::after{
    content: url(./image/isjp.png);
    position: absolute;
    left: 0.4rem;
  }
}
.tabname > img {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 6px;
  margin-right: 12px;
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
  background: #F8F8FE;
  box-sizing: border-box;
  .el-table__header .has-gutter .is-leaf {
    background:#F8F8FE;
    font-size: 0.15rem;
    font-weight: 500;
    color:#83809E;
    border: none;
    padding: 0.12rem 0;
  }
}
/deep/ .el-table__body-wrapper {
    box-sizing: border-box;
    font-size: 0.14rem;
    font-weight: 500;
    color: #1C1D21;
    td{
      padding: 0.12rem 0;
    }
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
