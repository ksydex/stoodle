<template>
  <v-container class="mx-0 px-0">
    <v-layout row >
      <v-flex xs2>
        sds
      </v-flex> 
      <v-flex sm7>
        <v-layout column>
          <v-card v-for="i in 5" :key="i" color="blue-grey darken-2" class="white--text mb-2">
              <v-card-title primary-title>
                <div>
                  <div class="headline">Unlimited music now</div>
                  <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
              </v-card-actions>
            </v-card>
        </v-layout>
      </v-flex>
      <v-flex sm4>
        sdss
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['searchQuery'],
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
