import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  } else if (type === 'error') {
    return <p className="error">{message}</p>
  } else if (type === 'success') {
    return <p className="success">{message}</p>
  }
}

export default Notification
