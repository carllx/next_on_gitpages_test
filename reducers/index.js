// reducer
import { combineReducers } from 'redux'
import nav from './nav'
import Root from './root'
import Section from './section'

export default combineReducers({
    Root,
    nav,
    Section
})

