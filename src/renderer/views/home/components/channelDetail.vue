<template>
   <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="650px"
    :before-close="handleClose"
    append-to-body
    class="customDialog">
    <div class="content">
      <div class="left">
        <ul class="menu">
          <li class="menu-item" v-for="(item, index) in menuOptions"
            :class="{'active-menu-item': currentMenu === index}"
            :key="index"
            @click="menuItem(index)">{{item.text}}</li>
        </ul>
      </div>
      <div class="right">
        <div class="content">
          <template v-if="currentMenu === 0">
            <el-form 
              :model="form" :rules="rules"
              size="small"
              ref="ruleForm" label-width="130px" class="demo-ruleForm">
              <el-form-item>
                <p class="tishi">此处仅列出客户端参数、自定义参数, 服务器参数不在此处</p>
              </el-form-item>
              
              <el-form-item v-for="(item, index) in Object.keys(form)" :key="index" :label="item" prop="name" class="w-form-item">
                <el-input v-model="form[item]" disabled></el-input>
              </el-form-item>
            </el-form>
          </template>
          <template v-else-if="currentMenu === 1">
            <div class="flash-screen">
              <el-tabs v-model="flashScreen" type="border-card">
                <el-tab-pane label="竖屏" name="verPic">
                  <div class="flash-screen-content">
                    <div class="flash-screen-content-left">
                      <div class="preview-screen">
                        <img :src="baseInfor.verPic"  class="vorImg"/>
                      </div>
                      <p class="wz-js">现有闪屏</p>
                    </div>
                    <div class="flash-screen-content-right">
                      <div class="preview-screen">
                        <img :src="verPic"  class="vorImg"/>
                        <div v-if="verPic" class="delete-box">
                          <i class="el-icon-delete" @click="deleImage('verPic')"></i>
                        </div>
                      </div>
                      <el-button type="primary" size="small" class="add-btn" @click="uploadBtn">添加闪屏</el-button>
                      <p class="wz-js">格式说明</p>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="横屏" name="horPic">
                  <div class="flash-screen-content1">
                    <div class="flash-screen-content-left">
                      <div class="preview-screen">
                        <img :src="baseInfor.horPic"  class="vorImg"/>
                      </div>
                      <p class="wz-js">现有闪屏</p>
                    </div>
                    <div class="flash-screen-content-right">
                      <div class="preview-screen">
                        <img :src="horPic"  class="vorImg"/>
                        <div v-if="horPic" class="delete-box">
                          <i class="el-icon-delete" @click="deleImage('horPic')"></i>
                        </div>
                      </div>
                      <el-button type="primary" size="small" class="add-btn" @click="uploadBtn">添加闪屏</el-button>
                      <p class="wz-js">格式说明</p>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            
              <div class="flash-screen-foolter">
                <el-button type="primary" size="small"
                  :loading="saveFlashScreenLoading"
                  @click="saveFlashScreen">保存</el-button>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="icon-change">
              <div class="icon-screen-content">
                <div class="icon-screen-content-left">
                  <div class="icon-screen" :style="{'background-image': baseInfor.icon ? 'url('+baseInfor.icon+')' : ''}">
                    <!-- <img :src="baseInfor.icon" style="width: 100%"/> -->
                  </div>
                  <p class="wz-js">现有icon</p>
                </div>
                <div class="icon-screen-content-right">
                  <imgView :url="iconUrl" v-if="iconUrl" @deleteClick="deleteImage('iconUrl')"></imgView>
                  <upload v-else @successUpload="(val) => successUpload(val, 'iconUrl')"></upload>
                </div>
              </div>
              <div class="icon-screen-foolter">
                <el-button type="primary" size="small" @click="saveIcon"
                  :loading="saveIconLoading">保存</el-button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { bundleUpdate } from '@/api/pageApi'
