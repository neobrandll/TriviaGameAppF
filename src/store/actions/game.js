import {SET_ROUND, SET_TIMER, LOG_OUT} from "./actionTypes";


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