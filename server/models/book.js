import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    book_id: Number,
    title: String,
    image: String,
});

const Book = mongoose.model('Book', bookSchema);

export default Book;