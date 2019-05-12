import Vue from 'vue'
import Vuex from 'vuex'
import software from './software'
import search from './search'
import subject from './subject'
import faculty from './faculty'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    software,
    search,
    subject,
    faculty,
  },
  state: {},
  mutations: {},
  actions: {},
})
