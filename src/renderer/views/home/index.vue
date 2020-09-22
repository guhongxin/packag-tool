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
            <span>未配置渠道：<span class="span-a" @click="noConfigChannel">1</span></span>
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
          <channelItem @findConfig="findConfig"
            @jdicClick="jdicClick"
            @versionClick="versionClick"></channelItem>
        </div>
      </div>
    </div>
    <div class="build-page" v-else>
      <div class="build-page-head">
        <ul class="build-menu">
          <div class="active-bar"></div>
          <li class="build-menu-item" :class="{activeMenu: activeMune === 0}" @click="buildMenuItemClick(0)">出包中<span>(0)</span></li>
          <li class="build-menu-item" :class="{activeMenu: activeMune === 1}" @click="buildMenuItemClick(1)">成功<span>(1)</span></li>
          <li class="build-menu-item" :class="{activeMenu: activeMune === 2}" @click="buildMenuItemClick(2)">失败<span>(2)</span></li>
        </ul>
        <div class="build-page-head-right">
          <span class="el-icon-upload" @click="viewlog">
            <span class="tishi-span">2</span>
          </span>
          <span class="el-icon-reading" @click="viewlog"></span>
        </div>
      </div>
      <div class="build-page-content">
        <div v-if="activeMune === 0" class="package-padding">
          <outBag class="outBage"></outBag>
          <outBag class="outBage"></outBag>
        </div>
        <div v-else-if="activeMune === 1" class="package-cg">
          <packageSuccess class="packageSuccess"></packageSuccess>
          <packageSuccess class="packageSuccess"></packageSuccess>
        </div>
        <div v-else class="package-sb">
          <packagefailed @viewlog="viewlog" class="packagefailed"></packagefailed>
          <packagefailed @viewlog="viewlog" class="packagefailed"></packagefailed>
        </div>
      </div>
    </div>
    <channelDetail ref="channelDetailDoc"></channelDetail>
    <signatureCertificateDailog ref="signatureCertificateDailogDoc"></signatureCertificateDailog>
    <!-- 日志 -->
    <journal ref="journalDoc"></journal>
    <!-- 渠道列表 -->
    <channelTable ref="channelTableDoc"></channelTable>
    <!-- 集成工具 -->
    <JDIC ref="JDICDoc"></JDIC>
    <!-- 版本列表 -->
    <channelVersion ref="channelVersionDoc"></channelVersion>
  </div>
</template>
<script>
import signatureCertificateDailog from './components/signatureCertificateDailog'
import channelItem from './components/channelItem'
import channelDetail from './components/channelDetail'
import outBag from './components/outBag'
import packageSuccess from './components/packageSuccess'
import packagefailed from './components/packagefailed'
import journal from './components/journal'
import channelTable from './components/channelTable'
import JDIC from './components/JDIC'
import channelVersion from './components/channelVersion'
export default {
  name: 'home',
  data () {
    return {
      step: 1,
      input4: '',
      input: '',
      form: {},
      activeMune: 1,
      currentTabComponent: 'outBag'
    }
  },
  mounted () {
    let buildMenu = document.querySelector('.build-menu')
    if (buildMenu) {
      let wt = buildMenu.offsetWidth
      let activeBar = document.querySelector('.active-bar')
      activeBar.style.width = wt / 3 + 'px'
    }
  },
  methods: {
    openFile (param) {
      // 打开文件 是否是文件夹
      let _properties = param || 'openFile'
      this.$electron.remote.dialog.showOpenDialog({ properties: [_properties] })
    },
    signatureCertificate () {
      // 签名证书
      this.$refs.signatureCertificateDailogDoc.showModule()
    },
    findConfig () {
      // 查看配置详情
      this.$refs.channelDetailDoc.showModule()
    },
    buildMenuItemClick (param) {
      this.activeMune = param
      let activeBar = document.querySelector('.active-bar')
      let width = activeBar.offsetWidth
      activeBar.style.transform = 'translateX(' + width * param + 'px)'
    },
    viewlog () {
      // 查看日志
      this.$refs.journalDoc.showModule()
    },
    noConfigChannel () {
      // 未配置渠道
      this.$refs.channelTableDoc.showModule()
    },
    jdicClick () {
      // 第三方集成
      this.$refs.JDICDoc.showModule()
    },
    versionClick () {
      // 查看版本
      this.$refs.channelVersionDoc.showModule()
    }
  },
  components: {
    signatureCertificateDailog,
    channelItem,
    channelDetail,
    outBag,
    packageSuccess,
    packagefailed,
    journal,
    channelTable,
    JDIC,
    channelVersion
  }
}
</script>
<style lang="scss" scoped>
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
.build-page {
  width: 70%;
  margin: 40px auto 0px;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  overflow: hidden;
  .build-page-head {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    box-sizing: border-box;
    border-bottom: 1px solid  #DCDFE6;
    ul {
      margin: 0px;
      padding: 0px;
      overflow: hidden;
      position: relative;
      li {
        list-style-type: none;
        float: left;
        height: 40px;
        width: 80px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
      }
      .active-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background-color: #409eff;
        z-index: 1;
        transition: transform .3s cubic-bezier(.645,.045,.355,1);
      }
      .activeMenu {
        color: #409eff;
      }
    }
    .build-page-head-right {
      span {
        font-size: 20px;
      }
      .el-icon-upload {
        cursor: pointer;
        margin-right: 10px;
        position: relative;
      }
      .el-icon-reading {
        cursor: pointer;
      }
      .tishi-span {
        position: absolute;
        display: block;
        font-size: 10px;
        width: 10px;
        height: 10px;
        text-align: center;
        line-height: 10px;
        border-radius: 50%;
        box-sizing: border-box;
        background-color: red;
        color: #ffffff;
        bottom: 0px;
        right: -4px;
      }
    }
  }
  .build-page-content {
    padding: 20px 10px;
    box-sizing: border-box;
    .package-padding {
      .outBage {
        margin-bottom: 20px;
      }
    }
    .package-cg {
      .packageSuccess {
        margin-bottom: 20px;
      }
    }
    .package-sb {
      .packagefailed {
        margin-bottom: 20px;
      }
    }
  }
}
.span-a {
  color: rgb(64, 158, 255);
  text-decoration: underline;
  cursor: pointer;
}
</style>
