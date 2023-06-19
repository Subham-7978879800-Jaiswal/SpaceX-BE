const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("UsersCollections", UserSchema);

const createUserInDB = async (data) => {
  try {
    const user = new UserModel(data);
    // save the new user
    const res = await user.save();
    return { success: true, document: res };
  } catch (error) {
    return { success: false, error: `${error}` };
  }
};

const checkUserExistInDB = async (emailId) => {
  try {
    // save the new user
    console.log("emailId");
    const res = await UserModel.find({ emailId: emailId });
    console.log(res);
    if (res.length !== 0) {
      return { success: true, document: res[0] };
    } else {
      return { success: false, error: `User Doesnt exist` };
    }
  } catch (error) {
    return { success: false, error: `${error}` };
  }
};

module.exports = { createUserInDB, checkUserExistInDB };
