const express = require("express");
const { friendRouter } = require("./Routers/Friend.router");

const app = express();

app.use(express.json()); // ~* Middleware added, This middleware takes the request body, converts it to JSON and add it to req in the callback function

app.use("/friends", friendRouter); // ~^ Mounting a Router, This router will take friends as its initial path and add it in front of any routes defined inside it

app.listen(3000, () => {
  console.log(`Server is running on PORT: ${3000}`);
});
