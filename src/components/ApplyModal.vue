<template>
  <div class="modal-backdrop" :class="{visible: visibility}">
    <div class="modal-backdrop__modal" v-click-outside="close">
      <div class="modal-backdrop__modal__header">
        Comments
      </div>
      <form @submit.prevent="onSubmit">
        <div class="modal-backdrop__modal__body">
          <textarea v-model="comment" name="" id="" cols="40" rows="5" placeholder="Enter your comment"></textarea>
        </div>
        <div class="modal-backdrop__modal__footer">
          <button type="submit" class="closeMod">Apply</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ApplyModal',
  data () {
    return {
      caseId: null,
      comment: null
    }
  },
  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.caseId = this.$parent.applyId
  },
  methods: {
    ...mapActions(['applyToCase']),
    close: function (event) {
      if (!event.path[0].classList.contains('all_cases-page__list__block__btns__btn-def')) {
        this.$parent.isModalShown = false
        this.$parent.applyId = null
      }
    },
    closeMod: function () {
      this.$parent.isModalShown = false
      this.$parent.applyId = null
    },
    validateTextarea () {
      // let error = false

      // if (!this.comment?.trim()?.length) {
      //   error = true
      //   this.$toasted.error('Please, enter your case description')
      // }
      return false
    },
    async onSubmit () {
      if (!this.validateTextarea()) {
        await this.applyToCase({
          id: this.caseId,
          comment: this.comment
        }).then(() => {
          this.closeMod()
        }).catch(() => {
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/apply-modal';
</style>
