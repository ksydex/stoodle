import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import shared from './shared'
import software from './software'
import search from './search'
import subject from './subject'
import faculty from './faculty'
import discipline from './discipline'
import speciality from './speciality'

Vue.use(Vuex)

export var api = 'http://stoodle:81/api.php'

export default new Vuex.Store({
  modules: {
    shared,
    software,
    search,
    subject,
    faculty,
    discipline,
    speciality
  },
  state: {},
  mutations: {},
  actions: {
    async deleteFromDb({ commit }, { id, type }) {
      const sql = `DELETE FROM ${type} WHERE id=${id}`
      axios
        .post(api, {
          type: 'set',
          data: sql
        })
        .then(response => {
          if (response.data.length > 1) {
            return Promise.reject(response.data[1])
          } else {
            commit('setSuccess', 'Запись успешно удалена!')
            commit('setLoading', false)
          }
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', 'Ошибка при удалении записи')
          throw error
        })
    }
  }
})
