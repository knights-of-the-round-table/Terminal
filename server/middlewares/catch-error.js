const assert = require( 'assert' );

/**
 * 全局异常捕获
 */
module.exports = function () {
    return async ( ctx, next ) => {
        try {
            await next();
        } catch ( err ) {
            if ( err instanceof assert.AssertionError ) {
                ctx.send( err.message, false );

                return
            }

            ctx.status = 500
            ctx.send( `Server Error: ${err.message}`, false );
            console.error( ctx.event, 'Unhandled Error\n', err );
        }
    };
};