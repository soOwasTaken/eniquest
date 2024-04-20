import { createStore } from 'vuex'

const initialState = {
  isLoggedIn: localStorage.getItem('token') ? true : false,
  user: null,
  token: localStorage.getItem('token') || '',
  gameSuccess: JSON.parse(localStorage.getItem('gameSuccess')) || [
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]
}

const store = createStore({
  state: initialState,
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value
    },
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setGameSuccess(state, { gameIndex, success }) {
      state.gameSuccess.splice(gameIndex, 1, success)
      localStorage.setItem('gameSuccess', JSON.stringify(state.gameSuccess))
    }
  },
  actions: {
    login({ commit }, { token, user }) {
      commit('setToken', token)
      commit('setUser', user)
      commit('setLoggedIn', true)
    },
    logout({ commit }) {
      commit('setToken', '')
      commit('setUser', null)
      commit('setLoggedIn', false)
      localStorage.removeItem('token')
      localStorage.removeItem('gameSuccess')
    },
    updateGameSuccess({ commit }, { gameIndex, success }) {
      commit('setGameSuccess', { gameIndex, success })
    }
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
    token: (state) => state.token,
    gameSuccess: (state) => state.gameSuccess
  }
})

export default store
