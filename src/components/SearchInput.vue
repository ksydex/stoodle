<template>
  <v-flex>
    <v-autocomplete
      solo
      append-outer-icon="search"
      @click:append-outer="onSearch()"
      @keyup.enter="onSearch()"
      single-line
      :placeholder="placeholder"
      class="search-input"
      v-model="model"
      :search-input.sync="search"
      hide-no-data
      :items="states"
      persistent-hint
    />
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      model: null,
      search: null,
      states: ['Alama', 'bas', 'sdsdssd', 'sdsdsds']
    }
  },
  computed: {
    placeholder() {
      let placeholder = [
        'Что будем искать?',
        'Нуу... Что на этот раз?',
        'Хотите что то узнать?',
        'Ищем...',
        'Каво?',
        'Visual Studio...',
        'Программирование ФВТ...'
      ]
      return placeholder[Math.floor(Math.random() * placeholder.length)]
    },
    query() {
      return this.$route.params.searchQuery
    }
  },
  methods: {
    onSearch() {
      if (this.search !== undefined && this.search !== '')
        this.$router.push('/search/' + this.search)
    }
  },
  created() {
    setTimeout(() => {
      this.search = this.query
    }, 1)
  }
}
</script>

<style lang="scss">
.v-menu__content {
  border-radius: 30px !important;
  box-shadow: rgba(255, 82, 91, 0.09) 0px 5px 15px !important;
  border: 1px solid rgba(255, 82, 91, 0.337) !important;
}
.v-input__slot {
  margin-bottom: 0;
}
</style>

