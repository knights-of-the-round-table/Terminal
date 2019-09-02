<template>
  <div class="equipments">
    <div
      class="equipment"
      v-for="equipment in equipments"
      :key="equipment.id"
      @click="handleViewEquipment(equipment)"
    >{{equipment.name}}</div>
  </div>
</template>

<script>
import fetch from '@/utils/fetch';

export default {
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
  },
  methods: {
    handleViewEquipment ( { id } ) {
      this.$router.push( {
        name: 'equipment',
        params: {
          id
        }
      } )
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