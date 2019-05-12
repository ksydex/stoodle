<template>
  <v-container
    fluid
    class="mx-0 px-0 pt-0 pa-0"
  >
    <v-layout column>
      <v-layout row>
        <v-flex
          xs0
          sm0
          md2
          xl1
        />
        <v-flex>
          <v-tabs slider-color="primary">
            <v-tab
              v-for="n in ['Все', 'Программное обеспечение', 'Договоры', 'Учебные программы', 'Факультеты']"
              :key="n"
            >
              {{ n }}
            </v-tab>
          </v-tabs>
        </v-flex>
      </v-layout>
      <v-divider class="primary lighten-4" />
      <v-layout
        row
        mt-2
      >
        <!-- ### пустой блок для отступа ### -->
        <v-flex
          xs0
          sm1
          md2
          xl1
        />
        <!-- ### пустой блок для отступа ### -->
        <v-flex
          xs12
          sm10
          md7
          xl5
        >
          <div
            class="mb-2"
            v-for="item in query"
            :key="item.title"
          >
            <h3 class="text-main--text subheading ml-2">
              {{ item.title }}
            </h3>
            <v-layout row>
              <v-divider
                class="mx-2"
                inset
                vertical
              ></v-divider>
              <v-layout
                column
                v-if="result[item.type].length !== 0"
              >
                <search-card
                  v-for="subItem in result[item.type]"
                  :key="subItem.name"
                  :data="subItem"
                  :card_type="item.type"
                  class="mb-2 search-card"
                />
              </v-layout>
            </v-layout>
          </div>

        </v-flex>
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
    return {}
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
          type: 'faculty',
          title: 'Факультеты'
        }
      ]
      return resultsQuery.filter(item => {
        return this.result[item.type] !== null
      })
    }
  },
  methods: {}
}
</script>
