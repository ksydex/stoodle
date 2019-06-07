<template>
  <v-layout
    row
    justify-center
  >
    <v-flex
      xs12
      md8
      xl6
      ml-3
    >
      <v-layout column>
        <v-flex
          class="text-xs-left my-3"
          xs6
        >
          <v-layout row>
            <h4 class="display-1 text-main--text mb-3">Отчёт</h4>
            <v-spacer />
            <v-btn
              depressed
              color="primary"
              @click="print()"
            >Печать</v-btn>
          </v-layout>
          <v-divider />
        </v-flex>
        <v-flex class="mb-3">
          <h5 class="title mb-2">
            {{ 'Программное обеспечение - всего ' + software.amount }}
          </h5>
          <v-layout row>
            <v-flex>
              <h5 class="subheading mb-1 font-weight-medium">По типам</h5>
              <p
                v-for="item in software.types"
                :key="item.name"
                class="body-1 mb-0"
              >
                {{ item.name + ' - ' + item.amount }}
              </p>
            </v-flex>
            <v-flex>
              <h5 class="subheading mb-1 font-weight-medium">По лицензиям</h5>
              <p
                v-for="item in software.licenses"
                :key="item.name"
                class="body-1 mb-0"
              >
                {{ item.name + ' - ' + item.amount }}
              </p>
            </v-flex>
            <v-flex>
              <h5 class="subheading mb-1 font-weight-medium">По годам</h5>
              <p
                v-for="item in software.years"
                :key="item.name"
                class="body-1 mb-0"
              >
                {{ item.name + ' - ' + item.amount }}
              </p>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex class="mb-3">
          <h5 class="title mb-2">
            {{ 'Факультеты - всего ' + faculty.amount }}
          </h5>
        </v-flex>

        <v-flex class="mb-3">
          <h5 class="title mb-2">
            {{ 'Направления - всего ' + speciality.amount }}
          </h5>
          <v-layout row>
            <v-flex>
              <h5 class="subheading mb-1 font-weight-medium">По факультетам</h5>
              <p
                v-for="item in speciality.faculties"
                :key="item.name"
                class="body-1 mb-0"
              >
                {{ item.name + ' - ' + item.amount }}
              </p>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex class="mb-3">
          <h5 class="title mb-2">
            {{ 'Дисциплины - всего ' + discipline.amount }}
          </h5>
        </v-flex>

        <v-flex class="mb-3">
          <h5 class="title mb-2">
            {{ 'Учебные программы - всего ' + subject.amount }}
          </h5>
          <v-layout row>
            <v-flex>
              <h5 class="subheading mb-1 font-weight-medium">По дисциплинам</h5>
              <p
                v-for="item in subject.disciplines"
                :key="item.name"
                class="body-1 mb-0"
              >
                {{ item.name + ' - ' + item.amount }}
              </p>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex class="mb-3">
          <h5 class="title mb-2">
            {{
              'Используется всего ' +
                swsj.amount +
                ' программного обеспечения на ' +
                subject.amount +
                ' учебных программах'
            }}
          </h5>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

const api = 'http://stoodle:81/api.php'
export default {
  data() {
    return {
      software: {
        amount: null,
        types: null,
        licenses: null,
        years: null
      },
      faculty: {
        amount: null
      },
      speciality: {
        amount: null,
        faculties: null
      },
      discipline: {
        amount: null
      },
      subject: {
        amount: null,
        disciplines: null
      },
      swsj: {
        amount: null
      }
    }
  },
  created() {
    this.loadSoftware()
    this.loadFaculty()
    this.loadSpeciality()
    this.loadDiscipline()
    this.loadSubject()
    this.loadSwsj()
  },
  methods: {
    print() {
      window.print()
    },
    loadSoftware() {
      axios
        .post(api, {
          type: 'get',
          data: `SELECT type as name, COUNT(type) as amount FROM software GROUP BY type`
        })
        .then(response => {
          this.software.types = response.data
        })
      axios
        .post(api, {
          type: 'get',
          data: `SELECT COUNT(*) AS amount FROM software`
        })
        .then(response => {
          this.software.amount = response.data[0].amount
        })
      axios
        .post(api, {
          type: 'get',
          data: `SELECT license as name, COUNT(license) as amount FROM software GROUP BY license`
        })
        .then(response => {
          this.software.licenses = response.data
        })
      axios
        .post(api, {
          type: 'get',
          data: `SELECT year as name, COUNT(year) as amount FROM software GROUP BY year`
        })
        .then(response => {
          this.software.years = response.data
        })
    },
    loadFaculty() {
      axios
        .post(api, {
          type: 'get',
          data: `SELECT COUNT(*) AS amount FROM faculty`
        })
        .then(response => {
          this.faculty.amount = response.data[0].amount
        })
    },
    loadSpeciality() {
      axios
        .post(api, {
          type: 'get',
          data: `SELECT COUNT(*) AS amount FROM speciality`
        })
        .then(response => {
          this.speciality.amount = response.data[0].amount
        })
      axios
        .post(api, {
          type: 'get',
          data: `SELECT faculty.name as name, COUNT(speciality.faculty) as amount FROM speciality LEFT JOIN faculty on speciality.faculty = faculty.id GROUP BY speciality.faculty`
        })
        .then(response => {
          this.speciality.faculties = response.data
        })
    },
    loadDiscipline() {
      axios
        .post(api, {
          type: 'get',
          data: `SELECT COUNT(*) AS amount FROM discipline`
        })
        .then(response => {
          this.discipline.amount = response.data[0].amount
        })
    },
    loadSubject() {
      axios
        .post(api, {
          type: 'get',
          data: `SELECT COUNT(*) AS amount FROM subject`
        })
        .then(response => {
          this.subject.amount = response.data[0].amount
        })
      axios
        .post(api, {
          type: 'get',
          data: `SELECT discipline.name as name, COUNT(subject.discipline) as amount FROM subject LEFT JOIN discipline on subject.discipline = discipline.id GROUP BY subject.discipline`
        })
        .then(response => {
          this.subject.disciplines = response.data
        })
    },
    loadSwsj() {
      axios
        .post(api, {
          type: 'get',
          data: `SELECT COUNT(*) AS amount FROM softwareonsubject`
        })
        .then(response => {
          this.swsj.amount = response.data[0].amount
        })
    }
  }
}
</script>
