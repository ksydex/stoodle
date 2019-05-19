<template>
  <v-layout column>
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
    <v-btn
      depressed
      round
      class="ma-0"
      :disabled="loading"
      :loading="loading"
      color="primary"
      @click="createNew()"
    >
      Добавить
    </v-btn>

  </v-layout>
</template>

<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        subject: {
          name: '',
          discipline: '',
          faculty: ''
        }
      }
    },
    computed: {
      facultyList() {
        return this.$store.getters.facultyAllNameAndId
      },
    },
    created() {
      this.$store
        .dispatch('facultyFetch')
        .then(() => {})
        .catch(() => {})
    },
    methods: {
      createNew() {
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
            this.clearInput(this.subject)
            this.$store.dispatch(
              'setSuccess',
              'Запись успешно добавлена в таблицу!'
            )
          })
          .catch(() => {})
      },
      clearInput(object) {
        Object.keys(object).forEach(key => {
          object[key] = ''
        })
      }
    }
  }
</script>
