<template>
  <v-container>
    <v-layout column>
      <v-layout
        row
        :wrap="$vuetify.breakpoint.xs"
      >
        <v-flex
          v-if="data.img !== null"
          align-center
          xs12
          md6
          d-flex
          pa-4
          :mt-4="$vuetify.breakpoint.xs"
        >
          <v-img
            max-height="300px"
            :src="data.img"
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
          <v-layout row class="mb-2" v-html="data.info1"> </v-layout>
          <h2
            class="title text-main--text text--lighten-2 mb-2"
            v-if="data.info2 !== null"
          >
            {{ data.info2 }}
          </h2>
          <h2
            class="title text-main--text text--lighten-2 mb-2"
            v-if="data.info3 !== null"
          >
            {{ data.info3 }}
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
      <!-- // TODO сделать кастомные блоки -->
      <v-layout row wrap>
        <component :is="moreComponent.is" :data="moreComponent.data" />
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import softwareMore from "../components/moreComponent/SoftwareMore.vue";
export default {
  components: {
    softwareMore
  },
  props: {
    type: {
      type: String,
      required: false,
      default: null
    },
    name: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {
    moreComponent() {
      const type = this.type;
      const component = {
        software: {
          is: "softwareMore",
          data: this.dataSet
        },
        subject: {
          is: "subjectMore",
          data: true
        },
        faculty: {
          is: "facultyMore",
          data: true
        }
      };
      return component[type];
    },
    dataSet() {
      const type = this.type;
      const name = this.name;
      const dataSet = {
        software: () => this.$store.getters.softwareByName(name),
        subject: () => this.$store.getters.subjectByName(name),
        faculty: () => this.$store.getters.facultyByName(name)
      };
      return dataSet[type]();
    },
    data() {
      const type = this.type;
      const data = {
        software: () => {
          return {
            title: this.dataSet.name,
            info1: `<h2 class="title text-main--text text--lighten-2"> Программное обеспечение - ${
              this.dataSet.type
            } </h2>`,
            info2: `Год - ${this.dataSet.year}`,
            info3: `Тип лицензии - ${this.dataSet.license}`,
            description: this.dataSet.description,
            img: this.dataSet.img
          };
        },
        subject: () => {
          return {
            title: this.dataSet.name,
            info1: `<h2 class="title text-main--text text--lighten-2"> Дисциплина - ${
              this.dataSet.discipline
            } </h2>`,
            info2: this.dataSet.faculty,
            info3: null,
            description: null,
            img: null
          };
        },
        faculty: () => {
          return {
            title: this.dataSet.name,
            info1: `<h2 class="title text-main--text text--lighten-2 mr-2">
              Веб-сайт -
            </h2>
            <a
              class="title primary--text"
              target="_blank"
              href="${this.dataSet.web_site}"
            >
              ${this.dataSet.web_site.replace(/https:\/\/|http:\/\//gi, "")}
            </a>`,
            info2: null,
            info3: null,
            description: this.dataSet.description,
            img: this.dataSet.img
          };
        }
      };
      return data[type]();
    }
  },
  methods: {
    searchGoogle(name) {
      window.open("https://www.google.com/search?q=" + name);
    }
  }
};
</script>
