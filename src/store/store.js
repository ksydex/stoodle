import Vue from 'vue'
import Vuex from 'vuex'
import shared from './shared'
import software from './software'
import search from './search'
import subject from './subject'
import faculty from './faculty'
import discipline from './discipline'

Vue.use(Vuex)

export var api = 'http://stoodle:81/api.php'

export default new Vuex.Store({
  modules: {
    shared,
    software,
    search,
    subject,
    faculty,
    discipline
  },
  state: {},
  mutations: {},
  actions: {},
})
