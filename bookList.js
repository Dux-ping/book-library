const createError = require("http-errors");

let booklist = [];
let idnumber = 0;

exports.index = function (req, res) {
  res.send(booklist);
};

exports.create = function (req, res, next) {
  if (!req.body.name) {
    return next(createError(400, "title is required"));
  }
  if (!req.body.name) {
    return next(createError(400, "author is required"));
  }
  booklist.push({
    id: idnumber,
    title: req.body.name,
    author: req.body.name,
    read: req.body.name,
  });
  res.send({ result: true });
  idnumber++;
};
exports.show = function (req, res, next) {
  const bookitem = booklist.find((book) => book.id == req.params.id);
  if (!bookitem) {
    return next(createError(404, "no book with that id"));
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

exports.update = function (req, res, next) {
  const bookitem = booklist.find((book) => book.id == req.params.id);
  if (!req.body.name) {
    return next(createError(400, "title is required"));
  }
  if (!req.body.name) {
    return next(createError(400, "author is required"));
  }
  if (!bookitem) {
    return next(createError(404, "no book with that id"));
  }
  booklist = booklist.map((book) => {
    if (book.id == req.params.id) {
      book.title = req.body.title;
      book.author = req.body.author;
      book.read = req.body.read;
    }
    return book;
  });
  res.send({ result: true });
};
