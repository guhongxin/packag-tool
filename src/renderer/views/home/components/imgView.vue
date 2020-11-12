<template>
  <div class="imgView" 
    :style="{width: wt+'px', height: ht + 'px', 'background-image': 'url('+ url +')'}">
    <div class="delete-box">
      <i class="el-icon-delete" @click="deleteBtn"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    wt: {
      type: Number,
      default: 80
    },
    ht: {
      type: Number,
      default: 80
    },
    url: {
      type: String,
      default: ''
    }
  },
  methods: {
    deleteBtn () {
      this.$emit('deleteClick')
    }
  }
}
</script>
<style lang="scss" scoped>
.imgView {
  width: 80px;
  height: 80px;
  border-radius:4px;
  border: 1px solid #DCDFE6 ;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
}
.imgView:hover .delete-box {
  display: flex;
}
.delete-box {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  left: 0px;
  top: 0px;
  display: none;
  justify-content: center;
  align-items: center;
  i {
    font-size: 30px;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>