<template>
  <div class="page chats-page">
    <div class="chats-page__list" :class="{'hiddenMobile': this.isMobile && activeChat != null}">
      <template v-if="allChats">
        <div class="chats-page__list__chat" v-for="(chat, index) in allChats" :key="index" @click="activate(chat.chatId)" :class="{ active: activeChat === chat.chatId }">
          <template>
            <div class="chats-page__list__chat__img open-user-modal" @click="openDataModal()">
              <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
            </div>
            <div class="chats-page__list__chat__text">
              <span class="chats-page__list__chat__text__name">{{ chat.recipientFirstName }} {{ chat.recipientLastName }}</span>
              <span class="chats-page__list__chat__text__short-msg" v-if="messages[chat.chatId]">{{messages[chat.chatId][messages[chat.chatId].length - 1].content}}</span>
            </div>
            <div class="chats-page__list__chat__time" v-if="messages[chat.chatId]">{{ moment(parseInt(messages[chat.chatId][messages[chat.chatId].length - 1].timestamp)).format('HH:mm') }}</div>
          </template>
        </div>
      </template>
    </div>
    <div class="chats-page__chat-block" :class="{'showMobile': this.isMobile && activeChat != null}">
      <div @click="removeActive" v-if="this.isMobile && activeChat !== null" class="chats-page__chat-block__return">
        <img svg-inline src="@/assets/media/common/btn-back.svg" alt="Back">
      </div>
      <div class="chats-page__chat-block__header open-user-modal" @click="openDataModal()" v-if="activeChat">
        <div class="chats-page__chat-block__header__img open-user-modal">
          <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
        </div>
        {{ chats[activeChat].recipientFirstName }} {{ chats[activeChat].recipientLastName }}
      </div>
      <div id="main-chat" class="chats-page__chat-block__messages main_chat">
        <div v-for="(msg, index) in (messages[activeChat] || [])" :key="index">
          <div v-if="msg.senderId.toString() !== userId" class="chats-page__chat-block__messages__msg msg-in">
            <div class="lawyer">{{ msg.content }}<div class="timestamp">{{ moment(parseInt(msg.timestamp)).format('HH:mm') }}</div></div>
          </div>
          <div v-else class="chats-page__chat-block__messages__msg msg-out">
            <div class="client">{{ msg.content }}<div class="timestamp">{{ moment(parseInt(msg.timestamp)).format('HH:mm') }}</div></div>
          </div>
        </div>
      </div>
      <div class="chats-page__chat-block__footer">
        <button><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.7034 1.31127C13.9551 -0.437089 11.1106 -0.437089 9.36222 1.31127L2.68566 7.98779C2.47961 8.19384 2.47961 8.52765 2.68566 8.7337C2.89171 8.93975 3.22552 8.93975 3.43157 8.7337L10.1081 2.05718C11.4041 0.762161 13.6614 0.762161 14.9575 2.05718C16.2942 3.39392 16.2942 5.56932 14.9575 6.90607L5.6346 16.3339C4.83719 17.1313 3.44788 17.1313 2.6505 16.3339C1.82785 15.5113 1.82785 14.173 2.6505 13.3503L11.6004 4.29487C11.8992 3.99611 12.4205 3.99611 12.7193 4.29487C13.0278 4.6034 13.0278 5.10568 12.7193 5.41425L4.14281 14.0962C3.96492 14.2741 3.96492 14.6642 4.14281 14.8421C4.34887 15.0482 4.68267 15.0482 4.88873 14.8421L13.4652 6.16012C14.1853 5.43995 14.1853 4.2691 13.4652 3.54896C12.7677 2.8515 11.5509 2.85252 10.8545 3.54896L1.90459 12.6044C0.68024 13.8287 0.68024 15.8554 1.90459 17.0798C2.50267 17.6779 3.29748 18 4.14278 18C4.98808 18 5.78296 17.6779 6.38051 17.0798L15.7034 7.65194C17.4517 5.90359 17.4517 3.05959 15.7034 1.31127Z" fill="#1A2552"/>
        </svg></button>
        <div class="chats-page__chat-block__footer__input-block">
          <div class="chats-page__chat-block__footer__input-block__input" @input="onInput" v-on:keyup="enterInChat" v-on:keydown="clearFix" id="chatMessage" contenteditable/>
        </div>
        <button id="sendMsg" @click="sendChatMessage()"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
          <path d="M17.7638 0.10334C17.5913 -0.0189101 17.3648 -0.0354101 17.1773 0.0628399L0.302283 8.87534C0.102783 8.97959 -0.0149666 9.19259 0.00153336 9.41684C0.0187834 9.64184 0.168033 9.83384 0.380283 9.90659L5.07153 11.5101L15.0623 2.96759L7.33128 12.2818L15.1935 14.9691C15.252 14.9886 15.3135 14.9991 15.375 14.9991C15.477 14.9991 15.5783 14.9713 15.6675 14.9173C15.81 14.8303 15.9068 14.6841 15.9315 14.5198L17.994 0.64484C18.0248 0.43484 17.9363 0.22634 17.7638 0.10334Z" fill="#1A2552"/>
        </svg></button>
      </div>
    </div>

