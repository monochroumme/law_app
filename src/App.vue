<template>
  <div id="app">
    <Header v-if="showGlobalHeader" />
    <router-view/>
    <Footer v-if="showGlobalHeader" />
  </div>
</template>

<script>
const globalHeaderPages = [
  'cases',
  'chats',
  'profile',
  'applied-lawyers',
  'all-cases'
]

export default {
  components: {
    Header: () => import('@/components/Header'),
    Footer: () => import('@/components/Footer')
  },
  computed: {
    showGlobalHeader () {
      return globalHeaderPages.findIndex(p => p === this.$route.name) !== -1
    }
  }
}
</script>
