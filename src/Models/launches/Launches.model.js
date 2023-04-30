const launches = new Map();

const {
  createLaunch,
  getFromLaunchesModel,
  abortLaunchFromModel,
} = require("./Launches.mongo");

const getAllLaunches = async (limit,page) => {
  return await getFromLaunchesModel("",limit,page);
};

const getLaunchByFlightNumber = async (flightNumber) => {
  return await getFromLaunchesModel(flightNumber);
};

const addNewLaunch = async (newLaunchData) => {
  newLaunchData.success = true;
  newLaunchData.upcoming = !(new Date() > new Date(newLaunchData.launchDate));
  newLaunchData.customers = ["ZTM", "NASA"];

  return await createLaunch(newLaunchData);
};

const abortLaunch = async (flightNumber) => {
  return await abortLaunchFromModel(flightNumber);
};

module.exports = {
  launches,
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
  getLaunchByFlightNumber,
};
