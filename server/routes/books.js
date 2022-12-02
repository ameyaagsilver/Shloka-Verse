import express from "express";
import { books } from "../controllers/books.js";

const router = express.Router();

router.get('/', books);

export default router;