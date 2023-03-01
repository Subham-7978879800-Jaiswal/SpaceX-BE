require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");
const { PlanetsRouter } = require("./Routers/planets/Planets.router");

const app = express();

const corsOption = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOption));

app.use(express.json()); // ~* Middleware added, This middleware takes the request body, converts it to JSON and add it to req in the callback function

app.use(PlanetsRouter); // ~^ Mounting a Router, This router will take friends as its initial path and add it in front of any routes defined inside it

module.exports = { app };
