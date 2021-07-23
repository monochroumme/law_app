<template>
  <div class="active-cases">
    <div class="active-cases__active">Active Cases</div>
    <div class="active-cases__list">
      <template v-for="item in this.activeCases">
        <div class="active-cases__list__case" :key="item.id">
          <div class="active-cases__list__case__title">
            Case Description
          </div>
          <div class="active-cases__list__case__date">
            {{ item.date }}
          </div>
          <div class="active-cases__list__case__separator"></div>
          <div class="active-cases__list__case__description">
            {{ item.description }}
          </div>
          <div class="active-cases__list__case__separator"></div>
          <div class="active-cases__list__case__btns">
            <button class="active-cases__list__case__btns__btn-def" @click="openEditModal(item)">Edit</button>
            <router-link class="active-cases__list__case__btns__btn-def" :to="'/client/cases/'+item.id+'/applied-lawyers'">
              Lawyers Applied
            </router-link>
            <button v-on:click="archiveToggler(item)" class="active-cases__list__case__btns__btn-blue">Archive</button>
          </div>
        </div>
      </template>
      <div @click="editModal2()" class="active-cases__list__case-add addCaseBtn"><span class="add addCaseBtn"><svg class="addCaseBtn" width="72" height="71" viewBox="0 0 72 71" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="addCaseBtn" fill-rule="evenodd" clip-rule="evenodd" d="M36.0001 0C33.8913 0 32.1819 1.70946 32.1819 3.81818V31.6818L4.31819 31.6818C2.20946 31.6818 0.5 33.3913 0.5 35.5C0.5 37.6087 2.20946 39.3182 4.31819 39.3182H32.1819V67.1818C32.1819 69.2905 33.8913 71 36.0001 71C38.1088 71 39.8182 69.2905 39.8182 67.1818V39.3182H67.6818C69.7905 39.3182 71.5 37.6087 71.5 35.5C71.5 33.3913 69.7905 31.6818 67.6818 31.6818L39.8182 31.6818V3.81818C39.8182 1.70946 38.1088 0 36.0001 0Z" fill="white"/>
