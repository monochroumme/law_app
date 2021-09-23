<template>
  <div class="user-modal" :class="{visible: visibility}">
    <div class="user-modal__modal" v-click-outside="close">
      <div class="user-modal__modal__header">
        <button @click="closeMod()"><span aria-hidden="true">×</span></button>
      </div>
      <div class="user-modal__modal__body">
        <div class="user-modal__modal__body__user">
          <div class="user-modal__modal__body__user__img">
            <img v-if="this.userData.imageDto" :src="this.userData.imageDto.url" alt="">
            <img v-else class="open-user-modal" src="/media/common/user.svg" alt="">
          </div>
          <div class="user-modal__modal__body__user__data">
            <div>Name/Last name:</div>
            <span>{{ this.userData.firstName }} {{ this.userData.lastName }}</span>
          </div>
         <div class="user-modal__modal__body__user__data">
           <div>Phone number:</div>
           <span>{{ this.userData.phoneNumber }}</span>
         </div>
          <div class="user-modal__modal__body__user__data-w">
            <div>Email: </div>
            <span>{{ this.userData.email }}</span>
          </div>
          <div class="user-modal__modal__body__user__data-w" :class="{ block_to_right: this.userType === 'ROLE_CLIENT' }" v-if="this.userType==='ROLE_CLIENT'">
            <div>Bar Association:</div>
            <span>{{ this.userData.barAssociation }}</span>
          </div>
          <div class="user-modal__modal__body__user__data-w" :class="{ block_to_right: this.userType === 'ROLE_LAWYER' }">
            <div>Jurisdiction: </div>
            <span>Azerbaijan</span>
          </div>
          <div class="user-modal__modal__body__user__data-w" :class="{ block_to_right: this.userType === 'ROLE_CLIENT' }" v-if="this.userType==='ROLE_CLIENT'">
            <div>Area of law:</div>
            <span v-for="(item, i) in this.userData.practiceAreas" :key="i">{{ item.practiceArea }}</span>
          </div>
          <div class="user-modal__modal__body__user__data-w" v-if="this.userType==='ROLE_CLIENT'">
            <div>About me:</div>
            <span>{{ this.userData.aboutMe }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
  computed: {
    ...mapState(['userData'])
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
