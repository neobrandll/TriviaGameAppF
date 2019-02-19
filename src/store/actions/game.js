import {SET_ROUND} from "./actionTypes";


export const setRound = (round) => {
    return {
        type: SET_ROUND,
        round: round
    };
};