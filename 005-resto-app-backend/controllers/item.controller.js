const { response } = require("express");
const fs = require("fs");
const myFunc = require("../helper/functions");

const getItems = (req, res) => {
  try {
    const data = fs.readFileSync("./routes/data.json");
    res.send(data);
  } catch (e) {
    response.send(e.message);
  }
};

const updateItem = (req, res) => {
  const targetId = req.params.id;
  const updatedBody = req.body;

  const data = fs.readFileSync("./routes/data.json");
  const parseData = JSON.parse(data);
  const items = parseData.items;
  const cartItems = parseData.cart;

  let checkDetails = true;
  items.map((item) => {
    if (
      item.name.trim().toLowerCase() ===
        updatedBody.name.trim().toLowerCase() &&
      item.id != targetId
    ) {
      checkDetails = false;
    }
  });

  if (checkDetails) {
    const updatedItems = items.map((item) => {
      if (item.id == targetId) {
        item = updatedBody;
      }
      return item;
    });

    const updatedCartItems = cartItems.map((item) => {
      if (item.id == targetId) {
        item = {
          id: item.id,
          name: updatedBody.name,
          price: updatedBody.price,
          quantity: item.quantity,
        };
      }
      return item;
    });

    const newData = {
      ...parseData,
      items: updatedItems,
      cart: updatedCartItems,
    };
    myFunc.writeFile(res, "./routes/data.json", newData, "Item Updated.");
  } else {
    res.send("Product name already exists.");
  }
};

const deleteItem = (req, res) => {
  try {
    const targetId = req.params.id;

    const data = fs.readFileSync("./routes/data.json");
    const parseData = JSON.parse(data);
    const items = parseData.items;

    const newItems = items.filter((item) => item.id != targetId);
    const newData = { ...parseData, items: newItems };

    myFunc.writeFile(res, "./routes/data.json", newData, "Item Deleted.");
  } catch (e) {
    res.send(e.message);
  }
};

const addNewItem = (req, res) => {
  try {
    const newItem = req.body;

    const data = fs.readFileSync("./routes/data.json");
    const parseData = JSON.parse(data);

    const items = parseData.items;

    let checkItemExist = false;
    items.forEach((item) => {
      if (item.name.trim().toLowerCase() == newItem.name.trim().toLowerCase()) {
        checkItemExist = true;
      }
    });

    if (!checkItemExist) {
      items.push(newItem);

      const newData = { ...parseData, items: items };

      myFunc.writeFile(res, "./routes/data.json", newData, "Item added.");
    } else {
      res.send("Item already exists.");
    }
  } catch (e) {
    res.send(e.message);
  }
};

const getSpecificItem = (req, res) => {
  try {
    const targetId = req.params.id;

    const data = fs.readFileSync("./routes/data.json");

    const parseData = JSON.parse(data);

    const specificData = parseData.items.filter((item) => item.id == targetId);

    if (specificData.length > 0) {
      res.send(specificData);
    } else {
      res.send("Invalid item.");
    }
  } catch (e) {
    res.send(e.messsage);
  }
};

module.exports = {
  getItems,
  updateItem,
  deleteItem,
  addNewItem,
  getSpecificItem,
};
