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
            <button class="active-cases__list__case__btns__btn-def">Edit</button>
            <router-link class="active-cases__list__case__btns__btn-def" to="/client/cases/applied-lawyers">
              Lawyers Applied
            </router-link>
            <button v-on:click="archiveToggler(item)" class="active-cases__list__case__btns__btn-blue">Archive</button>
          </div>
        </div>
      </template>
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
  methods: {
    archiveToggler: function (item) {
      if (item.ARCHIVED_BY_CLIENT) {
        item.ARCHIVED_BY_CLIENT = ''
      } else {
        item.ARCHIVED_BY_CLIENT = 'ARCHIVED_BY_CLIENT'
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/active-cases';
</style>
