<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      v-if="usedOnSubjects.length !== 0"
      xs12
      md6
    >
      <h1 class="headline text-main--text mb-3">
        Используется на учебных программах
      </h1>
      <search-card

        v-for="subject in usedOnSubjects"
        :key="subject.id"
        :data="subject"
        card-type="subject"
        color="transparent"
        class="text-main--text mb-2 search-card"
      />
    </v-flex>
    <v-flex
      v-if="similarSoftware.length !== 0"
      xs12
      md6
    >
      <h1 class="headline text-main--text mb-3">
        Похожее программное обеспечение
      </h1>
      <search-card
        v-for="software in similarSoftware"
        :key="software.id"
        :data="software"
        card-type="software"
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
        onSubjectIds: null
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
        let result = []
        if(this.onSubjectIds) {
          this.onSubjectIds.forEach(key => {
            result.push(this.$store.getters.subjectById(key))
          })
        }
        return result
      }
    },
    created() {
      this.fetchData()
    },
    updated(){
      this.fetchData()
    },
    methods:{
      fetchData() {
        let usedOnSubjects = []
        const id = this.data.id
        //this.$store.dispatch('subjectBySoftware', id)
        const sql = `SELECT softwareonsubject.subject AS id FROM softwareonsubject WHERE software = ${this.data.id}`
        axios.post(this.$api, {type: 'get', data: sql})
          .then(response => {
            response.data.forEach(item => {
              usedOnSubjects.push(item.id)
              this.$store.dispatch('subjectById', item.id)
            })
            this.onSubjectIds = usedOnSubjects
          })
          .catch(error => {
            this.$store.dispatch('setError', error)
          })
      }
    }
  }
</script>
