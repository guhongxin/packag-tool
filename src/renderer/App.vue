<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'packag-tool',
    mounted () {
      let self = this
      document.onkeydown = function (e) {
        if (e.keyCode === 123) {
          self.$electron.remote.getCurrentWebContents().openDevTools()
        }
      }
    }
  }
</script>

<style>
  /* CSS */
</style>
