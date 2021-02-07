import React from 'react'
import { useParams, Link } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find((user) => user.id === id)
  if (!user) {
    return null
  }

  return (
    <div className="whiteblock">
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`}>
            <li key={blog.id}>{blog.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default User
