var express = require('express');
var Book = require('../models/book');
var Lend = require('../models/lend');

var _newLend = express.Router();
var _list = express.Router();
var _id = express.Router();
var _user = express.Router();

// GET all lends
_list.get('/:limit', function(req, res, next) {
  Lend.find()
  .populate('user')
  .populate('book')
  .limit(req.params.limit)
  .exec(function(err, results) {
    res.send(results);
  });
});

// GET lends by user
_user.get('/:id', function(req, res, next) {
  Lend.find()
  .populate('user')
  .populate('book')
  .where('user.id').equals(req.params.id)
  .exec(function(err, results) {
    res.send(results);
  });
});

// GET lend by ID
_id.get('/:id', function(req, res, next) {
  Lend.findOne({_id: req.params.id})
  .populate('user')
  .populate('book')
  .exec(function(err, result) {
    res.send(result);
  });
});

// GET book lend page
_newLend.get('/', function(req, res, next) {
  res.render('addlend');
});

// POST a new lend
_newLend.post('/', function(req, res, next) {

  if (errors) {
    res.status(400).send(errors);
    return;
  }

  var date = new Date();
  var lend = new Lend({
    user: req.user._id,
    book: req.body.bookid,
    date_back: date.setDate(date.getDate() + 12) // 12 days
  });

  lend.save(function(err, lend) {
    if(err) {
      res.send('Something bad happened');
    } else {
      res.send('Lend added successfully');
    }
  });
});

/* export the routers */
module.exports = {
  list: _list,
  user: _user,
  id: _id,
  newLend: _newLend
};
