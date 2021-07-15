<template>
  <div class="page applied_lawyers-page">
    <div class="applied_lawyers-page__title">Applied lawyers</div>
    <div class="applied_lawyers-page__list">
      <div v-for="(item, index) in items" :key="item.id" class="applied_lawyers-page__list__block">
        <div class="applied_lawyers-page__list__block__name">
          {{ item.name }}
        </div>
        <div class="applied_lawyers-page__list__block__img">
          <img src="@/assets/media/common/photo.png" alt="">
        </div>
        <span>Comments</span>
        <div class="applied_lawyers-page__list__block__separator"/>
        <div class="applied_lawyers-page__list__block__commentary">
          {{ item.description }}
        </div>
        <div class="applied_lawyers-page__list__block__date">
          {{ item.date }}
        </div>
        <div class="applied_lawyers-page__list__block__btns">
          <button class="applied_lawyers-page__list__block__btns__btn-def">Choose lawyer</button>
          <router-link class="applied_lawyers-page__list__block__btns__btn-def" to="/client/chats/">
            Contact lawyer
          </router-link>
          <button v-on:click="hideLawyer(index, item)" class="applied_lawyers-page__list__block__btns__btn-blue">Hide</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'applied-lawyers',

  data () {
    return {
      items: [
        { id: 1, name: 'Lawyer Name', date: '07-07-2021', description: 'random descr 1' },
        { id: 2, name: 'Lawyer Name', date: '07-07-2021', description: 'random descr 2' },
        { id: 3, name: 'Lawyer Name', date: '07-07-2021', description: 'random descr 3' },
        { id: 4, name: 'Lawyer Name', date: '07-07-2021', description: 'random descr 4' },
        { id: 5, name: 'Lawyer Name', date: '07-07-2021', description: 'random descr 5' },
        { id: 6, name: 'Lawyer Name', date: '07-07-2021', description: 'random descr 6' }
      ]
    }
  },
  methods: {
    hideLawyer: function (index, item) {
      this.items.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/applied-lawyers'
</style>
