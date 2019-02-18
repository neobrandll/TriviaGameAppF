import {SET_DIFFICULTY, SET_CATEGORY, SET_JSON} from "./actionTypes";


export const setCategory = (category) => {
    return {
        type: SET_CATEGORY,
        category: category
    };
};

export const setDifficulty = (difficulty) => {
    return {
        type: SET_DIFFICULTY,
        difficulty: difficulty
    };
};

export const setJson = (json) =>{
    return {
        type: SET_JSON,
        json: json
    }
}

