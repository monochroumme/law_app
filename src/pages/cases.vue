<template>
  <div class="page cases-page">
    <active-cases v-if="this.userType==='ROLE_CLIENT'" v-model="this.activeCases" :cases="this.activeCases" :archieved="this.inactiveCases"/>
    <lawyer-cases v-if="this.userType==='ROLE_LAWYER'" v-model="this.lawyerItems" :cases="this.lawyerItems" />
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: 'cases',

  components: {
    ActiveCases: () => import('@/components/ActiveCases'),
    LawyerCases: () => import('@/components/LawyerCases')
  },
  data () {
    return {
      userType: '',
      activeCases: null,
      inactiveCases: null,
      items: [
        { id: 1, date: '07-07-2021', description: 'random descr 1', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 2, date: '07-07-2021', description: 'random descr 2', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 3, date: '07-07-2021', description: 'random descr 3', ARCHIVED_BY_CLIENT: '' },
        { id: 4, date: '07-07-2021', description: 'random descr 4', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 5, date: '07-07-2021', description: 'random descr 5', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 6, date: '07-07-2021', description: 'random descr 6', ARCHIVED_BY_CLIENT: '' },
        { id: 7, date: '07-07-2021', description: 'random descr 7', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 8, date: '07-07-2021', description: 'random descr 8', ARCHIVED_BY_CLIENT: '' }
      ],
      lawyerItems: [
        { id: 1, date: '07-07-2021', name: 'Test Client 1', description: 'random descr 1', ARCHIVED_BY_LAWYER: 'ARCHIVED_BY_LAWYER', caseState: 'ACTIVE' },
        { id: 2, date: '07-07-2021', name: 'Test Client 2', description: 'random descr 2', ARCHIVED_BY_LAWYER: 'ARCHIVED_BY_LAWYER', caseState: 'ACTIVE' },
        { id: 3, date: '07-07-2021', name: 'Test Client 3', description: 'random descr 3', ARCHIVED_BY_LAWYER: 'ARCHIVED_BY_LAWYER', caseState: 'APPLIED' },
        { id: 4, date: '07-07-2021', name: 'Test Client 4', description: 'random descr 4', ARCHIVED_BY_LAWYER: '', caseState: 'APPLIED' },
        { id: 5, date: '07-07-2021', name: 'Test Client 5', description: 'random descr 5', ARCHIVED_BY_LAWYER: '', caseState: 'DONE' },
        { id: 6, date: '07-07-2021', name: 'Test Client 6', description: 'random descr 6', ARCHIVED_BY_LAWYER: '', caseState: 'DONE' }
      ]
    }
  },

  computed: {
    ...mapState(['freeCases', 'appliedCases', 'archievedCases', 'doneCases', 'lawyerFilteredCases'])
  },
  async created () {
    if (localStorage.userType) {
      this.userType = localStorage.userType
    }
    if (!this.activeCases && this.userType === 'ROLE_CLIENT') {
      await this.getFreeCases({ caseState: 'FREE' })
      await this.getAppliedCases({ caseState: 'APPLIED' })
      if (this.freeCases || this.appliedCases) {
        this.activeCases = [...this.freeCases, ...this.appliedCases]
      }
    }

    if (!this.inactiveCases && this.userType === 'ROLE_CLIENT') {
      await this.getArchievedCases({ caseState: 'ARCHIVED_BY_CLIENT' })
      await this.getDoneCases({ caseState: 'DONE' })
      if (this.archievedCases || this.doneCases) {
        this.inactiveCases = [...this.archievedCases, ...this.doneCases]
      }
    }
  },
  methods: {
    ...mapActions(['getFreeCases', 'getAppliedCases', 'getArchievedCases', 'getDoneCases', 'getLawyerFilteredCases'])
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/cases';
</style>
