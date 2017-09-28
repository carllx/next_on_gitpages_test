import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'


const eventsInitialState = {
  isMobile:true,
  isLandscape:false,
  pageSEO:true,
  language:'zh',// 'en','zh','it'
}

export const actionTypes = {
  ADD: 'ADD',
  TICK: 'TICK'
}

//REDUCERS

const everntsReducer = (state= ,action)=>{
    switch (action.type){
        case
    }
}

