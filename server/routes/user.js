const assert = require( 'assert' )
const bcrypt = require( 'bcryptjs' )
const jwt = require( 'jwt-simple' )

const User = require( '../models/User' )
const Socket = require( '../models/Socket' )

const config = require( '../config/server' )
const getRandomAvatar = require( '../utils/get-random-avatar' )
const { responseError, responseSuccess } = require( '../utils/response' )

const saltRounds = 10

/**
 * 生成 token
 * @param {User} user 用户
 * @param {Object} environment 客户端信息
 */
function generatorToken ( user, environment ) {
    return jwt.encode( {
        user,
        environment,
        expires: Date.now() + config.tokenExpiresTime
    }, config.jwtSecret )
}

module.exports = {
    async register ( ctx ) {
        const { username, password, os, browser, environment } = ctx.data
        assert( username, '用户名不能为空' )
        assert( password, '密码不能为空' )

        const user = await User.findOne( { username } )
        assert( !user, '该用户名已存在' )

        const salt = await bcrypt.genSaltSync( saltRounds )
        const hash = await bcrypt.hashSync( password, salt )

        let newUser = null

        try {
            newUser = await User.create( {
                username,
                salt,
                password: hash,
                avatar: getRandomAvatar()
            } )
        } catch ( err ) {
            if ( err.name === 'ValidationError' ) {
                return '用户名包含不支持的字符或者长度超过限制'
            }

            throw err
        }

        const { _id, avatar } = newUser
        const token = generatorToken( _id, environment )

        ctx.socket.user = _id
        await Socket.updateOne( { id: ctx.socket.id }, {
            user: _id,
            os,
            browser,
            environment
        } )

        return responseSuccess( {
            _id,
            avatar,
            username,
            token,
            expires: config.tokenExpiresTime
        } )
    },

    async login ( ctx ) {
        assert( !ctx.socket.user, '你已经登录了' )

        const { username, password, os, browser, environment } = ctx.data
        assert( username, '用户名不能为空' )
        assert( password, '密码不能为空' )

        const user = await User.findOne( { username } )
        assert( user, '该用户不存在' )

        const isPasswordCorrect = bcrypt.compareSync( password, user.password )
        assert( isPasswordCorrect, '密码错误' )

        user.lastLoginTime = Date.now()
        await user.save()

        const { _id, avatar } = user
        const token = generatorToken( user._id, environment )

        ctx.socket.user = _id
        await Socket.updateOne( { id: ctx.socket.id }, {
            user: _id,
            os,
            browser,
            environment
        } )

        return responseSuccess( {
            _id,
            avatar,
            username,
            token,
            expires: config.tokenExpiresTime
        } )
    },

    async loginByToken ( ctx ) {
        assert( !ctx.socket.user, '你已经登录了' )

        const { token, os, browser, environment } = ctx.data
        assert( token, 'token 不能为空' )

        let payload = null

        try {
            payload = jwt.decode( token, config.jwtSecret )
        } catch ( err ) {
            return responseError( '非法 token' )
        }

        assert( Date.now() < payload.expires, 'token 已过期' )
        assert.equal( environment, payload.environment, '非法登录' )

        const user = await User.findOne( { _id: payload.user }, { _id: 1, avatar: 1, username: 1, createTime: 1 } )
        assert( user, '用户不存在' )

        user.lastLoginTime = Date.now()
        await user.save()

        const { _id, username, avatar } = user

        ctx.socket.user = _id
        await Socket.updateOne( { id: ctx.socket.id }, {
            user: _id,
            os,
            browser,
            environment
        } )

        return responseSuccess( {
            _id,
            avatar,
            username
        } )
    },

    async changePassword ( ctx ) {
        const { oldPassword, password } = ctx.data
        assert( password, '新密码不能为空' )

        const user = await User.findOne( { _id: ctx.socket.user } )
        const isPasswordCorrect = bcrypt.compareSync( oldPassword, user.password )
        assert( isPasswordCorrect, '旧密码不正确' )

        const salt = await bcrypt.genSaltSync( saltRounds )
        const hash = await bcrypt.hashSync( password, salt )

        user.password = password
        await user.save()

        return responseSuccess( {
            status: 'OK',
            data: {
                msg: 'OK'
            }
        } )
    },

    async changeUsername ( ctx ) {
        const { username } = ctx.data
        assert( username, '新用户名不能为空' )

        const user = await User.findOne( { username } )
        assert( !user, '该用户名已存在，换一个试试吧' )

        const self = await User.findOne( { _id: ctx.socket.user } )

        self.username = username
        await username.save()

        return responseSuccess( {
            status: 'OK',
            data: {
                msg: 'OK'
            }
        } )
    },

    async changeAvatar ( ctx ) {
        const { avatar } = ctx.data
        assert( avatar, '头像不能为空' )

        await User.updateOne( {
            _id: ctx.socket.user
        }, {
                avatar
            } )

        return responseSuccess( avatar )
    }
}