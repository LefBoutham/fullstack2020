import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useParams, useHistory } from 'react-router-dom'
import { addBlogLikeRedux, updateBlogpostRedux } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blogs, removeBlogpost }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  const user = useSelector((state) => state.user)
  const history = useHistory()
  const [comment, setComment] = useState('')

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const submitLike = async () => {
    const newPost = await {
      ...blog,
      likes: blog.likes + 1,
    }
    await blogService.update(newPost.id, newPost)
    dispatch(addBlogLikeRedux(blog))
  }

  const submitComment = async (event) => {
    event.preventDefault()
    const newPost = await {
      ...blog,
      comments: blog.comments.concat(comment),
    }
    await blogService.addComment(newPost.id, newPost)
    dispatch(updateBlogpostRedux(newPost))
    setComment('')
  }

  const deleteBlogPost = async () => {
    if (window.confirm('Do you really want to leave?')) {
      await blogService.remove(blog.id)
      removeBlogpost(blog)
      history.push('/')
    }
  }

  const DeleteButton = ({ user, blog }) => {
    if (user.name === blog.user[0].name) {
      return (
        <button
          type="submit"
          id="delete-button"
          className="mt-2"
          onClick={async () => await deleteBlogPost()}
        >
          Delete
        </button>
      )
    } else {
      return null
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <div className="whiteblock">
        <h3>{blog.title}</h3>
        <div className="mt-2">
          <strong>Link:</strong> {blog.url}
        </div>
        <div className="mt-2">
          {blog.likes} likes{' '}
          <button onClick={() => submitLike()}>like 👍🏼</button>
        </div>
        <div className="mt-2">Added by {blog.author}</div>
        <DeleteButton user={user} blog={blog} />
      </div>
      <h2 class="mt-4">Comments</h2>
      <div>
        <ul>
          {blog.comments.map((comment, index) => {
            return (
              <li className="whitecomment mt-4 w-50" key={index}>
                {comment}
              </li>
            )
          })}
        </ul>
      </div>

      <form onSubmit={submitComment} className="comment-form">
        <input
          id="comment"
          type="text"
          value={comment}
          name="Comment"
          onChange={handleCommentChange}
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  )
}

export default Blog
