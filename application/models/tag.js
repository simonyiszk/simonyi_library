var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  name: {type: String, default: ''}
});

module.exports = mongoose.model('Tag', tagSchema);