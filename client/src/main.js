import Vue from 'vue'

import router from './router'

import fetch from '@/utils/fetch.js'

import App from './App'

Vue.config.productionTip = false

Vue.use( fetch )

new Vue( {
  router,
  render: h => h( App )
} ).$mount( '#app' )
