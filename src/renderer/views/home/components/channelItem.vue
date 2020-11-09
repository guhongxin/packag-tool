<template>
  <div class="channelItem">
    <div class="channel-infor">
      <div class="channel-infor-left">
        <div class="channel-base-infor">
          <div class="channel-icon">
            <img :src="baseInfor.gameIcon" /> 
          </div>
          <div class="channel-base-infor-txt">
            <div class="channel-name">{{baseInfor.name}}</div>
            <div class="channel-no">渠道号：<span>暂无</span></div>
          </div>
        </div>
        <p class="channel-other-infor">
          集成组件：<span class="span-txt span-a" @click="jdicClick">暂无</span>
        </p>
        <p class="channel-other-infor">
          渠道版本：<span class="span-txt span-a" @click="versionClick">暂无</span>
        </p>
      </div>
      <div class="channel-infor-right">
        <div class="channel-infor-right-head">
          <div class="cz">
            <i class="el-icon-news"></i>
            <span @click="findConfig">查看配置</span>
          </div>
          <div class="cz">
            <i class="el-icon-news"></i>
            <span>常见问题</span>
          </div>
        </div>
        <div class="w-from">
          <div class="w-from-item">
            <div class="w-from-item-label">包名</div>
            <el-input v-model="baseInfor.packageName" placeholder="请输入内容" size="small" disabled></el-input>
            <i class="el-icon-edit-outline editIcon" @click="editPackageName"></i>
          </div>
            <div class="w-from-item">
            <div class="w-from-item-label">签名</div>
            <el-input v-model="baseInfor.certName" placeholder="请输入内容" size="small" disabled></el-input>
          </div>
        </div>
      </div>
    </div>
    <editPackAgeName ref="editPackAgeNameDoc" @btnOk="editPackAgeNameDocBtnOk"></editPackAgeName>
  </div>
</template>
<script>
import editPackAgeName from './editPackAgeName'
import { bundleUpdate } from '@/api/pageApi'
export default {
  props: {
    baseInfor: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {}
  },
  methods: {
    findConfig () {
      this.$emit('findConfig')
    },
    jdicClick () {
      this.$emit('jdicClick')
    },
    versionClick () {
      this.$emit('versionClick')
    },
    editPackageName () {
      this.$refs.editPackAgeNameDoc.showModule(this.baseInfor)
    },
    editPackAgeNameDocBtnOk (param) {
      console.log('***', param)
      this.setbundleUpdate(param).then(res => {
        this.$message({
          type: 'success',
          message: '修改包名成功！'
        })
        this.baseInfor.packageName = param.packageName
        this.$refs.editPackAgeNameDoc.handleClose()
      }).catch(() => {
        this.$refs.editPackAgeNameDoc.btnLoading = false
      })
    },
    setbundleUpdate (param, msg, loading) {
      return new Promise((resolve, reject) => {
        bundleUpdate(param).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  components: {
    editPackAgeName
  }
}
</script>
<style lang="scss" scoped>
.channelItem {
  padding: 8px;
  box-sizing: border-box;
  background-color: #f5f7fa;
  position: relative;
}
.channelItem::before {
  content: '';
  width: 3px;
  height: 100%;
  background-color: red;
  display: block;
  position: absolute;
  left: 0px;
  top: 0px;
}
.channel-infor {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  .channel-infor-left {
    flex: 2;
    .channel-base-infor {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      .channel-icon {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          display: block;
        }
      }
      .channel-base-infor-txt {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        font-size: 12px;
        padding-left: 10px;
      }
    }
    .channel-other-infor {
      margin: 10px 0px 0px;
      font-size: 12px;
      .span-txt {
        color: rgb(64, 158, 255);
      }
    }
  }
  .channel-infor-right {
    flex: 4;
    padding: 5px;
    .channel-infor-right-head {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .cz {
        font-size: 12px;
        cursor: pointer;
      }
      .cz:not(:last-child) {
        margin-right: 10px;
      }
    }
    .w-from {
      margin-top: 10px;
      .w-from-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .w-from-item-label {
          width: 50px;
          font-size: 12px;
        }
      }
      .w-from-item:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
}
.span-a {
  color: rgb(64, 158, 255);
  text-decoration: underline;
  cursor: pointer;
}
.editIcon {
  color: rgb(64, 158, 255);
  cursor: pointer;
}
</style>
