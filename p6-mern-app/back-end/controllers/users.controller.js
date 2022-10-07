const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const usersModel = require("../models/users");

const getUsers = (req, res) => {
  reviewModel
    .find({ bookId: req.params.id })
    .sort({ timestamp: -1 })
    .then((data) => {
      // console.log(data);
      res.send({ success: true, reviews: data });
    });
};

//
const checkLogin = (req, res) => {
  res.send({
    success: true,
    message: "Authenticated.",
    userInfo: req.userInfo,
  });
};

// SIGN UP
const usersSignup = (req, res) => {
  const { email, username, name, password } = req.body;
  if (username.trim() == "") {
    res.send({ success: false, message: "No Username Provided." });
  } else if (name.trim() == "") {
    res.send({ success: false, message: "No Name Provided." });
  } else if (password.trim() == "") {
    res.send({ success: false, message: "No Password Provided." });
  } else if (email.trim() == "") {
    res.send({ success: false, message: "No Email Provided." });
  } else {
    usersModel.findOne({ username: username }).then((data) => {
      if (data) {
        // console.log(data);
        res.send({ success: false, message: "Username already exists." });
      } else {
        usersModel.findOne({ email: email }).then(async (data) => {
          if (data) {
            res.send({ success: false, message: "Email already exists." });
          } else {
            const pwordEncrypt = await bcrypt.hash(password, 10);
            const newUser = new usersModel({
              username: username,
              email: email,
              name: name,
              password: pwordEncrypt,
              timestamp: new Date(),
            });
            newUser.save().then((data) => {
              const userPayload = {
                username: username,
                name: name,
              };
              const token = jwt.sign(userPayload, "userToken");
              res.send({
                success: true,
                message: "Success",
                token: token,
                userInfo: userPayload,
              });
            });
          }
        });
      }
    });
  }
};

// LOG IN
const usersLogIn = (req, res) => {
  const { username, password } = req.body;
  if (username.trim() == "") {
    res.send({ success: false, message: "Incorrect Username." });
  } else if (password.trim() == "") {
    res.send({ success: false, message: "Incorrect Password." });
  } else {
    usersModel.findOne({ username: username }).then(async (data) => {
      if (data) {
        const usersMatch = await bcrypt.compare(password, data.password);
        if (usersMatch) {
          const userPayload = {
            username: username,
            name: data.name,
          };
          console.log(userPayload);
          console.log("///");
          const usersToken = jwt.sign(userPayload, "userToken");
          res.send({
            success: true,
            message: "Login Successful.",
            token: usersToken,
            userInfo: userPayload,
          });
        } else {
          res.send({ success: false, message: "Invalid Credentials." });
        }
      } else {
        res.send({ success: false, message: "Invalid Credentials." });
      }
    });
  }
};

module.exports = {
  usersSignup,
  usersLogIn,
  checkLogin,
};
