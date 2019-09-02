<template>
  <div class="terminal">
    <textarea @input="handleInput" v-model="input"></textarea>
  </div>
</template>

<script>
import fetch from '@/utils/fetch';

export default {
  name: 'Terminal',
  data () {
    return {
      input: ''
    }
  },
  methods: {
    async handleInput ( e ) {
      const [err, res] = await fetch( 'io', {
        input: e.target.value
      } )

      if ( err ) {
        console.error( err )
      }

      console.log( res )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.terminal {
  font-size: 14px;
}
</style>
