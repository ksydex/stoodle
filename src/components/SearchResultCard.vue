<template>
  <v-card
    class="search-card"
    flat
  >
    <v-layout>
      <v-flex>
        <v-card-title>
          <div>
            <v-flex
              d-inline-flex
              wrap
            >
              <div
                id="link"
                class="headline mr-3"
                @click="$router.push('/software/'+soft.name)"
              >
                {{ soft.name }}
              </div>
              <div class="text-main--text text--lighten-2 headline mr-3">
                {{ soft.year }}
              </div>
            </v-flex>
            <div class="text-main--text text--lighten-2 subheading">
              <span class="mr-3">
                {{ soft.type }}
              </span>
              <span>
                {{ soft.card_type }}
              </span>
            </div>
          </div>
        </v-card-title>
      </v-flex>
      <v-flex
        id="software-link"
        mr-4
        xs2
        md1
        d-flex
        align-center
        @click="$router.push('/software/'+soft.name)"
      >
        <v-img
          :src="soft.img"
          height="70px"
          contain
        />
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    soft: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.search-card {
  border-radius: 10px;
  box-shadow: none;
}
.search-card:hover {
  box-shadow: 0px 10px 20px #40405412;
}
</style>

