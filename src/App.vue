<template>
  <v-app class="white">
    <v-toolbar
      v-if="
        ($route.path !== '/' &&
          !$route.path.match(
            /test|software|subject|faculty|new|discipline|speciality|report/gi
          ) &&
          !$vuetify.breakpoint.xs) ||
          ($vuetify.breakpoint.xs && $route.path.indexOf('search') !== -1)
      "
      class="elevation-0 white"
      style="z-index: 10 !important"
    >
      <v-layout row>
        <v-flex xs0 sm0 md2 xl1 style="align-self: center;display: flex; justify-content: flex-end">
          <img
            v-if="!this.$vuetify.breakpoint.xs"
            src="./assets/logo.webp"
            class="logo mr-4"
            alt="Stoodle"
            @click="$router.push('/')"
          >
        </v-flex>
        <v-flex
          xs12
          sm10
          md7
          xl5
          style="align-self: center;"
          :class="{ 'mt-3': this.$vuetify.breakpoint.xs }"
        >
          <search-input/>
        </v-flex>
        <v-spacer/>
      </v-layout>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <template v-if="error">
      <v-snackbar
        :multi-line="true"
        :timeout="5000"
        color="error"
        :value="true"
        @input="closeError()"
      >
        {{ error }}
        <v-btn dark flat @click="closeError()">Закрыть</v-btn>
      </v-snackbar>
    </template>

    <template v-if="success">
      <v-snackbar
        :multi-line="true"
        :timeout="5000"
        color="success"
        :value="true"
        @input="closeSuccess()"
      >
        {{ success }}
        <v-btn dark flat @click="closeError()">Закрыть</v-btn>
      </v-snackbar>
    </template>

    <v-footer
      v-if="$route.path !== '/' && $route.path.indexOf('search') === -1"
      class="pa-3"
      color="transparent"
    >
      <v-spacer/>
      <div class="link text-main--text mr-3" @click="$router.push('/report')">Получить отчёт</div>
      <div class="link text-main--text mr-3" @click="$router.push('/new')">Панель управления</div>
      <div class="link text-main--text" @click="$router.push('/')">Stoodle 2019</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {}
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    success() {
      return this.$store.getters.success
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError')
    },
    closeSuccess() {
      this.$store.dispatch('clearSuccess')
    }
  }
}
</script>
<style lang="scss">
.logo {
  height: 27px;
  cursor: pointer;
}
.link {
  cursor: pointer !important;
  &:hover {
    text-decoration: underline !important;
  }
}
.v-toolbar__content {
  padding: 0 7px;
}
.search-card {
  border-radius: 10px;
  box-shadow: none;
  &:hover {
    box-shadow: 0 10px 20px #40405412;
  }
}
</style>
