import {SET_DIFFICULTY, SET_CATEGORY} from "./actionTypes";


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

