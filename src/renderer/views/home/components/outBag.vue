<template>
  <div class="out-bag">
    <div class="status-icon"></div>
    <div class="game-logo">
      <img src="../../../assets/image/rmgame.png" />
    </div>
    <div class="game-name">UC九游</div>
    <div class="progress">
      <el-progress :percentage="50" color="#67C23A"></el-progress>
    </div>
    <div class="cz">
      拷贝文件目录
    </div>
  </div>
</template>
<script>
export default {}
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
  }
}
</style>
