var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  refresh_token: {type: String, default: '', required: '{PATH} is required!'},
  access_token: {type: String, default: '', required: '{PATH} is required!'},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: '{PATH} is required!'},
});

userSchema.statics.findByName = function (name, cb) {
  this.find({ name: new RegExp(name, 'i') }, cb);
};

module.exports = mongoose.model('User', userSchema);