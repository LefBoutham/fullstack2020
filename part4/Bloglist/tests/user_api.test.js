const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
const api = supertest(app);
const User = require("../models/user");
const helper = require("./test_helper");
const middleware = require("../utils/middleware");

beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = helper.userList.map((user) => new User(user));
  const promiseArray = userObjects.map((userObject) => userObject.save());

  await Promise.all(promiseArray);
});

describe("User testing", () => {
  test("Password under 3 characters cannot be created", async () => {
    const newUser = {
      username: "royale",
      name: "Superuser",
      password: "sa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("must be at least 3 characters long");
  });

  test("Username under 3 characters cannot be created", async () => {
    const newUser = {
      username: "ro",
      name: "Superuser",
      password: "salis",
    };
    const result = await api.post("/api/users").send(newUser).expect(400);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "admin",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
