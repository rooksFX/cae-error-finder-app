import { Dispatch, createContext, useReducer } from 'react'
import Reducer from './Reducer'
// import { activities as mockData } from '../utils/mockData';
import { IActivities, IResults, IState, ActionTypes } from './types';

const PROD_API = 'https://cae-error-finder-app-service.onrender.com'
const URL = process.env.NODE_ENV === 'production' ? PROD_API : '';

const initialState: IState = {
    activities: null,
    results: null
}

export const QuizContext = createContext<IState>(initialState);

export const QuizProvider = ({ children } : { children: JSX.Element }) => {
    const [state, dispatch]: [IState, Dispatch<any>] = useReducer(Reducer, initialState);

    const setActivities = async () => {
        // const payload: IActivities = mockData;

        console.log('URL: ', URL);

        // const response = await fetch('/api/interview.mock.data/payload.json');
        const response = await fetch(`${URL}/api/activities`);
        const data: IActivities = await response.json();

        // console.log('setActivities | data: ', data);

        dispatch({
            type: ActionTypes.GET_ACTIVITIES,
            payload: data,
        })
    }

    const setResults = (payload: IResults) => {

        dispatch({
            type: 'SET_RESULTS',
            payload,
        })
    }

    // const setCurrentActivity = async () => {
        
    // }

    return (
        <QuizContext.Provider
            value={{
                setActivities,
                setResults,
                activities: state.activities,
                results: state.results,
            }}
        >
            {children}
        </QuizContext.Provider>
    )

}