import Vue from 'vue'
import Router from 'vue-router'
import cookie from 'js-cookie'

// routers
import auth from './auth'
import equipment from './equipment'

Vue.use( Router )

const router = new Router( {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import( '@/App' ),
      children: [
        {
          path: '',
          redirect: '/equipment/list'
        },
        auth,
        equipment
      ]
    }
  ]
} )

router.beforeEach( ( to, from, next ) => {
  if ( typeof cookie.get( 'token' ) === 'undefined'
    && to.path !== '/auth' ) {
    next( { path: '/auth' } )
  } else {
    next()
  }
} )

export default router