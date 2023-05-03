const request = require("supertest");
const { app } = require("../../app");
const { connectToDB, disconnectDB } = require("../../db");
const { planetsLoader } = require("../planets/Planets.model.js");

describe("Test POST /launch", () => {
  beforeAll(async () => {
    await connectToDB();
    await planetsLoader();
  }, 10000); // increase timeout to 10 seconds);
  afterAll(() => {
    disconnectDB();
  });
  test("It should respond with 200 success", async () => {
    const response = await request(app).post("/launches").send({
      mission: "Testing Record",
      rocket: "Star Link",
      launchDate: "2023-02-25",
      target: "Kepler-442 b",
    });
    expect(response.statusCode).toBe(200);
  });
  test("It should catch missing required properties", async () => {
    const response = await request(app).post("/launches").send({
      rocket: "Star Link",
      launchDate: "2023-02-25",
      target: "Kepler-442 b",
    });
    expect(response.statusCode).toBe(400);
  });
  test("It should catch invalid dates", async () => {
    const response = await request(app).post("/launches").send({
      rocket: "Star Link",
      launchDate: "202-02-25",
      target: "Kepler-442 b",
    });
    expect(response.statusCode).toBe(400);
  });

  test("It should respond with 200 success", async () => {
    const response = await request(app).get("/launches");
    expect(response.statusCode).toBe(200);
  });
});
