<template>
  <v-container>
    <v-layout column>
      <v-layout
        justify-center
        row
        :wrap="$vuetify.breakpoint.xs"
      >
        <v-flex
          xs12
          md7
          lg7
        >
          <v-layout
            row
            wrap
            align-center
            mb-3
            justify-space-between
          >
            <h1 class="display-1 text-main--text">{{subject.name}}</h1>
            <v-btn
              flat
              class="blue--text text--darken-1 px-2 mx-0"
              @click="searchGoogle(subject.name)"
            >
              Поиск в Google
              <v-icon
                right
                dark
              >search</v-icon>
            </v-btn>
          </v-layout>
          <h2 class="title text-main--text text--lighten-2 mb-2">{{`Дисциплина - ${subject.discipline}`}}</h2>
          <h2
            class="title text-main--text text--lighten-2 mb-1"
            @click="$router.push('/faculty/'+subject.faculty)"
            id="link"
          >{{subject.faculty}}</h2>
        </v-flex>
        <v-flex lg1></v-flex>
      </v-layout>
      <v-divider class="my-3"></v-divider>
      <v-layout
        row
        wrap
        justify-center
      >
        <v-flex
          md6
          lg5
          xl4
        >
          <h1 class="headline text-main--text mb-3">Используемое ПО</h1>
          <search-card
            v-for="(soft, index) in software"
            :key="index"
            :soft="soft"
            color="transparent"
            class="text-main--text mb-3 search-card"
          />
        </v-flex>
        <v-flex
          md6
          lg5
          xl4
        >
          <h1 class="headline text-main--text mb-3">Похожие учебные программы</h1>
          <v-list>
            <v-list-tile
              v-for="subject in subjects"
              :key="subject.name"
              class="mb-2"
            >
              <v-list-tile-content>
                <v-list-tile-title
                  @click="$router.push('/subject/'+subject.name)"
                  id="link"
                  v-text="subject.name"
                ></v-list-tile-title>
                <v-list-tile-sub-title
                  @click="$router.push('/faculty/'+subject.faculty)"
                  id="link"
                  v-text="subject.faculty"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['name'],
  data() {
    return {
      subjects: [
        {
          name: 'Информационные технологии в практической деятельности',
          discipline: 'Информационные технологии',
          faculty: 'Факультет вычислительной техники',
          id: 1
        },
        {
          name: 'Правовое обеспечение в практической деятельности',
          discipline: 'Информационные технологии',
          faculty: 'Факультет экономики и управления',
          id: 2
        },
        {
          name: 'Программирование С++',
          discipline: 'Программирование',
          faculty: 'Факультет вычислительной техники',
          id: 3
        }
      ],
      software: [
        {
          name: 'VS code',
          type: 'IDE',
          year: '2019',
          card_type: 'Программное обеспечение',
          description:
            'Visual Studio Code - легкий редактор кода, разработанный корпорацией Microsoft на движке Electron с использваонием веб-технологий. Прямым конкурентом является Atom, PhpStorm, SublimeText, но VS code уже несколько лет удерживает первые позиции в топах пользователей.',
          img:
            'https://static1.squarespace.com/static/592e86ee9de4bb6e73d8c154/t/5a3e4ca653450ae78e8d4ed2/1514033170109/32078472-5053adea-baa7-11e7-9034-519002f12ac7.png'
        },
        {
          name: 'XAMMP',
          type: 'Web-server',
          year: '2017',
          card_type: 'Программное обеспечение',
          description:
            'XAMMP - локальный сервер, который предоставляет стандартный набор функций для развертки виртуального сервера на вашей машине. Apache, PHP7, nginx и PhpMyAdmin.',
          img:
            'http://www.stickpng.com/assets/images/58482973cef1014c0b5e49fd.png'
        },
        {
          name: 'КонсультантПлюс',
          type: 'Справочная система',
          year: '2019',
          card_type: 'Программное обеспечение',
          img:
            'https://i.mycdn.me/i?r=AzGBqNaF5OQp2lMpnhRx4DEF706jHoH1H2CXoquhh2AuTaLFvi7hJtcHqXO0a8CV9Zo'
        }
      ]
    }
  },
  computed: {
    subject() {
      return this.subjects.find(item => item.name == this.name)
    }
  },
  methods: {
    searchGoogle(name) {
      window.open('https://www.google.com/search?q=' + name)
    }
  }
}
</script>
