const errorMsgReducer = (state = null, action) => {
  switch (action.type) {
    case 'ERROR_MSG':
      return action.data.message
    default:
      return state
  }
}

export const setErrorMessageRedux = (message) => {
  return { type: 'ERROR_MSG', data: { message } }
}

export default errorMsgReducer
