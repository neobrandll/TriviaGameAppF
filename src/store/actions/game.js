import {SET_ROUND, SET_TIMER, LOG_OUT, SET_SCORES} from "./actionTypes";


export const setRound = (round) => {
    return {
        type: SET_ROUND,
        round: round
    };
};

export const setTimer = (timer) => {
    return {
        type: SET_TIMER,
        timer: timer
    };
};

export const logOut = (any) => {
    return {
        type: LOG_OUT,
        any: any
    };
};

export const setScores = (scores) => {
    return {
        type: SET_SCORES,
        scores: scores
    };
};