<template>
  <form class="c-form" @submit="handleSubmit">
    <slot></slot>
  </form>
</template>
<script>

export default {
  methods: {
    handleSubmit ( e ) {
      e.preventDefault()

      this.$emit( 'onSubmit' )
    }
  }
}
</script>
<style lang="scss">
.c-form {
}
</style>