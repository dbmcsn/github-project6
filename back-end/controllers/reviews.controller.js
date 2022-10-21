const express = require("express");
const reviewModel = require("../models/reviews");

// GET ALL REVIEWS
const getReviews = (req, res) => {
  reviewModel
    .find({ bookId: req.params.id })
    .sort({ timestamp: -1 })
    .then((data) => {
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

    newReview.save().then((data) => {
      res.send({ success: true, message: "Review added." });
    });
  }
};

// GET ALL COMMENTS
const getComment = (req, res) => {
  reviewModel
    .find({ comments: comments })
    .sort({ timestamp: -1 })
    .then((data) => {
      res.send({ success: true, reviews: data });
    });
};

// SEND COMMENT
const sendComment = (req, res) => {
  const { reviewId, comment, name, username } = req.body;
  if (username?.trim() == "") {
    res.send({ success: false, message: "No Username Provided." });
  } else if (name?.trim() == "") {
    res.send({ success: false, message: "No Name Provided." });
  } else if (comment?.trim() == "") {
    res.send({ success: false, message: "No Comment Provided." });
  } else if (reviewId?.trim() == "") {
    res.send({ success: false, message: "No Review ID Provided." });
  } else {
    reviewModel.findOne({ _id: reviewId }).then((data) => {
      if (data) {
        const newData = data;
        newData.comments.push({
          username: req.body.username,
          name: req.body.name,
          comment: req.body.comment,
          timestamp: new Date(),
        });
        Object.assign(data, newData);
        data.save();
        res.send({ success: true, message: "Comment Added" });
      }
    });
  }
};

module.exports = {
  getReviews,
  sendReview,
  getComment,
  sendComment,
};
