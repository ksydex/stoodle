<template>
  <v-card
    class="search-card my-1"
    flat
  >
    <v-layout>
      <v-flex>
        <v-card-title class="py-2">
          <div>
            <v-flex
              d-inline-flex
              wrap
            >
              <div
                class="headline mr-3 link text-main--text"
                @click="$router.push(`/${card_type}/${title}`)"
              >
                {{ title }}
              </div>
              <div
                class="text-main--text text--lighten-2 headline mr-3"
                v-if="subTitle !== null"
              >
                {{ subTitle }}
              </div>
            </v-flex>
            <div class="text-main--text text--lighten-2 subheading">
              <span
                class="mr-3"
                v-if="body !== null"
              >
                {{ body }}
              </span>
              <span v-if="subBody !== null">
                {{ subBody }}
              </span>
            </div>
          </div>
        </v-card-title>
      </v-flex>
      <v-flex
        id="software-link"
        mr-3
        xs2
        md2
        lg1
        d-flex
        align-center
        v-if="img !== null"
        @click="$router.push(`/${card_type}/${title}`)"
      >
        <v-img
          :src="img"
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
    data: {
      type: Object,
      required: true
    },
    card_type: {
      type: String,
      required: true
    }
  },
  computed: {
    title() {
      return this.data.name
    },
    subTitle() {
      const subTitle = {
        software: this.data.year,
        subject: null,
        faculty: this.short_name
      }
      return subTitle[this.card_type]
    },
    body() {
      const body = {
        software: this.data.type,
        subject: this.data.discipline,
        faculty: null // TODO тут что то должно быть
      }
      return body[this.card_type]
    },
    subBody() {
      const subBody = {
        software: this.data.card_type,
        subject: this.data.faculty,
        faculty: null // TODO тут что то должно быть
      }
      return subBody[this.card_type]
    },
    img() {
      if (this.data.img) return this.data.img
      else return null
    }
  }
}
</script>

