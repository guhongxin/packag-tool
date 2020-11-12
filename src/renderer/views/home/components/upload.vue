<template>
  <div class="upload" @click="uploadFile" v-loading="loading">
    <i class="el-icon-plus"></i>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.VUE_APP_UPLOADURL = process.env.VUE_APP_UPLOADURL
    this.VUE_APP_IMGURL = process.env.VUE_APP_IMGURL
  },
  methods: {
    uploadFile () {
      let input = document.createElement('input')
      input.type = 'file'
      input.onchange = (e) => {
        let file = e.target.files[0]
        let formdata = new FormData()
        formdata.append('file', file)
        this.loading = true
        axios({
          url: `${this.VUE_APP_UPLOADURL}/upload/single`,
          method: 'POST',
          data: formdata
        }).then(res => {
          let data = res.data.data
          let _resourceURL = this.VUE_APP_IMGURL + data.resourceURL
          this.loading = false
          this.$emit('successUpload', _resourceURL)
        }).catch(() => {
          this.loading = false
          return false
        })
      }
      input.click()
    }
  }
}
</script>
<style lang="scss" scoped>
.upload {
  width: 80px;
  height: 80px;
  border-radius:4px;
  border: 1px dashed #DCDFE6 ;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  i {
    font-size: 30px;
  }
}
.upload:hover {
  border-color: #409EFF;
}
</style>
