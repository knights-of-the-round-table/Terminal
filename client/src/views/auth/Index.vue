<template>
  <div class="auth">
    <Tabs @onChange="handleChange">
      <TabPane label="Login" name="Login">
        <Login></Login>
      </TabPane>
      <TabPane label="Register" name="Register">
        <Register></Register>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  components: {
    Tabs: () => import( '@/components/Tabs' ),
    TabPane: () => import( '@/components/TabPane' ),
    Login: () => import( './components/Login' ),
    Register: () => import( './components/Register' )
  },
  data () {
    return {
      auth: 'Login'
    }
  },
  methods: {
    handleChange ( tab ) {
      console.log( tab )
    }
  }
}
</script>
<style lang="scss" scoped>
.auth {
  margin: 0 auto;
  width: 360px;
}
</style>