var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favouriteSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	book: {type: Schema.Types.ObjectId, ref: 'Book'},
});

module.exports = mongoose.model('Favourite', favouriteSchema);