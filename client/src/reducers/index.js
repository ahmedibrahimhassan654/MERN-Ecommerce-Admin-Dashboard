import {combineReducers} from 'redux'
import {userReducer}from './userReducer'
import alert from './alert'
export const rootReducer=combineReducers({

   user: userReducer,
   alert

})