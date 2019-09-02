<template>
  <div class="c-form-item">
    <slot></slot>
  </div>
</template>
<script>

export default {

}
</script>
<style lang="scss">
.c-form-item {
  & + & {
    margin-top: 15px;
  }
}
</style>