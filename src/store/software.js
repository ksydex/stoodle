import * as fb from 'firebase'
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
      'Браузер',
      'Экспертная система',
      'Математическая/бухгалтерская система'
    ],
    software: [

    ]
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
      try {
        const newSoftware = new Software(
          payload.name,
          payload.type,
          payload.year,
          payload.license,
          payload.description,
          payload.img
        )
        const software = await fb
          .database()
          .ref('software')
          .push(newSoftware)
        commit('addSoftware', newSoftware);
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error)
        commit('setLoading', false)
        throw error
      }
    },
    async softwareFetch({ commit }) {
      commit('setLoading', true)
      const resultSoftware = []

      try {
        const fbVal = await fb
          .database()
          .ref('software')
          .once('value')
        const softwareList = fbVal.val()
        Object.keys(softwareList).forEach(key => {
          const item = softwareList[key]
          resultSoftware.push(
            new Software(
              item.name,
              item.type,
              item.year,
              item.license,
              item.description,
              item.img,
              key
            )
          )
        })
        commit('loadSoftware', resultSoftware)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error)
        commit('setLoading', false)
        throw error
      }
    },
    async softwareByName({ commit, getters }, name) {
      if (!getters.softwareByName(name)) {
        commit('setLoading', true)
        const db = fb.database().ref()
        try {
          const fbVal = await db
            .child('software')
            .orderByChild('name')
            .equalTo(name)
            .once('value')
          const key = Object.keys(fbVal.val())[0]
          const item = fbVal.val()[key]
          const softwareToReturn = new Software(
            item.name,
            item.type,
            item.year,
            item.license,
            item.description,
            item.img,
            key
          )
          commit('addSoftware', softwareToReturn)
          commit('setLoading', false)
        } catch (error) {
          commit('setError', error)
          commit('setLoading', false)
          throw error
        }
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
    softwareByName: state => name => {
      return state.software.find(item => item.name === name)
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
    }
  }
}
