import {combineReducers} from 'redux'
import {userReducer}from './userReducer'
import alert from './alert'
import branch from './branch'
export const rootReducer=combineReducers({

   user: userReducer,
   alert,
   branch

})