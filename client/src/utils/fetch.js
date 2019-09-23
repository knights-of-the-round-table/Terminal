import axios from 'axios'
import cookie from 'js-cookie'

import API from '@/api'
import router from '@/router'

const _axios = axios.create( {
    baseURL: API.baseURL,
    timeout: 10000
} )

function mixinAuth ( params = {} ) {
    const token = cookie.get( 'token' )

    return {
        token,
        ...params
    }
}

_axios.interceptors.request.use( config => {
    switch ( config.method ) {
        case 'put':
        case 'post':
        case 'patch':
            config.data = mixinAuth( config.data )

            break
        default:
            config.params = mixinAuth( config.data )
    }

    return config
},
    error => {
        return Promise.reject( error )
    } )

_axios.interceptors.response.use( response => {
    const res = response.data

    if ( res.status !== 'OK' ) {
        return Promise.reject( new Error( res.data ) )
    }

    return res
}, error => {
    console.error( error )

    if ( typeof error.response === 'undefined' ) {
        return Promise.reject( error )
    }

    if ( error.response.status === 403 ) {
        router.go( {
            name: 'login',
            query: {
                redirect: router.history.current.path
            }
        } )
    }

    return Promise.reject( error )
} )

export function fetch ( api, data = {} ) {
    const { url, method } = API[api]

    return new Promise( resolve => {
        _axios( {
            url,
            method,
            data
        } ).then( res => {
            resolve( [null, res.data] )
        } ).catch( err => {
            resolve( [err, null] )
        } )
    } )
}

export default {
    install ( Vue ) {
        Vue.prototype.$fetch = fetch
    }
}