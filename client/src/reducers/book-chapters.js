import { FETCH_ALL_CHAPTERS, START_LOADING_CHAPTERS, END_LOADING_CHAPTERS, CREATE_CHAPTER } from '../constants/actionTypes'

export default (state = { chapters:[], isLoadingChapters: false }, action) => {
    switch (action.type) {
        case FETCH_ALL_CHAPTERS:
            return { ...state, chapters: action?.payload?.data };
        case START_LOADING_CHAPTERS:
            return { ...state, isLoadingChapters: true };
        case END_LOADING_CHAPTERS:
            return { ...state, isLoadingChapters: false };
        case CREATE_CHAPTER:
            return { ...state, chapters: [...state.chapters, action?.payload]};
        default:
            return state;
    }
}
