<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      v-if="usedSoftware && usedSoftware.length > 0"
      xs12
      md6
    >
      <h1 class="headline text-main--text mb-3">
        {{ 'Используемое ПО ('+usedSoftware.length+')' }}
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
      v-if="subjectsSimilar"
      xs12
      md6
    >
      <h1 class="headline text-main--text mb-3">
        Ещё учебные программы
      </h1>
      <search-card
        v-for="subject in subjectsSimilar"
        :key="subject.id"
        :data="subject"
        card-type="subject"
        color="transparent"
        class="text-main--text mb-2 search-card"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        usedSoftwareIds: null
      }
    },
    computed: {
      usedSoftware() {
        return this.$store.getters.softwareUsedOnSubject(this.usedSoftwareIds)
      },
      subjectsSimilar() {
        const params = {
          specialityId: this.data.specialityId,
          exceptId: this.data.id
        }
        return this.$store.getters.subjectSimilar(params)
      },
    },
    created() {
      this.fetchData()
    },
    updated() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        const id = this.data.id
        this.$store.dispatch('softwareUsedOnSubject', id)
        const sql = `SELECT software FROM softwareonsubject WHERE subject = ${id}`
        let usedSoftwareIds = []
        axios.post(this.$api, {type: 'get', data: sql})
          .then(response => {
            response.data.forEach(item => {
              usedSoftwareIds.push(item.software)
            })
            this.usedSoftwareIds = usedSoftwareIds
          })
          .catch(error => {
            this.$store.dispatch('setError', error)
          })
      }
    }
  }
</script>
