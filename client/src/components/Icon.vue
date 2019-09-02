<template>
  <i class="c-icon">
    <svg aria-hidden="true">
      <use :xlink:href="`#icon-${type}`" />
    </svg>
  </i>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.c-icon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  svg {
    overflow: hidden;
    width: 1em;
    height: 1em;
    line-height: 1;
    fill: currentColor;
  }
}
</style>