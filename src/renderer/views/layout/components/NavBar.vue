<template>
  <div class="nav-bar">
    <ul class="menu">
      <li class="menu-item active-menu-item">功能一</li>
      <li class="menu-item">功能二</li>
      <li class="menu-item">功能三</li>
      <li class="menu-item">功能四</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'navBar'
}
</script>
<style lang="scss" scoped>
.nav-bar {
  height: 50px;
  background:#1A1F27;
  box-sizing: border-box;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0px;
  .menu {
    margin: 0px;
    padding: 0px;
    .menu-item {
      list-style: none;
      float: left;
      height: 50px;
      line-height: 50px;
      text-align: center;
      width: 100px;
      font-size: 16px;
      font-weight: 600;
      color:rgb(191, 203, 217);
      cursor: pointer;
    }
    .menu-item:hover {
      color: rgb(64, 158, 255);
      background-color:#304156;
    }
    .active-menu-item {
      background-color: #304156;
      color: rgb(64, 158, 255);
    }
  }
}
</style>
