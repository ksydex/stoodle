<template>
  <v-app class="white">
    <v-toolbar
      v-if="($route.path != '/' && !$route.path.match(/software|subject|faculty/gi)) && !$vuetify.breakpoint.xs || ($vuetify.breakpoint.xs && $route.path.indexOf('search')!== -1)"
      class="elevation-0 white mx-0"
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
          md9
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
#link {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
