<template>
  <v-container>
    <v-layout
      row
      justify-center
    >
      <v-flex
        xs12
        md8
        xl6
      >
        <v-layout column>
          <v-flex
            class="text-xs-center mb-3"
            xs6
          >
            <h4 class="display-1 text-main--text mb-3">
              {{ currentType.title }}
            </h4>
            <h4 class="display-1 text-main--text mb-3">
              {{ currentType.subTitle }}
            </h4>
            <v-divider />
          </v-flex>
          <v-flex xs6>
            <search-card
              v-for="item in data"
              :key="item.name"
              :data="item"
              :card-type="currentType.type"
              class="mb-2 search-card"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: null,
      required: true
    },
    query: {
      type: String,
      default: null,
      required: true
    },
    queryType: {
      type: String,
      default: null,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    currentType() {
      const title = {
        license: `Лицензия - ${this.query}`,
        type: `Тип ПО - ${this.query}`,
        year: `Год - ${this.query}`
      }
      const types = [
        { type: 'software', title: `Программное обеспечение`, subTitle: title[this.queryType] },
        { type: 'subject', title: 'Учебные программы', subTitle: title[this.queryType]},
        { type: 'faculty', title: 'Факультеты', subTitle: title[this.queryType]}
      ]
      return types.find(item => item.type === this.type)
    },
    data() {
      const type = this.type
      const querySet = {
        query: this.query,
        type: this.queryType
      }
      const types = {
        software: () => {
          return this.$store.getters.softwareByQuery(querySet)
        },
        subject: () => {
          return this.$store.getters.subjectAll
        },
        faculty: () => {
          return this.$store.getters.facultyAll
        }
      }
      return types[type]()
    }
  }
}
</script>
