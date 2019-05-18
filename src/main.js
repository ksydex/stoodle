import Vue from 'vue'
import './plugins/vuetify'
import * as fb from 'firebase'

import App from './App.vue'
import router from './router'
import store from './store/store'
import searchCard from './components/SearchCard'
import noData from './components/NoData'
import search from './components/SearchInput'

Vue.component('search-input', search)
Vue.component('search-card', searchCard)
Vue.component('no-data', noData)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyCM_dywJNsIMjiUHfIWPNqDWgOG2uPKxzw",
      authDomain: "stoodle-e6e43.firebaseapp.com",
      databaseURL: "https://stoodle-e6e43.firebaseio.com",
      projectId: "stoodle-e6e43",
      storageBucket: "stoodle-e6e43.appspot.com",
      messagingSenderId: "8189324997",
      appId: "1:8189324997:web:1d387fbbdd33db3b"
    })
  },
  render: h => h(App),
}).$mount('#app')
