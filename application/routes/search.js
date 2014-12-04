var express = require('express');
var Book = require('../models/book');
var User = require('../models/user');

var search = express.Router();

/* GET home page. */
search.get('/:term', function(req, res, next) {

  var _books = null;
  var _authors = null;
  var _users = null;

  var searchTerm = req.params.term.replace(/[aeiáéíouűúőóüö]/g,'.');

  Book.find({title: new RegExp('.*' + searchTerm + '.*', 'i')}, function(err, books) {
    if (err) {
      console.log(err);
    }

    console.log('searching in books');
    _books = books;
    complete();
  });

  Book.find({author: new RegExp('.*' + searchTerm + '.*', 'i')}, function(err, authors) {
    if (err) {
      console.log(err);
    }

    console.log('searching in authors');
    _authors = authors;
    complete();
  });

  User.find({name: new RegExp('.*' + searchTerm + '.*', 'i')}, function(err, users) {
    if (err) {
      console.log(err);
    }
    
    console.log('searching in users');
    _users = users;
    complete();
  });

  /* if you don't want to create a promise it is the easy way of doing things */
  function complete() {
   if (_books !== null && _authors !== null && _users !== null) {
     res.send({
      books: _books,
      authors: _authors,
      users: _users
     });
   }
  }

});

module.exports = search;
