<template>
  <div class="side-bar">
    <div class="logo">
      <img src="../../../assets/image/logo.png" />
    </div>
    <div class="game">
      <div class="game-logo">
        <img src="../../../assets/image/rmgame.png" />
      </div>
      <div class="search-box">
        <el-input
          placeholder="请输入内容"
          size="small"
          v-model="input4">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div class="game-list">
        <ul>
          <li class="game-item active-game">末世强袭</li>
          <li class="game-item">血色烂漫</li>
          <li class="game-item">王者荣耀</li>
        </ul>
      </div>
    </div>
    <div class="edition">版本号：v-101</div>
  </div>
</template>
<script>
export default {
  name: 'sidebar',
  data () {
    return {
      input4: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.side-bar {
  position: relative;
  .logo {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      padding: 5px 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        display: block;
      }
    }
  .game {
    margin-top: 40px;
    padding: 0px 10px;
    box-sizing: border-box;
    .game-logo {
      width: 40%;
      margin: 0px auto;
      img {
        width: 100%;
        display: block;
      }
    }
    .search-box {
      margin: 40px 0px;
      /deep/ .el-input__inner{
        border-radius: 16px;
      }
    }
    .game-list {
      margin-left: -10px;
      margin-right: -10px;
      ul {
        margin: 0px;
        padding: 0px;
        li {
          list-style-type:none;
          color: #ffffff;
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          font-size: 14px;
          font-weight: 600;
          color: rgb(191, 203, 217);
          cursor: pointer;
        }
        .active-game {
          color: rgb(64, 158, 255);
          background-color: rgb(38, 52, 69);
        }
        li:hover {
          color: rgb(64, 158, 255);
          background-color: rgb(38, 52, 69);
        }
      }
    }
  }
  .edition {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    padding: 0px 5px;
    line-height: 50px;
    font-size: 12px;
    color: #ffffff;
    box-sizing: border-box;
  }
}

</style>
