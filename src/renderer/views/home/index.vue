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
              placeholder="多个渠道以逗号分隔"
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
                  <el-checkbox :label="item.id">{{item.bundleName}}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
            <div class="cccl-footer">
              <div class="cccl-footer-kj" @click="selectAllChannel">
                <i class="el-icon-s-operation"></i>
                全选渠道
              </div>
              <div class="cccl-footer-kj">
                <!-- <i class="el-icon-time"></i>
                选择上次 -->
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
          <li class="build-menu-item" :class="{activeMenu: activeMune === 0}" @click="buildMenuItemClick(0)">出包中<span>({{packing.length}})</span></li>
          <li class="build-menu-item" :class="{activeMenu: activeMune === 1}" @click="buildMenuItemClick(1)">成功<span>({{packageSuccessful.length}})</span></li>
          <li class="build-menu-item" :class="{activeMenu: activeMune === 2}" @click="buildMenuItemClick(2)">失败<span>({{packageError.length}})</span></li>
        </ul>
        <div class="build-page-head-right" v-if="activeMune === 2">
          <span class="el-icon-upload" @click="againPackageClick" >
            <span class="tishi-span">{{selectpackageErrorNum}}</span>
          </span>
          <span class="el-icon-reading" @click="viewlog"></span>
        </div>
      </div>
      <div class="build-page-content">
        <div v-if="activeMune === 0" class="package-padding">
          <outBag class="outBage" 
            v-for="(item, index) in packing"
            :key="index"
            :fileInfor="item"
            @copyFileDir="copyFileDir(item)"></outBag>
        </div>
        <div v-else-if="activeMune === 1" class="package-cg">
          <packageSuccess class="packageSuccess"
            v-for="(item, index) in packageSuccessful"
            :key="index"
            :fileInfor="item"
            @openFileHandler="openFileHandler(item)"></packageSuccess>
        </div>
        <div v-else class="package-sb">
          <packagefailed
            v-for="(item, index) in packageError"
            :key="index"
            :fileInfor="item"
            @changeChange="val => packageErrorItemChange(val, item)"
            @viewlog="viewlog" class="packagefailed"></packagefailed>
        </div>
      </div>
    </div>
    <channelDetail ref="channelDetailDoc"></channelDetail>
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
// import signatureCertificateDailog from './components/signatureCertificateDailog'
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
const spawn = require('child_process').spawn
const fs = require('fs')
const path = require('path')
const log4js = require('log4js')
log4js.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: 'cheese.log',
      maxLogSize: 1024 * 100,
      backups: 1,
      category: 'normal'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'info'
    }
  }
})
const logger = log4js.getLogger('cheese')
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
      activeMune: 0,
      currentTabComponent: 'outBag',
      listQuery: {
        cur: 1,
        len: 100
      },
      channelData: [],
      channelIds: [],
      channelList: [],
      stepClickLoading: false,
      packing: [], // 正在打包
      packageSuccessful: [], // 打包成功
      packageError: [], // 打包异常
      selectpackageErrorNum: 0 // 重新上传的包
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
      // this.$refs.journalDoc.showModule()
      let _path = path.resolve('')
      this.$electron.shell.openExternal(_path)
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
      if (!this.channelIds || this.channelIds.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择渠道'
        })
        return false
      }
      this.stepClickLoading = true
      this.setbundleMake(this.channelIds).then(res => {
        this.step = this.step + 1
        // 获取正在打包的文件
        this.packing = this.channelIds.reduce((total, item) => {
          let _packChannelData = this.channelData.find(item1 => item1.id === item)
          if (_packChannelData) {
            let obj = {
              bundleId: item,
              name: this.gameBaseInfor.name,
              bundleName: _packChannelData.bundleName, // bundle名
              outputPath: this.form.outputPath, // 输出文件路径
              icon: _packChannelData.icon, // 渠道名
              per: 0, // 百分比
              journal: [] // 日志
            }
            total.push(obj)
          }
          return total
        }, [])
        let data = res.content.bundles
        try {
          fs.writeFileSync(_filePath, JSON.stringify(data))
          let javaCli = path.resolve('', './fusion-cli-0.0.1.jar')
          let javaCli1 = path.resolve('', './fusion-playground.zip')
          console.log('this.form.busAddress', this.form.busAddress)
          let _cmdStr = `java -jar ${javaCli} -c ${_filePath} -d ${javaCli1}  -i ${this.form.busAddress} -o ${this.form.outputPath}`
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
        this.copyChannelData = JSON.parse(JSON.stringify(data))
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
      let reg = /\{.*\}/g
      runExec(cmdStr)
      function runExec (cmdStr) {
        console.log('cmdStr', cmdStr)
        let kk = false
        if (kk) {
          workerProcess = exec(cmdStr)
        } else {
          workerProcess = spawn('cmd.exe', ['/s', '/c', cmdStr], {
            cwd: null,
            env: null
          })
        }
        self.pid = workerProcess.pid
        self.$store.dispatch('packingAction', true)
        // 打印正常的后台可执行程序输出
        workerProcess.stdout.on('data', function (data) {
          console.log('stdout', data.toString())
          let _data = data.toString()
          let progress = _data.match(reg) // 获取内容
          // logger.info(_data)
          if (progress) {
            let _progress = JSON.parse(progress[0])
            let _packChannelIndex = self.packing.findIndex(item => _progress.bundleId === item.bundleId)
            self.$set(self.packing[_packChannelIndex], 'per', _progress.per * 100)
          }
        })
        // 打印错误的后台可执行程序输出
        workerProcess.stderr.on('data', function (data) {
          console.log('stderr: ' + data)
          logger.info(data.toString())
          let errData = JSON.parse(JSON.stringify(self.packing))
          self.packageError = errData
          self.packing = []
        })
        // 退出之后的输出
        workerProcess.on('close', function (code) {
          console.log('out code：' + code)
          if (self.packing.length > 0) {
            let errData = JSON.parse(JSON.stringify(self.packing))
            self.packageError = errData
            self.packing = []
          }
          self.$store.dispatch('packingAction', false)
        })
      }
    },
    resetData () {
      // 复位数据
      this.step = 1
      this.channelName = ''
      this.form = {
        status: '',
        key: '',
        secret: '',
        busAddress: '', // 母包地址
        outputPath: '' // 输出地址
      }
      this.activeMune = 0
      this.currentTabComponent = 'outBag'
      this.copyChannelData = []
      this.channelData = []
      this.channelIds = []
      this.stepClickLoading = false
      this.packing = []
      this.packageSuccessful = []
      this.packageError = []
      this.selectpackageErrorNum = 0
    },
    searchChannelName (val) {
      // 渠道名称搜索
      let channelNames = val.split(',')
      this.channelData = []
      for (let i = 0; i < channelNames.length; i++) {
        let reg = new RegExp(channelNames[i], 'i')
        let _channelData = this.copyChannelData.filter(item => {
          return reg.test(item.bundleName)
        })
        this.channelData = [...this.channelData, ..._channelData]
      }
    },
    openFileHandler (param) {
      // 打开目录
      let outputPath = param.outputPath
      let _path = path.resolve('', outputPath)
      this.$electron.shell.openExternal(_path)
    },
    copyFileDir (param) {
      // 拷贝目录
      let outputPath = param.outputPath
      const el = document.createElement('input')
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      el.value = outputPath
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.$message({
        type: 'success',
        message: '复制成功！'
      })
    },
    packageErrorItemChange (val, item) {
      // 打包失败页面没一项前面的选中
      this.$set(item, 'checked', val)
    },
    againPackageClick () {
      // 重新打包
      if (this.selectpackageErrorNum === 0) {
        this.$message({
          type: 'warning',
          message: '请选择需要重新打包的项！'
        })
        return false
      }
      let _channelIds = []
      for (let i = 0; i < this.packageError.length; i++) {
        if (this.packageError[i].checked) {
          //  选中的
          _channelIds.push(this.packageError[i].bundleId)
          let _aginPack = JSON.parse(JSON.stringify(this.packageError[i]))
          delete _aginPack.checked
          this.packing.push(_aginPack)
          this.packageError.splice(i, 1)
          i = i - 1
        }
      }
      let _filePath = path.resolve('', '1.json')
      this.setbundleMake(_channelIds).then(res => {
        // 获取正在打包的文件
        let data = res.content.bundles
        try {
          fs.writeFileSync(_filePath, JSON.stringify(data))
          let javaCli = path.resolve('', './fusion-cli-0.0.1.jar')
          let javaCli1 = path.resolve('', './fusion-playground.zip')
          let _cmdStr = `java -jar ${javaCli} -c ${_filePath} -d ${javaCli1}  -i ${this.form.busAddress} -o ${this.form.outputPath}`
          this.start(_cmdStr)
        } catch (error) {
          console.log('error', error)
        }
        this.stepClickLoading = false
      }).catch(() => {
        this.stepClickLoading = false
      })
    }
  },
  components: {
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
            gameIcon: this.gameBaseInfor.icon
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
          obj.bundleName = _channel.bundleName
          obj.icon = _channel.icon
          obj.channelName = _channel.channelName
          this.channelList.push(obj)
        }
      },
      deep: true
    },
    packing: {
      handler (val) {
        for (let i = 0; i < val.length; i++) {
          // 查看有没有执行完成的包 进度为100% 代表完成
          if (val[i].per === 100) {
            this.packageSuccessful.push(val[i])
            val.splice(i, 1)
          }
        }
      },
      deep: true
    },
    packageError: {
      handler (val) {
        let _selectval = val.filter(item => item.checked)
        this.selectpackageErrorNum = _selectval.length
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
  margin: 20px auto 0px;
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
      overflow: hidden;
      overflow-y: auto;
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
  margin: 10px auto 0px;
  box-sizing: border-box;
}
.channel-config-footer {
  margin-top: 20px;
  text-align: center;
}
.step-status-box /deep/ .el-steps--simple {
  background-color: #ffffff;
}
</style>
