<template>
  <v-layout column>
    <v-text-field
      v-model="software.name"
      label="Название"
      solo
    />
    <v-select
      v-model="software.type"
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
      :items="allSoftware"
      class="elevation-0"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.type }}</td>
        <td class="text-xs-right">{{ props.item.year }}</td>
        <td class="text-xs-right">{{ props.item.license }}</td>
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
        software: {
          name: '',
          type: '',
          year: '',
          license: '',
          description: '',
          img: ''
        },
        headers: [
          {
            text: 'Программное обеспечение',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Тип', value: 'type', align: 'right'},
          { text: 'Год', value: 'year', align: 'right' },
          { text: 'Лицензия', value: 'license', align: 'right' }
        ],
      }
    },
    computed: {
      softwareTypeList() {
        return this.$store.getters.softwareTypeAll
      },
      softwareLicenseList() {
        return this.$store.getters.softwareLicenseAll.map(item => item.name)
      },
      allSoftware() {
        return this.$store.getters.softwareAll
      }
    },
    created() {
      this.$store.dispatch('softwareFetch')
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
