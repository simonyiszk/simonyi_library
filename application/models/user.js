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
  basic: {type: String, default: ''},
  sn: {type: String, default: ''},
  given_name: {type: String, default: ''},
  name: {type: String, default: ''},
  email: {type: String, default: ''},
  room_number: {type: String, default: ''},
  access_token: {type: String, default: ''},
  refresh_token: {type: String, default: ''}
});

userSchema.statics.findByName = function (name, cb) {
  this.find({ name: new RegExp(name, 'i') }, cb);
};

module.exports = mongoose.model('User', userSchema);