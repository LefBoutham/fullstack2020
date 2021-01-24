// Load the full build.
var _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likesArray = blogs.map((blog) => blog.likes);
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return likesArray.reduce(reducer);
};

const favoriteBlog = (blogs) => {
  let favPost = blogs.reduce((highestLikes, blogPost) => {
    return highestLikes.likes > blogPost.likes ? highestLikes : blogPost;
  });

  return {
    title: String(favPost.title),
    author: String(favPost.author),
    likes: Number(favPost.likes),
  };
};

const mostBlogs = (blogs) => {
  let authors = {};
  blogs.forEach((blogPost) => {
    if (authors[blogPost.author]) {
      authors[blogPost.author].blogs += 1;
    } else {
      authors[blogPost.author] = { author: blogPost.author, blogs: 1 };
    }
  });
  authors = Object.values(authors);

  const mostBlogs = authors.reduce((acc, item) => {
    return item.blogs > acc.blogs ? item : acc;
  });

  return mostBlogs;
};

const mostLikes = (blogs) => {
  let authors = {};
  blogs.forEach((blogPost) => {
    if (authors[blogPost.author]) {
      authors[blogPost.author].likes += blogPost.likes;
    } else {
      authors[blogPost.author] = {
        author: blogPost.author,
        likes: blogPost.likes,
      };
    }
  });
  authors = Object.values(authors);
  const mostLikes = authors.reduce((acc, item) => {
    return item.likes > acc.likes ? item : acc;
  });

  return mostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
