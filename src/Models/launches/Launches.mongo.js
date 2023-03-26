const mongoose = require("mongoose");

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
    required: true,
  },

  customers: {
    type: [String],
    required: true,
  },
});

const { getAllPlanets } = require("../planets/Planets.model");

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

module.exports = {
  createLaunch,
  getFromLaunchesModel,
  abortLaunchFromModel,
};
