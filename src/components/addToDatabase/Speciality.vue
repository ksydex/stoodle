<template>
  <v-layout column>
    <v-text-field
      v-model="speciality.name"
      label="Название"
      solo
    />
    <v-text-field
      v-model="speciality.numbers"
      solo
      label="Цифры"
    />
    <v-text-field
      v-model="speciality.description"
      solo
      label="Описание"
      maxlength="500"
    />
    <v-select
      v-model="speciality.faculty"
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
      :items="allSpeciality"
      class="elevation-0"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.numbers }}</td>
        <td class="text-xs-right">{{ props.item.faculty }}</td>
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
  export default {
    props: {
      loading: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        speciality: {
          name: '',
          numbers: '',
          description: '',
          faculty: ''
        },
        headers: [
          {
            text: 'Специальность(направление)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Цифры', value: 'numbers', align: 'right' },
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
      allSpeciality() {
        return this.$store.getters.specialityAll
      }
    },
    created() {
      this.$store.dispatch('facultyFetch')
      this.$store.dispatch('specialityFetch')
    },
    methods: {
      createNew() {
        const speciality = {
          name: this.speciality.name,
          numbers: this.speciality.numbers,
          description: this.speciality.description,
          faculty: this.speciality.faculty,
          facultyId: this.facultyList.find(
            item => item.name === this.speciality.faculty
          ).id
        }
        this.$store
          .dispatch('specialityCreate', speciality)
          .then(() => {
            this.clearInput(this.speciality)
          })
          .catch(() => {})
      },
      deleteItem(id) {
        const params = {
          id: id,
          type: 'speciality'
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
