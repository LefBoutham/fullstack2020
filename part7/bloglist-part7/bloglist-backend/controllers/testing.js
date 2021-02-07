const router = require("express").Router();
const Blogpost = require("../models/blogpost");
const User = require("../models/user");

router.post("/reset", async (request, response) => {
  await Blogpost.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = router;
