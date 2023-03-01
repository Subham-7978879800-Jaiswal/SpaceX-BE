const { planets } = require("../../Models/planets/Planets.model");

// ~# All Logical call back controllers, get Access to request and response

function getAllPlanets(req, res) {
  return res.status(201).json(planets);
}

module.exports = { getAllPlanets };
