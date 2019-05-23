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
        faculty: '',
        swsj: {
          subject: '',
          software: ''
        }
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
    },
    methods: {
      createNew() {
        if(this.validity) {
          const subjectName = this.swsj.subject
          const softwareName = this.swsj.software
          const swsj = {
            subject: this.subjectList.find(item => item.name === subjectName).id,
            software: this.softwareList.find(item => item.name === softwareName).id,
          }
          this.$store
            .dispatch('addSoftwareOnSubject', swsj)
            .then(() => {
              this.clearInput(this.swsj)
            })
            .catch(() => {})
        }
      },
      clearInput(object) {
        Object.keys(object).forEach(key => {
          object[key] = ''
        })
      }
    }
  }
</script>
