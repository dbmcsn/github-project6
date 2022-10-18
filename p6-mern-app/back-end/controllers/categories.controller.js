const express = require("express");
const categoriesModel = require("../models/categories");
const reviewModel = require("../models/reviews");

// GET ALL CATEGORIES
const getAllCategory = (req, res) => {
  categoriesModel.find().then((data) => {
    res.send({ success: true, categories: data });
  });
};

// GET BOOKS PER CATEGORY
const getBooksPerCategory = (req, res) => {
  categoriesModel.findOne({ _id: req.params.categoryid }).then((data) => {
    res.send({ success: true, books: data.bookCollection });
  });
};

// GET BOOK DETAILS
const getBookDetails = (req, res) => {
  categoriesModel
    .findOne({ "bookCollection.bookId": req.params.bookid })
    .then((data) => {
      const bookDetails = data.bookCollection.filter((book) => {
        if (book.bookId == req.params.bookid) {
          return book;
        }
      });
      res.send({ success: true, bookDetails: bookDetails });
    });
};

// SEARCH
const getSearch = (req, res) => {
  try {
    const searchStr = req.body.search.toLowerCase();
    categoriesModel
      .find({
        $or: [
          { "bookCollection.title": { $regex: searchStr, $options: "i" } },
          { "bookCollection.author": { $regex: searchStr, $options: "i" } },
        ],
      })
      .then((data) => {
        const filteredBookCollection = data.map((category) => {
          const collection = category.bookCollection.filter((book) => {
            if (
              book.title.toLowerCase().search(searchStr) >= 0 ||
              book.author.toLowerCase().search(searchStr) >= 0
            ) {
              return true;
            }
            return false;
          });
          category.bookCollection = collection;
          return category;
        });
        const books = [];

        filteredBookCollection.map((category) => {
          books.push(...category.bookCollection);
        });
        res.send({ success: true, books: books });
      });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
};

// RECOM books
const getRecomBooks = (req, res) => {
  const found = [];

  reviewModel.find().then((data) => {
    const bookIds = data.map((data) => data.bookId);

    let bookCollection = [];

    categoriesModel.find().then((categories) => {
      categories.forEach((category) => {
        bookCollection.push(...category.bookCollection);
      });

      bookCollection.forEach((book) => {
        if (bookIds.includes(book.bookId)) {
          found.push(book);
        }
      });
      res.send({ success: true, data: found });
    });
  });
};

module.exports = {
  getAllCategory,
  getBooksPerCategory,
  getBookDetails,
  getSearch,
  getRecomBooks,
};
