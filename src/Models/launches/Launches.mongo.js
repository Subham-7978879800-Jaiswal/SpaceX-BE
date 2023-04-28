const mongoose = require("mongoose");
const axios = require("axios");
const { getCustomers } = require("../../utils/helpers");

const { SPACEX_URL } = process.env;

const SPACEX_API_QUERY = {
  options: {
    select: {
      flight_number: 1,
      success: 1,
      upcoming: 1,
      name: 1,
      date_local: 1,
    },
    pagination: false,
    populate: [
      {
        path: "rocket",
        select: {
          name: 1,
        },
      },
      {
        path: "payloads",
        select: {
          customers: 1,
        },
      },
    ],
  },
};

// Define a schema for the collection
const LaunchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  success: {
    type: Boolean,
    required: true,
  },
  upcoming: {
    type: Boolean,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },

  // Target can be a reference Type, targets are stored in different collections. So we can write something like
  // target: {
  //   type: mongoose.ObjectId,
  //   ref: 'Planet',
  // },
  // Now when a data is going to save mongoose will go in the Planet collection and verify that given  planet even exist or not

  target: {
    type: String,
    required: false,
  },

  customers: {
    type: [String],
    required: true,
  },
});

// Create a model based on the schema
const LaunchModel = mongoose.model("LaunchesCollection", LaunchesSchema);

// Create a new document and save it to the collection
const createLaunch = async ({
  success,
  upcoming,
  customers,
  mission,
  rocket,
  launchDate,
  target,
}) => {
  try {
    // # Updating Flight Number using number of docs already present
    let flightNumber = await LaunchModel.countDocuments();
    flightNumber += 101;

    const projection = { _id: 0, __v: 0 };

    const document = await LaunchModel.updateOne(
      { flightNumber },
      {
        $set: {
          flightNumber,
          success,
          upcoming,
          mission,
          rocket,
          launchDate,
          target,
          customers,
        },
      },
      { upsert: true },
      projection
    );
    return { success: true, document };
  } catch (error) {
    return { success: false, error: `${error}` };
  }
};

const getFromLaunchesModel = async (flightNumber) => {
  let findBy = {};
  if (flightNumber) {
    findBy = { flightNumber };
  }
  const projection = { _id: 0, __v: 0 };

  try {
    const documents = await LaunchModel.find(findBy, projection);
    return { success: true, documents };
  } catch (error) {
    return { success: false, error: `${error}` };
  }
};

const abortLaunchFromModel = async (flightNumber) => {
  const projection = { _id: 0, __v: 0 };
  try {
    const document = await LaunchModel.findOneAndUpdate(
      { flightNumber }, // specify the filter
      { $set: { success: false, upcoming: false } }, // specify the update operation
      { new: true, new: true, fields: projection } // specify that you want to return the updated document
    );

    return { success: true, document };
  } catch (error) {
    return { success: false, error: `${error}` };
  }
};

const loadAllSpaceXData = async () => {
  try {
   
    const res = await axios.post(SPACEX_URL, SPACEX_API_QUERY);

    const { docs: allLaunchDataFromSpaceX } = res.data;

    

    const allSpaceXDocs = [];

    allLaunchDataFromSpaceX.map((launchDataFromSpaceX) => {

      let success = launchDataFromSpaceX["success"];
      if (launchDataFromSpaceX["success"] === null) {
        success = false;
      }

      const launchData = {
        flightNumber: launchDataFromSpaceX["flight_number"],
        success,
        upcoming: launchDataFromSpaceX["upcoming"],
        mission: launchDataFromSpaceX["name"],
        rocket: launchDataFromSpaceX["rocket"]["name"],
        launchDate: launchDataFromSpaceX["date_local"],
        customers: getCustomers(launchDataFromSpaceX["payloads"]),
      };
      allSpaceXDocs.push(launchData);
    });

    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    await LaunchModel.insertMany(allSpaceXDocs, options);

    return { success: true };
  } catch (error) {
    return { success: false, error: `${error}` };
  }
};

module.exports = {
  createLaunch,
  getFromLaunchesModel,
  abortLaunchFromModel,
  loadAllSpaceXData,
};

// flightNumber  -> 101 ->flight_number
// success -> false -> success
// upcoming -> false -> upcoming
// mission -> "Kepler Exploration X" -> name
// rocket -> "Explorer IS1" -> rocket.name
// launchDate -> 2023-03-14T10:12:31.179+00:00 -> date_local
// target -> "Kepler-442 b" -> not applicable
// customers -> Array -> 0 -> "ZTM" -> 1 ->"NASA" ->  payloads.customers -> payloads is array
