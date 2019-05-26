<template>
  <v-layout column>
    <v-text-field
      v-model="subject.name"
      label="Название"
      solo
    />
    <v-select
      v-model="subject.discipline"
      :items="disciplineList.map(item => item.name)"
      solo
      label="Дисциплина"
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
      class="ma-0 mb-4"
      :disabled="loading"
      :loading="loading"
      color="primary"
      @click="createNew()"
    >
      Добавить
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="allSubject"
      class="elevation-0"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.discipline }}</td>
        <td class="text-xs-right">{{ props.item.faculty }}</td>
      </template>
    </v-data-table>
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
        },
        headers: [
          {
            text: 'Учебная программа',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Дисциплина', value: 'discipline', align: 'right' },
          { text: 'Факультет', value: 'faculty',align: 'right' }
        ],
      }
    },
    computed: {
      facultyList() {
        return this.$store.getters.facultyAll.map(item => {
          return {id: item.id, name: item.name}
        })
      },
      disciplineList() {
        return this.$store.getters.disciplineAll.map(item => {
          return {id: item.id, name: item.name}
        })
      },
      allSubject() {
        return this.$store.getters.subjectAll
      }
    },
    created() {
      this.$store.dispatch('facultyFetch')
      this.$store.dispatch('disciplineFetch')
      this.$store.dispatch('subjectFetch')
    },
    methods: {
      createNew() {
        const subject = {
          name: this.subject.name,
          discipline: this.subject.discipline,
          disciplineId: this.disciplineList.find(
            item => item.name === this.subject.discipline).id,
          faculty: this.subject.faculty,
          facultyId: this.facultyList.find(
            item => item.name === this.subject.faculty
          ).id
        }
        this.$store
          .dispatch('subjectCreate', subject)
          .then(() => {
            this.clearInput(this.subject)
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
