<template>
  <div class="page profile-page">
    <div class="profile-page__user">
      <div class="profile-page__user__photo">
        <div class="profile-page__user__photo__img" :class="{lessenImg: this.userType === 'ROLE_LAWYER'}">
          <img v-if="!this.profilePhoto" src="/media/common/user.svg" alt="Profile photo">
          <img v-else :src="this.profilePhoto" alt="Profile photo">
        </div>
        <div v-if="this.profilePhoto" @click="openImageDd()" v-click-outside="closeImageDd" class="profile-page__user__photo__edit">
          Edit photo
          <div v-if="this.imageDd" class="photo-dd">
            <button @click="chooseFile()" class="photo-dd-btn">Upload photo</button>
            <button @click="deleteImage()" class="photo-dd-btn">Delete photo</button>
          </div>
        </div>
        <div v-else class="profile-page__user__photo__edit">
          <span @click="chooseFile()">Upload photo</span>
        </div>
        <input id="fileUpload" type="file"  accept="image/*" @change="uploadImage($event)" hidden>
      </div>
      <div class="profile-page__user__name">
        {{ this.firstName }} {{ this.lastName }}
      </div>
      <div class="profile-page__user__data-pack">
        <div class="profile-page__user__data-pack__data">
          <div class="type">Email:</div>
          <div class="data">{{ this.email }}</div>
        </div>
        <div class="profile-page__user__data-pack__data">
          <div class="type">Phone:</div>
          <div class="data">{{ this.phoneNumber }}</div>
        </div>
        <div class="profile-page__user__data-pack__data">
          <div class="type">User type:</div>
          <div class="data">{{ this.userType === 'ROLE_CLIENT' ? 'Client' : 'Lawyer' }}</div>
        </div>
        <div v-if="this.userType === 'ROLE_LAWYER'" class="profile-page__user__data-pack__data">
          <div class="type">About me:</div>
          <div class="data">{{ this.aboutMe.length > 22 ? this.aboutMe.slice(0, 22) + '...' : this.aboutMe }}</div>
        </div>
        <div v-if="this.userType === 'ROLE_LAWYER'" class="profile-page__user__data-pack__data">
          <div class="type">Website:</div>
          <div class="data">{{ this.website }}</div>
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
          <form @submit.prevent="onReset">
            <div class="profile-page__block__pwd__edit__old">
              <label>Old password</label>
              <input v-model="oldPassword" type="password" class="custom-input" value=""
                     placeholder="Write your current password">
            </div>
            <div class="profile-page__block__pwd__edit__new">
              <label>New password</label>
              <input v-model="newPassword" type="password" class="custom-input" value=""
                     placeholder="Write new password">
              <input v-model="repeatPassword" type="password" class="custom-input" value=""
                     placeholder="Repeat new password">
            </div>
            <div class="profile-page__block__pwd__edit__submit">
              <button type="submit">Save</button>
            </div>
          </form>
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
        <form @submit.prevent="onSubmit">
          <div class="profile-page__modal__block__body">
            <custom-input class="mb-20" v-model="firstName" placeholder="Enter your name" label="Name" />
            <custom-input class="mb-20" v-model="lastName" placeholder="Enter your last name" label="Last name" />
            <custom-input class="mb-20" v-model="email" placeholder="Enter your email" label="Email" />
            <custom-input class="mb-20" v-model="phoneNumber" :is-phone="true" placeholder="Enter your phone" label="Phone" />
            <custom-input class="mb-20" v-model="aboutMe" placeholder="Enter information about you" label="About Me" />
            <custom-multiselect
              v-if="userType==='ROLE_LAWYER'"
              class="mb-20"
              v-model="jurisdictionsDto"
              placeholder="Choose your jurisdiction"
              label="Jurisdiction"
              :options="jurisdictions || defaultJurisdictions"
              :multiple="true"
              :close-on-select="true"
              group-values-name="states"
              group-label-name="jurisdiction"
              label-name="jurisdiction"
            />
            <custom-multiselect
              v-if="userType==='ROLE_LAWYER'"
              class="mb-20"
              v-model="practiceAreasDto"
              placeholder="Choose your area of law"
              label="Area of Law"
              :options="areasOfLaw || defaultAreasOfLaw"
              :multiple="true"
              :close-on-select="true"
              label-name="practiceArea"
            />
          </div>
          <div class="profile-page__modal__block__footer" :class="{noPadding: userType === 'ROLE_LAWYER'}">
            <button @click="closeModal()" class="profile-page__modal__block__footer__cancel">Cancel</button>
            <button type="submit" class="profile-page__modal__block__footer__save">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import validatePassword from '@/utils/validatePassword'
