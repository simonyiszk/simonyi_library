var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  name: {type: String, default: ''},
  book: {type: Schema.Types.ObjectId, ref: 'Book'}
});

module.exports = mongoose.model('Tag', tagSchema);