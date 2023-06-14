const { createUser, loginUser } = require("../../Models/users/user.model");

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
  } = await loginUser(emailId, password);

  responseHandler(success, error, document, res);
};




module.exports = { httpRegister, httpLogin };
