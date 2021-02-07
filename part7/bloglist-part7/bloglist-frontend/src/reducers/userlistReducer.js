const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.data.users
    default:
      return state
  }
}

export const setUserlistRedux = (users) => {
  return { type: 'GET_USERS', data: { users } }
}

export default userReducer
