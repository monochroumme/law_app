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
    activeCases: null,
    lawyerFilteredCases: null
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
      console.log(payload)
    },

    setJurisdictions (state, payload) {
      state.jurisdictions = payload
    },

    setAreasOfLaw (state, payload) {
      state.areasOfLaw = payload
    },

    setActiveCases (state, payload) {
      state.activeCases = payload
    },

    setFreeCases (state, payload) {
      state.freeCases = payload
    },

    setAppliedCases (state, payload) {
      state.appliedCases = payload
    },

    setArchievedCases (state, payload) {
      state.archievedCases = payload
    },

    setDoneCases (state, payload) {
      state.doneCases = payload
    },

    setLawyerFilteredCases (state, payload) {
      state.lawyerFilteredCases = payload
      console.log(state.lawyerFilteredCases)
    }
  },

  actions: {
    async login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        apiRequest.postWithoutAuth('/auth/singin/', data)
          .then(res => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userType', res.data.role)
            localStorage.setItem('userId', res.data.id)
            localStorage.setItem('firstName', res.data.firstName)
            localStorage.setItem('lastName', res.data.lastName)
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('phoneNumber', res.data.phoneNumber)
            commit('setUser', res.data)
            resolve(res)
          })
          .catch(e => {
            console.error(e.response.data.message)
            reject(e.response.data.message)
          })
      })
    },

    async editUser ({ commit }, data) {
      return new Promise((resolve, reject) => {
        apiRequest.put(`/client/update?firstName=${data.firstName}&lastName=${data.lastName}&phoneNumber=${data.phoneNumber}`)
          .then(res => {
            localStorage.setItem('firstName', data.firstName)
            localStorage.setItem('lastName', data.lastName)
            localStorage.setItem('phoneNumber', data.phoneNumber)
            resolve(res)
          })
          .catch(e => {
            console.error(e.response.data.message)
            reject(e.response.data.message)
          })
      })
    },

    async resetPassword ({ commit }, data) {
      return new Promise((resolve, reject) => {
        if (localStorage.getItem('userType') === 'ROLE_CLIENT') {
          apiRequest.post('/client/password_reset/', data)
            .then(res => {
              resolve(res)
            })
            .catch(e => {
              console.error(e.response.data.message)
              reject(e.response.data.message)
            })
        } else {
          apiRequest.post('/lawyer/password_reset/', data)
            .then(res => {
              resolve(res)
            })
            .catch(e => {
              console.error(e.response.data.message)
              reject(e.response.data.message)
            })
        }
      })
    },

    async getJurisdictions ({ commit }) {
      const res = await apiRequest.getWithoutAuth('/jurisdiction/')
      if (res.data) {
        commit('setJurisdictions', res.data)
      }
    },

    async getAreasOfLaw ({ commit }) {
      const res = await apiRequest.getWithoutAuth('/practiceArea/')
      if (res.data) {
        commit('setAreasOfLaw', res.data)
      }
    },

    async getFreeCases ({ commit }, params) {
      const res = await apiRequest.getWithParams('/client/case/filtered', params)
      if (res.data) {
        commit('setFreeCases', res.data)
      }
    },

    async getAppliedCases ({ commit }, params) {
      const res = await apiRequest.getWithParams('/client/case/filtered', params)
      if (res.data) {
        commit('setAppliedCases', res.data)
      }
    },

    async getArchievedCases ({ commit }, params) {
      const res = await apiRequest.getWithParams('/client/case/filtered', params)
      if (res.data) {
        commit('setArchievedCases', res.data)
      }
    },

    async getDoneCases ({ commit }, params) {
      const res = await apiRequest.getWithParams('/client/case/filtered', params)
      if (res.data) {
        commit('setDoneCases', res.data)
      }
    },

    async getLawyerFilteredCases ({ commit }, params) {
      const res = await apiRequest.getWithParams('/lawyer/filtered', params)
      if (res.data) {
        commit('setLawyerFilteredCases')
      }
    },

    async archiveClientCase ({ commit }, id) {
      const res = await apiRequest.put(`/client/case/archive?caseId=${id}`)
      if (res.data) {
        console.log('Case successfully archieved by client')
      }
    },

    async deleteClientCase ({ commit }, data) {
      const res = await apiRequest.delete(`/client/case/delete/${data}`)
      if (res.data) {
        console.log('Case successfully deleted by client')
      }
    },

    async getActiveCases ({ commit }) {
      const res = await apiRequest.get('/client/case/')
      if (res.data) {
        commit('setActiveCases', res.data)
      }
    },
    async addClientCase ({ commit }, data) {
      return new Promise((resolve, reject) => {
        apiRequest.post('/client/case/create', data)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            console.error(e.response.data.message)
            reject(e.response.data.message)
          })
      })
    }
  }
})
