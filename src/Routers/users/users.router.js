
const express = require("express");
const passport = require("passport");
const userRouter = express.Router();

const {
  httpRegister,
  httpLogin,
  httpGoogleLogin,
} = require("../../controllers/users/users.controller");

require("../../passport");

userRouter.post(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
    session: false,
  }),
  httpGoogleLogin
);

userRouter.post("/register", httpRegister);
userRouter.post("/login", httpLogin);

module.exports = {
  userRouter,
};
