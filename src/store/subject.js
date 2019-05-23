import * as fb from 'firebase'
class Subject {
  constructor(name, discipline, faculty, id = null) {
    this.name = name
    this.discipline = discipline
    this.faculty = faculty
    this.id = id
  }
}

export default {
  state: {
    subject: [
    ]
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
      commit('setLoading', true)
      try {
        const newSubject = new Subject(
          payload.name,
          payload.discipline,
          payload.faculty
        )
        const db = fb.database().ref()
        const subject = await db
          .child('subject')
          .push(newSubject)
        const subjectOnFaculty = await db.child('faculty').child(payload.faculty).child('subjects').child(subject.key).set('1')
        commit('addSubject', newSubject)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error)
        commit('setLoading', false)
        throw error
      }
    },
    async subjectFetch({ commit }) {
      commit('setLoading', true)
      const resultSubject = []
      const db = fb.database().ref()
      try {
        const fbVal = await db.child('subject').once('value')
        const subjectList = fbVal.val()
        Object.keys(subjectList).forEach(async key => {
          const item = subjectList[key]
          const facultyId = item.faculty
          const facultyName = await db
            .child('faculty')
            .child(facultyId)
            .child('name')
            .once('value')
          resultSubject.push(
            new Subject(item.name, item.discipline, facultyName.val(), key)
          )
        })
        commit('loadSubject', resultSubject)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error)
        commit('setLoading', false)
        throw error
      }
    },
    async subjectByName({ commit, getters }, name) {
      if (!getters.subjectByName(name)) {
        commit('setLoading', true)
        const db = fb.database().ref()
        try {
          const fbVal = await db
            .child('subject')
            .orderByChild('name')
            .equalTo(name).once('value')
          const key = Object.keys(fbVal.val())[0]
          const item = fbVal.val()[key]
          const facultyId = item.faculty
          const facultyName = await db
            .child('faculty')
            .child(facultyId)
            .child('name')
            .once('value')
          const subjectToReturn = new Subject(item.name, item.discipline, facultyName.val(), key)

          commit('addSubject', subjectToReturn)
          commit('setLoading', false)
        } catch (error) {
          commit('setError', error)
          commit('setLoading', false)
          throw error
        }
      }
    },
    async addSoftwareOnSubject ({ commit }, swsj){
      commit('setLoading', true)
      const db = fb.database().ref()
      try {
        const fbVal = await db.child('subject').child(swsj.subject).child('usedSoftware').child(swsj.software).once('value')
        if(!fbVal.val()) {
          db.child('subject').child(swsj.subject).child('usedSoftware').child(swsj.software).set('1')
          commit('setSuccess', 'Запись успешно добавлена в таблицу!')
        }
        else
          commit('setError', "ПО уже используется на учебной программе")
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error)
        throw error
      }
    }
  },
  getters: {
    subjectAll: state => {
      return state.subject
    },
    subjectByName: (state, dispatch) => name => {
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
    subjectAutocomplete: state => query => {
      if (query && !!query.trim()) {
        const strings = state.subject.map(item => item.name)
        return strings.filter(item => item.match(new RegExp(query, 'gi')))
      } else return []
    }
  }
}
