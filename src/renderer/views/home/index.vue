<template>
  <div class="home">
    <div class="step-status-box">
      <el-steps :active="step" simple>
        <el-step title="游戏配置" icon="el-icon-edit"></el-step>
        <el-step title="渠道配置" icon="el-icon-upload"></el-step>
        <el-step title="批量出包" icon="el-icon-picture"></el-step>
      </el-steps>
    </div>
    <div class="game-config" v-if="step === 1">
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        size="small"
        class="form"
      >
        <el-form-item label="产品状态">
          <el-input v-model="form.status" disabled></el-input>
        </el-form-item>
        <el-form-item label="KEY" class="w-form-item">
          <el-input v-model="form.key" disabled></el-input>
          <!-- <i class="input-ad-icon el-icon-circle-plus"></i> -->
        </el-form-item>
        <el-form-item label="Secret" class="w-form-item">
          <el-input v-model="form.secret" disabled></el-input>
          <!-- <i class="input-ad-icon el-icon-circle-plus"></i> -->
        </el-form-item>
        <el-form-item label="通知地址">
          <el-input v-model="form.returnAddress" disabled></el-input>
        </el-form-item>
        <el-form-item label="母包地址" class="w-form-item">
          <el-input v-model="form.busAddress"></el-input>
          <el-button
            type="primary"
            class="input-btn"
            @click="openFile('openFile', 'form', 'busAddress')"
            >选择母包</el-button
          >
        </el-form-item>
        <el-form-item label="输出路径" class="w-form-item">
          <el-input v-model="form.outputPath"></el-input>
          <el-button
            type="primary"
            class="input-btn"
            @click="openFile('openDirectory', 'form', 'outputPath')"
            >存放路径</el-button
          >
        </el-form-item>
        <!-- <el-form-item label="签名证书" class="w-form-item">
          <el-input v-model="form.signCertificate" disabled></el-input>
          <el-button
            type="primary"
            class="input-btn"
            @click="signatureCertificate"
            >签名证书</el-button
          >
        </el-form-item> -->
        <!-- <el-form-item label="输出文件名称">
          <el-input v-model="form.fileName"></el-input>
        </el-form-item> -->
      </el-form>
      <div class="game-config-footer">
        <el-button type="primary" size="small" @click="stepClick1">下一步</el-button>
      </div>
    </div>
    <template v-else-if="step === 2">
      <div class="channel-config">
        <div class="channel-status-row">
          <div class="channel-status-row-left">
            <div class="statu-ts">
              <i class="el-icon-success"></i>
              <span>可用：<span>{{channelData.length}}</span></span>
            </div>
            <div class="statu-ts">
              <i class="el-icon-remove"></i>
              <span>未配置渠道：<span class="span-a" @click="noConfigChannel">{{ channelData.length - channelIds.length }}</span></span>
            </div>
            <div class="statu-ts">
              <i class="el-icon-s-help"></i>
              <span>已选渠道：<span>{{channelIds.length}}</span></span>
            </div>
          </div>
          <div class="channel-status-row-right">
            <el-input
              placeholder="多个渠道以空格分隔"
              size="small"
              v-model="channelName"
              @change="searchChannelName">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </div>
        <div class="channel-config-content">
          <div class="cccl">
            <div class="channel-list">
              <el-checkbox-group v-model="channelIds">
                <div class="chanel-list-item" v-for="(item, index) in channelData"
                  :key="index">
                  <el-checkbox :label="item.id">{{item.channelName}}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
            <div class="cccl-footer">
              <div class="cccl-footer-kj" @click="selectAllChannel">
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
            <channelItem
              v-for="(item, index) in channelList"
              :key="index"
              :baseInfor="item"
              @findConfig="findConfig(item)"
              @jdicClick="jdicClick"
              @versionClick="versionClick"></channelItem>
          </div>
        </div>
      </div>
      <div class="channel-config-footer">
        <el-button type="primary" size="small" @click="backClick">上一步</el-button>
        <el-button type="primary" size="small" :loading="stepClickLoading" @click="stepClick2">下一步</el-button>
      </div>
    </template>
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
    <!-- <channelDetail ref="channelDetailDoc"></channelDetail> -->
    <!-- <signatureCertificateDailog ref="signatureCertificateDailogDoc"
      @btnOK="signatureCertificateDailogDocBtn"></signatureCertificateDailog> -->
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
import { mapState } from 'vuex'
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
import { bundlePaging, bundleMake } from '@/api/pageApi'
const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')
export default {
  name: 'home',
  data () {
    return {
      step: 1,
      channelName: '',
      form: {
        status: '',
        key: '',
        secret: '',
        busAddress: '', // 母包地址
        outputPath: '' // 输出地址
        // fileName: '', // 输出文件名
      },
      activeMune: 1,
      currentTabComponent: 'outBag',
      listQuery: {
        cur: 1,
        count: 100
      },
      channelData: [],
      channelIds: [],
      channelList: [],
      stepClickLoading: false
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
    openFile (param, obj, key) {
      // 打开文件 是否是文件夹
      this.showOpenDialog(param, result => {
        if (result) {
          this[obj][key] = result[0]
        }
      })
    },
    showOpenDialog (param, callback) {
      let _properties = param || 'openFile'
      this.$electron.remote.dialog.showOpenDialog({ properties: [_properties] }, function (res) {
        console.log('res', res)
        callback(res)
      })
    },
    // signatureCertificate () {
    //   // 签名证书
    //   this.$refs.signatureCertificateDailogDoc.showModule()
    // },
    // signatureCertificateDailogDocBtn (param) {
    //   // 签名证书确定
    //   this.form.signCertificate = param.selectsignatureName
    //   this.form.selectsignatureId = param.selectsignatureId
    // },
    findConfig (item) {
      // 查看配置详情
      this.$refs.channelDetailDoc.showModule(item)
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
    },
    stepClick1 () {
      // 第一步下一步
      if (!this.form.busAddress) {
        this.$message({
          type: 'warning',
          message: '请选择母包地址！'
        })
        return false
      }
      if (!this.form.outputPath) {
        this.$message({
          type: 'warning',
          message: '请选择文件输出路径！'
        })
        return false
      }
      this.step = this.step + 1
      this.getbundlePaging()
    },
    stepClick2 () {
      // 第二步下一步
      let _filePath = path.resolve('', '1.json')
      console.log('_filePath', _filePath)
      if (!this.channelIds || this.channelIds.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择渠道'
        })
        return false
      }
      this.stepClickLoading = true
      this.setbundleMake(this.channelIds).then(res => {
        // this.step = this.step + 1
        let data = res.content.bundles
        try {
          fs.writeFileSync(_filePath, JSON.stringify(data))
          console.log('this.from', this.form)
          let javaCli = path.resolve('', './fusion-cli-0.0.1.jar')
          console.log('javaCli', javaCli)
          let _cmdStr = `java -jar ${javaCli} -c ${_filePath} -i ${this.form.busAddress} -o ${this.form.outputPath}`
          console.log('_cmdStr', _cmdStr)
          this.start(_cmdStr)
        } catch (error) {
          console.log('error', error)
        }
        this.stepClickLoading = false
      }).catch(() => {
        this.stepClickLoading = false
      })
    },
    backClick () {
      this.step = this.step - 1
    },
    getbundlePaging () {
      // 渠道列表
      let obj = Object.assign({}, this.listQuery)
      obj.appId = this.gameBaseInfor.id
      bundlePaging(obj).then(res => {
        let data = res.content.page.records
        this.channelData = data
      }).catch(() => {
        return false
      })
    },
    selectAllChannel () {
      // 选择全部渠道
      let _channelIds = this.channelData.reduce((total, item) => {
        total.push(item.id)
        return total
      }, [])
      this.$set(this, 'channelIds', _channelIds)
    },
    setbundleMake (param) {
      // 打包
      let obj = {
        ids: param
      }
      return new Promise((resolve, reject) => {
        bundleMake(obj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    start (cmdStr) {
      // 子进程名称
      let workerProcess
      let self = this
      runExec(cmdStr)
      function runExec (cmdStr) {
        workerProcess = exec(cmdStr)
        self.pid = workerProcess.pid
        // 打印正常的后台可执行程序输出
        workerProcess.stdout.on('data', function (data) {
          console.log('stdout: ' + data)
        })
        // 打印错误的后台可执行程序输出
        workerProcess.stderr.on('data', function (data) {
          console.log('stderr: ' + data)
        })
        // 退出之后的输出
        workerProcess.on('close', function (code) {
          console.log('out code：' + code)
        })
      }
    },
    killtest () {
      exec(`TASKKILL /pid ${this.pid}`, function (err, data) {
        if (err) console.log(err)
        else console.log('kill pid: ' + this.pid + ' success!')
      })
    },
    resetData () {
      // 复位数据
      this.form = {
        status: '',
        key: '',
        secret: '',
        busAddress: '', // 母包地址
        outputPath: '', // 输出地址
        // fileName: '', // 输出文件名
        signCertificate: '' // 签名证书
      }
      this.activeMune = 1
      this.step = 1
      this.channelName = ''
    },
    searchChannelName (val) {
      // 渠道名称搜索
      let channelNames = val.spilt(',')
      console.log('---', channelNames)
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
  },
  computed: {
    ...mapState({
      gameBaseInfor: state => {
        return state.Game.game
      }
    })
  },
  watch: {
    gameBaseInfor (val) {
      this.resetData()
      this.form.status = val.status === 1 ? '在线' : '下线'
      this.form.key = val.key
      this.form.secret = val.secret
      this.form.returnAddress = val.returnAddress
    },
    channelIds: {
      handler (val) {
        this.channelList = []
        for (let i = 0; i < val.length; i++) {
          let obj = {
            name: this.gameBaseInfor.name,
            icon: this.gameBaseInfor.icon
          }
          let _channel = this.channelData.find(item => {
            return item.id === val[i]
          })
          obj.id = _channel.id
          obj.packageName = _channel.packageName
          obj.certName = _channel.certName
          obj.params = _channel.params
          obj.channelIcon = _channel.icon
          obj.horPic = _channel.horPic
          obj.verPic = _channel.verPic
          this.channelList.push(obj)
        }
        console.log('this.channelList', this.channelList)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 700px;
  min-width: 600px;
  max-width: 800px;
  margin: 0px auto;
}
.game-config {
  margin: 20px auto 0px;
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
  .game-config-footer {
    text-align: center;
    margin-top: 30px;
  }
}
.channel-config {
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
        .chanel-list-item {
          padding: 10px 10px;
        }
        .chanel-list-item:hover {
          background-color: #f5f7fa;
        }
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
.step-status-box {
  margin: 20px auto 0px;
  box-sizing: border-box;
}
.channel-config-footer {
  margin-top: 30px;
  text-align: center;
}
.step-status-box /deep/ .el-steps--simple {
  background-color: #ffffff;
}
</style>
