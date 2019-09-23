function noop () { }

module.exports = function ( io, _io, routes ) {
    Object.keys( routes ).forEach( ( route ) => {
        io.on( route, noop ) // 注册事件
    } )

    return async ( ctx ) => {
        if ( routes[ctx.event] ) {
            const { event, data, socket } = ctx

            const res = await routes[ctx.event]( {
                event, // 事件
                data, // 请求数据
                socket, // 用户 socket 实例
                io, // koa-socket 实例
                _io // socket.io 实例
            } )

            if ( typeof res === 'string' ) {
                ctx.res = {
                    status: 'FAIL',
                    data: res
                }
            } else {
                ctx.res = {
                    status: 'OK',
                    data: res
                }
            }
        }
    };
};