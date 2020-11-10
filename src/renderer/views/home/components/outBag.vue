<template>
  <div class="out-bag">
    <div class="status-icon"></div>
    <div class="game-logo">
      <img :src="fileInfor.icon" />
    </div>
    <div class="game-name">{{fileInfor.bundleName}}</div>
    <div class="progress">
      <el-progress :percentage="fileInfor.per"
        :show-text="false"
        color="#67C23A"></el-progress>
    </div>
    <div class="cz copyfileUrl" v-if="fileInfor.per > 0" @click="copyFileDir">
      拷贝文件目录
    </div>
    <div class="cz" v-else>正在等待其它操作</div>
  </div>
</template>
<script>
export default {
  props: {
    fileInfor: {
      type: Object,
      defalute: {}
    }
  },
  methods: {
    copyFileDir () {
      this.$emit('copyFileDir')
    }
  }
}
</script>
<style lang="scss" scoped>
.out-bag {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .status-icon {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    border: 1px solid #67C23A;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
  }
  .status-icon::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: block;
    background-color: #67C23A;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .status-icon::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(103, 194, 58, 0.4);
    position: absolute;
    top: 0px;
    left: 0px;
  }
  .game-logo {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    overflow: hidden;
    border-radius: 50%;
    img {
      width: 100%;
      display: block;
    }
  }
  .game-name {
    width: 100px;
    font-size: 12px;
  }
  .progress {
    flex: 1;
  }
  .cz {
    width: 100px;
    font-size: 12px;
    margin-left: 5px;
  }
  .copyfileUrl {
    cursor: pointer;
    color: #409EFF;
  }
}
</style>
