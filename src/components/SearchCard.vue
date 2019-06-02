<template>
  <v-card
    class="search-card"
    flat
  >
    <v-layout>
      <v-flex style="align-self: center;">
        <v-card-title class="py-2">
          <v-flex>
            <v-layout
              row
              wrap
              :mb-1="$vuetify.breakpoint.xs"
            >
              <div
                :class="{'mobile-title': $vuetify.breakpoint.xs,'headline mr-3 link text-main--text text--lighten-1':true}"
                @click="$router.push(`/${cardType}/${data.id}`)"
              >
                {{ dataSet.title }}
              </div>
              <div
                v-if="dataSet.subTitle !== null"
                class="text-main--text text--lighten-3 headline mr-3"
              >
                {{ dataSet.subTitle }}
              </div>
            </v-layout>
            <div class="text-main--text text--lighten-2 subheading">
              <span
                v-if="dataSet.body !== null"
                class="mr-3"
              >
                {{ dataSet.body }}
              </span>
              <span v-if="dataSet.subBody !== null">
                {{ dataSet.subBody }}
              </span>
            </div>
          </v-flex>
        </v-card-title>
      </v-flex>
      <v-flex
        v-if="dataSet.img !== null"
        id="software-link"
        mr-3
        py-2
        xs2
        md1
        lg1
        d-flex
        align-center
        @click="$router.push(`/${cardType}/${data.id}`)"
      >
        <v-img
          :src="dataSet.img"
          height="70px"
          min-width="40px"
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
    cardType: {
      type: String,
      required: true
    }
  },
  computed: {
    dataSet() {
      const type = this.cardType
      const data = {
        software: () => {
          return {
            title: this.data.name,
            subTitle: this.data.year,
            body: this.data.type,
            subBody: 'Программное обеспечение',
            img: this.data.img || null
          }
        },
        subject: () => {
          return {
            title: this.data.name,
            subTitle:null,
            body: this.data.discipline,
            subBody: this.data.speciality,
            img: null
          }
        },
        faculty: () => {
          return {
            title: this.data.name,
            subTitle: null,
            body: this.data.short_name,
            subBody: null,
            img: this.data.img || null
          }
        },
        discipline: () => {
          return {
            title: this.data.name,
            subTitle: null,
            body: null,
            subBody: null,
            img: null
          }
        },
        speciality: () => {
          return {
            title: this.data.name,
            subTitle: null,
            body: this.data.numbers,
            subBody: this.data.faculty,
            img: null
          }
        }
      }
      return data[type]()
    },
  }
}
</script>

<style lang="scss">
  .mobile-title {
    font-size: 18px !important;
  }
</style>

