import express from "express";
import { getPosts, commentOnPost, getPostById, getPostsBySearch, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
import multer from 'multer';
import auth from "../middleware/auth.js";

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log("filefilefilefilefilefilefile");
//         cb(null, "./uploads/");
//     },
//     filename: (req, file, cb) => {
//         console.log("filefilefilefilefilefilefile");
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({storage: storage});

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPostById);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/like/:id', auth, likePost)
router.post('/commentOnPost/:id', auth, commentOnPost);

export default router;