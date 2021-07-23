<template>
  <div class="page applied_lawyers-page">
    <div class="applied_lawyers-page__title">Applied lawyers</div>
    <div class="applied_lawyers-page__list">
      <div v-for="(item, index) in lawyersApplied" :key="item.id" class="applied_lawyers-page__list__block">
        <div class="applied_lawyers-page__list__block__name open-user-modal" @click="openUserModal(item.lawyerDto.id)">
          {{ item.lawyerDto.firstName }} {{ item.lawyerDto.lastName }}
        </div>
        <div class="applied_lawyers-page__list__block__img open-user-modal" @click="openUserModal(item.lawyerDto.id)">
          <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
        </div>
        <span>Comments</span>
        <div class="applied_lawyers-page__list__block__separator"/>
        <div class="applied_lawyers-page__list__block__commentary">
          {{ item.comment }}
        </div>
        <div class="applied_lawyers-page__list__block__date">
          {{ item.date }}
        </div>
        <div class="applied_lawyers-page__list__block__btns">
          <button class="applied_lawyers-page__list__block__btns__btn-def" @click="chooseLawyer(item.id)">Choose lawyer</button>
          <router-link class="applied_lawyers-page__list__block__btns__btn-def" to="/client/chats/">
            Contact lawyer
          </router-link>
          <button v-on:click="hideLawyer(index, item)" class="applied_lawyers-page__list__block__btns__btn-blue">Hide</button>
        </div>
      </div>
    </div>
    <UserDataModal v-if="userModal" :clientData="userData" :visibility="userModal"></UserDataModal>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: 'applied-lawyers',

  data () {
    return {
      items: [
        { id: 1, name: 'Lawyer Name', date: '07-07-2021', description: 'random descr 1' },
        { id: 2, name: 'Lawyer Name', date: '07-07-2021', description: 'random descr 2' },
        { id: 3, name: 'Lawyer Name', date: '07-07-2021', description: 'random descr 3' },
        { id: 4, name: 'Lawyer Name', date: '07-07-2021', description: 'random descr 4' },
        { id: 5, name: 'Lawyer Name', date: '07-07-2021', description: 'random descr 5' },
        { id: 6, name: 'Lawyer Name', date: '07-07-2021', description: 'random descr 6' }
      ],
      userModal: false
    }
  },
  components: {
    UserDataModal: () => import('@/components/UserDataModal')
  },
  computed: {
    ...mapState(['lawyersApplied', 'userData', 'jurisdictions', 'areasOfLaw']),
    caseId () {
      return this.$route.params.caseId
    }
  },
  created () {
    if (!this.lawyersApplied) {
      this.getAppliedLawyers(this.caseId)
    }
    if (!this.jurisdictions) {
      this.getJurisdictions()
      this.getAreasOfLaw()
    }
  },
  methods: {
    ...mapActions(['getAppliedLawyers', 'getLawyerDataById', 'getJurisdictions', 'getAreasOfLaw', 'assignLawyer']),
    hideLawyer: function (index, item) {
      this.items.splice(index, 1)
    },
    async chooseLawyer (id) {
      await this.assignLawyer(id).then(() => {
        this.$router.push('/client/chats')
      })
    },
    async openUserModal (id) {
      await this.getLawyerDataById(id).then(() => {
        this.userModal = true
        this.userData.jurisdictions = []
        this.userData.practiceAreas = []
        this.jurisdictions.map(j => {
          this.userData.jurisdictionIdList.map(jL => {
            if (j.id === jL) {
              this.userData.jurisdictions.push(j)
            }
          })
        })
        this.areasOfLaw.map(p => {
          this.userData.practiceIdList.map(pL => {
            if (p.id === pL) {
              this.userData.practiceAreas.push(p)
            }
          })
        })
      })
    },
    openUserModalImg: function (id) {
      this.userModal = true
      this.getLawyerDataById(id)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/applied-lawyers'
</style>
