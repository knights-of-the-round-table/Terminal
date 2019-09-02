<template>
  <div class="c-input" :class="{prefix, suffix}">
    <Icon class="c-input__prefix" :type="prefix" v-if="prefix" />
    <input :type="type" v-on="listeners" v-model="val" />
    <Icon class="c-input__suffix" :type="suffix" v-if="suffix" />
  </div>
</template>

<script>
import Icon from "./Icon"

export default {
  props: {
    prefix: String,
    suffix: String,
    type: {
      type: String,
      default: 'text'
    }
  },
  components: {
    Icon
  },
  data () {
    return { val: '' }
  },
  computed: {
    listeners () {
      const listeners = {}

      Object.keys( this.$listeners ).forEach( fnName => {
        listeners[fnName] = ( e ) => {
          this.$listeners[fnName]( e.target.value )
        }
      } )
      listeners.input = ( e ) => {
        this.handleInput( e.target.value )
      }
      return listeners
    }
  },
  methods: {
    handleInput ( val ) {
      this.$emit( 'input', val )
    }
  },
  watch: {
    value: {
      handler ( val = '' ) {
        if ( val !== this.val ) {
          this.handleInput( val )
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
.c-input {
  position: relative;
  height: 36px;

  &:focus {
    background-color: #40a9ff;
  }

  &.prefix {
    input {
      padding-left: 30px;
    }

    .c-input__prefix {
      left: 0;
    }
  }

  &.suffix {
    input {
      padding-right: 30px;
    }

    .c-input__suffix {
      right: 0;
    }
  }

  input {
    padding: 8px 8px;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 14px;
    color: #333;

    &:focus {
      border-color: #40a9ff;
      border-right-width: 1px !important;
      outline: 0;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }

  &__prefix,
  &__suffix {
    position: absolute;
    top: 0;
    bottom: 0;

    display: flex;
    width: 30px;
    align-items: center;
    justify-content: center;
    color: #b2b2b2;
  }
}
</style>