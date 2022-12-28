import * as api from '../api';
import { FETCH_ALL_BOOKS, START_LOADING_BOOKS, END_LOADING_BOOKS, CREATE_BOOK } from '../constants/actionTypes';

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

export const createBook = (book, toast) => async (dispatch) => {
    try {
        const { data } = await api.createBook(book);
        const action = { type: CREATE_BOOK, payload: data };
        dispatch(action);
        toast.success("Book added successfully");
    } catch (error) {
        console.log(error.message);
        toast.error("Could'nt add the Book");
    }
}

// export const updatePost = (id, post) => async (dispatch) => {
//     try {
//         const { data } = await api.updatePost(id, post);
//         const action = { type: UPDATE, payload: data };
//         dispatch(action);
//     } catch (error) {
//         console.log(error.message);
//     }
// }