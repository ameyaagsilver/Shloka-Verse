import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    book_id: {
        type: Number,
        unique: true,
        required: true
    },
    title: String,
    image: String,
    description: String,
    description_hindi: String,
});

const Book = mongoose.model('Book', bookSchema);

export default Book;