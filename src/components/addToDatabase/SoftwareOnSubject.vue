<template>
  <v-layout column>
    <v-select
      v-model="faculty"
      label="Факультет"
      :items="facultyList.map(item => item.name)"
      solo
    />
    <v-select
      v-model="swsj.subject"
      label="Учебная программа"
      no-data-text="На этом факультете нет учебных программ!"
      :items="subjectList.filter(item => faculty ? item.faculty === faculty : true).map(item => item.name)"
      solo
    />
    <v-select
      v-model="swsj.software"
      :items="softwareList.map(item => item.name)"
      solo
      label="Программное обеспечение"
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

    <v-data-table
      :headers="headers"
      :items="softwareOnSubject"
      class="elevation-0"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ props.item.software }}</td>
        <td class="text-xs-right">{{ props.item.subject }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item.id)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      faculty: '',
      swsj: {
        subject: '',
        software: ''
      },
      softwareOnSubject: [{ software: 'blender', subject: '3д моделлинг' }],
      headers: [
        {
          text: 'Программное обеспечение',
          align: 'left',
          sortable: false,
          value: 'software'
        },
        { text: 'Учебная программа', value: 'subject', align: 'right' }
      ]
    }
  },
  computed: {
    subjectList() {
      return this.$store.getters.subjectAll
    },
    softwareList() {
      return this.$store.getters.softwareAll
    },
    facultyList() {
      return this.$store.getters.facultyAll
    },
    validity() {
      return this.swsj.subject && this.swsj.software
    }
  },
  created() {
    this.$store
      .dispatch('subjectFetch')
      .then(() => {})
      .catch(() => {})
    this.$store
      .dispatch('softwareFetch')
      .then(() => {})
      .catch(() => {})
    this.$store
      .dispatch('facultyFetch')
      .then(() => {})
      .catch(() => {})
    this.fetchCons()
  },
  methods: {
    createNew() {
      if (this.validity) {
        const subjectName = this.swsj.subject
        const softwareName = this.swsj.software
        const swsj = {
          subject: this.subjectList.find(item => item.name === subjectName).id,
          software: this.softwareList.find(item => item.name === softwareName)
            .id
        }
        this.$store
          .dispatch('addSoftwareOnSubject', swsj)
          .then(() => {
            this.fetchCons()
            this.clearInput(this.swsj)
          })
          .catch(() => {})
      }
    },
    fetchCons() {
      const sql =
        'SELECT software.name AS software, subject.name AS subject FROM softwareonsubject \n' +
        'LEFT JOIN software ON softwareonsubject.software = software.id\n' +
        'LEFT JOIN subject ON softwareonsubject.subject = subject.id'
      axios
        .post(this.$api, { type: 'get', data: sql })
        .then(response => {
          let result = []
          Object.keys(response.data).forEach(key => {
            result.push(response.data[key])
          })
          this.softwareOnSubject = result
        })
        .catch(error => {
          this.$store.dispatch(
            'setError',
            'Произошла ошибка при получении данных'
          )
          throw error
        })
    },
    deleteItem(id) {
      const params = {
        id: id,
        type: 'swsj'
      }
      this.$store.dispatch('deleteFromDb', params)
    },
    clearInput(object) {
      Object.keys(object).forEach(key => {
        object[key] = ''
      })
    }
  }
}
</script>
