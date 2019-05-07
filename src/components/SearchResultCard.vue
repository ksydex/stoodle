<template>
  <v-card>
    <v-layout>
      <v-flex mr-2 ml-2 xs2 xl1 d-flex align-center>
        <v-img :src="soft.img" height="70px" contain></v-img>
      </v-flex>
      <v-flex>
        <v-card-title>
          <div>
            <v-flex d-inline-flex>
              <div class="headline mr-3">{{ soft.name }}</div>
              <v-spacer></v-spacer>
              <div class="text-main--text text--lighten-2 headline mr-3">{{ soft.year }}</div>
            </v-flex>
            <div class="text-main--text text--lighten-2 subheading">
              <span class="mr-3">{{soft.type}}</span>
              <span>{{soft.card_type}}</span>
            </div>
            <div></div>
          </div>
        </v-card-title>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: ["soft"]
}
</script>
