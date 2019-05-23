<template>
  <v-layout column>
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
      :items="allFaculty"
      class="elevation-0"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.short_name }}</td>
        <td class="text-xs-right">{{ props.item.web_site }}</td>
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
        faculty: {
          name: '',
          short_name: '',
          description: '',
          web_site: '',
          img: ''
        },
        headers: [
          {
            text: 'Факультет',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Аббревиатура', value: 'short_name', align: 'right' },
          { text: 'Веб-сайт', value: 'web_site',align: 'right' }
        ],
      }
    },
    computed: {
      allFaculty() {
        return this.$store.getters.facultyAll
      }
    },
    created() {
      this.$store.dispatch('facultyFetch')
    },
    methods: {
      createNew() {
        const faculty = {
          name: this.faculty.name,
          short_name: this.faculty.short_name,
          description: this.faculty.description,
          web_site: this.faculty.web_site,
          img: this.faculty.img
        }
        this.$store
          .dispatch('facultyCreate', faculty)
          .then(() => {
            this.clearInput(this.faculty)
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
