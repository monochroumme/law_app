<template>
  <div class="page registration-page">
    <header class="page__top">
      <router-link to="/" class="common__btn-back page__btn-back">
        <img svg-inline src="@/assets/media/common/btn-back.svg" alt="Back">
      </router-link>
      <h1 class="page__title">Client Registration</h1>
    </header>
    <form @submit.prevent="onSubmit" class="common__container registration-page__content">
      <custom-input class="mb-20" v-model="name" placeholder="Enter your name" label="Name" />
      <div v-if="this.errorObj.name" class="error">Please, enter your name</div>
      <custom-input class="mb-20" v-model="surname" placeholder="Enter your surname" label="Surname" />
      <div v-if="this.errorObj.surname" class="error">Please, enter your surname</div>
      <custom-input
        :is-textarea="true"
        :show-character-count="true"
        :max-characters="1500"
        v-model="caseDescription"
        label="Case Description"
        placeholder="Enter your case description"
      />
      <div v-if="this.errorObj.caseDescription" class="error">Please, enter your case description</div>
<!--      <custom-multiselect-->
<!--        :loading="loading"-->
<!--        class="mb-20"-->
<!--        v-model="jurisdiction"-->
<!--        placeholder="Choose your jurisdiction"-->
<!--        label="Jurisdiction"-->
<!--        :options="jurisdictions || defaultJurisdictions"-->
<!--        :multiple="true"-->
<!--        :close-on-select="true"-->
<!--        group-values-name="states"-->
<!--        group-label-name="jurisdiction"-->
<!--        label-name="jurisdiction"-->
<!--      />-->
      <div v-if="this.errorObj.jurisdiction" class="error">Please, choose your jurisdiction</div>
<!--      <custom-multiselect-->
<!--        :loading="loading"-->
<!--        class="mb-20"-->
<!--        v-model="areaOfLaw"-->
<!--        placeholder="Choose your area of law"-->
<!--        label="Area of Law"-->
<!--        :options="areasOfLaw || defaultAreasOfLaw"-->
<!--        :multiple="true"-->
<!--        :close-on-select="false"-->
<!--        label-name="practiceArea"-->
<!--      />-->
      <div v-if="this.errorObj.areaOfLaw" class="error">Please, choose your area of law</div>
      <custom-input class="mb-20" v-model="phone" @set-phone-valid="isPhoneValid = $event" :is-phone="true" placeholder="Enter your phone number" label="Phone Number" />
      <div v-if="this.errorObj.isPhoneValid" class="error">Please, enter a valid phone number</div>
      <custom-input class="mb-20" v-model="email" placeholder="Enter your email" label="Email" />
      <div v-if="this.errorObj.email" class="error">Please, enter a valid email</div>
      <custom-input class="mb-20" type="password" :show-password="showPassword" @toggle-password="showPassword = !showPassword" v-model="password" placeholder="Enter your password" label="Password" />
      <div v-if="this.errorObj.password" class="error">Your password must contain minimum 8 characters, at least 1 number and 1 letter</div>
      <custom-input type="password" :show-password="showPassword" @toggle-password="showPassword = !showPassword" v-model="confirmPassword" placeholder="Enter your password again" label="Confirm Password" />
      <div v-if="this.errorObj.passwordConfirm" class="error pwdMatch">Passwords must match</div>
      <div class="registration-page__btns">
        <router-link to="/" type="button" class="common__btn">
          Cancel
        </router-link>
        <button type="submit" class="common__btn" :class="{ disabled: wait }">
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import validateEmail from '@/utils/validateEmail'
import validatePassword from '@/utils/validatePassword'

export default {
  name: 'ClientRegistration',

  components: {
    // CustomMultiselect: () => import('@/components/CustomMultiselect'),
    CustomInput: () => import('@/components/CustomInput')
  },

  data () {
    return {
      loading: false, // for initial loading (select data)
      wait: false,

      name: '',
      surname: '',
      caseDescription: '',
      jurisdiction: '',
      areaOfLaw: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',

      isPhoneValid: false,
      showPassword: false,

      errorObj: {
        name: false,
        surname: false,
        caseDescription: false,
        jurisdiction: false,
        areaOfLaw: false,
        isPhoneValid: false,
        email: false,
        password: false,
        passwordConfirm: false
      }
    }
  },

  async created () {
    if (!this.jurisdictions) {
      this.loading = true
      await this.getJurisdictions()
      await this.getAreasOfLaw()
      this.loading = false
    }
  },

  computed: {
    ...mapState(['defaultJurisdictions', 'defaultAreasOfLaw', 'jurisdictions', 'areasOfLaw'])
  },

  methods: {
    ...mapActions(['getJurisdictions', 'getAreasOfLaw']),
    ...mapActions('clientAuth', ['register']),

    validateInputs () {
      let error = false

      if (!this.name?.trim()?.length) {
        this.errorObj.name = true
        error = true
        // this.$toasted.error('Please, enter your name')
      }
      if (!this.surname?.trim()?.length) {
        this.errorObj.surname = true
        error = true
        // this.$toasted.error('Please, enter your surname')
      }
      if (!this.caseDescription?.trim()?.length) {
        this.errorObj.caseDescription = true
        error = true
        // this.$toasted.error('Please, enter your case description')
      }
      // if (!this.jurisdiction?.length) {
      //   this.errorObj.jurisdiction = true
      //   error = true
      //   // this.$toasted.error('Please, choose your jurisdiction')
      // }
      // if (!this.areaOfLaw?.length) {
      //   this.errorObj.areaOfLaw = true
      //   error = true
      //   // this.$toasted.error('Please, choose your area of law')
      // }
      if (!this.isPhoneValid) {
        this.errorObj.isPhoneValid = true
        error = true
        // this.$toasted.error('Please, enter a valid phone number')
      }
      if (!this.email?.trim()?.length || !validateEmail(this.email)) {
        this.errorObj.email = true
        error = true
        // this.$toasted.error('Please, enter a valid email')
      }
      if (!this.password?.trim()?.length || !validatePassword(this.password)) {
        this.errorObj.password = true
        error = true
        // this.$toasted.error('Your password must contain minimum 8 characters, at least 1 number and 1 letter')
      }
      if (this.password !== this.confirmPassword || !validatePassword(this.password)) {
        this.errorObj.passwordConfirm = true
        error = true
        // this.$toasted.error('Passwords must match')
      }

      return !error // error => false, valid => true
    },

    async onSubmit () {
      if (!this.wait) {
        if (this.validateInputs()) {
          this.wait = true
          await this.register({
            email: this.email,
            password: this.password,
            repeatPassword: this.confirmPassword,
            firstName: this.name,
            lastName: this.surname,
            phoneNumber: this.phone,
            caseDto: {
              description: this.caseDescription
              // jurisdictionDto: this.jurisdiction.map(j => ({
              //   id: parseInt(j.id.toString())
              // })),
              // practiceAreaDtos: this.areaOfLaw.map(p => ({
              //   id: parseInt(p.id.toString())
              // }))
            }
          }).then(() => {
            this.$router.push('/client/cases')
          }).catch(() => {})
          this.wait = false
        }
      } else {
        this.$toasted.error('Please, wait until we are processing your previous request')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/registration';
</style>
