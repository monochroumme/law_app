// default
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// styles
import './assets/styles/app.scss'
import './assets/styles/common.scss'

// plugins/modules
import axios from 'axios'
import TextareaAutosize from 'vue-textarea-autosize'
import { Multiselect } from '@/components/VueMultiselectImproved'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import PhoneMaskInput from 'vue-phone-mask-input'
import Toasted from 'vue-toasted'

// connecting plugins/modules
Vue.use(TextareaAutosize)
Vue.component('multiselect', Multiselect)
Vue.use(VueLoading)
Vue.component('loading', VueLoading)
Vue.component('phone-mask-input', PhoneMaskInput)
Vue.use(Toasted, {
  position: 'top-center',
  duration: 5000,
  className: 'custom-toast'
})

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_API_URL || ''

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
