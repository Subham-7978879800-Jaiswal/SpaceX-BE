const launches = new Map();

let latestflightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date(),
  destination: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true, // For making a project historical.
  succcess: true, // For Historical Projects
};

const getAllLaunches = () => Array.from(launches.values());

const addNewLaunch = (newLaunchData) => {
  latestflightNumber++;
  newLaunchData.flightNumber = latestflightNumber;
  newLaunchData.succcess = true;
  newLaunchData.upcoming = false;
  newLaunchData.customer = ["ZTM", "NASA"];
  launches.set(newLaunchData?.flightNumber, newLaunchData);
};

addNewLaunch(launch);

module.exports = { launches, getAllLaunches, addNewLaunch };
