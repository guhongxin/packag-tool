<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'appMain'
}
</script>
<style lang="scss" scoped>
.app-main {
  height: calc(100vh - 60px);
  background-color: #EFF1F4;
  box-sizing: border-box;
  padding: 5px;
}
</style>
