import socket from './socket'

/**
 * 请求数据
 * @param {String} event 事件名称（api）
 * @param {Object} data  表单数据
 * 
 * [ErrorData, SuccessData] 
 */
export default function fetch ( event, data = {} ) {
    return new Promise( resolve => {
        socket.emit( event, data, ( { status, data } ) => {
            if ( status === 'OK' ) {
                resolve( [null, data] )
            } else {
                resolve( [data, null] )
            }
        } )
    } )
}