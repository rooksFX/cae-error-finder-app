import { Dispatch, createContext, useReducer } from 'react'
import Reducer from './Reducer'
// import { activities as mockData } from '../utils/mockData';
import { IActivities, IResults, IState, ActionTypes, TActionTypes } from './types';

const PROD_API = 'https://cae-error-finder-app-service.onrender.com'
const URL = process.env.NODE_ENV === 'production' ? PROD_API : '';

const initialState: IState = {
    activities: null,
    results: null,
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

        dispatch({
            type: ActionTypes.SET_RESULTS,
            payload,
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