const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
  username: String,
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
}, {
  timestamps: true
});



module.exports = mongoose.model('Friend', friendSchema);
