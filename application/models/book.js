var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
	title: {type: String, default: ''},
	isbn: {type: String, default: ''},
	isdn: {type: String, default: ''},
	author: {type: String, default: ''},
	num: {type: Number, default: 0},
	out: {type: Number, default: 0},
	internal: {type: String, default: ''},
	category: {type: String, default: ''}
});

bookSchema.index({
	title: 1,
	author: 1
});

bookSchema.methods.findSimilarTypes = function(cb) {
	return this.model('Book').find({ category: this.category }, cb);
};

bookSchema.statics.findByTitle = function (title, cb) {
  this.find({ title: new RegExp(title, 'i') }, cb);
};

module.exports = mongoose.model('Book', bookSchema);