<template>
  <main class="index-page">
    <img class="index-page__logo" svg-inline src="@/assets/media/logo-text.svg" alt="GLO">
    <h1>Registration</h1>
    <div class="index-page__buttons">
      <router-link to="/rules/lawyer">
        Lawyer
      </router-link>
      <router-link to="/rules/client">
        Client
      </router-link>
    </div>
    <router-link to="/login" class="index-page__login">
      Log In
    </router-link>
  </main>
</template>

<script>
export default {
  name: 'Index'

  // TODO check for token and if it exists, then redirect to the main page of the user depending on if it's client or lawyer
  // TODO do it for any page
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/index';
</style>
