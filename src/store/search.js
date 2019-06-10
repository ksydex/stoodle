export default {
  getters: {
    searchAll: (state, getters) => query => {
      let result = {}
      const searchQuery = query
      result.software = getters.softwareSearch(searchQuery)
      result.subject = getters.subjectSearch(searchQuery)
      result.faculty = getters.facultySearch(searchQuery)
      result.discipline = getters.disciplineSearch(searchQuery)
      result.speciality = getters.specialitySearch(searchQuery)
      return result
    },
    searchAutocomplete: (state, getters) => query => {
      let result = []
      getters.softwareAutocomplete(query).forEach(item => result.push(item))
      getters.subjectAutocomplete(query).forEach(item => result.push(item))
      getters.facultyAutocomplete(query).forEach(item => result.push(item))
      getters.disciplineAutocomplete(query).forEach(item => result.push(item))
      getters.specialityAutocomplete(query).forEach(item => result.push(item))
      return result
    }
  }
}
