<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      v-if="subjectsOnSpeciality && subjectsOnSpeciality.length>0"
      xs12
      md6
    >
      <h1 class="headline text-main--text mb-3">
        {{ 'Учебные программы на направлении ('+subjectsOnSpeciality.length+')' }}
      </h1>
      <search-card
        v-for="subject in subjectsOnSpeciality"
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
        Ещё направления
      </h1>
      <search-card
        v-for="speciality in similarSpeciality"
        :key="speciality.id"
        :data="speciality"
        card-type="speciality"
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
    subjectsOnSpeciality() {
      const specialityId = this.data.id
      return this.$store.getters.subjectsOnSpecialityById(specialityId)
    },
    similarSpeciality() {
      const id = this.data.id
      return this.$store.getters.specialityAll
    }
  }
}
</script>
