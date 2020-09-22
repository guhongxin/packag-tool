<template>
  <div class="layout">
    <side-bar class="layout-side-bar"></side-bar>
    <div class="main-content">
      <nav-bar></nav-bar>
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
import { SideBar, NavBar, AppMain } from './components/index'
export default {
  name: 'layout',
  components: {
    SideBar,
    NavBar,
    AppMain
  }
}
</script>
<style lang="scss" scoped>
.layout {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  .layout-side-bar {
    width: 160px;
    min-height: 100vh;
    background-color: #1A1F27;
  }
  .main-content {
    flex: 1;
    background-color: #EFF1F4;
  }
}
</style>
