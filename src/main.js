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
import vClickOutside from 'v-click-outside'

// connecting plugins/modules
Vue.use(vClickOutside)
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

Vue.directive('click-outside', {
  bind: function (el, binding, vNode) {
    // Provided expression must evaluate to a function.
    if (typeof binding.value !== 'function') {
      const compName = vNode.context.name
      let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
      if (compName) {
        warn += ` Found in component '${compName}'`
      }

      console.warn(warn)
    }
    // Define Handler and cache it on the element
    const bubble = binding.modifiers.bubble
    const handler = (e) => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = handler

    // add Event Listeners
    document.addEventListener('click', handler)
  },

  unbind: function (el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null
  }
})

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_API_URL || ''

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
