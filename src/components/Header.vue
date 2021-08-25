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
          <span v-if="this.chatsNotifications !== 0">{{ this.chatsNotifications }}</span>
        </li>
      </ul>
    </nav>
    <div class="header__right">
      <div class="header__notifications" v-click-outside="closeNotifications">
        <svg @click="showNotifications()" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
            <path d="M9.16667 22C10.8268 22 12.2156 20.8165 12.5345 19.25H5.79883C6.1179 20.8165 7.50667 22 9.16667 22Z" fill="white"/>
            <path d="M16.1113 13.2879C16.0874 13.2879 16.0654 13.2916 16.0416 13.2916C11.9982 13.2916 8.70839 10.0018 8.70839 5.95839C8.70839 4.36972 9.22166 2.90224 10.0834 1.69945V0.916611C10.0834 0.409714 9.67267 0 9.16661 0C8.66072 0 8.25 0.409714 8.25 0.916611V1.90674C5.14517 2.35405 2.75 5.02432 2.75 8.25V10.8056C2.75 12.6197 1.95525 14.3321 0.560944 15.5109C0.204437 15.8162 0 16.2598 0 16.7291C0 17.6138 0.719559 18.3334 1.60411 18.3334H16.7291C17.6138 18.3334 18.3334 17.6138 18.3334 16.7291C18.3334 16.2598 18.129 15.8162 17.7632 15.5037C17.0408 14.8922 16.4836 14.1313 16.1113 13.2879Z" fill="white"/>
            <circle cx="16" cy="6" r="6" fill="#FF4343"/>
            <path d="M16.436 9H15.166V4.10449L13.6499 4.57471V3.54199L16.2998 2.59277H16.436V9Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="22" height="22" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <div class="header__notifications__dd" v-if="notificationsDd">
          <ul v-if="this.notifications">
            <li v-for="(notify, index) in this.notifications" :key="index">
              <div class="fulldate">
                <div class="weekday">{{ notify.dayOfWeek }}</div>
                <div class="datetime">{{ notify.creationDate }}</div>
              </div>
              <div class="title">
                {{ notify.info }}
              </div>
              <div class="content">
                {{ notify.content }}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <router-link :to="`/${userType}/profile`" class="header__user">
        <span v-if="!this.firstName" class="test-user">Ilham Pirmamedov</span>
        <span v-if="this.firstName" class="test-user">{{ this.firstName }} {{ this.lastName }}</span>
        <img v-if="this.profilePhoto" :src="this.profilePhoto" alt="Profile pic">
        <img v-else src="/media/common/user.svg" alt="">
      </router-link>
      <div class="hidden"><div @click="logout()">Logout</div></div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

export default {
  name: 'Header',

  computed: {
    ...mapState(['user', 'notifications', 'chatsNotifications']),

    userType () {
      return this.$route.params.userType
    }
  },
  data () {
    return {
      showFilter: false,
      userData: null,
      firstName: '',
      lastName: '',
      profilePhoto: null,
      notificationsDd: false,
      notificationsSocket: null
    }
  },
  mounted () {
    if (localStorage.firstName) {
      this.firstName = localStorage.firstName
    }
    if (localStorage.lastName) {
      this.lastName = localStorage.lastName
    }
    if (localStorage.profilePic) {
      this.profilePhoto = localStorage.profilePic
    }
    setInterval(() => {
      this.profilePhoto = localStorage.profilePic
    }, 1000)
  },
  async created () {
    await this.getNotifications()
    await this.getChatNotifications(localStorage.getItem('userId'))
      .then(() => {
        this.notificationsSocket = Stomp.over(new SockJS('https://law-app-prof.herokuapp.com/ws'))
        this.notificationsSocket.connect({
          // Authorization: 'Bearer ' + localStorage.getItem('token'),
          // Authentication: 'Bearer ' + localStorage.getItem('token'),
          // use_http_auth: true,
          // login: 'ujuqdhpp',
          // passcode: 'LFuN5bdU8IAonD4zOIzoY2_mypGNCh_N',
          // host: 'ujuqdhpp'
        }, () => {
          this.notificationsSocket.subscribe(`/user/${localStorage.getItem('userId')}/queue/messages`, msg => {
            const msgData = JSON.parse(msg.body)
            if (msgData.status === 'RECEIVED') {
              this.updChatNotifications(this.chatsNotifications + 1)
            }
          })
        }, function () {
          this.onError()
        })
      })
    setInterval(() => {
      this.getNotifications()
    }, 60000)
  },
  methods: {
    ...mapActions(['getNotifications', 'updChatNotifications', 'getChatNotifications']),
    openFilter: function () {
      this.showFilter = true
    },
    closeFilter: function () {
      this.showFilter = false
    },
    logout: function () {
      localStorage.clear()
      this.$router.push('/')
    },
    showNotifications () {
      this.notificationsDd = !this.notificationsDd
    },
    closeNotifications () {
      this.notificationsDd = false
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
        position: relative;

        span {
          position: absolute;
          top: -2px;
          right: -14px;
          font-size: 9px;
          color: #FFFFFF;
          background-color: red;
          border-radius: 26px;
          width: 14px;
          height: 14px;
          text-align: center;
          display: block;
          padding: 2px;
        }

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
    cursor: pointer;

    div {
      text-indent: 10px;
    }
  }
  &__user:hover + .hidden, .hidden:hover {
    display: block;
  }
  &__notifications {
    margin-right: 85px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      cursor: pointer;
    }

    &__dd {
      position: absolute;
      height: 552px;
      width: 396px;
      background: #f2f1f6;
      border-radius: 4px;
      border: 1px solid $blue-3;
      top: 55px;
      z-index: 1000;

      ul {
        padding: 18px 5px 0px 17px;
        overflow-y: scroll;
        height: 550px;

        li {
          background-color: #ffffff;
          margin: 8px 11px 11px;
          width: 341px;
          height: 107px;
          padding: 10px;

          .fulldate {
            display: flex;

            .weekday {
              font-size: 15px;
              line-height: 17px;
              color: #A4ABC0;
            }

            .datetime {
              font-size: 13px;
              color: #868e96;
              padding-left: 11px;
            }
          }
          .title {
            padding: 8px 0;
            font-size: 14px;
          }

          .content {
            color: #A4ABC0;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 17px;
          }
        }
      }
    }
  }
  &__right {
    display: flex;
    justify-content: flex-end;
  }
  &__user {
    display: flex;
    align-items: center;
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
@media (max-width: 800px) {
  .header {
    &__notifications {
      position: absolute;
      left: 10px;
      top: 12.5px;
      margin-right: 0;

      &__dd {
        left: 0;
        width: 290px;
        height: 300px;
        top: 40px;

        ul {
          height: 298px;

          li {
            width: 240px;
          }
        }
      }
    }
  }
}
</style>
