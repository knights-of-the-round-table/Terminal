/**
 * 拦截未登录请求
 */
module.exports = function () {
    const noUseLoginEvent = {
        '/api/auth/login': true,
        '/api/auth/register': true,
    };

    return async ( ctx, next ) => {
        if ( !noUseLoginEvent[ctx.path] ) {
            ctx.status = 403
            ctx.send( '请登录后再试', false )

            return;
        }

        await next();
    };
};