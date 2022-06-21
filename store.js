import React from "react";
import { combineReducers, createStore } from 'redux'
import { userReducer } from './src/reducer/userReducer'

const AppReducer = combineReducers({
    "userReducer": userReducer
})

export const store = createStore(AppReducer)

