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
        Направления факультета
      </h1>
      <search-card
        v-for="speciality in specialityOnFaculty"
        :key="speciality.id"
        :data="speciality"
        card-type="speciality"
        class="mb-2"
      />
    </v-flex>
    <v-flex
      xs12
      md6
    >
      <h1 class="headline text-main--text mb-3">
        Программное обеспечение на факультете
      </h1>
      <search-card
        v-for="software in usedSoftware"
        :key="software.id"
        :data="software"
        card-type="software"
        color="transparent"
        class="text-main--text mb-2 search-card"
      />
    </v-flex>
    <v-flex
      xs12
      md6
    >
      <h1 class="headline text-main--text mb-3">
        Похожие факультеты
      </h1>
      <search-card
        v-for="faculty in similarFaculty"
        :key="faculty.id"
        :data="faculty"
        card-type="faculty"
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
    usedSoftware() {
      const params = {
        type: this.data.type,
        exceptName: this.data.name
      }
      return this.$store.getters.softwareSimilar(params)
    },
    specialityOnFaculty() {
      return this.$store.getters.specialityOnFaculty(this.data.id)
    },
    similarFaculty() {
      return this.$store.getters.facultySimilar(this.data.id)
    }
  }
}
</script>
