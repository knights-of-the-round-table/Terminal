/**
 * JSON 返回
 */
module.exports = function () {
    function render ( data, success = true ) {
        this.set( 'Content-Type', 'application/json' )
        this.body = JSON.stringify( {
            status: success ? 'OK' : 'FAIL',
            data
        } )
    }

    return async ( ctx, next ) => {
        ctx.send = render.bind( ctx )

        await next()
    }
};