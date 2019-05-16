import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import SearchResults from '@/views/SearchResults'
import ShowAll from '@/views/ShowAll'
import DetailsPage from '@/views/DetailsPage'
import FilteredPage from '@/views/FilteredPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/search/:searchQuery',
      name: 'SearchResults',
      component: SearchResults,
      props: true,
    },
    {
      path: '/:type',
      name: 'ShowAll',
      component: ShowAll,
      props: true,
    },
    {
      path: '/:type/q=:queryType-:query',
      name: 'FilterPage',
      component: FilteredPage,
      props: true
    },
    {
      path: '/:type/:name',
      name: 'Details',
      component: DetailsPage,
      props: true,

    },
  ],
})
