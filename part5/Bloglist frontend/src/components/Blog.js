import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, deleteBlogPostState, user }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)
  const [currentLikes, setCurrentLikes] = useState(blog.likes)

  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const submitLike = async () => {
    const newPost = await {
      ...blog,
      likes: currentLikes + 1,
    }
    await blogService.update(newPost.id, newPost)
    setCurrentLikes(currentLikes + 1)
  }

  const deleteBlogPost = async () => {
    if (window.confirm('Do you really want to leave?')) {
      await blogService.remove(blog.id)
      await deleteBlogPostState(blog)
    }
  }

  const showDeleteButton = (user, blog) => {
    if (user.name === blog.user[0].name) {
      return (
        <button id="delete-button" onClick={async () => await deleteBlogPost()}>
          {' '}
          Delete{' '}
        </button>
      )
    } else {
      return null
    }
  }

  return (
    <div className="blogpost" style={blogStyle}>
      <div style={hideWhenVisible}>
        <div className="blogpost-hidden">
          {blog.title} {blog.author}{' '}
          <button
            className="showBlogInfo"
            onClick={() => setBlogInfoVisible(true)}
          >
            Show
          </button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div className="blogpost-visible">
          {blog.title} {blog.author}{' '}
          <button onClick={() => setBlogInfoVisible(false)}>Hide</button>
          <br />
          {blog.url} <br />
          Likes: {currentLikes}{' '}
          <button id="likeButton" onClick={() => submitLike()}>
            Like
          </button>
          <br />
          {blog.user[0].name}
          <br />
        </div>
        {showDeleteButton(user, blog)}
      </div>
    </div>
  )
}

export default Blog
