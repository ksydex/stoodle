<template>
  <v-container :fill-height="!user.logged">
    <v-layout
      v-if="!user.logged"
      class="align-center"
    >
      <v-flex class="align-center justify-center text-xs-center">
        <h4 class="display-2 mb-3 text-main--text">Кто вы?</h4>
        <v-btn
          flat
          class="primary--text px-2 ml-0"
          @click="setUser('teacher')"
        >
          Преподаватель
        </v-btn>
        <v-btn
          flat
          class="primary--text px-2 ml-0"
          @click="setUser('tech')"
        >
          Технический работник
        </v-btn>
        <v-btn
          flat
          class="primary--text px-2 ml-0"
          @click="setUser('admin')"
        >
          Администратор
        </v-btn>
      </v-flex>

    </v-layout>
    <v-layout
      v-else
      column
    >
      <h4 class="display-1 text-main--text mb-3">Добавить новую запись</h4>
      <v-tabs
        color="transparent"
        slider-color="primary"
      >
        <v-tab
          v-for="type in typeSwitcher"
          :key="type.type"
          ripple
          @click="currentType = type"
        >
          {{ type.title }}
        </v-tab>
      </v-tabs>
      <v-divider class="mb-3" />
      <component
        :is="currentType.component"
        v-show="!loading"
        :loading="loading"
      />
      <v-layout
        v-show="loading"
        justify-center
      >
        <v-progress-circular
          class="mt-5"
          :size="150"
          :width="7"
          color="primary"
          indeterminate
        />
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import softwareForm from '../components/addToDatabase/Software'
import subjectForm from '../components/addToDatabase/Subject'
import facultyForm from '../components/addToDatabase/Faculty'
import disciplineForm from '../components/addToDatabase/Discipline'
import softwareOnSubject from '../components/addToDatabase/SoftwareOnSubject'
import specialityForm from '../components/addToDatabase/Speciality'
export default {
  components: {
    softwareForm,
    subjectForm,
    facultyForm,
    disciplineForm,
    softwareOnSubject,
    specialityForm
  },
  data() {
    return {
      user:{
        logged: false,
        type: null
      },
      currentType: {}
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    typeSwitcher() {
      const types = {
        teacher: [
          {
            type: 'software',
            title: 'Программное обеспечение',
            component: 'softwareForm'
          },
          {
            type: 'subject',
            title: 'Учебная программа',
            component: 'subjectForm'
          },
          {
            type: 'swsj',
            title: 'ПО на УП',
            component: 'softwareOnSubject'
          }
        ],
        tech: [
          {
            type: 'discipline',
            title: 'Дисциплина',
            component: 'disciplineForm'
          },
          {
            type: 'speciality',
            title: 'Специальность',
            component: 'specialityForm'
          },
          {
            type: 'faculty',
            title: 'Факультет',
            component: 'facultyForm'
          },
        ],
        admin: [
          {
            type: 'software',
            title: 'Программное обеспечение',
            component: 'softwareForm'
          },
          {
            type: 'subject',
            title: 'Учебная программа',
            component: 'subjectForm'
          },
          {
            type: 'discipline',
            title: 'Дисциплина',
            component: 'disciplineForm'
          },
          {
            type: 'speciality',
            title: 'Специальность',
            component: 'specialityForm'
          },
          {
            type: 'faculty',
            title: 'Факультет',
            component: 'facultyForm'
          },
          {
            type: 'swsj',
            title: 'ПО на УП',
            component: 'softwareOnSubject'
          }
        ]
      }
      return types[this.user.type]
    }
  },
  methods: {
    setUser(user){
      const currentType = {
        teacher: {
          type: 'software',
          title: 'Программное обеспечение',
          component: 'softwareForm'
        },
        tech: {
          type: 'discipline',
          title: 'Дисциплина',
          component: 'disciplineForm'
        },
        admin: {
          type: 'software',
          title: 'Программное обеспечение',
          component: 'softwareForm'
        }
      }
      this.user.logged = true
      this.user.type = user
      this.currentType = currentType[user]
    }
  }
}
</script>

<style lang="scss" scoped>
#custom {
  border-radius: 0 !important;
  box-shadow: none !important;
  border: none !important;
}
.logo-home {
  height: 75px;
}
</style>
