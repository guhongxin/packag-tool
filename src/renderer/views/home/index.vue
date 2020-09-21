<template>
  <div class="home">
    <div class="game-config">
      <el-form ref="form" :model="form" label-width="120px" size="small" class="form">
        <el-form-item label="产品状态">
          <el-input v-model="form.status"></el-input>
        </el-form-item>
        <el-form-item label="产品参数1" class="w-form-item">
          <el-input v-model="form.status"></el-input>
          <i class="input-ad-icon el-icon-circle-plus"></i>
        </el-form-item>
        <el-form-item label="通知地址">
          <el-input v-model="form.status"></el-input>
        </el-form-item>
        <el-form-item label="母包地址" class="w-form-item">
          <el-input v-model="form.status"></el-input>
          <el-button type="primary" class="input-btn" @click="openFile('openFile')">选择母包</el-button>
        </el-form-item>
        <el-form-item label="输出路径" class="w-form-item">
          <el-input v-model="form.status"></el-input>
          <el-button type="primary" class="input-btn" @click="openFile('openDirectory')">存放路径</el-button>
        </el-form-item>
        <el-form-item label="签名证书" class="w-form-item">
          <el-input v-model="form.status"></el-input>
          <el-button type="primary" class="input-btn" @click="openFile('openFile')">签名证书</el-button>
        </el-form-item>
        <el-form-item label="输出文件名称">
          <el-input v-model="form.status"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      form: {}
    }
  },
  methods: {
    openFile (param) {
      // 打开文件 是否是文件夹
      let _properties = param || 'openFile'
      let path = this.$electron.remote.dialog.showOpenDialog({ properties: [_properties] })
  
    },
    openCatalog () {
      // 打开目录
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 0px;
}
.game-config {
  width: 50%;
  margin: 40px auto 0px;
  box-sizing: border-box;
  padding: 20px;
  background-color: #ffffff;
  .form {
    width: 80%;
    .w-form-item {
      position: relative;
      .input-btn {
        position: absolute;
        right: -90px;
        top: 50%;
        transform: translateY(-50%);
      }
      .input-ad-icon {
        font-size: 16px;
        position: absolute;
        right: -25px;
        top: 50%;
        transform: translateY(-50%);
        color: #5cb6ff;
        cursor: pointer;
      }
    }
  }
}
</style>
