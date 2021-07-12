<template>
  <div class="rules-page">
    <header class="page__top">
      <router-link to="/" class="common__btn-back page__btn-back">
        <img svg-inline src="@/assets/media/common/btn-back.svg" alt="Back">
      </router-link>
      <h1 class="page__title">Rules</h1>
    </header>
    <main class="rules-page__content">
      <p class="rules-page__text-top">
        Acceptance of the rules is obligatory condition for your registration at our website. However, you should only accept the below rules if you are fully agree with all of the conditions established thereby and have no objection to accurately and properly obey the conditions described in the rules below. If you do not agree to any of the below described conditions, you should push the “Decline” buton. Please, read carefully the rules described on this page below and accept or decline acceptance of the rules by pushing the relevant buton.
      </p>
      <div class="rules-page__rules-wrapper common__scroll" ref="rulesWrapper">
        <div class="rules-page__rules">
          <div class="rules-page__rules-item" v-for="(item, i) in rules" :key="i">
            <h2>Rule {{ i+1 }}.</h2>
            <p>{{ item }}</p>
          </div>
        </div>
      </div>
      <div class="rules-page__btns">
        <router-link to="/" class="common__btn">Reject</router-link>
        <router-link :to="acceptLink" class="common__btn accept" :class="{disabled: !scrolledToTheBottom}">Accept</router-link>
      </div>
    </main>
  </div>
</template>

<script>
import rules from '@/content/rules.json'

export default {
  name: 'rules',

  data () {
    return {
      rules,
      scrolledToTheBottom: false
    }
  },

  mounted () {
    this.$refs.rulesWrapper.addEventListener('scroll', this.onScroll)
  },

  computed: {
    acceptLink () {
      const userType = this.$route.params.userType
      if (userType === 'client' || userType === 'lawyer') {
        return `/register/${this.$route.params.userType}`
      }
      return '/'
    }
  },

  methods: {
    onScroll () {
      if (
        this.$refs.rulesWrapper.scrollTop + this.$refs.rulesWrapper.offsetHeight >= this.$refs.rulesWrapper.scrollHeight
      ) {
        this.scrolledToTheBottom = true
      }
    }
  },

  beforeDestroy () {
    console.log('asd')
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/rules';
</style>
