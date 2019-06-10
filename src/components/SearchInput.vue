<template>
  <v-flex>
    <v-autocomplete
      ref="autocomplete"
      v-model="model"
      solo
      append-outer-icon="search"
      single-line
      :placeholder="placeholder"
      :search-input.sync="search"
      hide-no-data
      persistent-hint
      :items="(switchInput || $route.path.indexOf('search') !== 1) ? statesComputed : states"
      @focus="switchInput = true"
      @keyup.enter="onSearch()"
      @click:append-outer="onSearch()"
    />
  </v-flex>
</template>

<script>
import { setTimeout } from 'timers'

export default {
  data() {
    return {
      model: null,
      search: null,
      switchInput: false,
      states: []
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
    },
    statesComputed() {
      let query = this.search
      return this.$store.getters.searchAutocomplete(query)
    }
  },
  created() {
    setTimeout(() => {
      this.search = this.query
    }, 1)
  },
  methods: {
    onSearch() {
      if (this.search !== undefined && this.search !== '') {
        this.$router.push('/search/' + this.search)
        this.$refs.autocomplete.blur()
      }
    }
  }
}
</script>

<style lang="scss">
.v-menu__content {
  border-radius: 25px !important;
  box-shadow: rgba(255, 82, 91, 0.09) 0px 5px 15px !important;
  border: 1px solid rgba(255, 82, 91, 0.337) !important;
}
.v-input__slot {
  border-radius: 30px !important;
  box-shadow: 0 5px 15px #ff525b17 !important;
  border: 1px solid #ff525b56;
  margin-bottom: 0;
}
.v-input__icon--append-outer {
  position: absolute !important;
  display: block;
  margin-left: -45px;
}
.v-input__icon--append {
  display: none;
}
</style>

