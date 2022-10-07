const express = require("express");
const reviewModel = require("../models/reviews");

// GET ALL REVIEWS
const getReviews = (req, res) => {
  reviewModel
    .find({ bookId: req.params.id })
    .sort({ timestamp: -1 })
    .then((data) => {
      // console.log(data);
      res.send({ success: true, reviews: data });
    });
};

// SEND REVIEW
const sendReview = (req, res) => {
  const { username, name, review, bookId } = req.body;
  if (username?.trim() == "") {
    res.send({ success: false, message: "No Username Provided." });
  } else if (name?.trim() == "") {
    res.send({ success: false, message: "No Name Provided." });
  } else if (review?.trim() == "") {
    res.send({ success: false, message: "No Review Provided." });
  } else {
    const newReview = new reviewModel({
      bookId: bookId,
      review: review,
      username: req.userInfo.username,
      name: req.userInfo.name,
      timestamp: new Date(),
      comments: [],
    });
    console.log(req.userInfo);

    newReview.save().then((data) => {
      res.send({ success: true, message: "Review added." });
    });
  }
};

// GET ALL COMMENTS

// SEND COMMENT

// RATING

module.exports = {
  getReviews,
  sendReview,
};
