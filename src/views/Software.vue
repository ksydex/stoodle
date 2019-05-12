<template>
  <v-container v-if="software && similarSoftware">
    <v-layout
      v-if="software"
      column
    >
      <v-layout
        justify-center
        row
        :wrap="$vuetify.breakpoint.xs"
      >
        <v-flex
          xs12
          md6
          px-5
          mb-4
          :mt-4="!$vuetify.breakpoint.xs"
        >
          <v-img
            :src="software.img"
            height="200px"
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
              {{ software.name }}
            </h1>
            <v-btn
              flat
              class="blue--text text--darken-1 px-2 mx-0"
              @click="searchGoogle(software.name)"
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
          <h2 class="title text-main--text text--lighten-2 mb-1">
            {{ `${software.card_type} - ${software.type}` }}
          </h2>
          <h2 class="title text-main--text text--lighten-2 mb-1">
            {{ `Год - ${software.year}` }}
          </h2>
          <h2 class="title text-main--text text--lighten-2 mb-2">
            {{ `Тип лицензии - ${software.license}` }}
          </h2>

          <p class="subheading text-main--text">
            {{ software.description }}
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
            Используется на учебных программах
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
        <v-flex
          xs12
          md6
        >
          <h1 class="headline text-main--text mb-3">
            Похожее программное обеспечение
          </h1>
          <search-card
            v-for="soft in similarSoftware"
            :key="soft.name"
            :data="soft"
            card_type="software"
            color="transparent"
            class="text-main--text mb-3 search-card"
          />
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
    software() {
      const name = this.name
      return this.$store.getters.softwareByName(name)
    },
    similarSoftware() {
      const params = {
        type: this.software.type,
        exceptName: this.software.name
      }
      return this.$store.getters.softwareSimilar(params)
    }
  },
  methods: {
    searchGoogle(name) {
      window.open('https://www.google.com/search?q=' + name)
    }
  }
}
</script>
