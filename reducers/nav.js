
import {TweenLite} from "gsap";

// TYPE  --帮助避免重复 type
export const actionTypes = {
  NAV_BG_PTS:'NAV_BG_PTS',
  NAV_BG_ON:'NAV_BG_ON',
}

// STATE --(initial)
const INITIALSTATE = {
    on:'close',//'artisti','about','events','open'?
    background_pts:{
      pt_1_x:0,pt_1_y:0,
      pt_2_x:0,pt_2_y:0,
      pt_3_x:0,pt_3_y:0,
      pt_4_x:0,pt_4_y:0
    }
}



// ACTIONS

// ------ NAV 背景 和状态切换
export const setBackGroundPoints = (o1,o2) => (dispatch)=> {
      TweenLite
          .to(o1,0.4, {
            ...o2,
            onUpdate:()=> {
                return dispatch({type: actionTypes.NAV_BG_PTS,...o1})
            },
            //onComplete
            ease: Power4.easeOut,
          })
}

export const setPanelOn = (id) => (dispatch, getState)=> {
  // debugger
  const prvId = getState().nav.on//如果和目前状态不一致才切换
  if(prvId!==id){
    return dispatch({type: actionTypes.NAV_BG_ON,on:id})
  }
}

//REDUCERS
export default(state=INITIALSTATE ,action)=>{
    switch (action.type){

      /*Nav*/
      case actionTypes.NAV_BG_PTS:
        return {
          ...state,
          background_pts:{
            pt_1_x:action.pt_1_x,pt_1_y:action.pt_1_y,
            pt_2_x:action.pt_2_x,pt_2_y:action.pt_2_y,
            pt_3_x:action.pt_3_x,pt_3_y:action.pt_3_y,
            pt_4_x:action.pt_4_x,pt_4_y:action.pt_4_y},
      }

      case actionTypes.NAV_BG_ON:
        const background_pts = state.background_pts
        return {
          ...state,
          on:action.on,
        }

      default: return state
    }
}






