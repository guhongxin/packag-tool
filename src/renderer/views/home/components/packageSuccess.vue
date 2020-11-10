<template>
  <div class="package-success">
    <i class="el-icon-success" style="color:#67C23A;font-size:20px;"></i>
    <div class="game-logo">
      <img :src="fileInfor.icon" />
    </div>
    <div class="infor">
      <div class="game-name">{{fileInfor.name}}</div>
      <div class="game-address">{{fileInfor.bundleName}}</div>
    </div>
    <div class="cz">
      <el-button type="primary" size="small"  @click="openFileHandler">打开目录</el-button>
    </div>
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
    openFileHandler () {
      this.$emit('openFileHandler')
    }
  }
}
</script>
<style lang="scss" scoped>
.package-success {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .game-logo {
    width: 60px;
    height: 60px;
    margin: 0px 10px;
    overflow: hidden;
    border-radius: 50%;
    img {
      width: 100%;
      display: block;
    }
  }
  .infor {
    flex: 1;
    div {
      font-size: 14px;
    }
    &>div:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  .cz {
    width: 100px;
  }
}
</style>
