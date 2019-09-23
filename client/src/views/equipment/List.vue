<template>
  <div class="equipments">
    <div class="equipment" @click="createEquipment">
      <Icon type="add"></Icon>
    </div>
    <div
      class="equipment"
      v-for="equipment in equipments"
      :key="equipment.id"
      @click="handleViewEquipment(equipment)"
    >{{equipment.name}}</div>
  </div>
</template>

<script>

export default {
  components: {
    Icon: () => import( '@/components/Icon' ),
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
  },
  methods: {
    createEquipment () {
      console.log( 'createEquipment' )
    },
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