<template>
  <div class="terminal">
    <textarea @input="handleInput" v-model="input"></textarea>
    <pre>{{ output }}</pre>
  </div>
</template>

<script>
import IO from 'socket.io-client'

let socket = null

export default {
  name: 'Terminal',
  props: {
    socketOptions: {
      type: Object,
      default () { return { reconnectionDelay: 1000 } }
    }
  },
  data () {
    return {
      input: '',
      output: ''
    }
  },
  methods: {
    async handleInput ( e ) {
      const [err, res] = await this.fetch( 'input', {
        i: e.target.value
      } )

      console.log( err, res )
    },
    fetch ( event, data = {} ) {
      return new Promise( resolve => {
        socket.emit( event, data, ( { status, data } ) => {
          if ( status === 'OK' ) {
            resolve( [null, data] )
          } else {
            resolve( data, null )
          }
        } )
      } )
    },
    getConnection () {
      socket = new IO( '//localhost:4499', Object.assign( {}, this.socketOptions, { query: { name: 'Vinci' } } ) )

      socket.on( 'connect', async () => {
        console.log( 'socket connect' )
      } )
      socket.on( 'connect', async () => {
        console.log( 'socket connect' )
      } )
      socket.on( 'disconnect', async () => {
        console.log( 'socket disconnect' )
      } )
      socket.on( 'output', async ( message ) => {
        this.output = message
      } )
    }
  },
  mounted () {
    this.getConnection()
  }
}
</script>

<style scoped>
.terminal {
  font-size: 14px;
}
</style>
