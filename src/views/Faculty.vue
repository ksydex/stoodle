<template>
  <v-container>
    <v-layout column>
      <v-layout
        justify-center
        row
        :wrap="$vuetify.breakpoint.xs"
      >
        <v-flex
          align-center
          xs12
          md6
          d-flex
          pa-4
          :mt-4="$vuetify.breakpoint.xs"
        >
          <v-img
            max-height="300px"
            :src="faculty.img"
            contain
          />
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <v-layout
            row
            wrap
            align-center
            mb-3
            justify-space-between
          >
            <h1 class="display-1 text-main--text">
              {{ faculty.name }}
            </h1>
            <v-btn
              flat
              class="blue--text text--darken-1 px-2 mx-0"
              @click="searchGoogle(faculty.name)"
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
          <v-layout
            row
            class="mb-2"
          >
            <h2 class="title text-main--text text--lighten-2 mr-2">
              Веб-сайт -
            </h2>
            <a
              class="title primary--text"
              target="_blank"
              :href="faculty.web_site"
            >
              {{ faculty.web_site.replace(/https:\/\/|http:\/\//gi,'') }}
            </a>
          </v-layout>

          <p class="subheading text-main--text">
            {{ faculty.description }}
          </p>
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
            Учебные программы
          </h1>
          <v-list>
            <v-list-tile
              v-for="subject in subjects"
              :key="subject.name"
              class="mb-2"
            >
              <v-list-tile-content>
                <v-list-tile-title
                  id="link"
                  @click="$router.push('/subject/'+subject.name)"
                  v-text="subject.name"
                />
                <v-list-tile-sub-title v-text="subject.faculty" />
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
    faculty() {
      const name = this.name
      return this.$store.getters.facultyByName(name)
    }
  },
  methods: {
    searchGoogle(name) {
      window.open('https://www.google.com/search?q=' + name)
    }
  }
}
</script>

<style scoped>
#ss {
  background-color: red !important;
}
</style>
