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
        Используется на учебных программах
      </h1>
      <search-card

        v-for="subject in usedOnSubjects"
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
        Похожее программное обеспечение
      </h1>
      <search-card
        v-for="software in similarSoftware"
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
      similarSoftware() {
        const params = {
          type: this.data.type,
          exceptName: this.data.name
        }
        return this.$store.getters.softwareSimilar(params)
      },
      usedOnSubjects() {
        return this.$store.getters.subjectAll
      }
    }
  }
</script>
