import { IState, IAction, IActivities, IResults, ActionTypes, TActionTypes } from "./types";

export default (state: IState, action: TActionTypes) : IState => {
    switch(action.type) {
        case ActionTypes.GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload as IActivities
            }
        case ActionTypes.SET_RESULTS:
            return {
                ...state,
                results: action.payload
            }
    }
}