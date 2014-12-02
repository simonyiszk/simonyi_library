var express = require('express');
var validator = require('express-validator');

var _profile = express.Router();
var _id = express.Router();

var User = require('../models/user');

/* GET user profile. */
_profile.get('/', function(req, res) {
  res.send(req.user);
});

/* GET user by ID 
 *
 * params: id
 */
_id.get('/', function(req, res) {
  User.findOne(req.params.id, function(err, result) {
    if (err)
      console.log(err);

    res.send(result);
  });
});

/* export the routers */
module.exports = {
  profile: _profile,
  id: _id
};
