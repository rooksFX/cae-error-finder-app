import { IState, ActionTypes, TActionTypes } from "./types";

export default (state: IState, action: TActionTypes) : IState => {
    switch(action.type) {
        case ActionTypes.GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case ActionTypes.SET_RESULTS:
            return {
                ...state,
                results: action.payload
            }
    }
}