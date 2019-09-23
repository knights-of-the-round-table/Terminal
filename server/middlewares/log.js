/**
 * 请求日志
 */
module.exports = function () {
    return async ( ctx, next ) => {
        const { method, path } = ctx
        const before = Date.now();

        console.log( `\t<=\t[${method}] ${path}` );

        await next();

        console.log( `\t=>\t[${method}] ${path}  ${Date.now() - before}ms` );
    };
};