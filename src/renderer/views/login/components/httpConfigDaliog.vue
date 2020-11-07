<template>
  <el-dialog
    title="配置请求"
    :visible.sync="dialogVisible"
    width="400px"
    :before-close="handleClose"
    class="customDialog">
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
        <el-form-item label="请求地址" prop="url">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancelBtn">取 消</el-button>
      <el-button size="small" type="primary" @click="btnOk">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      ruleForm: {
        url: ''
      },
      rules: {
        url: [{ required: true, message: '请输入请求路径', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    showModule (param) {
      this.ruleForm.url = param.BASE_URL
      this.dialogVisible = true
    },
    cancelBtn () {
      this.handleClose()
    },
    btnOk () {
      this.$emit('btnOk', this.ruleForm.url)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
