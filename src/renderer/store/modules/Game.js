const state = {
  game: {}
}
const mutations = {
  SET_GAME (state, param) {
    console.log('store', param)
    state.game = param
  }
}

const actions = {
  gameAction ({ commit }, param) {
    commit('SET_GAME', param)
  }
}

export default {
  state,
  mutations,
  actions
}
