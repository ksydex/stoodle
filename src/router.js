import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import SearchResults from '@/views/SearchResults'
import Software from '@/views/Software'
import Subject from '@/views/Subject'
import Faculty from '@/views/Faculty'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/search/:searchQuery',
      name: 'SearchResults',
      component: SearchResults,
      props: true,
    },
    {
      path: '/software/:name',
      name: 'Software',
      component: Software,
      props: true,
    },
    {
      path: '/subject/:name',
      name: 'Subject',
      component: Subject,
      props: true,
    },
    {
      path: '/faculty/:name',
      name: 'Faculty',
      component: Faculty,
      props: true,
    },
  ],
})
