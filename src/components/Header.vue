<template>
  <header class="header">
    <nav class="header__nav" :class="{ lawyer_nav: userType==='lawyer' }">
      <ul>
        <li v-if="userType==='lawyer'">
          <router-link :to="`/${userType}/all-cases`">All cases</router-link>
        </li>
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
        <span v-if="!this.firstName" class="test-user">Ilham Pirmamedov</span>
        <span v-if="this.firstName" class="test-user">{{ this.firstName }} {{ this.lastName }}</span>
        <img src="@/assets/media/common/photo.png" alt="">
<!--        <img src="" onerror="this.src = '/media/common/user.svg'" alt="User">-->
      </router-link>
      <div class="hidden"><div @click="logout()">Logout</div></div>
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
  },
  data () {
    return {
      showFilter: false,
      userData: null,
      firstName: '',
      lastName: ''
    }
  },
  mounted () {
    if (localStorage.firstName) {
      this.firstName = localStorage.firstName
    }
    if (localStorage.lastName) {
      this.lastName = localStorage.lastName
    }
  },
  methods: {
    openFilter: function () {
      this.showFilter = true
    },
    closeFilter: function () {
      this.showFilter = false
    },
    logout: function () {
      localStorage.removeItem('userToken')
      this.$router.push('/')
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
  .hidden {
    display: none;
    background: #fff;
    width: 138px;
    padding: 5px 0;
    position: absolute;
    z-index: 999;
    -webkit-box-shadow: 0 3px 5px rgba(0, 0, 0, 20%);
    -moz-box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
    box-shadow: 0 3px 5px #3333334d;
    top: 40px;
    right: 0;
    border-left: 3px solid #2889e4;
  }
  &__user:hover + .hidden, .hidden:hover {
    display: block;
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

    .test-user {
      color: #ffffff;
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
@media (max-width: 450px) {
  .header {
    &__user {
      span {
        display: none;
      }
    }
    .lawyer_nav {
      left: 25%;
      transform: translate(-25%, -50%);
      font-size: 15px;
    }
  }
}
</style>
