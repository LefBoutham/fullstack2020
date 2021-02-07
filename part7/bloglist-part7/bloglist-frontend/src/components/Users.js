import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'
import { useSelector, useDispatch } from 'react-redux'
import { setUserlistRedux } from '../reducers/userlistReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.userList)

  useEffect(() => {
    userService
      .getUsers()
      .then((response) => dispatch(setUserlistRedux(response)))
  }, [dispatch])

  return (
    <div className="whiteblock">
      <h2>Users</h2>
      <br />
      <table>
        <tbody>
          <tr>
            <th>
              <h4>Username</h4>
            </th>
            <th>
              <h4>Blogs created</h4>
            </th>
          </tr>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
