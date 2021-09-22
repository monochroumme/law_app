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
        <div class="header__notifications-icon">
          <svg @click="showNotifications()" height="512pt" viewBox="-43 0 512 512" width="512pt" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m413.417969 360.8125c-32.253907-27.265625-50.75-67.117188-50.75-109.335938v-59.476562c0-75.070312-55.765625-137.214844-128-147.625v-23.042969c0-11.796875-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.535156-21.332031 21.332031v23.042969c-72.257812 10.410156-128 72.554688-128 147.625v59.476562c0 42.21875-18.496094 82.070313-50.945312 109.503907-8.296876 7.105469-13.054688 17.429687-13.054688 28.351562 0 20.589844 16.746094 37.335938 37.332031 37.335938h352c20.589844 0 37.335938-16.746094 37.335938-37.335938 0-10.921875-4.757813-21.246093-13.25-28.519531zm0 0"/>
            <path
              d="m213.332031 512c38.636719 0 70.957031-27.542969 78.378907-64h-156.757813c7.425781 36.457031 39.746094 64 78.378906 64zm0 0"/>
          </svg>
          <span v-if="notifications && notifications.length">
            {{notifications.length}}
          </span>
        </div>
        <div class="header__notifications__dd" v-if="notificationsDd">
          <ul v-if="notifications">
            <li v-for="(notify, index) in notifications" :key="index">
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
      <div class="hidden">
        <div @click="logout()">Logout</div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
      width: 22px;
      height: 22px;
    }

    &-icon {
      position: relative;

      span {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -5px);
        min-width: 16px;
        min-height: 16px;
        padding: 1px 3px 2px;
        border-radius: 50%;
        background: #ff6a6a;
        color: #fff;
        font-size: 10px;
        line-height: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #1a2552;
      }
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
