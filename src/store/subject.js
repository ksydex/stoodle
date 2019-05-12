export default {
  state: {
    subject: [
      {
        name: 'Информационные технологии в практической деятельности',
        discipline: 'Информационные технологии',
        faculty: 'Факультет вычислительной техники',
      },
      {
        name: 'Правовое обеспечение в практической деятельности',
        discipline: 'Информационные технологии',
        faculty: 'Факультет экономики и управления',
      },
      {
        name: 'Программирование С++',
        discipline: 'Программирование',
        faculty: 'Факультет вычислительной техники',
      },
      {
        name: 'Объектно-ориентированное программирование',
        discipline: 'Программирование',
        faculty: 'Факультет вычислительной техники',
      },
    ],
  },
  mutations: {},
  actions: {},
  getters: {
    subjectByName: state => name => {
      return state.subject.find(item => item.name === name)
    },
    subjectSimilar: state => ({ faculty, exceptName }) => {
      return state.subject.filter(
        item => item.faculty === faculty && item.name !== exceptName
      )
    },
    subjectSearch: state => query => {
      return state.subject.filter(item => item.name.match(query))
    },
  },
}
