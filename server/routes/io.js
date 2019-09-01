const assert = require( 'assert' )

const Socket = require( '../models/Socket' )

const { responseSuccess, responseError } = require( '../utils/response' )
const xss = require( '../utils/xss' )

const FIRST_TIME_MESSAGES_COUNT = 15
const EACH_FETCH_MESSAGES_COUNT = 30

module.exports = {
    async io ( ctx ) {
        const { to, type, content } = ctx.data
        // assert( ctx.socket.user, '游客不能发送消息，请登录' )
        // assert( to, 'to 不能为空' )

        return responseSuccess( {
            to,
            type,
            content
        } )
    }
}