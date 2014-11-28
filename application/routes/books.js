var express = require('express');
var Book = require('../models/book');
var Lend = require('../models/lend');

var _list = express.Router();
var _bookById = express.Router();
var _addBook = express.Router();
var _lend = express.Router();

// GET all books
_list.get('/', function(req, res, next) {
  Book.find(function(err, results) {
    if (err) {
      console.log(err);
      res.send('Something bad happened!');
    } else {
      res.send(results);
    }
  });

});

// GET book by ID
_bookById.get('/', function(req, res, next) {
  Book.findOne(req.params.id, function(err, result) {
    res.send(result);
  });
});

// GET page where you can add book
_addBook.get('/', function(req, res) {
  res.render('addbook');
});

// POST new book to database
_addBook.post('/', function(req, res) {
  var book = new Book({
    title: req.body.title,
    isbn: req.body.isbn,
    author: req.body.author,
    pieces: req.body.pieces,
    out: req.body.out,
    internal: req.body.internal,
    category: req.body.category
  });

  book.save(function(err, book) {
    if (err) {
      res.send('Something bad happened!');
      console.log(err);
    } else {
      res.send('Book added successfully');
    }
  });
});

// GET book lend page
_lend.get('/', function(req, res, next) {
  console.log('User: ', req.user);

  Lend.find()
  .populate('user')
  .populate('book')
  .exec(function(err, results) {
    console.log(results);
  });

  res.render('addlend');
});


// POST a new lend
_lend.post('/', function(req, res, next) {
  console.log('User: ', req.user);

  var lend = new Lend({
    user: req.user._id,
    book: req.body.bookid,
    date_back: Date.now() + 14
  });

  lend.save(function(err, lend) {
    if(err) {
      res.send('Something bad happened');
      console.log(err);
    } else {
      res.send('Lend added successfully');
    }
  });
});

/* export the routers */
module.exports = {
  list: _list,
  bookById: _bookById,
  addBook: _addBook,
  lend: _lend
};
