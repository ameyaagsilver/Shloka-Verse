import express from "express";
import { gitaChapters } from "../controllers/gita-chapters.js";

const router = express.Router();

router.get('/', gitaChapters);

export default router;