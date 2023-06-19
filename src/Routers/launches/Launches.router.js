const express = require("express");
const {
  httpAddToLaunches,
  httpGetAllLaunches,
  httpAbortLaunch,
  httpUpcomingLaunches,
} = require("../../controllers/launches/Launches.Controller.js");

const { Authenticator } = require("../../auth.js");

const LaunchesRouter = express.Router();

LaunchesRouter.get("", httpGetAllLaunches);
LaunchesRouter.post("", Authenticator, httpAddToLaunches);
LaunchesRouter.delete("/:id", Authenticator, httpAbortLaunch);
LaunchesRouter.get("/upcoming", httpUpcomingLaunches);

module.exports = { LaunchesRouter };
