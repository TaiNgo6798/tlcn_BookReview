import postReducer from './postReducer'
import { combineReducers } from 'redux'

const allReducer = combineReducers({
  postReducer
})

export default allReducer