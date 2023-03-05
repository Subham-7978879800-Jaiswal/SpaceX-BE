const {
  getAllLaunches,
  addNewLaunch,
} = require("../../Models/launches/Launches.model");

const {
  validateLaunchDataAvailability,
} = require("../../utils/validateLaunchDataAvailability");

const { validateDate } = require("../../utils/validateDate");

function httpGetAllLaunches(req, res) {
  res.status(200).json(getAllLaunches());
}

function httpAddToLaunches(req, res) {
  let newLaunchData = req.body;

  const { isValidLaunchData, fieldMissing } =
    validateLaunchDataAvailability(newLaunchData);

  // # Verifying if launch Data is all Present or not
  if (!isValidLaunchData)
    res
      .status(200)
      .json({ message: `${fieldMissing} is missing but is required` });

  // # Verifying if launch Date is valid
  const { isValidDate, message } = validateDate(newLaunchData.launchDate);

  if (!isValidDate) res.status(400).json({ message: `${message} ` });

  newLaunchData.date = new Date(newLaunchData.launchDate);
  addNewLaunch(newLaunchData);

  res.status(201).json({ message: `Success ✔ ` });
}

module.exports = { httpGetAllLaunches, httpAddToLaunches };
