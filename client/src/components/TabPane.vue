<template>
  <div class="c-tab-pane" :class="[name]">
    <slot></slot>
  </div>
</template>
<script>

export default {
  props: {
    label: String,
    name: String
  }
}
</script>
<style lang="scss">
.c-tab-pane {
  height: 100%;
}
</style>