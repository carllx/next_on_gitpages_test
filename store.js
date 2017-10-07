import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import REDUCERS from './reducers'

// STATE --(initial)
export const INITIALSTATE = {
  Root:
  {device:'seo_engin',//mobile desktop table seo_engin
    language:'zh',// 'en','zh','it'
    is_Scroll_up:false,
    view_size:{vw:0,vh:0,is_landscape:false}
  }
}

// STORE
export const initStore = (initialState = INITIALSTATE) => {
  return createStore(REDUCERS, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
