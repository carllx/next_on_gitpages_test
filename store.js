import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import REDUCERS from './reducers'

// STATE --(initial)
// root
/*
  device   : desktop / moblie / tablet    --2.
  direction: portrait / landscape
  OS       : android / ios / windows / blackberry   --1.
  browser  : chrome /  firefox / safari / IE / wechat /
  language : cn / en / it
  */
export const INITIALSTATE = {
  Root:
  {
    browser:'none',
    device:'seo_engin',//mobile desktop table seo_engin
    language:'zh',// 'en','zh','it'
    scroll:{up:false,y:0},
    view_size:{vw:0,vh:0,is_landscape:false}
  }
}

// STORE
export const initStore = (initialState = {}) => {
  return createStore(REDUCERS, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

