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
    clientActiveCases: null,
    clientArchivedCases: null,
    lawyersApplied: null,
    lawyerCases: null,
    lawyerAppliedCases: null,
    lawyerDoneCases: null,
    allChats: null,
    chatMessages: null,
    chatSession: null,
    goToChat: null,
    notifications: null
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
      console.log(payload)
    },

    setJurisdictions (state, payload) {
      const jurisdictions = []

      payload.forEach(j => {
        const states = []

        if (j.usaStateList) {
          j.usaStateList.forEach(s => {
            states.push({
              id: s.usaStatesId,
              jurisdiction: s.usaStates,
              isState: true
            })
          })
        }

        const toPush = {
          ...j
        }

        if (states.length) { toPush.states = states }

        jurisdictions.push(toPush)
      })

      state.jurisdictions = jurisdictions
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

    unsetClientData (state) {
      state.userData = null
    },

    setLawyerData (state, payload) {
      state.userData = payload
    },

    unsetLawyerData (state, payload) {
      state.userData = null
    },

    setClientAllCases (state, payload) {
      state.clientAllCases = payload
    },

    setClientActiveCases (state, payload) {
      state.clientActiveCases = payload
    },

    setClientArchivedCases (state, payload) {
      state.clientArchivedCases = payload
    },

    setAppliedLawyers (state, payload) {
      state.lawyersApplied = payload
    },

    setLawyerCases (state, payload) {
      state.lawyerCases = payload
    },

    setLawyerAppliedCases (state, payload) {
      state.lawyerAppliedCases = payload
    },

    setLawyerDoneCases (state, payload) {
      state.lawyerDoneCases = payload
    },

    setChatSession (state, payload) {
      state.chatSession = payload
    },

    setAllChats (state, payload) {
      state.allChats = payload
    },

    setChatMessages (state, payload) {
      state.chatMessages = payload
    },

    setDataForChat (state, payload) {
      state.goToChat = payload
    },

    unsetDataForChat (state) {
      state.goToChat = null
    },

    setNotifications (state, payload) {
      state.notifications = payload
    }
  },

  actions: {
    async login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        localStorage.clear()
        apiRequest.postWithoutAuth('/auth/singin/', data)
          .then(res => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userType', res.data.role)
            localStorage.setItem('userId', res.data.id)
            localStorage.setItem('firstName', res.data.firstName)
            localStorage.setItem('lastName', res.data.lastName)
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('phoneNumber', res.data.phoneNumber)
            if (res.data.imageUrl) {
              localStorage.setItem('profilePic', res.data.imageUrl)
            }
            if (res.data.role === 'ROLE_LAWYER') {
              localStorage.setItem('jurisdictionDtoList', JSON.stringify(res.data.jurisdictionDtoList))
              localStorage.setItem('practiceAreaDtoList', JSON.stringify(res.data.practiceAreaDtoList))
            }
            commit('setUser', res.data)
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    async restorePassword ({ commit }, data) {
      return new Promise((resolve, reject) => {
        apiRequest.postWithoutAuth('/auth/forgot_password/', data)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    async resetPasswordWithoutAuth ({ commit }, data) {
      return new Promise((resolve, reject) => {
        apiRequest.postWithoutAuth(`/auth/reset_password?token=${data.token}&role=${data.role}`, {
          newPassword: data.newPassword,
          repeatPassword: data.repeatPassword
        })
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
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
              localStorage.setItem('firstName', data.firstName)
              localStorage.setItem('lastName', data.lastName)
              localStorage.setItem('phoneNumber', data.phoneNumber)
              localStorage.setItem('email', data.email)
              localStorage.setItem('jurisdictionDtoList', JSON.stringify(data.jurisdictionIdList))
              localStorage.setItem('practiceAreaDtoList', JSON.stringify(data.practiceIdList))
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

    async uploadImg ({ commit }, data) {
      return new Promise((resolve, reject) => {
        if (localStorage.getItem('userType') === 'ROLE_LAWYER') {
          apiRequest.postFile('/lawyer/pic/upload', data)
            .then(res => {
              console.log(res)
              localStorage.setItem('profilePic', res.data.url)
              resolve(res)
            })
            .catch(e => {
              console.error(e.response.data.message)
              reject(e.response.data.message)
            })
        } else {
          apiRequest.postFile('/client/pic/upload', data)
            .then(res => {
              localStorage.setItem('profilePic', res.data.url)
              resolve(res)
            })
            .catch(e => {
              console.error(e.response.data.message)
              reject(e.response.data.message)
            })
        }
      })
    },

    async deleteImg () {
      return new Promise((resolve, reject) => {
        if (localStorage.getItem('userType') === 'ROLE_LAWYER') {
          apiRequest.delete('/lawyer/pic/delete')
            .then(res => {
              console.log(res)
              localStorage.removeItem('profilePic')
              resolve(res)
            })
            .catch(e => {
              console.error(e.response.data.message)
              reject(e.response.data.message)
            })
        } else {
          apiRequest.delete('/client/pic/delete')
            .then(res => {
              localStorage.removeItem('profilePic')
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
      return new Promise((resolve, reject) => {
        apiRequest.getWithoutAuth('/jurisdiction/').then(res => {
          if (res.data) {
            commit('setJurisdictions', res.data)
            resolve(true)
          }
        }).catch(e => {
          reject(e)
        })
      })
    },

    async getAreasOfLaw ({ commit }) {
      return new Promise((resolve, reject) => {
        apiRequest.getWithoutAuth('/practiceArea/').then(res => {
          if (res.data) {
            commit('setAreasOfLaw', res.data)
            resolve(true)
          }
        }).catch(e => {
          reject(e)
        })
      })
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

    async getClientActiveCases ({ commit }) {
      const res = await apiRequest.get('/client/case/active/')
      if (res.data) {
        console.log(res)
        commit('setClientActiveCases', res.data)
      }
    },

    async getClientArchivedCases ({ commit }) {
      const res = await apiRequest.get('/client/case/archived/')
      if (res.data) {
        commit('setClientArchivedCases', res.data)
      }
    },

    async getAppliedLawyers ({ commit }, caseId) {
      const res = await apiRequest.get(`/client/case/applications/${caseId}`)
      if (res.data) {
        commit('setAppliedLawyers', res.data)
      }
    },

    async getLawyerFilteredCases ({ commit }, params) {
      console.log(params)
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
      const res = await apiRequest.get(`/lawyer/case/filtered${url}`)
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
      const res = await apiRequest.delete(`/lawyer/case/delete/${data}`)
      console.log(res)
      if (res.data) {
        console.log('Case successfully deleted by lawyer')
      }
    },

    async archiveLawyerCase ({ commit }, id) {
      const res = await apiRequest.put(`/lawyer/case/archive?caseId=${id}`)
      if (res.data) {
        console.log('Case successfully archieved by lawyer')
      }
    },

    async unarchiveLawyerCase ({ commit }, id) {
      const res = await apiRequest.put(`/lawyer/case/unarchive?caseId=${id}`)
      if (res.data) {
        console.log('Case successfully unarchieved by lawyer')
      }
    },

    async applyToCase ({ commit }, data) {
      const res = await apiRequest.post(`lawyer/case/${data.id}/apply?comment=${data.comment}`)
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
      commit('unsetClientData')
      const res = await apiRequest.get(`/lawyer/client?clientId=${id}`)
      if (res.data) {
        commit('setClientData', res.data)
      }
    },

    async getLawyerDataById ({ commit }, id) {
      commit('unsetLawyerData')
      const res = await apiRequest.get(`/client/lawyer?lawyerId=${id}`)
      if (res.data) {
        commit('setLawyerData', res.data)
      }
    },

    async getLawyerCases ({ commit }) {
      const res = await apiRequest.get('/lawyer/case/myCases/')
      if (res.data) {
        commit('setLawyerCases', res.data)
      }
    },

    async getLawyerAppliedCases ({ commit }) {
      const res = await apiRequest.get('/lawyer/case/applied')
      if (res.data) {
        commit('setLawyerAppliedCases', res.data)
      }
    },

    async getLawyerDoneCases ({ commit }) {
      const res = await apiRequest.get('/lawyer/case/done')
      if (res.data) {
        commit('setLawyerDoneCases', res.data)
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
    },
    async establishChatSession ({ commit }, data) {
      return new Promise((resolve, reject) => {
        apiRequest.put('/chat/rooms/establish', data)
          .then(res => {
            commit('setChatSession', res.data)
            resolve(res)
          })
          .catch(e => {
            console.log(e.response.data)
          })
      })
    },
    async getAllChats ({ commit }, data) {
      return new Promise((resolve, reject) => {
        apiRequest.get(`/chat/rooms/${data.userId}?role=${data.role}`) // &role=${data.role}`)
          .then((res) => {
            commit('setAllChats', res.data)
            resolve(true)
          })
          .catch(e => {
            console.log(e.response.data)
            reject(e)
          })
      })
    },
    async getExistingChatSessionMessages ({ commit }, { senderId, recipientId }) {
      const res = await apiRequest.get(`/chat/messages/${senderId}/${recipientId}`)
      if (res.data) {
        // commit('setChatMessages', res.data)
        return res.data
      }
      return []
    },
    async dataForChat ({ commit }, data) {
      commit('setDataForChat', data)
    },
    async rmDataForChat ({ commit }) {
      commit('unsetDataForChat')
    },
    async getNotifications ({ commit }) {
      if (localStorage.getItem('userType') === 'ROLE_LAWYER') {
        await apiRequest.get('/lawyer/notifications/')
          .then((res) => {
            commit('setNotifications', res.data)
          })
      } else {
        await apiRequest.get('/client/notifications/')
          .then((res) => {
            commit('setNotifications', res.data)
          })
      }
    },
    async uploadChatImg ({ commit }, data) {
      return new Promise((resolve, reject) => {
        apiRequest.post('/chat/upload', data)
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
