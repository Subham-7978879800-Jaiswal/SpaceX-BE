const {
  launches,
  getAllLaunches,
  addNewLaunch,
} = require("../../Models/launches/Launches.model");

const { validateLaunchData } = require("../../utils/validateLaunchData");

function httpGetAllLaunches(req, res) {
  res.status(200).json(getAllLaunches);
}

function httpAddToLaunches(req, res) {
  const newLaunchData = req.body;

  const { isValidLaunchData, fieldMissing } = validateLaunchData(newLaunchData);

  if (!isValidLaunchData)
    res
      .status(200)
      .json({ message: `${fieldMissing} is missing but is required` });

  addNewLaunch(newLaunchData);

  res.status(200).json({ message: `Success :) ` });
}

module.exports = { httpGetAllLaunches, httpAddToLaunches };
