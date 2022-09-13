const express = require("express");
const fs = require("fs");
const myFunc = require("../helper/functions");

const getCartItems = (req, res) => {
  fs.readFile("./routes/data.json", (err, data) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(JSON.parse(data.cart));
    }
  });
};

const addItemToCart = (req, res) => {
  try {
    const addItem = req.body;
    console.log(addItem);

    const data = fs.readFileSync("./routes/data.json");

    const parseData = JSON.parse(data);

    const cartItems = parseData.cart;

    const cartCopy = [...cartItems];
    let updatedCart = [];
    const targetItem = cartCopy.filter((item) => item.id === addItem.id);

    if (targetItem.length > 0) {
      updatedCart = cartCopy.map((item) => {
        if (item.id === addItem.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      updatedCart = [...cartCopy, { ...addItem, quantity: 1 }];
    }

    const newCartData = { ...parseData, cart: updatedCart };

    myFunc.writeFile(
      res,
      "./routes/data.json",
      newCartData,
      "Item added to cart."
    );
  } catch (e) {
    res.send(e.message);
  }
};

const deleteItem = (req, res) => {
  try {
    const targetId = req.params.id;

    const data = fs.readFileSync("./routes/data.json");
    const parseData = JSON.parse(data);
    const cart = parseData.cart;

    const newCartItems = cart.filter((cartItem) => cartItem.id != targetId);
    const newData = { ...parseData, cart: newCartItems };

    myFunc.writeFile(res, "./routes/data.json", newData, "Cart Item Deleted.");
  } catch (e) {
    res.send(e.message);
  }
};

const updatedItemQuantity = (req, res) => {
  const targetId = req.params.id;

  const data = fs.readFileSync("./routes/data.json");
  const parseData = JSON.parse(data);
  const cart = parseData.cart;
  const buttonQuantity = req.body;

  const decItemQuantity = cartItems.map((item) => {
    if (item.id == targetId) {
      item = {
        quantity: item.quantity - 1,
      };
    }
    return item;
  });

  const incItemQuantity = cartItems.map((item) => {
    if (item.id == targetId) {
      item = {
        quantity: item.quantity + 1,
      };
    }
    return item;
  });
};

module.exports = {
  getCartItems,
  addItemToCart,
  deleteItem,
  updatedItemQuantity,
};
