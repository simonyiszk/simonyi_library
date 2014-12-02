var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {type: String, default: '', required: '{PATH} is required!'},
});

userSchema.statics.findByName = function (name, cb) {
  this.find({ name: new RegExp(name, 'i') }, cb);
};

module.exports = mongoose.model('User', userSchema);