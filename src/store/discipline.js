import axios from 'axios'
import { api } from './store.js'
class Discipline {
  constructor(name, description, id = null) {
    this.name = name
    this.description = description
    this.id = id
  }
}
export default {
  state: {
    discipline: []
  },
  mutations: {
    loadDiscipline(state, payload) {
      state.discipline = payload
    },
    addDiscipline(state, payload) {
      state.discipline.push(payload)
    }
  },
  actions: {
    async disciplineCreate({ commit }, payload) {
      commit('setLoading', true)
      const newD = new Discipline(
        payload.name,
        payload.description
      )
      const sql = `INSERT INTO discipline (id, name, description) VALUES (NULL,  '${newD.name}', '${newD.description}')`
      axios
        .post(api, {
          type: 'set',
          data: sql
        })
        .then(response => {
          if (response.data.length > 1) {
            return Promise.reject(response.data[1])
          } else {
            commit('addDiscipline', newD)
            commit('setSuccess', 'Запись успешно добавлена!')
            commit('setLoading', false)
          }
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', 'Ошибка при создании записи')
          throw error
        })
    },
    async disciplineFetch({ commit }) {
      commit('setLoading', true)
      let resultDiscipline = []
      const sql = `SELECT * FROM discipline`
      axios
        .post(api, {
          type: 'get',
          data: sql
        })
        .then(response => {
          response.data.forEach(data => {
            const discipline = new Discipline(
              data.name,
              data.description,
              data.id
            )
            resultDiscipline.push(discipline)
          })
          commit('loadDiscipline', resultDiscipline)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setError', error)
          commit('setLoading', false)
          throw error
        })
    },
    async disciplineById({ commit, getters }, id) {
      if (!getters.disciplineById(id)) {
        commit('setLoading', true)
        const sql = `SELECT * FROM discipline WHERE id = ${id}`
        axios
          .post(api, {
            type: 'get',
            data: sql
          })
          .then(response => {
            const item = response.data[0]
            const discipline = new Discipline(
              item.name,
              item.description,
              item.id
            )
            commit('addDiscipline', discipline)
            commit('setLoading', false)
          })
          .catch(error => {
            commit('setError', error)
            commit('setLoading', false)
            throw error
          })
      }
    }
  },
  getters: {
    disciplineAll: state => {
      return state.discipline
    },
    disciplineById: state => id => {
      return state.discipline.find(item => item.id === id)
    },
    disciplineSearch: state => query => {
      return state.discipline.filter(item => item.name.match(query))
    },
    disciplineSimilar: state => exceptId => {
      return state.discipline.filter(item => item.id !== exceptId)
    },
    disciplineAutocomplete: state => query => {
      if (query && !!query.trim()) {
        const strings = state.discipline.map(item => item.name)
        return strings.filter(item => item.match(new RegExp(query, 'gi')))
      } else return []
    },
  }
}
