import { combineReducers } from "redux";
import posts from './posts'
import auth from "./auth";
import gitaChapters from "./gita-chapters";

export default combineReducers({ posts, auth, gitaChapters });