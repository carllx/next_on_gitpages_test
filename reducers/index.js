// reducer
import { combineReducers } from 'redux'
import nav from './nav'
import Root from './root'
import Section from './section'
import Tab from './artisti.tabs'

export default combineReducers({
    Root,
    nav,
    Section,
    Tab
})

