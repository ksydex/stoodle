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
        Похожие учебные программы
      </h1>
      <search-card
        v-for="subject in subjectsOnFaculty"
        :key="subject.name"
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
        Используемое ПО
      </h1>
      <search-card
        v-for="software in usedSoftware"
        :key="software.name"
        :data="software"
        card-type="software"
        color="transparent"
        class="text-main--text mb-2 search-card"
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
      usedSoftware() {
        const params = {
          type: this.data.type,
          exceptName: this.data.name
        }
        return this.$store.getters.softwareSimilar(params)
      },
      subjectsOnFaculty() {
        return this.$store.getters.subjectAll
      }
    }
  }
</script>
