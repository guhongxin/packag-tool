const state = {
  game: {},
  isPacking: false // 是否正在进行打包
}
const mutations = {
  SET_GAME (state, param) {
    state.game = param
  },
  SET_ISPACKING (state, param) {
    state.isPacking = param
  }
}

const actions = {
  gameAction ({ commit }, param) {
    commit('SET_GAME', param)
  },
  packingAction ({ commit }, param) {
    commit('SET_ISPACKING', param)
  }
}

export default {
  state,
  mutations,
  actions
}
