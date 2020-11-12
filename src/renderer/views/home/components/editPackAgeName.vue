<template>
  <el-dialog
    title="修改包名"
    :visible.sync="dialogVisible"
    width="500px"
    :before-close="handleClose"
    class="customDialog">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
      label-width="100px" class="demo-ruleForm"
      size="small">
      <el-form-item label="包名" prop="packageName">
        <el-input v-model="ruleForm.packageName"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button size="small" @click="cancelBtn">取 消</el-button>
      <el-button size="small" type="primary" @click="btnOk" :loading="btnLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>

export default {
  data () {
    return {
      dialogVisible: false,
      ruleForm: {
        packageName: ''
      },
      rules: {
        packageName: [{ required: true, message: '请输入包名', trigger: 'blur' }]
      },
      btnLoading: false
    }
  },
  methods: {
    handleClose () {
      this.baseInfor = {}
      this.btnLoading = true
      this.dialogVisible = false
    },
    cancelBtn () {
      // 取消按钮
      this.handleClose()
    },
    showModule (param) {
      this.baseInfor = param
      this.ruleForm.packageName = this.baseInfor.packageName
      this.btnLoading = false
      this.dialogVisible = true
    },
    btnOk () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let obj = {
            id: this.baseInfor.id,
            packageName: this.ruleForm.packageName
          }
          this.btnLoading = true
          this.$emit('btnOk', obj)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
</style>
