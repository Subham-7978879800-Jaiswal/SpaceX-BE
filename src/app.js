require("dotenv").config("../.env");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const passport = require("passport");


const { PlanetsRouter } = require("./Routers/planets/Planets.router");
const { LaunchesRouter } = require("./Routers/launches/Launches.router");

const { userRouter } = require("./Routers/users/users.router");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(helmet());

app.use(morgan("combined"));

app.use(passport.initialize());

app.use(express.json()); // ~* Middleware added, This middleware takes the request body, converts it to JSON and add it to req in the callback function

app.get("/", (req, res) => {
  res.send("Healthy!");
});

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

app.use("/planets", PlanetsRouter); // ~^ Mounting a Router, This router will take friends as its initial path and add it in front of any routes defined inside it

app.use("/launches", LaunchesRouter);

app.use("/users", userRouter);

module.exports = { app };
