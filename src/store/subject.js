import axios from 'axios'
import { api } from './store'

class Subject {
  constructor(
    name,
    discipline,
    speciality,
    id = null,
    specialityId = null,
    disciplineId = null
  ) {
    this.name = name
    this.discipline = discipline
    this.speciality = speciality
    this.id = id
    this.specialityId = specialityId
    this.disciplineId = disciplineId
  }
}

export default {
  state: {
    subject: []
  },
  mutations: {
    loadSubject(state, payload) {
      state.subject = payload
    },
    addSubject(state, payload) {
      state.subject.push(payload)
    }
  },
  actions: {
    async subjectCreate({ commit }, payload) {
      const newS = new Subject(
        payload.name,
        payload.discipline,
        payload.speciality,
        null,
        payload.specialityId,
        payload.disciplineId
      )
      commit('setLoading', true)
      const sql = `INSERT INTO subject (id, name, discipline, speciality) VALUES (NULL, '${
        newS.name
      }', '${newS.disciplineId}', '${newS.specialityId}')`
      axios
        .post(api, {
          type: 'set',
          data: sql
        })
        .then(response => {
          if (response.data.length > 1) {
            return Promise.reject(response.data[1])
          } else {
            commit('addSubject', newS)
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
    async subjectUpdate({ commit }, payload) {
      const newS = new Subject(
        payload.name,
        payload.discipline,
        payload.speciality,
        payload.id,
        payload.specialityId,
        payload.disciplineId
      )
      commit('setLoading', true)
      const sql = `UPDATE subject SET name = '${newS.name}', discipline = '${
        newS.disciplineId
      }', speciality = '${newS.specialityId}' WHERE id = ${newS}`
      axios
        .post(api, {
          type: 'set',
          data: sql
        })
        .then(response => {
          if (response.data.length > 1) {
            return Promise.reject(response.data[1])
          } else {
            commit('addSubject', newS)
            commit('setSuccess', 'Запись успешно обновлена!')
            commit('setLoading', false)
          }
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', 'Ошибка при обновлении записи.')
          throw error
        })
    },
    async subjectFetch({ commit }) {
      commit('setLoading', true)
      let resultSubject = []
      const sql = `SELECT subject.id, subject.name, discipline.name AS discipline, speciality.name as speciality, discipline.id AS disciplineId, speciality.id AS specialityId
        FROM subject LEFT JOIN speciality
        ON subject.speciality = speciality.id
        LEFT JOIN discipline
        ON subject.discipline = discipline.id`
      axios
        .post(api, {
          type: 'get',
          data: sql
        })
        .then(response => {
          response.data.forEach(item => {
            const subject = new Subject(
              item.name,
              item.discipline,
              item.speciality,
              item.id,
              item.specialityId,
              item.disciplineId
            )
            resultSubject.push(subject)
          })
          commit('loadSubject', resultSubject)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setError', error)
          commit('setLoading', false)
          throw error
        })
    },
    async subjectById({ commit, getters }, id) {
      if (!getters.subjectById(id)) {
        commit('setLoading', true)
        const sql = `SELECT subject.id, subject.name, discipline.name AS discipline, speciality.name as speciality, discipline.id AS disciplineId, speciality.id AS specialityId
        FROM subject LEFT JOIN speciality
        ON subject.speciality = speciality.id
        LEFT JOIN discipline
        ON subject.discipline = discipline.id
          WHERE subject.id = ${id}`
        axios
          .post(api, {
            type: 'get',
            data: sql
          })
          .then(response => {
            const item = response.data[0]
            const subject = new Subject(
              item.name,
              item.discipline,
              item.speciality,
              item.id,
              item.specialityId,
              item.disciplineId
            )
            commit('addSubject', subject)
            commit('setLoading', false)
          })
          .catch(error => {
            commit('setError', error)
            commit('setLoading', false)
            throw error
          })
      }
    },
    async addSoftwareOnSubject({ commit }, swsj) {
      commit('setLoading', true)
      const sql = `INSERT INTO softwareonsubject (id, software, subject) VALUES (NULL, ${
        swsj.software
      }, ${swsj.subject})`
      axios
        .post(api, {
          type: 'set',
          data: sql
        })
        .then(response => {
          if (response.data.length > 1) {
            return Promise.reject(response.data[1])
          } else {
            commit('setSuccess', 'Запись успешно добавлена!')
            commit('setLoading', false)
          }
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          throw error
        })
    }
  },
  getters: {
    subjectAll: state => {
      return state.subject
    },
    subjectById: state => id => {
      return state.subject.find(item => item.id === id)
    },
    subjectSimilar: state => ({ specialityId, exceptId }) => {
      return state.subject.filter(
        item => item.id !== exceptId && item.specialityId === specialityId
      )
    },
    subjectsOnDisciplineById: state => id => {
      return state.subject.filter(item => item.disciplineId === id)
    },
    subjectsOnSpecialityById: state => id => {
      return state.subject.filter(item => item.specialityId === id)
    },
    subjectSearch: state => query => {
      return state.subject.filter(item => item.name.match(query))
    },
    subjectAutocomplete: state => query => {
      if (query && !!query.trim()) {
        const strings = state.subject.map(item => item.name)
        return strings.filter(item => item.match(new RegExp(query, 'gi')))
      } else return []
    }
  }
}