import imgView from './imgView'
import upload from './upload'
import axios from 'axios'
export default {
  components: {
    upload,
    imgView
  },
  data () {
    return {
      title: '渠道名称',
      dialogVisible: false,
      form: {},
      rules: {},
      currentMenu: 0,
      menuOptions: [{
        text: '客户端参数'
      }, {
        text: '闪屏'
      }, {
        text: 'icon'
      }],
      baseInfor: {},
      VUE_APP_UPLOADURL: '',
      VUE_APP_IMGURL: '',
      iconUrl: '',
      saveIconLoading: false,
      flashScreen: 'verPic',
      verPic: '',
      horPic: '',
      saveFlashScreenLoading: false
    }
  },
  created () {
    this.VUE_APP_UPLOADURL = process.env.VUE_APP_UPLOADURL
    this.VUE_APP_IMGURL = process.env.VUE_APP_IMGURL
  },
  methods: {
    handleClose () {
      this.form = {}
      this.currentMenu = 0
      this.iconUrl = ''
      this.saveIconLoading = false
      this.flashScreen = 'verPic'
      this.verPic = ''
      this.horPic = ''
      this.dialogVisible = false
    },
    showModule (param) {
      this.dialogVisible = true
      this.baseInfor = param
      console.log('param', param)
      let clientParam = param.params
      Object.keys(clientParam).forEach(item => {
        if (item !== 'icon') {
          this.$set(this.form, item, clientParam[item])
        }
      })
    },
    menuItem (param) {
      // 切换菜单
      this.currentMenu = param
    },
    handleIconSuccess (res, file) {
      // 更新成功
      let data = res.data
      this.iconUrl = this.VUE_APP_IMGURL + data.resourceURL
    },
    beforeIconUpload (file) {
      // 更新之前
      let type = file.type
      // if (!/\.ico/.test(type)) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请上传格式为ico图片'
      //   })
      //   return false
      // }
      console.log('更新之前', type)
    },
    saveIcon () {
      // 保存icon
      if (!this.iconUrl) {
        this.$message({
          type: 'warning',
          message: '请上传icon！'
        })
        return false
      }
      let obj = {
        id: this.baseInfor.id,
        icon: this.iconUrl
      }
      this.setbundleUpdate(obj, '更新icon成功', 'saveIconLoading').then(() => {
        this.baseInfor.icon = this.iconUrl
      }).catch(() => {
        return false
      })
    },
    setbundleUpdate (param, msg, loading) {
      this[loading] = true
      return new Promise((resolve, reject) => {
        bundleUpdate(param).then(res => {
          this[loading] = false
          this.$message({
            type: 'success',
            message: msg
          })
          resolve(res)
        }).catch(err => {
          this[loading] = false
          reject(err)
        })
      })
    },
    uploadBtn () {
      // 上传按钮
      let input = document.createElement('input')
      input.type = 'file'
      input.setAttribute('readonly', '')
      input.style.position = 'absolute'
      input.style.left = '-9999px'
      document.body.appendChild(input)
      input.click()
      let self = this
      input.onchange = function (e) {
        let file = e.target.files[0]
        let formdata = new FormData()
        document.body.removeChild(input)
        formdata.append('file', file)
        axios({
          url: `${self.VUE_APP_UPLOADURL}/upload/single`,
          method: 'POST',
          data: formdata
        }).then(res => {
          let data = res.data.data
          let _resourceURL = self.VUE_APP_IMGURL + data.resourceURL
          if (self.flashScreen === 'verPic') {
            // 竖屏
            self.verPic = _resourceURL
          } else {
            // 横屏
            self.horPic = _resourceURL
          }
          self.$message({
            type: 'success',
            message: '上传成功'
          })
        }).catch(() => {
          self.$message({
            type: 'error',
            message: '上传失败'
          })
        })
      }
      input.value = ''
    },
    saveFlashScreen () {
      // 保存闪屏
      if (this.flashScreen === 'verPic') {
        // 竖屏
        if (!this.verPic) {
          this.$message({
            type: 'warning',
            message: '请上传竖屏闪屏！'
          })
          return false
        }
        let obj = {
          id: this.baseInfor.id,
          metas: {
            verPic: this.verPic
          }
        }
        this.setbundleUpdate(obj, '更新竖屏成功', 'saveFlashScreenLoading').then(res => {
          this.baseInfor.verPic = this.verPic
        }).catch(() => {
          return false
        })
      } else {
        // 横屏
        if (!this.horPic) {
          this.$message({
            type: 'warning',
            message: '请上传横屏闪屏！'
          })
          return false
        }
        let obj = {
          id: this.baseInfor.id,
          metas: {
            horPic: this.horPic
          }
        }
        this.setbundleUpdate(obj, '更新横屏成功', 'saveFlashScreenLoading').then(res => {
          this.baseInfor.horPic = this.horPic
        }).catch(() => {
          return false
        })
      }
    },
    deleImage (key) {
      this[key] = ''
    },
    successUpload (url, key) {
      // 上传图片
      this[key] = url
    },
    deleteImage (key) {
      // 删除文件
      this[key] = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.customDialog {
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #DCDFE6;
  }
  /deep/ .el-dialog__body {
    padding: 0px;
  }
}
.content {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  .left {
    flex: 1.5;
    border-right: 1px solid #DCDFE6;
    .menu {
      height: 100%;
      width: 100%;
      margin: 0px;
      padding: 0px;
      li {
        list-style-type: none;
        height: 40px;
        width: 100%;
        padding-left: 10px;
        line-height: 40px;
        box-sizing: border-box;
        border-bottom: 1px solid  #DCDFE6;
        cursor: pointer;
      }
      li:hover {
        color: #5cb6ff;
        background-color: #f5f7fa;
      }
      .active-menu-item {
        background-color: #f5f7fa;
        color: #5cb6ff;
      }
    }
  }
  .right {
    flex: 4;
    padding: 10px;
    .content {
      height: 100%;
      width: 100%;
    }
  }
}
.tishi {
  color: #F56C6C;
  font-size: 12px;
  margin: 0px;
}
.tishi::before {
  content: "*";
}
.flash-screen {
  width: 100%;
  height: 100%;
  .flash-screen-content {
    display: flex;
    justify-content: center;
    align-items: stretch;
    .flash-screen-content-left,
    .flash-screen-content-right {
      text-align: center;
      flex: 1;
      padding: 10px;
      .wz-js {
        text-align: center;
      }
      .add-btn {
        margin-top: 10px;
      }
    }
    .preview-screen {
      height: 300px;
      overflow: hidden;
      border: 1px solid #f5f7fa;
      position: relative;
      .vorImg {
        width: 100%;
      }
    }
  }
  .flash-screen-content1 {
    .flash-screen-content-left,
    .flash-screen-content-right {
      text-align: center;
      flex: 1;
      padding: 10px;
      .wz-js {
        text-align: center;
      }
      .add-btn {
        margin-top: 10px;
      }
    }
    .preview-screen {
      height: 150px;
      overflow: hidden;
      border: 1px solid #f5f7fa;
      position: relative;
      .vorImg {
        width: 100%;
      }
    }
  }
  .flash-screen-foolter {
    text-align: center;
    margin-top: 15px;
  }
}
.icon-change {
  width: 100%;
  height: 100%;
  .icon-screen-content {
    display: flex;
    justify-content: center;
    align-items: stretch;
    .icon-screen-content-left,
    .icon-screen-content-right {
      text-align: center;
      flex: 1;
      padding: 10px;
      .wz-js {
        text-align: center;
      }
      .add-btn {
        margin-top: 10px;
      }
    }
    .icon-screen {
      width: 80px;
      height: 80px;
      border: 1px solid #f5f7fa;
      margin: 0px auto;
      position: relative;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
  }
  .icon-screen-foolter {
    text-align: center;
  }
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 80px;
  height: 80px;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
.preview-screen:hover .delete-box{
  display: flex;
}
.delete-box {
  display: none;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  transition: all 0.3 linear;
  i {
    font-size: 20px;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>
