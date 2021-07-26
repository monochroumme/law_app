<template>
  <transition class="transition-modal" name="modal-fade">
    <div class="transition-modal__backdrop">
      <div class="transition-modal__backdrop__modal" role="dialog" aria-labelledby="{{ modalTitle }}" aria-describedby="{{ modalDescription }}">
        <header>
          <slot name="header"></slot>
        </header>
        <div>
          <slot name="content"></slot>
        </div>
        <footer>
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    modalTitle: {
      type: String,
      default: 'defaultTitle'
    },
    modalDescription: {
      type: String,
      default: 'defaultDescription'
    }
  }

  // TODO style the reusable modal component and apply everywhere in the app
  // TODO don't forget about clickOutside functionality, needs to be implemented depending on classes on each page with modal
}
</script>

<style scoped>

</style>
