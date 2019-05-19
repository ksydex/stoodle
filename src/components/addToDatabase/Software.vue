<template>
  <v-layout column>
    <v-text-field
      v-model="software.name"
      label="Название"
      solo
    />
    <v-select
      v-model="software.license"
      :items="softwareTypeList"
      solo
      label="Тип ПО"
    />
    <v-text-field
      v-model="software.year"
      label="Год"
      solo
    />
    <v-select
      v-model="software.license"
      :items="softwareLicenseList"
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
    <v-btn
      depressed
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
        software: {
          name: '',
          type: '',
          year: '',
          license: '',
          description: '',
          img: ''
        }
      }
    },
    computed: {
      softwareTypeList() {
        return this.$store.getters.softwareTypeAll
      },
      softwareLicenseList() {
        return this.$store.getters.softwareLicenseAll.map(item => item.name)
      }
    },
    created() {
    },
    methods: {
      createNew() {
        const software = {
          name: this.software.name,
          type: this.software.type,
          year: this.software.year,
          license: this.software.license,
          description: this.software.description,
          img: this.software.img
        }
        this.$store
          .dispatch('softwareCreate', software)
          .then(() => {
            this.clearInput(this.software)
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
