<template>
  <div>
    <div class="side-bar">
      <div class="side-bar-frist">
        <div class="logo">
          <img src="../../../assets/image/logo.png" />
        </div>
         <div class="game-logo">
          <img :src="icon" />
        </div>
        <div class="search-box">
          <el-input
            placeholder="请输入内容"
            size="small"
            v-model="gameName"
            @change="searchName">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
      <div class="game">
        <div class="game-list">
          <ul>
            <li class="game-item"
              v-for="(item, index) in gameData"
              :key="item.key"
              :class="{'active-game': currentGameIndex === index}"
              @click="gameClick(index, item)">{{item.name}}</li>
          </ul>
        </div>
      </div>
      <div class="edition">版本号：v-101</div>
    </div>
  </div>
</template>
<script>
import { appPaging } from '@/api/pageApi'
export default {
  name: 'sidebar',
  data () {
    return {
      gameName: '',
      icon: '',
      listQuery: {
        cur: 1,
        len: 100
      },
      sourceData: [],
      gameData: [],
      currentGameIndex: 0 // 当前的游戏
    }
  },
  mounted () {
    this.gameList()
  },
  methods: {
    gameList () {
      // 游戏列表
      appPaging(this.listQuery).then(res => {
        let data = res.content.page.records
        console.log('data', data)
        let _data = data.filter(item => !/t/gi.test(item.name))
        this.sourceData = JSON.parse(JSON.stringify(_data))
        this.gameData = _data
        this.icon = this.gameData[0].icon
        this.$store.dispatch('gameAction', this.gameData[0])
      }).catch(() => {
        return false
      })
    },
    gameClick (index, item) {
      let _isPacking = this.$store.state.Game.isPacking
      console.log('_isPacking', _isPacking)
      if (_isPacking) {
        this.$message({
          type: 'warning',
          message: '正在进行打包，请注意不要进行其它操作'
        })
        return false
      }
      this.currentGameIndex = index
      this.icon = item.icon
      this.$store.dispatch('gameAction', item)
    },
    searchName (val) {
      let reg = new RegExp(val, 'i')
      this.gameData = this.sourceData.filter(item => {
        return reg.test(item.name)
      })
      if (this.gameData && this.gameData.length > 0) {
        this.currentGameIndex = 0
        this.icon = this.gameData[0].icon
        this.$store.dispatch('gameAction', this.gameData[0])
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.side-bar {
  position: sticky;
  top: 0px;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .side-bar-frist {
    height: 200px;
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
    .game-logo {
      width: 40%;
      margin: 10px auto 0px;
      img {
        width: 100%;
        display: block;
      }
    }
    .search-box {
      margin: 20px 0px;
      /deep/ .el-input__inner{
        border-radius: 16px;
      }
    }
  }
  .game {
    width: 100%;
    padding: 0px;
    box-sizing: border-box;
    flex: 1;
    overflow: hidden;
    .game-list {
      height: 100%;
      overflow: auto;
      margin-left: -10px;
      margin-right: -10px;
      transform: translateX(10px);
      ul {
        margin: 0px;
        padding: 0px 0px;
        li {
          list-style-type:none;
          color: #ffffff;
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          font-size: 14px;
          font-weight: 600;
          color: rgb(191, 203, 217);
          cursor: pointer;
        }
        .active-game {
          color: rgb(64, 158, 255);
          background-color: rgb(38, 52, 69);
        }
        li:hover {
          color: rgb(64, 158, 255);
          background-color: rgb(38, 52, 69);
        }
      }
    }
  }
  .edition {
    width: 160px;
    height: 30px;
    padding: 0px 5px;
    line-height: 30px;
    font-size: 12px;
    color: #ffffff;
    background-color: rgb(38, 52, 69);
    box-sizing: border-box;
  }
}

</style>
