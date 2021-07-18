<template>
  <div class="user-modal" :class="{visible: visibility}">
    <div class="user-modal__modal" v-click-outside="close">
      <div class="user-modal__modal__header">
        <button @click="closeMod()"><span aria-hidden="true">×</span></button>
      </div>
      <div class="user-modal__modal__body">
        <div class="user-modal__modal__body__user">
          <div class="user-modal__modal__body__user__img">
            <img src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="user-modal__modal__body__user__data">
            <div>Name/Surname:</div>
            <span v-if="this.userType==='ROLE_LAWYER'">Test Client</span>
            <span v-else>Test Lawyer</span>
          </div>
         <div class="user-modal__modal__body__user__data">
           <div>Contact No:</div>
           <span>+994 55 555 55 55</span>
         </div>
          <div class="user-modal__modal__body__user__data-w">
            <div>Email: </div>
            <span>test@test.test</span>
          </div>
          <div class="user-modal__modal__body__user__data-w" v-if="this.userType==='ROLE_CLIENT'">
            <div>Bar Association:</div>
            <span>hyu-98</span>
          </div>
          <div class="user-modal__modal__body__user__data-w">
            <div>Jurisdiction: </div>
            <span>Azerbaijan</span>
          </div>
          <div class="user-modal__modal__body__user__data-w" v-if="this.userType==='ROLE_CLIENT'">
            <div>Specialization:</div>
            <span>Charities</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDataModal',
  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      userType: ''
    }
  },
  mounted () {
    if (localStorage.userType) {
      this.userType = localStorage.userType
    }
  },
  methods: {
    close: function (event) {
      if (!event.path[0].classList.contains('open-user-modal')) {
        this.$parent.userModal = false
        this.$parent.dataModal = false
      }
    },
    closeMod: function () {
      this.$parent.userModal = false
      this.$parent.dataModal = false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/user-modal';
</style>
