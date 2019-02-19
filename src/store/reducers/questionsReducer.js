import {
    SET_JSON
  } from "../actions/actionTypes";

const initialState = {
    questionsJson:{}
  }


  const Jreducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_JSON:
        return{
          ...state,
          questionsJson: action.questionsJson
        }
    default:
      return state;
}
}

export default Jreducer;