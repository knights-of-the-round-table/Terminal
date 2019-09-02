import cookie from 'js-cookie'
import platform from 'platform'

import fetch from '@/utils/fetch'

export default {
    methods: {
        setAuth ( { token, expires } ) {
            if ( typeof expires !== 'undefined' ) {
                const expiresDate = new Date( Date.now() + expires )

                cookie.set( 'token', token, {
                    expires: expiresDate
                } )
            }

            this.$router.push( {
                path: '/'
            } )
        },
        async loginByToken () {
            const token = cookie.get( 'token' );

            const [err, res] = await fetch( 'loginByToken', {
                token,
                os: platform.os.family,
                browser: platform.name,
                environment: platform.description
            } )

            if ( err ) {
                console.error( err )
            } else {
                this.setAuth( res )
            }
        }
    }
}