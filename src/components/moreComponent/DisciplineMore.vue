<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      xs12
      md6
    >
      <h1 class="headline text-main--text mb-3">
        Учебные программы по дисицплине
      </h1>
      <search-card
        v-for="subject in subjectsOnDiscipline"
        :key="subject.id"
        :data="subject"
        card-type="subject"
        color="transparent"
        class="text-main--text mb-2 search-card"
      />
    </v-flex>
    <v-flex
      xs12
      md6
    >
      <h1 class="headline text-main--text mb-3">
        Ещё дисциплины
      </h1>
      <search-card
        v-for="discipline in similarDiscipline"
        :key="discipline.id"
        :data="discipline"
        card-type="discipline"
        class="mb-2"
      />
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    computed: {
      subjectsOnDiscipline() {
        const disciplineId = this.data.id
        return this.$store.getters.subjectsOnDisciplineById(disciplineId)
      },
      similarDiscipline() {
        const id = this.data.id
        return this.$store.getters.disciplineSimilar(id)
      }
    }
  }
</script>
