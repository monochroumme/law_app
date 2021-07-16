<template>
  <div class="page all_cases-page">
    <button id="openFilterBtn" @click="openFilter()" class="all_cases-page__filter">Filter</button>
    <div class="all_cases-page__title">All cases</div>
    <div class="all_cases-page__list">
      <div v-for="item in items" :key="item.id" class="all_cases-page__list__block">
        <div class="all_cases-page__list__block__name">
          {{ item.name }}
        </div>
        <div class="all_cases-page__list__block__img">
          <img src="@/assets/media/common/photo.png" alt="">
        </div>
        <span>Case description</span>
        <div class="all_cases-page__list__block__separator"/>
        <div class="all_cases-page__list__block__commentary">
          {{ item.description }}
        </div>
        <div class="all_cases-page__list__block__date">
          {{ item.date }}
        </div>
        <div class="all_cases-page__list__block__btns">
          <button class="all_cases-page__list__block__btns__btn-def" @click="launch()">Apply</button>
          <button class="all_cases-page__list__block__btns__btn-blue">Archive</button>
        </div>
      </div>
    </div>
    <ApplyModal v-model="isModalShown" :visibility="isModalShown"></ApplyModal>
    <div v-if="showFilter" v-click-outside="closeFilter" class="all_cases-page__modal">
      <button class="x-close" @click="closeFilterBtn">X</button>
      <div class="all_cases-page__modal__header">
        Filter
      </div>
      <div class="all_cases-page__modal__body">
        <label>Jurisdiction</label>
        <select>
          <option value="Jurisdiction">Jurisdiction</option>
        </select>
        <label>Practice Area</label>
        <input type="text" value=""/>
        <label class="sort">Sort by date:</label>
        <div class="all_cases-page__modal__body__radio">
          <input type="radio"/> Most recent
        </div>
        <div class="all_cases-page__modal__body__radio">
          <input type="radio"/> Old ones
        </div>
        <button @click="closeFilterBtn()">Done</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'all-cases',
  data () {
    return {
      showFilter: false,
      items: [
        { id: 1, name: 'Test user', date: '07-07-2021', description: 'random descr 1' },
        { id: 2, name: 'Test user', date: '07-07-2021', description: 'random descr 2' },
        { id: 3, name: 'Test user', date: '07-07-2021', description: 'random descr 3' },
        { id: 4, name: 'Test user', date: '07-07-2021', description: 'random descr 4' },
        { id: 5, name: 'Test user', date: '07-07-2021', description: 'random descr 5' },
        { id: 6, name: 'Test user', date: '07-07-2021', description: 'random descr 6' }
      ],
      isModalShown: false
    }
  },
  components: {
    ApplyModal: () => import('@/components/ApplyModal')
  },
  methods: {
    launch: function () {
      this.isModalShown = true
    },
    openFilter: function () {
      this.showFilter = true
    },
    closeFilter: function (event) {
      if (event.path[0] !== document.getElementById('openFilterBtn')) {
        this.showFilter = false
      }
    },
    closeFilterBtn: function () {
      this.showFilter = false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/all-cases';
</style>
