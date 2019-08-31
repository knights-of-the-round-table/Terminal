const { Schema, model } = require( 'mongoose' )

const FriendSchema = new Schema( {
  createTime: { type: Date, default: Date.now },

  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
} )

const Friend = model( 'Friend', FriendSchema )

module.exports = Friend
