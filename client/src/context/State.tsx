import { Dispatch, createContext, useReducer } from 'react'
import Reducer from './Reducer'
import { IActivities, IResults, IState, ActionTypes, TActionTypes, IRoundAnswers, TTotal } from './types';

const PROD_API = 'https://cae-error-finder-app-service.onrender.com'
const URL = process.env.NODE_ENV === 'production' ? PROD_API : '';

const initialState: IState = {
    activities: null,
    results: [],
    error: '',
}

export const QuizContext = createContext<IState>(initialState);

export const QuizProvider = ({ children } : { children: JSX.Element }) => {
    const [state, dispatch]: [IState, Dispatch<TActionTypes>] = useReducer(Reducer, initialState);

    const fetchActivitiesAction = async () => {
        try {
            const response = await fetch(`${URL}/api/activities`)
            const data = await response.json() as IActivities;

            dispatch({
                type: ActionTypes.GET_ACTIVITIES,
                payload: data,
            })
        } catch (error) {
            console.error('error: ', error);
            dispatch({
                type: ActionTypes.SET_ERROR,
                payload: 'Ooop! Something went wrong.',
            })
        }
    }

    const setResultsAction = (payload: IResults) => {
        console.log('setResultsAction | state: ', state);

        let answers: boolean[] = [];
        let correctAnswers = 0;
        let incorrectAnswers = 0;


        if (typeof payload.answers[0] !== 'boolean') {
            // extract the answers from each rounds
            const { answers: roundAnswers } = payload;
            for (const roundAnswer of (roundAnswers as IRoundAnswers[])) {
              answers = [...answers, ...roundAnswer.answers];
            }
        }
        else {
            answers = payload.answers as boolean[];
        }
        correctAnswers = (answers).filter((value: boolean) => value === true).length;
        incorrectAnswers = (answers).filter((value: boolean) => value === false).length;

        const total: TTotal = {
          correct: correctAnswers,
          incorrect: incorrectAnswers,
          total: answers.length
        }
        payload.total = total;

        let newResults = [...state.results as IResults[]];

        newResults = newResults.filter(result => result.activityID !== payload.activityID);
        newResults.unshift(payload);

        dispatch({
            type: ActionTypes.SET_RESULTS,
            payload: newResults
        })
    }

    return (
        <QuizContext.Provider
            value={{
                fetchActivitiesAction,
                setResultsAction,
                activities: state.activities,
                results: state.results,
                error: state.error,
            }}
        >
            {children}
        </QuizContext.Provider>
    )

}