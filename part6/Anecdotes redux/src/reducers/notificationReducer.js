const notificationReducer = (
  state = { message: '', timeoutID: null },
  action
) => {
  switch (action.type) {
    case 'SET_MESSAGE': {
      if (state.timeoutID !== null) {
        clearTimeout(state.timeoutID)
      }
      return { message: action.message, timeoutID: action.timeoutID }
    }
    default:
      return state
  }
}

export const setNotification = (message, delay) => {
  return async (dispatch) => {
    let timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_MESSAGE',
        message: '',
      })
    }, delay * 1000)
    dispatch({
      type: 'SET_MESSAGE',
      message,
      timeoutID,
    })
  }
}

export default notificationReducer
