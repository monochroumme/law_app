<template>
  <div class="page profile-page">
    <div class="profile-page__user">
      <div class="profile-page__user__photo">
        <div class="profile-page__user__photo__img">
          <img src="@/assets/media/common/photo.png" alt="">
        </div>
        <div class="profile-page__user__photo__edit">Edit photo</div>
      </div>
      <div class="profile-page__user__name">
        Test User
      </div>
      <div class="profile-page__user__data-pack">
        <div class="profile-page__user__data-pack__data">
          <div class="type">Email:</div>
          <div class="data">mr.i.mammadov@gmail.com</div>
        </div>
        <div class="profile-page__user__data-pack__data">
          <div class="type">Phone:</div>
          <div class="data">+994 55 305 99 87</div>
        </div>
        <div class="profile-page__user__data-pack__data">
          <div class="type">User type:</div>
          <div class="data">{{ this.userType === 'ROLE_CLIENT' ? 'Client' : 'Lawyer' }}</div>
        </div>
      </div>
      <button class="profile-page__user__edit" @click="editModal()">
        Edit profile
      </button>
    </div>
    <div class="profile-page__block">
      <div class="profile-page__block__pwd">
        <div class="profile-page__block__pwd__title">Change Password</div>
        <div class="profile-page__block__pwd__edit">
          <div class="profile-page__block__pwd__edit__old">
            <label>Old password</label>
            <input type="password" class="custom-input" value=""
                   placeholder="Write your current password">
          </div>
          <div class="profile-page__block__pwd__edit__new">
            <label>New password</label>
            <input type="password" class="custom-input" value=""
                   placeholder="Write new password">
            <input type="password" class="custom-input" value=""
                   placeholder="Repeat new password">
          </div>
        </div>
      </div>
      <div class="profile-page__block__links">
        <router-link class="profile-page__block__links__link" to="/rules/client">
          Help
        </router-link>
        <router-link class="profile-page__block__links__link" to="/rules/client">
          Rules
        </router-link>
        <button v-if="this.userType==='ROLE_LAWYER'" @click="openSubscription()" class="profile-page__block__links__link" to="/rules/client">
          Subscription
        </button>
        <router-link class="profile-page__block__links__link" to="/rules/client">
          Language
        </router-link>
        <router-link class="profile-page__block__links__link" to="/">
          Logout
        </router-link>
      </div>
    </div>
    <div class="profile-page__subscription" v-if="showSub">
      <div class="profile-page__subscription__block" v-click-outside="closeSubscriptionOnOut">
        <div class="profile-page__subscription__block__header">
          Extending
        </div>
        <div class="profile-page__subscription__block__body">
          <div class="profile-page__subscription__block__body__form">
            <div class="label">Months</div>
            <div class="months">
              <input type="number" min="1" max="12" :value="this.months" readonly/>
              <button @click="decreaseMonths()">-</button>
              <button @click="increaseMonths()">+</button>
            </div>
            <div class="method">
              <div class="label">Payment method</div>
              <button>PayPal</button>
              <button>Bank Card</button>
            </div>
          </div>
        </div>
        <div class="profile-page__subscription__block__footer">
          <button @click="closeSubscription()" class="profile-page__subscription__block__footer__cancel">Cancel</button>
          <button @click="closeSubscription()" class="profile-page__subscription__block__footer__save">{{ this.rate }}$</button>
        </div>
      </div>
    </div>
    <div class="profile-page__modal" v-if="showModal">
      <div class="profile-page__modal__block" v-click-outside="closeModalClickOut">
        <div class="profile-page__modal__block__header">
          Account
        </div>
        <div class="profile-page__modal__block__body">
          <label>Name</label>
          <input type="text" value="Test"/>
          <label>Surname</label>
          <input type="text" value="User"/>
          <label>Email</label>
          <input type="text" value="mr.i.mammadov@gmail.com"/>
          <label>Phone</label>
          <input type="text" value="+994 55 305 99 87"/>
        </div>
        <div class="profile-page__modal__block__footer">
          <button @click="closeModal()" class="profile-page__modal__block__footer__cancel">Cancel</button>
          <button @click="closeModal()" class="profile-page__modal__block__footer__save">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileWrapper',
  data () {
    return {
      userType: '',
      showSub: false,
      showModal: false,
      months: 0,
      rate: 0
    }
  },
  mounted () {
    if (localStorage.userType) {
      this.userType = localStorage.userType
    }
  },
  methods: {
    openSubscription: function () {
      this.showSub = true
    },
    closeSubscription: function () {
      this.showSub = false
    },
    closeSubscriptionOnOut: function (event) {
      if (!event.path[0].classList.contains('profile-page__block__links__link')) {
        this.showSub = false
      }
    },
    editModal: function () {
      this.showModal = true
    },
    closeModal: function () {
      this.showModal = false
    },
    closeModalClickOut: function (event) {
      if (!event.path[0].classList.contains('profile-page__user__edit')) {
        this.showModal = false
      }
    },
    increaseMonths: function () {
      this.months = this.months + 1
      this.rate = this.months * 10
    },
    decreaseMonths: function () {
      if (this.months !== 0) {
        this.months = this.months - 1
        this.rate = this.months * 10
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/profile';
</style>
