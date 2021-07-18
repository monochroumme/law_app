import Vue from 'vue'
import Vuex from 'vuex'
import apiRequest from '@/utils/apiRequest'
import clientAuth from './client/auth'
import lawyerAuth from './lawyer/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    clientAuth,
    lawyerAuth
  },

  state: {
    user: null,
    defaultJurisdictions: [
      {
        jurisdiction: 'Azerbaijan',
        id: 0
      },
      {
        jurisdiction: 'Russia',
        id: 1
      },
      {
        jurisdiction: 'Georgia',
        id: 2
      },
      {
        jurisdiction: 'USA',
        id: 3,
        states: [
          {
            jurisdiction: 'California',
            id: 4
          },
          {
            jurisdiction: 'New York',
            id: 5
          }
        ]
      }
    ],
    defaultAreasOfLaw: [
      {
        name: 'Agriculture',
        id: 0
      },
      {
        name: 'IT',
        id: 1
      },
      {
        name: 'Health',
        id: 2
      },
      {
        name: 'Business',
        id: 3
      }
    ],
    jurisdictions: null,
    areasOfLaw: null,
    activeCases: null
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
    },

    setJurisdictions (state, payload) {
      state.jurisdictions = payload
    },

    setAreasOfLaw (state, payload) {
      state.areasOfLaw = payload
    },

    setActiveCases (state, payload) {
      state.activeCases = payload
    }
  },

  actions: {
    async login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        localStorage.setItem('token', 'randomToken')
        localStorage.setItem('userType', data.role)
        resolve()
        // apiRequest.post('/auth/singin/', data)
        //   .then(res => {
        //     localStorage.setItem('token', res.data.token)
        //     localStorage.setItem('userType', res.data.role)
        //     resolve(res)
        //   })
        //   .catch(e => {
        //     console.error(e.response.data.message)
        //     reject(e.response.data.message)
        //   })
      })
    },

    async getJurisdictions ({ commit }) {
      const res = await apiRequest.get('/jurisdiction/')
      if (res.data) {
        commit('setJurisdictions', res.data)
      }
    },

    async getAreasOfLaw ({ commit }) {
      const res = await apiRequest.get('/practiceArea/')
      if (res.data) {
        commit('setAreasOfLaw', res.data)
      }
    },

    async getActiveCases ({ commit }) {
      const res = await apiRequest.get('/cases/filtered/')
      if (res.data) {
        commit('setActiveCases', res.data)
      }
    }
  }
})
