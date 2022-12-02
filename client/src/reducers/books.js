import { FETCH_ALL_BOOKS, START_LOADING_BOOKS, END_LOADING_BOOKS } from '../constants/actionTypes'

export default (state = { books:[], isLoadingBooks: false }, action) => {
    switch (action.type) {
        case FETCH_ALL_BOOKS:
            return { ...state, books: action?.payload?.data };
        case START_LOADING_BOOKS:
            return { ...state, isLoadingBooks: true };
        case END_LOADING_BOOKS:
            return { ...state, isLoadingBooks: false };
        default:
            return state;
    }
}
