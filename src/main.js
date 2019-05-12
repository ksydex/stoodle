import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import searchCard from './components/SearchCard'

import search from '@/components/SearchInput'

Vue.component('search-input', search)
Vue.component('search-card', searchCard)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
