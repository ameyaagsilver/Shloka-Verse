import mongoose from 'mongoose';
import PostMessage from '../models/posts.js';
import fs from 'fs';
import path from 'path';


export const getPosts = async (req, res) => {
    console.log("getting all the posts for you...");
    const { page } = req.query;
    try {

        const LIMIT = 2;
        const startIndex = (Number(page) - 1) * LIMIT;
        const totalPosts = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: - 1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(totalPosts / LIMIT) });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const getPostById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that idd');

        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    console.log("getting all the searched posts for you....");
    let { searchQuery, tags, chapterNumber } = req.query;
    if(!tags) tags="";
    if(!chapterNumber || chapterNumber == "undefined") chapterNumber="0";
    console.log(req.query);
    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({ $or: [ {title: title}, { tags: { $in: tags.split(",") } }, { chapter_number: Number(chapterNumber) }] });
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    console.log("Creating a post for you...");
    const post = req.body;
    if (!req?.userId) res.status(400).json({ message: "U r not logged in..." });

    var dir = './uploads/' + req?.body?.chapter + "_" + req?.body?.shlokaNumber;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    var imagesDir = dir + '/Images';
    if (!fs.existsSync(imagesDir)){
        fs.mkdirSync(imagesDir, { recursive: true });
    }
    for (let i = 0; i < req.body.imageFiles.length; i++) {
        let filepath = imagesDir + '/' + i +'.png';
        let buffer = Buffer.from(req.body.imageFiles[i].image.split(',')[1], "base64");
        fs.writeFileSync(path.join(path.resolve(), filepath), buffer);
        req.body.imageFiles[i].image = filepath;
    }

    var audioDir = dir + '/Audio';
    if (!fs.existsSync(audioDir)){
        fs.mkdirSync(audioDir, { recursive: true });
    }
    for (let i = 0; i < req.body.audioFiles.length; i++) {
        let filepath = audioDir + '/' + i +'.mp3';
        let buffer = Buffer.from(req.body.audioFiles[i].audio.split(',')[1], "base64");
        fs.writeFileSync(path.join(path.resolve(), filepath), buffer);
        req.body.audioFiles[i].audio = filepath;
    }
    console.log(post);

    const newPost = PostMessage({ ...post, creator: req?.userId });

    try {
        await newPost.save();

        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.json(updatedPost);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    try {
        const post = await PostMessage.findByIdAndRemove(id);
        console.log("Deleting the post...");
        console.log(post);
        res.json({ message: 'Post deleted successfully...' });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) res.json({ message: "User is not authenticated..." });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Cannot like a post which does not exist');
    try {
        const oldPost = await PostMessage.findById(id);

        const index = oldPost.likes.findIndex((id) => id === String(req.userId));

        if (index == -1) {
            oldPost.likes.push(req.userId);
        } else {
            oldPost.likes = oldPost.likes.filter((userid) => userid !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, oldPost, { new: true });
        res.json(updatedPost);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const commentOnPost = async (req, res) => {
    const { comment } = req.body;
    const { id } = req.params;

    if (!req?.userId) res.status(400).json({ message: "U r not logged in..." })

    try {
        const post = await PostMessage.findById(id);
        post.comments.push(comment);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}