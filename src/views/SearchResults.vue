<template>
  <v-container class="mx-0 px-0 pt-0 pa-0">
    <v-layout column>
      <v-layout row >
        <v-flex xs0 sm0 md2 xl1></v-flex>
        <v-flex>
          <v-tabs slider-color="primary">
            <v-tab
            v-for="n in ['Все', 'Программное обеспечение', 'Договоры', 'Учебные программы', 'Факультеты']"
            :key="n">
              {{ n }}</v-tab>
          </v-tabs>
        </v-flex>
      </v-layout>
      <v-divider class="primary lighten-4"></v-divider>
      <v-layout row mt-2>
        <v-flex xs0 sm3 md2 xl1></v-flex>
        <v-flex xs12 sm9 md9 xl6>
          <v-layout column>
            <search-card
              v-for="(soft, index) in software"
              :key="index"
              :soft="soft"
              flat
              color="transparent"
              class="text-main--text mb-3 search-card"
            />
          </v-layout>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["searchQuery"],
  data() {
    return {
      software: [
        {
          name: "VS code",
          type: "IDE",
          year: "2019",
          card_type: "Программное обеспечение",
          img:
            "https://static1.squarespace.com/static/592e86ee9de4bb6e73d8c154/t/5a3e4ca653450ae78e8d4ed2/1514033170109/32078472-5053adea-baa7-11e7-9034-519002f12ac7.png"
        },
        {
          name: "XAMMP",
          type: "Web-server",
          year: "2017",
          card_type: "Программное обеспечение",
          img:
            "http://www.stickpng.com/assets/images/58482973cef1014c0b5e49fd.png"
        },
        {
          name: "КонсультантПлюс",
          type: "Справочная система",
          year: "2019",
          card_type: "Программное обеспечение",
          img:
            "https://i.mycdn.me/i?r=AzGBqNaF5OQp2lMpnhRx4DEF706jHoH1H2CXoquhh2AuTaLFvi7hJtcHqXO0a8CV9Zo"
        }
      ]
    };
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
.search-card {
  border-radius: 10px;
  box-shadow: none;
}
.search-card:hover {
  box-shadow: 0px 10px 20px #40405412;
}
</style>
