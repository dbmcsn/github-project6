const express = require("express");
const router = express.Router();
const reviews = require("../controllers/reviews.controller");
const verifyToken = require("../middleWare/VerifyToken");

router.post("/:id", verifyToken, reviews.getReviews);
router.post("/", verifyToken, reviews.sendReview);

module.exports = router;
