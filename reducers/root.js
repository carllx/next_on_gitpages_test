// import {INITIALSTATE} from '../store'
// const INITIALSTATE = {
//   Root:
//   {device:'seo_engin',//mobile desktop table seo_engin
//     language:'zh',// 'en','zh','it'
//     is_Scroll_up:false,
//     view_size:{vw:0,vh:0,is_landscape:false}
//   }
// }

const INITIALSTATE = {

  browser:'none',
  device:'seo_engin',//mobile desktop table seo_engin
  language:'zh',// 'en','zh','it'
  scroll:{up:false,y:0},
  mouse:{x:0,y:0},
  gyo:{alpha:0,beta:0,gamma:0},
  view_size:{vw:0,vh:0,is_landscape:false},
  // googlePass:false

}
// TYPE  --帮助避免重复 type
export const TYPES = {
  INIT: 'INIT',
  SWITCH_LANGUAGE: 'SWITCH_LANGUAGE',
  VIEW_SIZE:'VIEW_SIZE',
  ON_DEVICE:'ON_DEVICE',
  ON_BROWSER:'ON_BROWSER',
  ON_EVENT_MOUSEMOVE:'ON_EVENT_MOUSEMOVE',
  ON_EVENT_GYOCHANGE:'ON_EVENT_GYOCHANGE',
  IS_SCROLL_UP: 'IS_SCROLL_UP',
  ON_SCROLL_Y:'ON_SCROLL_Y',
  // CAN_GOOGLE:'CAN_GOOGLE'
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

// event - mouse
export const setMousePos = ({x=x,y=y}) => dispatch => {
    return dispatch({
        type:TYPES.ON_EVENT_MOUSEMOVE,
        x:x,
        y:y,
    })
}

// event - device
export const setgyo = ({alpha=alpha,beta=beta,gamma=gamma}) => dispatch => {
    return dispatch({
        type:TYPES.ON_EVENT_GYOCHANGE,
        alpha:alpha,
        beta:beta,
        gamma:gamma,
    })
}

// export const canGoogle = () => dispatch => {
//     fetch(`http://maps.googleapis.com/maps/api/js?key=AIzaSyBQdch5IcgcQaKNG76sbMQv1MEBEKLeQ-8&v=3.exp&libraries=geometry,drawing,places`, (response) => {
//         if(response.status == 200){
//           return dispatch({
//               type:TYPES.CAN_GOOGLE,
//               googlePass:true,
//           })
//         }else{
//           return dispatch({
//               type:TYPES.CAN_GOOGLE,
//               googlePass:false,
//           })
//         }
//     })

// }



//REDUCERS
export default (state = INITIALSTATE ,action)=>{
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
      // case TYPES.CAN_GOOGLE:
      //   return Object.assign({},state,{googlePass:action.googlePass})
      case TYPES.ON_DEVICE:
        return Object.assign({},state,{device:action.device})
      case TYPES.ON_BROWSER:
        return Object.assign({},state,{browser:action.browser})
        /*LANGUAGE*/
      case TYPES.SWITCH_LANGUAGE:
        return Object.assign({},state,{language:action.language})
      /*SCROLL*/
      case TYPES.IS_SCROLL_UP:
        return Object.assign({},state,{
          scroll:{
            ...state.scroll,
            up:action.direction?true:false
          }})
      case TYPES.ON_SCROLL_Y:
        return Object.assign({},state,{
          scroll:{
            ...state.scroll,
            y:action.y,
          }})

      /*WIDTH - HEIGHT*/ /*Landscape / portail*/
      case TYPES.VIEW_SIZE:
        return Object.assign({},state,{view_size:{vw:action.vw,vh:action.vh,is_landscape:action.is_landscape}})


      case TYPES.ON_EVENT_MOUSEMOVE:
        return Object.assign({},state,{mouse:{y:action.y,x:action.x}})

      case TYPES.ON_EVENT_GYOCHANGE:
        return Object.assign({},state,{gyo:{alpha:action.alpha,beta:action.beta,gamma:action.gamma}})




      default: return state


    }
}
