import express from "express";
import { books, createBook, getBooksBySearch } from "../controllers/books.js";

const router = express.Router();

router.get('/', books);
router.post('/create', createBook);
router.get('/search', getBooksBySearch);

export default router;