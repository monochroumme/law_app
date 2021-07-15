<template>
  <div class="page cases-page">
<<<<<<< HEAD
    <active-cases v-if="this.userType==='ROLE_CLIENT'" v-model="cases" :cases="items"/>
    <lawyer-cases v-else v-model="cases" :cases="lawyerItems" />
=======
    <active-cases v-model="cases" :cases="items"/>
>>>>>>> 00d04976d1e5297c3ad7fe581b4d429033640bd3
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: 'cases',

  components: {
<<<<<<< HEAD
    ActiveCases: () => import('@/components/ActiveCases'),
    LawyerCases: () => import('@/components/LawyerCases')
=======
    ActiveCases: () => import('@/components/ActiveCases')
>>>>>>> 00d04976d1e5297c3ad7fe581b4d429033640bd3
  },

  data () {
    return {
<<<<<<< HEAD
      userType: '',
=======
>>>>>>> 00d04976d1e5297c3ad7fe581b4d429033640bd3
      items: [
        { id: 1, date: '07-07-2021', description: 'random descr 1', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 2, date: '07-07-2021', description: 'random descr 2', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 3, date: '07-07-2021', description: 'random descr 3', ARCHIVED_BY_CLIENT: '' },
        { id: 4, date: '07-07-2021', description: 'random descr 4', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 5, date: '07-07-2021', description: 'random descr 5', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 6, date: '07-07-2021', description: 'random descr 6', ARCHIVED_BY_CLIENT: '' },
        { id: 7, date: '07-07-2021', description: 'random descr 7', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
<<<<<<< HEAD
        { id: 8, date: '07-07-2021', description: 'random descr 8', ARCHIVED_BY_CLIENT: '' }
      ],
      lawyerItems: [
        { id: 1, date: '07-07-2021', name: 'Test Client 1', description: 'random descr 1', ARCHIVED_BY_LAWYER: 'ARCHIVED_BY_LAWYER', caseState: 'ACTIVE' },
        { id: 2, date: '07-07-2021', name: 'Test Client 2', description: 'random descr 2', ARCHIVED_BY_LAWYER: 'ARCHIVED_BY_LAWYER', caseState: 'ACTIVE' },
        { id: 3, date: '07-07-2021', name: 'Test Client 3', description: 'random descr 3', ARCHIVED_BY_LAWYER: 'ARCHIVED_BY_LAWYER', caseState: 'APPLIED' },
        { id: 4, date: '07-07-2021', name: 'Test Client 4', description: 'random descr 4', ARCHIVED_BY_LAWYER: '', caseState: 'APPLIED' },
        { id: 5, date: '07-07-2021', name: 'Test Client 5', description: 'random descr 5', ARCHIVED_BY_LAWYER: '', caseState: 'DONE' },
        { id: 6, date: '07-07-2021', name: 'Test Client 6', description: 'random descr 6', ARCHIVED_BY_LAWYER: '', caseState: 'DONE' }
=======
        { id: 8, date: '07-07-2021', description: 'random descr 8', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 9, date: '07-07-2021', description: 'random descr 9', ARCHIVED_BY_CLIENT: '' },
        { id: 10, date: '07-07-2021', description: 'random descr 10', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' }
>>>>>>> 00d04976d1e5297c3ad7fe581b4d429033640bd3
      ]
    }
  },

  computed: {
    ...mapState(['cases'])
  },

<<<<<<< HEAD
  mounted () {
    if (localStorage.userType) {
      this.userType = localStorage.userType
    }
  },

=======
>>>>>>> 00d04976d1e5297c3ad7fe581b4d429033640bd3
  methods: {
    ...mapActions(['getActiveCases'])
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/cases';
</style>
