const assert = require( 'assert' );
const { responseError } = require( '../utils/response' )

/**
 * 全局异常捕获
 */
module.exports = function () {
    return async ( ctx, next ) => {
        try {
            await next();
        } catch ( err ) {
            if ( err instanceof assert.AssertionError ) {
                ctx.res = responseError( err.message );
                return
            }
            ctx.res = responseError( `Server Error: ${err.message}` );
            console.error( ctx.event, 'Unhandled Error\n', err );
        }
    };
};