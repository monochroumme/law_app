<template>
  <div class="modal-backdrop" :class="{visible: visibility}">
    <div class="modal-backdrop__modal">
      <div class="modal-backdrop__modal__header">
        Comments
      </div>
      <div class="modal-backdrop__modal__body">
        <textarea name="" id="" cols="40" rows="5" placeholder="Enter your comment"></textarea>
      </div>
      <div class="modal-backdrop__modal__footer">
        <button @click="close()">Apply</button>
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
    close: function () {
      this.visibility = false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/apply-modal';
</style>
