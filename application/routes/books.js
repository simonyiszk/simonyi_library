var express = require('express');
var Book = require('../models/book');

var _list = express.Router();
var _id = express.Router();
var _newBook = express.Router();

// GET all books
_list.post('/:limit', function(req, res, next) {
  Book.find()
  .limit(req.params.limit)
  .exec(function(err, results) {
    if (err) {
      console.log(err);
      res.send('Something bad happened!');
    } else {
      res.send(results);
    }
  });
});

// GET book page
_id.get('/', function (req, res, ext) {
     res.render('book');
});

// POST book by id
_id.post('/:id', function(req, res, next) {
    Book.findOne({_id: req.params.id}, function(err, result) {
        res.send(result);
    });
});

// GET page where you can add book
_newBook.get('/', function(req, res) {
  res.render('addbook');
});

// POST new book to database
_newBook.post('/', function(req, res) {

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

/* export the routers */
module.exports = {
  list: _list,
  id: _id,
  newBook: _newBook,
};
