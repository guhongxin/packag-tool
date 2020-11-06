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
    <div class="certificate-list" v-loading="tableLoading">
      <ul>
        <li class="certificate-list-item" v-for="(item, index) in tableData" :key="index">
          <div>
            <i class="el-icon-success" style="color:#67C23A;" v-if="selectsignatureId===item.id"></i>
            <span>{{item.name}}</span>
          </div>
          <!-- <i class="w-edit-icon el-icon-edit"></i> -->
        </li>
      </ul>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancelBtn">取 消</el-button>
      <el-button size="small" type="primary" @click="btnOk">确 定</el-button>
    </div>
    <createCertificate ref="createCertificateDoc"></createCertificate>
  </el-dialog>
</template>
<script>
import createCertificate from './createCertificate'
import { certPaging } from '@/api/pageApi'
export default {
  components: {
    createCertificate
  },
  data () {
    return {
      dialogVisible: false,
      listQuery: {
        cur: 1,
        count: 100
      },
      tableData: [],
      tableLoading: false,
      selectsignatureId: 0 // 选中当前的证书id
    }
  },
  methods: {
    handleClose () {
      this.selectsignatureId = 0
      this.selectsignatureName = ''
      this.dialogVisible = false
    },
    cancelBtn () {
      // 取消按钮
      this.handleClose()
    },
    showModule () {
      this.getList()
      this.dialogVisible = true
    },
    addCertificate () {
      // 添加证书
      let obj = {
        title: '新增签名证书'
      }
      this.$refs.createCertificateDoc.showModule(obj)
    },
    getList () {
      // 获取证书列表
      this.tableLoading = true
      certPaging(this.listQuery).then(res => {
        let data = res.content.page.records
        this.tableData = data
        // 默认选中第一个证书
        this.selectsignatureId = data[0] ? data[0].id : 0
        this.selectsignatureName = data[0] ? data[0].name : 0
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
        return false
      })
    },
    btnOk () {
      // 确定按钮
      if (!this.selectsignatureId) {
        this.$message({
          type: 'warning',
          message: '请选择证书！'
        })
        return false
      }
      this.$emit('btnOK', {
        selectsignatureName: this.selectsignatureName,
        selectsignatureId: this.selectsignatureId
      })
      this.handleClose()
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
