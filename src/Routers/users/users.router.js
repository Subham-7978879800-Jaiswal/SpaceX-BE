const express = require("express");

const userRouter = express.Router();
const {
  httpRegister,
  httpLogin,
} = require("../../controllers/users/users.controller");


userRouter.post("/register", httpRegister);
userRouter.post("/login",httpLogin)

module.exports = {
  userRouter,
};
