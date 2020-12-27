const blogRouter = require("express").Router();
const Blogpost = require("../models/blogpost");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const blogpost = require("../models/blogpost");

blogRouter.get("/", async (request, response) => {
  const blogPosts = await Blogpost.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogPosts.map((post) => post.toJSON()));
});

blogRouter.get("/:id", (request, response, next) => {
  Blogpost.findById(request.params.id)
    .then((blogpost) => {
      if (blogpost) {
        response.json(blogpost);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blogpost = new Blogpost({
    title: body.title ? body.title : response.status(400),
    author: body.author ? body.author : response.status(400),
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id,
  });

  const savedBlogPost = await blogpost.save();
  user.blogs = user.blogs.concat(savedBlogPost._id);
  await user.save();

  response.json(savedBlogPost);
});

blogRouter.delete("/:id", async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const blogPost = (await Blogpost.findById(request.params.id)).toJSON();

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  } else if (decodedToken.id.toString() === blogPost.user[0].toString()) {
    await Blogpost.findByIdAndRemove(request.params.id);
  } else {
    return response
      .status(401)
      .json({ error: "unable to delete blogpost / not authorised" });
  }

  await response.status(204).end();
});

blogRouter.put("/:id", async (request, response, next) => {
  const body = await request.body;

  const blogpost = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlogpost = await Blogpost.findByIdAndUpdate(
    request.params.id,
    blogpost,
    { new: true }
  );
  await response.json(updatedBlogpost);
});

module.exports = blogRouter;
