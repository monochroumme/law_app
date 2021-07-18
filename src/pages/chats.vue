<template>
  <div class="page chats-page">
    <div class="chats-page__list">
      <div class="chats-page__list__chat" @click="activate(1)" :class="{ active : active_el === 1 }">
        <template>
          <div class="chats-page__list__chat__img open-user-modal" @click="openDataModal()">
            <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="chats-page__list__chat__text">
            <span class="chats-page__list__chat__text__name">Lawyer name</span>
            <span class="chats-page__list__chat__text__short-msg">Short message...</span>
          </div>
          <div class="chats-page__list__chat__time">07:18</div>
        </template>
      </div>
      <div class="chats-page__list__chat" @click="activate(2)" :class="{ active : active_el === 2 }">
        <template>
          <div class="chats-page__list__chat__img open-user-modal" @click="openDataModal()">
            <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="chats-page__list__chat__text">
            <span class="chats-page__list__chat__text__name">Lawyer name</span>
            <span class="chats-page__list__chat__text__short-msg">Short message...</span>
          </div>
          <div class="chats-page__list__chat__time">07:18</div>
        </template>
      </div>
      <div class="chats-page__list__chat" @click="activate(3)" :class="{ active : active_el === 3 }">
        <template>
          <div class="chats-page__list__chat__img open-user-modal" @click="openDataModal()">
            <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="chats-page__list__chat__text">
            <span class="chats-page__list__chat__text__name">Lawyer name</span>
            <span class="chats-page__list__chat__text__short-msg">Short message...</span>
          </div>
          <div class="chats-page__list__chat__time">07:18</div>
        </template>
      </div>
      <div class="chats-page__list__chat" @click="activate(4)" :class="{ active : active_el === 4 }">
        <template>
          <div class="chats-page__list__chat__img open-user-modal" @click="openDataModal()">
            <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="chats-page__list__chat__text">
            <span class="chats-page__list__chat__text__name">Lawyer name</span>
            <span class="chats-page__list__chat__text__short-msg">Short message...</span>
          </div>
          <div class="chats-page__list__chat__time">07:18</div>
        </template>
      </div>
      <div class="chats-page__list__chat" @click="activate(5)" :class="{ active : active_el === 5 }">
        <template>
          <div class="chats-page__list__chat__img open-user-modal" @click="openDataModal()">
            <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="chats-page__list__chat__text">
            <span class="chats-page__list__chat__text__name">Lawyer name</span>
            <span class="chats-page__list__chat__text__short-msg">Short message...</span>
          </div>
          <div class="chats-page__list__chat__time">07:18</div>
        </template>
      </div>
      <div class="chats-page__list__chat" @click="activate(6)" :class="{ active : active_el === 6 }">
        <template>
          <div class="chats-page__list__chat__img open-user-modal" @click="openDataModal()">
            <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="chats-page__list__chat__text">
            <span class="chats-page__list__chat__text__name">Lawyer name</span>
            <span class="chats-page__list__chat__text__short-msg">Short message...</span>
          </div>
          <div class="chats-page__list__chat__time">07:18</div>
        </template>
      </div>
      <div class="chats-page__list__chat" @click="activate(7)" :class="{ active : active_el === 7 }">
        <template>
          <div class="chats-page__list__chat__img open-user-modal" @click="openDataModal()">
            <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="chats-page__list__chat__text">
            <span class="chats-page__list__chat__text__name">Lawyer name</span>
            <span class="chats-page__list__chat__text__short-msg">Short message...</span>
          </div>
          <div class="chats-page__list__chat__time">07:18</div>
        </template>
      </div>
      <div class="chats-page__list__chat" @click="activate(8)" :class="{ active : active_el === 8 }">
        <template>
          <div class="chats-page__list__chat__img open-user-modal" @click="openDataModal()">
            <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="chats-page__list__chat__text">
            <span class="chats-page__list__chat__text__name">Lawyer name</span>
            <span class="chats-page__list__chat__text__short-msg">Short message...</span>
          </div>
          <div class="chats-page__list__chat__time">07:18</div>
        </template>
      </div>
      <div class="chats-page__list__chat" @click="activate(9)" :class="{ active : active_el === 9 }">
        <template>
          <div class="chats-page__list__chat__img open-user-modal" @click="openDataModal()">
            <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="chats-page__list__chat__text">
            <span class="chats-page__list__chat__text__name">Lawyer name</span>
            <span class="chats-page__list__chat__text__short-msg">Short message...</span>
          </div>
          <div class="chats-page__list__chat__time">07:18</div>
        </template>
      </div>
      <div class="chats-page__list__chat" @click="activate(10)" :class="{ active : active_el === 10 }">
        <template>
          <div class="chats-page__list__chat__img open-user-modal" @click="openDataModal()">
            <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="chats-page__list__chat__text">
            <span class="chats-page__list__chat__text__name">Lawyer name</span>
            <span class="chats-page__list__chat__text__short-msg">Short message...</span>
          </div>
          <div class="chats-page__list__chat__time">07:18</div>
        </template>
      </div>
      <div class="chats-page__list__chat" @click="activate(11)" :class="{ active : active_el === 11 }">
        <template>
          <div class="chats-page__list__chat__img open-user-modal" @click="openDataModal()">
            <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
          </div>
          <div class="chats-page__list__chat__text">
            <span class="chats-page__list__chat__text__name">Lawyer name</span>
            <span class="chats-page__list__chat__text__short-msg">Short message...</span>
          </div>
          <div class="chats-page__list__chat__time">07:18</div>
        </template>
      </div>
    </div>
    <div class="chats-page__chat-block">
      <div class="chats-page__chat-block__header open-user-modal" @click="openDataModal()">
        <div class="chats-page__chat-block__header__img open-user-modal">
          <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
        </div>
        Lawyer name
      </div>
      <div class="chats-page__chat-block__messages main_chat">
        <div class="chats-page__chat-block__messages__msg msg-in">
          <div class="lawyer">Hello, could you help me with my issue?<div class="timestamp">17:08</div></div>
        </div>
        <div class="chats-page__chat-block__messages__msg msg-out">
          <div class="client">How can I help you?<div class="timestamp">17:08</div></div>
        </div>
        <div class="chats-page__chat-block__messages__msg msg-in">
          <div class="lawyer">Hello, could you help me with my issue?<div class="timestamp">17:08</div></div>
        </div>
        <div class="chats-page__chat-block__messages__msg msg-out">
          <div class="client">How can I help you?<div class="timestamp">17:08</div></div>
        </div>
        <div class="chats-page__chat-block__messages__msg msg-in">
          <div class="lawyer">Hello, could you help me with my issue?<div class="timestamp">17:08</div></div>
        </div>
        <div class="chats-page__chat-block__messages__msg msg-out">
          <div class="client">How can I help you?<div class="timestamp">17:08</div></div>
        </div>
        <div class="chats-page__chat-block__messages__msg msg-in">
          <div class="lawyer">Hello, could you help me with my issue?<div class="timestamp">17:08</div></div>
        </div>
        <div class="chats-page__chat-block__messages__msg msg-out">
          <div class="client">How can I help you?<div class="timestamp">17:08</div></div>
        </div>
      </div>
      <div class="chats-page__chat-block__footer">
        <button><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.7034 1.31127C13.9551 -0.437089 11.1106 -0.437089 9.36222 1.31127L2.68566 7.98779C2.47961 8.19384 2.47961 8.52765 2.68566 8.7337C2.89171 8.93975 3.22552 8.93975 3.43157 8.7337L10.1081 2.05718C11.4041 0.762161 13.6614 0.762161 14.9575 2.05718C16.2942 3.39392 16.2942 5.56932 14.9575 6.90607L5.6346 16.3339C4.83719 17.1313 3.44788 17.1313 2.6505 16.3339C1.82785 15.5113 1.82785 14.173 2.6505 13.3503L11.6004 4.29487C11.8992 3.99611 12.4205 3.99611 12.7193 4.29487C13.0278 4.6034 13.0278 5.10568 12.7193 5.41425L4.14281 14.0962C3.96492 14.2741 3.96492 14.6642 4.14281 14.8421C4.34887 15.0482 4.68267 15.0482 4.88873 14.8421L13.4652 6.16012C14.1853 5.43995 14.1853 4.2691 13.4652 3.54896C12.7677 2.8515 11.5509 2.85252 10.8545 3.54896L1.90459 12.6044C0.68024 13.8287 0.68024 15.8554 1.90459 17.0798C2.50267 17.6779 3.29748 18 4.14278 18C4.98808 18 5.78296 17.6779 6.38051 17.0798L15.7034 7.65194C17.4517 5.90359 17.4517 3.05959 15.7034 1.31127Z" fill="#1A2552"/>
        </svg></button>
        <div class="chats-page__chat-block__footer__input-block">
          <div class="chats-page__chat-block__footer__input-block__input" contenteditable/>
        </div>
        <button><svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
          <path d="M17.7638 0.10334C17.5913 -0.0189101 17.3648 -0.0354101 17.1773 0.0628399L0.302283 8.87534C0.102783 8.97959 -0.0149666 9.19259 0.00153336 9.41684C0.0187834 9.64184 0.168033 9.83384 0.380283 9.90659L5.07153 11.5101L15.0623 2.96759L7.33128 12.2818L15.1935 14.9691C15.252 14.9886 15.3135 14.9991 15.375 14.9991C15.477 14.9991 15.5783 14.9713 15.6675 14.9173C15.81 14.8303 15.9068 14.6841 15.9315 14.5198L17.994 0.64484C18.0248 0.43484 17.9363 0.22634 17.7638 0.10334Z" fill="#1A2552"/>
        </svg></button>
      </div>
    </div>

    <UserDataModal v-model="dataModal" :visibility="dataModal"></UserDataModal>
  </div>
</template>

<script>
export default {
  name: 'chats',
  data () {
    return {
      messages: [
        { id: 1, userType: 'client', userName: 'Tofik Huseynov', time: '18:00', message: 'Hello, could you help me with my issue?' },
        { id: 2, userType: 'lawyer', userName: 'Lawyer guy', time: '18:00', message: 'How can I help you?' }
      ],
      active_el: 1,
      dataModal: false
    }
  },
  methods: {
    activate: function (el) {
      this.active_el = el
    },
    openDataModal: function () {
      this.dataModal = true
    }
  },
  mounted () {
    this.$el.querySelector('.main_chat').scrollTop = this.$el.querySelector('.main_chat').scrollHeight
  },
  components: {
    UserDataModal: () => import('@/components/UserDataModal')
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/chats'
</style>
