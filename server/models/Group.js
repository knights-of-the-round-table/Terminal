const { Schema, model } = require( 'mongoose' )

const GroupSchema = new Schema( {
  createTime: {
    type: Date,
    default: Date.now
  },

  name: {
    type: String,
    trim: true,
    unique: true,
    match: /^([0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]){1,8}$/,
    index: true
  },
  avatar: {
    type: String
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
} )

const Group = model( 'Group', GroupSchema )

module.exports = Group
