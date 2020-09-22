<template>
  <div class="package-success">
    <i class="el-icon-success" style="color:#67C23A;font-size:20px;"></i>
    <div class="game-logo">
      <img src="../../../assets/image/rmgame.png" />
    </div>
    <div class="infor">
      <div class="game-name">UC九游</div>
      <div class="game-address">包体地址</div>
    </div>
    <div class="cz">
      <el-button type="primary" size="small">打开目录</el-button>
    </div>
  </div>
</template>
<script>
export default {}
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
