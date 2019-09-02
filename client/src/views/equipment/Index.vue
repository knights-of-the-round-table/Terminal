<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import socket from '@/utils/socket';

export default {
  methods: {
    iinitSocket () {
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
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
textarea,
ul {
  margin: 0;
}

body {
  font-family: Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei,
    \\5fae\8f6f\96c5\9ed1, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
