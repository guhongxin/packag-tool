<template>
  <div class="home">
    <div class="game-config" v-if="step === 0">
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        size="small"
        class="form"
      >
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
          <el-button
            type="primary"
            class="input-btn"
            @click="openFile('openFile')"
            >选择母包</el-button
          >
        </el-form-item>
        <el-form-item label="输出路径" class="w-form-item">
          <el-input v-model="form.status"></el-input>
          <el-button
            type="primary"
            class="input-btn"
            @click="openFile('openDirectory')"
            >存放路径</el-button
          >
        </el-form-item>
        <el-form-item label="签名证书" class="w-form-item">
          <el-input v-model="form.status"></el-input>
          <el-button
            type="primary"
            class="input-btn"
            @click="signatureCertificate"
            >签名证书</el-button
          >
        </el-form-item>
        <el-form-item label="输出文件名称">
          <el-input v-model="form.status"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="channel-config" v-else-if="step === 1">
      <div class="channel-status-row">
        <div class="channel-status-row-left">
          <div class="statu-ts">
            <i class="el-icon-success"></i>
            <span>可用：<span>1</span></span>
          </div>
          <div class="statu-ts">
            <i class="el-icon-remove"></i>
            <span>未配置渠道：<span>1</span></span>
          </div>
          <div class="statu-ts">
            <i class="el-icon-s-help"></i>
            <span>已选渠道：<span>1</span></span>
          </div>
        </div>
        <div class="channel-status-row-right">
          <el-input
            placeholder="多个渠道以空格分隔"
            size="small"
            v-model="input4">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
      <div class="channel-config-content">
        <div class="cccl">
          <div class="channel-list"></div>
          <div class="cccl-footer">
            <div class="cccl-footer-kj">
              <i class="el-icon-s-operation"></i>
              全选渠道
            </div>
            <div class="cccl-footer-kj">
              <i class="el-icon-time"></i>
              选择上次
            </div>
          </div>
        </div>
        <div class="cccr">
          <channelItem @findConfig="findConfig"></channelItem>
        </div>
      </div>
    </div>
    <channelDetail ref="channelDetailDoc"></channelDetail>
    <signatureCertificateDailog ref="signatureCertificateDailogDoc"></signatureCertificateDailog>
  </div>
</template>
<script>
import signatureCertificateDailog from './components/signatureCertificateDailog'
import channelItem from './components/channelItem'
import channelDetail from './components/channelDetail'
export default {
  name: 'home',
  data () {
    return {
      step: 1,
      input4: '',
      input: '',
      form: {}
    }
  },
  methods: {
    openFile (param) {
      // 打开文件 是否是文件夹
      let _properties = param || 'openFile'
      let path = this.$electron.remote.dialog.showOpenDialog({ properties: [_properties] })
      console.log(path)
    },
    signatureCertificate () {
      // 签名证书
      this.$refs.signatureCertificateDailogDoc.showModule()
    },
    findConfig () {
      // 查看配置详情
      this.$refs.channelDetailDoc.showModule()
    }
  },
  components: {
    signatureCertificateDailog,
    channelItem,
    channelDetail
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 0px;
}
.game-config {
  width: 70%;
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
.channel-config {
  width: 70%;
  margin: 40px auto 0px;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  overflow: hidden;
  .channel-status-row {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #DCDFE6;
    .channel-status-row-left {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 30px;
      .statu-ts {
        font-size: 14px;
        .el-icon-success {
          color: #1D9606;
        }
        .el-icon-remove {
          color: #F56C6C;
        }
        .el-icon-s-help {
          color: #1D9606;
        }
      }
    }
    .channel-status-row-right {
      width: 30%;
    }
  }
  .channel-config-content {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    .cccl {
      flex: 2;
      border-right: 1px solid  #DCDFE6;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      .channel-list {
        flex: 1;
      }
      .cccl-footer {
        width: 100%;
        padding: 0px 5px;
        box-sizing: border-box;
        height: 40px;
        display: flex;
        justify-content:space-between;
        align-items: center;
        border-top: 1px solid #DCDFE6;
        background-color: #f5f7fa;
        .cccl-footer-kj {
          font-size: 14px;
          cursor: pointer;
        }
        .cccl-footer-kj:hover {
          color: rgb(64, 158, 255);
        }
      }
    }
    .cccr {
      flex: 4;
      height: 400px;
    }
  }
}
</style>
