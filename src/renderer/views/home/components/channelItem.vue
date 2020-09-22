<template>
  <div class="channelItem">
    <div class="channel-infor">
      <div class="channel-infor-left">
        <div class="channel-base-infor">
          <div class="channel-icon">
            <img src="../../../assets/image/rmgame.png" /> 
          </div>
          <div class="channel-base-infor-txt">
            <div class="channel-name">猕猴桃</div>
            <div class="channel-no">渠道号：<span>1</span></div>
          </div>
        </div>
        <p class="channel-other-infor">
          集成组件：<span class="span-txt span-a" @click="jdicClick">1</span>
        </p>
        <p class="channel-other-infor">
          渠道版本：<span class="span-txt span-a" @click="versionClick">V1.0.0</span>
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
            <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
          </div>
            <div class="w-from-item">
            <div class="w-from-item-label">签名</div>
            <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      input: ''
    }
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
    }
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
</style>
