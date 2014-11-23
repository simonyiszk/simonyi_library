var express = require('express');
var _profile = express.Router();
var _userById = express.Router();

var User = require('../models/user');

/* GET user. */
_profile.get('/', function(req, res) {
  res.send('respond with a resource');
});

/* GET user by ID 
 *
 * params: id
 *
 */
_userById.get('/', function(req, res) {
  User.findOne(req.params.id, function(err, result) {
    res.send(result);
  });
});

/* export the routers */
module.exports = {
  profile: _profile,
  userById: _userById
};
