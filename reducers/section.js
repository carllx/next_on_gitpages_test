// import {TweenMax} from "gsap";

// TYPE  --帮助避免重复 type
export const actionTypes = {
  SECTION_ON_Y:'SECTION_ON_Y',
}

// STATE --(initial)
const INITIALSTATE = {
    y:0,//'artisti','about','events','open'?

}




// ACTIONS
export const setSectionPostionY = (Y) => (dispatch)=> {
  // debugger
  return dispatch({type: actionTypes.SECTION_ON_Y,y:Y})
}
// export const setBackGroundPoints = (o1,o2) => (dispatch)=> {
//       TweenMax
//           .to(o1,0.4, {
//             ...o2,
//             onUpdate:()=> {
//                 return dispatch({type: actionTypes.NAV_BG_PTS,...o1})
//             },
//             //onComplete
//             ease: Power4.easeOut,
//           })
// }

//REDUCERS
export default(state=INITIALSTATE ,action)=>{
    switch (action.type){

      /*SECTION*/
      case actionTypes.SECTION_ON_Y:
        return {
          ...state,
          y:action.y,
      }

      default: return state
    }
}







