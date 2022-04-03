import { applyMiddleware, combineReducers, createStore } from "redux"
import {composeWithDevTools} from 'redux-devtools-extension'
import UserReducer from './user/reducer'
import StudentReducer from './student/reducer'
import thunk from "redux-thunk"

//Reducers
const reducers = combineReducers({
  users: UserReducer,
  students: StudentReducer
})

//Middlewares
const middlewares = [thunk]

// Compositions
const compose = composeWithDevTools(applyMiddleware(...middlewares))  

// Store create (instância da Store)
const store = createStore(reducers, compose)

export default store