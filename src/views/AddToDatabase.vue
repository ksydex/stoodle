<template>
  <v-container>
    <v-layout column>
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
        :loading="loading"
      />
    </v-layout>
  </v-container>
</template>

<script>
import softwareForm from '../components/addToDatabase/Software'
import subjectForm from '../components/addToDatabase/Subject'
import facultyForm from '../components/addToDatabase/Faculty'
export default {
  components: {
    softwareForm,
    subjectForm,
    facultyForm
  },
  data() {
    return {
      typeSwitcher: [
        {type: 'software', title: 'Программное обеспечение', component: 'softwareForm'},
        {type: 'subject', title: 'Учебная программа', component: 'subjectForm'},
        {type: 'faculty', title: 'Факультет', component: 'facultyForm'}
      ],
      currentType: {type: 'software', title: 'Программное обеспечение', component: 'softwareForm'},
    }
  },
  computed: {
    facultyList() {
      return this.$store.getters.facultyAllNameAndId
    },
    loading() {
      return this.$store.getters.loading
    }
  },
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
