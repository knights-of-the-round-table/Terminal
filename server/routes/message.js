const assert = require( 'assert' )
const { isValid } = require( 'mongoose' ).Types.ObjectId

const User = require( '../models/User' )
const Group = require( '../models/Group' )
const Message = require( '../models/Message' )
const Socket = require( '../models/Socket' )

const { responseSuccess, responseError } = require( '../utils/response' )
const xss = require( '../utils/xss' )

const FIRST_TIME_MESSAGES_COUNT = 15
const EACH_FETCH_MESSAGES_COUNT = 30

module.exports = {
    async sendMessage ( ctx ) {
        const { to, type, content } = ctx.data
        assert( ctx.socket.user, '游客不能发送消息，请登录' )
        assert( to, 'to 不能为空' )

        let toGroupId = ''
        let toUserId = ''

        if ( isValid( to ) ) {
            toGroupId = to

            const toGroup = await Group.findOne( { _id: toGroupId } )
            assert( toGroup, '群组不存在' )
        } else {
            toUserId = to.replace( ctx.socket.user, '' )
            assert( isValid( toUserId ), '无效的用户ID' )

            const toUser = await User.findOne( { _id: toUserId } )
            assert( toUser, '用户不存在' )
        }

        let messageContent = content

        if ( type === 'plain' ) {
            assert( messageContent.length <= 2048, '消息长度过长' )

            messageContent = xss( messageContent )
        } else if ( type === 'invite' ) {

        }

        let message

        try {
            message = await Message.create( {
                from: ctx.socket.user,
                to,
                type,
                content: messageContent
            } )
        } catch ( err ) {
            throw err
        }

        const fromUser = await User.findOne( { _id: ctx.socket.user }, { username: 1, avatar: 1 } )
        const messageData = {
            _id: message._id,
            createTime: message.createTime,
            from: fromUser.toObject(),
            to,
            type,
            content: messageContent
        }


        if ( toGroupId ) {
            ctx.socket.to( toGroupId ).emit( 'message', messageData )
        } else {
            const sockets = await Socket.find( { user: toUserId } )

            sockets.forEach( ( socket ) => {
                ctx._io.to( socket.id ).emit( 'message', messageData )
            } )

            const selfSockets = await Socket.find( { user: ctx.socket.user } )

            selfSockets.forEach( ( socket ) => {
                if ( socket.id !== ctx.socket.id ) {
                    ctx._io.to( socket.id ).emit( 'message', messageData )
                }
            } )
        }

        return responseSuccess( messageData )
    },

    async getContactsLastMessages ( ctx ) {
        const { contacts } = ctx.data
        assert( Array.isArray( contacts ), '参数 contacts 应该是 Array' )

        const promises = contacts.map( contactId =>
            Message
                .find(
                    { to: contactId },
                    { type: 1, content: 1, from: 1, createTime: 1 },
                    {
                        sort: { createTime: -1 },
                        limit: FIRST_TIME_MESSAGES_COUNT
                    }
                )
                .populate( 'from', { username: 1, avatar: 1 } )
        )

        const results = await Promise.all( promises )

        const messages = contacts.reduce( ( result, contactId, index ) => {
            result[contactId] = ( results[index] || [] ).reverse()

            return result
        }, {} )

        return responseSuccess( messages )
    },
    async getContactHistoryMessages ( ctx ) {
        const { contactId, existCount } = ctx.data

        const messages = await Message
            .find(
                { to: contactId },
                { type: 1, content: 1, from: 1, createTime: 1 },
                {
                    sort: { createTime: -1 },
                    limit: EACH_FETCH_MESSAGES_COUNT + existCount
                }
            )
            .populate( 'from', { username: 1, avatar: 1 }
            )

        const result = messages.slice( existCount ).reverse()

        return responseSuccess( result )
    }
}