<template>
   <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="650px"
    :before-close="handleClose"
    append-to-body
    class="customDialog">
    <div class="content">
      <div class="left">
        <ul class="menu">
          <li class="menu-item active-menu-item" @click="menuItem(0)">客户端参数</li>
          <li class="menu-item" @click="menuItem(1)">闪屏</li>
          <li class="menu-item" @click="menuItem(2)">icon</li>
        </ul>
      </div>
      <div class="right">
        <div class="content">
          <template v-if="currentMenu === 0">
            <el-form 
              :model="form" :rules="rules"
              size="small"
              ref="ruleForm" label-width="130px" class="demo-ruleForm">
              <el-form-item>
                <p class="tishi">此处仅列出客户端参数、自定义参数, 服务器参数不在此处</p>
              </el-form-item>
              <el-form-item label="GameId" prop="name" class="w-form-item">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="包名" prop="name" class="w-form-item">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="parentChannelCo" prop="name" class="w-form-item">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="productCode" prop="name" class="w-form-item">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="横竖屏设置" prop="name" class="w-form-item">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
          </template>
          <template v-else-if="currentMenu === 1">
            <div class="flash-screen">
              <div class="flash-screen-content">
                <div class="flash-screen-content-left">
                  <div class="preview-screen"></div>
                  <p class="wz-js">现有闪屏</p>
                </div>
                <div class="flash-screen-content-right">
                  <div class="preview-screen"></div>
                  <el-button type="primary" size="small" class="add-btn">添加闪屏</el-button>
                  <p class="wz-js">格式说明</p>
                </div>
              </div>
              <div class="flash-screen-foolter">
                <el-button type="primary" size="small">保存</el-button>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="icon-change">
              <div class="icon-screen-content">
                <div class="icon-screen-content-left">
                  <div class="icon-screen"></div>
                  <p class="wz-js">现有icon</p>
                </div>
                <div class="icon-screen-content-right">
                  <div class="icon-screen"></div>
                  <el-button type="primary" size="small" class="add-btn">添加ICON</el-button>
                  <p class="wz-js">格式说明</p>
                </div>
              </div>
              <div class="icon-screen-foolter">
                <el-button type="primary" size="small">保存</el-button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      title: '渠道名称',
      dialogVisible: true,
      form: {},
      rules: {},
      currentMenu: 1
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    showModule () {
      this.dialogVisible = true
    },
    menuItem (param) {
      // 切换菜单
      this.currentMenu = param
    }
  }
}
</script>
<style lang="scss" scoped>
.customDialog {
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #DCDFE6;
  }
  /deep/ .el-dialog__body {
    padding: 0px;
  }
}
.content {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  .left {
    flex: 1.5;
    border-right: 1px solid #DCDFE6;
    .menu {
      height: 100%;
      width: 100%;
      margin: 0px;
      padding: 0px;
      li {
        list-style-type: none;
        height: 40px;
        width: 100%;
        padding-left: 10px;
        line-height: 40px;
        box-sizing: border-box;
        border-bottom: 1px solid  #DCDFE6;
        cursor: pointer;
      }
      li:hover {
        color: #5cb6ff;
        background-color: #f5f7fa;
      }
      .active-menu-item {
        background-color: #f5f7fa;
        color: #5cb6ff;
      }
    }
  }
  .right {
    flex: 4;
    padding: 10px;
    .content {
      height: 100%;
      width: 100%;
    }
  }
}
.tishi {
  color: #F56C6C;
  font-size: 12px;
  margin: 0px;
}
.tishi::before {
  content: "*";
}
.flash-screen {
  width: 100%;
  height: 100%;
  .flash-screen-content {
    display: flex;
    justify-content: center;
    align-items: stretch;
    .flash-screen-content-left,
    .flash-screen-content-right {
      text-align: center;
      flex: 1;
      padding: 10px;
      .wz-js {
        text-align: center;
      }
      .add-btn {
        margin-top: 10px;
      }
    }
    .preview-screen {
      height: 300px;
      border: 1px solid #f5f7fa;
    }
  }
  .flash-screen-foolter {
    text-align: center;
  }
}
.icon-change {
  width: 100%;
  height: 100%;
  .icon-screen-content {
    display: flex;
    justify-content: center;
    align-items: stretch;
    .icon-screen-content-left,
    .icon-screen-content-right {
      text-align: center;
      flex: 1;
      padding: 10px;
      .wz-js {
        text-align: center;
      }
      .add-btn {
        margin-top: 10px;
      }
    }
    .icon-screen {
      width: 80px;
      height: 80px;
      border: 1px solid #f5f7fa;
      margin: 0px auto;
    }
  }
  .icon-screen-foolter {
    text-align: center;
  }
}
</style>
