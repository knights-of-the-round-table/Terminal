const assert = require( 'assert' )
const os = require( 'os' )
const pty = require( 'node-pty' )

const Socket = require( '../models/Socket' )

const { responseSuccess, responseError } = require( '../utils/response' )
const xss = require( '../utils/xss' )

shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

var ptyProcess = pty.spawn( shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
} );

ptyProcess.on( 'data', function ( data ) {
    console.log( '=====>' );
    console.log( data );
    process.stdout.write( data );
    console.log( '<=====' );
} );

ptyProcess.write( 'ls\r' )

module.exports = {
    async io ( ctx ) {
        const { type, input } = ctx.data
        assert( ctx.socket.user, '游客不能发送消息，请登录' )

        const output = input

        return responseSuccess( {
            output
        } )
    }
}