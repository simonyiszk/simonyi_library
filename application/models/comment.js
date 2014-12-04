var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	book: {type: Schema.Types.ObjectId, ref: 'Book'},
	message: {type: String, default: '', required: true},
	date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', commentSchema);