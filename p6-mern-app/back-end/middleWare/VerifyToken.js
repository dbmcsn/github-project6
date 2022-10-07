const jwt = require("jsonwebToken");

const verifyToken = (req, res, next) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(token, "userToken", (err, payload) => {
      if (err) {
        res.send({ success: false, message: "Invalid token." });
      }
      req.userInfo = payload;
      console.log(payload);
      console.log(token);
      console.log("---");
      next();
    });
  } else {
    res.send({ success: false, message: "Not Authenticated." });
  }
};

module.exports = verifyToken;
