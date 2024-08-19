import Vue from 'vue'

// vue components
import App from './App.vue'

// vue router
import router from './router'

// bootstrap-vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// global style
import './assets/styles/global.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Use vue-axios with axios
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
