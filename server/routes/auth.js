const Router = require( 'koa-router' )
const assert = require( 'assert' )
const bcrypt = require( 'bcryptjs' )
const jwt = require( 'jwt-simple' )

const User = require( '../models/User' )

const config = require( '../config/server' )
const getRandomAvatar = require( '../utils/get-random-avatar' )

const saltRounds = 10
const router = new Router( {
    prefix: '/api/auth'
} )

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

router.post( '/register', async ( ctx, next ) => {
    console.log( ctx.params, ctx.query )
    const { username, password, os, browser, environment } = ctx.params
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

    ctx.send( {
        _id,
        avatar,
        username,
        token,
        expires: config.tokenExpiresTime
    } )
} )

router.post( '/login', async ( ctx, next ) => {
    const { username, password, os, browser, environment } = ctx.request.body
    assert( username, '用户名不能为空' )
    assert( password, '密码不能为空' )

    const user = await User.findOne( { username } )
    assert( user, '该用户名不存在' )

    const isPasswordCorrect = bcrypt.compareSync( password, user.password )
    assert( isPasswordCorrect, '密码错误' )

    user.lastLoginTime = Date.now()
    await user.save()

    const { _id, avatar } = user
    const token = generatorToken( _id, environment )

    ctx.send( {
        _id,
        avatar,
        username,
        token,
        expires: config.tokenExpiresTime
    } )
} )

module.exports = router