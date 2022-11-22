import { FETCH_ALL, FETCH_RECOMMENDED_POSTS, FETCH_POST_BY_ID, FETCH_ALL_BY_SEARCH, CREATE, DELETE, LIKE, UPDATE, COMMENT_ON_POST, START_LOADING, END_LOADING, START_LOADING_RECOMMENDED_POSTS, END_LOADING_RECOMMENDED_POSTS } from "../constants/actionTypes";

export default (state = { post: null, recommendedPosts: [], isLoading: true, posts: [], isRecommendedPostsLoading: true }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case START_LOADING_RECOMMENDED_POSTS:
            return { ...state, isRecommendedPostsLoading: true };
        case END_LOADING_RECOMMENDED_POSTS:
            return { ...state, isRecommendedPostsLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_POST_BY_ID:
            console.log(action.payload);
            return { ...state, post: action.payload }
        case FETCH_ALL_BY_SEARCH:
            return { ...state, posts: action.payload };
        case FETCH_RECOMMENDED_POSTS:
            return { ...state, recommendedPosts: action.payload };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case COMMENT_ON_POST:
            return { ...state, posts: state.posts.map((post) => {
                if(post._id === action.payload._id) return action.payload;
                return post;
            }) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
}