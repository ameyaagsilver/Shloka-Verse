import mongoose from 'mongoose';
import BookChapter from '../models/book-chapters.js';

export const bookChapters = async (req, res) => {
    console.log("getting all the specific chapters for you...");
    try {
        const { bookId } = req.query;
        console.log(Number(bookId));
        const bookChapters = await BookChapter.find({ $and: [ {book_id: Number(bookId)} ] });
        res.status(200).json({ data: bookChapters });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}