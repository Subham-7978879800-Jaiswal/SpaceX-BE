const { friends } = require("../../Models/Friends.model");

// ~# All Logical call back controllers, get Access to request and response

function getAllFriends(req, res) {
  const obj = Object.fromEntries(friends);
  res.status(201).json(obj);
}

function getFriendByID(req, res) {
  const friendId = req.params.friendId;
  if (friends.get(friendId)) {
    res.status(202).json(friends.get(friendId));
  } else {
    res.status(400).json({ error: "Friend Does Not Exist" });
  }
}

function addFriend(req, res) {
  const friendName = req.body.name;
  friends.set(friends.size + 1, { name: friendName });
  res.json({ message: friends });
}

module.exports = { getAllFriends, getFriendByID, addFriend };
