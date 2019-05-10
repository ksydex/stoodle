<template>
  <v-card
  class="search-card"
  flat>
    <v-layout>
      <v-flex mr-4 ml-2 xs2 md1 d-flex align-center
      id="software-link"
      @click="$router.push('/software/'+soft.name)"
      >
        <v-img :src="soft.img" height="70px" contain></v-img>
      </v-flex>
      <v-flex>
        <v-card-title>
          <div>
            <v-flex d-inline-flex>
              <div
              id="software-link"
              class="headline mr-3"
              @click="$router.push('/software/'+soft.name)"
              >{{ soft.name }}</div>
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

<style lang="scss" scoped>
#software-link {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.search-card {
  border-radius: 10px;
  box-shadow: none;
}
.search-card:hover {
  box-shadow: 0px 10px 20px #40405412;
}
</style>

