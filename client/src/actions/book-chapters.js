import * as api from '../api';
import { FETCH_ALL_CHAPTERS, START_LOADING_CHAPTERS, END_LOADING_CHAPTERS, CREATE_CHAPTER } from '../constants/actionTypes';

export const fetchBookChapters = (bookId) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_CHAPTERS });
        const { data } = await api.fetchBookChapters(bookId);
        dispatch({ type: FETCH_ALL_CHAPTERS, payload: data });
        dispatch({ type: END_LOADING_CHAPTERS });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: END_LOADING_CHAPTERS });

    }
}

export const createChapter = (chapter, toast) => async (dispatch) => {
    try {
        const { data } = await api.createChapter(chapter);
        const action = { type: CREATE_CHAPTER, payload: data };
        dispatch(action);
        toast.success("Chapter added successfully");
    } catch (error) {
        if(error?.response?.data?.message.includes("E11000"))
            toast.error("Chapter already exists!!!");
        else
            toast.error("Could'nt add the Chapter");
    }
}