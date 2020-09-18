<template>
  <div>首页
    <input type="file" webkitdirectory/>
    <button @click="test">通知</button>
  </div>
</template>
<script>
export default {
  name: 'home',
  methods: {
    test () {
      console.log('this.$electron')
      let kk = this.$electron.remote.dialog.showOpenDialog({
        title: 'kk',
        properties: ['openDirectory']
      })
      console.log('kk', kk)
      // const { shell } = this.$electron.remote
      // shell.showItemInFolder()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
