import * as fb from 'firebase'
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
    async facultyCreate({ commit }, payload) {
      commit('setLoading', true)
      try {
        const newFaculty = new Faculty(
          payload.name,
          payload.short_name,
          payload.description,
          payload.web_site,
          payload.img
        )
        const faculty = await fb
          .database()
          .ref('faculty')
          .push(newFaculty)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error)
        commit('setLoading', false)
        throw error
      }
    },
    async facultyFetch({ commit }) {
      commit('setLoading', true)
      const resultFaculty = []

      try {
        const fbVal = await fb
          .database()
          .ref('faculty')
          .once('value')
        const facultyList = fbVal.val()
        Object.keys(facultyList).forEach(key => {
          const item = facultyList[key]
          resultFaculty.push(
            new Faculty(
              item.name,
              item.short_name,
              item.description,
              item.web_site,
              item.img,
              key
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
    },
    async facultyByName({ commit, getters }, name) {
      if (!getters.facultyByName(name)) {
        commit('setLoading', true)
        const db = fb.database().ref()
        try {
          const fbVal = await db
            .child('faculty')
            .orderByChild('name')
            .equalTo(name)
            .once('value')
          const key = Object.keys(fbVal.val())[0]
          const item = fbVal.val()[key]
          const facultyToReturn = new Faculty(
            item.name,
            item.short_name,
            item.description,
            item.web_site,
            item.img,
            key
          )
          commit('addFaculty', facultyToReturn)
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
  }
}
