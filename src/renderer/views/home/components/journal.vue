<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="500px"
    :before-close="handleClose"
    class="customDialog">
    <div class="content">
      <ul class="daily-record">
        <li class="daily-record-item" v-for="(item, index) in recordList" :key="index">[2020-09-22 11:45 周日] 查看罚款老师的卡拉</li>
        <li class="daily-record-item">[2020-09-22 11:45 周日] 查看罚款老师的卡拉</li>
    
      </ul>
    </div>
    <div class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">关闭</el-button>
      <el-button size="small" type="primary" @click="dialogVisible = false">导出</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      recordList: []
    }
  },
  mounted () {
    this.recordList = new Array(100)
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
    background-color: rgb(64, 158, 255);
  }
  /deep/ .el-dialog__title {
    color: #ffffff;
  }
  /deep/ .el-dialog__close {
    color: #ffffff;
  }
  /deep/ .el-dialog__body {
    overflow: hidden;
    padding: 0px;
  }
  .content {
    height: 300px;
    max-height: 300px;
    overflow: hidden;
    overflow-y: auto;
    .daily-record {
      margin: 0px;
      padding: 0px;
      li {
        padding: 0px 10px;
        box-sizing: border-box;
        list-style-type: none;
        height: 25px;
        line-height: 25px;
        width: 100%;
      }
      li:hover {
        background-color: #f5f7fa;
      }
      & > li:nth-child(even) {
        background-color: #f5f7fa;
      }
    }
  }
  .dialog-footer {
    padding: 10px 10px;
    text-align: center;
    background-color: #F6F7FA;
  }
}
</style>
