const express = require("express");
const router = express.Router();
const controller = require("../controllers/item.controller");

router.get("/", controller.getItems);

router.get("/:id", controller.getSpecificItem);

router.put("/:id", controller.updateItem);

router.delete("/:id", controller.deleteItem);

router.post("/", controller.addNewItem);

module.exports = router;
