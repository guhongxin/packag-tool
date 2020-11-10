<template>
  <div class="package-failed">
    <!-- <i class="el-icon-success" style="color:#67C23A;font-size:20px;"></i> -->
    <el-checkbox v-model="checked" @change="changeChange"></el-checkbox>
    <div class="game-logo">
      <img :src="fileInfor.icon" />
    </div>
    <div class="infor">
      <div class="game-name">{{fileInfor.name}}</div>
      <div class="errInfor">
        <i class="el-icon-location"></i>
        {{fileInfor.bundleName}}
      </div>
    </div>
    <div class="cz">
      <!-- <el-button type="primary" size="small" @click="viewlog">查看日志</el-button> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    fileInfor: {
      type: Object,
      defalute: {}
    }
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    viewlog () {
      this.$emit('viewlog')
    },
    changeChange () {
      console.log('***', this.checked)
      this.$emit('changeChange', this.checked)
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
    overflow: hidden;
    border-radius: 50%;
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
