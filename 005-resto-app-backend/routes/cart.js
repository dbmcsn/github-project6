const express = require("express");
const router = express.Router();
const controller = require("../controllers/cart.controller");

router.get("/", controller.getCartItems);

router.post("/", controller.addItemToCart);

router.delete("/:id", controller.deleteItem);

module.exports = router;
