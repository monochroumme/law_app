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
            <span>{{ this.$parent.userData.firstName }} {{ this.$parent.userData.lastName }}</span>
          </div>
         <div class="user-modal__modal__body__user__data">
           <div>Contact No:</div>
           <span>{{ this.$parent.userData.phoneNumber }}</span>
         </div>
          <div class="user-modal__modal__body__user__data-w">
            <div>Email: </div>
            <span>{{ this.$parent.userData.email }}</span>
          </div>
          <div class="user-modal__modal__body__user__data-w" v-if="this.userType==='ROLE_CLIENT'">
            <div>Bar Association:</div>
            <span>{{ this.$parent.userData.barassociation }}</span>
          </div>
          <div class="user-modal__modal__body__user__data-w">
            <div>Jurisdiction: </div>
            <span>Azerbaijan</span>
          </div>
          <div class="user-modal__modal__body__user__data-w" v-if="this.userType==='ROLE_CLIENT'">
            <div>Specialization:</div>
            <span v-for="(item, i) in this.$parent.userData.practiceAreas" :key="i">{{ item.practiceArea }}</span>
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
