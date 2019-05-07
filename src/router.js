import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import SearchResults from '@/views/SearchResults'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home

    },
    {
      path: '/search/:searchQuery',
      name: 'SearchResults',
      component: SearchResults,
      props: true
    }
  ]
})
