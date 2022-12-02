import express from "express";
import { bookChapters } from "../controllers/book-chapters.js";

const router = express.Router();

router.get('/', bookChapters);

export default router;