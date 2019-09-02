<template>
  <button class="c-button" :class="{long, primary, danger}">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    long: Boolean,
    primary: Boolean,
    danger: Boolean,
    type: {
      type: String,
      default: 'button'
    }
  }
}
</script>

<style lang="scss">
.c-button {
  display: inline-block;
  padding: 0 15px;
  height: 36px;
  line-height: 1.5;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border-color: #d9d9d9;

  & + & {
    margin: 0 0 0 15px;
  }

  &.long {
    width: 100%;

    & + & {
      margin: 10px 0 0;
    }
  }

  &.primary {
    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }

  &.danger {
    color: #fff;
    background-color: #ff4d4f;
    border-color: #ff4d4f;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 2px rgba(#ff7875, 0.2);
    }
  }
}
</style>