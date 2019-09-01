<template>
  <div id="app">
    <Terminal></Terminal>
    <pre>{{ messages }}</pre>
  </div>
</template>

<script>
import socket from '@/utils/socket';

import Terminal from '@/components/Terminal'

export default {
  name: 'app',
  components: {
    Terminal
  },
  data () {
    return {
      messages: []
    }
  },
  methods: {
    initSocket () {
      socket.on( 'connect', async () => {
        const token = localStorage.getItem( 'token' );

        if ( token ) {
          this.loginByToken( token );
        } else {
          this.showLogin();
        }
      } );
      socket.on( 'disconnect', () => {
        console.error( 'disconnect' );
      } );
      socket.on( 'message', message => {
        // TODO
        // 判断 message 是否是新的 contact
        // Y：加入新联系人
        // N：pushContactMessages
        console.log( message.to );
      } );
    },
    loginByToken () {
      console.log( 'login by token' )
    },
    showLogin () {
      console.log( 'show login' )
    }
  },
  created () {
    this.initSocket()
  }
}
</script>

<style>
</style>
