import Vue from 'vue'
import apiRequest from '@/utils/apiRequest'

export default {
  namespaced: true,

  actions: {
    // eslint-disable-next-line no-empty-pattern
    async register ({}, data) {
      return new Promise((resolve, reject) => {
        apiRequest.postWithoutAuth('/auth/client_register/', data)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            if (e.response.data.message === 'email-exist') {
              Vue.prototype.$toasted.error('A user with the entered email already exists. Please, enter another email.')
              reject(e.response.data.message)
            } else {
              console.error(e.response.data.message)
              reject(e.response.data.message)
            }
          })
      })
    }
  }
}
