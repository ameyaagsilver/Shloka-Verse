import mongoose from 'mongoose';
import GitaChapter from '../models/gita-chapters.js';

export const gitaChapters = async (req, res) => {
    console.log("getting all the gita chapters for you...");
    try {
        const gitaChapters = await GitaChapter.find();
        res.status(200).json({ data: gitaChapters });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}