import * as api from '../api';
import { FETCH_ALL_CHAPTERS, START_LOADING_CHAPTERS, END_LOADING_CHAPTERS } from '../constants/actionTypes';

export const fetchGitaChapters = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_CHAPTERS });
        const { data } = await api.fetchChapters();
        dispatch({ type: FETCH_ALL_CHAPTERS, payload: data });
        dispatch({ type: END_LOADING_CHAPTERS });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: END_LOADING_CHAPTERS });

    }
}