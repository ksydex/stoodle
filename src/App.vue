<template>
  <v-app class="white">
    <v-toolbar class="elevation-0 white mx-0"
    style="z-index: 10 !important"
    >
      <v-layout row>
        <v-flex 
        xs0 sm0 md2 xl1
        v-if="$route.path !== '/' && !this.$vuetify.breakpoint.xs"
        style="align-self: center;display: flex; justify-content: flex-end"
        >
          <img
          src="./assets/logo.webp"
          class="logo mr-4"
          @click="$router.push('/')"
          >
        </v-flex>
        <v-flex
        xs12 sm10 md9 xl5
        style="align-self: center;"
        :class="{ 'mt-3' : this.$vuetify.breakpoint.xs }"
        >
          <search-input
          v-if="$route.path !== '/'"
          ></search-input>
        </v-flex>
      </v-layout>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      
    }
  }
}
</script>
<style>

.logo {
  height: 27px;
  cursor: pointer;
}
</style>
