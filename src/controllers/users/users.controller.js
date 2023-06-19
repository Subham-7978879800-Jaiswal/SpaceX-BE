const {
  createUser,
  loginUser,
  userExist,
} = require("../../Models/users/user.model");

const responseHandler = (success, error, documents, res) => {
  if (!success) {
    return res.status(400).json({ ErrorMessage: `${error}` });
  }

  return res.status(200).json(documents);
};

const httpRegister = async (req, res) => {
  const { emailId, password } = req.body;
  const {
    success,
    error = "",
    document = [],
  } = await createUser(emailId, password);

  responseHandler(success, error, document, res);
};

const httpLogin = async (req, res) => {
  const { emailId, password } = req.body;
  const {
    success,
    error = "",
    document = [],
    token,
  } = await loginUser(emailId, password, false);

  if (!success) {
    return res.status(400).json({ ErrorMessage: `${error}` });
  }

  return res.status(200).json({ token });
};

const httpGoogleLogin = async (req, res) => {
  const userProfile = req.user;
  const userEmail = userProfile.email[0].value;

  const { success } = await userExist(userEmail);
  if (success) {
    await loginUser(userEmail, password, true);
  } else {
    await createUser(emailId, "newTestPassword");
    // Should write a service asking user to change and create new password
  }
  res.redirect(CLIENT_URL);
};

module.exports = { httpRegister, httpLogin, httpGoogleLogin };
