<template>
  <v-container fluid class="mx-0 px-0 pt-0 pa-0">
    <v-layout column>
      <v-layout row>
        <v-flex xs0 sm0 md2 xl1/>
        <v-flex>
          <v-tabs slider-color="primary">
            <v-tab
              v-for="type in typeSwitch"
              :key="type.name"
              @click="setType(type.name)"
            >{{ type.name }}</v-tab>
          </v-tabs>
        </v-flex>
      </v-layout>
      <v-divider class="primary lighten-4"/>
      <v-layout v-if="query.length !== 0" row mt-2>
        <!-- ### пустой блок для отступа ### -->
        <v-flex xs0 sm1 md2 xl1/>
        <!-- ### пустой блок для отступа ### -->
        <v-flex xs12 sm10 md7 xl5>
          <div v-for="item in query" :key="item.title" class="mb-2">
            <h3
              class="text-main--text subheading ml-2 link"
              @click="$router.push('/'+item.type)"
            >{{ item.title }}</h3>
            <v-layout row>
              <v-divider class="mx-2" inset vertical/>
              <v-layout v-if="result[item.type].length !== 0" column>
                <search-card
                  v-for="subItem in result[item.type]"
                  :key="subItem.name"
                  :data="subItem"
                  :card-type="item.type"
                  class="mb-2 search-card"
                />
              </v-layout>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
      <v-layout v-else justify-center ma-5 row>
        <v-flex xs0 sm0 md2 xl1/>
        <no-data/>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    searchQuery: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      typeSwitch: [
        { name: 'Все', sort: null },
        { name: 'Программное обеспечение', sort: 'software' },
        { name: 'Учебные программы', sort: 'subject' },
        { name: 'Факультеты', sort: 'faculty' },
        { name: 'Дисциплины', sort: 'discipline' },
        { name: 'Направления', sort: 'speciality' }
      ],
      currentType: { name: 'Все', sort: null }
    }
  },
  computed: {
    result() {
      const query = this.searchQuery
        .replace(/\s/g, '\x5cs{0,}')
        .replace(/\+/g, '\x5c+')
      const queryRegEx = new RegExp(query, 'gi')
      return this.$store.getters.searchAll(queryRegEx)
    },
    query() {
      // порядок вывода карточек
      const resultsQuery = [
        {
          type: 'software',
          title: 'Программное обеспечение'
        },
        {
          type: 'subject',
          title: 'Учебные программы'
        },

        {
          type: 'discipline',
          title: 'Дисциплины'
        },
        {
          type: 'speciality',
          title: 'Направления'
        },
        {
          type: 'faculty',
          title: 'Факультеты'
        }
      ]
      if (this.currentType.sort)
        return resultsQuery.filter(
          item =>
            this.result[item.type] &&
            this.result[item.type].length !== 0 &&
            this.currentType.sort === item.type
        )
      else
        return resultsQuery.filter(
          item => this.result[item.type] && this.result[item.type].length !== 0
        )
    }
  },
  methods: {
    setType(name) {
      this.currentType = this.typeSwitch.find(item => item.name === name)
    }
  }
}
</script>
