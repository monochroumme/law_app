<template>
  <div class="page login-page">
    <form @submit.prevent="onSubmit" class="common__container login-page__content" v-if="isLogin">
      <h1 class="login-page__title">Sign in</h1>
      <div class="login-page__content__back">
        <router-link to="/">
          X
        </router-link>
      </div>
      <credentials-input class="mb-20" v-model="email" placeholder="Enter your email" type="email" label="Email"/>
      <credentials-input type="password" class="mb-20" v-model="password" placeholder="Enter your password"
                         label="Password"/>
      <div class="login-page__reset">
        <a href="#" @click.prevent="isLogin = false">
          Forgot password
        </a>
      </div>
      <custom-multiselect
              v-model="userRole"
              :options="userRoles"
              class="mb-20"
              placeholder="Choose user type"
      />
      <div class="login-page__btns">
        <button type="submit" class="common__btn">
          Submit
        </button>
      </div>
    </form>
    <form @submit.prevent="onSubmitReset" class="common__container login-page__content login-page__reset-page" v-else>
      <div class="login-page__content__back">
        <div @click="backToLogin" to="/">
          X
        </div>
      </div>
      <credentials-input class="mb-20" v-model="emailReset" placeholder="Enter your email" type="email" label="Email"/>

      <custom-multiselect
              style="margin-top: 40px"
              v-model="userRoleReset"
              :options="userRoles"
              class="mb-20"
              placeholder="Choose user type"
      />
      <div class="login-page__btns">
        <button type="submit" class="common__btn">
          Reset
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
      isLogin: true,
      email: '',
      password: '',
      userRole: '',

      emailReset: '',
      userRoleReset: '',

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
    CredentialsInput: () => import('@/components/CredentialsInput')
  },

  methods: {
    ...mapActions(['login', 'restorePassword']),

    validateInputs () {
      if (this.isLogin) {
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
      } else {
        let error = false

        if (!this.emailReset?.trim()?.length || !validateEmail(this.emailReset)) {
          error = true
          this.$toasted.error('Please, enter a valid email')
        }
        if (!this.userRoleReset) {
          error = true
          this.$toasted.error('You must choose the user type')
        }

        return error
      }
    },

    backToLogin () {
      this.isLogin = true
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
          }).catch((e) => {
            this.$toasted.error('Wrong email or password')
          })
          this.wait = false
        }
      } else {
        this.$toasted.error('Please, wait until we are processing your previous request')
      }
    },

    onSubmitReset () {
      if (!this.wait) {
        if (!this.validateInputs()) {
          this.restorePassword({
            email: this.emailReset,
            role: this.userRoleReset.id
          }).then(() => {
            this.$toasted.info('Restore password had been sent to your email')
          }).catch((e) => {
            this.$toasted.error('Wrong email or role')
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
@import '@/assets/styles/pages/login';
</style>
