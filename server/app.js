const Koa = require( 'koa' )
const Router = require( 'koa-router' );
const IO = require( 'koa-socket-2' )
const koaSend = require( 'koa-send' )
const koaStatic = require( 'koa-static' )
const path = require( 'path' )

// Models
const Socket = require( './models/Socket' )

// Middlewares
const catchError = require( './middlewares/catch-error' )
const enhanceContext = require( './middlewares/enhance-context' )
const frequency = require( './middlewares/frequency' )
const isLogin = require( './middlewares/is-login' )
const log = require( './middlewares/log' )
const route = require( './middlewares/route' )

// Routes
const routes = require( './routes' )

const app = new Koa()
const router = new Router()
const io = new IO( {
  ioOptions: {
    pingTimeout: 10000,
    pingInterval: 5000
  }
} )

router
  .get( '/api/auth/token', ( ctx, next ) => {
    ctx.body = 'Hello World!';
  } )

// 静态文件访问
app.use( koaStatic(
  path.join( __dirname, '../public' ),
  {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    gzip: true
  }
) )

app
  .use( router.routes() )
  .use( router.allowedMethods() );

// 注入应用
io.attach( app )

// 中间件
io.use( enhanceContext() );
io.use( log() );
io.use( catchError() );
io.use( frequency() );
io.use( isLogin() );
io.use( route(
  app.io,
  app._io,
  routes
) )

app.io.on( 'connection', async ( ctx ) => {
  const { socket } = ctx
  const id = socket.id
  const ip = socket.request.connection.remoteAddress

  console.log( `  <<<< connection ${id} ${ip}` );
  await Socket.create( {
    id,
    ip
  } );

  socket.on( 'disconnect', async () => {
    console.log( `  >>>> disconnect ${id}` );
    await Socket.deleteOne( {
      id
    } );
  } );
} );


module.exports = app