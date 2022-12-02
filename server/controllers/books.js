import mongoose from 'mongoose';
import BookSchema from '../models/book.js';

export const books = async (req, res) => {
    console.log("getting all the book details for you...");
    try {
        const books = await BookSchema.find();
        res.status(200).json({ data: books });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}