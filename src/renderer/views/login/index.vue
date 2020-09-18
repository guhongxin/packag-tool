<template>
  <div class="login">
    <div class="login-content">
      <el-form ref="form" :model="form" size="small">
        <h3 class="title">用户登录</h3>
        <el-form-item prop="userName">
          <el-input
            @keyup.enter.native="login"
            type="text"
            v-model="form.userName"
            auto-complete="off"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            @keyup.enter.native="login"
            type="password"
            v-model="form.password"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <div class="remember-password">
          <el-checkbox v-model="checked" class="checkbox" style="color: #C0C4CC;font-size: 10px;">记住密码</el-checkbox>
        </div>
        <el-form-item style="width:100%;margin-top:42px;">
          <el-button
            type="primary"
            style="width:100%;"
            @click="login"
            :loading="isLoading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        name: ''
      },
      isLoading: false,
      checked: false
    }
  },
  methods: {
    login () {}
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