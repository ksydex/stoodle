<template>
  <v-app class="white">
    <v-toolbar  class="elevation-0 transparent">
      <v-toolbar-title
      v-if="$route.path !== '/'"
      style="width: 155px">
        <logo pos="toolbar"></logo>
      </v-toolbar-title>
      <search-input
      v-if="$route.path !== '/'"
      ></search-input>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  },
  data () {
    return {
      //
    }
  }
}
</script>
