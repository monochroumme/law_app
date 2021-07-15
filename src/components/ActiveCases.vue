<template>
  <div class="active-cases">
    <div class="active-cases__active">Active Cases</div>
    <div class="active-cases__list">
      <template v-for="item in cases">
        <div class="active-cases__list__case" :key="item.id" v-if="item.ARCHIVED_BY_CLIENT">
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
<<<<<<< HEAD
            <button class="active-cases__list__case__btns__btn-def" @click="editModal()">Edit</button>
=======
            <button class="active-cases__list__case__btns__btn-def">Edit</button>
>>>>>>> 00d04976d1e5297c3ad7fe581b4d429033640bd3
            <router-link class="active-cases__list__case__btns__btn-def" to="/client/cases/applied-lawyers">
              Lawyers Applied
            </router-link>
            <button v-on:click="archiveToggler(item)" class="active-cases__list__case__btns__btn-blue">Archive</button>
          </div>
        </div>
      </template>
<<<<<<< HEAD
      <div @click="editModal()" class="active-cases__list__case-add"><span class="add"><svg width="72" height="71" viewBox="0 0 72 71" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M36.0001 0C33.8913 0 32.1819 1.70946 32.1819 3.81818V31.6818L4.31819 31.6818C2.20946 31.6818 0.5 33.3913 0.5 35.5C0.5 37.6087 2.20946 39.3182 4.31819 39.3182H32.1819V67.1818C32.1819 69.2905 33.8913 71 36.0001 71C38.1088 71 39.8182 69.2905 39.8182 67.1818V39.3182H67.6818C69.7905 39.3182 71.5 37.6087 71.5 35.5C71.5 33.3913 69.7905 31.6818 67.6818 31.6818L39.8182 31.6818V3.81818C39.8182 1.70946 38.1088 0 36.0001 0Z" fill="white"/>
</svg></span><span class="text">Add new case</span></div>
=======
>>>>>>> 00d04976d1e5297c3ad7fe581b4d429033640bd3
    </div>
    <div class="active-cases__active">Archived Cases</div>
    <div class="active-cases__list">
      <template v-for="item in cases">
        <div class="active-cases__list__case" :key="item.id" v-if="!item.ARCHIVED_BY_CLIENT">
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
            <button v-on:click="archiveToggler(item)" class="active-cases__list__case__btns__btn-blue">Unarchive</button>
            <button class="active-cases__list__case__btns__btn-del">Delete</button>
          </div>
        </div>
      </template>
    </div>
<<<<<<< HEAD
    <div class="active-cases__modal" v-if="showModal">
      <div class="active-cases__modal__block">
        <div class="active-cases__modal__block__header">
          Edit case
        </div>
        <div class="active-cases__modal__block__body">
          <label>Case description</label>
          <textarea minlength="8" rows="4"></textarea>
          <label>Jurisdiction</label>
          <select>
            <option value="Jurisdiction" selected>Jurisdiction</option>
          </select>
          <label>Practice area</label>
          <input type="text"/>
        </div>
        <div class="active-cases__modal__block__footer">
          <button @click="closeModal()" class="active-cases__modal__block__footer__cancel">Cancel</button>
          <button @click="closeModal()" class="active-cases__modal__block__footer__save">Save</button>
        </div>
      </div>
    </div>
=======
>>>>>>> 00d04976d1e5297c3ad7fe581b4d429033640bd3
  </div>
</template>

<script>
export default {
  name: 'ActiveCases',
  props: {
    cases: {
      type: Array
    },
    activeCases: {
      type: Array
    },
    archivedCases: {
      type: Array
    }
  },
<<<<<<< HEAD
  data () {
    return {
      showModal: false
    }
  },
=======
>>>>>>> 00d04976d1e5297c3ad7fe581b4d429033640bd3
  methods: {
    archiveToggler: function (item) {
      if (item.ARCHIVED_BY_CLIENT) {
        item.ARCHIVED_BY_CLIENT = ''
      } else {
        item.ARCHIVED_BY_CLIENT = 'ARCHIVED_BY_CLIENT'
      }
<<<<<<< HEAD
    },
    editModal: function () {
      this.showModal = true
    },
    closeModal: function () {
      this.showModal = false
=======
>>>>>>> 00d04976d1e5297c3ad7fe581b4d429033640bd3
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/active-cases';
</style>
