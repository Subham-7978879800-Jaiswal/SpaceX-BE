require("dotenv").config("../.env" );

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { PlanetsRouter } = require("./Routers/planets/Planets.router");
const { LaunchesRouter } = require("./Routers/launches/Launches.router");

const app = express();

app.use(
  cors({
    origin: "*", // Replace with your allowed origin
    methods: ["GET", "POST"], // Specify the allowed HTTP methods
    allowedHeaders: ["Content-Type"], // Specify the allowed headers
    optionsSuccessStatus: 200,
  })
);      // Set the response status for preflight requests));
app.use(morgan("combined"));

app.use(express.json()); // ~* Middleware added, This middleware takes the request body, converts it to JSON and add it to req in the callback function

app.use("/planets", PlanetsRouter); // ~^ Mounting a Router, This router will take friends as its initial path and add it in front of any routes defined inside it

app.use("/launches", LaunchesRouter);

module.exports = { app };
