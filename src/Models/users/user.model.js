const { createUserInDB, checkUserExistInDB } = require("./user.mongo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

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

const issueToken = (emailId) => {
  //   create JWT token
  const token = jwt.sign(
    {
      userEmail: emailId,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
  return token;
};

const loginUser = async (emailId, password, skipPasswordComparison) => {
  try {
    if (!skipPasswordComparison) {
      const { success, document, error } = await PasswordMatches(
        emailId,
        password
      );
      if (!success) {
        return { success, error };
      }
    }

    const token = issueToken(emailId);
    return { success: true, token: token };
  } catch (error) {
    return { success: false, error: `${error}` };
  }
};

const PasswordMatches = async (emailId, password) => {
  try {
    const { success, document } = await checkUserExistInDB(emailId);
    console.log(success);
    if (!success) {
      console.log("PasswordMatches");
      return { success: false, error: `User Doesnt exist` };
    }

    const isMatch = await bcrypt.compareSync(password, document.password);

    if (isMatch) return { success: true };

    return { success: false, error: "password dont match" };
  } catch (error) {
    return { success: false, error: `${error}` };
  }
};

const userExist = async (emailId) => {
  return await checkUserExistInDB(emailId);
};

module.exports = { createUser, PasswordMatches, loginUser, userExist };
