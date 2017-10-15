// import {INITIALSTATE} from '../store'
// const INITIALSTATE = {
//   Root:
//   {device:'seo_engin',//mobile desktop table seo_engin
//     language:'zh',// 'en','zh','it'
//     is_Scroll_up:false,
//     view_size:{vw:0,vh:0,is_landscape:false}
//   }
// }


// TYPE  --帮助避免重复 type
export const TYPES = {
  INIT: 'INIT',
  SWITCH_LANGUAGE: 'SWITCH_LANGUAGE',
  IS_SCROLL_UP: 'IS_SCROLL_UP',
  ON_SCROLL_Y:'ON_SCROLL_Y',
  VIEW_SIZE:'VIEW_SIZE',
  ON_DEVICE:'ON_DEVICE',
  ON_BROWSER:'ON_BROWSER',
}



// ACTIONS
export const switchLanguage = (lan) => dispatch => {
    return dispatch({
        type:TYPES.SWITCH_LANGUAGE,
        language:lan
    })
}
export const onDevice = (device_name) => dispatch => {
    return dispatch({
        type:TYPES.ON_DEVICE,
        device:device_name
    })
}

export const setBrowser = (os) => dispatch => {
    return dispatch({
        type:TYPES.ON_BROWSER,
        os:os
    })
}

export const setScroll = (direction) => dispatch => {
    return dispatch({
        type:TYPES.IS_SCROLL_UP,
        direction:direction
    })
}

export const setScrollOffsetY = (y) => dispatch => {
    return dispatch({
        type:TYPES.ON_SCROLL_Y,
        y:y
    })
}

export const setViewSize = ({vw=vw,vh=vh,is_landscape=is_landscape}) => dispatch => {
    return dispatch({
        type:TYPES.VIEW_SIZE,
        vw:vw,
        vh:vh,
        is_landscape:is_landscape,
    })
}


//REDUCERS
export default (state = {} ,action)=>{
  // console.log('state',state)
  // console.log('root---INITIALSTATE',INITIALSTATE)
    switch (action.type){

      /*INIT*/
      case TYPES.INIT:
        return ({
          device:'seo_engin',//mobile desktop table seo_engin
          language:'zh',// 'en','zh','it'
          scroll:{up:false,y:0},
          view_size:{vw:0,vh:0,is_landscape:false}
        })
      /*DEVICE*/
      case TYPES.ON_DEVICE:
        return Object.assign({},state,{device:action.device})
        case TYPES.ON_BROWSER:
        return Object.assign({},state,{browser:action.browser})
        /*LANGUAGE*/
      case TYPES.SWITCH_LANGUAGE:
        return Object.assign({},state,{language:action.language})
      /*SCROLL*/
      case TYPES.IS_SCROLL_UP:
        return Object.assign({},state,{scroll:{up:action.direction?true:false}})
      case TYPES.ON_SCROLL_Y:
        return Object.assign({},state,{scroll:{y:action.y}})

      /*WIDTH - HEIGHT*/ /*Landscape / portail*/
      case TYPES.VIEW_SIZE:
        return Object.assign({},state,{view_size:{vw:action.vw,vh:action.vh,is_landscape:action.is_landscape}})

      default: return state


    }
}
