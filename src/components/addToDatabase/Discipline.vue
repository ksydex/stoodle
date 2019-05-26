<template>
  <v-layout column>
    <v-text-field
      v-model="discipline.name"
      label="Название"
      solo
    />
    <v-text-field
      v-model="discipline.description"
      label="Описание"
      maxlength="500"
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
      :items="allDiscipline"
      class="elevation-0"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.description }}</td>
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
        discipline: {
          name: '',
          description: ''
        },
        headers: [
          {
            text: 'Дисциплина',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Описание', value: 'discipline', align: 'right' }
        ],
      }
    },
    computed: {
      allDiscipline() {
        return this.$store.getters.disciplineAll
      }
    },
    created() {
      this.$store
        .dispatch('disciplineFetch')
        .then(() => {})
        .catch(() => {})
    },
    methods: {
      createNew() {
        const discipline = {
          name: this.discipline.name,
          description: this.discipline.description
        }
        this.$store
          .dispatch('disciplineCreate', discipline)
          .then(() => {
            this.clearInput(this.discipline)
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
