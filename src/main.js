import Vue from 'vue'
import './plugins/vuetify'

import App from './App.vue'
import router from './router'
import store from './store/store'
import searchCard from './components/SearchCard'
import noData from './components/NoData'
import search from './components/SearchInput'

Vue.component('search-input', search)
Vue.component('search-card', searchCard)
Vue.component('no-data', noData)
Vue.prototype.$api = 'http://stoodle:81/api.php'

Vue.config.productionTip = true

new Vue({
  router,
  store,
  created() {

  },
  render: h => h(App),
}).$mount('#app')
