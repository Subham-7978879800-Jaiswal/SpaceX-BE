const express = require("express");
const {
  httpAddToLaunches,
  httpGetAllLaunches,
} = require("../../controllers/launches/Launches.Controller.js");

const LaunchesRouter = express.Router();

LaunchesRouter.get("/launches", httpGetAllLaunches);
LaunchesRouter.post("/launches", httpAddToLaunches);

module.exports = { LaunchesRouter };
