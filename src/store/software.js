import axios from 'axios'
import { api } from './store.js'
class Software {
  constructor(name, type, year, license, description, img, id = null) {
    this.name = name
    this.type = type
    this.year = year
    this.license = license
    this.description = description
    this.img = img
    this.id = id
  }
}
export default {
  state: {
    license: [
      {
        name: 'Freeware',
        description:
          'Свободно распространяемые (БЕСПЛАТНЫЕ) полнофункциональные программы. Приобретать подобные программы не нужно.'
      },
      {
        name: 'Shareware',
        description:
          'Условно-бесплатное программное обеспечение -  пользователю бесплатно предоставляется программное обеспечение неполного функционала, то есть с некоторыми ограничениями, действующими до тех пор, пока не будет произведена оплата за полнофункциональный продукт.'
      },
      {
        name: 'Open Source',
        description:
          'Программное обеспечение распространяется на бесплатной основе вместе с исходным кодом. Однако автор не отказывается от своих прав. '
      },
      {
        name: 'Commercial',
        description:
          'Коммерческое программное обеспечение, т.е. программное обеспечение, всегда распространяемое только за плату. Оплата должна быть произведена авансом или сразу после получения копии на лицензионном диске или дискете в фирменной упаковке.'
      }
    ],
    type: [
      'Операционная система',
      'Служебная программа(утилита)',
      '3D графика',
      'Виртуальная машина',
      'IDE/Среда разработки',
      'Драйвер',
      'Текстовый редактор',
      'Графический редактор',
      'Сетевое ПО',
      'Браузер',
      'Офисное приложение',
      'Экспертная система',
      'Математическая/бухгалтерская система'
    ],
    software: []
  },
  mutations: {
    loadSoftware(state, payload) {
      state.software = payload
    },
    addSoftware(state, payload) {
      state.software.push(payload)
    }
  },
  actions: {
    async softwareCreate({ commit }, payload) {
      commit('setLoading', true)
      const newS = new Software(
        payload.name,
        payload.type,
        payload.year,
        payload.license,
        payload.description,
        payload.img
      )
      const sql = `INSERT INTO software (id, name, type, license, year, description, img) VALUES (NULL, '${
        newS.name
      }', '${newS.type}', '${newS.license}', '${newS.year}', '${
        newS.description
      }', '${newS.img}')`
      axios
        .post(api, {
          type: 'set',
          data: sql
        })
        .then(response => {
          if (response.data.length > 1) {
            return Promise.reject(response.data[1])
          } else {
            commit('addSoftware', newS)
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
    async softwareFetch({ commit }) {
      commit('setLoading', true)
      let resultSoftware = []
      const sql = `SELECT * FROM software`
      axios
        .post(api, {
          type: 'get',
          data: sql
        })
        .then(response => {
          response.data.forEach(data => {
            const software = new Software(
              data.name,
              data.type,
              data.year,
              data.license,
              data.description,
              data.img,
              data.id
            )
            resultSoftware.push(software)
          })
          commit('loadSoftware', resultSoftware)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setError', error)
          commit('setLoading', false)
          throw error
        })
    },
    async softwareUsedOnSubject({ commit, getters }, subjectId) {
      const sql = `SELECT software.id as id, software.name as name, software.type as type, software.license as license, software.year as year, software.description as description, software.img as img FROM softwareonsubject LEFT JOIN software ON softwareonsubject.software = software.id WHERE softwareonsubject.subject = ${subjectId}`
      axios
        .post(api, {
          type: 'get',
          data: sql
        })
        .then(response => {
          response.data.forEach(data => {
            if (!getters.softwareById(data.id)) {
              const software = new Software(
                data.name,
                data.type,
                data.year,
                data.license,
                data.description,
                data.img,
                data.id
              )
              commit('addSoftware', software)
            }
          })
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setError', error)
          commit('setLoading', false)
          throw error
        })
    },
    async softwareById({ commit, getters }, id) {
      if (!getters.softwareById(id)) {
        commit('setLoading', true)
        const sql = `SELECT * FROM software WHERE id = ${id}`
        axios
          .post(api, {
            type: 'get',
            data: sql
          })
          .then(response => {
            const data = response.data[0]
            const software = new Software(
              data.name,
              data.type,
              data.year,
              data.license,
              data.description,
              data.img,
              data.id
            )
            commit('addSoftware', software)
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
    softwareTypeAll: state => {
      return state.type
    },
    softwareLicenseAll: state => {
      return state.license
    },
    softwareAll: state => {
      return state.software
    },
    softwareById: state => id => {
      return state.software.find(item => item.id === id)
    },
    softwareSimilar: state => ({ type, exceptName }) => {
      let firstTry = state.software
        .filter(item => item.type === type && item.name !== exceptName)
        .splice(0, 5) // возвращаем первые 5

      // если больше нет похожего ПО
      if (firstTry.length !== 0) return firstTry
      /* else if (firstTry.length !== 0) {
        state.software
          .filter(item => item.name !== exceptName)
          .splice(0, 5 - firstTry.length)
          .forEach(item => {
            firstTry.push(item)
          })
        return firstTry
      } */ else
        return state.software
          .filter(item => item.name !== exceptName)
          .splice(0, 5)
    },
    softwareSearch: state => query => {
      return state.software.filter(item => item.name.match(query))
    },
    softwareAutocomplete: state => query => {
      if (query && !!query.trim()) {
        const strings = state.software.map(item => item.name)
        return strings.filter(item => item.match(new RegExp(query, 'gi')))
      } else return []
    },
    softwareByQuery: state => ({ query, type }) => {
      return state.software.filter(item => item[type] === query)
    },
    softwareUsedOnSubject: state => ids => {
      let resultSoftware = []
      if (ids) {
        ids.forEach(id => {
          resultSoftware.push(state.software.find(item => item.id === id))
        })
        return resultSoftware
      }
    }
  }
}
