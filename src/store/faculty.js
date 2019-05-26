import axios from 'axios'
import { api } from './store'

class Faculty {
  constructor(name, short_name, description, web_site, img, id = null) {
    this.name = name
    this.short_name = short_name
    this.description = description
    this.web_site = web_site
    this.img = img
    this.id = id
  }
}
export default {
  state: {
    faculty: []
  },
  mutations: {
    loadFaculty(state, payload) {
      state.faculty = payload
    },
    addFaculty(state, payload) {
      state.faculty.push(payload)
    }
  },
  actions: {
    async facultyCreate({ commit }, item) {
      commit('setLoading', true)
      const newF = new Faculty(
        item.name,
        item.short_name,
        item.description,
        item.web_site,
        item.img
      )
      const sql = `INSERT INTO faculty (id, name, short_name, description, img, web_site) VALUES (NULL, '${newF.name}', '${newF.short_name}', '${newF.description}', '${newF.img}', '${newF.web_site}')`
      axios
        .post(api, {
          type: 'set',
          data: sql
        })
        .then(response => {
          if (response.data.length > 1) {
            return Promise.reject(response.data[1])
          } else {
            console.log(response)
            commit('addFaculty', newF)
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
    async facultyFetch({ commit }) {
      commit('setLoading', true)
      let resultFaculty = []
      const sql = `SELECT * FROM faculty`
      axios
        .post(api, {
          type: 'get',
          data: sql
        })
        .then(response => {
          response.data.forEach(item => {
            const faculty = new Faculty(
              item.name,
              item.short_name,
              item.description,
              item.web_site,
              item.img,
              item.id
            )
            resultFaculty.push(faculty)
          })
          commit('loadFaculty', resultFaculty)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setError', error)
          commit('setLoading', false)
          throw error
        })
    },
    async facultyById({ commit, getters }, id) {
      if (!getters.facultyById(id)) {
        commit('setLoading', true)
        const sql = `SELECT * FROM faculty WHERE id = ${id}`
        axios
          .post(api, {
            type: 'get',
            data: sql
          })
          .then(response => {
            const item = response.data[0]
            const faculty = new Faculty(
              item.name,
              item.short_name,
              item.description,
              item.web_site,
              item.img,
              item.id
            )
            commit('addFaculty', faculty)
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
    facultyAll: state => {
      return state.faculty
    },
    facultyById: state => id => {
      return state.faculty.find(item => item.id === id)
    },
    facultySearch: state => query => {
      return state.faculty.filter(
        item => item.name.match(query) || item.short_name.match(query)
      )
    },
    facultySimilar: state => exceptId => {
      return state.faculty.filter(
        item => item.id !== exceptId
      )
    },
    facultyAutocomplete: state => query => {
      if (query && !!query.trim()) {
        const strings = state.faculty.map(item => item.name)
        return strings.filter(item => item.match(new RegExp(query, 'gi')))
      } else return []
    },
    facultyAllNameAndId: state => {
      return state.faculty.map(item => {
        return { name: item.name, id: item.id }
      })
    }
  }
}
