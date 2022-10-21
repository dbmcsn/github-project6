const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  categoryName: String,
  bookCollection: [
    {
      bookId: String,
      title: String,
      author: String,
      summary: String,
      imagePath: String,
    },
  ],
});

module.exports = mongoose.model("categories", categoriesSchema);
