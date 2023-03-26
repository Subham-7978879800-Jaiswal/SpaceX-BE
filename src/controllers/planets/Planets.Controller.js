const { getAllPlanets } = require("../../Models/planets/Planets.model");

// ~# All Logical call back controllers, get Access to request and response

const responseHandler = (success, error, document, res) => {
  if (!success) {
    return res.status(400).json({ ErrorMessage: `${error}` });
  }

  return res.status(200).json(document.habitablePlanets);
};

async function getAllHabitablePlanets(req, res) {
  const { success, error = "", document = [] } = await getAllPlanets();
  responseHandler(success, error, document, res);
}

module.exports = { getAllHabitablePlanets };
