<template>
  <div class="equipment">
    <Terminal></Terminal>
  </div>
</template>

<script>

export default {
  components: {
    Terminal: () => import( '@/components/Terminal' ),
  },
  data () {
    return {
      equipments: [
        {
          id: 1,
          name: 'Server',
          remote: '1234'
        },
        {
          id: 2,
          name: 'MacBook Pro',
          remote: '1234'
        },
        {
          id: 3,
          name: 'iPhone',
          remote: '1234'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.equipments {
  display: flex;

  .equipment {
    display: flex;
    margin: 10px;
    width: 100px;
    height: 100px;
    align-items: center;
    justify-content: center;
    background-color: #ccc;
  }
}
</style>