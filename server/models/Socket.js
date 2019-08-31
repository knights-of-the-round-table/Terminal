const { Schema, model } = require( 'mongoose' )

const SocketSchema = new Schema( {
  createTime: {
    type: Date,
    default: Date.now
  },

  id: {
    type: String,
    unique: true,
    index: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  ip: {
    type: String
  },
  browser: {
    type: String,
    default: ''
  },
  environment: {
    type: String,
    default: ''
  }
} )

const Socket = model( 'Socket', SocketSchema )

module.exports = Socket