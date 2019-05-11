<template>
  <v-container>
    <v-layout column>
      <v-layout
        justify-center
        row
        :wrap="$vuetify.breakpoint.xs"
      >
        <v-flex
          align-center
          xs12
          sm5
          md3
          xl2
          mx-4
          mb-4
          :mt-4="!$vuetify.breakpoint.xs"
        >
          <v-img
            :src="faculty.img"
            height="200px"
            contain
          ></v-img>
        </v-flex>
        <v-flex
          xs12
          md7
          lg5
        >
          <v-layout
            row
            wrap
            align-center
            mb-3
            justify-space-between
          >
            <h1 class="display-1 text-main--text">{{faculty.name}}</h1>
            <v-btn
              flat
              class="blue--text text--darken-1 px-2 mx-0"
              @click="searchGoogle(faculty.name)"
            >
              Поиск в Google
              <v-icon
                right
                dark
              >search</v-icon>
            </v-btn>
          </v-layout>
          <v-layout
            row
            class="mb-2"
          >
            <h2 class="title text-main--text text--lighten-2 mr-2">Веб-сайт -</h2>
            <a
              class="title primary--text"
              target="_blank"
              :href="faculty.web_site"
            >{{faculty.web_site.replace(/https:\/\/|http:\/\//gi,'')}}</a>
          </v-layout>

          <p class="subheading text-main--text">{{faculty.description}}</p>
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
          <h1 class="headline text-main--text mb-3">Учебные программы</h1>
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
                <v-list-tile-sub-title v-text="subject.faculty"></v-list-tile-sub-title>
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
      faculties: [
        {
          name: 'Факультет вычислительной техники',
          short_name: 'ФВТ',
          description:
            'На ФВТ сосредоточена подготовка специалистов в области компьютерной техники, ее проектирования, эксплуатации, разработки программного обеспечения и применения новых информационных технологий во всех сферах деятельности, в том числе и в сфере управления.',
          web_site: 'https://fvt.pnzgu.ru',
          img: 'https://pp.userapi.com/c846021/v846021055/5cf17/rVTeUKKIirk.jpg'
        }
      ],
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
    faculty() {
      return this.faculties.find(item => item.name == this.name)
    }
  },
  methods: {
    searchGoogle(name) {
      window.open('https://www.google.com/search?q=' + name)
    }
  }
}
</script>
