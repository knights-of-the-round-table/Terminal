const Koa = require( 'koa' )
const bodyParser = require( 'koa-bodyparser' )
const IO = require( 'koa-socket-2' )
const koaSend = require( 'koa-send' )
const koaStatic = require( 'koa-static' )
const path = require( 'path' )

// Models
const Socket = require( './models/Socket' )

// Middlewares
const catchError = require( './middlewares/catch-error' )
const enhanceContext = require( './middlewares/enhance-context' )
const isLogin = require( './middlewares/is-login' )
const log = require( './middlewares/log' )
const socketEnhanceContext = require( './middlewares/socket-enhance-context' )
const socketRoute = require( './middlewares/socket-route' )

// Routes
const routes = require( './routes' )
const socketRoutes = require( './socket-routes' )

const app = new Koa()
const io = new IO( {
  ioOptions: {
    pingTimeout: 10000,
    pingInterval: 5000
  }
} )

app.use( bodyParser() )

// 静态文件访问
app.use( koaStatic(
  path.join( __dirname, '../public' ),
  {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    gzip: true
  }
) )

// 中间件
app.use( enhanceContext() );
app.use( log() );
// app.use( isLogin() );
app.use( catchError() );

// Routes
app.use( routes() )


// 注入 Socket
io.attach( app )

// 中间件
io.use( socketEnhanceContext() );
io.use( socketRoute(
  app.io,
  app._io,
  socketRoutes
) )

app.io.on( 'connection', async ( ctx ) => {
  const { socket } = ctx

  const id = socket.id
  const query = socket.handshake.query
  const ip = socket.request.connection.remoteAddress

  console.log( `  <<<< connection ${id} ${ip}`, query )
  await Socket.create( {
    id,
    ip
  } )

  socket.on( 'disconnect', async () => {
    console.log( `  >>>> disconnect ${id}` );
    await Socket.deleteOne( {
      id
    } )
  } )
} )


module.exports = app