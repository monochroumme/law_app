<template>
  <div class="custom-multiselect">
    <loading :active.sync="loading"
             :can-cancel="false"
             :width="30"
             :height="30"
             :is-full-page="false"></loading>

    <span class="common__label" v-if="label">{{ label }}</span>
    <multiselect
      :value="value"
      @input="onSelect"
      :placeholder="placeholder"
      :close-on-select="closeOnSelect"
      :label="labelName"
      :track-by="trackBy"
      :options="options"
      :multiple="multiple"
      :group-values="groupValuesName"
      :group-label="groupLabelName"
      :group-select="true"
      :taggable="true"
      :disable-create-tag="true"
    >
      <template v-slot:noResult>
        Nothing found
      </template>
    </multiselect>
  </div>
</template>

<script>
export default {
  name: 'CustomMultiselect',

  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    groupValuesName: {
      type: String,
      default: 'options'
    },
    groupLabelName: {
      type: String,
      default: 'name'
    },
    labelName: {
      type: String,
      default: 'name'
    },
    trackBy: {
      type: String,
      default: 'id'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onSelect (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/custom-multiselect';
</style>
