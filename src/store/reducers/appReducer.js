import {
  SET_CATEGORY,
  SET_DIFFICULTY

} from "../actions/actionTypes";


const initialState = {
    category: "any",
    difficulty: "easy"
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
    default:
      return state;
}
}

export default reducer;