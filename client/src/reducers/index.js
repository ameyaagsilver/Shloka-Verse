import { combineReducers } from "redux";
import posts from './posts'
import auth from "./auth";
import bookChapters from "./book-chapters";
import books from "./books";

export default combineReducers({ posts, auth, bookChapters, books });