const Router = require( 'koa-router' )
const assert = require( 'assert' )

const Equipment = require( '../models/Equipment' )

const config = require( '../config/server' )

const router = new Router( {
    prefix: '/api/equipment'
} )


router.post( '/create', async ( ctx, next ) => {
    const { name, remote, type } = ctx.params
    assert( name, '名称不能为空' )
    assert( remote, '地址不能为空' )
    assert( type, '类型不能为空' )

    const equipment = await Equipment.findOne( { name } )
    assert( !equipment, '该用户名已存在' )

    let newEquipment = null

    try {
        newEquipment = await Equipment.create( {
            name,
            remote,
            type
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

router.post( '/list', async ( ctx, next ) => {
    const { page = 1, pageSize = 10 } = ctx.request.body

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