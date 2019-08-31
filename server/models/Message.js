const { Schema, model } = require( 'mongoose' )

const MessageSchema = new Schema( {
  createTime: { type: Date, default: Date.now },

  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  to: {
    type: String,
    index: true
  },
  type: {
    type: String,
    enum: ['plain', 'image', 'emoji', 'code', 'invite'],
    default: 'plain'
  },
  content: {
    type: String,
    default: ''
  }
} )

const Message = model( 'Message', MessageSchema )

module.exports = Message

