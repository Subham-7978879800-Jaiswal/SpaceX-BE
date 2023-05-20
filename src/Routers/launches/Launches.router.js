const express = require("express");
const {
  httpAddToLaunches,
  httpGetAllLaunches,
  httpAbortLaunch,
  httpUpcomingLaunches,
} = require("../../controllers/launches/Launches.Controller.js");

const LaunchesRouter = express.Router();

LaunchesRouter.get("", httpGetAllLaunches);
LaunchesRouter.post("", httpAddToLaunches);
LaunchesRouter.delete("/:id", httpAbortLaunch);
LaunchesRouter.get("/upcoming", httpUpcomingLaunches);

module.exports = { LaunchesRouter };
