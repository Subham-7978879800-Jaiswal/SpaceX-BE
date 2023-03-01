require("dotenv").config({ path: __dirname + "/.env" });

// ~# Request -> Router -> Controller -> Model

const http = require("http");
const { app } = require("./app");
const { planetsLoader } = require("./Models/planets/Planets.model.js");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app); // * This is better because now we have express capabilities + Bare bone node server capabilities some which express dont have

// ~^ Express is just like a middleware to which we nest more middleware

// ~# Loading the data from database before starting Server
const preloadDataBeforeServerStart = async () => {
  await planetsLoader;
  server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
};

preloadDataBeforeServerStart();
