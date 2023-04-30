const {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
} = require("../../Models/launches/Launches.model");

const {
  validateLaunchDataAvailability,
} = require("../../utils/validateLaunchDataAvailability");
const { validateDate } = require("../../utils/validateDate");

const responseHandler = (success, error, documents, res) => {
  if (!success) {
    return res.status(400).json({ ErrorMessage: `${error}` });
  }

  return res.status(200).json(documents);
};

const {
  getAllHabitablePlanets,
} = require("../../Models/planets/Planets.mongo");

async function httpGetAllLaunches(req, res) {
  const {limit, page}  = req?.query;
  const { success, error = "", documents = [] } = await getAllLaunches(limit,page);

  // # Handling MongoDb Response. Keeping Response in same Format for Errors - ErrorMessage : string. For UI To Display
  return responseHandler(success, error, documents, res);
}

async function httpAddToLaunches(req, res) {
  let newLaunchData = req.body;

  const { isValidLaunchData, fieldMissing } =
    validateLaunchDataAvailability(newLaunchData);

  // # Checking For Referential Integrity

  const {
    success: planetsSuccess,
    error: planetsError = "",
    document: planetsDocument = [],
  } = await getAllHabitablePlanets();

  if (!planetsSuccess)
    responseHandler(planetsSuccess, planetsError, planetsDocument, res);

  // # Verifying if Planet Data received is a valid Habitable Planet or Not

  const allHabitablePlanets = planetsDocument.habitablePlanets;
  const allHabitablePlanetsNamesArray = allHabitablePlanets.map(
    (allHabitablePlanet) => allHabitablePlanet.keplerName
  );

  if (!allHabitablePlanetsNamesArray.includes(newLaunchData.target)) {
    return res.status(400).json({
      ErrorMessage: `${newLaunchData.target} is not a valid Habitable Planet`,
    });
  }

  if (!isValidLaunchData)
    // # Verifying if launch Data is all Present or not
    return res
      .status(400)
      .json({ ErrorMessage: `${fieldMissing} is missing but is required` });

  // # Verifying if launch Date is valid
  const { isValidDate, message } = validateDate(newLaunchData.launchDate);

  if (!isValidDate)
    return res.status(400).json({ ErrorMessage: `${message} ` });

  newLaunchData.launchDate = new Date(newLaunchData.launchDate);

  const {
    success,
    error = "",
    document = [],
  } = await addNewLaunch(newLaunchData);

  // # Handling MongoDb Errors. Keeping Response in same Format for Errors - ErrorMessage : string. For UI To Display
  return responseHandler(success, error, document, res);
}

async function httpAbortLaunch(req, res) {
  const flightNumberOfLaunchToCancel = Number(req.params.id);
  const {
    success,
    error = "",
    document = [],
  } = await abortLaunch(flightNumberOfLaunchToCancel);

  // # Handling MongoDb Errors. Keeping Response in same Format for Errors - ErrorMessage : string. For UI To Display
  return responseHandler(success, error, document, res);
}

module.exports = { httpGetAllLaunches, httpAddToLaunches, httpAbortLaunch };
