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
          prop="date">
        </el-table-column>
        <el-table-column
          prop="date"
          label="更新时间">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="SDK版本">
        </el-table-column>
        <el-table-column
          prop=""
          label="备注">
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      title: '渠道名称-可选用sdk版本',
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
  .footer {
    margin-top: 20px;
    text-align: center;
  }
}
</style>