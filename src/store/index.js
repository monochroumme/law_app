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
    lawyerFilteredCases: null,
    clientData: null,
    clientAllCases: null,
    lawyersApplied: null
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
      if (localStorage.getItem('userType') === 'ROLE_CLIENT') {
        const iDK = { id: 999, practiceArea: 'I don\'t know' }
        state.areasOfLaw.unshift(iDK)
      }
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
      state.lawyerFilteredCases = null
      state.lawyerFilteredCases = payload
    },

    setClientData (state, payload) {
      state.userData = payload
    },

    setLawyerData (state, payload) {
      state.userData = payload
    },

    setClientAllCases (state, payload) {
      state.clientAllCases = payload
    },

    setAppliedLawyers (state, payload) {
      state.lawyersApplied = payload
    },

    setLawyerCases (state, payload) {
      state.lawyerCases = payload
      console.log(payload)
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
            if (res.data.role === 'ROLE_LAWYER') {
              localStorage.setItem('jurisdictionDtoList', JSON.stringify(res.data.jurisdictionDtoList))
              localStorage.setItem('practiceAreaDtoList', JSON.stringify(res.data.practiceAreaDtoList))
            }
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
      if (localStorage.getItem('userType') === 'ROLE_CLIENT') {
        return new Promise((resolve, reject) => {
          apiRequest.put('/client/update/', data)
            .then(res => {
              localStorage.setItem('firstName', data.firstName)
              localStorage.setItem('lastName', data.lastName)
              localStorage.setItem('phoneNumber', data.phoneNumber)
              localStorage.setItem('email', data.email)
              resolve(res)
            })
            .catch(e => {
              console.error(e.response.data.message)
              reject(e.response.data.message)
            })
        })
      } else {
        return new Promise((resolve, reject) => {
          apiRequest.put('/lawyer/update/', data)
            .then(res => {
              resolve(res)
            })
            .catch(e => {
              console.error(e.response.data.message)
              reject(e.response.data.message)
            })
        })
      }
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

    async getClientAllCases ({ commit }, params) {
      let url = ''
      if (params.caseStates) {
        for (let i = 0; i < params.caseStates.length; ++i) {
          if (url.indexOf('?') === -1) {
            url = url + '?caseState=' + params.caseStates[i]
          } else {
            url = url + '&caseState=' + params.caseStates[i]
          }
        }
      }
      const res = await apiRequest.get(`/client/case/filtered${url}`)
      if (res.data) {
        commit('setClientAllCases', res.data)
      }
    },

    async getAppliedLawyers ({ commit }, caseId) {
      const res = await apiRequest.get(`/client/case/applications/${caseId}`)
      if (res.data) {
        commit('setAppliedLawyers', res.data)
      }
    },

    async getLawyerFilteredCases ({ commit }, params) {
      let url = '?isAscending=' + params.isAscending
      if (params.jurisdictionIdList) {
        for (let i = 0; i < params.jurisdictionIdList.length; ++i) {
          url = url + '&jurisdictionIdList=' + params.jurisdictionIdList[i].id
        }
      }
      if (params.practiceAreaIdList) {
        for (let i = 0; i < params.practiceAreaIdList.length; ++i) {
          url = url + '&practiceAreaIdList=' + params.practiceAreaIdList[i].id
        }
      }
      const res = await apiRequest.get(`/lawyer/filtered${url}`)
      if (res.data) {
        commit('setLawyerFilteredCases', res.data)
      }
    },

    async archiveClientCase ({ commit }, id) {
      const res = await apiRequest.put(`/client/case/archive?caseId=${id}`)
      if (res.data) {
        console.log('Case successfully archieved by client')
      }
    },

    async unarchiveClientCase ({ commit }, id) {
      const res = await apiRequest.put(`/client/case/unarchive?caseId=${id}`)
      if (res.data) {
        console.log('Case successfully unarchieved by client')
      }
    },

    async deleteClientCase ({ commit }, data) {
      const res = await apiRequest.delete(`/client/case/delete/${data}`)
      console.log(res)
      if (res.data) {
        console.log('Case successfully deleted by client')
      }
    },

    async deleteLawyerCase ({ commit }, data) {
      const res = await apiRequest.delete(`/lawyer/delete/${data}`)
      console.log(res)
      if (res.data) {
        console.log('Case successfully deleted by lawyer')
      }
    },

    async archiveLawyerCase ({ commit }, id) {
      const res = await apiRequest.put(`/lawyer/archive?caseId=${id}`)
      if (res.data) {
        console.log('Case successfully archieved by lawyer')
      }
    },

    async unarchiveLawyerCase ({ commit }, id) {
      const res = await apiRequest.put(`/lawyer/unarchive?caseId=${id}`)
      if (res.data) {
        console.log('Case successfully unarchieved by lawyer')
      }
    },

    async applyToCase ({ commit }, data) {
      const res = await apiRequest.post(`lawyer/${data.id}/apply?comment=${data.comment}`)
      if (res.data) {
        console.log('Successfully applied to case')
      }
    },

    async assignLawyer ({ commit }, id) {
      const res = await apiRequest.put(`/client/case/application/assign?applicationId=${id}`)
      if (res.data) {
        console.log('Successfully assigned lawyer to case')
      }
    },

    async getClientDataById ({ commit }, id) {
      const res = await apiRequest.get(`/lawyer/client?clientId=${id}`)
      if (res.data) {
        commit('setClientData', res.data)
      }
    },

    async getLawyerDataById ({ commit }, id) {
      const res = await apiRequest.get(`/client/lawyer?lawyerId=${id}`)
      if (res.data) {
        commit('setLawyerData', res.data)
      }
    },

    async getLawyerCases ({ commit }) {
      const res = await apiRequest.get('/lawyer/myCases/')
      if (res.data) {
        commit('setLawyerCases', res.data)
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
    },
    async editClientCase ({ commit }, data) {
      return new Promise((resolve, reject) => {
        apiRequest.put(`/client/case/update/${data.id}`, {
          description: data.description,
          jurisdictionIdList: data.jurisdictionIdList,
          practiceAreaIdList: data.practiceAreaIdList
        })
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(e => {
            console.log(e.response.data)
          })
      })
    }
  }
})
