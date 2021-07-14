<template>
  <div class="page profile-page">
    <div class="profile-page__user">
      <div class="profile-page__user__photo">
        <div class="profile-page__user__photo__img">
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
          <div class="data">Client</div>
        </div>
      </div>
      <button class="profile-page__user__edit">
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
        <router-link class="profile-page__block__links__link" to="/rules/client">
          Language
        </router-link>
        <router-link class="profile-page__block__links__link" to="/">
          Logout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileWrapper'
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/profile';
</style>
