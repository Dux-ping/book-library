const { request } = require("express");
const createError = require("http-errors");

let booklist = [];
let idnumber = 0;

exports.index = function (req, res) {
  res.send(booklist);
};

exports.create = function (req, res, next) {
  if (!req.body.title) {
    return next(createError(400, "title is required"));
  }
  if (!req.body.author) {
    return next(createError(400, "author is required"));
  }
  // READ
  if (req.body.read !== true && req.body.read !== false) {
    return next(createError(400, "(true/false) read is required"));
  }
  booklist.push({
    id: idnumber,
    title: req.body.title,
    author: req.body.author,
    read: req.body.read,
  });

  res.send({ result: true });
  idnumber++;
};

exports.show = function (req, res, next) {
  const bookitem = booklist.find((book) => book.id == req.params.id);
  if (!bookitem) {
    return next(createError(404, "no book with that id"));
  }
  if (!bookitem) {
    return next(createError(404, "no book with that title"));
  }

  res.send(bookitem);
};

exports.title = function (req, res, next) {
  console.log(req.params.title);
  const bookitem = booklist.find((book) => book.title == req.params.title);
  if (!bookitem) {
    return next(createError(404, "no book with that title"));
  }
  res.send(bookitem);
};

exports.delete = function (req, res, next) {
  const bookitem = booklist.find((book) => book.id == req.params.id);
  if (!bookitem) {
    return next(createError(404, "no book with that id"));
  }
  booklist = booklist.filter((book) => book.id != req.params.id);
  res.send({ result: true });
};

// 3. The ability to remove all books from the list.
exports.deleteBooks = function (req, res, next) {
  booklist = [];
  res.send({ result: true });
};

exports.update = function (req, res, next) {
  const bookitem = booklist.find((book) => book.id == req.params.id);
  if (!req.body.title) {
    return next(createError(400, "title is required"));
  }
  if (!req.body.author) {
    return next(createError(400, "author is required"));
  }
  if (!bookitem) {
    return next(createError(404, "no book with that id"));
  }
  booklist = booklist.map((book) => {
    if (book.id == req.params.id) {
      book.title = req.body.title;
      book.author = req.body.author;
    }
    return book;
  });
  res.send({ result: true });
};
