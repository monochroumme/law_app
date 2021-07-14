<template>
  <div class="credentials-input">
    <span class="credentials-input__label">{{ label }}</span>
    <div class="credentials-input__input-wrapper">
      <textarea-autosize v-if="isTextarea" :rows="1" :max-rows="5" class="credentials-input__input" :value="value"
                         @input="onInput" :placeholder="placeholder"/>
      <phone-mask-input v-else-if="isPhone" :value="value" @input="onInput" :placeholder="placeholder"
                        @onValidate="$emit('set-phone-valid', $event.isValidByLibPhoneNumberJs)" :show-flag="true"/>
      <input v-else :type="filteredType" class="credentials-input__input" :value="value" @input="onInput"
             :placeholder="placeholder">
    </div>
    <div v-if="showCharacterCount" class="credentials-input__character-count">
      <span class="current">{{ value.length }}</span>
      <template v-if="maxCharacters">
        <span>/</span>
        <span class="max">{{ maxCharacters }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CredentialsInput',

  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    isTextarea: {
      type: Boolean,
      default: false
    },
    isPhone: {
      type: Boolean,
      default: false
    },
    showCharacterCount: {
      type: Boolean,
      default: false
    },
    maxCharacters: {
      type: Number,
      default: 0
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    filteredType () {
      return this.type === 'password' && this.showPassword ? 'text' : this.type
    }
  },

  methods: {
    onInput (e) {
      if (this.isTextarea) {
        this.$emit('input', this.maxCharacters ? e.slice(0, this.maxCharacters) : e)
      } else if (this.isPhone) {
        this.$emit('input', e)
      } else {
        this.$emit('input', this.maxCharacters ? e.target.value.slice(0, this.maxCharacters) : e.target.value)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/credentials-input';
</style>
