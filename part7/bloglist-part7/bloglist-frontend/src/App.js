// Dependencies
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './index.css'

// Components
import Blog from './components/Blog'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Togglable from './components/Togglable'
import NewPostForm from './components/newPostForm'

// Services
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

// Reducers
import { setSuccessMessageRedux } from './reducers/successMsgReducer'
import { setErrorMessageRedux } from './reducers/errorMsgReducer'
import {
  setAllBlogsRedux,
  addBlogRedux,
  deleteBlogRedux,
} from './reducers/blogReducer'
import { setUserRedux, logoutRedux } from './reducers/userReducer'
import { setUserlistRedux } from './reducers/userlistReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const successMessageRedux = useSelector((state) => state.success)
  const errorMessageRedux = useSelector((state) => state.error)
  const blogsRedux = useSelector((state) => state.blogs)
  const userRedux = useSelector((state) => state.user)
  const users = useSelector((state) => state.userList)

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setAllBlogsRedux(blogs)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserRedux(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    userService
      .getUsers()
      .then((response) => dispatch(setUserlistRedux(response)))
  }, [dispatch])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      dispatch(setUserRedux(user))
      setUsername('')
      setPassword('')

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    } catch (exception) {
      dispatch(setErrorMessageRedux('Wrong username or password'))
      setTimeout(() => {
        dispatch(setErrorMessageRedux(null))
      }, 5000)
    }
  }

  const logOut = async () => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(logoutRedux())
  }

  const addBlogPost = async (blogObject) => {
    const returnedBlogPost = await blogService.create(blogObject)
    dispatch(addBlogRedux(returnedBlogPost))
    dispatch(
      setSuccessMessageRedux(
        `A new blog ${blogObject.title} created by ${blogObject.author} added`
      )
    )

    blogFormRef.current.toggleVisibility()

    setTimeout(() => {
      dispatch(setSuccessMessageRedux(null))
    }, 5000)
  }

  const removeBlogPost = async (blog) => {
    dispatch(deleteBlogRedux(blog))

    dispatch(setSuccessMessageRedux('Blogpost deleted'))
    setTimeout(() => {
      dispatch(setSuccessMessageRedux(null))
    }, 5000)
  }

  if (userRedux === null) {
    return (
      <div className="container">
        <h1>Blogs</h1>

        <Notification message={errorMessageRedux} type="error" />

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
    <Router>
      <div className="container">
        <nav className="navbar">
          <Link to={'/'}>Blogs</Link>
          <Link to={'/users'}>Users</Link>
          <div>
            {userRedux.name} logged in{' '}
            <button onClick={() => logOut()}>Log out </button>
          </div>
        </nav>
        <div className="content">
          <h1>Blog app</h1>
          <Notification message={successMessageRedux} type="success" />
          <br />
          <Switch>
            <Route path="/users/:id">
              <User users={users} />
            </Route>
            <Route path="/users">
              <Users users={users} />
            </Route>
            <Route path="/blogs/:id">
              <Blog blogs={blogsRedux} removeBlogpost={removeBlogPost} />
            </Route>
            <Route path="/">
              <br />
              <div id="blog-list" className="whiteblock">
                <h3>Blog posts:</h3>
                <ul>
                  {blogsRedux
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                      <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                      </li>
                    ))}
                </ul>
                <Togglable buttonLabel="Add blog post ✏️" ref={blogFormRef}>
                  <NewPostForm createBlogPost={addBlogPost} />
                </Togglable>
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
