const chalk = require( 'chalk' )
const mongoose = require( 'mongoose' )

const app = require( './app' )
const config = require( './config/server' )

const Socket = require( './models/Socket' )

const getRandomAvatar = require( './utils/get-random-avatar' )

mongoose.connect( config.database.uri, config.database.options )

const db = mongoose.connection

db.once( 'open', async () => {
  console.log( chalk.green( 'Connection has been established successfully.' ) )

  app.listen( config.port, async () => {
    await Socket.deleteMany( {} )

    console.log( chalk.green( `  >>>  Server listen on http://localhost:${config.port}` ) )
  } )
} )

db.on( 'error', error => {
  console.error( chalk.red( 'Unable to connect to the database: ', error ) )

  mongoose.disconnect()

  process.exit( 1 )
} )

db.on( 'close', () => {
  console.log( chalk.green( 'Connection has been closed.' ) )
} )

module.exports = mongoose
