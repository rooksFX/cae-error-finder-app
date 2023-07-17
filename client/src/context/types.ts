import { Dispatch } from "react";

export interface IActivities {
    name: string;
    heading: string;
    activities: IActivity[];
}

export interface IResults {
    activityName: string;
    activityID: number | null;
    answers: boolean[] | IRoundAnswers[];
}

export interface IRoundAnswers {
  order: number;
  answers: boolean[];
}

export interface IState {
    activities: IActivities | null;
    results: IResults | null;
    setActivities?: () => void;
    setResults?: Dispatch<IResults>;
}

export enum ActionTypes {
    GET_ACTIVITIES = 'GET_ACTIVITIES',
    SET_RESULTS = 'SET_RESULTS',
}

export type TActionTypes = { type: ActionTypes.GET_ACTIVITIES, payload: IActivities } | { type: ActionTypes.SET_RESULTS, payload: IResults }

export interface IAction {
    type: 'GET_ACTIVITIES' | 'SET_RESULTS';
    payload: IActivities | IResults;
}

export interface IReducer {
    state: IState;
    action: IAction;
}

export interface IActivity {
    activity_name: string;
    order: number;
    questions: IRound[] | IQuestion[];
} 

export interface IQuestion {
    is_correct: boolean;
    stimulus: string;
    order: number;
    user_answers: string[];
    feedback: string;
}

export interface IRound {
    round_title: string;
    order: number;
    questions: IQuestion[];
}