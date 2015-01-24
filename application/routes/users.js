var express = require('express');
var validator = require('express-validator');

var _profile = express.Router();
var _id = express.Router();

var User = require('../models/user');

/* GET user profile page */
_profile.get('/', function(req, res) {
  res.render('profile');
});

/* POST user profile */
_profile.post('/', function(req, res) {
    res.send(req.user);
});

/* POST user by ID
 *
 * params: id
 */
_id.post('/:id', function(req, res) {
  User.findOne({_id: req.params.id}, function(err, result) {
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
