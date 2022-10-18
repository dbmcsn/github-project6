const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
  bookId: String,
  review: String,
  username: String,
  name: String,
  timestamp: Date,
  comments: [
    {
      username: String,
      name: String,
      comment: String,
      timestamp: Date,
    },
  ],
});

module.exports = mongoose.model("reviews", reviewsSchema);
