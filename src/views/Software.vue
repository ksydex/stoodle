<template>
  <v-container width="960">
    <v-layout column>
      <v-layout justify-center row :wrap="$vuetify.breakpoint.xs">
        <v-flex xs12 md6 xl2 mx-4 mb-4 :mt-4="!$vuetify.breakpoint.xs">
          <v-img
          :src="software.img"
          height="270px"
          contain
          ></v-img>
        </v-flex>
        <v-flex xs12 md7 lg6>
          <h1 class="display-1 text-main--text mb-3">{{software.name}}</h1>
          <h2 class="title text-main--text text--lighten-2 mb-1">{{`${software.card_type} - ${software.type} `}}</h2>
          <h2 class="title text-main--text text--lighten-2 mb-2">{{`Год - ${software.year}`}}</h2>
          
          <p class="subheading text-main--text">{{software.description}}</p>
        </v-flex>
      </v-layout>
      <v-divider class="my-3"></v-divider>
      <v-layout row wrap justify-center>
        <v-flex md6 lg4>
          <h1 class="headline text-main--text mb-3">Используется на учебных программах</h1>
          <v-list>
            <v-list-tile
            v-for='item in ["Информатика","Программирование","ООП","Данные и структуры"]'
            :key="item"
            >
              <v-list-tile-content>
                <v-list-tile-title v-text="item"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex md6 lg4>
          <h1 class="headline text-main--text mb-3">Похожее программное обеспечение</h1>
          <search-card
              v-for="(soft, index) in soft"
              :key="index"
              :soft="soft"
              color="transparent"
              class="text-main--text mb-3 search-card"
          />
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      soft: [
        {
          name: "VS code",
          type: "IDE",
          year: "2019",
          card_type: "Программное обеспечение",
          description: "Visual Studio Code - легкий редактор кода, разработанный корпорацией Microsoft на движке Electron с использваонием веб-технологий. Прямым конкурентом является Atom, PhpStorm, SublimeText, но VS code уже несколько лет удерживает первые позиции в топах пользователей.",
          img:
            "https://static1.squarespace.com/static/592e86ee9de4bb6e73d8c154/t/5a3e4ca653450ae78e8d4ed2/1514033170109/32078472-5053adea-baa7-11e7-9034-519002f12ac7.png"
        },
        {
          name: "XAMMP",
          type: "Web-server",
          year: "2017",
          card_type: "Программное обеспечение",
          description: "XAMMP - локальный сервер, который предоставляет стандартный набор функций для развертки виртуального сервера на вашей машине. Apache, PHP7, nginx и PhpMyAdmin.",
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
    }
  },
  computed: {
    software () {
      return this.soft.find(item => item.name == this.id)
    }
  }
}
</script>
