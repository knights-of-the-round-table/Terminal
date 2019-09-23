<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import cookie from 'js-cookie';

import authMixins from '@/mixins/auth';

import fetch from '@/utils/fetch';

export default {
  mixins: [authMixins],
  methods: {
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
