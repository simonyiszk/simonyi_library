var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lendSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	book: {type: Schema.Types.ObjectId, ref: 'Book'},
	date_out: {type: Date, default: Date.now},
	date_back: {type: Date, default: Date.now}
});

lendSchema.statics.findByUser = function (user, cb) {
  this.find({ user: new RegExp(user, 'i') }, cb);
};

lendSchema.statics.findByBook = function (book, cb) {
  this.find({ book: new RegExp(book, 'i') }, cb);
};

module.exports = mongoose.model('Lend', lendSchema);