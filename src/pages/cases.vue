<template>
  <div class="page cases-page">
    <active-cases v-model="cases" :cases="items"/>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: 'cases',

  components: {
    ActiveCases: () => import('@/components/ActiveCases')
  },

  data () {
    return {
      items: [
        { id: 1, date: '07-07-2021', description: 'random descr 1', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 2, date: '07-07-2021', description: 'random descr 2', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 3, date: '07-07-2021', description: 'random descr 3', ARCHIVED_BY_CLIENT: '' },
        { id: 4, date: '07-07-2021', description: 'random descr 4', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 5, date: '07-07-2021', description: 'random descr 5', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 6, date: '07-07-2021', description: 'random descr 6', ARCHIVED_BY_CLIENT: '' },
        { id: 7, date: '07-07-2021', description: 'random descr 7', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 8, date: '07-07-2021', description: 'random descr 8', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' },
        { id: 9, date: '07-07-2021', description: 'random descr 9', ARCHIVED_BY_CLIENT: '' },
        { id: 10, date: '07-07-2021', description: 'random descr 10', ARCHIVED_BY_CLIENT: 'ARCHIVED_BY_CLIENT' }
      ]
    }
  },

  computed: {
    ...mapState(['cases'])
  },

  methods: {
    ...mapActions(['getActiveCases'])
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/cases';
</style>
