<template>
  <div class="lawyer-cases">
    <div class="lawyer-cases__selector">
      <button :class="{active: this.caseState==='ACTIVE'}" @click="showActive()">Active</button>
      <button :class="{active: this.caseState==='APPLIED'}" @click="showApplied()">Applied</button>
      <button :class="{active: this.caseState==='DONE'}" @click="showCompleted()">Completed</button>
    </div>
    <div class="lawyer-cases__list">
      <template v-for="item in cases">
        <div class="lawyer-cases__list__case" :key="item.id" v-if="item.caseState===caseState">
          <div class="lawyer-cases__list__case__title open-user-modal" @click="openDataModal()">
            {{ item.name }}
          </div>
          <div class="lawyer-cases__list__case__img open-user-modal" @click="openDataModal()">
            <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="lawyer-cases__list__case__case-descr">
            Case Description
          </div>
          <div class="lawyer-cases__list__case__description">
            {{ item.description }}
          </div>
          <div class="lawyer-cases__list__case__date">
            {{ item.date }}
          </div>
          <div class="lawyer-cases__list__case__separator"></div>
          <div v-if="caseState==='ACTIVE' || caseState==='DONE'" class="lawyer-cases__list__case__btns">
            <router-link class="lawyer-cases__list__case__btns__btn-def" to="/lawyer/chats">
              Chat
            </router-link>
            <button v-if="caseState!=='DONE'" v-on:click="archiveToggler(item)" class="lawyer-cases__list__case__btns__btn-blue">Archive</button>
            <button v-if="caseState==='DONE'" class="lawyer-cases__list__case__btns__btn-blue">Delete</button>
          </div>
        </div>
      </template>
    </div>
    <UserDataModal v-model="dataModal" :visibility="dataModal"></UserDataModal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LawyerCases',
  props: {
    cases: {
      type: Array
    }
  },
  data () {
    return {
      caseState: 'ACTIVE',
      dataModal: false
    }
  },
  components: {
    UserDataModal: () => import('@/components/UserDataModal')
  },
  methods: {
    ...mapActions(['getFilteredCases']),
    archiveToggler: function (item) {
      if (item.ARCHIVED_BY_LAWYER) {
        item.ARCHIVED_BY_LAWYER = ''
      } else {
        item.ARCHIVED_BY_LAWYER = 'ARCHIVED_BY_LAWYER'
      }
    },
    showActive: function () {
      this.caseState = 'ACTIVE'
    },
    showApplied: function () {
      this.caseState = 'APPLIED'
    },
    showCompleted: function () {
      this.caseState = 'DONE'
    },
    openDataModal: function () {
      this.dataModal = true
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/lawyer-cases';
</style>
