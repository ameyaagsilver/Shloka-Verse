import * as api from '../api';
import { FETCH_ALL_BOOKS, START_LOADING_BOOKS, END_LOADING_BOOKS } from '../constants/actionTypes';

export const fetchBooks = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_BOOKS });
        const { data } = await api.fetchBooks();
        dispatch({ type: FETCH_ALL_BOOKS, payload: data });
        dispatch({ type: END_LOADING_BOOKS });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: END_LOADING_BOOKS });
    }
}