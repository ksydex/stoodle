<template>
  <v-app class="white">
    <v-toolbar
      v-if="($route.path != '/' && !$route.path.match(/test|software|subject|faculty/gi)) && !$vuetify.breakpoint.xs || ($vuetify.breakpoint.xs && $route.path.indexOf('search')!== -1)"
      class="elevation-0 white"
      style="z-index: 10 !important"
    >
      <v-layout row>
        <v-flex
          xs0
          sm0
          md2
          xl1
          style="align-self: center;display: flex; justify-content: flex-end"
        >
          <img
            v-if="!this.$vuetify.breakpoint.xs"
            src="./assets/logo.webp"
            class="logo mr-4"
            @click="$router.push('/')"
          >
        </v-flex>
        <v-flex
          xs12
          sm10
          md7
          xl5
          style="align-self: center;"
          :class="{ 'mt-3' : this.$vuetify.breakpoint.xs }"
        >
          <search-input v-if="$route.path !== '/'" />
        </v-flex>
      </v-layout>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer
      v-if="$route.path!=='/' && $route.path.indexOf('search') == -1"
      class="pa-3"
      color="transparent"
    >
      <v-spacer />
      <div
        class="link text-main--text"
        @click="$router.push('/')"
      >
        Stoodle 2019
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {}
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
    box-shadow: 0px 10px 20px #40405412;
  }
}
</style>
