<template>
  <div class="lawyer-cases">
    <div class="lawyer-cases__selector">
      <button :class="{active: this.caseState==='ACTIVE'}" @click="showActive()">Active</button>
      <button :class="{active: this.caseState==='APPLIED'}" @click="showApplied()">Applied</button>
      <button :class="{active: this.caseState==='DONE'}" @click="showCompleted()">Completed</button>
    </div>
    <div class="lawyer-cases__list" v-if="this.caseState==='ACTIVE'">
      <template v-for="item in this.$parent.lawyerCases">
        <div class="lawyer-cases__list__case" :key="item.id">
          <div class="lawyer-cases__list__case__title open-user-modal" @click="openDataModal(item.clientDto.id)">
            {{ item.clientDto.firstName }} {{ item.clientDto.lastName }}
          </div>
          <div class="lawyer-cases__list__case__img open-user-modal" @click="openDataModal(item.clientDto.id)">
            <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="lawyer-cases__list__case__case-descr">
            Case Description
          </div>
          <div class="lawyer-cases__list__case__description">
            {{ item.description }}
          </div>
          <div class="lawyer-cases__list__case__date">
            {{ item.creationDate.slice(0, 10) }}
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
    <div class="lawyer-cases__list" v-if="this.caseState==='APPLIED'">
      <template v-for="item in this.$parent.lawyerAppliedCases">
        <div class="lawyer-cases__list__case" :key="item.id">
          <div class="lawyer-cases__list__case__title open-user-modal" @click="openDataModal(item.clientDto.id)">
            {{ item.clientDto.firstName }} {{ item.clientDto.lastName }}
          </div>
          <div class="lawyer-cases__list__case__img open-user-modal" @click="openDataModal(item.clientDto.id)">
            <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="lawyer-cases__list__case__case-descr">
            Case Description
          </div>
          <div class="lawyer-cases__list__case__description">
            {{ item.description }}
          </div>
          <div class="lawyer-cases__list__case__date">
            {{ item.creationDate.slice(0, 10) }}
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
    <div class="lawyer-cases__list" v-if="this.caseState==='DONE'">
      <template v-for="item in this.$parent.lawyerDoneCases">
        <div class="lawyer-cases__list__case" :key="item.id">
          <div class="lawyer-cases__list__case__title open-user-modal" @click="openDataModal(item.clientDto.id)">
            {{ item.clientDto.firstName }} {{ item.clientDto.lastName }}
          </div>
          <div class="lawyer-cases__list__case__img open-user-modal" @click="openDataModal(item.clientDto.id)">
            <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="lawyer-cases__list__case__case-descr">
            Case Description
          </div>
          <div class="lawyer-cases__list__case__description">
            {{ item.description }}
          </div>
          <div class="lawyer-cases__list__case__date">
            {{ item.creationDate.slice(0, 10) }}
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
    <UserDataModal v-if="this.dataModal" v-model="userData" :visibility="dataModal"></UserDataModal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

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
  computed: {
    ...mapState(['userData'])
  },
  components: {
    UserDataModal: () => import('@/components/UserDataModal')
  },
  methods: {
    ...mapActions(['getFilteredCases', 'getClientDataById', 'archiveLawyerCase']),
    async archiveToggler (item) {
      await this.archiveLawyerCase(parseInt(item.id))
        .then(() => {
          this.lawyerCases.map((obj, index) => {
            if (obj.id === item.id) {
              this.lawyerCases.splice(index, 1)
            }
          })
          this.lawyerDoneCases.push(item)
        })
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
    async openDataModal (id) {
      await this.getClientDataById(id).then(() => {
        this.dataModal = true
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/lawyer-cases';
</style>
