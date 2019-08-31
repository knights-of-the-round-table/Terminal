const MaxCallPerMinutes = 20;
/**
 * Limiting the frequency of interface calls
 */
module.exports = function () {
    let callTimes = {};
    setInterval( () => callTimes = {}, 60000 ); // Emptying every 60 seconds

    return async ( ctx, next ) => {
        const socketId = ctx.socket.id;
        const count = callTimes[socketId] || 0;

        // 普通用户限制
        if ( count > MaxCallPerMinutes ) {
            return ctx.res = '接口调用频繁, 请稍后再试';
        }
        callTimes[socketId] = count + 1;
        await next();
    };
};
