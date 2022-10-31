const express = require("express");
const router = express.Router();
const books = require("./bookList");

// start page book
router.get("/book", books.index); // list of books
router.post("/book/create", books.create);
router.get("/book/:id", books.show);
router.delete("/book/:id", books.delete);
router.put("/book/:id", books.update);
router.delete("/deleteBooks", books.deleteBooks);

module.exports = router;
