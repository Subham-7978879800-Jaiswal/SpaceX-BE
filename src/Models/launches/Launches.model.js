const launches = new Map();

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
  launches.set(launch?.flightNumber, launch);
};

addNewLaunch(launch);

module.exports = { launches, getAllLaunches };
