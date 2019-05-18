import * as fb from 'firebase'
class Faculty {
  constructor(name, short_name, description, web_site, img, id = null){
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
    faculty: [
      {
        name: 'Факультет вычислительной техники',
        short_name: 'ФВТ',
        description:
          'На ФВТ сосредоточена подготовка специалистов в области компьютерной техники, ее проектирования, эксплуатации, разработки программного обеспечения и применения новых информационных технологий во всех сферах деятельности, в том числе и в сфере управления.',
        web_site: 'https://fvt.pnzgu.ru',
        img: 'https://pp.userapi.com/c846021/v846021055/5cf17/rVTeUKKIirk.jpg',
      },
      {
        name: 'Факультет педагогики, психологии и социальных наук',
        short_name: 'ФППиСН',
        description:
          'Факультет педагогики, психологии и социальных наук создан на основании приказа ректора ПГУ от 07.12.2012г. путем объединения факультета начального и специального образования, факультета психологии, факультета социологии и социальной работы и кафедры «Профессиональная педагогика и психология» факультета машиностроения, транспорта и энергетики.',
        web_site: 'https://fppsn.pnzgu.ru/',
        img: 'https://pp.userapi.com/c848636/v848636626/18cbbd/S43jBoVaoe8.jpg',
      },
      {
        name:
          'Факультет приборостроения, информационных технологий и электроники',
        short_name: 'ФПИТЭ',
        description:
          'Образование факультета позволило сосредоточить лучшие научно-педагогические школы университета на подготовке высококвалифицированных инженеров и специалистов в области приборостроения, информационных технологий и систем, радиоэлектроники, микро- и наноэлектроники, электроэнергетики и электротехники, бакалавров и магистров в области физики низкоразмерных систем',
        web_site: 'https://fpite.pnzgu.ru',
        img: 'https://fpite.pnzgu.ru/files/fpite.pnzgu.ru/risunok4_2_new.jpg',
      },
      {
        name: 'Факультет экономики и управления',
        short_name: 'ФЭиУ',
        description:
          'В создании факультета проявилась активная жизненная позиция его основателей: Волчихина В.И. – ректора университета (ректор 23.02.1999 - 08.05.2013)  (в то время проректора по учебной работе), Мещерякова В.А. – первого проректора ПГУ (в то время декана Приборостроительного факультета), Будиной В.И. – зав. кафедрой «ЭФиМ», Свистунова Б.Л. – первого декана факультета, а также ведущих представителей профессорско-преподавательского состава – Крутовой Л.И., Михневой С.Г. и др. Первым деканом факультета был заведующий кафедрой «Физика» к.т.н., профессор Свистунов Б.Л., заместитель декана Лушникова Н.В. Первыми кафедрами факультета, начавшими подготовку специалистов-экономистов были: кафедра «Экономика, финансы и менеджмент» (зав.кафедрой Будина В.И.), кафедра «Экономическая кибернетика» (зав.кафедрой Федотов Н.Г.).',
        web_site: 'https://feiu.pnzgu.ru/',
        img: 'https://pp.userapi.com/c848636/v848636626/18cbd3/Lx-CenSfC_w.jpg',
      },
    ],
  },
  mutations: {
    loadFaculty(state, payload) {
      state.faculty = payload
    }
  },
  actions: {
    async facultyCreate({commit}, payload) {
      commit('setLoading', true)
      try {
        const newFaculty = new Faculty(
          payload.name,
          payload.short_name,
          payload.description,
          payload.web_site,
          payload.img
        )
        const faculty = await fb.database().ref('faculty').push(newFaculty)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchFaculty({commit}){
      commit('setLoading', true)
      const resultFaculty = []

      try {
        const fbVal = await fb.database().ref('faculty').once('value')
        const facultyList = fbVal.val()
        console.log(facultyList)
        Object.keys(facultyList).forEach(key => {
          const item = facultyList[key]
          resultFaculty.push(
            new Faculty(
              item.name, item.short_name, item.description, item.web_site, item.img, key
            )
          )
        })
        commit('loadFaculty', resultFaculty)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    facultyAll: state => {
      return state.faculty
    },
    facultyByName: state => name => {
      return state.faculty.find(item => item.name === name)
    },
    facultySearch: state => query => {
      return state.faculty.filter(
        item => item.name.match(query) || item.short_name.match(query)
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
  },
}
