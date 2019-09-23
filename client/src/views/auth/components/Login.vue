<template>
  <Form class="form" @onSubmit="onSubmit">
    <FormItem>
      <Input prefix="user" placeholder="Name" v-model.trim="form.username" />
    </FormItem>
    <FormItem>
      <Input type="password" prefix="password" placeholder="Password" v-model.trim="form.password" />
    </FormItem>
    <FormItem>
      <Button long primary type="submit">Login</Button>
    </FormItem>
  </Form>
</template>
<script>
import platform from 'platform';

import authMixins from '@/mixins/auth'

export default {
  components: {
    Button: () => import( '@/components/Button' ),
    Input: () => import( '@/components/Input' ),
    Form: () => import( '@/components/Form' ),
    FormItem: () => import( '@/components/FormItem' )
  },
  mixins: [authMixins],
  data () {
    return {
      form: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    validate () {
      const data = { ...this.form }

      return new Promise( resolve => {
        const { username, password } = data

        if ( username === '' ) {
          return resolve( [false, '用户名不能为空'] );
        }

        if ( password === '' ) {
          return resolve( [false, '密码不能为空'] );
        }

        resolve( [true] );
      } );
    },
    async onSubmit () {
      const [valid, msg] = await this.validate();

      if ( valid ) {
        this.login();
      } else {
        console.error( msg );
      }
    },
    async login () {
      const data = { ...this.form }

      const [err, res] = await this.$fetch( 'login', {
        ...data,
        os: platform.os.family,
        browser: platform.name,
        environment: platform.description
      } );

      if ( err ) {
        console.error( err );
      } else {
        console.log( res )
        this.setAuth( res )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.form {
  width: 360px;
}
</style>