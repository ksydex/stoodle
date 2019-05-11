<template>
  <v-container fill-height>
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        md5
        style="margin-bottom: 100px !important"
        class="text-xs-center mb-5"
        justify-center
      >
        <v-layout column>
          <v-flex xs6>
            <img
              class="logo-home"
              src="../assets/logo.webp"
              @click="$router.push('/')"
            >
          </v-flex>
          <v-flex
            xs6
            class="mt-5"
          >
            <search-input></search-input>
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
              class="primary--text px-2 ml-0 mr-4"
              @click="$router.push(topic.link)"
            >{{topic.name}}</v-btn>
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
        {
          name: 'Договоры',
          link: '/contract'
        }
      ]
    }
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
