<template>
  <div class="modal-backdrop" :class="{visible: visibility}">
    <div class="modal-backdrop__modal" v-click-outside="close">
      <div class="modal-backdrop__modal__header">
        Comments
      </div>
      <div class="modal-backdrop__modal__body">
        <textarea name="" id="" cols="40" rows="5" placeholder="Enter your comment"></textarea>
      </div>
      <div class="modal-backdrop__modal__footer">
        <button class="closeMod" @click="closeMod()">Apply</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalBackdrop',
  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close: function (event) {
      if (!event.path[0].classList.contains('all_cases-page__list__block__btns__btn-def')) {
        this.$parent.isModalShown = false
      }
    },
    closeMod: function () {
      this.$parent.isModalShown = false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/apply-modal';
</style>
