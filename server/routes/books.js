import express from "express";
import { books, createBook } from "../controllers/books.js";

const router = express.Router();

router.get('/', books);
router.post('/create', createBook);

export default router;