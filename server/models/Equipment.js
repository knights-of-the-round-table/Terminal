const { Schema, model } = require( 'mongoose' )

const EquipmentSchema = new Schema( {
  createTime: { type: Date, default: Date.now },
  name: String,
  remote: String,
  type: {
    type: String,
    enum: ['CentOS', 'MacOS', 'Windows', 'Linux'],
    default: 'CentOS'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  }
} )

const Message = model( 'Message', EquipmentSchema )

module.exports = Message

