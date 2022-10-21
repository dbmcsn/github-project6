const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: String,
  email: String,
  name: String,
  password: String,
  timestamp: Date,
});

module.exports = mongoose.model("users", usersSchema);
