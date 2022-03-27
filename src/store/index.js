import { applyMiddleware, combineReducers, createStore } from "redux"
import {composeWithDevTools} from 'redux-devtools-extension'
import UserReducer from './user/reducer'
import StudentReducer from './student/reducer'

//Reducers
const reducers = combineReducers({
  users: UserReducer,
  students: StudentReducer
})

//Middlewares
const middlewares = []

// Compositions
const compose = composeWithDevTools(applyMiddleware(...middlewares))  

// Store create (instância da Store)
const store = createStore(reducers, compose)

export default store