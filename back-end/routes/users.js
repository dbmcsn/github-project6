const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller");
const verifyToken = require("../middleWare/VerifyToken");

router.post("/signup", users.usersSignup);
router.post("/login", users.usersLogIn);
router.post("/check-login", verifyToken, users.checkLogin);

module.exports = router;
