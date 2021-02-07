const successMsgReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_SUCCESS':
      return action.data.message
    default:
      return state
  }
}

export const setSuccessMessageRedux = (message) => {
  return { type: 'SET_SUCCESS', data: { message } }
}

export default successMsgReducer
