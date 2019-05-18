<template>
  <v-container>
    <v-layout column>
      <h4 class="display-1 text-main--text mb-3">Добавить новую запись</h4>
      <v-tabs
        color="transparent"
        slider-color="primary"
      >
        <v-tab
          v-for="type in typeSwitcher"
          :key="type"
          ripple
          @click="currentType = type.type"
        >
          {{ type.title }}
        </v-tab>
      </v-tabs>
      <v-divider class="mb-3" />
      <v-flex v-if="currentType === 'software'">
        <v-text-field
          v-model="software.name"
          label="Название"
          solo
        />
        <v-text-field
          v-model="software.type"
          label="Тип программы"
          solo
        />
        <v-text-field
          v-model="software.year"
          label="Год"
          solo
        />
        <!--        // TODO сделать запрос на поиск типов лицензий -->
        <v-select
          v-model="software.license"
          :items="facultyList.map(item => item.name)"
          solo
          label="Тип лицензии"
        />
        <v-text-field
          v-model="software.description"
          label="Описание"
          solo
        />
        <v-text-field
          v-model="software.img"
          label="Изображение"
          solo
        />
      </v-flex>

      <v-flex v-if="currentType === 'subject'">
        <v-text-field
          v-model="subject.name"
          label="Название"
          solo
        />
        <v-text-field
          v-model="subject.discipline"
          label="Дисциплина"
          solo
        />
        <v-select
          v-model="subject.faculty"
          :items="facultyList.map(item => item.name)"
          solo
          label="Факультет"
        />
      </v-flex>

      <v-flex v-if="currentType === 'faculty'">
        <v-text-field
          v-model="faculty.name"
          label="Название"
          solo
        />
        <v-text-field
          v-model="faculty.short_name"
          label="Сокращение"
          solo
        />
        <v-text-field
          v-model="faculty.description"
          label="Описание"
          solo
        />
        <v-text-field
          v-model="faculty.web_site"
          label="Веб-сайт"
          solo
        />
        <v-text-field
          v-model="faculty.img"
          label="Ссылка на изображение"
          solo
        />
      </v-flex>

      <v-btn
        flat
        :disabled="loading"
        :loading="loading"
        class="primary"
        @click="createNew()"
      >
        Добавить
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      software: {
        name: '',
        type: '',
        year: '',
        license: '',
        description: '',
        img: ''
      },
      subject: {
        name: '',
        discipline: '',
        faculty: ''
      },
      faculty: {
        name: '',
        short_name: '',
        description: '',
        web_site: '',
        img: ''
      },
      typeSwitcher: [
        { type: 'software', title: 'Программное обеспечение' },
        { type: 'faculty', title: 'Учебная программа' },
        { type: 'subject', title: 'Факультет' }
      ],
      currentType: 'software'
    }
  },
  computed: {
    facultyList() {
      return this.$store.getters.facultyAllNameAndId
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  created() {
    this.$store
      .dispatch('fetchFaculty')
      .then(() => {})
      .catch(() => {})
  },
  methods: {
    createNew() {
      let clearObject = object => {
        for (let i in object) object[i] = ''
      }

      const type = this.currentType
      const create = {
        subject: () => {
          const subject = {
            name: this.subject.name,
            discipline: this.subject.discipline,
            faculty: this.facultyList.find(
              item => item.name === this.subject.faculty
            ).id
          }
          this.$store
            .dispatch('subjectCreate', subject)
            .then(() => {
              clearObject(this.subject)
              this.$store.dispatch(
                'setSuccess',
                'Запись успешно добавлена в таблицу!'
              )
            })
            .catch(() => {})
        },
        faculty: () => {
          const faculty = {
            name: this.faculty.name,
            short_name: this.faculty.short_name,
            description: this.faculty.description,
            web_site: this.faculty.web_site,
            img: this.faculty.web_site
          }
          this.$store
            .dispatch('facultyCreate', faculty)
            .then(() => {
              clearObject(this.faculty)
              this.$store.dispatch(
                'setSuccess',
                'Запись успешно добавлена в таблицу!'
              )
            })
            .catch(() => {})
        }
      }
      create[type]()
    }
  }
}
</script>

<style lang="scss" scoped>
#custom {
  border-radius: 0 !important;
  box-shadow: none !important;
  border: none !important;
}
.logo-home {
  height: 75px;
}
</style>
