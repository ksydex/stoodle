export default {
  state: {},
  mutations: {},
  actions: {},
  getters: {
    searchAll: (state, getters) => query => {
      let result = {}
      const searchQuery = query
      result.software = getters.softwareSearch(searchQuery)
      result.subject = getters.subjectSearch(searchQuery)
      result.faculty = null
      return result
    },
  },
}
