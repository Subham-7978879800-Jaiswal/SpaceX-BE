const express = require("express");
const {
  httpAaddToLaunches,
  httpGetAllLaunches,
} = require("../../controllers/launches/Launches.Controller.js");

const LaunchesRouter = express.Router();

LaunchesRouter.get("/launches", httpGetAllLaunches);
LaunchesRouter.post("/launches", httpAaddToLaunches);

module.exports = { LaunchesRouter };
