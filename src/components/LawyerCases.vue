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
            <img v-if="item.clientDto.imageDto" :src="item.clientDto.imageDto.url" alt="">
            <img v-else class="open-user-modal" src="/media/common/user.svg" alt="">
          </div>
          <div class="lawyer-cases__list__case__case-descr">
            Case Description
          </div>
          <div class="lawyer-cases__list__case__description open-case-modal" @click="showFullCase(item.description)">
            {{ item.description.slice(0, 120) }} {{ (item.description.length > 120 ? '...' : '') }}
          </div>
          <div class="lawyer-cases__list__case__date">
            {{ item.creationDate.slice(0, 10) }}
          </div>
          <div class="lawyer-cases__list__case__separator"></div>
          <div v-if="caseState==='ACTIVE' || caseState==='DONE'" class="lawyer-cases__list__case__btns">
            <div @click="routeToChat(item.clientDto.id)" class="lawyer-cases__list__case__btns__btn-def" to="/lawyer/chats">
              Chat
            </div>
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
            <img v-if="item.clientDto.imageDto" :src="item.clientDto.imageDto.url" alt="">
            <img v-else class="open-user-modal" src="/media/common/user.svg" alt="">
          </div>
          <div class="lawyer-cases__list__case__case-descr">
            Case Description
          </div>
          <div class="lawyer-cases__list__case__description open-case-modal" @click="showFullCase(item.description)">
            {{ item.description.slice(0, 120) }} {{ (item.description.length > 120 ? '...' : '') }}
          </div>
          <div class="lawyer-cases__list__case__date">
            {{ item.creationDate.slice(0, 10) }}
          </div>
          <div class="lawyer-cases__list__case__separator"></div>
          <div v-if="caseState==='ACTIVE' || caseState==='DONE'" class="lawyer-cases__list__case__btns">
            <div @click="routeToChat(item.clientDto.id)" class="lawyer-cases__list__case__btns__btn-def" to="/lawyer/chats">
              Chat
            </div>
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
            <img v-if="item.clientDto.imageDto" :src="item.clientDto.imageDto.url" alt="">
            <img v-else class="open-user-modal" src="/media/common/user.svg" alt="">
          </div>
          <div class="lawyer-cases__list__case__case-descr">
            Case Description
          </div>
          <div class="lawyer-cases__list__case__description open-case-modal" @click="showFullCase(item.description)">
            {{ item.description.slice(0, 120) }} {{ (item.description.length > 120 ? '...' : '') }}
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
    <FullCaseModal v-if="caseModal && this.caseDescr.length >= 120" v-model="this.caseDescr" :visibility="caseModal"></FullCaseModal>
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
      dataModal: false,
      caseModal: false,
      caseDescr: ''
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  components: {
    UserDataModal: () => import('@/components/UserDataModal'),
    FullCaseModal: () => import('@/components/FullCaseModal')
  },
  methods: {
    ...mapActions(['getFilteredCases', 'getClientDataById', 'archiveLawyerCase', 'dataForChat']),

    showFullCase: function (data) {
      this.caseModal = true
      this.caseDescr = data
    },
    async routeToChat (lawyerId) {
      await this.dataForChat({
        receiverId: lawyerId,
        receiverRole: 'ROLE_CLIENT',
        senderId: parseInt(localStorage.userId),
        senderRole: localStorage.userType
      }).then(() => {
        this.$router.push('/lawyer/chats')
      })
    },
    async archiveToggler (item) {
      await this.archiveLawyerCase(parseInt(item.id))
        .then(() => {
          this.$parent.lawyerCases.map((obj, index) => {
            if (obj.id === item.id) {
              this.$parent.lawyerCases.splice(index, 1)
            }
          })
          this.$parent.lawyerDoneCases.push(item)
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
