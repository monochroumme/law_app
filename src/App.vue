<template>
  <div id="app">
    <Header v-if="showGlobalHeader" />
    <router-view/>
  </div>
</template>

<script>
const globalHeaderPages = [
  'cases',
  'chats',
  'profile'
]

export default {
  components: {
    Header: () => import('@/components/Header')
  },
  computed: {
    showGlobalHeader () {
      return globalHeaderPages.findIndex(p => p === this.$route.name) !== -1
    }
  }
}
</script>