<!--    <UserDataModal v-model="dataModal" :visibility="dataModal"></UserDataModal>-->
  </div>
</template>

<script>
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import { mapActions, mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'chats',

  data () {
    return {
      activeChat: null,
      dataModal: false,
      socket: null,
      messages: {},
      currentMessage: '',
      channelUuid: null,
      senderData: null,
      receiverData: null,
      WHEN_CONNECTED_CALLBACK_WAIT_INTERVAL: 1000,
      userId: null,
      userRole: null,
      loading: true,
      loadingRole: true,
      subUrl: null,
      sessionId: null,
      isMobile: false
    }
  },

  async created () {
    this.isMobile = window.innerWidth < 720

    // connecting ws
    this.socket = Stomp.over(new SockJS('https://law-app-prof.herokuapp.com/ws'))
    await new Promise((resolve, reject) => {
      this.socket.connect({
        // Authorization: 'Bearer ' + localStorage.getItem('token'),
        // Authentication: 'Bearer ' + localStorage.getItem('token'),
        // use_http_auth: true,
        // login: 'ujuqdhpp',
        // passcode: 'LFuN5bdU8IAonD4zOIzoY2_mypGNCh_N',
        // host: 'ujuqdhpp'
      }, () => {
        this.isConnected = true
        resolve()
      }, function (e) {
        reject(e)
        this.onError()
      })
    })

    // checking if it was goToChat
    if (this.goToChat) {
      await this.createChat(this.goToChat)
    }

    // getting all chats
    await this.getAllChats({
      userId: localStorage.getItem('userId'),
      userEmail: localStorage.getItem('email'),
      role: localStorage.getItem('userType')
    })

    // getting all messages to all chats
    if (this.allChats) {
      this.allChats.forEach(chat => {
        this.getExistingChatSessionMessages({ senderId: chat.senderId, recipientId: chat.recipientId })
          .then(res => {
            if (res?.length) {
              this.messages[res[0]?.chatId] = res?.sort(function (x, y) {
                return parseInt(x.timestamp) - parseInt(y.timestamp)
              })
            }
            if (this.activeChat === null) {
              if (this.goToChat) {
                this.activeChat = `${this.goToChat.senderId}_${this.goToChat.receiverId}`
              } else {
                this.activeChat = res[0]?.chatId
              }
            }
          })
      })

      // subscribing to chats
      this.socket.subscribe(`/user/${this.userId}/queue/messages`, msg => {
        const parsedMsg = JSON.parse(msg.body)?.payload
        if (parsedMsg) {
          const messages = Object.assign({}, this.messages)
          if (!messages[`${parsedMsg.recipientId}_${parsedMsg.senderId}`]) {
            messages[`${parsedMsg.recipientId}_${parsedMsg.senderId}`] = []
          }
          messages[`${parsedMsg.recipientId}_${parsedMsg.senderId}`].push(parsedMsg)
          this.$set(this, 'messages', messages)
        }
      })
    }
  },

  mounted () {
    if (localStorage.userId) {
      this.userId = localStorage.userId
      this.loading = false
    }
    if (localStorage.userType) {
      this.userRole = localStorage.userType
      this.loadingRole = false
    }
    window.onresize = () => {
      this.isMobile = window.innerWidth < 720
    }
  },

  computed: {
    ...mapState(['allChats', 'chatMessages', 'goToChat']),

    chats () {
      if (this.allChats) {
        const chats = {}
        this.allChats.forEach(chat => {
          chats[chat.chatId] = chat
        })
        return chats
      }
      return {}
    }
  },

  methods: {
    ...mapActions(['establishChatSession', 'getAllChats', 'getExistingChatSessionMessages', 'rmDataForChat']),

    moment,

    removeActive () {
      this.activeChat = null
    },

    async createChat ({ receiverId, senderId }) {
      await this.establishChatSession({ receiverId: parseInt(receiverId), senderId: parseInt(senderId) })
        .then(res => {
          console.log(res)
        })
    },

    enterInChat (e) {
      e.preventDefault()
      if (e.keyCode === 13) {
        document.getElementById('sendMsg').click()
      }
    },
    clearFix (e) {
      if (e.keyCode === 13) {
        e.preventDefault()
      }
    },
    activate: function (el) {
      this.activeChat = el
    },
    openDataModal: function () {
      this.dataModal = true
    },

    onClose: function () {
      console.log('You have been disconnected from websocket server')
    },

    isConnected () {
      return (this.socket && this.socket.connected)
    },

    whenConnected: function (_do) {
      setTimeout(
        function () {
          if (this.isConnected()) {
            if (_do !== null) { _do() }
          } else {
            this.whenConnected(_do)
          }
        }, this.WHEN_CONNECTED_CALLBACK_WAIT_INTERVAL)
    },

    onInput (e) {
      this.currentMessage = e.target.innerHTML
    },

    sendChatMessage () {
      if (!this.isConnected) {
        // TODO reconnect and don't ask the user to update the page
        this.$toasted.error('The chat has lost its connection, please reload the page')
        return
      }

      if (!this.currentMessage || this.currentMessage.trim() === '') {
        return
      } else {
        const sendData = {
          chatId: this.chats?.[this.activeChat]?.chatId,
          senderId: this.chats?.[this.activeChat]?.senderId?.toString(),
          recipientId: this.chats?.[this.activeChat]?.recipientId?.toString(),
          senderName: `${this.chats?.[this.activeChat]?.senderFirstName} ${this.chats?.[this.activeChat]?.senderLastName}`,
          recipientName: `${this.chats?.[this.activeChat]?.recipientFirstName} ${this.chats?.[this.activeChat]?.recipientLastName}`,
          content: this.currentMessage.trim(),
          timestamp: Date.now() + ''
        }
        this.socket.send('/app/send', JSON.stringify(sendData), {
          // Authentication: 'Bearer ' + localStorage.getItem('token'),
          // use_http_auth: true,
          // login: 'ujuqdhpp',
          // passcode: 'LFuN5bdU8IAonD4zOIzoY2_mypGNCh_N',
          // host: 'ujuqdhpp'
        })
        const messages = Object.assign({}, this.messages)
        if (!messages[this.activeChat]) messages[this.activeChat] = []
        messages[this.activeChat].push({
          ...sendData,
          recipientId: parseInt(this.chats?.[this.activeChat]?.recipientId),
          senderId: parseInt(this.chats?.[this.activeChat]?.senderId)
        })
        this.$set(this, 'messages', messages)
      }
      document.getElementById('chatMessage').innerHTML = ''
      this.currentMessage = ''
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/chats'
</style>
