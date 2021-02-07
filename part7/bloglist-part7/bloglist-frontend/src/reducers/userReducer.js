const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data.user
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const setUserRedux = (user) => {
  return { type: 'SET_USER', data: { user } }
}

export const logoutRedux = () => {
  return { type: 'LOGOUT' }
}

export default userReducer
