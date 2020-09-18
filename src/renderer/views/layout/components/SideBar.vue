<template>
  <div class="side-bar">
    <div class="logo">
      <img src="../../../assets/image/logo.png" />
    </div>
    <div class="game">
      <div class="game-logo">
        <img src="../../../assets/image/logo.png" />
      </div>
    </div>
    <div class="edition">版本号：v-101</div>
  </div>
</template>
<script>
export default {
  name: 'sidebar'
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
