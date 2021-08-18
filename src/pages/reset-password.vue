<template>
  <div class="page login-page">
    <form @submit.prevent="onSubmit" class="common__container login-page__content">
      <h1 class="login-page__title">Reset password</h1>
      <credentials-input type="password" class="mb-20" v-model="password" placeholder="Enter your password"
                    label="Password"/>
      <credentials-input type="password" class="mb-20" v-model="repeatPassword" placeholder="Enter your password"
                         label="Repeat password"/>
      <div class="login-page__btns">
        <button type="submit" class="common__btn">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'repeat-password',

  data () {
    return {
      password: '',
      repeatPassword: '',
      showPassword: false,
      wait: false
    }
  },

  components: {
    CredentialsInput: () => import('@/components/CredentialsInput')
  },

  methods: {
    ...mapActions(['resetPasswordWithoutAuth']),

    validateInputs () {
      let error = false

      if (!this.password?.trim()?.length) {
        error = true
        this.$toasted.error('Your password must contain minimum 8 characters')
      }
      if (!this.repeatPassword?.trim()?.length || this.repeatPassword.trim() !== this.password.trim()) {
        error = true
        this.$toasted.error('Your passwords must match')
      }

      return error
    },

    onSubmit () {
      if (!this.wait) {
        if (!this.validateInputs()) {
          this.resetPasswordWithoutAuth({
            newPassword: this.password,
            repeatPassword: this.repeatPassword,
            token: this.$route.query.token,
            role: this.$route.query.role
          }).then(() => {
            this.$router.push('/login')
          }).catch((e) => {
            this.$toasted.error('Unexpected error')
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
