<template>
   <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="500px"
    :before-close="handleClose"
    class="customDialog">
    <div class="content">
      <el-table
        :data="tableData"
        stripe
        class="custom-table"
        v-loading="loading"
        element-loading-text="拼命加载中"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="启用">
        </el-table-column>
        <el-table-column
          prop="date"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="name"
          label="组件名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="版本">
        </el-table-column>
        <el-table-column
          prop="name"
          label="更新时间">
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      title: '已加入的第三方SDK',
      dialogVisible: false,
      tableData: [],
      loading: false
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    showModule () {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.customDialog {
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #DCDFE6;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>