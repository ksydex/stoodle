import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import Search from '@/components/SearchInput'
import Logo from '@/components/Logo'

Vue.component('search-input', Search)
Vue.component('logo', Logo)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
