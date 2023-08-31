import { FETCH_ALL_BOOKS, START_LOADING_BOOKS, END_LOADING_BOOKS, CREATE_BOOK, START_LOADING_BOOKS_BY_SEARCH, END_LOADING_BOOKS_BY_SEARCH, FETCH_ALL_BOOKS_BY_SEARCH } from '../constants/actionTypes'

export default (state = { books:[], isLoadingBooks: false, isLoadingBooksBySearch: false }, action) => {
    switch (action.type) {
        case FETCH_ALL_BOOKS:
            return { ...state, books: action?.payload?.data };
        case START_LOADING_BOOKS:
            return { ...state, isLoadingBooks: true };
        case END_LOADING_BOOKS:
            return { ...state, isLoadingBooks: false };
        case FETCH_ALL_BOOKS_BY_SEARCH:
            console.log(action.payload);
            return { ...state, books: action.payload };
        case START_LOADING_BOOKS_BY_SEARCH:
            return { ...state, isLoadingBooksBySearch: true };
        case END_LOADING_BOOKS_BY_SEARCH:
            return { ...state, isLoadingBooksBySearch: false };
        case CREATE_BOOK:
            return { ...state, books: [...state.books, action?.payload]};
        default:
            return state;
    }
}
