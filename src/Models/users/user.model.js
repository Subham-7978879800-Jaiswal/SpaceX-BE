const { createUserInDB, checkUserExistInDB } = require("./user.mongo");
const bcrypt = require("bcrypt");

const createUser = async (emailId, password) => {
  try {
    const hashedPassWord = await bcrypt.hash(password, 1);
    return await createUserInDB({
      emailId: emailId,
      password: hashedPassWord,
    });
  } catch (error) {
    return { success: false, error: `${error}` };
  }
};

const loginUser = async (emailId, password) => {
  try {
    const x = await PasswordMatches(emailId, password);
    console.log("Create JWT token");
    return x;
  } catch (error) {
    return { success: false, error: `${error}` };
  }
};

const PasswordMatches = async (emailId, password) => {
  try {
    const { success, document } = await checkUserExistInDB(emailId);

    if (!success) {
      return { success: false, error: `User Doesnt exist` };
    }

    const isMatch = await bcrypt.compareSync(password, document.password);

    if (isMatch) return { success: true };

    return { success: false, error: "password dont match" };
  } catch (error) {
    return { success: false, error: `${error}` };
  }
};

module.exports = { createUser, PasswordMatches, loginUser };
