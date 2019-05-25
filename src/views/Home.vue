<template>
  <v-container fill-height>
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        md8
        lg7
        xl5
        style="margin-bottom: 100px !important"
        class="text-xs-center mb-5"
        justify-center
      >
        <v-layout column>
          <v-flex xs6>
            <img
              height="70px"
              class="logo-home"
              src="../assets/logo.webp"
              alt="Stoodle"
              @click="$router.push('/')"
            >
          </v-flex>
          <v-flex class="mt-5">
            <search-input />
          </v-flex>
          <v-layout
            row
            wrap
            justify-center
          >
            <v-btn
              v-for="topic in topics"
              :key="topic.name"
              flat
              class="primary--text px-2 ml-0"
              @click="$router.push(topic.link)"
            >
              {{ topic.name }}
            </v-btn>
          </v-layout>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      topics: [
        {
          name: 'Программное обеспечение',
          link: '/software'
        },
        {
          name: 'Факультеты',
          link: '/faculty'
        },
        {
          name: 'Учебные программы',
          link: '/subject'
        },
      ]
    }
  },
  created() {
    this.$store.dispatch('facultyFetch')
    this.$store.dispatch('softwareFetch')
    this.$store.dispatch('subjectFetch')
  }
}
</script>

<style lang="scss">
.v-input__slot {
  border-radius: 30px !important;
  box-shadow: 0 5px 15px #ff525b17 !important;
  border: 1px solid #ff525b56;
}
.logo-home {
  height: 75px;
}
</style>
