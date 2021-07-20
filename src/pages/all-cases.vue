<template>
  <div class="page all_cases-page">
    <button id="openFilterBtn" @click="openFilter()" class="all_cases-page__filter">Filter</button>
    <div class="all_cases-page__title">All cases</div>
    <div class="all_cases-page__list">
      <div v-for="item in items" :key="item.id" class="all_cases-page__list__block">
        <div class="all_cases-page__list__block__name open-user-modal" @click="openDataModal()">
          {{ item.name }}
        </div>
        <div class="all_cases-page__list__block__img open-user-modal" @click="openDataModal()">
          <img class="open-user-modal" src="@/assets/media/common/photo.png" alt="">
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
        <form @submit.prevent="onSubmit"></form>
        <custom-multiselect
          class="mb-20"
          v-model="jurisdiction"
          placeholder="Choose your jurisdiction"
          label="Jurisdiction"
          :options="jurisdictions || defaultJurisdictions"
          :multiple="true"
          :close-on-select="true"
          group-values-name="states"
          group-label-name="jurisdiction"
          label-name="jurisdiction"
        />
        <custom-multiselect
          v-model="areaOfLaw"
          placeholder="Choose your area of law"
          label="Area of Law"
          :options="areasOfLaw || defaultAreasOfLaw"
          :multiple="true"
          :close-on-select="false"
          label-name="practiceArea"
        />
        <label class="sort">Sort by date:</label>
        <div class="all_cases-page__modal__body__radio">
          <input type="radio"/> Most recent
        </div>
        <div class="all_cases-page__modal__body__radio">
          <input type="radio"/> Old ones
        </div>
        <button type="submit">Done</button>
      </div>
    </div>
    <UserDataModal v-model="dataModal" :visibility="dataModal"></UserDataModal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'all-cases',
  data () {
    return {
      jurisdiction: null,
      areaOfLaw: null,
      showFilter: false,
      items: [
        { id: 1, name: 'Test user', date: '07-07-2021', description: 'random descr 1' },
        { id: 2, name: 'Test user', date: '07-07-2021', description: 'random descr 2' },
        { id: 3, name: 'Test user', date: '07-07-2021', description: 'random descr 3' },
        { id: 4, name: 'Test user', date: '07-07-2021', description: 'random descr 4' },
        { id: 5, name: 'Test user', date: '07-07-2021', description: 'random descr 5' },
        { id: 6, name: 'Test user', date: '07-07-2021', description: 'random descr 6' }
      ],
      isModalShown: false,
      dataModal: false
    }
  },
  computed: {
    ...mapState(['lawyerFilteredCases', 'defaultJurisdictions', 'defaultAreasOfLaw', 'jurisdictions', 'areasOfLaw'])
  },
  components: {
    ApplyModal: () => import('@/components/ApplyModal'),
    UserDataModal: () => import('@/components/UserDataModal'),
    CustomMultiselect: () => import('@/components/CustomMultiselect')
  },
  async created () {
    if (!this.jurisdictions) {
      await this.getJurisdictions()
    }
    if (!this.areasOfLaw) {
      await this.getAreasOfLaw()
    }
    // if (!this.lawyerFilteredCases) {
    //   await this.getLawyerFilteredCases({
    //     jurisdictionIdList: ['1', '2', '3'],
    //     practiceAreaIdList: ['1', '2', '3'],
    //     isAscending: true
    //   })
    // }
  },
  methods: {
    ...mapActions(['getJurisdictions', 'getAreasOfLaw']),
    ...mapActions(['getLawyerFilteredCases']),
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
    },
    openDataModal: function () {
      this.dataModal = true
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/all-cases';
</style>