import validateEmail from '@/utils/validateEmail'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ProfileWrapper',
  data () {
    return {
      userId: '',
      userType: '',
      firstName: '',
      lastName: '',
      email: '',
      aboutMe: '',
      website: '',
      oldEmail: '',
      phoneNumber: '',
      jurisdictionDtoList: null,
      practiceAreaDtoList: null,
      jurisdictionsDto: [],
      practiceAreasDto: [],
      showSub: false,
      showModal: false,
      months: 0,
      rate: 0,
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
      profilePhoto: null,
      imageDd: false
    }
  },
  components: {
    CustomInput: () => import('@/components/CustomInput'),
    CustomMultiselect: () => import('@/components/CustomMultiselect')
  },
  computed: {
    ...mapState(['defaultJurisdictions', 'defaultAreasOfLaw', 'jurisdictions', 'areasOfLaw'])
  },
  created () {
    if (!this.jurisdictions) {
      this.getJurisdictions()
      this.getAreasOfLaw()
    }
  },
  mounted () {
    if (localStorage.userType) {
      this.userType = localStorage.userType
    }
    if (localStorage.firstName) {
      this.firstName = localStorage.firstName
    }
    if (localStorage.lastName) {
      this.lastName = localStorage.lastName
    }
    if (localStorage.email) {
      this.email = localStorage.email
      this.oldEmail = localStorage.email
    }
    if (localStorage.phoneNumber) {
      this.phoneNumber = localStorage.phoneNumber
    }
    if (localStorage.aboutMe) {
      this.aboutMe = localStorage.aboutMe
    }
    if (localStorage.webSiteLink) {
      this.website = localStorage.webSiteLink
    }
    if (localStorage.userId) {
      this.userId = localStorage.userId
    }
    if (localStorage.jurisdictionDtoList) {
      this.jurisdictionDtoList = JSON.parse(localStorage.jurisdictionDtoList)
    }
    if (localStorage.practiceAreaDtoList) {
      this.practiceAreaDtoList = JSON.parse(localStorage.practiceAreaDtoList)
    }
    if (localStorage.profilePic) {
      this.profilePhoto = localStorage.profilePic
    }
  },
  methods: {
    ...mapActions(['getJurisdictions', 'getAreasOfLaw']),
    ...mapActions(['resetPassword', 'editUser', 'uploadImg', 'deleteImg']),
    openImageDd () {
      this.imageDd = true
    },
    closeImageDd: function (event) {
      if (!event.path[0].classList.contains('photo-dd') && !event.path[0].classList.contains('photo-dd-btn')) {
        this.imageDd = false
      }
    },
    chooseFile () {
      document.getElementById('fileUpload').click()
    },
    async uploadImage (e) {
      this.imageDd = false
      const data = new FormData()
      data.append('name', e.target.files[0].name)
      data.append('file', e.target.files[0])
      await this.uploadImg(data)
        .then(() => {
          this.profilePhoto = localStorage.getItem('profilePic')
        })
        .catch(() => {
          console.log('Error')
        })
    },
    async deleteImage () {
      await this.deleteImg()
        .then(() => {
          this.profilePhoto = null
          this.imageDd = false
        })
        .catch(() => {
          console.log('Error')
          this.imageDd = false
        })
    },
    validateInputs () {
      let error = false
      if (!this.oldPassword?.trim()?.length || !validatePassword(this.oldPassword)) {
        error = true
        this.$toasted.error('Your password must contain minimum 8 characters, at least 1 number and 1 letter')
      }
      if (!this.newPassword?.trim()?.length || !validatePassword(this.newPassword)) {
        error = true
        this.$toasted.error('Your password must contain minimum 8 characters, at least 1 number and 1 letter')
      }
      if (this.newPassword !== this.repeatPassword || !validatePassword(this.repeatPassword)) {
        error = true
        this.$toasted.error('Passwords must match')
      }
      return error
    },
    validateEdit () {
      let error = false
      if (!this.firstName?.trim()?.length) {
        error = true
        this.$toasted.error('Please, enter your name')
      }
      if (!this.lastName?.trim()?.length) {
        error = true
        this.$toasted.error('Please, enter your last name')
      }
      if (!this.phoneNumber) {
        error = true
        this.$toasted.error('Please, enter a valid phone number')
      }
      if (!this.email?.trim()?.length || !validateEmail(this.email)) {
        error = true
        this.$toasted.error('Please, enter a valid email')
      }
      if (this.userType === 'ROLE_LAWYER') {
        if (!this.jurisdictionsDto?.length) {
          error = true
          this.$toasted.error('Please, choose your jurisdiction')
        }
        if (!this.practiceAreasDto?.length) {
          error = true
          this.$toasted.error('Please, choose your area of law')
        }
      }
      return !error
    },
    onReset () {
      if (!this.validateInputs()) {
        const postData = {
          newPassword: this.newPassword,
          oldPassword: this.oldPassword,
          repeatPassword: this.repeatPassword
        }
        this.resetPassword(postData).then((res) => {
          console.log(res)
        }).catch(() => {})
        this.wait = false
      }
    },
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
      this.jurisdictionsDto = []
      this.practiceAreasDto = []
      this.jurisdictions.map((j) => {
        this.jurisdictionDtoList.map((jL) => {
          if (j.id === jL) {
            this.jurisdictionsDto.push(j)
          }
        })
      })
      this.areasOfLaw.map((p) => {
        this.practiceAreaDtoList.map((pL) => {
          if (p.id === pL) {
            this.practiceAreasDto.push(p)
          }
        })
      })
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
    },
    async onSubmit () {
      if (this.validateEdit()) {
        this.wait = true
        const editData = {
          id: this.userId,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber
        }
        if (this.userType === 'ROLE_LAWYER') {
          editData.jurisdictionIdList = this.jurisdictionsDto.map((j) => parseInt(j.id))
          editData.practiceIdList = this.practiceAreasDto.map((p) => parseInt(p.id))
          editData.aboutMe = this.aboutMe
          console.log(editData)
        }
        await this.editUser(editData).then(res => {
          if (res.data === 'email-changed') {
            localStorage.clear()
            this.$router.push('/login')
            this.closeModal()
          } else if (res.data === 'email-exists') {
            this.$toasted.error('Email exists, please use another email')
          } else {
            this.closeModal()
          }
        }).catch(() => {})
        this.wait = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/profile';
</style>
