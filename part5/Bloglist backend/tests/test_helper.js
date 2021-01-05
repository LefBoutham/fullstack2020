const { JsonWebTokenError } = require("jsonwebtoken");
const Blogpost = require("../models/blogpost");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const blogList = [
  {
    title: "Great title",
    author: "Alex",
    url: "melkomedia.fi",
    likes: "100",
    user: "5fe346c0031b8e4bd3b276ce",
  },
  {
    title: "Fatso purple sponge dippings",
    author: "Tom",
    url: "melkomedia.fi",
    likes: "42",
    user: "5fe346c0031b8e4bd3b276ce",
  },
];

const userList = [
  {
    blogPosts: [],
    username: "admin",
    name: "admin",
    id: "5fe346c0031b8e4bd3b276ce",
  },
];

const postsInDb = async () => {
  const posts = await Blogpost.find({});
  return posts.map((post) => post.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const generateToken = async () => {
  const user = await User.findOne({ username: "admin" });
  return jwt.sign(
    {
      username: user.username,
      id: user.id,
    },
    process.env.SECRET
  );
};

module.exports = { blogList, postsInDb, userList, usersInDb, generateToken };
