<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex
      xs12
      md5
      style="margin-bottom: 100px !important"
      class="text-xs-center mb-5"
      justify-center>
        <v-layout column>
          <v-flex xs6>
            <logo pos="home"></logo>
          </v-flex>
          <v-flex xs6 class="mt-5">
            <search-input></search-input>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      query: '',
    }
  },
}
</script>

<style lang="scss">
.v-input__slot {
  border-radius: 30px !important;
  box-shadow: 0 5px 15px #ff525b17 !important;
  border: 1px solid #ff525b56;
}
</style>
