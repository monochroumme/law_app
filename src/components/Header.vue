<template>
  <header class="header">
    <nav class="header__nav">
      <ul>
        <li>
          <router-link :to="`/${userType}/cases`">My cases</router-link>
        </li>
        <li>
          <router-link :to="`/${userType}/chats`">Chats</router-link>
        </li>
      </ul>
    </nav>
    <div class="header__right">
      <div class="header__notifications">

      </div>
      <router-link :to="`/${userType}/profile`" class="header__user">
        <span v-if="user">{{ user.name }} {{ user.surname }}</span>
        <img src="" onerror="this.src = '/media/common/user.svg'" alt="User">
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',

  computed: {
    ...mapState(['user']),

    userType () {
      return this.$route.params.userType
    }
  }
}
</script>

<style lang="scss">
.header {
  padding: 10px 30px;
  width: 100%;
  height: 50px;
  background: $blue-3;
  position: relative;

  &__nav {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    line-height: 1;
    font-weight: 400;

    ul {
      display: flex;

      li {
        margin: 0 10px;

        .router-link-exact-active {
          border-bottom: 1px solid $yellow-0;
        }

        a {
          display: block;
          color: #fff;
          padding: 3px 0;
        }
      }
    }
  }

  &__user {
    display: flex;
    align-items: center;
    margin-left: auto;
    width: fit-content;

    span {
      font-size: 16px;
      line-height: 1;
      font-weight: 400;
      color: #000000;
    }

    img {
      margin-left: 10px;
      width: 32px;
      height: 32px;
      object-fit: cover;
      border-radius: 50%;
      background: #fff;
    }
  }
}
</style>
