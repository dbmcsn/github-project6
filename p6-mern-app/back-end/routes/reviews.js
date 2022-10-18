const express = require("express");
const router = express.Router();
const reviews = require("../controllers/reviews.controller");
const verifyToken = require("../middleWare/VerifyToken");

router.post("/", verifyToken, reviews.sendReview);
router.post("/:id", verifyToken, reviews.getReviews);
router.post("/comment/send", verifyToken, reviews.sendComment);

module.exports = router;
