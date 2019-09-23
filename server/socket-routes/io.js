const assert = require( 'assert' )
const os = require( 'os' )
const pty = require( 'node-pty' )

const Socket = require( '../models/Socket' )

const xss = require( '../utils/xss' )

shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

module.exports = {
    async connect ( ctx ) {
        const { type, i } = ctx.data

        const ptyProcess = pty.spawn( shell, [], {
            name: 'xterm-color',
            cols: 80,
            rows: 30,
            cwd: process.env.HOME,
            env: process.env
        } );

        ctx.socket.id.on( 'input', ( data ) => {
            ptyProcess.write( data )
        } )

        ptyProcess.on( 'data', function ( data ) {
            ctx._io.to( ctx.socket.id ).emit( 'output', data )
        } );

        ctx._io.to( ctx.socket.id ).emit( 'output', 'success' )

        return {
            msg: 'Success'
        }
    }
}