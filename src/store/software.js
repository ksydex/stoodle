export default {
  state: {
    software: [
      {
        name: 'VS code',
        type: 'IDE',
        year: '2019',
        license: 'Freeware',
        card_type: 'Программное обеспечение',
        description:
          'Visual Studio Code - легкий редактор кода, разработанный корпорацией Microsoft на движке Electron с использваонием веб-технологий. Прямым конкурентом является Atom, PhpStorm, SublimeText, но VS code уже несколько лет удерживает первые позиции в топах пользователей.',
        img:
          'https://static1.squarespace.com/static/592e86ee9de4bb6e73d8c154/t/5a3e4ca653450ae78e8d4ed2/1514033170109/32078472-5053adea-baa7-11e7-9034-519002f12ac7.png',
      },
      {
        name: 'XAMMP',
        type: 'Web-server',
        license: 'Freeware',
        year: '2017',
        card_type: 'Программное обеспечение',
        description:
          'XAMMP - локальный сервер, который предоставляет стандартный набор функций для развертки виртуального сервера на вашей машине. Apache, PHP7, nginx и PhpMyAdmin.',
        img:
          'http://www.stickpng.com/assets/images/58482973cef1014c0b5e49fd.png',
      },
      {
        name: 'КонсультантПлюс',
        type: 'Справочная система',
        license: 'Commercial',
        year: '2019',
        card_type: 'Программное обеспечение',
        img:
          'https://i.mycdn.me/i?r=AzGBqNaF5OQp2lMpnhRx4DEF706jHoH1H2CXoquhh2AuTaLFvi7hJtcHqXO0a8CV9Zo',
      },
      {
        name: 'VS codium',
        type: 'IDE',
        year: '2019',
        license: 'Open-source',
        card_type: 'Программное обеспечение',
        description:
          'Visual Studio Codium - является open-source версией VS code.',
        img: 'https://avatars0.githubusercontent.com/u/40338071?v=4',
      },
      {
        name: 'PhpStorm',
        type: 'IDE',
        year: '2019',
        license: 'Commercial',
        card_type: 'Программное обеспечение',
        description: 'PhpStorm - мощный инструмент для веб-разработки.',
        img:
          'https://docs.typo3.org/typo3cms/extensions/th_rating/_images/phpstorm.png',
      },
      {
        name: 'Кодекс',
        type: 'Справочная система',
        license: 'Commercial',
        year: '2017',
        card_type: 'Программное обеспечение',
        img:
          'https://msal.ru/upload/library/ebs_files/kodeks_logo_color_blue.jpg',
      },
    ],
  },
  mutations: {},
  actions: {},
  getters: {
    softwareByName: state => name => {
      return state.software.find(item => item.name === name)
    },
    softwareSimilar: state => ({ type, exceptName }) => {
      let firstTry = state.software
        .filter(item => item.type === type && item.name !== exceptName)
        .splice(0, 5) // возвращаем первые 5

      // если больше нет похожего ПО
      if (firstTry.length === 5) {
        return firstTry
      } else if (firstTry.length !== 0) {
        state.software
          .filter(item => item.name !== exceptName)
          .splice(0, 5 - firstTry.length)
          .forEach(item => {
            firstTry.push(item)
          })
        return firstTry
      } else
        return state.software
          .filter(item => item.name !== exceptName)
          .splice(0, 5)
    },
    softwareSearch: state => query => {
      return state.software.filter(item => item.name.match(query))
    },
  },
}
