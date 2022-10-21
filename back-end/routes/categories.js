const express = require("express");
const router = express.Router();
const categories = require("../controllers/categories.controller");

router.get("/", categories.getAllCategory);
router.get("/recommended-books", categories.getRecomBooks);
router.post("/search", categories.getSearch);
router.get("/book/:bookid", categories.getBookDetails);
router.get("/:categoryid", categories.getBooksPerCategory);

module.exports = router;
