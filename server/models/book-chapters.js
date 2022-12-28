import mongoose from "mongoose";

const bookChapterSchema = mongoose.Schema({
    chapter_book_id: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    chapter_id: {
        type: Number,
        required: true,
    },
    chapter_name: String,
    name_hindi: String,
    chapter_name_meaning: String,
    chapter_name_transliterated: String,
    chapter_summary: String,
    chapter_summary_hindi: String,
    verses_count: Number,
    image: String,
    book_id: {
        type: Number,
        required: true,
    },
});

const BookChapter = mongoose.model('BookChapter', bookChapterSchema);

export default BookChapter;

// db.bookchapters.updateMany({}, [
//     {"$setFields":{"chapter_book_id_unique":{"$concat":[{$toString: "$chapter_id"},"_",{$toString: "$book_id"}]} }}] )