</svg></span><span class="text addCaseBtn">Add new case</span></div>
    </div>
    <div class="active-cases__active">Archived Cases</div>
    <div class="active-cases__list">
      <template v-for="item in this.archivedCases">
        <div class="active-cases__list__case" :key="item.id">
          <div class="active-cases__list__case__title">
            Case Description
          </div>
          <div class="active-cases__list__case__date">
            {{ item.date }}
          </div>
          <div class="active-cases__list__case__separator"></div>
          <div class="active-cases__list__case__description">
            {{ item.description }}
          </div>
          <div class="active-cases__list__case__separator"></div>
          <div class="active-cases__list__case__btns">
            <button v-on:click="unarchiveToggler(item)" class="active-cases__list__case__btns__btn-blue">Unarchive</button>
            <button v-on:click="deleteCase(item.id)" class="active-cases__list__case__btns__btn-del">Delete</button>
          </div>
        </div>
      </template>
    </div>
    <div class="active-cases__modal" v-if="showModal">
      <div class="active-cases__modal__block" v-click-outside="closeModalClickOut">
        <div class="active-cases__modal__block__header">
          Add case
        </div>
        <form @submit.prevent="onSubmit">
          <div class="active-cases__modal__block__body">
            <label>Case description</label>
            <textarea v-model="caseDescription" minlength="8" rows="4"></textarea>
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
              class="mb-20"
              v-model="areaOfLaw"
              placeholder="Choose your area of law"
              label="Area of Law"
              :options="areasOfLaw || defaultAreasOfLaw"
              :multiple="true"
              :close-on-select="false"
              label-name="practiceArea"
            />
          </div>
          <div class="active-cases__modal__block__footer">
            <button @click="closeModal()" class="active-cases__modal__block__footer__cancel">Cancel</button>
            <button type="submit" class="active-cases__modal__block__footer__save">Save</button>
          </div>
        </form>
      </div>
    </div>
    <div class="active-cases__modal" v-if="showEditModal">
      <div class="active-cases__modal__block" v-click-outside="closeModalClickOut">
        <div class="active-cases__modal__block__header">
          Edit case
        </div>
        <form @submit.prevent="onEdit">
          <div class="active-cases__modal__block__body">
            <label>Case description</label>
            <textarea v-model="modalData.description" minlength="8" rows="4"></textarea>
            <custom-multiselect
              class="mb-20"
              v-model="modalData.jurisdictionIdList"
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
              class="mb-20"
              v-model="modalData.practiceAreaIdList"
              placeholder="Choose your area of law"
              label="Area of Law"
              :options="areasOfLaw || defaultAreasOfLaw"
              :multiple="true"
              :close-on-select="false"
              label-name="practiceArea"
            />
          </div>
          <div class="active-cases__modal__block__footer">
            <button @click="closeModal()" class="active-cases__modal__block__footer__cancel">Cancel</button>
            <button type="submit" class="active-cases__modal__block__footer__save">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ActiveCases',
  components: {
    CustomMultiselect: () => import('@/components/CustomMultiselect')
  },
  computed: {
    ...mapState(['defaultJurisdictions', 'defaultAreasOfLaw', 'jurisdictions', 'areasOfLaw'])
  },
  data () {
    return {
      showModal: false,
      showEditModal: false,
      caseDescription: '',
      jurisdiction: '',
      areaOfLaw: '',
      activeCases: [],
      archivedCases: [],
      modalData: {
        id: '',
        description: '',
        jurisdictionIdList: [],
        practiceAreaIdList: []
      }
    }
  },
  created () {
    if (!this.jurisdictions) {
      this.getJurisdictions()
      this.getAreasOfLaw()
    }
  },
  mounted () {
    this.$parent.clientAllCases.map(c => {
      if (c.caseState === 'FREE' || c.caseState === 'APPLIED') {
        this.activeCases.push(c)
      }
      if (c.caseState === 'ARCHIVED_BY_CLIENT' || c.caseState === 'DONE') {
        this.archivedCases.push(c)
      }
    })
  },
  methods: {
    ...mapActions(['getJurisdictions', 'getAreasOfLaw']),
    ...mapActions(['addClientCase', 'editClientCase', 'getActiveCases', 'archiveClientCase', 'deleteClientCase', 'unarchiveClientCase']),

    async archiveToggler (item) {
      await this.archiveClientCase(parseInt(item.id))
        .then(() => {
          this.activeCases.map((obj, index) => {
            if (obj.id === item.id) {
              this.activeCases.splice(index, 1)
            }
          })
          this.archivedCases.push(item)
        })
    },
    async unarchiveToggler (item) {
      await this.unarchiveClientCase(parseInt(item.id))
        .then(() => {
          this.archivedCases.map((obj, index) => {
            if (obj.id === item.id) {
              this.archivedCases.splice(index, 1)
            }
          })
          this.activeCases.push(item)
        })
    },
    async deleteCase (id) {
      await this.deleteClientCase(parseInt(id.toString()))
        .then(() => {
          this.archivedCases.map((obj, index) => {
            if (obj.id === id) {
              this.archivedCases.splice(index, 1)
            }
          })
        })
    },
    openEditModal: function (data) {
      this.showEditModal = true
      delete data.jurisdictionList
      delete data.practiceAreaList
      this.jurisdictions.map((j) => {
        data.jurisdictionIdList.map((jL, index) => {
          if (j.id === parseInt(jL)) {
            data.jurisdictionIdList[index] = j
          }
        })
      })
      if (data.practiceAreaIdList.length + 1 === this.areasOfLaw.length) {
        data.practiceAreaIdList = []
        data.practiceAreaIdList.push({ id: 999, practiceArea: 'I don\'t know' })
      } else {
        this.areasOfLaw.map((p) => {
          data.practiceAreaIdList.map((pL, index) => {
            if (p.id === parseInt(pL)) {
              data.practiceAreaIdList[index] = p
            }
          })
        })
      }
      this.modalData = data
    },
    editModal2: function () {
      this.showModal = true
    },
    closeModal: function () {
      this.showModal = false
      this.showEditModal = false
    },
    closeModalClickOut: function (event) {
      if (!event.path[0].classList.contains('active-cases__list__case__btns__btn-def') && !event.path[0].classList.contains('active-cases__list__case-add') && !event.path[0].classList.contains('addCaseBtn')) {
        this.showModal = false
        this.showEditModal = false
      }
    },
    validateInputs () {
      let error = false

      if (!this.caseDescription?.trim()?.length) {
        error = true
        this.$toasted.error('Please, enter your case description')
      }
      if (!this.jurisdiction?.length) {
        error = true
        this.$toasted.error('Please, choose your jurisdiction')
      }
      if (!this.areaOfLaw?.length) {
        error = true
        this.$toasted.error('Please, choose your area of law')
      }

      return error // error => false, valid => true
    },
    async onEdit () {
      const putData = {
        id: this.modalData.id,
        description: this.modalData.description,
        jurisdictionIdList: this.modalData.jurisdictionIdList.map(j => parseInt(j.id)),
        practiceAreaIdList: this.modalData.practiceAreaIdList.map(p => parseInt(p.id))
      }
      await this.editClientCase(putData)
        .then(() => {
          this.activeCases.map((c) => {
            if (c.id === this.modalData.id) {
              c = this.modalData
            }
          })
          this.closeModal()
        })
    },
    async onSubmit () {
      if (!this.wait) {
        if (!this.validateInputs()) {
          let allAreas = null
          this.areaOfLaw.map(a => {
            if (a.id === 999) {
              allAreas = this.areasOfLaw
              allAreas.shift()
            }
          })
          await this.addClientCase({
            clientId: localStorage.getItem('userId'),
            description: this.caseDescription,
            jurisdictionIdList: this.jurisdiction.map(j => parseInt(j.id.toString())),
            practiceAreaIdList: (allAreas ? allAreas.map(aA => parseInt(aA.id.toString())) : this.areaOfLaw.map(p => parseInt(p.id.toString())))
          }).then(() => {
            this.activeCases.push({
              clientId: localStorage.getItem('userId'),
              description: this.caseDescription,
              jurisdictionIdList: this.jurisdiction.map(j => parseInt(j.id.toString())),
              practiceAreaIdList: this.areaOfLaw.map(p => parseInt(p.id.toString()))
            })
            this.closeModal()
          }).catch(() => {
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/active-cases';
</style>
