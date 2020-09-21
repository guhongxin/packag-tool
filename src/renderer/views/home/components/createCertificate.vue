<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="600px"
    :before-close="handleClose"
    append-to-body
    class="customDialog">
    <div class="content">
      <el-form 
        :model="form" :rules="rules"
        size="small"
        ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item>
          <p class="tishi">证书类文件仅在客户端使用，证书路径改变时此配置会被自动删除</p>
        </el-form-item>
        <el-form-item label="签名证书" prop="name" class="w-form-item">
          <el-input v-model="form.name"></el-input>
           <el-button
            type="primary"
            class="input-btn"
            >选择证书</el-button>
        </el-form-item>
        <el-form-item label="KeyStore" prop="name" class="w-form-item">
          <el-input v-model="form.name"></el-input>
          <p class="p-tishi">证书密钥</p>
        </el-form-item>
        <el-form-item label="Storepass" prop="name" class="w-form-item">
          <el-input v-model="form.name"></el-input>
          <p class="p-tishi" style="right: -80px;">证书链密钥</p>
        </el-form-item>
        <el-form-item label="Alias" prop="name" class="w-form-item">
          <el-input v-model="form.name"></el-input>
          <p class="p-tishi">证书别名</p>
        </el-form-item>
        <el-form-item label="作为默认" prop="name" class="w-form-item">
          <el-checkbox v-model="checked">仅允许1个默认，多个默认或者没有默认都将使用第一条配置</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      title: '',
      dialogVisible: false,
      form: {},
      rules: {}
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    showModule (param) {
      // 显示
      this.title = param.title || '新增签名证书'
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
.tishi {
  color: #F56C6C;
  font-size: 12px;
  margin: 0px;
}
.tishi::before {
  content: "*";
}
.demo-ruleForm {
  width: 460px;
}
.w-form-item {
  position: relative;
  .input-btn {
    position: absolute;
    right: -90px;
    top: 50%;
    transform: translateY(-50%);
  }
  .p-tishi {
    margin: 0px;
    position: absolute;
    right: -68px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
