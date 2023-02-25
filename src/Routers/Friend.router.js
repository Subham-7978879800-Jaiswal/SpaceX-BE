const express = require("express");

const friendRouter = express.Router();
const friendController = require("../controllers/Friend.Controller");

// ~* Routes, Express will try to map from top to bottom, If match the respective callback will be called i.e (req, res) => {} Looks like this

// ~% In the router we can also add any custom middlewares
friendRouter.use((req, res, next) => {
  console.log("verified");
  next();
});

friendRouter.get("", friendController.getAllFriends);

friendRouter.get("/:friendId", friendController.getFriendByID);

friendRouter.post("/addFriend", friendController.addFriend);

module.exports = { friendRouter };
