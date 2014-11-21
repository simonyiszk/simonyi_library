var express = require('express');
var Book = require('../models/book');

var _list = express.Router();
var _bookById = express.Router();
var _addBook = express.Router();

/* GET books */
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

/* GET book by ID
 *
 * params: id
 */
_bookById.get('/', function(req, res, next) {
  Book.findOne(req.params.id, function(err, result) {
    res.send(result);
  });
});

_addBook.get('/', function(req, res) {
  res.render('addbook');
});

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

/* export the routers */
module.exports = {
  list: _list,
  bookById: _bookById,
  addBook: _addBook
};
