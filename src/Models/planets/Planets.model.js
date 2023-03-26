const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const { addPlanets, getAllHabitablePlanets } = require("./Planets.mongo");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

const planetsLoader = new Promise((resolve, reject) => {
  fs.createReadStream(
    `${path.join(__dirname, "../../../data/kepler_data.csv")}`
  )
    .pipe(
      parse({
        comment: "#",
        columns: true,
      })
    )
    .on("data", (data) => {
      if (isHabitablePlanet(data)) {
        habitablePlanets.push(data);
      }
    })
    .on("error", (err) => {
      reject();
    })
    .on("end", async () => {
      console.log(
        habitablePlanets.map((planet) => {
          return planet["kepler_name"];
        })
      );
      console.log(`${habitablePlanets.length} habitable planets found!`);

      habitablePlanets.map(
        (habitablePlanet) =>
          (habitablePlanet.keplerName = habitablePlanet.kepler_name)
      );

      await addPlanets(habitablePlanets);
      resolve();
    });
});

const getAllPlanets = async () => {
  return await getAllHabitablePlanets();
};

module.exports = { planetsLoader, getAllPlanets };
