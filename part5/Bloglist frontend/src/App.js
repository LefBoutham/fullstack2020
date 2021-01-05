import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NewPostForm from './components/newPostForm'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = async () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const addBlogPost = async (blogObject) => {
    const returnedBlogPost = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlogPost))
    console.log(returnedBlogPost)

    setSuccessMessage(
      `A new blog ${blogObject.title} created by ${blogObject.author} added`
    )

    blogFormRef.current.toggleVisibility()

    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const removeBlogPost = async (blog) => {
    setBlogs(blogs.filter((blogPost) => blogPost.id !== blog.id))
    setSuccessMessage(`Blogpost deleted`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>

        <Notification message={errorMessage} type="error" />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={successMessage} type="success" />
      <div>
        {user.name} logged in <button onClick={() => logOut()}>Log out</button>
      </div>
      <br />
      <Togglable buttonLabel="Add blog post" ref={blogFormRef}>
        <NewPostForm createBlogPost={addBlogPost} />
      </Togglable>
      <br />
      <div id="blog-list">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              deleteBlogPostState={removeBlogPost}
              user={user}
            />
          ))}
      </div>
    </div>
  )
}

export default App
