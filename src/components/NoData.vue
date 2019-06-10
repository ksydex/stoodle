<template>
  <v-layout row wrap :justify-center="!$route.path.match(/search/gi)" align-center>
    <v-flex align-center d-flex justify-center xs12 md3 xl2>
      <img src="../assets/nodata1.png" alt="NoData.png">
    </v-flex>
    <v-flex xs12 md4 wrap class="text-xs-center">
      <h3
        class="display-1 text-main--text ma-4 text-xs-center"
      >По вашему запросу ничего не найдено :(</h3>
      <v-btn class="primary" flat @click="$router.push('/')">На главную</v-btn>
    </v-flex>
  </v-layout>
</template>
