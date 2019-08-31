const { env } = process
const options = require( '../utils/command-options' )

module.exports = {
  port: env.Port || 4499,
  database: {
    uri: 'mongodb://127.0.0.1/remote',
    options: {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  },
  tokenExpiresTime: 7 * 24 * 60 * 60 * 1000,
  jwtSecret: 'jwtSecret'
};
