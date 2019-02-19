import {
  SET_CATEGORY,
  SET_DIFFICULTY,
  SET_ROUND

} from "../actions/actionTypes";


const initialState = {
    category: "any",
    difficulty: "easy",
    round:0
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
    default:
      return state;
}
}

export default reducer;