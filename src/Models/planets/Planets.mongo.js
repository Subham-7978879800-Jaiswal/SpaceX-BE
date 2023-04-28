const mongoose = require("mongoose");

const PlanetSchema = new mongoose.Schema({
  keplerName: String,
});

// Define a schema for the collection
const PlanetsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  habitablePlanets: [PlanetSchema],
});
// keplerName;
const PlanetsModel = mongoose.model("PlanetsCollection", PlanetsSchema);

const addPlanets = async (planets) => {
  try {
    const filter = { name: "Habitable Planets" };
    const update = {
      $set: { name: "Habitable Planets", habitablePlanets: planets },
    };
    const options = { upsert: true };

    await PlanetsModel.updateOne(filter, update, options);

    return { success: true };
  } catch (error) {
    return { success: false, error: `${error}` };
  }
};

const getAllHabitablePlanets = async () => {
  try {
    const filter = { name: "Habitable Planets" };
    const document = await PlanetsModel.findOne(filter);
    return { success: true, document };
  } catch (error) {
    return { success: false, error: `${error}` };
  }
};

module.exports = {
  addPlanets,
  getAllHabitablePlanets,
};
