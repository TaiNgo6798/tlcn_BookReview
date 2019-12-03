import postReducer from './postReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'

const allReducer = combineReducers({
  postReducer,
  userReducer
})

export default allReducer