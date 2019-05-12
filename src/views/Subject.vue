<template>
  <v-container>
    <v-layout column>
      <v-layout
        row
        :wrap="$vuetify.breakpoint.xs"
      >
        <v-flex xs12>
          <v-layout
            row
            wrap
            align-center
            mb-3
            justify-space-between
          >
            <h1 class="display-1 text-main--text">
              {{ subject.name }}
            </h1>
            <v-btn
              flat
              class="blue--text text--darken-1 px-2 mx-0"
              @click="searchGoogle(subject.name)"
            >
              Поиск в Google
              <v-icon
                right
                dark
              >
                search
              </v-icon>
            </v-btn>
          </v-layout>
          <h2 class="title text-main--text text--lighten-2 mb-2">
            {{ `Дисциплина - ${subject.discipline}` }}
          </h2>
          <h2
            class="link title text-main--text text--lighten-2 mb-1"
            @click="$router.push('/faculty/'+subject.faculty)"
          >
            {{ subject.faculty }}
          </h2>
        </v-flex>
      </v-layout>
      <v-divider class="my-3" />
      <v-layout
        row
        wrap
        justify-center
      >
        <v-flex
          xs12
          md6
        >
          <h1 class="headline text-main--text mb-3">
            Используемое ПО
          </h1>
          <search-card
            v-for="(soft, index) in software"
            :key="index"
            :soft="soft"
            color="transparent"
            class="text-main--text mb-3 search-card"
          />
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <h1 class="headline text-main--text mb-3">
            Похожие учебные программы
          </h1>
          <v-list>
            <v-list-tile
              v-for="subjectItem in similarSubjects"
              :key="subjectItem.name"
              class="mb-2"
            >
              <v-list-tile-content>
                <v-list-tile-title
                  class="link text-main--text"
                  @click="$router.push('/subject/'+subjectItem.name)"
                  v-text="subjectItem.name"
                />
                <v-list-tile-sub-title
                  class="link text-main--text text--lighten-2"
                  @click="$router.push('/faculty/'+subjectItem.faculty)"
                  v-text="subjectItem.faculty"
                />
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    subject() {
      const name = this.name
      return this.$store.getters.subjectByName(name)
    },
    similarSubjects() {
      const params = {
        faculty: this.subject.faculty,
        exceptName: this.subject.name
      }
      return this.$store.getters.subjectSimilar(params)
    },
    usedSoftware() {
      return true
      // TODO сделать метод получения используемого ПО
    }
  },
  methods: {
    searchGoogle(name) {
      window.open('https://www.google.com/search?q=' + name)
    }
  }
}
</script>
