const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const reviewsRouter = require("./routes/reviews");
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const app = express();
const port = 8888;

app.use(cors());

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/bookappdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ROUTES
app.use("/api/reviews", reviewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/categories", categoriesRouter);

app.listen(port, () => {
  console.log(`Server runs at port ${port}.`);
});
