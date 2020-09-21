<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="500px"
    :before-close="handleClose"
    class="customDialog">
    <div slot="title">
      配置签名证书<i class="ad-icon el-icon-circle-plus" @click="addCertificate"></i>
    </div>
    <div class="certificate-list">
      <ul>
        <li class="certificate-list-item">
          <span>戒灵证书</span>
          <i class="w-edit-icon el-icon-edit"></i>
        </li>
         <li class="certificate-list-item">
          <span>戒灵证书2</span>
          <i class="w-edit-icon el-icon-edit"></i>
        </li>
      </ul>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>
    <createCertificate ref="createCertificateDoc"></createCertificate>
  </el-dialog>
</template>
<script>
import createCertificate from './createCertificate'
export default {
  components: {
    createCertificate
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    showModule () {
      this.dialogVisible = true
    },
    addCertificate () {
      // 添加证书
      let obj = {
        title: '新增签名证书'
      }
      this.$refs.createCertificateDoc.showModule(obj)
    }
  }
}
</script>
<style lang="scss" scoped>
.ad-icon {
  color: #5cb6ff;
  cursor: pointer;
  margin-left: 10px;
}
.customDialog {
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #DCDFE6;
  }
  .dialog-footer {
    text-align: center;
  }
}
.certificate-list {
  margin-left: -20px;
  margin-right: -20px;
  ul {
    padding: 0px;
    margin: 0px;
    overflow: hidden;
    li {
      padding: 0px 10px;
      box-sizing: border-box;
      list-style-type: none;
      height: 40px;
      line-height: 40px;
      border-top: 1px solid #DCDFE6;
      cursor: pointer;
    }
    & > li:last-child {
      border-bottom: 1px solid #DCDFE6;
    }
    li:hover {
      background-color: #f5f7fa;
    }
    li:nth-child(even) {
      background-color: #f5f7fa;
    }
    .w-edit-icon {
      font-size: 16px;
      color:  #5cb6ff;
    }
    .certificate-list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
