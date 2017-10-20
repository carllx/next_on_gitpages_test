// import {TweenMax} from "gsap";

// TYPE  --帮助避免重复 type
export const actionTypes = {
  SECTION_ON_RE_POSITION:'SECTION_ON_RE_POSITION',
  SECTION_ON_Y:'SECTION_ON_Y',
  SECTION_ON_CLOSE:'SECTION_ON_CLOSE',
  SECTION_FETCH_IMG:'SECTION_FETCH_IMG',
}

// STATE --(initial)
// const INITIALSTATE = {}




// ACTIONS
export const setSectionPostionY = (name, pos) => (dispatch)=> {
  // debugger
  // console.log(window)
  return dispatch({
        type: actionTypes.SECTION_ON_Y,
        name: name,
        pos:pos
    })
}

export const setClose = (name,shouldClose) => (dispatch)=> {
  // debugger
  return dispatch({
        type: actionTypes.SECTION_ON_CLOSE,
        name: name,
        onClose: shouldClose,
    })
}
export const setFetch = (name,shouldFetch) => (dispatch)=> {
  // debugger
  return dispatch({
        type: actionTypes.SECTION_FETCH_IMG,
        name: name,
        fetch: shouldFetch,
    })
}


export const setPositionTrigger = () => (dispatch)=> {
  // debugger
  return dispatch({
        type: actionTypes.SECTION_ON_RE_POSITION,
    })
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
export default (state = {RePosTrigger: 0}, action) => {
    switch (action.type) {

        /*SECTION*/
        case actionTypes.SECTION_ON_Y:
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    pos: action.pos ,
                }
            }
        case actionTypes.SECTION_ON_CLOSE:
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    onClose: action.onClose,
                }
            }
        case actionTypes.SECTION_FETCH_IMG:
            return{
                ...state,
                [action.name]: {
                    ...state[action.name],
                    ShouldFetch:action.fetch
                }

            }
        case actionTypes.SECTION_ON_RE_POSITION:
            return{
                ...state,
                rePosTrigger:state.rePosTrigger+=1
            }
        default:
            return state
    }
}






