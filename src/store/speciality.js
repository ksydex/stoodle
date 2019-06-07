import axios from 'axios'
import { api } from './store.js'
class Speciality {
  constructor(
    name,
    numbers,
    faculty,
    description,
    id = null,
    facultyId = null
  ) {
    this.name = name
    this.numbers = numbers
    this.faculty = faculty
    this.description = description
    this.id = id
    this.facultyId = facultyId
  }
}
export default {
  state: {
    speciality: []
  },
  mutations: {
    loadSpeciality(state, payload) {
      state.speciality = payload
    },
    addSpeciality(state, payload) {
      state.speciality.push(payload)
    }
  },
  actions: {
    async specialityCreate({ commit }, payload) {
      const newS = new Speciality(
        payload.name,
        payload.numbers,
        payload.faculty,
        payload.description,
        null,
        payload.facultyId
      )
      commit('setLoading', true)
      const sql = `INSERT INTO speciality (id, name, numbers, description, faculty) VALUES (NULL, '${
        newS.name
      }', '${newS.numbers}', '${newS.description}', '${newS.facultyId}')`
      axios
        .post(api, {
          type: 'set',
          data: sql
        })
        .then(response => {
          if (response.data.length > 1) {
            return Promise.reject(response.data[1])
          } else {
            commit('addSpeciality', newS)
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
    async specialityFetch({ commit }) {
      commit('setLoading', true)
      let resultSpeciality = []
      const sql = `SELECT speciality.id, speciality.name, speciality.numbers, speciality.description, speciality.faculty as facultyId, faculty.name as faculty FROM speciality LEFT JOIN faculty ON speciality.faculty = faculty.id`
      axios
        .post(api, {
          type: 'get',
          data: sql
        })
        .then(response => {
          response.data.forEach(item => {
            const speciality = new Speciality(
              item.name,
              item.numbers,
              item.faculty,
              item.description,
              item.id,
              item.facultyId
            )
            resultSpeciality.push(speciality)
          })
          commit('loadSpeciality', resultSpeciality)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setError', error)
          commit('setLoading', false)
          throw error
        })
    },
    async specialityById({ commit, getters }, id) {
      if (!getters.specialityById(id)) {
        commit('setLoading', true)
        const sql = `SELECT speciality.id, speciality.name, speciality.numbers, speciality.description, speciality.faculty as facultyId, faculty.name as faculty FROM speciality LEFT JOIN faculty ON speciality.faculty = faculty.id
WHERE speciality.id = ${id}`
        axios
          .post(api, {
            type: 'get',
            data: sql
          })
          .then(response => {
            const item = response.data[0]
            const speciality = new Speciality(
              item.name,
              item.numbers,
              item.faculty,
              item.description,
              item.id,
              item.facultyId
            )
            commit('addSpeciality', speciality)
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
    specialityAll: state => {
      return state.speciality
    },
    specialityById: state => id => {
      return state.speciality.find(item => item.id === id)
    },
    specialitySearch: state => query => {
      return state.speciality.filter(item => item.name.match(query))
    },
    specialityOnFaculty: state => facultyId => {
      return state.speciality.filter(item => item.facultyId === facultyId)
    },
    specialityAutocomplete: state => query => {
      if (query && !!query.trim()) {
        const strings = state.speciality.map(item => item.name)
        return strings.filter(item => item.match(new RegExp(query, 'gi')))
      } else return []
    }
  }
}
