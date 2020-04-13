import {
  combineReducers
} from 'redux'
import {
  GET_DATA
} from '../enums/mutations'

function data(state = {}, action) {
  const {
    type,
    payload
  } = action
  switch (type) {
    case GET_DATA:
      state = payload
      return state;
    default:
      return state
  }
}
const rootReducer = combineReducers({
  data
})
export default rootReducer
