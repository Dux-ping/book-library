const createError = require("http-errors");
const { ObjectId } = require("mongodb");

const { Book } = require("./books");

// Find BOOKS
exports.index = async function (req, res) {
  let books = await Book.find();
  res.send(books);
};

// Create
exports.create = async function (req, res, next) {
  if (!req.body.title || !req.body.author) {
    return next(createError(400, "title and author is required"));
  }
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
  });
  await book.save();
  res.send(book);
};

// Show
exports.show = async function (req, res, next) {
  const book = await Book.findOne({ _id: ObjectId(req.params.id) });
  if (book) {
    return res.send(book);
  }
  return next(createError(404, "no book with that id"));
};

// Title
exports.title = async function (req, res, next) {
  const book = await Book.findOne({ _id: ObjectId(req.params.id) });
  if (book) {
    return res.send(book);
  }
  return next(createError(404, "no book with that title"));
};

// Delete
exports.delete = async function (req, res, next) {
  let status = await Book.deleteOne({ _id: ObjectId(req.params.id) });
  if (status.deletedCount) {
    return res.send({ result: true });
  }
  return next(createError(404, "no book with that id"));
};

// 3. The ability to remove all books from the list.
exports.deleteBooks = async function (req, res, next) {
  res.send({ result: true });
};

exports.update = async function (req, res, next) {
  if (!req.body.title && !req.body.author) {
    return next(createError(400, "title and author is required"));
  }
  let update = await Book.findOne({ _id: ObjectId(req.params.id) });
  if (update) {
    update.title = req.body.title || update.title;
    update.author = req.body.author || update.author;

    await update.save();
    return res.send(update);
  }
  return next(createError(404, "no book with that id"));
};
