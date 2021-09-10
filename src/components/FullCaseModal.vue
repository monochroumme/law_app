<template>
  <div class="case-modal" :class="{visible: visibility}">
    <div class="case-modal__modal" v-click-outside="close">
      <div class="case-modal__modal__header">
        <button @click="closeMod()"><span aria-hidden="true">×</span></button>
      </div>
      <div class="case-modal__modal__body">
        <div class="case-modal__modal__body__descr">
          {{ this.$parent.caseDescr }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FullCaseModal',
  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close: function (event) {
      if (!event.path[0].classList.contains('open-case-modal')) {
        this.$parent.caseModal = false
        this.$parent.caseDescr = ''
      }
    },
    closeMod: function () {
      this.$parent.caseModal = false
      this.$parent.caseDescr = ''
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/case-modal';
</style>
