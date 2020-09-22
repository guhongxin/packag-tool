<template>
  <div class="package-failed">
    <i class="el-icon-success" style="color:#67C23A;font-size:20px;"></i>
    <div class="game-logo">
      <img src="../../../assets/image/rmgame.png" />
    </div>
    <div class="infor">
      <div class="game-name">UC九游</div>
      <div class="errInfor">
        <i class="el-icon-location"></i>
        移动到母包缓存记录
      </div>
    </div>
    <div class="cz">
      <el-button type="primary" size="small" @click="viewlog">查看日志</el-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    viewlog () {
      this.$emit('viewlog')
    }
  }
}
</script>
<style lang="scss" scoped>
.package-failed {
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
    .errInfor {
      .el-icon-location {
        color: #F56C6C;
      }
    }
  }
  .cz {
    width: 100px;
  }
}
</style>
