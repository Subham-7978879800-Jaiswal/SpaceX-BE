const express = require("express");

const PlanetsRouter = express.Router();
const PlanetsController = require("../../controllers/planets/Planets.Controller");

// ~* Routes, Express will try to map from top to bottom, If match the respective callback will be called i.e (req, res) => {} Looks like this

PlanetsRouter.get("/planets", PlanetsController.getAllPlanets);

module.exports = { PlanetsRouter };
