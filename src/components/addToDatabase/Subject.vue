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
      v-model="subject.speciality"
      :items="specialityList.map(item => item.name)"
      solo
      label="Направление"
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

    <v-dialog
      v-model="dialog"
      max-width="700px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Изменить запись</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-layout wrap>
              <v-flex
                xs12
              >
                <v-text-field
                  v-model="editedSubject.name"
                  label="Название"
                  solo
                />
                <v-select
                  v-model="editedSubject.discipline"
                  :items="disciplineList.map(item => item.name)"
                  solo
                  label="Дисциплина"
                />
                <v-select
                  v-model="editedSubject.speciality"
                  :items="specialityList.map(item => item.name)"
                  solo
                  label="Направление"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="grey darken-1"
            flat
            @click="dialog = false"
          >Отмена</v-btn>
          <v-btn
            color="primary darken-1"
            flat
            @click="updateSubject()"
          >Обновить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="allSubject"
      class="elevation-0"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.discipline }}</td>
        <td class="text-xs-right">{{ props.item.speciality }}</td>
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
        dialog: false,
        subject: {
          name: '',
          discipline: '',
          speciality: ''
        },
        editedSubject: {
          name: '',
          discipline: '',
          speciality: ''
        },
        headers: [
          {
            text: 'Учебная программа',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Дисциплина', value: 'discipline', align: 'right' },
          { text: 'Специальность', value: 'speciality',align: 'right' }
        ],
      }
    },
    computed: {
      specialityList() {
        return this.$store.getters.specialityAll.map(item => {
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
      this.$store.dispatch('specialityFetch')
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
          speciality: this.subject.speciality,
          specialityId: this.specialityList.find(
            item => item.name === this.subject.speciality
          ).id
        }
        this.$store
          .dispatch('subjectCreate', subject)
          .then(() => {
            this.clearInput(this.subject)
          })
          .catch(() => {})
      },
      editItem(prop) {
        this.editedSubject.name = prop.name
        this.editedSubject.discipline = prop.discipline
        this.editedSubject.speciality = prop.speciality
        this.dialog = true
      },
      deleteItem(id) {
        const params = {
          id: id,
          type: 'subject'
        }
        this.$store.dispatch('deleteFromDb', params)
      },
      clearInput(object) {
        Object.keys(object).forEach(key => {
          object[key] = ''
        })
      },
      updateSubject() {

      }
    }
  }
</script>
