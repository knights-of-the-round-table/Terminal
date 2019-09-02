<template>
  <div class="c-tabs" ref="tabs">
    <nav class="c-tabs__nav">
      <a
        v-for="nav in navList"
        :class="{active: current === nav.name}"
        :key="nav.name"
        @click="handleNavClick(nav)"
      >{{ nav.label }}</a>
    </nav>
    <div class="c-tabs__content">
      <div class="c-tabs__content-scroller">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      navList: [],
      current: ''
    }
  },
  methods: {
    getNavList () {
      const navList = []

      this.$children.forEach( child => navList.push( child.$options.propsData ) )

      this.navList = navList
      this.current = navList[0] ? navList[0].name : ''
    },
    handleNavClick ( { name } ) {
      this.current = name
      this.$refs.tabs.querySelector( `.c-tab-pane.${name}` ).scrollIntoView( { behavior: 'smooth' } )
    }
  },
  mounted () {
    this.getNavList()
  }
}
</script>
<style lang="scss">
.c-tabs {
  &__nav {
    padding: 20px 0;
    text-align: center;

    a {
      display: inline-block;
      margin: 0 15px;
      padding: 4px 0;
      user-select: none;
      cursor: pointer;
      font-weight: 400;
      border-bottom: 2px solid transparent;

      &.active,
      &:hover {
        color: #1890ff;
      }

      &.active {
        position: relative;
        border-bottom-color: #1890ff;
      }
    }
  }

  &__content {
    overflow: hidden;
    height: 100%;
  }

  &__content-scroller {
    display: flex;
  }
}
</style>