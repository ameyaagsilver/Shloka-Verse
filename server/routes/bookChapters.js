import express from "express";
import { bookChapters, createChapter } from "../controllers/book-chapters.js";

const router = express.Router();

router.get('/', bookChapters);
router.post('/create', createChapter);

export default router;