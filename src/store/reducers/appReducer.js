import {
  SET_CATEGORY,
  SET_DIFFICULTY,
  SET_ROUND,
  SET_TIMER,
  TRY_AUTH,
  LOG_OUT,
  SET_SCORES
} from "../actions/actionTypes";


const initialState = {
    category: "any",
    difficulty: "easy",
    round:0,
    timer:10,
    authData:{},
    scores:{}
  }



const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CATEGORY:
        return{
          ...state,
          category:action.category
        }
        case SET_DIFFICULTY:
          return{
            ...state,
            difficulty: action.difficulty
          }
          case SET_ROUND:
          return{
            ...state,
            round: action.round
          }
          case SET_TIMER:
          return{
            ...state,
            timer: action.timer
          }
          case TRY_AUTH:
          return{
            ...state,
            authData: action.authData
          }
          case SET_SCORES:
          return{
            ...state,
            scores: action.scores
          }
          case LOG_OUT:
          return initialState
            
          
    default:
      return state;
}
}

export default reducer;