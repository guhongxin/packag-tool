<template>
  <div class="login">
    <div class="login-content">
      <el-form ref="form" :model="form" size="small" :rules="formRules">
        <h3 class="title" @dblclick="setHttp">用户登录</h3>
        <el-form-item prop="username">
          <el-input
            @keyup.enter.native="login"
            type="text"
            v-model.trim="form.username"
            auto-complete="off"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            @keyup.enter.native="login"
            type="password"
            v-model.trim="form.password"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <div class="remember-password">
          <el-checkbox v-model="isRememberPassword"
            @change="rememberPasswordChange"
            class="checkbox" style="color: #C0C4CC;font-size: 10px;">记住密码</el-checkbox>
        </div>
        <el-form-item style="width:100%;margin-top:42px;">
          <el-button
            type="primary"
            style="width:100%;"
            @click="loginClick"
            :loading="isLoading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <httpConfigDaliog ref="httpConfigDaliogDoc" @btnOk="httpConfigDaliogDocBtnOk"></httpConfigDaliog>
  </div>
</template>
<script>
import { login } from '@/api/pageApi'
import { setCookie } from '@/utils/auth.js'
import httpConfigDaliog from './components/httpConfigDaliog'
import md5 from 'blueimp-md5'
const fs = require('fs')
const path = require('path')
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      formRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      isLoading: false,
      isRememberPassword: false
    }
  },
  mounted () {
    this.$store.dispatch('packingAction', false)
    if (process.env.NODE_ENV === 'development') {
      this.configUrl = path.resolve('', 'config.json')
    } else {
      this.configUrl = process.resourcesPath + '/config.json'
    }
    this.config = JSON.parse(fs.readFileSync(this.configUrl))
    if (this.config.isRemember) {
      this.isRememberPassword = true
      this.form.username = this.config.username || ''
      this.form.password = this.config.password || ''
    } else {
      this.isRememberPassword = false
      this.form.username = ''
      this.form.password = ''
    }
  },
  methods: {
    loginClick () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.isLoading = true
          let obj = {
            username: this.form.username,
            password: md5(this.form.password)
          }
          this.loginApi(obj)
        } else {
          return false
        }
      })
    },
    loginApi (param) {
      login(param).then(res => {
        let data = res.content
        setCookie('token', data.token)
        this.isLoading = false
        this.$router.push({
          path: '/home'
        })
      }).catch(() => {
        this.isLoading = false
      })
    },
    rememberPasswordChange () {
      // 记住密码
      let obj = Object.assign({}, this.config)
      if (this.isRememberPassword) {
        obj.isRemember = true
        obj.username = this.form.username
        obj.password = this.form.password
      } else {
        obj.isRemember = false
      }
      fs.writeFileSync(this.configUrl, JSON.stringify(obj))
    },
    setHttp () {
      // 设置请求路径
      this.$refs.httpConfigDaliogDoc.showModule(this.config)
    },
    httpConfigDaliogDocBtnOk (param) {
      this.config.BASE_URL = param
      let obj = Object.assign({}, this.config)
      fs.writeFileSync(this.configUrl, JSON.stringify(obj))
      this.$refs.httpConfigDaliogDoc.handleClose()
    }
  },
  components: {
    httpConfigDaliog
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-content {
    border-radius: 10px;
    width: 320px;
    min-width: 230px;
    padding: 20px;
    background: #fff;
    border: 1px solid #eaeaea;
    text-align: left;
    box-sizing: border-box;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
  }
}
</style>