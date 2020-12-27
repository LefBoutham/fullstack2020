const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
const api = supertest(app);
const Blogpost = require("../models/blogpost");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blogpost.deleteMany({});

  const blogObjects = helper.blogList.map((blogPost) => new Blogpost(blogPost));
  const promiseArray = blogObjects.map((blogObject) => blogObject.save());

  await Promise.all(promiseArray);
});

test("verify return has correct number of posts", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.length).toBe(helper.blogList.length);
});

test("verify bloglist format is in JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("verify that blog post unique indicator is id", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blogPost) => {
    expect(blogPost.id).toBeDefined();
  });
});

test("verify that post request creates a new blog post", async () => {
  const newPost = {
    title: "Timmy makes the best fucki*g breakfast",
    author: "Timmy",
    url: "timmysbreggies.com",
    likes: 17,
  };

  const token = await helper.generateToken();

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newPost)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const dbPosts = await helper.postsInDb();

  expect(dbPosts.length).toBe(helper.blogList.length + 1);
});

test("verify that likes default to 0 if they are missing", async () => {
  const newPost = {
    title: "Timmy makes the best fucki*g breakfast",
    author: "Timmy",
    url: "timmysbreggies.com",
  };

  const token = await helper.generateToken();

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newPost)
    .expect(200);

  const allPosts = await helper.postsInDb();

  let addedPost = allPosts.find((post) => post.author === "Timmy");

  expect(addedPost.likes).toBe(0);
});

test("verify that if title and url properties are missing from request data, return status 400", async () => {
  const newPost = {
    url: "example.com",
  };

  const token = await helper.generateToken();

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newPost)
    .expect(400);
});

test("verify that posting without token fails with 401 status", async () => {
  const newPost = {
    title: "Timmy makes the best fucki*g breakfast",
    author: "Timmy",
    url: "timmysbreggies.com",
    likes: 17,
  };

  await api.post("/api/blogs").send(newPost).expect(401);
});

afterAll(() => {
  mongoose.connection.close();
});
