var express = require('express');
var _profile = express.Router();
var _userById = express.Router();

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
	res.send('respond with a resource');
});

/* export the routers */
module.exports = {
	profile: _profile,
	userById: _userById
};
