<template>
  <div class="page all_cases-page">
    <button id="openFilterBtn" @click="openFilter()" class="all_cases-page__filter">Filter</button>
    <div class="all_cases-page__title">All cases</div>
    <div class="all_cases-page__list">
      <div v-for="item in this.lawyerFilteredCases" :key="item.id" class="all_cases-page__list__block">
        <div class="all_cases-page__list__block__name open-user-modal" @click="openDataModal(item.clientDto.id)">
          {{ item.clientFirstName }} {{ item.clientLastName }}
        </div>
        <div class="all_cases-page__list__block__img open-user-modal" @click="openDataModal(item.clientDto.id)">
          <img v-if="item.clientDto.imageDto" :src="item.clientDto.imageDto.url" alt="">
          <img v-else class="open-user-modal" src="/media/common/user.svg" alt="">
        </div>
        <span>Case description</span>
        <div class="all_cases-page__list__block__separator"/>
        <div class="all_cases-page__list__block__commentary">
          {{ item.description }}
        </div>
        <div class="all_cases-page__list__block__date">
          {{ item.creationDate.slice(0, 10) }}
        </div>
        <div class="all_cases-page__list__block__btns">
          <button class="all_cases-page__list__block__btns__btn-def" @click="launch(item.id)">Apply</button>
          <button class="all_cases-page__list__block__btns__btn-blue" @click="deleteCase(item.id)">Hide</button>
        </div>
      </div>
    </div>
    <ApplyModal v-if="isModalShown" :visibility="isModalShown" :caseId="this.applyId"></ApplyModal>
    <div v-if="showFilter" v-click-outside="closeFilter" class="all_cases-page__modal">
      <button class="x-close" @click="closeFilterBtn">X</button>
      <div class="all_cases-page__modal__header">
        Filter
      </div>
      <div class="all_cases-page__modal__body">
        <form @submit.prevent="onSubmit">
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
            :close-on-select="true"
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
        </form>
      </div>
    </div>
    <UserDataModal v-if="dataModal && userData" v-model="userData" :visibility="dataModal"></UserDataModal>
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
      dataModal: false,
      applyId: null
    }
  },
  computed: {
    ...mapState(['lawyerFilteredCases', 'defaultJurisdictions', 'defaultAreasOfLaw', 'jurisdictions', 'areasOfLaw', 'userData'])
  },
  components: {
    ApplyModal: () => import('@/components/ApplyModal'),
    UserDataModal: () => import('@/components/UserDataModal'),
    CustomMultiselect: () => import('@/components/CustomMultiselect')
  },
  async created () {
    if (!this.jurisdictions) {
      await this.getJurisdictions().then(() => {
        this.jurisdiction = JSON.parse(localStorage.jurisdictionDtoList)
        this.jurisdictions.map((j) => {
          this.jurisdiction.map((jL, index) => {
            if (j.id === jL) {
              this.jurisdiction[index] = j
            }
          })
        })
      })
    }
    if (!this.areasOfLaw) {
      await this.getAreasOfLaw()
      this.areaOfLaw = JSON.parse(localStorage.practiceAreaDtoList)
      this.areasOfLaw.map((p) => {
        this.areaOfLaw.map((pL, index) => {
          if (p.id === pL) {
            this.areaOfLaw[index] = p
          }
        })
      })
    }
    await this.getLawyerFilteredCases({
      isAscending: false,
      jurisdictionIdList: this.jurisdiction,
      practiceAreaIdList: this.areaOfLaw
    })
  },
  methods: {
    ...mapActions(['getJurisdictions', 'getAreasOfLaw']),
    ...mapActions(['getLawyerFilteredCases', 'getClientDataById', 'deleteLawyerCase']),
    launch: function (id) {
      this.isModalShown = true
      this.applyId = id
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
    async openDataModal (id) {
      await this.getClientDataById(id).then(() => {
        this.dataModal = true
      })
    },
    async application (item) {
      await this.applyToCase(parseInt(item.id))
        .then(() => {
          this.lawyerFilteredCases.map((obj, index) => {
            if (obj.id === item.id) {
              this.lawyerFilteredCases.splice(index, 1)
            }
          })
        })
    },
    async deleteCase (id) {
      await this.deleteLawyerCase(parseInt(id.toString())).then(() => {
        this.lawyerFilteredCases.map((obj, index) => {
          if (obj.id === id) {
            this.lawyerFilteredCases.splice(index, 1)
          }
        })
      })
    },
    async onSubmit () {
      await this.getLawyerFilteredCases({
        isAscending: false,
        jurisdictionIdList: this.jurisdiction,
        practiceAreaIdList: this.areaOfLaw
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/all-cases';
</style>
