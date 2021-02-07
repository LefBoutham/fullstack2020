import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import testReducer from './reducers/testReducer'
import errorMsgReducer from './reducers/errorMsgReducer'
import successMsgReducer from './reducers/successMsgReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import userlistReducer from './reducers/userlistReducer'

const reducer = combineReducers({
  test: testReducer,
  error: errorMsgReducer,
  success: successMsgReducer,
  blogs: blogReducer,
  user: userReducer,
  userList: userlistReducer,
})

const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
