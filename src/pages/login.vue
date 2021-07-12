<template>
  <div class="page registration-page">
    <header class="page__top">
      <router-link to="/" class="common__btn-back page__btn-back">
        <img svg-inline src="@/assets/media/common/btn-back.svg" alt="Back">
      </router-link>
      <h1 class="page__title">Login</h1>
    </header>
    <form @submit.prevent="onSubmit" class="common__container registration-page__content">
      <custom-input class="mb-20" v-model="email" placeholder="Enter your email" type="email" label="Email"/>
      <custom-input type="password" class="mb-20" :show-password="showPassword"
                    @toggle-password="showPassword = !showPassword" v-model="password" placeholder="Enter your password"
                    label="Password"/>
      <custom-multiselect
        v-model="userRole"
        :options="userRoles"
        class="mb-20"
        placeholder="User Type"
      />
      <div class="registration-page__btns">
        <router-link to="/" type="button" class="common__btn">
          Back
        </router-link>
        <button type="submit" class="common__btn">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import validateEmail from '@/utils/validateEmail'

export default {
  name: 'login',

  data () {
    return {
      email: '',
      password: '',
      userRole: '',

      showPassword: false,
      wait: false,

      userRoles: [
        {
          id: 'ROLE_CLIENT',
          name: 'Client',
          slug: 'client'
        },
        {
          id: 'ROLE_LAWYER',
          name: 'Lawyer',
          slug: 'lawyer'
        }
      ]
    }
  },

  components: {
    CustomMultiselect: () => import('@/components/CustomMultiselect'),
    CustomInput: () => import('@/components/CustomInput')
  },

  methods: {
    ...mapActions(['login']),

    validateInputs () {
      let error = false

      if (!this.email?.trim()?.length || !validateEmail(this.email)) {
        error = true
        this.$toasted.error('Please, enter a valid email')
      }
      if (!this.password?.trim()?.length) {
        error = true
        this.$toasted.error('Your password must contain minimum 8 characters')
      }
      if (!this.userRole) {
        error = true
        this.$toasted.error('You must choose the user type')
      }

      return error
    },

    onSubmit () {
      if (!this.wait) {
        if (!this.validateInputs()) {
          this.login({
            email: this.email,
            password: this.password,
            role: this.userRole.id
          }).then(() => {
            this.$router.push(`/${this.userRole.slug}/cases`)
          }).catch(() => {
          })
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
@import '@/assets/styles/pages/login';
</style>
