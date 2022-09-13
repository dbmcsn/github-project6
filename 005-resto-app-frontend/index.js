const express = require("express");
const cors = require("cors");
const itemRouter = require("./routes/items");
const cartRouter = require("./routes/cart");
const app = express();
const port = 8888;


app.use ( cors() );

app.use ( express.json() );

// ROUTES

app.use ("/api/item", itemRouter);

app.use ("/api/cart", cartRouter);

app.listen (port, () => {
    console.log(`Server running at port ${port}.`)
})

