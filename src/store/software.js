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
      'Виртуальная машина',
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
      {
        name: 'VS code',
        type: 'IDE',
        year: '2019',
        license: 'Freeware',
        description:
          'Visual Studio Code - легкий редактор кода, разработанный корпорацией Microsoft на движке Electron с использваонием веб-технологий. Прямым конкурентом является Atom, PhpStorm, SublimeText, но VS code уже несколько лет удерживает первые позиции в топах пользователей.',
        img:
          'https://static1.squarespace.com/static/592e86ee9de4bb6e73d8c154/t/5a3e4ca653450ae78e8d4ed2/1514033170109/32078472-5053adea-baa7-11e7-9034-519002f12ac7.png'
      },
      {
        name: 'XAMMP',
        type: 'Web-server',
        license: 'Freeware',
        year: '2017',
        description:
          'XAMMP - локальный сервер, который предоставляет стандартный набор функций для развертки виртуального сервера на вашей машине. Apache, PHP7, nginx и PhpMyAdmin.',
        img:
          'http://www.stickpng.com/assets/images/58482973cef1014c0b5e49fd.png'
      },
      {
        name: 'КонсультантПлюс',
        type: 'Справочная система',
        license: 'Commercial',
        year: '2019',
        img:
          'https://i.mycdn.me/i?r=AzGBqNaF5OQp2lMpnhRx4DEF706jHoH1H2CXoquhh2AuTaLFvi7hJtcHqXO0a8CV9Zo'
      },
      {
        name: 'VS codium',
        type: 'IDE',
        year: '2019',
        license: 'Open-source',
        description:
          'Visual Studio Codium - является open-source версией VS code.',
        img: 'https://avatars0.githubusercontent.com/u/40338071?v=4'
      },
      {
        name: 'PhpStorm',
        type: 'IDE',
        year: '2019',
        license: 'Commercial',
        description: 'PhpStorm - мощный инструмент для веб-разработки.',
        img:
          'https://docs.typo3.org/typo3cms/extensions/th_rating/_images/phpstorm.png'
      },
      {
        name: 'Кодекс',
        type: 'Справочная система',
        license: 'Commercial',
        year: '2017',
        img:
          'https://msal.ru/upload/library/ebs_files/kodeks_logo_color_blue.jpg'
      }
    ]
  },
  mutations: {
    loadSoftware(state, payload) {
      state.software = payload
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
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchSoftware({ commit }) {
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
