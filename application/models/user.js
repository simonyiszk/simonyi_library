var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
basic - AuthSCH-s azonosító
displayName - név
sn - vezetéknév
givenName - keresztnév
mail - e-mail cím
niifPersonOrgID - neptun kód
linkedAccounts - kapcsolt accountok, kulcs - érték párokban:
  bme: szám@bme.hu
  schacc: schacc username
  vir: vir id (integer)
  virUid: vir username
eduPersonEntitlement - körtagságok
roomNumber - felhasználó szobaszáma (ha kollégista, akkor a kollégium neve és a szobaszám található meg benne, ha nem kollégista, akkor pedig null-t ad vissza). Amennyiben a felhasználó nem rendelkezik SCH Accounttal, szintén null-t ad eredményül.
mobile - mobilszám
*/


var userSchema = new Schema({
  internal_id: {type: String, default: '', required: '{PATH} is required!'},
  sn: {type: String, default: '', required: '{PATH} is required!'},
  given_name: {type: String, default: '', required: '{PATH} is required!'},
  name: {type: String, default: '', required: '{PATH} is required!'},
  email: {type: String, default: '', required: '{PATH} is required!'},
  basic: {type: String, default: ''},
  room_number: {type: String, default: ''},
  bme: {type: String, default: ''},
  schacc: {type: String, default: ''},
  vir: {type: String, default: ''},
  virUid: {type: String, default: ''},
  eduPersonEntitlement: {type: String, default: ''},
  mobile: {type: String, default: ''}
});

userSchema.statics.findByName = function (name, cb) {
  this.find({ name: new RegExp(name, 'i') }, cb);
};

module.exports = mongoose.model('User', userSchema);