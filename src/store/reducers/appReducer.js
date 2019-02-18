import {
  SET_CATEGORY,
  SET_DIFFICULTY,
  SET_JSON
} from "../actions/actionTypes";


const initialState = {
    category: "any",
    difficulty: "easy",
    json:{}
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
        case SET_JSON:
        return{
          ...state,
          json: action.json
        }
    default:
      return state;
}
}

export default reducer;