<template>
  <v-container>
    <v-layout
      v-if="!loading && data"
      column
    >
      <v-layout
        row
        :wrap="$vuetify.breakpoint.xs"
        justify-center
      >
        <v-flex
          v-if="data.img !== null"
          align-center
          xs12
          sm4
          lg3
          d-flex
          pa-4
          mr-4
          :mt-4="$vuetify.breakpoint.xs"
        >
          <v-img
            height="250"
            :src="data.img"
            contain
          />
        </v-flex>
        <v-flex
          xs12
          :md6="data.img"
          :md9="!data.img"
        >
          <v-layout
            row
            wrap
            align-center
            mb-3
            justify-space-between
          >
            <h1 class="display-1 text-main--text">
              {{ data.title }}
            </h1>
            <v-btn
              flat
              class="blue--text text--darken-1 px-2 mx-0"
              @click="searchGoogle(data.title)"
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
          <!-- eslint-disable -->
          <h2
            :class="{
              link: data.info1.link,
              'title mb-2': true,
              'primary--text': type === 'faculty',
              'text-main--text text--lighten-2': type !== 'faculty'
            }"
            v-if="data.info1 !== null"
            @click="
              type !== 'faculty'
                ? $router.push(data.info1.link)
                : openWindow(data.info1.link)
            "
          >
            {{ data.info1.text }}
          </h2>
          <h2
            :class="{
              link: data.info2.link,
              'title text-main--text text--lighten-2 mb-2': true
            }"
            v-if="data.info2 !== null"
            @click="$router.push(data.info2.link)"
          >
            {{ data.info2.text }}
          </h2>
          <h2
            :class="{
              link: data.info3.link,
              'title text-main--text text--lighten-2 mb-2': true
            }"
            class="title text-main--text text--lighten-2 mb-2"
            v-if="data.info3 !== null"
            @click="$router.push(data.info3.link)"
          >
            {{ data.info3.text }}
          </h2>
          <p
            class="subheading text-main--text"
            v-if="data.description !== null"
          >
            {{ data.description }}
          </p>
        </v-flex>
      </v-layout>
      <v-divider class="my-3" />
      <v-layout row wrap>
        <component :is="moreComponent.is" :data="moreComponent.data" />
      </v-layout>
    </v-layout>
    <v-layout v-else-if="loading" justify-center>
      <v-progress-circular
        class="mt-5"
        :size="150"
        :width="7"
        color="primary"
        indeterminate
      />
    </v-layout>
    <v-layout v-else-if="!data">
      <no-data />
    </v-layout>
  </v-container>
</template>

<script>
import softwareMore from '../components/moreComponent/SoftwareMore.vue'
import subjectMore from '../components/moreComponent/SubjectMore.vue'
import facultyMore from '../components/moreComponent/FacultyMore.vue'

export default {
  components: {
    softwareMore,
    subjectMore,
    facultyMore
  },
  props: {
    type: {
      type: String,
      required: false,
      default: null
    },
    id: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {
    moreComponent() {
      const type = this.type
      const component = {
        software: {
          is: 'softwareMore',
          data: this.dataSet
        },
        subject: {
          is: 'subjectMore',
          data: this.dataSet
        },
        faculty: {
          is: 'facultyMore',
          data: this.dataSet
        }
      }
      return component[type]
    },
    dataSet() {
      const type = this.type
      const id = this.id
      const dataSet = {
        software: () => this.$store.getters.softwareById(id),
        subject: () => this.$store.getters.subjectById(id),
        faculty: () => this.$store.getters.facultyById(id)
      }
      return dataSet[type]()
    },
    data() {
      const type = this.type
      if (this.dataSet) {
        const data = {
          software: () => {
            return {
              title: this.dataSet.name,
              info1: {
                text: `Программное обеспечение - ${this.dataSet.type}`,
                link: '/software/q=type-' + this.dataSet.type
              },
              info2: {
                text: `Год - ${this.dataSet.year}`,
                link: '/software/q=year-' + this.dataSet.year
              },
              info3: {
                text: `Тип лицензии - ${this.dataSet.license}`,
                link: '/software/q=license-' + this.dataSet.license
              },
              description: this.dataSet.description,
              img: this.dataSet.img
            }
          },
          subject: () => {
            return {
              title: this.dataSet.name,
              info1: {
                text: `Дисциплина - ${this.dataSet.discipline}`,
                link: '/discipline/' + this.dataSet.disciplineId
              },
              info2: {
                text: this.dataSet.faculty,
                link: '/faculty/' + this.dataSet.facultyId
              },
              info3: null,
              description: null,
              img: null
            }
          },
          faculty: () => {
            return {
              title: this.dataSet.name,
              info1: {
                text:
                  'Сайт - ' +
                  this.dataSet.web_site.replace(/https:\/\/|http:\/\//gi, ''),
                link: this.dataSet.web_site
              },
              info2: null,
              info3: null,
              description: this.dataSet.description,
              img: this.dataSet.img
            }
          }
        }
        return data[type]()
      } else return null
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  created() {
    const toLoad = {
      software: () => {
        this.$store.dispatch('softwareById', this.id)
      },
      subject: () => {
        this.$store.dispatch('subjectById', this.id)
      },
      faculty: () => {
        this.$store.dispatch('facultyById', this.id)
      }
    }
    toLoad[this.type]()
  },
  updated() {
    const toLoad = {
      software: () => {
        this.$store.dispatch('softwareById', this.id)
      },
      subject: () => {
        this.$store.dispatch('subjectById', this.id)
      },
      faculty: () => {
        this.$store.dispatch('facultyById', this.id)
      }
    }
    toLoad[this.type]()
  },
  methods: {
    searchGoogle(name) {
      window.open('https://www.google.com/search?q=' + name)
    },
    openWindow(url) {
      window.open(url)
    }
  }
}
</script>
