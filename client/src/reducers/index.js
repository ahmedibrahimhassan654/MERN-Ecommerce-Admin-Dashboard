import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { searchReducer } from './searchReducer'

//import branch from './branch'
export const rootReducer = combineReducers({

   user: userReducer,
   search: searchReducer
   // branch

})